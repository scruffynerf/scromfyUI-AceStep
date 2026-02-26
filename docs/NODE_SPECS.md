# ACE-Step Nodes - Technical Specifications

All nodes have been implemented and refactored into individual files within the `nodes/` directory.

## Implementation Overview

- **Nodes**: 46 custom nodes implemented.
- **Shared Logic**: Isolated in `nodes/includes/`.
- **Dynamic Loading**: `__init__.py` automatically registers all `*_node.py` files.

---

## Audio I/O Nodes (nodes/*_node.py)

1. **LoadAudio** (`load_audio_node.py`): Load audio files with auto-resampling to 44.1kHz.
2. **SaveAudio** (`save_audio_node.py`): Save audio with FLAC metadata support.
3. **PreviewAudio** (`preview_audio_node.py`): Temporary audio preview in UI.
4. **EmptyLatentAudio** (`empty_latent_audio_node.py`): Create empty 64-channel latents.
5. **VAEEncodeAudio** (`vae_encode_audio_node.py`): Waveform \u2192 latents.
6. **VAEDecodeAudio** (`vae_decode_audio_node.py`): Latents \u2192 waveform.

## Lyrics Generation Nodes (nodes/*_node.py)

7. **AceStepGeminiLyrics** (`lyrics_gemini_node.py`): Google Gemini API.
8. **AceStepGroqLyrics** (`lyrics_groq_node.py`): Groq API.
9. **AceStepOpenAILyrics** (`lyrics_openai_node.py`): OpenAI API.
10. **AceStepClaudeLyrics** (`lyrics_claude_node.py`): Anthropic Claude API.
11. **AceStepPerplexityLyrics** (`lyrics_perplexity_node.py`): Perplexity API.
12. **AceStepLyricsFormatter** (`lyrics_formatter_node.py`): Auto-formats lyrics with required tags.
13. **SaveText** (`save_text_node.py`): Save text output to file.

## Prompts & Post-Processing Nodes (nodes/*_node.py)

14. **AceStepPromptGen** (`prompt_gen_node.py`): 200+ music style presets.
15. **AceStepRandomPrompt** (`random_prompt_node.py`): Randomized genre/mood/instrument prompts.
16. **AceStepPostProcess** (`audio_post_process_node.py`): De-esser and spectral smoothing.

## Sampling Nodes (nodes/*_node.py)

17. **AceStepKSampler** (`obsolete_ksampler_node.py`): Obsolete.
18. **AceStepKSamplerAdvanced** (`obsolete_ksampler_advanced_node.py`): Obsolete.
19. **AceStepInpaintSampler** (`inpaint_sampler_node.py`): Specialized sampler for audio inpainting/masking.

## Audio Analysis & Codec Nodes (nodes/*_node.py)

20. **AceStepAudioAnalyzer** (`audio_analyzer_node.py`): Extract BPM, key, and duration. (Metadata category)
21. **AceStepAudioToCodec** (`audio_to_codec_node.py`): Waveform \u2192 FSQ codes for conditioning.
22. **AceStepAudioCodesToSemanticHints** (`audio_codes_to_semantic_hints_node.py`): Converts 5Hz audio codes to 25Hz semantic hints for DiT conditioning.
23. **AceStepSemanticHintsToAudioCodes** (`semantic_hints_to_audio_codes_node.py`): Convert 25Hz semantic hints back to 5Hz audio codes (lossy).
24. **AceStepAudioCodesUnaryOp** (`audio_codes_unary_op_node.py`): Operations that transform a single set of audio codes (A) in 6D FSQ space with optional masking (gate, scale, noise, fade).

## Text & Conditioning Nodes (nodes/*_node.py)

24. **AceStepMetadataBuilder** (`metadata_builder_node.py`): Format music metadata dictionary.
25. **AceStepCLIPTextEncode** (`obsolete_clip_text_encode_node.py`): Obsolete.
26. **AceStepConditioning** (`obsolete_conditioning_node.py`): Obsolete.

## Advanced & UI Nodes (nodes/*_node.py)

27. **AceStepModeSelector** (`mode_selector_node.py`): 4-in-1 mode routing.
28. **AceStepAudioMask** (`mast_audio_node.py`): Time-based latent masking.
29. **AceStep5HzLLMConfig** (`llm_config_node.py`): LLM parameter configuration.
30. **AceStepCustomTimesteps** (`obsolete_custom_timesteps_node.py`): Obsolete.
31. **AceStepLoRAStatus** (`lora_status_node.py`): Display LoRA loading info.
32. **AceStepLoRALoader** (`load_lora_node.py`): Specialized LoRA loader for the ACE-Step 1.5 LoRA using additional json files.
33. **AceStepConditioningView** (`conditioning_view_node.py`): Debug node to explore conditioning data structure with pretty JSON and tensor summaries.
34. **AceStepConditioningDualMixer** (`conditioning_dual_mixer_node.py`): Selectively mix components (main tensor, pooled output, lyrics, audio codes) from two conditioning sources.
35. **AceStepAudioCodesMixer** (`audio_codes_mixer_node.py`): High-fidelity binary toolbox for mixing two sets of audio codes in 6D FSQ space.
36. **AceStepConditioningSave** (`save_conditioning_node.py`): Save individual conditioning components to separate files on disk.
37. **AceStepConditioningLoad** (`load_conditioning_node.py`): Load and reconstruct conditioning from saved component files.
38. **AceStepConditioningMixerLoader** (`load_mixed_conditioning_node.py`): Granularly mix saved components from different files.
    - **Optional Base**: `timbre_tensor_file` can be set to "none", generating a zero/ones/random fallback.
    - **Fallback Modes**: `empty_mode` (zeros, ones, random) for missing tensors.
39. **AceStepTimbreTensorLoader** (`load_timbre_tensor_node.py`): Load a timbre conditioning tensor from disk.
40. **AceStepLyricsTensorLoader** (`load_lyrics_tensor_node.py`): Load a lyrics conditioning tensor from disk.
41. **AceStepAudioCodesLoader** (`audio_codes_loader_node.py`): Load audio codes from disk.
42. **AceStepConditioningCombine** (`conditioning_combine_node.py`): Assemble individual tensors and codes into a full conditioning object.
43. **AceStepConditioningSplitter** (`conditioning_split_node.py`): Inverse of the Combiner.
44. **AceStepTensorMaskGenerator** (`tensor_mask_nodes.py`): Generates a `[1, N, 1]` mask using various modes.
45. **AceStepTensorUnaryOp** (`tensor_unary_op_node.py`): Transforms a single input tensor `A` with an optional mask.
46. **AceStepTensorMixer** (`tensor_mixer_node.py`): Consolidated Binary Toolbox for mixing two tensors `A` and `B`.
47. **AceStepGeniusLyricsSearch** (`lyrics_genius_node.py`): Fetches song lyrics from Genius.com.
48. **AceStepAudioCodesUnderstand** (`audio_codes_decode_node.py`): Generatively reconstructs metadata and lyrics from token IDs.
49. **AceStepAudioCodesToLatent** (`audio_codes_to_latent_node.py`): Obsolete.

---

## Shared Utility Modules (nodes/includes/)

- **analysis_utils.py**: FSQ quantization logic and dependency checks.
- **audio_utils.py**: FLAC metadata block generation.
- **fsq_utils.py**: Low-level FSQ encoding/decoding math.
- **lyrics_utils.py**: Prompt builders and markdown cleaning.
- **prompt_utils.py**: Style presets and musical descriptors.
- **sampling_utils.py**: Noise schedule shift formulas.
