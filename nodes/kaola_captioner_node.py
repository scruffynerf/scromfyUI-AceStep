import torch
import numpy as np
import librosa
import logging
import comfy.utils
import comfy.model_management
from .includes.qwen_utils import ComfyStreamer, DummyModule, suppress_qwen_audio_output
from typing import Dict, Any, Tuple, Optional

logger = logging.getLogger(__name__)


class KaolaAceStepCaptioner:
    """Professional Music Captioner for ACE-Step.
    Uses Qwen2.5-Omni to generate detailed, structured descriptions of audio.
    Supports long-duration audio via modular chunking.
    
    Inputs:
        llm (ACE_LLM): The loaded Captioner model (Qwen2.5-Omni).
        audio (AUDIO): Input audio to describe.
        custom_prompt (STRING): Task instruction (e.g. "Describe this audio in detail").
        chunk_length_s (FLOAT): Analysis window size in seconds.
        max_new_tokens (INT): Max tokens per chunk.
        
    Outputs:
        caption (STRING): Concise summary.
        style_tags (STRING): Style/Instrument tags.
        full_description (STRING): Complete detailed analysis.
    """
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm": ("ACE_LLM",),
                "audio": ("AUDIO",),
            },
            "optional": {
                "custom_prompt": ("STRING", {
                    "default": "*Task* Describe this audio in detail",
                    "multiline": True,
                }),
                "chunk_length_s": ("FLOAT", {"default": 30.0, "min": 10.0, "max": 300.0, "step": 1.0}),
                "max_new_tokens": ("INT", {"default": 1024, "min": 64, "max": 4096}),
                "temperature": ("FLOAT", {"default": 0.3, "min": 0.0, "max": 1.0, "step": 0.1}),
                "top_p": ("FLOAT", {"default": 0.9, "min": 0.0, "max": 1.0, "step": 0.05}),
                "top_k": ("INT", {"default": 50, "min": 0, "max": 1000}),
                "repetition_penalty": ("FLOAT", {"default": 1.1, "min": 1.0, "max": 2.0, "step": 0.1}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffff}),
            }
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING")
    RETURN_NAMES = ("caption", "style_tags", "full_description")
    FUNCTION = "caption"
    CATEGORY = "Scromfy/Ace-Step/Kaola"

    def caption(self, llm, audio, custom_prompt="*Task* Describe this audio in detail", 
                chunk_length_s=30.0, max_new_tokens=1024, temperature=0.3, 
                top_p=0.9, top_k=50, repetition_penalty=1.1, seed=0):
        
        # 1. Setup Model Components
        model = llm.get("model")
        processor = llm.get("processor")
        device = llm.get("device", "cpu")
        
        if model is None:
            raise ValueError("Invalid LLM input. Must be from AceStepLLMLoader.")
            
        if processor is None:
            model_path = llm.get("path")
            if model_path:
                from transformers import AutoProcessor
                logger.info(f"Loading processor for captioning from {model_path}...")
                processor = AutoProcessor.from_pretrained(model_path, trust_remote_code=True)
            else:
                raise ValueError("Processor missing and model path unknown. Re-load the model.")

        # 2. Apply OOM Protections
        suppress_qwen_audio_output(model, device)

        # 3. Audio Preparation
        waveform = audio['waveform']
        sample_rate = audio['sample_rate']
        
        # Mono mixdown and resampling to 16kHz (Standard for Qwen audio)
        if isinstance(waveform, torch.Tensor):
            waveform = waveform.cpu().numpy()
        if waveform.ndim == 3:
            waveform = waveform[0]
        if waveform.ndim > 1 and waveform.shape[0] > 1:
            waveform = np.mean(waveform, axis=0)
        elif waveform.ndim > 1:
            waveform = waveform[0]
            
        TARGET_SR = 16000
        if sample_rate != TARGET_SR:
            waveform = librosa.resample(waveform.astype(np.float32), orig_sr=sample_rate, target_sr=TARGET_SR)
            sample_rate = TARGET_SR
            
        audio_duration = len(waveform) / sample_rate
        
        # 4. Chunking Logic
        OVERLAP_S = 5
        chunk_samples = int(chunk_length_s * sample_rate)
        overlap_samples = int(OVERLAP_S * sample_rate)
        
        chunks = []
        if audio_duration > chunk_length_s:
            step_samples = chunk_samples - overlap_samples
            num_chunks = int(np.ceil((len(waveform) - overlap_samples) / step_samples))
            for i in range(num_chunks):
                start = i * step_samples
                end = min(start + chunk_samples, len(waveform))
                chunks.append(waveform[start:end])
        else:
            chunks = [waveform]

        # 5. Inference Loop
        if seed != 0:
            torch.manual_seed(seed)
            np.random.seed(seed)

        instruction = custom_prompt.strip() or "*Task* Describe this audio in detail"
        
        # Build prompt using chat template if possible
        if hasattr(processor, "apply_chat_template"):
            messages = [
                {
                    "role": "system",
                    "content": [{"type": "text", "text": "You are Qwen, an AI capable of perceiving and describing audio."}]
                },
                {
                    "role": "user",
                    "content": [
                        {"type": "audio", "audio": "placeholder"},
                        {"type": "text", "text": instruction}
                    ]
                }
            ]
            text_prompt = processor.apply_chat_template(messages, add_generation_prompt=True, tokenize=False)
        else:
            text_prompt = f"<|im_start|>system\nYou are Qwen, an AI capable of perceiving and describing audio.<|im_end|>\n<|im_start|>user\n{instruction}<|im_end|>\n<|im_start|>assistant\n"

        results = []
        for idx, chunk in enumerate(chunks):
            comfy.model_management.throw_exception_if_processing_interrupted()
            logger.info(f"KaolaCaptioner: Processing chunk {idx+1}/{len(chunks)}")
            
            inputs = processor(text=[text_prompt], audio=chunk, sampling_rate=sample_rate, return_tensors="pt")
            inputs = {k: v.to(device) for k, v in inputs.items()}
            
            # Use ComfyUI progress bar
            pbar = comfy.utils.ProgressBar(max_new_tokens)
            streamer = ComfyStreamer(pbar)
            
            with torch.no_grad():
                gen_out = model.generate(
                    **inputs,
                    max_new_tokens=max_new_tokens,
                    streamer=streamer,
                    temperature=temperature,
                    top_p=top_p,
                    top_k=top_k if top_k > 0 else None,
                    repetition_penalty=repetition_penalty,
                    do_sample=True if temperature > 0 else False,
                    return_audio=False
                )
            
            decoded = processor.batch_decode(gen_out, skip_special_tokens=True)[0]
            
            # Extract assistant text
            if "assistant\n" in decoded:
                decoded = decoded.split("assistant\n")[-1].strip()
            elif "assistant" in decoded:
                decoded = decoded.split("assistant")[-1].strip()
                
            results.append(decoded)

        # 6. Post-processing (Merging)
        full_description = results[0]
        if len(results) > 1:
            for i, res in enumerate(results[1:], 1):
                full_description += f"\n\n[Following Section]: {res}"
        
        style_tags = self._extract_tags(full_description)
        caption = self._generate_summary(full_description)
        
        return (caption, style_tags, full_description)

    def _extract_tags(self, desc):
        # Ported subset of the reference code tag extractor
        keywords = ["ambient", "techno", "electronic", "lofi", "jazz", "piano", "guitar", "synth", "dark", "upbeat"]
        desc_low = desc.lower()
        found = [k.title() for k in keywords if k in desc_low]
        return ", ".join(found) if found else "Music"

    def _generate_summary(self, desc):
        first_line = desc.split(".")[0].strip()
        return (first_line + ".")[:200]

NODE_CLASS_MAPPINGS = {
    "KaolaAceStepCaptioner": KaolaAceStepCaptioner
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "KaolaAceStepCaptioner": "Audio Captioner (Kaola)"
}
