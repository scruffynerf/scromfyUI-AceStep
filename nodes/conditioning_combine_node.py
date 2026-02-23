"""AceStepConditioningCombine node for ACE-Step"""
import torch

class AceStepConditioningCombine:
    """Assemble separate components into a full ACE-Step conditioning"""
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "empty_mode": (["zeros", "ones", "random"], {"default": "zeros"}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },
            "optional": {
                "tune_tensor": ("TENSOR",),
                "pooled_output": ("TENSOR",),
                "lyrics_tensor": ("TENSOR",),
                "audio_codes": ("LIST",),
            }
        }
    
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "combine"
    CATEGORY = "Scromfy/Ace-Step/advanced"

    def combine(self, empty_mode, seed, tune_tensor=None, pooled_output=None, lyrics_tensor=None, audio_codes=None):
        # If both are missing, we use length 1
        # If one is present, we match its length
        
        batch_size = 1
        seq_len = 1
        device = "cpu"
        
        # 1. Inspect available tensors for dimensions
        if tune_tensor is not None:
            if tune_tensor.dim() == 2:
                tune_tensor = tune_tensor.unsqueeze(0)
            batch_size = tune_tensor.shape[0]
            seq_len = tune_tensor.shape[1]
            device = tune_tensor.device
        elif lyrics_tensor is not None:
            if lyrics_tensor.dim() == 2:
                lyrics_tensor = lyrics_tensor.unsqueeze(0)
            batch_size = lyrics_tensor.shape[0]
            seq_len = lyrics_tensor.shape[1]
            device = lyrics_tensor.device
        elif pooled_output is not None:
            batch_size = pooled_output.shape[0]
            device = pooled_output.device

        # 2. Backfill missing tensors with matching dimensions and mode
        def create_empty(b, l, d, dev, mode, s):
            if mode == "zeros":
                return torch.zeros((b, l, d), device=dev)
            elif mode == "ones":
                return torch.ones((b, l, d), device=dev)
            elif mode == "random":
                generator = torch.Generator(device=dev)
                generator.manual_seed(s)
                return torch.randn((b, l, d), device=dev, generator=generator)
            return torch.zeros((b, l, d), device=dev)

        if tune_tensor is None:
            tune_tensor = create_empty(batch_size, seq_len, 1024, device, empty_mode, seed)
            
        if lyrics_tensor is None:
            lyrics_tensor = create_empty(batch_size, seq_len, 1024, device, empty_mode, seed + 1) # slightly different seed for variation

        metadata = {
            "pooled_output": pooled_output,
            "conditioning_lyrics": lyrics_tensor,
            "audio_codes": audio_codes
        }
        
        return ([[tune_tensor, metadata]],)

NODE_CLASS_MAPPINGS = {
    "AceStepConditioningCombine": AceStepConditioningCombine,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepConditioningCombine": "Conditioning Component Combiner",
}
