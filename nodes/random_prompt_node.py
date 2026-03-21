"""AceStepRandomPrompt node for ACE-Step"""
import random
from .includes.prompt_utils import get_component, expand_wildcards, SONG_PROMPT_TEMPLATES_LIST, build_song_prompt

class AceStepRandomPrompt:
    """Generate random music prompts from predefined templates"""
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
                "template": (SONG_PROMPT_TEMPLATES_LIST, {"default": "random"}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "generate"
    CATEGORY = "Scromfy/Ace-Step/Prompt"

    def generate(self, seed, template):
        """Generate random music prompt"""
        rng = random.Random(seed)
        prompt = build_song_prompt(rng, template)
        return (prompt,)


NODE_CLASS_MAPPINGS = {
    "AceStepRandomPrompt": AceStepRandomPrompt,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepRandomPrompt": "Random Prompt (Scromfy)",
}
