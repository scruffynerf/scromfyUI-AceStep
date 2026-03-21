"""AceStepTensorMaskGenerator node for ACE-Step"""
import torch

class AceStepTensorMaskGenerator:
    """Generates a temporal mask (0.0 to 1.0) synchronized to an exact tensor length.
    
    Unlike the Audio Mask node which calculates length from seconds and sample rates, 
    this node directly inspects an existing tensor (e.g., `timbre_tensor`) to match 
    its length (N), using logical sequence indices rather than seconds.
    
    Inputs:
        context_tensor (TENSOR): The reference tensor used purely to determine sequence length.
        mode (STRING): Masking shape (range, fraction, ramp, window, etc.).
        start (INT): Start sequence index for range/window modes.
        end (INT): End sequence index for range/window modes.
        fraction (FLOAT): Percentage point for fraction split mode.
        ramp_len (INT): Duration of fade in/out slopes in sequence steps.
        reverse (BOOLEAN): Inverts the entire calculated mask.
        
    Outputs:
        MASK: A properly shaped `[1, N, 1]` temporal mask tensor.
    """
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "context_tensor": ("TENSOR",),
                "mode": (["all", "none", "fraction", "range", "ramp", "window"], {"default": "all"}),
                "start": ("INT", {"default": 0, "min": 0, "max": 10000}),
                "end": ("INT", {"default": 100, "min": 0, "max": 10000}),
                "fraction": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "ramp_len": ("INT", {"default": 10, "min": 0, "max": 1000}),
                "reverse": ("BOOLEAN", {"default": False}),
            }
        }
    
    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = "generate"
    CATEGORY = "Scromfy/Ace-Step/Conditioning"

    def generate(self, context_tensor, mode, start, end, fraction, ramp_len, reverse):
        # Determine N from context_tensor [B, L, D] or [L, D]
        if context_tensor.dim() == 3:
            N = context_tensor.size(1)
            device = context_tensor.device
        else:
            N = context_tensor.size(0)
            device = context_tensor.device
            
        mask = torch.zeros(N, device=device)

        if mode == "all":
            mask = torch.ones(N, device=device)
        elif mode == "none":
            mask = torch.zeros(N, device=device)
        elif mode == "fraction":
            cutoff = int(N * fraction)
            if reverse:
                mask[cutoff:] = 1.0
            else:
                mask[:cutoff] = 1.0
        elif mode == "range":
            s = max(0, min(N, start))
            e = max(0, min(N, end))
            mask[s:e] = 1.0
        elif mode == "ramp":
            ramp = torch.linspace(0, 1, N, device=device)
            if reverse:
                ramp = 1.0 - ramp
            mask = ramp
        elif mode == "window":
            s = max(0, min(N, start))
            e = max(0, min(N, end))
            # Hard center
            mask[s:e] = 1.0
            # Left ramp
            if ramp_len > 0:
                l_start = max(0, s - ramp_len)
                l_len = s - l_start
                if l_len > 0:
                    l_ramp = torch.linspace(0, 1, l_len, device=device)
                    mask[l_start:s] = l_ramp
                # Right ramp
                r_end = min(N, e + ramp_len)
                r_len = r_end - e
                if r_len > 0:
                    r_ramp = torch.linspace(1, 0, r_len, device=device)
                    mask[e:r_end] = r_ramp

        # Reshape to [1, N, 1] to match ACE-Step requirements
        return (mask.clamp(0, 1)[None, :, None],)

NODE_CLASS_MAPPINGS = {
    "AceStepTensorMaskGenerator": AceStepTensorMaskGenerator,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepTensorMaskGenerator": "Tensor Mask Generator",
}
