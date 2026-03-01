# Implementation Progress Tracker

## Node Implementation Status

All nodes are implemented and refactored. **62 node files** — 46 active, 16 obsolete.

### ✅ Refactored Structure Summary
- **Nodes**: Each node is in its own `nodes/*_node.py` file.
- **Shared Logic**: Isolated in `nodes/includes/` (audio, lyrics, prompts, sampling, analysis, FSQ, whisper).
- **Frontend**: 
    - `web/radio_player.js` for the RadioPlayer widget.
    - `web/webamp_player.js` for the WebAmpRadio widget.
    - `web/lyricer.js` for synced lyrics display.
- **Registration**: Dynamic loading via `__init__.py` scanner + `WEB_DIRECTORY`.

---

### ✅ Implementation Breakdown

#### Prompt & Encoding
- [x] `ScromfyACEStep15TaskTextEncode` — `text_encode_ace15_node.py`
- [x] `AceStepPromptGen` — `prompt_gen_node.py` (Dynamic wildcard generator)
- [x] `AceStepRandomPrompt` — `random_prompt_node.py`

#### Metadata & Analysis
- [x] `AceStepAudioAnalyzer` — `audio_analyzer_node.py`
- [x] `AceStepAudioCodesUnderstand` — `audio_codes_decode_node.py`
- [x] `AceStepConditioningExplore` — `conditioning_view_node.py`
- [x] `AceStepMetadataBuilder` — `metadata_builder_node.py`

#### Mixers
- [x] `AceStepAudioCodesMixer` — `audio_codes_mixer_node.py`
- [x] `AceStepAudioCodesUnaryOp` — `audio_codes_unary_op_node.py`
- [x] `AceStepConditioningCombine` — `conditioning_combine_node.py`
- [x] `AceStepConditioningMixer` — `conditioning_dual_mixer_node.py`
- [x] `AceStepConditioningSplitter` — `conditioning_split_node.py`
- [x] `AceStepAudioMask` — `audio_mask_node.py`
- [x] `AceStepTensorMaskGenerator` — `tensor_mask_node.py`
- [x] `AceStepTensorMixer` — `tensor_mixer_node.py`
- [x] `AceStepTensorUnaryOp` — `tensor_unary_op_node.py`

#### Advanced & Semantic
- [x] `AceStepAudioCodesToSemanticHints` — `audio_codes_to_semantic_hints_node.py`
- [x] `AceStepSemanticHintsToAudioCodes` — `semantic_hints_to_audio_codes_node.py`

#### Audio & Effects
- [x] `AceStepPostProcess` — `audio_post_process_node.py`

#### Essential
- [x] `AceStepConditioningZeroOut` — `conditioning_zero_out_node.py`

#### Load
- [x] `AceStepAudioCodesLoader` — `load_audio_codes_node.py`
- [x] `AceStepConditioningLoad` — `load_conditioning_node.py`
- [x] `AceStepLLMLoader` — `load_llm_node.py`
- [x] `ObsoleteAceStepLoRAStatus` — `obsolete_lora_status_node.py`
- [x] `ObsoleteEmptyLatentAudio` — `obsolete_empty_latent_audio_node.py`
- [x] [REMOVED] `ObsoleteFlacPreviewAudio` — `obsolete_preview_audio_node.py`
- [x] `AceStepConditioningMixerLoader` — `load_mixed_conditioning_node.py`
- [x] `AceStepTimbreTensorLoader` — `load_timbre_tensor_node.py`

#### Lyrics
- [x] `AceStepLyricsFormatter` — `lyrics_formatter_node.py`
- [x] `AceStepGeniusLyricsSearch` — `lyrics_genius_search_node.py`
- [x] `AceStepRandomLyrics` — `lyrics_genius_random_node.py`
- [x] `AceStepLyricsBPMCalculator` — `lyrics_duration_node.py`

##### AI-Powered (Keys in `keys/*.txt`)
- [x] `AceStepClaudeLyrics` — `lyrics_claude_node.py`
- [x] `AceStepGeminiLyrics` — `lyrics_gemini_node.py`
- [x] `AceStepGroqLyrics` — `lyrics_groq_node.py`
- [x] `AceStepOpenAILyrics` — `lyrics_openai_node.py`
- [x] `AceStepPerplexityLyrics` — `lyrics_perplexity_node.py`
- [x] `AceStepGenericAILyrics` — `lyrics_generic_ai_node.py` (Ollama/R1 support)

#### Persistence (Save)
- [x] `Scromfy Save Audio` (MP3, Opus, FLAC) — `save_audio_node.py`
- [x] `AceStepConditioningSave` — `save_conditioning_node.py`
- [x] `AceStepTensorSave` — `save_tensor_node.py`

#### Radio & Visualizers
- [x] `RadioPlayer` — `radio_node.py`
- [x] `AceStepWebAmpRadio` — `webamp_node.py`
    - [x] Large library optimization (500+ presets)
    - [x] Hot-swapping skins & visualizers
    - [x] In-node control bar (Next/Prev/Shuffle/Cycle/Overlay/Info)
    - [x] Integrated Butterchurn v3 beta engine

#### Transcription (Whisper)
- [x] `AceStepLoadFasterWhisperModel` — `faster_whisper_node.py`
- [x] `AceStepFasterWhisperTranscription` — `faster_whisper_node.py`
- [x] `AceStepSaveSubtitleLyrics` — `faster_whisper_node.py` (.lrc support)

#### Miscellaneous
- [x] `AceStep5HzLMConfig` — `llm_config_node.py`
- [x] `AceStepInpaintSampler` — `inpaint_sampler_node.py`
- [x] `AceStepLoadAudio` — `load_audio_node.py`
- [x] `AceStepModeSelector` — `mode_selector_node.py`

---

## Progress Statistics

- **Total Nodes: 62/62 complete (100%)** ✅
- **Active Nodes: 46** ✅
- **Obsolete Nodes: 16** (deprecated, to be removed)
- **Refactoring: Complete** ✅
- **Dynamic Loading: Functional** ✅
- **Frontend Extensions: 3** (Radio, WebAmp, Lyricer) ✅

---

## Project Structure

```text
scromfyUI-AceStep/
├── __init__.py           # Dynamic node scanner + WEB_DIRECTORY
├── nodes/
│   ├── includes/         # Shared utility modules
│   │   ├── fsq_utils.py
│   │   ├── lyrics_utils.py
│   │   ├── prompt_utils.py
│   │   ├── sampling_utils.py
│   │   └── whisper_utils.py
│   └── *_node.py         # Individual node files
├── web/
│   ├── lyricer.js        # Sync engine for lyrics
│   ├── radio_player.css  # Radio UI styling
│   ├── radio_player.js   # RadioPlayer frontend widget
│   ├── webamp_player.css # WebAmp UI styling
│   ├── webamp_player.js  # WebAmpRadio frontend widget
│   ├── webamp.butterchurn.mjs # Local WebAmp/Butterchurn bundle
│   └── butterchurn.v3.js # Local Butterchurn engine (v3 beta)
├── keys/
│   └── README.md         # API key setup instructions
├── AIinstructions/
│   ├── systemprompt.default.txt # Master system prompt
│   └── systemprompt.txt  # User-created override
├── prompt_components/
│   ├── WEIGHTS.default.json # Default UI priorities
│   └── *.txt            # Other category lists
├── webamp_skins/         # Drop .wsz files here
├── webamp_visualizers/   # Drop .json presets here
└── docs/
    ├── NODE_SPECS.md     # Technical specifications
    ├── PROGRESS.md       # This file
    └── walkthrough.md    # New feature walkthroughs
```
