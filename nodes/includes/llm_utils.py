import torch
import logging
import re
import json
import comfy.model_management

logger = logging.getLogger(__name__)

# --- LLM Instructions (Ported from acestep.constants) ---
DEFAULT_LM_INSPIRED_INSTRUCTION = "Expand the user's input into a more detailed and specific musical description:"
DEFAULT_LM_REWRITE_INSTRUCTION = "Format the user's input into a more detailed and specific musical description:"
DEFAULT_LM_UNDERSTAND_INSTRUCTION = "Understand the given musical conditions and describe the audio semantics accordingly:"

# --- LLM Parsing Regex ---
METADATA_PATTERN = re.compile(r'\[METADATA\]\s*(\{.*?\})', re.DOTALL)
NON_JSON_METADATA_PATTERNS = {
    'caption': re.compile(r'Caption:\s*(.*)', re.IGNORECASE),
    'bpm': re.compile(r'BPM:\s*(\d+)', re.IGNORECASE),
    'duration': re.compile(r'Duration:\s*([\d\.]+)', re.IGNORECASE),
    'keyscale': re.compile(r'Key:\s*(.*)', re.IGNORECASE),
    'language': re.compile(r'Language:\s*(.*)', re.IGNORECASE),
}


def expand_prompt_native(model, tokenizer, query, temperature=0.7, top_k=50, top_p=0.9):
    """Natively expand a prompt query using the loaded LLM."""
    device = comfy.model_management.get_torch_device()
    
    messages = [
        {"role": "system", "content": f"# Instruction\n{DEFAULT_LM_INSPIRED_INSTRUCTION}\n\n"},
        {"role": "user", "content": query}
    ]
    
    prompt = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    inputs = tokenizer(prompt, return_tensors="pt").to(device)
    
    # Generate until </think> or max 512 tokens
    with torch.no_grad():
        output_ids = model.generate(
            **inputs,
            max_new_tokens=512,
            temperature=temperature,
            top_k=top_k,
            top_p=top_p,
            do_sample=temperature > 0,
            pad_token_id=tokenizer.pad_token_id or tokenizer.eos_token_id,
        )
    
    output_text = tokenizer.decode(output_ids[0][inputs.input_ids.shape[1]:], skip_special_tokens=True)
    return output_text

def parse_llm_output(output_text):
    """Parse the LLM output text for caption, lyrics, and metadata."""
    metadata = {
        "caption": "",
        "lyrics": "",
        "bpm": 120,
        "duration": 30.0,
        "keyscale": "",
        "language": "en"
    }
    
    # Try JSON block first (if model produces it)
    json_match = METADATA_PATTERN.search(output_text)
    if json_match:
        try:
            data = json.loads(json_match.group(1))
            metadata.update(data)
        except:
            pass
            
    # Fallback to line-by-line parsing
    for key, pattern in NON_JSON_METADATA_PATTERNS.items():
        if not metadata.get(key) or metadata[key] == "" or metadata[key] == 0:
            match = pattern.search(output_text)
            if match:
                val = match.group(1).strip()
                if key == 'bpm':
                    try: metadata[key] = int(val)
                    except: pass
                elif key == 'duration':
                    try: metadata[key] = float(val)
                    except: pass
                else:
                    metadata[key] = val
                    
    # Extract lyrics (usually after metadata or some tag)
    if "Lyrics:" in output_text:
        metadata["lyrics"] = output_text.split("Lyrics:")[-1].strip()
    elif "</think>" in output_text:
        metadata["lyrics"] = output_text.split("</think>")[-1].strip()
        
    return metadata
