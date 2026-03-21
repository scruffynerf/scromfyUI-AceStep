"""AceStepPromptGen node for ACE-Step – dynamically uses all components from prompt_utils"""
import random
import re
from .includes.prompt_utils import get_available_components, get_visible_components, get_component, expand_wildcards
from .includes.mapping_utils import get_choices_for

class ScromfyAceStepPromptGen:
    """Dynamic multi-category prompt generator using weighted tags.
    
    Scans the prompt_components/ directory to expose dropdowns of musical features 
    (genres, moods, instruments, setups) and allows for specific string selection or randomization.
    
    Inputs:
        [Dynamic Categories]: Dropdowns for each visible component in prompt_utils.
        
    Optional Inputs:
        seed (INT): Deterministic RNG seed for the randomization selections.
        
    Outputs:
        combined_prompt (STRING): The full concatenated master string.
        [category]_text (STRING): Individual outputs for each evaluated component.
    """

    @classmethod
    def INPUT_TYPES(cls):
        inputs = {}
        # Only show visible components in the UI
        for name in get_visible_components():
            items = get_component(name)
            inputs[name] = (get_choices_for(items), {"default": "none"})
        inputs["seed"] = ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF})
        return {"required": inputs}

    # ComfyUI usually expects these as static tuples on the class
    # We use visible components here
    _comps = get_visible_components()
    RETURN_TYPES = tuple(["STRING"] * (1 + len(_comps)))
    RETURN_NAMES = tuple(["combined_prompt"] + [f"{name.lower()}_text" for name in _comps])
    
    FUNCTION = "generate"
    CATEGORY = "Scromfy/Ace-Step/Prompt"

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        # Force re-execution when any random choice is involved
        return any(str(v).startswith("random") for v in kwargs.values())

    def generate(self, seed: int, **kwargs):
        rng = random.Random(seed)
        results = {}
        # Filter logic: generate results for all visible components
        visible_comps = get_visible_components()

        for name in visible_comps:
            choice = kwargs.get(name, "none")
            items = get_component(name)
            out_name = f"{name.lower()}_text"

            def resolve_item(c):
                # If it's a dict like STYLE_PRESETS, resolve key -> value
                if isinstance(items, dict):
                    return str(items.get(c, c))
                return str(c)

            if choice == "none":
                results[out_name] = ""
            elif choice == "random":
                keys = list(items.keys()) if isinstance(items, dict) else list(items)
                if keys:
                    picked = rng.choice(keys)
                    resolved = resolve_item(picked)
                    results[out_name] = expand_wildcards(resolved, rng)
                else:
                    results[out_name] = ""
            elif choice == "random2":
                keys = list(items.keys()) if isinstance(items, dict) else list(items)
                if len(keys) >= 2:
                    picks = rng.sample(keys, 2)
                elif keys:
                    picks = [rng.choice(keys)]
                else:
                    picks = []
                    
                resolved_picks = [expand_wildcards(resolve_item(p), rng) for p in picks]
                results[out_name] = ", ".join(resolved_picks)
            else:
                # Explicit selection - map friendly (WILDCARD) back to __WILDCARD__
                if choice.startswith("(") and choice.endswith(")") and len(choice) > 2:
                    resolved = f"__{choice[1:-1].upper()}__"
                else:
                    resolved = resolve_item(choice)
                results[out_name] = expand_wildcards(resolved, rng)

        # Build combined prompt from non-empty parts in the same sorted order
        parts = []
        for name in visible_comps:
            val = results[f"{name.lower()}_text"]
            if val:
                parts.append(val)
        combined = " ".join(parts)

        # Return order: prompt first, then each visible category
        out_list = [combined]
        for name in visible_comps:
            out_list.append(results[f"{name.lower()}_text"])
            
        return tuple(out_list)


NODE_CLASS_MAPPINGS = {
    "ScromfyAceStepPromptGen": ScromfyAceStepPromptGen,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "ScromfyAceStepPromptGen": "Scromfy Prompt Generator",
}
