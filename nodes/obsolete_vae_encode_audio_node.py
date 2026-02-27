"""VAEEncodeAudio node for ACE-Step"""
import torch
import torchaudio

class ObsoleteVAEEncodeAudio:
    """Encode audio waveform to latent space"""
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "audio": ("AUDIO", ),
                "vae": ("VAE", )
            }
        }
    
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "encode"
    CATEGORY = "Scromfy/Ace-Step/obsolete"

    def encode(self, vae, audio):
        sample_rate = audio["sample_rate"]
        # ACE-Step requires 44.1kHz
        if 44100 != sample_rate:
            waveform = torchaudio.functional.resample(audio["waveform"], sample_rate, 44100)
        else:
            waveform = audio["waveform"]

        t = vae.encode(waveform.movedim(1, -1))
        return ({"samples": t}, )


NODE_CLASS_MAPPINGS = {
    "ObsoleteVAEEncodeAudio": ObsoleteVAEEncodeAudio,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "ObsoleteVAEEncodeAudio": "Obsolete VAE Encode (Audio)",
}
