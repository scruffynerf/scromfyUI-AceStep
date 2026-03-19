import torch
from .includes.sampling_utils import zero_out

class AceStepZeroOutConditioning:
    """Zero out conditioning tensors and remove audio_codes.
    
    Like ComfyUI's ConditioningZeroOut but also strips audio_codes
    from the conditioning dict, which the standard node does not do.
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"conditioning": ("CONDITIONING",)}}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "execute"
    CATEGORY = "Scromfy/Ace-Step/Conditioning"

    def execute(self, conditioning):
        return (zero_out(conditioning),)


NODE_CLASS_MAPPINGS = {
    "AceStepZeroOutConditioning": AceStepZeroOutConditioning,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepZeroOutConditioning": "True Zero Out Conditioning",
}
