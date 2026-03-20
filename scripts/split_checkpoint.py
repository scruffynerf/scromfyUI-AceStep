import os
import sys
import torch
from safetensors.torch import load_file, save_file
import argparse

def split_checkpoint(checkpoint_path, output_dir, strip=False, list_keys=False):
    """
    Splits a consolidated ACE-Step 1.5 safetensors checkpoint into its components.
    Specifically targets the dual CLIP encoders.
    """
    if not os.path.exists(checkpoint_path):
        print(f"Error: Checkpoint not found at {checkpoint_path}")
        return

    print(f"Loading checkpoint: {checkpoint_path}...")
    try:
        tensors = load_file(checkpoint_path)
    except Exception as e:
        print(f"Error loading safetensors: {e}")
        return

    if list_keys:
        print("\n--- Key Audit (First 20 keys) ---")
        for i, key in enumerate(list(tensors.keys())[:20]):
            print(f"{i+1}: {key} - {tensors[key].shape}")
        
        # Analyze prefixes
        prefixes = set()
        for key in tensors.keys():
            parts = key.split('.')
            if len(parts) > 1:
                prefixes.add(".".join(parts[:2]))
            else:
                prefixes.add(parts[0])
        
        print("\n--- Detected Prefixes ---")
        for p in sorted(list(prefixes)):
            count = sum(1 for k in tensors.keys() if k.startswith(p))
            print(f"{p} ({count} keys)")
        return

    # Refined grouping logic based on user feedback
    groups = {
        "qwen_0.6b": [],
        "qwen_2b": [],
        "diffusion": [],
        "vae": []
    }

    print("Analyzing tensors...")
    for key in tensors.keys():
        if key.startswith("text_encoders.qwen3_06b") or key.startswith("text_encoders.qwen3_6b"):
            groups["qwen_0.6b"].append(key)
        elif key.startswith("text_encoders.qwen3_2b"):
            groups["qwen_2b"].append(key)
        elif key.startswith("model.diffusion_model"):
            groups["diffusion"].append(key)
        elif key.startswith("vae"):
            groups["vae"].append(key)
        else:
            # Check for generic qwen3 if others missing
            if key.startswith("text_encoders.qwen3_"):
                # Figure out which one it is by shape/count if needed
                # For now, just skip if not matched above
                pass

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for group_name, keys in groups.items():
        if not keys:
            print(f"No tensors found for {group_name}. Skipping.")
            continue

        output_path = os.path.join(output_dir, f"{group_name}.safetensors")
        print(f"Saving {len(keys)} tensors to {output_path}...")
        
        out_tensors = {}
        prefix_to_strip = ""
        
        # Determine prefix to strip if requested
        if group_name == "qwen_0.6b":
            if any(k.startswith("text_encoders.qwen3_06b") for k in keys):
                prefix_to_strip = "text_encoders.qwen3_06b."
            else:
                prefix_to_strip = "text_encoders.qwen3_6b."
        elif group_name == "qwen_2b":
            prefix_to_strip = "text_encoders.qwen3_2b."
        elif group_name == "diffusion":
            prefix_to_strip = "model.diffusion_model."
        elif group_name == "vae":
            # ACE-Step usually has 'vae.decoder' etc.
            if any(k.startswith("vae.") for k in keys):
                prefix_to_strip = "vae."
            else:
                prefix_to_strip = "vae"

        # NOTE: For ACE-Step dual loads, we usually NEED the prefixes to avoid key collisions.
        # But for VAE/Diffusion, they are often used in standalone loaders that expect no prefix.
        should_strip = strip
        if group_name in ["diffusion", "vae"] and strip is False:
            # Maybe auto-strip these? No, stay predictable.
            pass

        for k in keys:
            new_key = k
            if should_strip and prefix_to_strip and k.startswith(prefix_to_strip):
                new_key = k[len(prefix_to_strip):]
            out_tensors[new_key] = tensors[k]

        try:
            save_file(out_tensors, output_path)
            print(f"Successfully saved {group_name}.")
        except Exception as e:
            print(f"Error saving {group_name}: {e}")

    print("\nSplitting complete!")
    print(f"Outputs are in: {os.path.abspath(output_dir)}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Split ACE-Step 1.5 consolidated checkpoints.")
    parser.add_argument("checkpoint", type=str, help="Path to the source .safetensors file.")
    parser.add_argument("--out_dir", type=str, default="split_models", help="Directory to save pieces.")
    parser.add_argument("--strip", action="store_true", help="Strip prefixes from keys (not recommended for ACE-Step dual loads).")
    parser.add_argument("--list", action="store_true", help="Just list prefixes and keys, do not split.")

    args = parser.parse_args()
    split_checkpoint(args.checkpoint, args.out_dir, args.strip, args.list)
