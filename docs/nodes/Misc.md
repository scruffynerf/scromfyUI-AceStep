# Misc Nodes

A collection of system-level configs and helper tools for fetching external random data.

---

## 1. WikipediaRandomNode
*File: `nodes/wikipedia_node.py`*

Pulls random page content from Wikipedia. Excellent tool for feeding "Prompt Freeform" or LLM API nodes unpredictable subject matters and random structural concepts.

### Options
- **`language`**: Country code string (`en`).
- **`sentences`**: Hard limit to avoid wall-of-text.

### Outputs
- **`text`** (`STRING`)

---

## 2. ScromfyEmojiSpinner
*File: `nodes/emoji_spinner_node.py`*

Interacts with the Iconify API repository to fetch specific Unicode SVGs by keyword, parse them into binary geometry, and output them directly as `MASK` objects. Used extensively by the Flex Visualizer contour generator.

### Outputs
- **`MASK`**

---

## 3. ScromfyMaskPicker
*File: `nodes/mask_picker_node.py`*

Recursive mask directory browser allowing point-and-click selection of local `.png` masks inside the `/masks` directory.

### Outputs
- **`MASK`**
