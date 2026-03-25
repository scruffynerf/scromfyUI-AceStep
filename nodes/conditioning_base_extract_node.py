import torch
import torchaudio
import logging
import node_helpers
from .includes.mapping_utils import TRACK_NAMES

logger = logging.getLogger(__name__)


class AceStepBaseExtract:
    """Prepares conditioning for ACE-Step stem extraction.
    IMPORTANT: Requires the Base (non-turbo) model.

    This is a CONDITIONING PREP node. Connect its outputs to ScromfyAceStepSampler.
    The node:
    1. Injects a task instruction into the conditioning.
    2. Returns the modified conditioning.

    Workflow:
        conditioning → [AceStepBaseExtract] → conditioning → [ScromfyAceStepSampler]
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "conditioning": ("CONDITIONING",),
                "track_name": (TRACK_NAMES, {"default": "vocals"}),
            },
        }

    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("conditioning",)
    FUNCTION = "prepare"
    CATEGORY = "Scromfy/Ace-Step/Conditioning"

    def prepare(self, conditioning, track_name):
        
        # 1. Build task instruction to inject into conditioning
        # The ACE-Step base model uses the instruction key in conditioning
        instruction = f"Extract the {track_name} track from the audio:"

        conditioning = node_helpers.conditioning_set_values(conditioning, {
            "instruction": instruction,
            "task_type": "extract",
        }, append=True)

        logger.info(f"BaseExtract: prepared conditioning for '{track_name}' extraction.")

        return (conditioning,)


NODE_CLASS_MAPPINGS = {
    "AceStepBaseExtract": AceStepBaseExtract
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepBaseExtract": "AceStep Conditioning: Extract Audio Track"
}
