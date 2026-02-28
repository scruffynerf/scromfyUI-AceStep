import os
import folder_paths
import faster_whisper
from typing import List, Dict, Union

# Maintain compatibility with existing nodes
faster_whisper_model_dir = os.path.join(folder_paths.models_dir, "faster-whisper")
os.makedirs(faster_whisper_model_dir, exist_ok=True)

AVAILABLE_SUBTITLE_FORMATS = ['.srt', '.vtt', '.lrc']

AVAILABLE_LANGS = {
    "Auto": "auto",
    "English": "en",
    "Chinese": "zh",
    "Japanese": "ja",
    "Korean": "ko",
    "French": "fr",
    "German": "de",
    "Spanish": "es",
    "Russian": "ru",
    "Italian": "it",
    "Portuguese": "pt",
    "Turkish": "tr",
    "Vietnamese": "vi",
    "Thai": "th",
    "Indonesian": "id",
    "Arabic": "ar",
    "Hindi": "hi",
}

# The reference code has a much larger list, but we'll start with these and 
# mapping the rest if needed. Actually, let's just include the full list 
# from the reference to be thorough.

FULL_LANG_MAPPING = {
    "Afrikaans": "af", "Amharic": "am", "Arabic": "ar", "Assamese": "as", "Azerbaijani": "az",
    "Bashkir": "ba", "Belarusian": "be", "Bulgarian": "bg", "Bengali": "bn", "Tibetan": "bo",
    "Breton": "br", "Bosnian": "bs", "Catalan": "ca", "Czech": "cs", "Welsh": "cy",
    "Danish": "da", "German": "de", "Greek": "el", "English": "en", "Spanish": "es",
    "Estonian": "et", "Basque": "eu", "Persian": "fa", "Finnish": "fi", "Faroese": "fo",
    "French": "fr", "Galician": "gl", "Gujarati": "gu", "Hausa": "ha", "Hawaiian": "haw",
    "Hebrew": "he", "Hindi": "hi", "Croatian": "hr", "Haitian Creole": "ht", "Hungarian": "hu",
    "Armenian": "hy", "Indonesian": "id", "Icelandic": "is", "Italian": "it", "Japanese": "ja",
    "Javanese": "jw", "Georgian": "ka", "Kazakh": "kk", "Khmer": "km", "Kannada": "kn",
    "Korean": "ko", "Latin": "la", "Luxembourgish": "lb", "Lingala": "ln", "Lao": "lo",
    "Lithuanian": "lt", "Latvian": "lv", "Malagasy": "mg", "Maori": "mi", "Macedonian": "mk",
    "Malayalam": "ml", "Mongolian": "mn", "Marathi": "mr", "Malay": "ms", "Maltese": "mt",
    "Burmese": "my", "Nepali": "ne", "Dutch": "nl", "Norwegian Nynorsk": "nn", "Norwegian": "no",
    "Occitan": "oc", "Punjabi": "pa", "Polish": "pl", "Pashto": "ps", "Portuguese": "pt",
    "Romanian": "ro", "Russian": "ru", "Sanskrit": "sa", "Sindhi": "sd", "Sinhala": "si",
    "Slovak": "sk", "Slovenian": "sl", "Shona": "sn", "Somali": "so", "Albanian": "sq",
    "Serbian": "sr", "Sundanese": "su", "Swedish": "sv", "Swahili": "sw", "Tamil": "ta",
    "Telugu": "te", "Tajik": "tg", "Thai": "th", "Turkmen": "tk", "Tagalog": "tl",
    "Turkish": "tr", "Tatar": "tt", "Ukrainian": "uk", "Urdu": "ur", "Uzbek": "uz",
    "Vietnamese": "vi", "Yiddish": "yi", "Yoruba": "yo", "Chinese": "zh", "Cantonese": "yue"
}


def collect_model_paths(model_dir: str = faster_whisper_model_dir):
    """Get available models from model dir path including fine-tuned model."""
    model_paths = {model: model for model in faster_whisper.available_models()}
    prefix = "models--Systran--faster-whisper-"

    if os.path.exists(model_dir):
        existing_models = [m for m in os.listdir(model_dir) if m not in [".locks"]]
        for model_name in existing_models:
            display_name = model_name
            if prefix in model_name:
                display_name = model_name[len(prefix):]
            if display_name not in model_paths:
                model_paths[display_name] = os.path.join(model_dir, model_name)
    return model_paths


def format_subtitles(transcriptions: List[Dict], output_format: str) -> str:
    """Format transcription segments into SRT, VTT, or LRC."""
    if output_format not in AVAILABLE_SUBTITLE_FORMATS:
        raise ValueError(f"Format {output_format} not supported.")

    lines = []
    if output_format == '.vtt':
        lines.append("WEBVTT\n")

    for i, seg in enumerate(transcriptions):
        start = seg['start']
        end = seg['end']
        text = seg['text'].strip()

        if output_format == '.lrc':
            # LRC Format: [mm:ss.xx]Text
            lines.append(f"[{format_time_lrc(start)}]{text}")
        else:
            # SRT/VTT sequential blocks
            lines.append(f"{i + 1}")
            time_sep = " --> "
            lines.append(f"{format_time(start, output_format)}{time_sep}{format_time(end, output_format)}")
            lines.append(f"{text}\n")

    return "\n".join(lines)


def format_time(seconds: float, output_format: str) -> str:
    """Format seconds into HH:MM:SS,mmm (SRT) or HH:MM:SS.mmm (VTT)."""
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds - int(seconds)) * 1000)
    
    sep = "," if output_format == ".srt" else "."
    return f"{h:02d}:{m:02d}:{s:02d}{sep}{ms:03d}"


def format_time_lrc(seconds: float) -> str:
    """Format seconds into LRC mm:ss.xx (centiseconds)."""
    m = int(seconds // 60)
    s = seconds % 60
    return f"{m:02d}:{s:05.2f}"
