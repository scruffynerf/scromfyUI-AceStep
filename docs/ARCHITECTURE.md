# Technical Architecture

## How ACE-Step Integrates with ScromfyUI Nodes

### Text Context & Conditioning Flow

Instead of relying purely on ComfyUI's basic `ace15` implementation, our custom nodes provide a much richer, granular approach to text encoding and audio code generation.

```text
1. Prompt & Metadata Structure
    ├─ AceStepPromptGen / AceStepRandomPrompt -> Generates styled textual tags
    ├─ AceStepMetadataBuilder -> Formats BPM, duration, keyscale, time signature
    └─ AceStepLyricsFormatter / AI Lyrics nodes -> Prepares the vocal guidance
    ↓
2. ScromfyAceStepTextEncoderPlusPlus
    ├─ Merges inputs into an "Enriched CoT" (Chain-of-Thought) prompt.
    ├─ Encodes genre/style tags with Qwen3-0.6B.
    ├─ Encodes lyrics with Qwen3-0.6B layer 0 for strict structural alignment.
    └─ Generates discrete audio codes via the 5Hz LM (Qwen3-2B or 4B) using advanced exposed sampling (temperature, top_p, top_k).
    ↓
Returns: A full CONDITIONING object and `conditioning_info` STRING.
    The CONDITIONING natively contains:
    - base_embeddings
    - pooled
    - extras = { "conditioning_lyrics": [B, L, D], "audio_codes": [[C, O, D, E, S]] }
```

**Key Insight**: By utilizing `ScromfyAceStepTextEncoderPlusPlus` alongside our suite of builders *(like `AceStepMetadataBuilder`)*, we unlock essential features missing from standard ComfyUI:
- **Enriched CoT formatting** that perfectly aligns with SFT models.
- **Granular control** over LM generation via custom parameters (CFG, temperature, top_k/p).
- **Direct exposure** of raw 5Hz `audio_codes` enabling complex audio algebra before it even hits the DiT.

### Conditioning Manipulation (The Scromfy Advantage)
Native ComfyUI hides the generated `audio_codes` and `timbre` inside the text encoder's output. Scromfy nodes empower structural editing:
- **Deconstruct**: Extract raw elements using `AceStepConditioningSplitter`.
- **FSQ Code Math**: Mix and mutate the 6D 5Hz audio codes directly via `AceStepAudioCodesMixer` and `AceStepAudioCodesUnaryOp`.
- **Masking/Slicing**: Split or zero-out parts of the conditioning tensors via `AceStepConditioningZeroOut` or `AceStepTensorMixer` with generated masks (`AceStepAudioMask`).

### Model Execution Flow
```text
CheckpointLoader (Standard ComfyUI)
    ↓ Loads base MODEL, CLIP, and VAE
ScromfyAceStepSampler
    ↓ Intercepts the MODEL and our assembled CONDITIONING.
    ↓ Provides advanced Denoising setups, natively implementing Mask-based Inpainting.
Scromfy Audio VAE Decode PLUSPLUS
    ↓ Intercepts standard VAE decoding to run an advanced decoder with local structural overrides and optional smoothing logic.
```

**While no custom checkpoint loader is strictly needed** (native ComfyUI properly maps the loaded files), our downstream tools like `Scromfy Audio VAE Decode PLUSPLUS` and `ScromfyAceStepSampler` intercept and override default mathematics for vastly superior results, native inpainting support, and advanced latent-audio flexibility.
