"""AceStepGenericAILyrics node for ACE-Step"""
import json
import urllib.error
import urllib.request
from .includes.lyrics_utils import build_simple_prompt, clean_markdown_formatting, load_api_key

class AceStepGenericAILyrics:
    """Generate lyrics using a generic OpenAI-compatible API (e.g. Ollama, LM Studio)"""
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "api_url": ("STRING", {
                    "default": "http://localhost:11434/v1/chat/completions",
                    "placeholder": "http://localhost:11434/v1/chat/completions"
                }),
                "style": ("STRING", {
                    "default": "",
                    "multiline": True,
                    "placeholder": "Music style (e.g., Synthwave with female vocals)"
                }),
                "theme": ("STRING", {
                    "default": "",
                    "multiline": True,
                    "placeholder": "Music subject/theme (e.g., Love Ballad)"
                }),
                "model": ("STRING", {"default": "llama3"}),
                "max_tokens": ("INT", {"default": 1024, "min": 256, "max": 8192, "step": 128}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            },
            "optional": {
                "api_key": ("STRING", {"default": "no-key-required"}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("lyrics",)
    FUNCTION = "generate"
    CATEGORY = "Scromfy/Ace-Step/lyrics/AI"

    def generate(self, api_url: str, style: str, theme: str, model: str, max_tokens: int, seed: int, api_key: str = "no-key-required"):
        prompt = build_simple_prompt(style, seed, theme)
        
        payload = {
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.9,
            "max_tokens": max_tokens,
            "top_p": 0.95,
            "seed": seed
        }
        
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            api_url,
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}"
            }
        )
        
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                response_body = resp.read()
        except urllib.error.HTTPError as e:
            error_detail = e.read().decode("utf-8", errors="ignore") if hasattr(e, "read") else str(e)
            return (f"[Generic AI] HTTPError: {e.code} {error_detail}",)
        except Exception as e:
            return (f"[Generic AI] Error: {e}",)

        try:
            parsed = json.loads(response_body)
            choices = parsed.get("choices", [])
            if choices:
                message = choices[0].get("message", {})
                text = message.get("content", "").strip()
                text = clean_markdown_formatting(text)
                if text:
                    return (text,)
        except:
            pass
        
        return ("[Generic AI] Empty or invalid response.",)


NODE_CLASS_MAPPINGS = {
    "AceStepGenericAILyrics": AceStepGenericAILyrics,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepGenericAILyrics": "GenericAI Lyrics",
}
