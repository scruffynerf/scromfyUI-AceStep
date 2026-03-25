<!-- markdownlint-disable MD024 -->
# LoRA Nodes

LoRAs (Low-Rank Adaptations) allow fine-tuning the base ACE-Step model on specific acoustic textures or voice types without needing full checkpoint training.

---

## 1. AceStepLoRALoader

*File: `nodes/lora_loader_node.py`*

The standard loader for ACE-Step 1.5 LoRAs. It patches the existing `MODEL` object directly. Highly compatible with ComfyUI's native logic for LoRA injection.

### Inputs

- **`model`** *(Required, MODEL)*: The CheckpointLoader output.
- **`lora_name`**: Dropdown of `.safetensors` files located in `models/loras/`.
- **`strength_model`**: Scaling factor for the LoRA application (usually -1.0 to 1.0).

### Outputs

- **`model`** (`MODEL`): The patched pipeline model.

---

## 2. Scromfy AceStep Lora Stack

*File: `nodes/lora_loader_node.py`*

Advanced loader that parses chained strings or multiple inputs for stacking multiple LoRA adapters on top of each other effectively without breaking graph structures.

### Inputs

- **`model`** *(Required, MODEL)*
- **Strings/Chains** *(Required, STRING)*: Formatted strings declaring the targets and weights.

### Outputs

- **`model`** (`MODEL`)
