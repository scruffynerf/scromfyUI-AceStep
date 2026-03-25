import torch
import torchaudio
import logging
import node_helpers
from .includes.mapping_utils import TRACK_NAMES

logger = logging.getLogger(__name__)


class AceStepBaseComplete:
    """Prepares conditioning for ACE-Step multi-track accompaniment completion.
    IMPORTANT: Requires the Base (non-turbo) model.

    This is a CONDITIONING PREP node. Connect its outputs to ScromfyAceStepSampler.
    The node:
    1. Builds a track-classes instruction from the selected tracks.
    2. Injects the task instruction into the conditioning.
    3. Returns the modified conditioning.

    Workflow:
        conditioning → [AceStepBaseComplete] → conditioning → [ScromfyAceStepSampler]
    """

    @classmethod
    def INPUT_TYPES(cls):
        inputs = {
            "required": {
                "conditioning": ("CONDITIONING",),
            },
            "optional": {}
        }
        
        # Track selection defaults
        defaults = {"drums", "bass", "strings"}
        
        for track in TRACK_NAMES:
            inputs["optional"][track] = ("BOOLEAN", {"default": track in defaults})
            
        return inputs

    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("conditioning",)
    FUNCTION = "prepare"
    CATEGORY = "Scromfy/Ace-Step/Conditioning"

    def prepare(self, conditioning, **kwargs):
        
        # 1. Build track list from keyword arguments
        # We only consider tracks that are in TRACK_NAMES
        track_list = [name for name in TRACK_NAMES if kwargs.get(name, False)]

        if not track_list:
            raise ValueError("Select at least one track to add.")

        track_classes_str = ", ".join(track_list)

        # 2. Build task instruction to inject into conditioning
        instruction = f"Complete the input track with {track_classes_str}:"

        conditioning = node_helpers.conditioning_set_values(conditioning, {
            "instruction": instruction,
            "task_type": "complete",
        }, append=True)

        logger.info(f"BaseComplete: prepared conditioning for completing with '{track_classes_str}'.")

        return (conditioning,)


NODE_CLASS_MAPPINGS = {
    "AceStepBaseComplete": AceStepBaseComplete
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepBaseComplete": "AceStep Conditioning: Complete Audio Track"
}
