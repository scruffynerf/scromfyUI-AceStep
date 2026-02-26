"""AceStepAudioCodesUnaryOp node for ACE-Step"""
import torch
import torch.nn.functional as F
import logging
import hashlib
import comfy.model_management
from .includes.fsq_utils import (
    parse_audio_codes, fsq_decode_indices, fsq_encode_to_indices, get_fsq_levels
)

logger = logging.getLogger(__name__)

class AceStepAudioCodesUnaryOp:
    """Operations that transform a single set of audio codes (A) in 6D FSQ space with optional masking"""
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "audio_codes": ("LIST",),
                "model": ("MODEL",),
                "mode": (["gate", "scale_masked", "noise_masked", "fade_out"], {"default": "gate"}),
                "strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                "sigma": ("FLOAT", {"default": 0.01, "min": 0.0, "max": 1.0, "step": 0.001}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },
            "optional": {
                "mask": ("MASK",),
            }
        }
    
    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("audio_codes",)
    FUNCTION = "process"
    CATEGORY = "Scromfy/Ace-Step/audio"

    @classmethod
    def IS_CHANGED(s, audio_codes, mode, strength, sigma, seed, mask=None):
        try:
            # Hash some samples and parameters
            sample = str(audio_codes[0][:5]) if audio_codes else "e"
            info = f"{sample}_{mode}_{strength}_{sigma}_{seed}"
            if mask is not None:
                info += f"_{mask.abs().mean().item():.4f}"
            return hashlib.md5(info.encode()).hexdigest()
        except:
            return "random"

    def process(self, audio_codes, model, mode, strength, sigma, seed, mask=None):
        inner_model = model.model
        if hasattr(inner_model, "diffusion_model"):
            inner_model = inner_model.diffusion_model

        comfy.model_management.load_model_gpu(model)
        device = comfy.model_management.get_torch_device()
        levels = get_fsq_levels(inner_model)

        parsed = parse_audio_codes(audio_codes)

        if not parsed or not parsed[0]:
            logger.error("Empty audio_codes input")
            return (audio_codes,)

        ids = parsed[0]

        # Decode to 6D float space [1, T, 6]
        A = fsq_decode_indices(torch.tensor(ids, dtype=torch.long, device=device).unsqueeze(0), levels)

        # Prepare mask
        target_len = A.shape[1]
        if mask is None:
            mask = torch.ones((1, target_len, 1), device=device)
        else:
            # Resize mask if needed [B, T] or [B, H, W] to [1, T, 1]
            mask = mask.to(device)
            if mask.dim() == 2: # [B, T]
                mask = mask.unsqueeze(-1)
            elif mask.dim() == 3: # [B, H, W]
                mask = mask.mean(dim=1).unsqueeze(-1) # Flatten spatial
            
            if mask.shape[1] != target_len:
                # Interpolate mask
                mask = mask.transpose(1, 2)
                mask = F.interpolate(mask, size=target_len, mode='linear', align_corners=False)
                mask = mask.transpose(1, 2)

        # Perform Operations in 6D space
        if mode == "gate":
            # Gating: A * mask (values move towards 0.0 midpoint)
            out = A * mask
            
        elif mode == "scale_masked":
            # Scale A only where mask > 0
            # formula: A * (1.0 + mask * (strength - 1.0))
            out = A * (1.0 + mask * (strength - 1.0))
            
        elif mode == "noise_masked":
            # Add noise only where mask allows
            generator = torch.Generator(device=device)
            generator.manual_seed(seed)
            noise = torch.randn_like(A, generator=generator) * sigma
            out = A + mask * noise
            
        elif mode == "fade_out":
            # Special case: linear ramp multiply
            N = target_len
            fade = torch.linspace(1, 0, N, device=device)[None, :, None]
            # (1.0 - mask) * A + mask * (A * fade)
            out = A * (1.0 - mask) + (A * fade) * mask
            
        else:
            out = A

        # Clamp to FSQ range [-1, 1] before encoding
        out = out.clamp(-1.0, 1.0)
        
        # Encode back to indices
        result_ids = fsq_encode_to_indices(out, levels)[0].tolist()

        return ([result_ids],)

NODE_CLASS_MAPPINGS = {
    "AceStepAudioCodesUnaryOp": AceStepAudioCodesUnaryOp,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepAudioCodesUnaryOp": "Audio Codes Unary Operations",
}
