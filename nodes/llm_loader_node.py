"""AceStepLLMLoader node for ACE-Step"""
import os
import torch
import logging
from transformers import AutoModelForCausalLM, AutoTokenizer

try:
    import folder_paths
except ImportError:
    folder_paths = None

logger = logging.getLogger(__name__)

class AceStepLLMLoader:
    """Load an ACE-Step 5Hz LM (Qwen) for standalone text generation"""
    
    @classmethod
    def INPUT_TYPES(s):
        checkpoints = []
        if folder_paths:
            checkpoints = folder_paths.get_filename_list("checkpoints")
        
        return {
            "required": {
                "model_name": (checkpoints,),
                "device": (["auto", "cuda", "cpu"], {"default": "auto"}),
                "precision": (["fp16", "bf16", "fp32"], {"default": "bf16" if torch.cuda.is_available() and torch.cuda.is_bf16_supported() else "fp32"}),
            }
        }
    
    RETURN_TYPES = ("ACE_LLM",)
    RETURN_NAMES = ("llm",)
    FUNCTION = "load"
    CATEGORY = "Scromfy/Ace-Step/loaders"

    def load(self, model_name, device, precision):
        if not folder_paths:
            raise ImportError("ComfyUI folder_paths not found.")
            
        model_path = folder_paths.get_full_path("checkpoints", model_name)
        if not model_path:
            raise FileNotFoundError(f"Model path for {model_name} not found.")

        # Resolve device
        if device == "auto":
            device = "cuda" if torch.cuda.is_available() else "cpu"

        # Resolve dtype
        dtype = torch.float32
        if precision == "fp16":
            dtype = torch.float16
        elif precision == "bf16":
            dtype = torch.bfloat16
            
        logger.info(f"Loading ACE-Step LLM from {model_path} on {device} (precision: {precision})")
        
        # Note: If the checkpoint is a single .safetensors file, AutoModel might need help 
        # but usually LLMs in ComfyUI checkpoints are folders (diffusers/transformers style)
        # or we might need a custom loader if they are standard single-file .safetensors.
        # Assuming they are standard HF folders for now as ACE-Step uses them.
        
        try:
            tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
            model = AutoModelForCausalLM.from_pretrained(
                model_path, 
                torch_dtype=dtype, 
                trust_remote_code=True
            ).to(device)
            
            return ({"model": model, "tokenizer": tokenizer, "device": device},)
        except Exception as e:
            logger.error(f"Failed to load LLM: {e}")
            raise e

NODE_CLASS_MAPPINGS = {
    "AceStepLLMLoader": AceStepLLMLoader,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepLLMLoader": "LLM Loader (ACE-Step)",
}
