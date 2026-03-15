import os
import io
import re
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM, shapes
from PIL import Image
import random

# Path setup
BASE_DIR = "."
LDR_DIR = os.path.join(BASE_DIR, "svg")
SIZE = 512

def _force_white(obj):
    """
    Recursively force all colors in a reportlab drawing to white.
    """
    if hasattr(obj, 'fillColor'):
        obj.fillColor = shapes.colors.white
    if hasattr(obj, 'strokeColor'):
        obj.strokeColor = shapes.colors.white
        
    if hasattr(obj, 'contents'):
        for sub in obj.contents:
            _force_white(sub)
    elif isinstance(obj, list):
        for sub in obj:
            _force_white(sub)

def convert_svgs():
    if not os.path.exists(LDR_DIR):
        print(f"Error: {LDR_DIR} does not exist.")
        return

    svg_files = [f for f in os.listdir(LDR_DIR) if f.endswith(".svg")]
    print(f"Found {len(svg_files)} SVG files in {LDR_DIR}")

    for filename in svg_files:
        svg_path = os.path.join(LDR_DIR, filename)
        png_path = os.path.join(LDR_DIR, filename.replace(".svg", ".png"))
        
        try:
            with open(svg_path, 'r', encoding='utf-8') as f:
                svg_data = f.read()
            
            # Scrub gradients and force any hardcoded colors to white in the SVG source if necessary
            # but _force_white handles the drawing objects directly which is more reliable.
            if "url(#" in svg_data:
                svg_data = re.sub(r'url\(#.*?\)', 'white', svg_data)
            
            drawing = svg2rlg(io.BytesIO(svg_data.encode("utf-8")))
            _force_white(drawing)

            # Scale to fit
            scale = min(SIZE / drawing.width, SIZE / drawing.height)
            drawing.scale(scale, scale)
            drawing.width *= scale
            drawing.height *= scale
            
            # Render to PNG with black background (bg=shapes.colors.black)
            # User specifically asked for "white on blackground"
            png_stream = io.BytesIO()
            renderPM.drawToFile(drawing, png_stream, fmt="PNG", bg=shapes.colors.black)
            
            img = Image.open(io.BytesIO(png_stream.getvalue())).convert("RGB")
            
            # Resize exactly to 512x512 if not already (in case aspect ratio was off)
            final_img = Image.new("RGB", (SIZE, SIZE), (0, 0, 0))
            x_off = (SIZE - img.width) // 2
            y_off = (SIZE - img.height) // 2
            final_img.paste(img, (x_off, y_off))
            
            final_img.save(png_path)
            print(f"Converted {filename} -> {os.path.basename(png_path)}")
            
        except Exception as e:
            print(f"Error converting {filename}: {e}")

if __name__ == "__main__":
    convert_svgs()
