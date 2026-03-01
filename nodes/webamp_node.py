import os
from .radio_node import RadioPlayerNode

class AceStepWebAmpRadio(RadioPlayerNode):
    """Winamp-style radio player using WebAmp"""
    
    @classmethod
    def INPUT_TYPES(cls):
        base = RadioPlayerNode.INPUT_TYPES()
        base["required"]["skin_url"] = ("STRING", {
            "default": "",
            "multiline": False,
            "placeholder": "Optional: URL to a .wsz skin file",
        })
        base["optional"]["artist_name"] = ("STRING", {
            "default": "Ace-Step AI",
            "multiline": False,
            "placeholder": "Artist name shown in playlist",
        })
        base["optional"]["lyrics_font_size"] = ("FLOAT", {
            "default": 13.0,
            "min": 8.0,
            "max": 32.0,
            "step": 0.5,
            "display": "slider",
        })
        return base

    RETURN_TYPES = ()
    OUTPUT_NODE = True
    FUNCTION = "run"
    CATEGORY = "Scromfy/Ace-Step/Radio"

    def run(self, folder: str, skin_url: str = "", poll_interval_seconds: float = 60.0,
            artist_name: str = "Ace-Step AI", lyrics_font_size: float = 13.0):
        return {}

NODE_CLASS_MAPPINGS = {
    "AceStepWebAmpRadio": AceStepWebAmpRadio,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepWebAmpRadio": "WebAmp Radio 📻",
}
