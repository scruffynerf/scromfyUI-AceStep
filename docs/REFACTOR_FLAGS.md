# Refactor & Testing Flags

This document tracks code blocks inside nodes that should eventually be moved into shared utility files (`nodes/includes/`), as well as pure functions that are prime candidates for unit testing via `pytest`.

---

## Utility Extraction Flags

*(No pending extraction flags at this time)*

---

## Pytest Targets
- **`nodes/prompt_gen_node.py`**: `_choices_for(items)` is a pure, deterministic function perfect for a simple list sorting/transformation pytest.
- **`nodes/sft_music_analyzer_node.py`**: `_build_gen_kwargs()` and `_clean_tags()` are pure Python utility functions that can be tested trivially without spinning up PyTorch or any LLMs.
- **`nodes/lyrics_formatter_node.py`**: The `format()` method contains custom string parsing logic for line-wrapping and tag-injection. Highly vulnerable to regressions, great target for unit tests.
- **`nodes/lyrics_duration_node.py`**: The `calculate()` duration/RPM math can be entirely isolated and unit-tested for various song profiles.
