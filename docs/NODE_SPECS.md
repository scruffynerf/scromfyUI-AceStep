# ACE-Step Nodes - Technical Specifications

All nodes have been implemented and refactored into individual files within the `nodes/` directory.

## Implementation Overview

- **Nodes**: 54 custom nodes implemented.
- **Shared Logic**: Isolated in `nodes/includes/`.
- **Dynamic Loading**: `__init__.py` automatically registers all `*_node.py` files.

---

## Metadata & Analysis Nodes
1. **AceStepAudioAnalyzer** (`audio_analyzer_node.py`): Extract BPM, key, and duration.
2. **AceStepAudioCodesUnderstand** (`audio_codes_decode_node.py`): Generatively reconstructs metadata and lyrics from token IDs (5Hz).
3. **AceStepConditioningExplore** (`conditioning_view_node.py`): Debug node to explore conditioning data structure with pretty JSON and tensor summaries.
4. **AceStepMetadataBuilder** (`metadata_builder_node.py`): Format music metadata dictionary.

## Mixers & Transformers Nodes
5. **AceStepAudioCodesMixer** (`audio_codes_mixer_node.py`): High-fidelity binary toolbox for mixing two sets of audio codes in 6D FSQ space.
6. **AceStepAudioCodesUnaryOp** (`audio_codes_unary_op_node.py`): Operations that transform a single set of audio codes (A) in 6D FSQ space with length scaling and optional masking.
7. **AceStepConditioningCombine** (`conditioning_combine_node.py`): Assemble individual tensors and codes into a full conditioning object.
8. **AceStepConditioningMixer** (`conditioning_dual_mixer_node.py`): Selectively mix components (main tensor, pooled output, lyrics, audio codes) from two conditioning sources.
9. **AceStepConditioningSplitter** (`conditioning_split_node.py`): Inverse of the Combiner.

## Mixing & Masking Nodes
10. **AceStepAudioMask** (`audio_mask_node.py`): Time-based mask generator for audio (maps seconds to latent steps). Supports all advanced modes from the tensor generator.
11. **AceStepTensorMaskGenerator** (`tensor_mask_node.py`): Generates a `[1, N, 1]` mask using various modes (all, none, fraction, range, ramp, window).
12. **AceStepTensorMixer** (`tensor_mixer_node.py`): Consolidated Binary Toolbox for mixing two tensors `A` and `B` with optional masking and scaling.
13. **AceStepTensorUnaryOp** (`tensor_unary_op_node.py`): Transforms a single input tensor `A` with an optional mask and length scaling.

## Advanced & Semantic Nodes
14. **AceStepAudioCodesToSemanticHints** (`audio_codes_to_semantic_hints_node.py`): Converts 5Hz audio codes to 25Hz semantic hints for DiT conditioning.
15. **AceStepSemanticHintsToAudioCodes** (`semantic_hints_to_audio_codes_node.py`): Convert 25Hz semantic hints back to 5Hz audio codes (lossy).

## Audio & Effects Nodes
16. **AceStepPostProcess** (`audio_post_process_node.py`): De-esser and spectral smoothing for generated audio.

## Loaders & Timbre Nodes
17. **AceStepAudioCodesLoader** (`load_audio_codes_node.py`): Load audio codes from disk.
18. **AceStepConditioningLoad** (`load_conditioning_node.py`): Load and reconstruct conditioning from saved component files.
19. **AceStepLLMLoader** (`load_llm_node.py`): Specialized loader for the 5Hz LLM.
20. **AceStepLyricsTensorLoader** (`load_lyrics_tensor_node.py`): Load a lyrics conditioning tensor from disk.
21. **AceStepConditioningMixerLoader** (`load_mixed_conditioning_node.py`): Granularly mix saved components from different files.
22. **AceStepTimbreTensorLoader** (`load_timbre_tensor_node.py`): Load a timbre conditioning tensor from disk.

## Lyrics Generation Nodes
23. **AceStepLyricsFormatter** (`lyrics_formatter_node.py`): Auto-formats lyrics with required tags.
24. **AceStepGeniusLyricsSearch** (`lyrics_genius_node.py`): Fetches song lyrics from Genius.com.

### AI-Powered Lyrics (Keys in `keys/*.txt`)
25. **AceStepClaudeLyrics** (`lyrics_claude_node.py`): Anthropic Claude API.
26. **AceStepGeminiLyrics** (`lyrics_gemini_node.py`): Google Gemini API.
27. **AceStepGroqLyrics** (`lyrics_groq_node.py`): Groq API.
28. **AceStepOpenAILyrics** (`lyrics_openai_node.py`): OpenAI API.
29. **AceStepPerplexityLyrics** (`lyrics_perplexity_node.py`): Perplexity API.

## Persistence (Save) Nodes
30. **AceStepConditioningSave** (`save_conditioning_node.py`): Save individual conditioning components to separate files on disk.
31. **AceStepTensorSave** (`save_tensor_node.py`): Save a raw tensor to disk.

## Miscellaneous Nodes
32. **AceStep5HzLMConfig** (`llm_config_node.py`): LLM parameter configuration.
33. **EmptyLatentAudio** (`empty_latent_audio_node.py`): Create empty 64-channel latents for generation.

## TBD / Uncategorized Nodes
34. **AceStepInpaintSampler** (`inpaint_sampler_node.py`): Specialized sampler for audio inpainting.
35. **AceStepLoadAudio** (`load_audio_node.py`): Load audio files with auto-resampling.
36. **AceStepLoRALoader** (`load_lora_node.py`): Specialized LoRA loader for ACE-Step 1.5.
37. **AceStepLoRAStatus** (`lora_status_node.py`): Display LoRA loading info.
38. **AceStepModeSelector** (`mode_selector_node.py`): 4-in-1 mode routing.
39. **AceStepPreviewAudio** (`preview_audio_node.py`): Temporary audio preview in UI.
40. **AceStepPromptGen** (`prompt_gen_node.py`): 200+ music style presets.
41. **AceStepRandomPrompt** (`random_prompt_node.py`): Randomized music prompts.
42. **AceStepSaveAudio** (`save_audio_node.py`): Save audio with metadata.
43. **AceStepSaveText** (`save_text_node.py`): Save text output to file.
44. **AceStepVAEDecodeAudio** (`vae_decode_audio_node.py`): Latents \u2192 waveform.
45. **AceStepVAEEncodeAudio** (`vae_encode_audio_node.py`): Waveform \u2192 latents.

## Obsolete Nodes
46. **AceStepAudioCodesToSemanticHints** (`obsolete_audio_codes_to_latent_node.py`): Obsolete.
47. **AceStepAudioToCodec** (`obsolete_audio_to_codec_node.py`): Obsolete.
48. **AceStepCLIPTextEncode** (`obsolete_clip_text_encode_node.py`): Obsolete.
49. **AceStepCodecToLatent** (`obsolete_codec_to_latent_node.py`): Obsolete.
50. **AceStepConditioning** (`obsolete_conditioning_node.py`): Obsolete.
51. **AceStepCustomTimesteps** (`obsolete_custom_timesteps_node.py`): Obsolete.
52. **AceStepKSamplerAdvanced** (`obsolete_ksampler_advanced_node.py`): Obsolete.
53. **AceStepKSampler** (`obsolete_ksampler_node.py`): Obsolete.
54. **AceStepLatentToAudioCodes** (`obsolete_latent_to_audio_codes_node.py`): Obsolete.

---

## Shared Utility Modules (nodes/includes/)

- **analysis_utils.py**: FSQ quantization logic and dependency checks.
- **audio_utils.py**: FLAC metadata block generation.
- **fsq_utils.py**: Low-level FSQ encoding/decoding math.
- **lyrics_utils.py**: Prompt builders and markdown cleaning.
- **prompt_utils.py**: Style presets and musical descriptors.
- **sampling_utils.py**: Noise schedule shift formulas.
