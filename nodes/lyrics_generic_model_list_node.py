import json
import urllib.error
import urllib.request
from .includes.lyrics_utils import clean_markdown_formatting

class AceStepGenericModelList:
    """Fetch available models from an OpenAI-compatible /v1/models endpoint"""
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "api_url": ("STRING", {
                    "default": "http://localhost:11434",
                    "placeholder": "http://localhost:11434"
                }),
            },
            "optional": {
                "api_key": ("STRING", {"default": "no-key-required"}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("model_list",)
    FUNCTION = "fetch"
    CATEGORY = "Scromfy/Ace-Step/Lyrics/AI"

    def fetch(self, api_url: str, api_key: str = "no-key-required"):
        # Handle base URL
        base_url = api_url.strip().rstrip("/")
        if not base_url.endswith("/v1"):
            models_url = base_url + "/v1/models"
        else:
            models_url = base_url + "/models"

        req = urllib.request.Request(
            models_url,
            headers={"Authorization": f"Bearer {api_key}"}
        )
        
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                
                # OpenAI /v1/models returns a list of objects with an "id" field
                # Some local servers return them differently, but usually data["data"] is the list
                model_data = data.get("data", [])
                if not model_data and isinstance(data, list):
                    model_data = data # some implementations return a bare list
                
                model_ids = []
                if isinstance(model_data, list):
                    for m in model_data:
                        if isinstance(m, dict) and "id" in m:
                            model_ids.append(m["id"])
                        elif isinstance(m, str):
                            model_ids.append(m)
                
                if model_ids:
                    return ("\n".join(sorted(model_ids)),)
                    
                return (f"[Generic AI] No models found in response: {data}",)
                
        except Exception as e:
            return (f"[Generic AI] Error fetching models: {e}",)

NODE_CLASS_MAPPINGS = {
    "AceStepGenericModelList": AceStepGenericModelList,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepGenericModelList": "GenericAI Model List",
}
