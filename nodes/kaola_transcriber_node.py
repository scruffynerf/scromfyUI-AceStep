import os
import torch
import numpy as np
import librosa
import logging
import comfy.utils
import comfy.model_management
from .includes.llm_utils import ComfyStreamer, DummyModule, suppress_qwen_audio_output
from typing import Dict, Any, Tuple, Optional

logger = logging.getLogger(__name__)


class KaolaAceStepTranscriber:
    """Professional Music Transcriber for ACE-Step.
    Uses music-tuned Qwen2.5-Omni to extract lyrics and timestamps from audio.
    Specialized for songs where generic speech-to-text models often fail.
    
    Inputs:
        llm (ACE_LLM): The loaded Transcriber model (Qwen2.5-Omni).
        audio (AUDIO): Input audio to transcribe.
        language (STRING): Target language (English, Chinese, etc.).
        return_timestamps (STRING): 'none', 'segment', or 'word'.
        chunk_length_s (FLOAT): Analysis window size in seconds.
        
    Outputs:
        transcription (STRING): Extracted lyrics with optional timestamps.
    """
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm": ("ACE_LLM",),
                "audio": ("AUDIO",),
                "language": (["auto", "en", "zh", "ja", "ko", "fr", "de", "es", "it", "ru", "pt"], {"default": "auto"}),
            },
            "optional": {
                "return_timestamps": (["none", "segment", "word"], {"default": "none"}),
                "chunk_length_s": ("FLOAT", {"default": 30.0, "min": 10.0, "max": 300.0, "step": 1.0}),
                "custom_prompt": ("STRING", {
                    "default": "",
                    "multiline": True,
                    "placeholder": "Override default transcription prompt...",
                }),
                "max_new_tokens": ("INT", {"default": 2048, "min": 64, "max": 8192}),
                "temperature": ("FLOAT", {"default": 0.2, "min": 0.0, "max": 1.0, "step": 0.1}),
                "top_p": ("FLOAT", {"default": 0.95, "min": 0.0, "max": 1.0, "step": 0.05}),
                "repetition_penalty": ("FLOAT", {"default": 1.1, "min": 1.0, "max": 2.0, "step": 0.1}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffff}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("transcription",)
    FUNCTION = "transcribe"
    CATEGORY = "Scromfy/Ace-Step/Kaola"

    def transcribe(self, llm, audio, language="auto", return_timestamps="none", 
                  chunk_length_s=30.0, custom_prompt="", max_new_tokens=2048, 
                  temperature=0.2, top_p=0.95, repetition_penalty=1.1, seed=0):
        
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
                logger.info(f"Loading processor for transcription from {model_path}...")
                processor = AutoProcessor.from_pretrained(model_path, trust_remote_code=True)
            else:
                raise ValueError("Processor missing and model path unknown. Re-load the model.")

        # 2. Apply OOM Protections
        suppress_qwen_audio_output(model, device)

        # 3. Audio Preparation (16kHz mono)
        waveform = audio['waveform']
        sample_rate = audio['sample_rate']
        
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

        # 5. Build Instruction Prompt
        lang_map = {
            "zh": "Chinese", "en": "English", "ja": "Japanese", "ko": "Korean",
            "fr": "French", "de": "German", "es": "Spanish", "it": "Italian",
            "ru": "Russian", "pt": "Portuguese"
        }
        
        if custom_prompt.strip():
            instruction = custom_prompt.strip()
        else:
            lang_text = lang_map.get(language, "the original")
            if return_timestamps == "word":
                instruction = f"Transcribe this audio into {lang_text} with word-level timestamps. Format each line as: [MM:SS.ms] word"
            elif return_timestamps == "segment":
                instruction = f"Transcribe this audio into {lang_text} with timestamps. Add [MM:SS] at the beginning of each section."
            else:
                instruction = f"Transcribe this audio in detail into {lang_text}."

        # Chat Template
        if hasattr(processor, "apply_chat_template"):
            messages = [
                {
                    "role": "system",
                    "content": [{"type": "text", "text": "You are Qwen, an AI specialized in music transcription."}]
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
            text_prompt = f"<|im_start|>system\nYou are Qwen, an AI specialized in music transcription.<|im_end|>\n<|im_start|>user\n{instruction}<|im_end|>\n<|im_start|>assistant\n"

        # 6. Inference Loop
        if seed != 0:
            torch.manual_seed(seed)
            np.random.seed(seed)

        all_results = []
        for idx, chunk in enumerate(chunks):
            comfy.model_management.throw_exception_if_processing_interrupted()
            logger.info(f"KaolaTranscriber: Processing chunk {idx+1}/{len(chunks)}")
            
            inputs = processor(text=[text_prompt], audio=chunk, sampling_rate=sample_rate, return_tensors="pt")
            inputs = {k: v.to(device) for k, v in inputs.items()}
            
            pbar = comfy.utils.ProgressBar(max_new_tokens)
            streamer = ComfyStreamer(pbar)
            
            with torch.no_grad():
                gen_out = model.generate(
                    **inputs,
                    max_new_tokens=max_new_tokens,
                    streamer=streamer,
                    temperature=temperature,
                    top_p=top_p,
                    repetition_penalty=repetition_penalty,
                    do_sample=True if temperature > 0 else False,
                    return_audio=False
                )
            
            decoded = processor.batch_decode(gen_out, skip_special_tokens=True)[0]
            if "assistant\n" in decoded:
                decoded = decoded.split("assistant\n")[-1].strip()
            elif "assistant" in decoded:
                decoded = decoded.split("assistant")[-1].strip()
            
            all_results.append(decoded)

        # 7. Merge Transcriptions
        merged = []
        for i, res in enumerate(all_results):
            if i > 0:
                # Add a marker for chunk transitions
                merged.append(f"\n--- [Section {i+1}] ---")
            merged.append(res)
            
        return ("\n".join(merged),)

NODE_CLASS_MAPPINGS = {
    "KaolaAceStepTranscriber": KaolaAceStepTranscriber
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "KaolaAceStepTranscriber": "Audio Transcriber (Kaola)"
}
