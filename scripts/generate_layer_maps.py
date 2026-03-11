import cv2
import numpy as np
import os
from PIL import Image

def generate_layer_maps():
    # Path resolution
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    masks_dir = os.path.join(base_dir, "masks")
    output_dir = os.path.join(base_dir, "output", "layer_maps")
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created output directory: {output_dir}")

    # Palette (B, G, R)
    layer_colors = [
        (255, 100, 100), # L0: Light Blueish
        (100, 255, 100), # L1: Light Green
        (100, 100, 255), # L2: Light Red
        (255, 255, 100), # L3: Yellow
        (255, 100, 255), # L4: Magenta
        (100, 255, 255), # L5: Cyan
        (255, 255, 255), # L6+: White
    ]

    mask_files = [f for f in os.listdir(masks_dir) if f.lower().endswith(".png")]
    print(f"Found {len(mask_files)} mask images in {masks_dir}")

    for filename in mask_files:
        mask_path = os.path.join(masks_dir, filename)
        
        # Load mask
        try:
            pil_img = Image.open(mask_path).convert('L')
            f_mask = np.array(pil_img).astype(np.uint8)
        except Exception as e:
            print(f"Error loading {filename}: {e}")
            continue

        h, w = f_mask.shape
        f_contours, f_hierarchy = cv2.findContours(f_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        
        # Create colored canvas
        l_map = np.zeros((h, w, 3), dtype=np.uint8)
        
        total_layers = 0
        total_contours = len(f_contours) if f_contours else 0
        
        if f_contours and f_hierarchy is not None:
            f_hierarchy = f_hierarchy[0]
            max_depth = 0
            
            for i, cnt in enumerate(f_contours):
                # Find depth
                parent = f_hierarchy[i][3]
                depth = 0
                while parent != -1:
                    depth += 1
                    parent = f_hierarchy[parent][3]
                
                max_depth = max(max_depth, depth)
                color = layer_colors[min(depth, len(layer_colors)-1)]
                
                # Draw contour outline
                cv2.drawContours(l_map, [cnt], -1, color, 2)
                
                # Label with "L{depth}" at centroid
                M = cv2.moments(cnt)
                if M["m00"] > 0:
                    lcx, lcy = int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"])
                    txt = f"L{depth}"
                    cv2.putText(l_map, txt, (lcx+1, lcy+1), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0), 2)
                    cv2.putText(l_map, txt, (lcx, lcy), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)

            total_layers = max_depth + 1
            
            # Overlay Statistics
            stats_text = f"Contours: {total_contours} | Layers: {total_layers}"
            cv2.putText(l_map, stats_text, (20, 35), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 4) # Shadow
            cv2.putText(l_map, stats_text, (20, 35), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2) # Text

        # Save result
        output_name = f"layermap_{filename}"
        output_path = os.path.join(output_dir, output_name)
        cv2.imwrite(output_path, l_map)
        print(f"Generated: {output_name} (Layers: {total_layers}, Contours: {total_contours})")

    print("\nProcessing complete. Check output/layer_maps/ for results.")

if __name__ == "__main__":
    generate_layer_maps()
