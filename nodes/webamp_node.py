import os
from .radio_node import RadioPlayerNode

class AceStepWebAmpRadio(RadioPlayerNode):
    """Winamp-style radio player using WebAmp"""
    
    @classmethod
    def INPUT_TYPES(cls):
        base = RadioPlayerNode.INPUT_TYPES()
        base["required"]["skin_url"] = ("STRING", {"default": ""})
        # Add a way to pass initial layout or other WebAmp specific settings if needed
        return base

    RETURN_TYPES = ()
    OUTPUT_NODE = True
    FUNCTION = "run"
    CATEGORY = "Scromfy/Ace-Step/Radio"

    def run(self, folder: str, skin_url: str = "", poll_interval_seconds: float = 60.0):
        # We don't need to do anything server-side, it's all in the widget
        return {}

NODE_CLASS_MAPPINGS = {
    "AceStepWebAmpRadio": AceStepWebAmpRadio,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepWebAmpRadio": "WebAmp Radio 📻",
}
