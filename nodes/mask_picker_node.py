import os
import torch
import numpy as np
from PIL import Image
import glob

class ScromfyMaskPickerNode:
    @classmethod
    def INPUT_TYPES(cls):
        masks_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "masks")
        mask_files = []
        if os.path.exists(masks_dir):
            pattern = os.path.join(masks_dir, "**", "*.png")
            full_paths = glob.glob(pattern, recursive=True)
            # Find both .png and .jpg if needed, but the user mentioned masks are usually .png
            mask_files = sorted([os.path.relpath(p, masks_dir) for p in full_paths])
            
        if not mask_files:
            mask_files = ["none"]

        return {
            "required": {
                "mask_name": (mask_files,),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "pick"
    CATEGORY = "Scromfy/Ace-Step/Misc"

    def pick(self, mask_name):
        if mask_name == "none":
            return (torch.zeros((1, 64, 64, 3)), torch.zeros((1, 64, 64)))

        masks_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "masks")
        mask_path = os.path.join(masks_dir, mask_name)
        
        if not os.path.exists(mask_path):
            # Fallback
            img = torch.zeros((1, 512, 512, 3))
            mask = torch.zeros((1, 512, 512))
            return (img, mask)
            
        pil_img = Image.open(mask_path).convert("RGBA")
        img_np = np.array(pil_img).astype(np.float32) / 255.0
        
        # Image output (RGB)
        image = torch.from_numpy(img_np[:, :, :3]).unsqueeze(0)
        # Mask output (Alpha channel)
        mask = torch.from_numpy(img_np[:, :, 3]).unsqueeze(0)
        
        return (image, mask)

NODE_CLASS_MAPPINGS = {
    "ScromfyMaskPicker": ScromfyMaskPickerNode,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "ScromfyMaskPicker": "Mask Picker (Scromfy)",
}
