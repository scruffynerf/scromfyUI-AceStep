import os
import logging
from .includes.whisper_utils import AVAILABLE_SUBTITLE_FORMATS

logger = logging.getLogger(__name__)

class AceStepSaveSubtitleLyrics:
    """Utility to save generated subtitle/lyrics strings to disk.
    
    Inputs:
        text (STRING): The subtitle text content.
        filepath_base (STRING): Absolute path without extension.
        extension (STRING): Target format (.srt, .vtt, .lrc).
        
    Outputs:
        filepath (STRING): Absolute path to the saved file.
    """
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", {"forceInput": True}),
                "filepath_base": ("STRING", {"forceInput": True}),
                "extension": (AVAILABLE_SUBTITLE_FORMATS, {"default": ".lrc"}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("filepath",)
    FUNCTION = "save"
    CATEGORY = "Scromfy/Ace-Step/Lyrics"
    OUTPUT_NODE = True

    def save(self, text: str, filepath_base: str, extension: str):
        # Combine base path with chosen extension
        full_path = filepath_base + extension
        
        # Ensure parent directory exists
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(text)
            
        return (full_path,)

NODE_CLASS_MAPPINGS = {
    "AceStepSaveSubtitleLyrics": AceStepSaveSubtitleLyrics,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepSaveSubtitleLyrics": "Save Subtitle/Lyrics (Matched)",
}
