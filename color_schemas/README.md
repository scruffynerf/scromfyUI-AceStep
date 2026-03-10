# Color Schema Format Guide

This directory contains `.json` files that define color gradients for the Flex Visualizer suite. These schemas are used when the `color_mode` is set to **Schema**.

## User-Addable
You can create your own schemas by adding a new `.json` file to this directory. The visualizer system will automatically detect and list them in the `color_schema` dropdown.

## JSON Structure

```json
{
    "name": "Schema Display Name",
    "stops": [
        [Position, "Hex Color", "Description"],
        [Position, "Hex Color", "Description"]
    ]
}
```

### Fields:
- **`name`**: The human-readable name of the palette.
- **`stops`**: An array of gradient stops, where each stop is an array containing:
    1. **Position** (`float`): A value between `0.0` and `1.0` representing where this color sits in the gradient.
    2. **Hex Color** (`string`): The color in hex format (e.g., `"#ff0000"`).
    3. **Description** (`string`): A comment explaining what the color represents (optional, for readability).

### Example:
```json
{
    "name": "Fire",
    "stops": [
        [0.0, "#000000", "Base Black"],
        [0.4, "#ff0000", "Low Flame Red"],
        [0.7, "#ffaa00", "Mid Heat Orange"],
        [1.0, "#ffff00", "Peak Heat Yellow"]
    ]
}
```

The visualizer will smoothly interpolate between these stops based on the audio amplitude or the drawing path.
