<!-- markdownlint-disable MD024 -->
# Whisper Nodes

The Faster Whisper implementation serves two distinct purposes: generating structural transcriptions (VTT, SRT, LRC) for music player visuals, and reverse-analyzing raw audio inputs so the LLM Prompt Generator nodes can have explicit lyrics to describe.

---

## 1. Faster Whisper Loader

*File: `nodes/transcribe_faster_whisper_node.py`*

Downloads (if necessary) and loads the optimized CTranslate2 Faster-Whisper models into VRAM.

### Options

- **`model_size`**: Dropdown (`tiny`, `base`, `small`, `medium`, `large-v2`, `large-v3`). For accurate musical transcription, `large-v2` or `large-v3` is highly recommended.
- **`device`**: `cuda` / `cpu`.
- **`compute_type`**: `float16`, `int8_float16`, etc.

### Outputs

- **`whisper_model`** (`WHISPER_MODEL`)

---

## 2. Faster Whisper Transcribe

*File: `nodes/transcribe_faster_whisper_node.py`*

Executes the loaded model against an `AUDIO` stream. Natively implements Voice Activity Detection (Silero VAD) to silence hallucinated transcriptions that commonly occur in long instrumental sections.

### Inputs

- **`audio`** *(Required, AUDIO)*
- **`whisper_model`** *(Required, WHISPER_MODEL)*

### Outputs

- **`transcription`** (`STRING`): A JSON blob containing word-level timestamps, confidences, and the full raw text.

---

## 3. Save Subtitle/Lyrics

*File: `nodes/transcribe_faster_whisper_node.py`*

Interprets the JSON transcription blob and exports standard subtitle formats directly to the disk for playback.

### Inputs

- **`transcription`** *(Required, STRING)*.

### Options

- **`format`**: Choose between `.lrc` (pure music line-by-line format), `.srt`, or `.vtt`.
- **`filename_prefix`**.

### Outputs

- **`subtitle_path`** (`STRING`)
