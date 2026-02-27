"""VAEDecodeAudio node for ACE-Step"""
import torch

class ObsoleteVAEDecodeAudio:
    """Decode latent space to audio waveform"""
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "samples": ("LATENT", ),
                "vae": ("VAE", )
            }
        }
    
    RETURN_TYPES = ("AUDIO",)
    FUNCTION = "decode"
    CATEGORY = "Scromfy/Ace-Step/obsolete"

    def decode(self, vae, samples):
        # vae.decode returns a DecoderOutput object with .sample
        # Oobleck .sample shape is [B, 2, T] (stereo waveform)
        result = vae.decode(samples["samples"])
        if hasattr(result, "sample"):
            audio = result.sample
        else:
            audio = result
            
        # ComfyUI expects [B, C, T] for audio["waveform"]
        # SaveAudio uses audio["waveform"] and iterates over dim 0
        return ({"waveform": audio, "sample_rate": 48000}, )


NODE_CLASS_MAPPINGS = {
    "ObsoleteVAEDecodeAudio": ObsoleteVAEDecodeAudio,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "ObsoleteVAEDecodeAudio": "Obsolete VAE Decode (Audio)",
}
