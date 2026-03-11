# Visualizer Fonts

This directory contains `.ttf` and `.otf` fonts used by the Lyric Overlay and other visualizer nodes.

### Adding Your Own Fonts
You can add your own fonts to this directory:
1.  Copy any `.ttf` or `.otf` file into this folder.
2.  Refresh the ComfyUI page (or restart) to see the new font in the **Lyric Settings** node dropdown.

### Included Fonts
- **Noto Sans CJK** (Pan-Regional): Consolidated TrueType Collection (.ttc) providing broad Unicode coverage for Japanese, Chinese (SC/TC), and Korean. This is the primary fallback for international lyrics.
    - *License*: SIL Open Font License (OFL)
- **Noto Sans** (Regular & Bold): Bundled for basic Latin/Greek/Cyrillic support.
    - *License*: SIL Open Font License (OFL)
- **Roboto** (Regular & Bold): The default clean sans-serif font.
    - *License*: Apache License, 2.0

### Unsupported Languages?
Google's **Noto** project aims to support all languages in the world. If you need support for a script not covered by the included fonts (e.g., Arabic, Thai, Devanagari, etc.):
1.  Visit [Google Noto Fonts](https://fonts.google.com/noto).
2.  Search for and download the `.ttf` or `.otf` file for your required language.
3.  Copy the file into this `fonts/` directory.
4.  The visualizer will automatically detect and include it in the selection dropdown.
