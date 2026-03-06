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
        
        from comfy.utils import ProgressBar
        
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
        # Pre-allocate output tensor to avoid stack copy later
        out_tensor = torch.empty_like(images)
        pbar = ProgressBar(batch_size)

        # Pre-calculate colors
        def hex_to_rgb(hex_str):
            hex_str = hex_str.lstrip('#')
            return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))
        
        try:
            high_rgb = hex_to_rgb(highlight_color)
            norm_rgb = hex_to_rgb(normal_color)
        except:
            high_rgb = (52, 211, 153)
            norm_rgb = (156, 163, 175)

        for i in range(batch_size):
            time = i / fps
            
            # Find current lyric index
            current_idx = -1
            for j, lyric in enumerate(lyrics):
                if time >= lyric["time"]:
                    current_idx = j
                else:
                    break
            
            # Convert frame to numpy (copy ensures we don't hold references to the batch)
            frame_np = (images[i].cpu().numpy() * 255).astype(np.uint8).copy()
            
            if current_idx != -1:
                # Lines to render
                start_l = max(0, current_idx - max_lines // 2)
                end_l = min(len(lyrics), start_l + max_lines)
                if end_l - start_l < max_lines:
                    start_l = max(0, end_l - max_lines)
                
                lines_to_draw = []
                for j in range(start_l, end_l):
                    lines_to_draw.append({
                        "text": lyrics[j]["text"],
                        "active": (j == current_idx),
                        "offset": j - current_idx
                    })

                if lines_to_draw:
                    center_y = int(height * y_position)
                    line_height = int(font_size * line_spacing)
                    total_h = line_height * len(lines_to_draw)
                    
                    # Box dimensions
                    box_top = max(0, center_y - total_h // 2 - 20)
                    box_bottom = min(height, center_y + total_h // 2 + 20)
                    box_left = int(width * 0.1)
                    box_right = int(width * 0.9)
                    box_w = box_right - box_left
                    box_h = box_bottom - box_top

                    if box_w > 0 and box_h > 0:
                        # 1. Blur and Dim in-place using OpenCV (Much faster and memory efficient)
                        sub_img = frame_np[box_top:box_bottom, box_left:box_right]
                        if blur_radius > 0:
                            k = blur_radius if blur_radius % 2 == 1 else blur_radius + 1
                            sub_img = cv2.GaussianBlur(sub_img, (k, k), 0)
                        
                        # Dimming (Manual alpha blend with black)
                        if background_alpha > 0:
                            sub_img = (sub_img.astype(np.float32) * (1.0 - background_alpha)).astype(np.uint8)
                        
                        frame_np[box_top:box_bottom, box_left:box_right] = sub_img

                        # 2. Render Text onto a SMALL PIL image (the size of the box)
                        text_overlay = Image.new("RGBA", (box_w, box_h), (0, 0, 0, 0))
                        draw = ImageDraw.Draw(text_overlay)
                        
                        for item in lines_to_draw:
                            f = font_bold if item["active"] else font_reg
                            c = high_rgb if item["active"] else norm_rgb
                            if item["active"]:
                                rgba_color = (*c, 255)
                            else:
                                rgba_color = (*c, 180) # Slightly transparent for normal lines

                            bbox = draw.textbbox((0, 0), item["text"], font=f)
                            tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
                            
                            tx = (box_w - tw) // 2
                            # Rel to box center
                            ty = (box_h // 2) + (item["offset"] * line_height) - th // 2
                            
                            draw.text((tx, ty), item["text"], font=f, fill=rgba_color)
                        
                        # Composite the small text overlay onto the frame
                        text_overlay_np = np.array(text_overlay)
                        text_rgb = text_overlay_np[:, :, :3]
                        text_alpha = text_overlay_np[:, :, 3:] / 255.0
                        
                        target_region = frame_np[box_top:box_bottom, box_left:box_right]
                        blended = (text_rgb * text_alpha + target_region * (1.0 - text_alpha)).astype(np.uint8)
                        frame_np[box_top:box_bottom, box_left:box_right] = blended

            # Put back into pre-allocated tensor
            out_tensor[i] = torch.from_numpy(frame_np.astype(np.float32) / 255.0)
            pbar.update(1)

        return (out_tensor,)

NODE_CLASS_MAPPINGS = {
    "ScromfyLyricsOverlay": ScromfyLyricsOverlay,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "ScromfyLyricsOverlay": "Scrolling Lyrics Overlay",
}
