import torch
import numpy as np
import os
import re
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import cv2
from typing import List, Dict

class ScromfyLyricsOverlay:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "lrc_text": ("STRING", {"multiline": True, "default": ""}),
                "fps": ("FLOAT", {"default": 24.0, "min": 1.0, "max": 120.0}),
                "font_size": ("INT", {"default": 24, "min": 10, "max": 200}),
                "highlight_color": ("STRING", {"default": "#34d399"}), # Vibrant green
                "normal_color": ("STRING", {"default": "#9ca3af"}),    # Dimmed gray
                "background_alpha": ("FLOAT", {"default": 0.4, "min": 0.0, "max": 1.0, "step": 0.01}),
                "blur_radius": ("INT", {"default": 10, "min": 0, "max": 50}),
                "y_position": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "max_lines": ("INT", {"default": 5, "min": 1, "max": 20}),
                "line_spacing": ("FLOAT", {"default": 1.5, "min": 1.0, "max": 3.0, "step": 0.1}),
            },
            "optional": {
                "font_path": ("STRING", {"default": ""}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "overlay_lyrics"
    CATEGORY = "Scromfy/Ace-Step/lyrics"

    def parse_lrc(self, lrc_text: str) -> List[Dict]:
        lyrics = []
        # Support both [mm:ss.xx] and [mm:ss:xx]
        pattern = r"\[(\d+):(\d+\.?\d*)\](.*)"
        
        for line in lrc_text.splitlines():
            line = line.strip()
            if not line: continue
            
            match = re.search(pattern, line)
            if match:
                minutes = int(match.group(1))
                seconds = float(match.group(2))
                text = match.group(3).strip()
                timestamp = minutes * 60 + seconds
                lyrics.append({"time": timestamp, "text": text})
        
        # Sort by time
        lyrics.sort(key=lambda x: x["time"])
        return lyrics

    def parse_srt(self, srt_text: str) -> List[Dict]:
        lyrics = []
        blocks = re.split(r'\n\s*\n', srt_text.strip())
        for block in blocks:
            lines = block.splitlines()
            if len(lines) >= 3:
                time_match = re.search(r'(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})', lines[1])
                if time_match:
                    start_str = time_match.group(1).replace(',', '.')
                    h, m, s = start_str.split(':')
                    timestamp = int(h) * 3600 + int(m) * 60 + float(s)
                    text = " ".join(lines[2:]).strip()
                    lyrics.append({"time": timestamp, "text": text})
        lyrics.sort(key=lambda x: x["time"])
        return lyrics

    def overlay_lyrics(self, images, lrc_text, fps, font_size, highlight_color, normal_color, 
                       background_alpha, blur_radius, y_position, max_lines, line_spacing, font_path=""):
        
        # Parse lyrics (detect mode)
        if "-->" in lrc_text:
            lyrics = self.parse_srt(lrc_text)
        else:
            lyrics = self.parse_lrc(lrc_text)
            
        if not lyrics:
            return (images,)

        # Load font
        try:
            if font_path and os.path.exists(font_path):
                font_reg = ImageFont.truetype(font_path, font_size)
                font_bold = ImageFont.truetype(font_path, int(font_size * 1.3))
            else:
                # Try to find Roboto in the workspace fonts we saw
                roboto_reg = "/Users/scohn/code/AceStep15-gradio2comfy/referencecode/scrolling-lyrics-music-visualization/ref/fonts/Roboto/Roboto-Regular.ttf"
                roboto_bold = "/Users/scohn/code/AceStep15-gradio2comfy/referencecode/scrolling-lyrics-music-visualization/ref/fonts/Roboto/Roboto-Bold.ttf"
                if os.path.exists(roboto_reg):
                    font_reg = ImageFont.truetype(roboto_reg, font_size)
                    font_bold = ImageFont.truetype(roboto_bold, int(font_size * 1.3))
                else:
                    font_reg = ImageFont.load_default()
                    font_bold = font_reg
        except Exception:
            font_reg = ImageFont.load_default()
            font_bold = font_reg

        batch_size, height, width, channels = images.shape
        out_images = []

        for i in range(batch_size):
            time = i / fps
            
            # Find current lyric index
            current_idx = -1
            for j, lyric in enumerate(lyrics):
                if time >= lyric["time"]:
                    current_idx = j
                else:
                    break
            
            # Convert frame to numpy for cv2 and PIL
            frame_np = (images[i].cpu().numpy() * 255).astype(np.uint8)
            
            # Prepare overlay
            overlay_pil = Image.new("RGBA", (width, height), (0, 0, 0, 0))
            draw = ImageDraw.Draw(overlay_pil)
            
            # Determine vertical orientation
            center_y = int(height * y_position)
            
            # Lines to render
            lines_to_draw = []
            if current_idx != -1:
                # Get window of lyrics
                start_l = max(0, current_idx - max_lines // 2)
                end_l = min(len(lyrics), start_l + max_lines)
                
                # Adjust start if we hit the end
                if end_l - start_l < max_lines:
                    start_l = max(0, end_l - max_lines)
                
                for j in range(start_l, end_l):
                    is_active = (j == current_idx)
                    lines_to_draw.append({
                        "text": lyrics[j]["text"],
                        "active": is_active,
                        "offset": j - current_idx
                    })

            if lines_to_draw:
                # Calculate dimensions for background box
                line_height = int(font_size * line_spacing)
                total_h = line_height * len(lines_to_draw)
                box_top = center_y - total_h // 2 - 10
                box_bottom = center_y + total_h // 2 + 10
                box_left = int(width * 0.1)
                box_right = int(width * 0.9)
                
                # Apply blur to background
                if blur_radius > 0:
                    box_region = frame_np[max(0, box_top):min(height, box_bottom), 
                                          max(0, box_left):min(width, box_right)]
                    if box_region.size > 0:
                        box_region = cv2.GaussianBlur(box_region, (0, 0), blur_radius)
                        frame_np[max(0, box_top):min(height, box_bottom), 
                                 max(0, box_left):min(width, box_right)] = box_region

                # Draw semi-transparent box
                draw.rectangle([box_left, box_top, box_right, box_bottom], 
                               fill=(0, 0, 0, int(255 * background_alpha)))
                
                # Draw lines
                for item in lines_to_draw:
                    txt = item["text"]
                    f = font_bold if item["active"] else font_reg
                    c = highlight_color if item["active"] else normal_color
                    
                    # Get text size
                    left, top, right, bottom = draw.textbbox((0, 0), txt, font=f)
                    tw, th = right - left, bottom - top
                    
                    tx = (width - tw) // 2
                    # Position relative to center_y
                    ty = center_y + (item["offset"] * line_height) - th // 2
                    
                    draw.text((tx, ty), txt, font=f, fill=c)

            # Composite
            base_pil = Image.fromarray(frame_np).convert("RGBA")
            base_pil.alpha_composite(overlay_pil)
            
            # Back to tensor
            frame_out = np.array(base_pil.convert("RGB")).astype(np.float32) / 255.0
            out_images.append(torch.from_numpy(frame_out))

        return (torch.stack(out_images),)

NODE_CLASS_MAPPINGS = {
    "ScromfyLyricsOverlay": ScromfyLyricsOverlay,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "ScromfyLyricsOverlay": "Scrolling Lyrics Overlay",
}
