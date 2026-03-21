# Sampler Nodes

The Sampler category contains the core execution engine for ACE-Step generation, heavily modified from the base implementation to explicitly support conditioning masking, inpainting, and precise guidance scaling natively.

---

## 1. ScromfyAceStepSampler
*File: `nodes/sft_sampler_node.py`*

The Scromfy-exclusive sampler node. While it functions similarly to standard ComfyUI KSampler under the hood, it intercepts the `MODEL` and our assembled `CONDITIONING` bundles to parse `audio_codes`, `timbre_tensor`, and `lyrics_tensor` mathematically before executing semantic diffusion.

Crucially, it is natively aware of `audio_mask` attributes attached to the conditioning objects, allowing for perfect audio **inpainting** out-of-the-box (e.g. replacing seconds 15-20 of a song while freezing the rest).

### Inputs
- **`model`** *(Required, MODEL)*: Base DiT model from CheckpointLoader.
- **`positive`** *(Required, CONDITIONING)*: Full positive tensor bundle.
- **`negative`** *(Optional, CONDITIONING)*: Negative prompt bundle (usually zeroed-out).
- **`audio_codes`** *(Optional, LIST)*: Explicitly pass 5Hz tokens instead of attaching them to the conditioning bundle.
- **`latent_image`** *(Optional, LATENT)*: Optional input latents for Img2Img or continuation geometry.

### Options
- **`seed`**
- **`steps`**: Number of diffusion steps (typically 50-100 for audio).
- **`cfg`**: Classifier-free guidance.
- **`sampler_name`**: Dropdown of K-Diffusion samplers.
- **`scheduler`**: Dropdown of noise scale schedules.
- **`denoise`**: Strength of noise added to `latent_image` if present. Default `1.0`.

### Outputs
- **`samples`** (`LATENT`): The raw generated latents, ready to be passed to an Audio VAE Decode node.
