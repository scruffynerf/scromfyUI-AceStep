import torch
import torch.nn.functional as F
from .includes.mixer_utils import match_lengths

class AceStepTensorMixer:
    """A comprehensive mathematical toolbox for blending, masking, and combining two continuous tensors.
    
    Operates on dense continuous embeddings (like the `timbre_tensor` or `lyrics_tensor`). 
    Allows for complex audio algebra such as blending instruments, injecting vocal styles, 
    or applying specific rhythmic masks.
    
    Inputs:
        tensor_A (TENSOR): Primary continuous tensor.
        tensor_B (TENSOR): Secondary continuous tensor.
        mode (STRING): The mathematical blending operation to apply.
        alpha (FLOAT): Primary blend weighting.
        ratio (FLOAT): Secondary blend weighting.
        weight (FLOAT): Strength multiplier for difference injections.
        eps (FLOAT): Threshold for dominant/recessive blending.
        scale_mode (STRING): Handling logic for sequences of mismatched lengths.
        
    Optional Inputs:
        mask (MASK): Allows for temporal/spatial masking of the blend operation.
        
    Outputs:
        TENSOR: The newly mathematically mixed tensor.
    """
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "tensor_A": ("TENSOR",),
                "tensor_B": ("TENSOR",),
                "mode": ([
                    "blend", "lerp", "inject", "average", "difference_injection", 
                    "dominant_recessive", "replace", "concatenate", "add", 
                    "multiply", "maximum", "minimum"
                ], {"default": "blend"}),
                "alpha": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "ratio": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "weight": ("FLOAT", {"default": 1.0, "min": -2.0, "max": 2.0, "step": 0.01}),
                "eps": ("FLOAT", {"default": 0.05, "min": 0.0, "max": 1.0, "step": 0.001}),
                "scale_mode": (["scale_B_to_A", "scale_A_to_B", "pad_to_match", "loop_match", "none"], {"default": "scale_B_to_A"}),
            },
            "optional": {
                "mask": ("MASK",),
            }
        }
    
    RETURN_TYPES = ("TENSOR",)
    FUNCTION = "mix"
    CATEGORY = "Scromfy/Ace-Step/Conditioning"

    def mix(self, tensor_A, tensor_B, mode, alpha, ratio, weight, eps, scale_mode, mask=None):
        A = tensor_A.clone()
        B = tensor_B.clone()
        
        # Sequence length dimension is usually index 1 if 3D, 0 if 2D
        L_idx = 1 if A.dim() == 3 else 0
        
        # Scaling / Interpolation (Silent scaling by default)
        # We handle "none" as "scale_B_to_A" for safety unless it's concatenate
        if mode == "concatenate" and scale_mode == "none":
            pass
        else:
            A, B = match_lengths(A, B, scale_mode, dim=L_idx)
            
        # Default mask is all ones
        if mask is None:
            mask = torch.ones((1, A.size(1), 1), device=A.device)
            
        # Core Operations
        if mode == "blend":
            # lerp(B, A, mask) -> mask == 1 -> A, mask == 0 -> B
            out = mask * A + (1.0 - mask) * B
        elif mode == "lerp":
            # Blend A and B by alpha, only in masked area
            blended = alpha * A + (1.0 - alpha) * B
            out = mask * blended + (1.0 - mask) * A
        elif mode == "inject":
            # A + mask * B
            out = A + mask * B
        elif mode == "average":
            # 0.5 * (A + B) only in masked area
            res = 0.5 * (A + B)
            out = mask * res + (1.0 - mask) * A
        elif mode == "difference_injection":
            # weight * (B - A) injected via mask
            delta = weight * (B - A)
            out = A + mask * delta
        elif mode == "dominant_recessive":
            # A + eps * B via mask
            out = A + mask * (eps * B)
        elif mode == "replace":
            # Replace A with B where mask == 1
            out = mask * B + (1.0 - mask) * A
        elif mode == "concatenate":
            # Join tensors sequentially (ignoring mask for base op, or should we?)
            # Usually concat is structural, but we applies mask to B before concat
            out = torch.cat([A, B * mask], dim=L_idx) if mask.shape[1] == B.shape[L_idx] else torch.cat([A, B], dim=L_idx)
        elif mode == "add":
            res = A + B
            out = mask * res + (1.0 - mask) * A
        elif mode == "multiply":
            res = A * B
            out = mask * res + (1.0 - mask) * A
        elif mode == "maximum":
            res = torch.max(A, B)
            out = mask * res + (1.0 - mask) * A
        elif mode == "minimum":
            res = torch.min(A, B)
            out = mask * res + (1.0 - mask) * A
        else:
            out = A
            
        return (out,)

NODE_CLASS_MAPPINGS = {
    "AceStepTensorMixer": AceStepTensorMixer,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepTensorMixer": "Tensor Conditioning Mixer",
}
