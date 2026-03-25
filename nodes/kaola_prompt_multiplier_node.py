import logging
from .includes.llm_utils import expand_prompt_native, parse_llm_output
from .includes.mapping_utils import VALID_LANGUAGES

logger = logging.getLogger(__name__)

class KaolaAceStepPromptMultiplier:
    """Intelligent Prompt Multiplier for ACE-Step.
    Uses a 1.7B/0.6B LLM to expand a simple natural language query into a full 
    conditioning set (Caption, Lyrics, BPM, Key, etc.) natively without external dependencies.
    """
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm": ("ACE_LLM",),
                "query": ("STRING", {
                    "multiline": True, 
                    "default": "A melodic electronic track with soft synths",
                    "placeholder": "Describe the music you want to generate...",
                }),
                "instrumental": ("BOOLEAN", {
                    "default": False,
                    "tooltip": "Generate instrumental music only (no vocals).",
                }),
                "vocal_language": (["auto"] + VALID_LANGUAGES, {
                    "default": "auto",
                    "tooltip": "Vocal language (e.g., en, zh, ja). 'auto' lets the model decide.",
                }),
            },
            "optional": {
                "temperature": ("FLOAT", {"default": 0.7, "min": 0.0, "max": 2.0, "step": 0.1, "tooltip": "LLM creativity. 0.7 is a good balance."}),
                "top_k": ("INT", {"default": 50, "min": 0, "max": 100}),
                "top_p": ("FLOAT", {"default": 0.9, "min": 0.0, "max": 1.0, "step": 0.05}),
            }
        }

    RETURN_TYPES = ("STRING", "STRING", "FLOAT", "INT", "STRING", "STRING")
    RETURN_NAMES = ("caption", "lyrics", "duration", "bpm", "keyscale", "vocal_language")
    FUNCTION = "generate"
    CATEGORY = "Scromfy/Ace-Step/Kaola"

    def generate(self, llm, query, instrumental, vocal_language, temperature=0.7, top_k=50, top_p=0.9):
        # 1. Extract model components from input dict
        model = llm.get("model")
        tokenizer = llm.get("tokenizer")
        
        if model is None or tokenizer is None:
            raise ValueError("Invalid LLM input. Must be from AceStepLLMLoader.")

        # 2. Add language constraint to query if specified
        final_query = query
        if vocal_language != "auto" and not instrumental:
            final_query += f" (Vocal language: {vocal_language})"
        if instrumental:
            final_query += " (Instrumental, no vocals)"

        # 3. Native Expansion
        logger.info(f"Generating native prompt expansion for query: {query}")
        raw_output = expand_prompt_native(
            model=model,
            tokenizer=tokenizer,
            query=final_query,
            temperature=temperature,
            top_k=top_k,
            top_p=top_p
        )

        # 4. Parse output
        res = parse_llm_output(raw_output)
        
        # Override with UI settings if needed
        if instrumental:
            res["lyrics"] = "[Instrumental]"
        if vocal_language != "auto":
            res["language"] = vocal_language

        # 5. Return results
        return (
            res.get("caption", ""),
            res.get("lyrics", "[Instrumental]"),
            float(res.get("duration", 30.0)),
            int(res.get("bpm", 120)),
            res.get("keyscale", "C major"),
            res.get("language", "en"),
        )

NODE_CLASS_MAPPINGS = {
    "KaolaAceStepPromptMultiplier": KaolaAceStepPromptMultiplier
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "KaolaAceStepPromptMultiplier": "Prompt Multiplier (Kaola)"
}
