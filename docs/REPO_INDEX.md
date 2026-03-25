# ACE-Step Nodes - Repository Index & Build Strategy

Welcome to the central index for the **ScromfyUI-AceStep** project. This document defines the project's focus, status, and provides a structural map of every code file and node category in the repository. For deep-dives into specific node functionality, follow the links to the detailed category documents.

## Project Focus

**Primary Goal:** Replicate 100% of the ACE-Step Gradio app functionality in ComfyUI nodes, while vastly surpassing its capabilities via modularity and explicit conditioning manipulation.

**Success Criteria:**

- Load ACE-Step models via standard ComfyUI loaders ✅
- Generate music in all 4 modes (Simple/Custom/Cover/Repaint) ✅
- Access all advanced parameters (LM CFG, temperature, BPM, etc.) ✅
- Use LoRA adapters ✅
- Generate lyrics via multiple LLM APIs ✅
- Apply post-processing (de-esser, spectral smoothing) ✅
- Save with proper metadata ✅

## Project Status

- **Node Implementation:** 100% Complete.
- **Native Support:** Confirmed ComfyUI native ACE-Step support. Checkpoint loaders work out-of-the-box.
- **Frontend Extensions:** Available for WebAmp, Radio, and custom lyric syncing.

---

## 📂 Repository File Index

The root directory consists of `__init__.py` which handles dynamic node scanning. All nodes reside in `nodes/`.

### Prompting Nodes ([Detailed Specs ➡](nodes/Prompt.md))

Centralize text formatting, LM prompting strategies (like Enriched CoT), and metadata building.

- `text_encoder_plusplus_node.py` — **ScromfyAceStepTextEncoderPlusPlus**: The definitive ACE-Step 1.5 text encoder.
- `metadata_builder_node.py` — **AceStepMetadataBuilder**: Formats the music metadata dictionary.
- `prompt_gen_node.py` — **AceStepPromptGen**: Dynamic multi-category prompt generator using weighted tags.
- `random_prompt_node.py` — **AceStepRandomPrompt**: Randomized music prompt generator.
- `prompt_freeform_node.py` — **Prompt Freeform**: Allows freeform text with dynamic wildcard resolution.

### Conditioning Manipulation ([Detailed Specs ➡](nodes/Conditioning.md))

Raw tensor manipulation, 5Hz audio code editing, splitting, combining, and custom masking logic.

- `audio_codes_mixer_node.py` — **AceStepAudioCodesMixer**: Binary toolbox for mixing two sets of audio codes in 6D FSQ space.
- `audio_codes_unary_op_node.py` — **AceStepAudioCodesUnaryOp**: Unary operations on audio codes with length scaling/masking.
- `conditioning_combine_node.py` — **AceStepConditioningCombine**: Assemble individual tensors and codes into a full conditioning object.
- `conditioning_dual_mixer_node.py` — **AceStepConditioningMixer**: Selectively mix components from two conditioning sources.
- `conditioning_split_node.py` — **AceStepConditioningSplitter**: Decompose conditioning into raw components.
- `audio_codes_to_semantic_hints_node.py` — **AceStepAudioCodesToSemanticHints**: Convert 5Hz audio codes to 25Hz semantic hints.
- `semantic_hints_to_audio_codes_node.py` — **AceStepSemanticHintsToAudioCodes**: Convert 25Hz semantic hints back to 5Hz audio codes.
- `audio_codes_decode_node.py` — **AceStepAudioCodesUnderstand**: Reconstruct metadata and lyrics from 5Hz token IDs.
- `conditioning_zero_out_node.py` — **AceStepConditioningZeroOut**: Zero out conditioning for negative/unconditional input.
- `conditioning_view_node.py` — **AceStepConditioningExplore**: Deep introspection and debugging of conditioning data.
- `conditioning_base_extract_node.py` — **AceStepBaseExtract**: Base-model stem separation.
- `conditioning_base_lego_node.py` — **AceStepBaseLego**: Context-aware track generation.
- `conditioning_base_complete_node.py` — **AceStepBaseComplete**: Automatic accompaniment filling.
- `load_audio_codes_node.py` — **AceStepAudioCodesLoader**: Load 5Hz audio code tensors from disk.
- `load_conditioning_node.py` — **AceStepConditioningLoad**: Load saved conditioning components.
- `load_lyrics_tensor_node.py` — **AceStepLyricsTensorLoader**: Load lyrics conditioning tensors.
- `load_mixed_conditioning_node.py` — **AceStepConditioningMixerLoader**: Mix saved components during load.
- `load_timbre_tensor_node.py` — **AceStepTimbreTensorLoader**: Load timbre conditioning tensors.
- `audio_mask_node.py` — **AceStepAudioMask**: Time-to-step mask generator.
- `tensor_mask_node.py` — **AceStepTensorMaskGenerator**: Primitive mask generator (fraction, range, window).
- `tensor_mixer_node.py` — **AceStepTensorMixer**: Mix two tensors with masking.
- `tensor_unary_op_node.py` — **AceStepTensorUnaryOp**: Transform single tensors.
- `save_conditioning_node.py` — **AceStepConditioningSave**: Component saver.
- `save_tensor_node.py` — **AceStepTensorSave**: Raw tensor saver.
- `conditioning_inspector_node.py` — **AceStepConditioningInspector**: Deep introspection and debugging of conditioning data.
- `conditioning_add_chords_node.py` — **AceStepChordConditioner**: Synthesize and inject chord progressions into conditioning.
- `audio_chord_preview_node.py` — **AceStepChordPreview**: Preview chord audio before generation.
- `acestep_source_reader_node.py` — **AceStepSourceReader**: Developer tool for source inspection and latent injection testing.

### Audio & Post-Processing ([Detailed Specs ➡](nodes/Audio.md))

Decoding latents with extended VAE features, analyzing external audio, and post-processing tools.

- `audio_analyzer_node.py` — **Audio Analyzer (No LLM)**: DSP-based BPM, key, and duration extraction.
- `llm_music_analyzer_node.py` — **ScromfyAceStepMusicAnalyzer**: AI-powered analyzer (Whisper/Qwen) for tags and theory.
- `audio_post_process_node.py` — **AceStepPostProcess**: Audio enhancement (de-esser, spectral smoothing).
- `audio_vae_decode_plusplus_node.py` — **Scromfy Audio VAE Decode PLUSPLUS**: Advanced VAE decoder with local logic overrides.
- `audio_vae_decode_settings_node.py` — **AceStepVAEDecodeSettings**: Configure VAE decoding parameters (boost, normalize, shift).
- `audio_vae_encode_node.py` — **AceStepVAEEncode**: Encode audio to latents.
- `save_audio_flac_node.py` / `save_audio_mp3_node.py` / `save_audio_opus_node.py` — **Scromfy Save Audio**: High-fidelity multi-format audio saver (handles metadata).
- `load_audio_node.py` — **AceStepLoadAudio**: Audio loader with auto-resampling.
- `audio_matchering_node.py` — **Matchering**: Simple two-input matching/mastering.
- `audio_matchering_advanced_node.py` — **Matchering (Advanced)**: Full parameter control for matching.
- `audio_matchering_limiter_config_node.py` — **Matchering Limiter Config**: Detail configuration for the brickwall limiter.

### Samplers ([Detailed Specs ➡](nodes/Sampler.md))

Overriding core implementations for specific features like masking.

- `sampler_node.py` — **ScromfyAceStepSampler**: The primary sampler with APG/ADG guidance and native mask-based inpainting.
- `sampler_settings_node.py` — **ScromfySamplerSettings**: Aggregated sampler configuration (guidance, momentum, decay).

### Lyrics Generation & Formatting ([Detailed Specs ➡](nodes/Lyrics.md))

AI interactions, BPM calculations, and formatters to properly align text.

- `lyrics_formatter_node.py` — **AceStepLyricsFormatter**: Structure lyrics with required formatting tags.
- `lyrics_genius_search_node.py` — **AceStepGeniusLyricsSearch**: Fetch particular lyrics from Genius.
- `lyrics_genius_random_node.py` — **AceStepRandomLyrics**: Fetch random Genius lyrics.
- `lyrics_duration_node.py` — **AceStepLyricsBPMCalculator**: BPM/Duration estimation for lyrics structure.
- `lyrics_claude_node.py` — **AceStepClaudeLyrics**: Procedural generation via Anthropic Claude.
- `lyrics_gemini_node.py` — **AceStepGeminiLyrics**: Procedural generation via Google Gemini.
- `lyrics_groq_node.py` — **AceStepGroqLyrics**: Ultra-fast generation via Groq.
- `lyrics_openai_node.py` — **AceStepOpenAILyrics**: Procedural generation via OpenAI GPT models.
- `lyrics_perplexity_node.py` — **AceStepPerplexityLyrics**: Research-backed lyrics via Perplexity.
- `lyrics_generic_ai_node.py` — **AceStepGenericAILyrics**: OpenAI-compatible model support for local/custom LLMs.
- `lyrics_generic_model_list_node.py` — **AceStepGenericModelList**: Fetch model lists from remote providers.

### Radio & Playback ([Detailed Specs ➡](nodes/Radio.md))

In-UI playback experiences for Comfy.

- `audio_player_webamp_node.py` — **AceStepWebAmpRadio**: Full Winamp integration.
- `audio_player_radio_node.py` — **RadioPlayer**: Lightweight in-UI player.

### LoRA Loading ([Detailed Specs ➡](nodes/Lora.md))

- `load_lora_node.py` — **AceStepLoRALoader**: Standard ACE-Step 1.5 LoRA loader.
- `lora_loader_node.py` — **Scromfy AceStep Lora Stack**: Advanced multi-LoRA stacking.

### Whisper Transcription ([Detailed Specs ➡](nodes/Whisper.md))

- `transcribe_faster_whisper_load_node.py` — **Faster Whisper Loader**: Local weights manager.
- `transcribe_faster_whisper_node.py` — **Faster Whisper Transcribe**: VAD-enabled transcription.
- `transcribe_faster_whisper_save_node.py` — **Faster Whisper Save**: SRT/VTT/LRC exporter.

### Misc & Utilities ([Detailed Specs ➡](nodes/Misc.md))

- `wikipedia_random_entry_node.py` — **WikipediaRandomNode**: Pull random page content.
- `build_emoji_spinner_node.py` — **ScromfyEmojiSpinner**: Iconify/SVG rendering to masks.
- `mask_picker_node.py` — **ScromfyMaskPicker**: Recursive mask directory browser.

### Visualizers ([Detailed Specs ➡](nodes/Visualizers.md))

- `visualizer_circular_node.py` — **Circular Audio Visualizer**: Waveform rendered as a dynamic ring.
- `visualizer_contour_node.py` — **Contour Audio Visualizer**: Advanced shape-based waveform outlines.
- `visualizer_line_node.py` — **Line Audio Visualizer**: Traditional horizontal or vertical spectral waveforms.
- `visualizer_lyrics_node.py` — **Lyrics Overlay**: Advanced text rendering over images with timing sync.
- `visualizer_emoji_spinner_node.py` — **Emoji Spinner Visualizer**: Slot-machine style emoji animations for visual flair.
- `visualizer_lyric_settings_node.py` — **Lyric Visualizer Settings**: Dedicated color, font, and animation config for lyrics.
- `visualizer_global_settings_node.py` — **Visualizer Settings**: Shared canvas and style configurations for all flex-visualizers.

### Kaola High-Level Tasks ([Detailed Specs ➡](nodes/Kaola.md))

Specialized workflows for extraction, accompaniment, and AI-driven song building.

- `kaola_prompt_multiplier_node.py` — **KaolaAceStepPromptMultiplier**: Intelligent prompt expander using a 1.7B LLM.
- `kaola_captioner_node.py` — **KaolaAceStepCaptioner**: Whole-song audio captioning.
- `kaola_transcriber_node.py` — **KaolaAceStepTranscriber**: Music-tuned lyrics extraction.

### Shared Utility Modules (`nodes/includes/`)

- `analysis_utils.py`: FSQ quantization logic and dependency checks.
- `audio_utils.py`: FLAC metadata block generation, multi-format audio saving, and PCM format conversion.
- `emoji_utils.py`: Iconify fetching, SVG-to-Mask conversion (svglib), and caching.
- `flex_utils.py`: Dynamic layout parsing and styling logic for visualizers.
- `fsq_utils.py`: Low-level FSQ encoding/decoding math.
- `icon_collections.py`: Static categorization lists for icons mapping to genres/moods.
- `lyrics_utils.py`: Prompt builders and markdown cleaning.
- `mapping_utils.py`: Shared dictionaries (languages, time signatures) and dropdown wrappers.
- `prompt_utils.py`: Dynamic wildcard expansion and UI-weight sorting.
- `sampling_utils.py`: Noise schedule shift formulas.
- `visualizer_utils.py`: Core rendering mechanics, font-loading, and mathematical plotting for visualizers.
- `whisper_utils.py`: Model discovery, language mappings, and subtitle/LRC formatting logic.
- `chord_utils.py`: Music theory, polyphonic chord synthesis, and ACE-Step conditioning injection logic.
- `matchering_utils.py`: Adapter bridging ComfyUI AUDIO dicts and the file-path-based pip matchering API.
- `llm_utils.py`: High-level orchestration for multi-track accompaniment, including Qwen text-generation and prompt expansion adapters.
