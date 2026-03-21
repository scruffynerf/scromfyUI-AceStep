import torch
from .includes.sampling_utils import zero_out

class AceStepZeroOutConditioning:
    """Zeroes out all internal tensors of a conditioning object and strips audio codes.
    
    Provides a pure negative/unconditional input for the sampler by truly zeroing out
    the `timbre_tensor`, `pooled_output`, and `lyrics_tensor`, while explicitly 
    removing the structural `audio_codes` from the metadata dictionary.
    
    Inputs:
        conditioning (CONDITIONING): The base bundle to be zeroed.
        
    Outputs:
        CONDITIONING: The fully zeroed and stripped bundle.
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
