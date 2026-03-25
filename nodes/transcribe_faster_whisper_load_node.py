import faster_whisper
import logging
from .includes.whisper_utils import (
    collect_model_paths, 
    faster_whisper_model_dir
)

logger = logging.getLogger(__name__)

class AceStepLoadFasterWhisperModel:
    """Loads a Faster-Whisper model for local audio transcription.
    
    Inputs:
        model (STRING): Selected model size/name.
        device (STRING): CPU/CUDA target.
        compute_type (STRING): Quantization/precision.
        
    Outputs:
        model (FASTER_WHISPER_MODEL): Loaded transcription model.
    """
    @classmethod
    def INPUT_TYPES(s):
        models = list(collect_model_paths().keys())
        return {
            "required": {
                "model": (models,),
                "device": (['cuda', 'cpu', 'auto'],),
                "compute_type": (['float16', 'float32', 'int8_float16', 'int8'], {"default": "float16"}),
            },
        }

    RETURN_TYPES = ("FASTER_WHISPER_MODEL",)
    RETURN_NAMES = ("model",)
    FUNCTION = "load_model"
    CATEGORY = "Scromfy/Ace-Step/Audio"

    def load_model(self, model: str, device: str, compute_type: str):
        model_name_or_path = collect_model_paths()[model]
        
        # Load model
        whisper_model = faster_whisper.WhisperModel(
            model_size_or_path=model_name_or_path,
            device=device,
            compute_type=compute_type,
            download_root=faster_whisper_model_dir,
            local_files_only=False
        )
        return (whisper_model,)

NODE_CLASS_MAPPINGS = {
    "AceStepLoadFasterWhisperModel": AceStepLoadFasterWhisperModel,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepLoadFasterWhisperModel": "Faster Whisper Loader",
}
