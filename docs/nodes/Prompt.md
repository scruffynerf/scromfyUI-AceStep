# Prompt Nodes

The Prompt category handles text generation, text formatting, and native ACE-Step text encoding. These nodes prepare the semantic and structural guidance before passing it to the sampler or conditioning pipeline.

---

## 1. ScromfyAceStepTextEncoderPlusPlus
*File: `nodes/text_encoder_plusplus_node.py`*

The definitive ACE-Step 1.5 text encoder. Combines SFT "Enriched CoT" (Chain-of-Thought) formatting with granular base controls. Supports a toggle for enhanced prompting, trigger words/tags, and full LLM parameters.

### Inputs
- **`clip`** *(Required, CLIP)*: The loaded ACE15TEModel.
- **`caption`** *(Required, STRING)*: The core description (e.g. genre, mood, instruments).
- **`enhanced_prompt`** *(Required, BOOLEAN)*: If True, uses SFT-style 'Enriched CoT' (YAML) formatting for better fine-tuned model performance. If False, uses native ComfyUI encoding logic.
- **`generate_audio_codes`** *(Required, BOOLEAN)*: Enable LLM audio code generation (semantic structure).
- **`instrumental`** *(Required, BOOLEAN)*: Force `[Instrumental]` as lyrics.

*Optional Advanced Overrides*: `lyrics`, `trigger_word`, `style_tags`, `negative_prompt`, `bpm` (-1 = auto), `duration`, `keyscale`, `timesignature`, `language`.
*Optional LM Sampling*: `seed`, `cfg_scale`, `temperature`, `top_p`, `top_k`, `min_p`, `repetition_penalty`.

### Outputs
- **`conditioning`** (`CONDITIONING`): The encoded positive conditioning data.
- **`zero_conditioning`** (`CONDITIONING`): Automatically zeroed-out conditioning suitable for negative input.

---

## 2. AceStepMetadataBuilder
*File: `nodes/metadata_builder_node.py`*

Format raw integers, floats, and strings into a strict music metadata dictionary for Ace-Step conditioning manipulation.

### Inputs
- **`bpm`** (`INT`): 0-300.
- **`duration`** (`FLOAT`): Length in seconds.
- **`keyscale`** (`STRING`): E.g. "C major".
- **`timesignature`** (`INT`): E.g. 4.
- **`language`** (`STRING`): Country code drop-down.
- **`instrumental`** (`BOOLEAN`).

### Outputs
- **`metadata`** (`DICT`): A clean, filtered dictionary mapping these key-values (omitting empty defaults) to pass into other conditioning nodes.

---

## 3. ScromfyAceStepPromptGen
*File: `nodes/prompt_gen_node.py`*

Dynamic multi-category prompt generator using weighted tags. It scans the `prompt_components/` directory to expose dropdown lists of musical features (genres, moods, instruments, setups) and allows for specific selection or randomization.

### Inputs
- **Dynamic Text Lists** *(Required)*: All `.txt` files in `prompt_components` appear as dropdowns. Options include specific elements, `none`, `random`, or `random2`.
- **`seed`** *(Required, INT)*: Deterministic seed for `random` picks.

### Outputs
- **`combined_prompt`** (`STRING`): The full concatenated master string.
- **`[category]_text`** (`STRING`): A separate output port is automatically generated for every component category evaluated (e.g. `genres_text`).

---

## 4. AceStepRandomPrompt
*File: `nodes/random_prompt_node.py`*

Generate random music prompts utilizing the predefined sentence templates provided in `prompt_components/lyrics/SONG_PROMPT_TEMPLATES.txt`.

### Inputs
- **`seed`** *(Required, INT)*.
- **`template`** *(Required, DROP-DOWN)*: List of specific structural templates or completely `random`.

### Outputs
- **`prompt`** (`STRING`): The finalized randomly generated sentence string.

---

## 5. Prompt Freeform
*File: `nodes/prompt_freeform_node.py`*

Resolves `__WILDCARDS__` in any chunk of freeform text into dynamic components using files found in `prompt_components/`.

### Inputs
- **`text`** *(Required, STRING)*: E.g., *"A fast __GENRE__ song with heavy __INSTRUMENTS__"*.
- **`seed`** *(Required, INT)*: Deterministic resolution.

### Outputs
- **`text`** (`STRING`): The fully resolved prompt, substituting the wildcards with parsed data.
