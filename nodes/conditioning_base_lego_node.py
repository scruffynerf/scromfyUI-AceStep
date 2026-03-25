import torch
import torchaudio
import math
import logging
import node_helpers
from .includes.mapping_utils import TRACK_NAMES

logger = logging.getLogger(__name__)


class AceStepBaseLego:
    """Prepares conditioning for ACE-Step context-aware track generation.
    IMPORTANT: Requires the Base (non-turbo) model.

    This is a CONDITIONING PREP node. Connect its outputs to ScromfyAceStepSampler.
    The node:
    1. Injects a lego task instruction into the conditioning.
    2. Returns the modified conditioning, context latent as latent_image and a region mask.

    Workflow:
        conditioning → [AceStepBaseLego] → conditioning, latent_image, mask → [ScromfyAceStepSampler]
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "conditioning": ("CONDITIONING",),
                "latent_image": ("LATENT",),
                "track_name": (TRACK_NAMES, {"default": "drums"}),
            },
            "optional": {
                "region_start_s": ("FLOAT", {
                    "default": 0.0, "min": 0.0, "max": 600.0, "step": 0.1,
                    "tooltip": "Start of the audio region (in seconds). (0 = full track)"
                }),
                "region_end_s": ("FLOAT", {
                    "default": -1.0, "min": -1.0, "max": 600.0, "step": 0.1,
                    "tooltip": "End of the audio region (in seconds). (-1 = end of track)"
                }),
            },
        }

    RETURN_TYPES = ("CONDITIONING", "LATENT", "MASK")
    RETURN_NAMES = ("conditioning", "latent_image", "mask")
    FUNCTION = "prepare"
    CATEGORY = "Scromfy/Ace-Step/Conditioning"

    def prepare(self, conditioning, latent_image, track_name,
                region_start_s=0.0, region_end_s=-1.0):
        latent_fps = 25  # ACE-Step 1.5 latent frame rate (25Hz)

        # 1. Extract latents
        src_latent = latent_image["samples"]  # [B, D, T_latent]
        B, D, T_lat = src_latent.shape

        # 2. Build region mask (1 = generate, 0 = keep from source)
        if region_start_s == 0.0 and region_end_s == -1.0:
            # Full track: generate everything
            mask = torch.ones(B, 1, T_lat, device=src_latent.device)
        else:
            start_frame = int(region_start_s * latent_fps)
            end_frame = T_lat if region_end_s < 0 else min(int(region_end_s * latent_fps), T_lat)
            mask = torch.zeros(B, 1, T_lat, device=src_latent.device)
            mask[:, :, start_frame:end_frame] = 1.0

        # 3. Build task instruction to inject into conditioning
        instruction = f"Generate the {track_name} track based on the audio context:"

        conditioning = node_helpers.conditioning_set_values(conditioning, {
            "instruction": instruction,
            "task_type": "lego",
        }, append=True)

        logger.info(f"BaseLego: prepared conditioning for '{track_name}' lego. "
                    f"Latent shape: {src_latent.shape}, mask coverage: {mask.mean().item():.1%}")

        return (conditioning, latent_image, mask.squeeze(1))


NODE_CLASS_MAPPINGS = {
    "AceStepBaseLego": AceStepBaseLego
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepBaseLego": "AceStep Conditioning: Audio Track Lego"
}
