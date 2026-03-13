import os
import io
import pyconify
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM, shapes
from PIL import Image
import numpy as np
import torch
import random

# Cache directory for icons/masks
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CACHE_DIR = os.path.join(BASE_DIR, "masks")

def ensure_cache_dir(subdir=None):
    path = CACHE_DIR
    if subdir:
        path = os.path.join(path, subdir)
    if not os.path.exists(path):
        os.makedirs(path, exist_ok=True)
    return path

def get_emoji_icon_names(collection_prefix="fluent-emoji-flat", count=25, seed=None):
    """
    Fetch a random set of icon names from an Iconify collection.
    """
    try:
        info = pyconify.collection(collection_prefix)
    except Exception as e:
        print(f"Error fetching collection {collection_prefix}: {e}")
        return []

    icon_names = []
    if 'uncategorized' in info:
        icon_names = info['uncategorized']
    elif 'icons' in info:
        icon_names = list(info['icons'].keys())
    elif 'categories' in info:
        for cat_icons in info['categories'].values():
            icon_names.extend(cat_icons)
    
    if not icon_names:
        return []

    rng = random.Random(seed)
    if len(icon_names) > count:
        return rng.sample(icon_names, count)
    else:
        # If not enough, shuffle and return all
        rng.shuffle(icon_names)
        return icon_names

def _make_drawing_bw(obj, mode="white_outline", stroke_width=0.3):
    """
    Transform a reportlab drawing for different B&W/Mask styles.
    """
    # Safe handling: if color is a string (like 'url(#...)'), reportlab might complain.
    # We overwrite them regardless if they exist.
    if hasattr(obj, 'fillColor'):
        if mode == "white_solid" or mode == "white_solid_black_outline":
             obj.fillColor = shapes.colors.white
        elif mode == "white_outline":
             obj.fillColor = shapes.colors.black

    if hasattr(obj, 'strokeColor'):
        if mode == "white_solid":
            obj.strokeColor = shapes.colors.white
        elif mode == "white_outline":
            obj.strokeColor = shapes.colors.white
            obj.strokeWidth = stroke_width
        elif mode == "white_solid_black_outline":
            obj.strokeColor = shapes.colors.black
            obj.strokeWidth = stroke_width

    if hasattr(obj, 'contents'):
        for sub in obj.contents:
            _make_drawing_bw(sub, mode=mode, stroke_width=stroke_width)

def load_icon_as_image(icon_full_name, size=512, render_mode="color", stroke_width=0.3):
    """
    Load an icon (e.g. 'twemoji:rocket') as a PIL Image.
    Uses caching to avoid repeated API calls and conversions.
    """
    if ":" not in icon_full_name:
        return Image.new("RGBA", (size, size), (0, 0, 0, 0))
        
    collection, name = icon_full_name.split(":", 1)
    safe_collection = collection.replace("/", "_")
    safe_name = name.replace("/", "_")
    
    # Suffix for cache based on mode and stroke
    mode_suffixes = {
        "color": "",
        "white_solid": "_ws",
        "white_outline": f"_wo_{stroke_width}",
        "white_solid_black_outline": f"_wb_{stroke_width}"
    }
    suffix = mode_suffixes.get(render_mode, "")
    
    set_cache_dir = ensure_cache_dir(safe_collection)
    cache_path = os.path.join(set_cache_dir, f"{safe_name}{suffix}.png")
    
    if os.path.exists(cache_path):
        try:
            return Image.open(cache_path).convert("RGBA")
        except Exception:
            pass # Fallback to re-fetching if corrupted
            
    try:
        # Fetch SVG via pyconify
        svg_data = pyconify.svg(icon_full_name)
        
        # Convert SVG to PNG via svglib
        svg_file = io.BytesIO(svg_data)
        drawing = svg2rlg(svg_file)
        
        if render_mode != "color":
            _make_drawing_bw(drawing, mode=render_mode, stroke_width=stroke_width)

        # Scale to fit requested size
        scale = min(size / drawing.width, size / drawing.height)
        drawing.scale(scale, scale)
        drawing.width *= scale
        drawing.height *= scale
        
        png_stream = io.BytesIO()
        # Always use transparent background (bg=None) to ensure alpha channel is useful for masks
        renderPM.drawToFile(drawing, png_stream, fmt="PNG", bg=None)
        
        img = Image.open(io.BytesIO(png_stream.getvalue())).convert("RGBA")
        
        # Save to cache
        img.save(cache_path)
        return img
    except Exception as e:
        print(f"Error loading icon {icon_full_name} in mode {render_mode}: {e}")
        # Return a fallback "missing" image (transparent)
        return Image.new("RGBA", (size, size), (0, 0, 0, 0))

def pil_to_tensor(pil_img):
    """
    Convert PIL Image to ComfyUI Image Tensor (B, H, W, C)
    """
    # First, convert to RGB if it has alpha, but keeping transparency info?
    # ComfyUI usually expects RGB for Image and L for Mask.
    # We'll return (Image, Mask)
    
    img_np = np.array(pil_img).astype(np.float32) / 255.0
    
    if img_np.shape[2] == 4:
        # RGBA
        image = torch.from_numpy(img_np[:, :, :3]).unsqueeze(0)
        alpha = img_np[:, :, 3]
        luminance = np.mean(img_np[:, :, :3], axis=2)
        
        # Combined mask: Alpha * Luminance
        # This ensures we get transparency AND the interior B&W detail.
        # For color emojis, luminance is < 1.0, but usually still > 0. 
        # For B&W output modes, this is exactly what we want.
        # For standard colorEmojis, alpha alone is usually best, 
        # but combined logic handles "black interior squares" correctly.
        combined_mask = alpha * luminance
        
        # If luminance is mostly low (dark icon), combined might be too dim.
        # But if the user chose a white_outline mode, luminance IS the shape.
        mask = torch.from_numpy(combined_mask).unsqueeze(0)
    else:
        # RGB - fallback to luminance
        image = torch.from_numpy(img_np).unsqueeze(0)
        mask = torch.from_numpy(np.mean(img_np, axis=2)).unsqueeze(0)
        
    return image, mask

def tensor_to_pil(tensor):
    """
    Convert ComfyUI Image Tensor (1, H, W, C) to PIL Image
    """
    if len(tensor.shape) == 4:
        tensor = tensor[0]
    
    img_np = (tensor.cpu().numpy() * 255).astype(np.uint8)
    return Image.fromarray(img_np)
