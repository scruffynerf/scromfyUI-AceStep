# Kaola ACE-Step Nodes

These nodes are ported from the `ComfyUI-kaola-ace-step` implementation. They are prefixed with `Kaola` to distinguish them from standard Scromfy nodes.

## Category: `Scromfy/Ace-Step/Kaola`

### KaolaAceStepPromptMultiplier

**Intelligent Prompt Expander**
Uses a 1.7B LLM to convert a simple natural language query into a full song profile.

- **Inputs**:
  - `llm`: Initialized LLM (from AceStepLLMLoader).
  - `query`: Simple text description (e.g., "A sad lo-fi beat").
- **Outputs**:
  - `caption`: Detailed stylistic description.
  - `lyrics`: Song lyrics or `[Instrumental]`.
  - `bpm`: Estimated BPM.

### KaolaAceStepCaptioner

**Whole-Song Audio Captioning**
Generates detailed descriptions for long audio files using a chunked 30s processing window.

- **Inputs**:
  - `llm`: Audio-capable LLM (e.g., Qwen2.5-Omni).
  - `audio`: The source audio waveform.
- **Outputs**:
  - `caption`: The generated text description.

### KaolaAceStepTranscriber

**Music-Tuned Lyrics Extraction**
Extracts lyrics with precise timestamps.

- **Inputs**:
  - `llm`: Audio-capable LLM.
  - `audio`: The source audio waveform.
- **Outputs**:
  - `lyrics`: Transcribed lyrics with `[START:END]` timestamps.
