"""AceStepConditioningLoad node for ACE-Step"""
import os
import torch

class AceStepConditioningLoad:
    """Load conditioning components from separate files and reconstruct conditioning"""
    
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
        # We assume single item load for now as per simple prefix logic
        # If user wants batch, they could extend this or use multiple nodes.
        
        main_file = os.path.join(load_path, f"{filename_prefix}_main.pt")
        if not os.path.exists(main_file):
            raise FileNotFoundError(f"Main conditioning file not found: {main_file}")
            
        main_tensor = torch.load(main_file, weights_only=True)
        metadata = {}
        
        # 1. Pooled Output
        pooled_file = os.path.join(load_path, f"{filename_prefix}_pooled.pt")
        if os.path.exists(pooled_file):
            metadata["pooled_output"] = torch.load(pooled_file, weights_only=True)
        else:
            metadata["pooled_output"] = None
            
        # 2. Conditioning Lyrics
        lyrics_file = os.path.join(load_path, f"{filename_prefix}_lyrics.pt")
        if os.path.exists(lyrics_file):
            metadata["conditioning_lyrics"] = torch.load(lyrics_file, weights_only=True)
            
        # 3. Audio Codes
        codes_file = os.path.join(load_path, f"{filename_prefix}_codes.pt")
        if os.path.exists(codes_file):
            metadata["audio_codes"] = torch.load(codes_file, weights_only=True)
            
        return ([[main_tensor, metadata]],)

NODE_CLASS_MAPPINGS = {
    "AceStepConditioningLoad": AceStepConditioningLoad,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepConditioningLoad": "Load Conditioning Elements",
}
