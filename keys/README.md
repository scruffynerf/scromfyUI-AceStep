# API Keys Directory

This directory is used to store sensitive API keys and tokens for ACE-Step nodes.

## Required File Formats

Each API key should be placed in its own `.txt` file as a single line of text with no extra characters or quotes.

| Service | Filename | Source |
| :--- | :--- | :--- |
| **Genius** | `genius_api_key.txt` | [Genius API Clients](https://genius.com/api-clients) |
| **OpenAI** | `openai_api_key.txt` | [OpenAI Platform](https://platform.openai.com/api-keys) |
| **Claude** | `claude_api_key.txt` | [Anthropic Console](https://console.anthropic.com/settings/keys) |
| **Gemini** | `gemini_api_key.txt` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| **Groq** | `groq_api_key.txt` | [Groq Cloud](https://console.groq.com/keys) |
| **Perplexity** | `perplexity_api_key.txt` | [Perplexity Settings](https://www.perplexity.ai/settings/api) |

> [!IMPORTANT]
> This directory is git-ignored and `*.txt` files should never be committed to version control.
