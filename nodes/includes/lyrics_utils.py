import os
import sys
import re

def load_api_key(service_name: str) -> str:
    """Load API key from the keys directory for a specific service"""
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    key_file = f"{service_name.lower()}_api_key.txt"
    key_path = os.path.join(base_dir, "keys", key_file)
    
    if not os.path.exists(key_path):
        print(f"Error: API key for {service_name} not found at {key_path}", file=sys.stderr)
        return ""
        
    try:
        with open(key_path, "r") as f:
            return f.read().strip()
    except Exception as e:
        print(f"Error reading API key for {service_name}: {e}", file=sys.stderr)
        return ""

_SYSTEM_PROMPT_CACHE = None

def load_system_prompt() -> str:
    """Load the system prompt from AIinstructions/systemprompt.txt (user) or systemprompt.default.txt (fallback)"""
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    ai_instr_dir = os.path.join(base_dir, "AIinstructions")
    
    user_prompt_path = os.path.join(ai_instr_dir, "systemprompt.txt")
    default_prompt_path = os.path.join(ai_instr_dir, "systemprompt.default.txt")
    
    # Prioritize user prompt, then default prompt
    if os.path.exists(user_prompt_path):
        target_path = user_prompt_path
    elif os.path.exists(default_prompt_path):
        target_path = default_prompt_path
    else:
        # Fallback to a very minimal version if both files are missing
        return "You are a music lyricist. Generate lyrics in the requested style and theme."
        
    try:
        with open(target_path, "r", encoding="utf-8") as f:
            return f.read().strip()
    except Exception as e:
        print(f"Error reading system prompt from {target_path}: {e}", file=sys.stderr)
        return "You are a music lyricist. Generate lyrics in the requested style and theme."


def build_simple_prompt(style: str, seed: int, theme: str = "Love Song") -> str:
    """Simple prompt for basic lyrics generation"""
    base_style = style.strip() or "Generic song"
    system_instructions = load_system_prompt()
    return f"Style: {base_style}. Song Theme: {theme}. {system_instructions}"


def clean_markdown_formatting(text: str) -> str:
    """Remove markdown formatting, <think> blocks, and normalize section tags"""
    cleaned = text.strip()
    
    # Remove <think>...</think> blocks (often leaked by R1/DeepSeek)
    cleaned = re.sub(r'<think>.*?</think>', '', cleaned, flags=re.DOTALL | re.IGNORECASE).strip()

    # Remove code fences
    if cleaned.startswith("```") and cleaned.endswith("```"):
        cleaned = cleaned.strip("`").strip()
    
    # Normalize section labels
    normalized_lines = []
    for line in cleaned.splitlines():
        stripped = line.strip()
        
        ## Convert (Verse 1) style to [Verse]
        #if stripped.startswith("(") and stripped.endswith(")") and len(stripped) <= 48:
        #    inner = stripped[1:-1].strip()
        #    if inner:
        #        parts = inner.split()
        #        if len(parts) >= 2 and parts[-1].isdigit():
        #            inner = " ".join(parts[:-1])
        #        line = f"[{inner}]"
        
        # Clean [Verse 1] style to [Verse]
        if stripped.startswith("[") and stripped.endswith("]") and len(stripped) <= 64:
            inner = stripped[1:-1].strip()
            if inner:
                parts = inner.split()
                if len(parts) >= 2 and parts[-1].isdigit():
                    inner = " ".join(parts[:-1])
                line = f"[{inner}]"
        
        normalized_lines.append(line)
    
    return "\n".join(normalized_lines).strip()
