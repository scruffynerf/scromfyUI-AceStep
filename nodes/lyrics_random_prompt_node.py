"""AceStepRandomLyricPrompt node – generate random lyric direction prompts for LLM lyrics nodes"""
import random
from .includes.prompt_utils import get_component, expand_wildcards, SONG_PROMPT_TEMPLATES_LIST, build_song_prompt


class AceStepRandomLyricPrompt:
    """
    Generate a random lyric-direction prompt (what to write about) and a matching song prompt
    (genre/style/singer context) by mixing modular components from prompt_components/lyrics/.

    Outputs:
      - lyric_prompt  : Instruction for the LLM lyrics node (what/how to write)
      - song_prompt   : Matching music description (genre, mood, vocals, culture, etc.)
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
                "lyric_template": ([
                    "random",
                    "verb + theme",
                    "verb + situation",
                    "verb + emotional + theme",
                    "verb + emotional + situation",
                    "verb + theme + setting",
                    "verb + situation + setting",
                    "verb + theme + perspective",
                    "verb + situation + perspective",
                    "verb + theme + constraint",
                    "verb + situation + constraint",
                    "verb + theme + singer",
                    "verb + situation + singer",
                    "full: theme + setting + perspective + constraint",
                    "full: situation + setting + perspective + constraint",
                    "full: emotional + situation + singer + setting + constraint",
                ], {"default": "random"}),
                "song_template": (SONG_PROMPT_TEMPLATES_LIST, {"default": "random"}),
            }
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING",)
    RETURN_NAMES = ("lyric_prompt", "song_prompt", "combined_prompt",)
    FUNCTION = "generate"
    CATEGORY = "Scromfy/Ace-Step/Lyrics"

    @classmethod
    def IS_CHANGED(cls, seed, lyric_template, song_template):
        return seed

    def generate(self, seed, lyric_template="random", song_template="random"):
        rng = random.Random(seed)

        # ── Load lyric-specific components ─────────────────────────────────────
        lyric_verbs        = get_component("LYRIC_VERBS")        or ["Write a song about"]
        lyric_themes       = get_component("LYRIC_THEMES")       or ["love and loss"]
        lyric_situations   = get_component("LYRIC_SITUATIONS")   or ["a road trip that changed your life"]
        lyric_emotions     = get_component("LYRIC_EMOTIONS")      or ["bittersweet"]
        lyric_settings     = get_component("LYRIC_SETTINGS")      or ["under city lights at 3am"]
        lyric_perspectives = get_component("LYRIC_PERSPECTIVES")  or ["from the perspective of the one left behind"]
        lyric_constraints  = get_component("LYRIC_CONSTRAINTS")   or ["without using the word 'love'"]
        lyric_singers      = get_component("LYRIC_SINGER")        or ["a woman"]
        lyric_templates    = get_component("LYRIC_TEMPLATES")     or ["__LYRIC_VERBS__ __LYRIC_THEMES__"]

        # ── Helper: pick + expand wildcards ────────────────────────────────────
        def pick(lst, fallback=""):
            val = rng.choice(lst) if lst else fallback
            return expand_wildcards(val, rng)

        # ── Build lyric prompt ─────────────────────────────────────────────────
        verb        = pick(lyric_verbs)
        theme       = pick(lyric_themes)
        situation   = pick(lyric_situations)
        emotion     = pick(lyric_emotions)
        setting     = pick(lyric_settings)
        perspective = pick(lyric_perspectives)
        constraint  = pick(lyric_constraints)
        singer      = pick(lyric_singers)

        t = lyric_template
        if t == "random":
            lyric_prompt = expand_wildcards(pick(lyric_templates), rng)
        elif t == "verb + theme":
            lyric_prompt = f"{verb} {theme}"
        elif t == "verb + situation":
            lyric_prompt = f"{verb} {situation}"
        elif t == "verb + emotional + theme":
            lyric_prompt = f"{verb} {theme} — feel: {emotion}"
        elif t == "verb + emotional + situation":
            lyric_prompt = f"{verb} {situation} — feel: {emotion}"
        elif t == "verb + theme + setting":
            lyric_prompt = f"{verb} {theme}, set {setting}"
        elif t == "verb + situation + setting":
            lyric_prompt = f"{verb} {situation}, set {setting}"
        elif t == "verb + theme + perspective":
            lyric_prompt = f"{verb} {theme}, {perspective}"
        elif t == "verb + situation + perspective":
            lyric_prompt = f"{verb} {situation}, {perspective}"
        elif t == "verb + theme + constraint":
            lyric_prompt = f"{verb} {theme}, written {constraint}"
        elif t == "verb + situation + constraint":
            lyric_prompt = f"{verb} {situation}, written {constraint}"
        elif t == "verb + theme + singer":
            lyric_prompt = f"{verb} {theme}, sung by {singer}"
        elif t == "verb + situation + singer":
            lyric_prompt = f"{verb} {situation}, as told by {singer}"
        elif t == "full: theme + setting + perspective + constraint":
            lyric_prompt = f"{verb} {theme}, set {setting}, {perspective}, written {constraint}"
        elif t == "full: situation + setting + perspective + constraint":
            lyric_prompt = f"{verb} {situation}, set {setting}, {perspective}, written {constraint}"
        else:  # full: emotional + situation + singer + setting + constraint
            lyric_prompt = f"{verb} {situation}, as told by {singer}, set {setting}, written {constraint} — feel: {emotion}"

        # ── Build song prompt ──────────────────────────────────────────────────
        song_prompt = build_song_prompt(rng, song_template)

        if song_prompt:
            combined_prompt = f"{lyric_prompt}\n\nPlease ensure the lyrics match the style and vibe of this musical description:\n{song_prompt}"
        else:
            combined_prompt = lyric_prompt

        return (lyric_prompt, song_prompt, combined_prompt)


NODE_CLASS_MAPPINGS = {
    "AceStepRandomLyricPrompt": AceStepRandomLyricPrompt,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepRandomLyricPrompt": "Random Lyric Prompt (Scromfy)",
}
