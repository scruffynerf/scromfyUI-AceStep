# Lyrics Nodes

The Lyrics suite handles generating, fetching, formatting, and analyzing vocal text for ACE-Step. It bridges external LLM APIs, the Genius lyrics database, and pure text manipulation to feed structural vocal guidance into the music generation pipeline.

---

## 1. AceStepLyricsFormatter
*File: `nodes/lyrics_formatter_node.py`*

Properly structures raw text into sung lyrics by appending required structural tags (`[Verse]`, `[Chorus]`, `[Bridge]`, etc.) to chunks of text, which the 5Hz audio model relies heavily upon for sectioning music algebraically.

### Inputs
- **`lyrics_text`** *(Required, STRING)*: The raw, untagged lyrics.
- **`structure_preset`** *(Required)*: Dropdown of predefined structures (Auto, Verse-Chorus, AABA, etc.).

### Outputs
- **`formatted_lyrics`** (`STRING`): The 100% compliant lyrics ready to be passed into the Text Encoder.

---

## 2. AceStepLyricsBPMCalculator
*File: `nodes/lyrics_duration_node.py`*

Estimates the tempo and duration required to sing a given set of lyrics based on syllable density and word count. 

### Inputs
- **`lyrics`** *(Required, STRING)*.

### Options
- **`genre_speed`**: Baseline singing speed modifier (`fast` for Rap/EDM, `slow` for Ballads/Jazz).
- **`target_duration`**: Hardcap the resulting float.

### Outputs
- **`bpm`** (`INT`)
- **`duration`** (`FLOAT`): In seconds.

---

## 3. Genius Lyrics Fetchers
*File: `nodes/lyrics_genius_search_node.py`, `nodes/lyrics_genius_random_node.py`*

Direct API integration to fetch real song lyrics. Requires a Genius API Client Access Token (placed in `keys/genius.txt`).

### Nodes
- **`AceStepGeniusLyricsSearch`**: Fetches a specific song (e.g., `artist: "Beatles"`, `title: "Let it Be"`).
- **`AceStepRandomLyrics`**: Fetches a completely random song from the database.

### Outputs
- **`lyrics`** (`STRING`)
- **`title`** (`STRING`)
- **`artist`** (`STRING`)

---

## 4. AI Generator Suite
*File: `nodes/lyrics_claude_node.py` etc.*

Procedural lyric generation using external LLM APIs. These nodes automatically utilize the system prompts found in `prompt_components/lyrics/` to guarantee structural conformity (no 'intro', only `[Verse]`, `[Chorus]`, etc.) matching ACE-Step 1.5's exact training biases.

### Nodes Available
- **`AceStepClaudeLyrics`** *(Anthropic API)*
- **`AceStepGeminiLyrics`** *(Google API)*
- **`AceStepGroqLyrics`** *(Groq Fast Inference API)*
- **`AceStepOpenAILyrics`** *(OpenAI API)*
- **`AceStepPerplexityLyrics`** *(Perplexity API)*
- **`AceStepGenericAILyrics`** *(Any OpenAI-compatible endpoint, LMStudio, Ollama)*

### Inputs
- **`prompt`** *(Required, STRING)*: The musical styles or thematic guide.
- **`emotions`** / **`verbs`** / **`constraints`**: Dropdowns hooked directly to the JSON configs in `prompt_components/` to strictly constrain the generation.

### Outputs
- **`lyrics`** (`STRING`): Fully-structured, generated lyrics.
