# ACE-Step Nodes - Technical Specifications

All nodes live in `nodes/` and are auto-registered by `__init__.py`.
Shared logic is in `nodes/includes/`. Frontend extensions are in `web/`.

**62 node files total** — 46 active, 16 obsolete.

---

## Prompt & Encoding (Scromfy/Ace-Step/prompt)

1. **ScromfyACEStep15TaskTextEncode** (`text_encode_ace15_node.py`): Full ACE-Step 1.5 text encoder with human-readable dropdowns for language, key signature, and time signature. Supports LLM audio code generation toggle.
    *   **Wildcards**: Supports recursive expansion of `__COMPONENT__` tokens (e.g., `__ADJECTIVES__`). It includes a fallback for pluralization (e.g., `__ADJECTIVE__` matches `ADJECTIVES.txt`).
    *   **Keyscale Support**: Includes a built-in `KEYSCALE` dropdown with "Auto-detect" and 56 musical keys, matching the Text Encoder's requirements.
    *   **Dynamic Outputs**: Provides a combined prompt plus individual cleaned strings for every active component.
3. **AceStepRandomPrompt** (`random_prompt_node.py`): Randomized music prompt generator.

## Metadata & Analysis (Scromfy/Ace-Step/metadata)

4. **AceStepAudioAnalyzer** (`audio_analyzer_node.py`): Extract BPM, key, and duration from audio.
5. **AceStepAudioCodesUnderstand** (`audio_codes_decode_node.py`): Generatively reconstruct metadata and lyrics from 5Hz token IDs.
6. **AceStepConditioningExplore** (`conditioning_view_node.py`): Deep-introspection debug node — recursively explores conditioning data with circular-reference protection, MRO display, and lovely-tensors summaries.
7. **AceStepMetadataBuilder** (`metadata_builder_node.py`): Format music metadata dictionary.

## Mixers (Scromfy/Ace-Step/mixers)

8. **AceStepAudioCodesMixer** (`audio_codes_mixer_node.py`): Binary toolbox for mixing two sets of audio codes in 6D FSQ space.
9. **AceStepAudioCodesUnaryOp** (`audio_codes_unary_op_node.py`): Unary operations on audio codes with length scaling and optional masking.
10. **AceStepConditioningCombine** (`conditioning_combine_node.py`): Assemble individual tensors and codes into a full conditioning object.
11. **AceStepConditioningMixer** (`conditioning_dual_mixer_node.py`): Selectively mix components from two conditioning sources.
12. **AceStepConditioningSplitter** (`conditioning_split_node.py`): Inverse of the Combiner — decompose conditioning into components.
13. **AceStepAudioMask** (`audio_mask_node.py`): Time-based mask generator (maps seconds to latent steps).
14. **AceStepTensorMaskGenerator** (`tensor_mask_node.py`): Generates `[1, N, 1]` masks using various modes (all, none, fraction, range, ramp, window).
15. **AceStepTensorMixer** (`tensor_mixer_node.py`): Binary toolbox for mixing two tensors with optional masking and scaling.
16. **AceStepTensorUnaryOp** (`tensor_unary_op_node.py`): Transforms a single tensor with optional mask and length scaling.

## Advanced & Semantic (Scromfy/Ace-Step/advanced)

17. **AceStepAudioCodesToSemanticHints** (`audio_codes_to_semantic_hints_node.py`): Convert 5Hz audio codes to 25Hz semantic hints for DiT conditioning.
18. **AceStepSemanticHintsToAudioCodes** (`semantic_hints_to_audio_codes_node.py`): Convert 25Hz semantic hints back to 5Hz audio codes (lossy).

## Audio & Effects (Scromfy/Ace-Step/audio)

19. **AceStepPostProcess** (`audio_post_process_node.py`): De-esser and spectral smoothing for generated audio.

## Essential (Scromfy/Ace-Step/essential)

21. **AceStepConditioningZeroOut** (`conditioning_zero_out_node.py`): Zero out conditioning for negative/unconditional input.

## Load (Scromfy/Ace-Step/load)

22. **AceStepAudioCodesLoader** (`load_audio_codes_node.py`): Load audio codes from disk.
23. **AceStepConditioningLoad** (`load_conditioning_node.py`): Load and reconstruct conditioning from saved component files.
24. **AceStepLLMLoader** (`load_llm_node.py`): Specialized loader for the 5Hz LLM.
25. **AceStepLoRALoader** (`load_lora_node.py`): Specialized LoRA loader for ACE-Step 1.5.
26. **AceStepLyricsTensorLoader** (`load_lyrics_tensor_node.py`): Load a lyrics conditioning tensor from disk.
27. **AceStepConditioningMixerLoader** (`load_mixed_conditioning_node.py`): Granularly mix saved components from different files.
28. **AceStepTimbreTensorLoader** (`load_timbre_tensor_node.py`): Load a timbre conditioning tensor from disk.

## Lyrics (Scromfy/Ace-Step/lyrics)

29. **AceStepLyricsFormatter** (`lyrics_formatter_node.py`): Auto-format lyrics with required section tags.
30. **AceStepGeniusLyricsSearch** (`lyrics_genius_search_node.py`): Fetch lyrics by artist + title from Genius.com.
31. **AceStepRandomLyrics** (`lyrics_genius_random_node.py`): Pick a random Genius song and fetch its lyrics.
32. **AceStepLyricsBPMCalculator** (`lyrics_duration_node.py`): Estimate duration and suggested BPM ranges (Low/Mid/High) based on line count and word count. Filter [tags] automatically.

### AI-Powered Lyrics (Scromfy/Ace-Step/lyrics/AI)

API keys stored in `keys/*.txt` — see [keys/README.md](../keys/README.md).
User instructions stored in `AIinstructions/`.

33. **AceStepClaudeLyrics** (`lyrics_claude_node.py`): Anthropic Claude API.
34. **AceStepGeminiLyrics** (`lyrics_gemini_node.py`): Google Gemini API.
35. **AceStepGroqLyrics** (`lyrics_groq_node.py`): Groq API (uses official `groq` library).
36. **AceStepOpenAILyrics** (`lyrics_openai_node.py`): OpenAI API.
37. **AceStepPerplexityLyrics** (`lyrics_perplexity_node.py`): Perplexity API.
38. **AceStepGenericAILyrics** (`lyrics_generic_ai_node.py`): OpenAI-compatible API (Ollama, LM Studio, etc.) with custom `api_url`.
39. **AceStepGenericModelList** (`lyrics_generic_ai_node.py`): Fetch available model IDs from an OpenAI-compatible `/v1/models` endpoint.
    *   **Features**: Automated `<think>` block removal for reasoning models (DeepSeek R1, etc.).
    *   **Overrides**: Supports hierarchy: `systemprompt.txt` (User) -> `systemprompt.default.txt` (System).

## Persistence / Save (Scromfy/Ace-Step/save)

40. **Scromfy Save Audio** (`save_audio_node.py`): High-fidelity FLAC/WAV/MP3/Opus saver.
    *   **Output**: Returns the absolute `filepath` (without extension) for downstream syncing.
41. **AceStepConditioningSave** (`save_conditioning_node.py`): Save conditioning components to separate files.
42. **AceStepTensorSave** (`save_tensor_node.py`): Save a raw tensor to disk.

## WebAmp & Radio (Scromfy/Ace-Step/radio)

43. **AceStepWebAmpRadio** (`webamp_node.py`): Classic Winamp UI with playlist, skins (`.wsz`), and full Milkdrop visualizer support.
    *   **Visualizer Control**: Features a dedicated control bar for Next/Prev, Shuffle, Cycle, and List overlay.
    *   **Large Libraries**: Optimized to load 500+ local visualizers instantly using Redux injection.
    *   **Local Assets**: Uses local `webamp.butterchurn.mjs` and `butterchurn.v3.js` for stability.
44. **RadioPlayer** (`radio_node.py`): Lightweight in-UI audio player with polling and LRC support.

## Transcription (Scromfy/Ace-Step/Whisper)

45. **Faster Whisper Loader** (`faster_whisper_node.py`): Load Systran's optimized Whisper models. Supports CPU/GPU and precision settings.
46. **Faster Whisper Transcribe** (`faster_whisper_node.py`): High-speed transcription with VAD and word-timestamps (AUDIO-only input, auto-resampled to 16kHz).
    *   **Advanced Options**: Full support for `log_prob_threshold`, `temperature`, `patience`, `hotwords`, etc.
47. **Save Subtitle/Lyrics** (`faster_whisper_node.py`): Specialized saver that matches filenames with your audio saves. Converts transcription to `.srt`, `.vtt`, or `.lrc`.

## Miscellaneous (Scromfy/Ace-Step/misc)

48. **AceStep5HzLMConfig** (`llm_config_node.py`): LLM parameter configuration.
49. **AceStepInpaintSampler** (`inpaint_sampler_node.py`): Specialized sampler for audio inpainting.
50. **AceStepLoadAudio** (`load_audio_node.py`): Load audio files with auto-resampling.
51. **AceStepModeSelector** (`mode_selector_node.py`): 4-in-1 mode routing.

---

## Obsolete Nodes (Scromfy/Ace-Step/obsolete)

These are deprecated and will be removed in a future version.

| Class | File |
|-------|------|
| ObsoleteAceStepAudioCodesToSemanticHints | `obsolete_audio_codes_to_latent_node.py` |
| ObsoleteAceStepAudioToCodec | `obsolete_audio_to_codec_node.py` |
| ObsoleteAceStepCLIPTextEncode | `obsolete_clip_text_encode_node.py` |
| ObsoleteAceStepCodecToLatent | `obsolete_codec_to_latent_node.py` |
| ObsoleteAceStepConditioning | `obsolete_conditioning_node.py` |
| ObsoleteAceStepCustomTimesteps | `obsolete_custom_timesteps_node.py` |
| ObsoleteAceStepKSamplerAdvanced | `obsolete_ksampler_advanced_node.py` |
| ObsoleteAceStepKSampler | `obsolete_ksampler_node.py` |
| ObsoleteAceStepLatentToAudioCodes | `obsolete_latent_to_audio_codes_node.py` |
| ObsoleteAceStepLoRAStatus | `obsolete_lora_status_node.py` |
| ObsoleteEmptyLatentAudio | `obsolete_empty_latent_audio_node.py` |
| ObsoleteSaveText | `obsolete_save_text_node.py` |
| ObsoleteVAEDecodeAudio | `obsolete_vae_decode_audio_node.py` |
| ObsoleteVAEEncodeAudio | `obsolete_vae_encode_audio_node.py` |

---

## Shared Utility Modules (nodes/includes/)

- **analysis_utils.py**: FSQ quantization logic and dependency checks.
- **audio_utils.py**: FLAC metadata block generation.
- **fsq_utils.py**: Low-level FSQ encoding/decoding math.
- **lyrics_utils.py**: Prompt builders and markdown cleaning.
- **prompt_utils.py**: Dynamic wildcard expansion and UI-weight sorting.
- **sampling_utils.py**: Noise schedule shift formulas.
- **whisper_utils.py**: Model discovery, language mappings, and subtitle/LRC formatting logic.

## AI Instructions (AIinstructions/)

- **systemprompt.default.txt**: The master system prompt used for all AI lyric generation.
- **systemprompt.txt**: User-created override.

## Prompt Components (prompt_components/)

- **WEIGHTS.default.json**: Master default weights for UI sorting.
- **TOTALIGNORE.default.list**: Master default ignore list.
- **LOADBUTNOTSHOW.default.list**: Master default "hide from UI" list.
- **REPLACE.default.list**: Master default replacement map.
- **Customization**: Users can create versions without `.default` to apply overrides.

## Frontend Extensions (web/)

- **radio_player.js**: Lightweight widget for RadioPlayer.
- **webamp_player.js**: Premium Winamp widget for WebAmpRadio.
