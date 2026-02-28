"""Lyrics generation utilities for ACE-Step"""
import os
import sys

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

ALLOWED_TAGS_INFO = (
    "Use ONLY these section tags in square brackets (no numbers): [Intro], [Verse], [Pre-Chorus], [Chorus], "
    "[Post-Chorus], [Bridge], [Breakdown], [Drop], [Hook], [Refrain], [Instrumental], [Solo], [Rap], [Outro]. "
    "Do NOT add numbers to tags (e.g., use [Verse], not [Verse 1])."
)

BASE_INSTRUCTIONS = (
    "You are a music lyricist. Generate song lyrics in the requested style and theme. "
    "Return ONLY the lyrics as plain text. Do not add titles, prefaces, markdown, code fences, or quotes. "
    f"{ALLOWED_TAGS_INFO} Never use parentheses for section labels. "
    "Keep it concise and coherent."
)


def build_simple_prompt(style: str, seed: int, theme: str = "Love Song") -> str:
    """Simple prompt for basic lyrics generation"""
    base_style = style.strip() or "Generic song"
    return f"Style: {base_style}. Song Theme: {theme} {BASE_INSTRUCTIONS}"


def clean_markdown_formatting(text: str) -> str:
    """Remove markdown formatting and normalize section tags"""
    cleaned = text.strip()
    
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
