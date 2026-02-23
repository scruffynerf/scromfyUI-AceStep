"""AceStepConditioningSave node for ACE-Step"""
import os
import torch

class AceStepConditioningSave:
    """Save conditioning components to separate files"""
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "conditioning": ("CONDITIONING",),
                "save_path": ("STRING", {"default": "output/conditioning"}),
                "filename_prefix": ("STRING", {"default": "ace_cond"}),
            }
        }
    
    RETURN_TYPES = ()
    OUTPUT_NODE = True
    FUNCTION = "save"
    CATEGORY = "Scromfy/Ace-Step/advanced"

    def save(self, conditioning, save_path, filename_prefix):
        if not os.path.isabs(save_path):
            # Resolve relative to ComfyUI root if possible, 
            # but usually it's better to just use absolute or let OS handle it.
            # We'll ensure directory exists.
            os.makedirs(save_path, exist_ok=True)
        else:
            os.makedirs(save_path, exist_ok=True)

        for i, item in enumerate(conditioning):
            # Handle list of conditionings (batch)
            main_tensor = item[0]
            metadata = item[1]
            
            # Use suffix for batch if more than 1
            suffix = f"_{i}" if len(conditioning) > 1 else ""
            base_name = f"{filename_prefix}{suffix}"
            
            # 1. Main Tensor
            torch.save(main_tensor, os.path.join(save_path, f"{base_name}_main.pt"))
            
            # 2. Pooled Output
            pooled = metadata.get("pooled_output")
            if pooled is not None:
                torch.save(pooled, os.path.join(save_path, f"{base_name}_pooled.pt"))
            
            # 3. Conditioning Lyrics
            lyrics = metadata.get("conditioning_lyrics")
            if lyrics is not None:
                torch.save(lyrics, os.path.join(save_path, f"{base_name}_lyrics.pt"))
                
            # 4. Audio Codes
            codes = metadata.get("audio_codes")
            if codes is not None:
                torch.save(codes, os.path.join(save_path, f"{base_name}_codes.pt"))
                
        return {}

NODE_CLASS_MAPPINGS = {
    "AceStepConditioningSave": AceStepConditioningSave,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepConditioningSave": "Save Conditioning Elements",
}
