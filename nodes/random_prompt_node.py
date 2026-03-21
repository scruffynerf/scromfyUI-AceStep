"""AceStepRandomPrompt node for ACE-Step"""
import random
from .includes.prompt_utils import get_component, expand_wildcards

class AceStepRandomPrompt:
    """Generate random music prompts from predefined templates"""
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
                "template": ([
                    "genre + mood",
                    "adjective + genre",
                    "genre + instrument",
                    "mood + genre + instrument",
                    "adjective + mood + genre",
                    "cultural + genre + instrument",
                    "genre + vocal quality",
                    "genre + performer type",
                    "genre + mood + vocal quality",
                    "genre + mood + instrument + performer",
                    "cultural + adjective + genre + mood",
                    "genre + place/scene",
                    "adjective + genre + place/scene",
                    "full description",
                    "full description + culture",
                ], {"default": "mood + genre + instrument"}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "generate"
    CATEGORY = "Scromfy/Ace-Step/Prompt"

    def generate(self, seed, template):
        """Generate random music prompt"""
        rng = random.Random(seed)

        genres          = get_component("GENRES")         or get_component("GENRE")         or ["music"]
        moods           = get_component("MOODS")          or get_component("MOOD")           or ["ambient"]
        instruments     = get_component("INSTRUMENTS")    or get_component("INSTRUMENT")     or ["piano"]
        adjectives      = get_component("ADJECTIVES")     or get_component("ADJECTIVE")      or ["melodic"]
        cultures        = get_component("CULTURES")       or get_component("CULTURE")        or ["american"]
        vocal_qualities = get_component("VOCAL_QUALITIES") or get_component("VOCAL_QUALITY") or ["soulful"]
        performers      = get_component("PERFORMERS")     or get_component("PERFORMER")      or ["band"]
        places          = get_component("PLACES")         or []

        def pick(lst, fallback):
            """Pick a random item and expand any wildcards in it."""
            val = rng.choice(lst) if lst else fallback
            return expand_wildcards(val, rng)

        genre      = pick(genres, "music")
        mood       = pick(moods, "ambient")
        instrument = pick(instruments, "piano")
        adjective  = pick(adjectives, "melodic")
        culture    = pick(cultures, "american")
        vocal      = pick(vocal_qualities, "soulful")
        performer  = pick(performers, "band")
        place      = pick(places, "somewhere magical") if places else "somewhere magical"

        if template == "genre + mood":
            prompt = f"{mood} {genre}"
        elif template == "adjective + genre":
            prompt = f"{adjective} {genre}"
        elif template == "genre + instrument":
            prompt = f"{genre} featuring {instrument}"
        elif template == "mood + genre + instrument":
            prompt = f"{mood} {genre} featuring {instrument}"
        elif template == "adjective + mood + genre":
            prompt = f"{adjective}, {mood} {genre}"
        elif template == "cultural + genre + instrument":
            prompt = f"{culture} {genre} with {instrument}"
        elif template == "genre + vocal quality":
            prompt = f"{genre} with {vocal} vocals"
        elif template == "genre + performer type":
            prompt = f"{genre} performed by a {performer}"
        elif template == "genre + mood + vocal quality":
            prompt = f"{mood} {genre} with {vocal} vocals"
        elif template == "genre + mood + instrument + performer":
            prompt = f"{mood} {genre} featuring {instrument}, performed by a {performer}"
        elif template == "cultural + adjective + genre + mood":
            prompt = f"{adjective} {culture} {genre} with a {mood} feel"
        elif template == "genre + place/scene":
            prompt = f"{genre} from {place}" if place else f"{mood} {genre}"
        elif template == "adjective + genre + place/scene":
            prompt = f"{adjective} {genre} from {place}" if place else f"{adjective} {genre}"
        elif template == "full description":
            prompt = f"{adjective} {mood} {genre} featuring {instrument} with {vocal} vocals, performed by a {performer}"
        else:  # full description + culture
            prompt = f"{adjective} {culture} {genre} with a {mood} feel, featuring {instrument} and {vocal} vocals"

        return (prompt,)


NODE_CLASS_MAPPINGS = {
    "AceStepRandomPrompt": AceStepRandomPrompt,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepRandomPrompt": "Random Prompt (Scromfy)",
}
