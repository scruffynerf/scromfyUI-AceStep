"""AceStepConditioningMixerLoader node for ACE-Step"""
import os
import json
import torch
from safetensors.torch import load_file

def get_conditioning_files(suffix):
    base_path = "output/conditioning"
    if not os.path.exists(base_path):
        return ["none"]
    
    files = [f for f in os.listdir(base_path) if f.endswith(suffix)]
    return sorted(files) + ["none"]

class AceStepConditioningMixerLoader:
    """Load and mix specific conditioning components from saved files (safetensors/json)"""
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "main_tensor_file": (get_conditioning_files("_main.safetensors"),),
                "pooled_output_file": (get_conditioning_files("_pooled.safetensors"),),
                "lyrics_file": (get_conditioning_files("_lyrics.safetensors"),),
                "audio_codes_file": (get_conditioning_files("_codes.json"),),
            }
        }
    
    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("conditioning",)
    FUNCTION = "load_and_mix"
    CATEGORY = "Scromfy/Ace-Step/advanced"

    @classmethod
    def IS_CHANGED(s, main_tensor_file, pooled_output_file, lyrics_file, audio_codes_file):
        return f"{main_tensor_file}_{pooled_output_file}_{lyrics_file}_{audio_codes_file}"

    def load_and_mix(self, main_tensor_file, pooled_output_file, lyrics_file, audio_codes_file):
        base_path = "output/conditioning"
        
        # 1. Main Tensor (Required base)
        if main_tensor_file == "none":
            raise ValueError("Mixer Loader requires at least a Main Tensor file to establish the base conditioning.")
            
        main_path = os.path.join(base_path, main_tensor_file)
        main_tensor = load_file(main_path).get("main")
        metadata = {}
        
        # 2. Pooled Output
        if pooled_output_file != "none":
            metadata["pooled_output"] = load_file(os.path.join(base_path, pooled_output_file)).get("pooled")
        else:
            metadata["pooled_output"] = None
            
        # 3. Conditioning Lyrics
        if lyrics_file != "none":
            metadata["conditioning_lyrics"] = load_file(os.path.join(base_path, lyrics_file)).get("lyrics")
            
        # 4. Audio Codes
        if audio_codes_file != "none":
            with open(os.path.join(base_path, audio_codes_file), "r") as f:
                metadata["audio_codes"] = json.load(f)
            
        return ([[main_tensor, metadata]],)

NODE_CLASS_MAPPINGS = {
    "AceStepConditioningMixerLoader": AceStepConditioningMixerLoader,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepConditioningMixerLoader": "Conditioning Mixer Loader",
}
