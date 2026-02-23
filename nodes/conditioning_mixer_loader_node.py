"""AceStepConditioningMixerLoader node for ACE-Step"""
import os
import json
import torch
import random
from safetensors.torch import load_file

def get_conditioning_files(suffix):
    base_path = "output/conditioning"
    if not os.path.exists(base_path):
        return ["none", "random"]
    
    files = [f for f in os.listdir(base_path) if f.endswith(suffix)]
    return sorted(files) + ["none", "random"]

class AceStepConditioningMixerLoader:
    """Load and mix specific conditioning components from saved files (safetensors/json)"""
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "tune_tensor_file": (get_conditioning_files("_tune.safetensors"),),
                "pooled_output_file": (get_conditioning_files("_pooled.safetensors"),),
                "lyrics_file": (get_conditioning_files("_lyrics.safetensors"),),
                "audio_codes_file": (get_conditioning_files("_codes.json"),),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            }
        }
    
    RETURN_TYPES = ("CONDITIONING", "STRING")
    RETURN_NAMES = ("conditioning", "conditioning_info")
    FUNCTION = "load_and_mix"
    CATEGORY = "Scromfy/Ace-Step/advanced"

    @classmethod
    def IS_CHANGED(s, tune_tensor_file, pooled_output_file, lyrics_file, audio_codes_file, seed):
        return f"{tune_tensor_file}_{pooled_output_file}_{lyrics_file}_{audio_codes_file}_{seed}"

    def load_and_mix(self, tune_tensor_file, pooled_output_file, lyrics_file, audio_codes_file, seed):
        base_path = "output/conditioning"
        rng = random.Random(seed)
        
        def pick_file(selected, suffix):
            if selected == "random":
                options = [f for f in os.listdir(base_path) if f.endswith(suffix)] if os.path.exists(base_path) else []
                if not options:
                    return "none"
                return rng.choice(options)
            return selected

        # Resolve randoms
        tune_tensor_file = pick_file(tune_tensor_file, "_tune.safetensors")
        pooled_output_file = pick_file(pooled_output_file, "_pooled.safetensors")
        lyrics_file = pick_file(lyrics_file, "_lyrics.safetensors")
        audio_codes_file = pick_file(audio_codes_file, "_codes.json")

        # Determine Tune Tensor (Required base or generated default)
        if tune_tensor_file != "none":
            tune_path = os.path.join(base_path, tune_tensor_file)
            tune_tensor = load_file(tune_path).get("tune")
            # If it's 2D [L, D], unsqueeze to [1, L, D]
            if tune_tensor.dim() == 2:
                tune_tensor = tune_tensor.unsqueeze(0)
        else:
            tune_tensor = None

        metadata = {}
        
        # Load other components
        pooled = None
        if pooled_output_file != "none":
            pooled = load_file(os.path.join(base_path, pooled_output_file)).get("pooled")
            metadata["pooled_output"] = pooled
            
        lyrics = None
        if lyrics_file != "none":
            lyrics = load_file(os.path.join(base_path, lyrics_file)).get("lyrics")
            if lyrics.dim() == 2:
                lyrics = lyrics.unsqueeze(0)
            metadata["conditioning_lyrics"] = lyrics
            
        codes = None
        if audio_codes_file != "none":
            with open(os.path.join(base_path, audio_codes_file), "r") as f:
                codes = json.load(f)
                metadata["audio_codes"] = codes
        
        # Synchronize sequence lengths for missing components
        batch_size = 1
        seq_len = 1
        device = "cpu"
        
        if tune_tensor is not None:
            batch_size = tune_tensor.shape[0]
            seq_len = tune_tensor.shape[1]
            device = tune_tensor.device
        elif lyrics is not None:
            batch_size = lyrics.shape[0]
            seq_len = lyrics.shape[1]
            device = lyrics.device
        elif pooled is not None:
            batch_size = pooled.shape[0]
            device = pooled.device

        # If no tune_tensor, generate a zero default
        if tune_tensor is None:
            tune_tensor = torch.zeros((batch_size, seq_len, 1024), device=device)
            base_tune = "placeholder"
        else:
            base_tune = tune_tensor_file.replace("_tune.safetensors", "")

        # Ensure lyrics is a zero tensor if missing
        if lyrics is None:
            lyrics = torch.zeros((batch_size, seq_len, 1024), device=device)
            metadata["conditioning_lyrics"] = lyrics
            
        # Construct filename-safe info string: tune_pool(if any)_lyrics_codes
        def get_base(filename, suffix):
            if filename == "none": return None
            return filename.replace(suffix, "")

        # base_tune already defined above in the new logic
        base_pool = get_base(pooled_output_file, "_pooled.safetensors")
        base_lyrics = get_base(lyrics_file, "_lyrics.safetensors")
        base_codes = get_base(audio_codes_file, "_codes.json")
        
        parts = [base_tune]
        if base_pool: parts.append(base_pool)
        parts.append(base_lyrics if base_lyrics else "nolyrics")
        parts.append(base_codes if base_codes else "noaudiocodes")
        
        filename_info = "_".join(parts)
            
        return ([[tune_tensor, metadata]], filename_info)

NODE_CLASS_MAPPINGS = {
    "AceStepConditioningMixerLoader": AceStepConditioningMixerLoader,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepConditioningMixerLoader": "Conditioning Mixer Loader",
}
