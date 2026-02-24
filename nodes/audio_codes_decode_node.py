"""AceStepAudioCodesDecoder node for ACE-Step"""
import torch

class AceStepAudioCodesDecoder:
    """Reconstruct text from Audio Codes (token IDs) using CLIP tokenizer"""
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "clip": ("CLIP",),
                "audio_codes": ("LIST",), # This matches the output of the Save/Load nodes
            }
        }
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "decode"
    CATEGORY = "Scromfy/Ace-Step/text"

    def decode(self, clip, audio_codes):
        # audio_codes is expected to be a list of ints (token IDs)
        # ComfyUI's CLIP object has a tokenizer attribute
        
        if not audio_codes:
            return ("No audio codes provided.",)
            
        try:
            # Ensure we are dealing with a flat list of integers
            if isinstance(audio_codes, list) and len(audio_codes) > 0:
                # If it's a list of tensors or nested list, flatten it
                flat_codes = []
                for item in audio_codes:
                    if isinstance(item, (int, float)):
                        flat_codes.append(int(item))
                    elif torch.is_tensor(item):
                        if item.numel() == 1:
                            flat_codes.append(int(item.item()))
                        else:
                            # Handle batch or sequence tensor
                            flat_codes.extend(item.flatten().tolist())
                    elif isinstance(item, list):
                        flat_codes.extend(item)
                
                # Use the tokenizer to decode
                # clip.tokenizer is available in standard ComfyUI CLIP wrapper
                text = clip.tokenizer.decode(flat_codes)
                return (text,)
            else:
                return (f"Invalid audio_codes format: {type(audio_codes)}",)
                
        except Exception as e:
            return (f"Error decoding audio codes: {str(e)}",)

NODE_CLASS_MAPPINGS = {
    "AceStepAudioCodesDecoder": AceStepAudioCodesDecoder,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepAudioCodesDecoder": "Audio Codes Decoder",
}
