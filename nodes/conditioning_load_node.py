"""AceStepConditioningLoad node for ACE-Step"""
import os
import json
import torch
from safetensors.torch import load_file

class AceStepConditioningLoad:
    """Load conditioning components from separate files (safetensors/json) and reconstruct conditioning"""
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "load_path": ("STRING", {"default": "output/conditioning"}),
                "filename_prefix": ("STRING", {"default": "ace_cond"}),
            }
        }
    
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "load"
    CATEGORY = "Scromfy/Ace-Step/advanced"

    def load(self, load_path, filename_prefix):
        main_file = os.path.join(load_path, f"{filename_prefix}_main.safetensors")
        if not os.path.exists(main_file):
            raise FileNotFoundError(f"Main conditioning file not found: {main_file}")
            
        main_tensor = load_file(main_file).get("main")
        metadata = {}
        
        # 1. Pooled Output
        pooled_file = os.path.join(load_path, f"{filename_prefix}_pooled.safetensors")
        if os.path.exists(pooled_file):
            metadata["pooled_output"] = load_file(pooled_file).get("pooled")
        else:
            metadata["pooled_output"] = None
            
        # 2. Conditioning Lyrics
        lyrics_file = os.path.join(load_path, f"{filename_prefix}_lyrics.safetensors")
        if os.path.exists(lyrics_file):
            metadata["conditioning_lyrics"] = load_file(lyrics_file).get("lyrics")
            
        # 3. Audio Codes
        codes_file = os.path.join(load_path, f"{filename_prefix}_codes.json")
        if os.path.exists(codes_file):
            with open(codes_file, "r") as f:
                metadata["audio_codes"] = json.load(f)
            
        return ([[main_tensor, metadata]],)

NODE_CLASS_MAPPINGS = {
    "AceStepConditioningLoad": AceStepConditioningLoad,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepConditioningLoad": "Load Conditioning Elements",
}
