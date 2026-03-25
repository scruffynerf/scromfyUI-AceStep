<!-- markdownlint-disable MD024 -->
# Radio & Playback Nodes

The Radio suite provides persistent GUI audio players within the ComfyUI workspace, enabling instant playback and retro visualizers without needing to repeatedly save to disk or open external applications.

---

## 1. AceStepWebAmpRadio

*File: `nodes/audio_player_webamp_node.py`*

A fully functional, in-browser port of Winamp 2.9 (powered by WebAmp) directly embedded as a ComfyUI node. It natively supports `.wsz` skin injection from the `webamp_skins/` directory and plays queued `AUDIO` outputs seamlessly.

### Inputs

- **`audio`** *(Required, AUDIO)*.

### Options

- **`skin_name`**: Dropdown populated by `.wsz` files in `webamp_skins/`.
- **`visualizer_preset`**: Load `.json` presets for the Butterchurn visualizer (Milkdrop).

---

## 2. RadioPlayer

*File: `nodes/audio_player_radio_node.py`*

A lightweight, minimal HTML5 audio player widget. Useful for quick A/B testing or when WebAmp is unnecessarily heavy for the workflow.

### Inputs

- **`audio`** *(Required, AUDIO)*.

### Options

- **`volume`**: Default playback volume.
- **`autoplay`**: If `True`, the audio starts as soon as generation finishes.
