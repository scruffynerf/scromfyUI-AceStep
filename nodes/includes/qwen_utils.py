"""Shared utilities for Qwen2.5-Omni-based audio nodes (Captioner, Transcriber)."""

import torch
import comfy.model_management
import comfy.utils
from transformers.generation.streamers import BaseStreamer


class ComfyStreamer(BaseStreamer):
    """Bridges HuggingFace token streaming to ComfyUI's progress bar and interrupt checks."""

    def __init__(self, pbar: comfy.utils.ProgressBar):
        self.pbar = pbar

    def put(self, value):
        self.pbar.update(1)
        comfy.model_management.throw_exception_if_processing_interrupted()

    def end(self):
        pass


class DummyModule(torch.nn.Module):
    """Silences Qwen2.5-Omni audio-generation head to prevent OOM during text-only inference."""

    def __init__(self, dtype, device):
        super().__init__()
        self._dtype = dtype
        self._device = device

    def forward(self, *args, **kwargs):
        return torch.tensor([], device=self._device, dtype=self._dtype)

    @property
    def dtype(self):
        return self._dtype

    @property
    def device(self):
        return self._device


def suppress_qwen_audio_output(model, device):
    """Disable audio generation on a Qwen2.5-Omni model instance to save memory."""
    if hasattr(model.config, "disable_audio_generation"):
        model.config.disable_audio_generation = True
    if hasattr(model, "generation_config") and hasattr(model.generation_config, "disable_audio_generation"):
        model.generation_config.disable_audio_generation = True
    if hasattr(model, "token2wav") and not isinstance(model.token2wav, DummyModule):
        model.token2wav = DummyModule(model.dtype, device)
