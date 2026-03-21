"""AceStepMetadataBuilder node for ACE-Step"""

class AceStepMetadataBuilder:
    """Format music metadata for ACE-Step conditioning.
    
    Inputs:
        bpm (INT): 0-300.
        duration (FLOAT): Length in seconds.
        keyscale (STRING): E.g. "C major".
        timesignature (INT): E.g. 4.
        language (STRING): Target language format.
        instrumental (BOOLEAN): Toggle instrumental mode.
        
    Outputs:
        metadata (DICT): A dictionary mapping these properties, omitting any unused/empty defaults, 
        suitable for downstream conditioning manipulation.
    """
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "bpm": ("INT", {"default": 0, "min": 0, "max": 300, "step": 1}),
                "duration": ("FLOAT", {"default": -1.0, "min": -1.0, "max": 1000.0, "step": 0.1}),
                "keyscale": ("STRING", {"default": ""}),
                "timesignature": ("INT", {"default": 4, "min": 0, "max": 6}),
                "language": (["en", "zh", "ja", "ko", "auto"], {"default": "en"}),
                "instrumental": ("BOOLEAN", {"default": False}),
            }
        }
    
    RETURN_TYPES = ("DICT",)
    RETURN_NAMES = ("metadata",)
    FUNCTION = "build"
    CATEGORY = "Scromfy/Ace-Step/Prompt"

    def build(self, bpm, duration, keyscale, timesignature, language, instrumental):
        metadata = {
            "bpm": bpm if bpm > 0 else None,
            "duration": duration if duration > 0 else None,
            "keyscale": keyscale if keyscale.strip() else None,
            "timesignature": timesignature,
            "language": language,
            "instrumental": instrumental,
        }
        # Filter out None values
        metadata = {k: v for k, v in metadata.items() if v is not None}
        return (metadata,)


NODE_CLASS_MAPPINGS = {
    "AceStepMetadataBuilder": AceStepMetadataBuilder,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepMetadataBuilder": "Metadata Builder",
}
