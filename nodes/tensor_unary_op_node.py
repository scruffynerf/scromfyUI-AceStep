"""AceStepTensorUnaryOp node for ACE-Step"""
import torch

class AceStepTensorUnaryOp:
    """Operations that transform a single input A with optional masking"""
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "tensor_A": ("TENSOR",),
                "mode": (["gate", "scale_masked", "noise_masked", "fade_out"], {"default": "gate"}),
                "strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                "sigma": ("FLOAT", {"default": 0.01, "min": 0.0, "max": 1.0, "step": 0.001}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },
            "optional": {
                "mask": ("MASK",),
            }
        }
    
    RETURN_TYPES = ("TENSOR",)
    FUNCTION = "process"
    CATEGORY = "Scromfy/Ace-Step/processing"

    def process(self, tensor_A, mode, strength, sigma, seed, mask=None):
        A = tensor_A.clone()
        
        # Default mask is all ones if not provided
        if mask is None:
            if A.dim() == 3:
                mask = torch.ones((1, A.size(1), 1), device=A.device)
            else:
                mask = torch.ones((A.size(0), 1), device=A.device)
                mask = mask.unsqueeze(0) # [1, L, 1]
        
        if mode == "gate":
            # Gating: A * mask
            return (A * mask,)
            
        elif mode == "scale_masked":
            # Scale A only where mask > 0
            # formula: A * (1.0 + mask * (strength - 1.0))
            return (A * (1.0 + mask * (strength - 1.0)),)
            
        elif mode == "noise_masked":
            # Add noise only where mask allows
            generator = torch.Generator(device=A.device)
            generator.manual_seed(seed)
            noise = torch.randn_like(A, generator=generator) * sigma
            return (A + mask * noise,)
            
        elif mode == "fade_out":
            # Special case: linear ramp multiply
            N = A.size(1) if A.dim() == 3 else A.size(0)
            fade = torch.linspace(1, 0, N, device=A.device)[None, :, None]
            # (1.0 - mask) * A + mask * (A * fade)
            return (A * (1.0 - mask) + (A * fade) * mask,)
            
        return (A,)

NODE_CLASS_MAPPINGS = {
    "AceStepTensorUnaryOp": AceStepTensorUnaryOp,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepTensorUnaryOp": "Tensor Unary Operations",
}
