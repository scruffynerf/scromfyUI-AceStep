# AI Instructions

This directory contains the system prompts used by the AI lyric generation nodes.

## System Prompt

The AI nodes use a system prompt to define the "personality" and formatting rules for generated lyrics.

- **systemprompt.default.txt**: The master default prompt provided with the extension. **Do not modify this file directly**, as it may be overwritten during updates.
- **systemprompt.txt**: Create this file to override the default prompt with your own custom instructions. If this file exists, it will be used instead of the default.

### Customization Tips

When creating your own `systemprompt.txt`, consider including:
1.  **Section Tags**: Define which square-bracket tags the AI should use (e.g., `[Intro]`, `[Chorus]`).
2.  **Formatting Rules**: Instruct the AI to avoid markdown, code fences, or numbers in tags.
3.  **Style Preferences**: Set a baseline "mood" or "complexity" for all generated lyrics.
