import os
import sys
import torch
from safetensors.torch import load_file, save_file
import argparse

def split_checkpoint(checkpoint_path, output_dir, strip_prefix=True):
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

    # Check for keys and group them
    # Common prefixes in ACE-Step 1.5 (SFT)
    # text_encoders.qwen3_06b  <- Small Qwen (Vocab ~151k, Dim 1024)
    # text_encoders.qwen3_2b   <- Large Qwen (Vocab ~217k, Dim 2048)
    
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
        elif key.startswith("vae."):
            groups["vae"].append(key)
        else:
            # Fallback for unknown / root VAE keys if any
            if key == "vae" or key.startswith("vae "):
                groups["vae"].append(key)
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
            prefix_to_strip = "vae."

        for k in keys:
            new_key = k
            if strip_prefix and prefix_to_strip and k.startswith(prefix_to_strip):
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
    parser.add_argument("--no_strip", action="store_true", help="Do not strip prefixes from keys.")

    args = parser.parse_args()
    split_checkpoint(args.checkpoint, args.out_dir, not args.no_strip)
