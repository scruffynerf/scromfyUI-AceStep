import os
import sys
from PIL import Image, ImageOps

def invert_pngs(directory):
    if not os.path.isdir(directory):
        print(f"Error: {directory} is not a directory.")
        return

    # Create an 'inverted' subdirectory to be safe
    output_dir = os.path.join(directory, "inverted")
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(directory):
        if filename.lower().endswith(".png"):
            filepath = os.path.join(directory, filename)
            try:
                with Image.open(filepath) as img:
                    # Handle different image modes
                    # Convert to RGB with black background if it has transparency
                    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                        # Create a black background
                        background = Image.new('RGB', img.size, (0, 0, 0))
                        # Paste the image using its own alpha as the mask
                        background.paste(img.convert('RGBA'), (0, 0), img.convert('RGBA'))
                        processed_img = background
                    else:
                        processed_img = img.convert('RGB')
                    
                    inverted_img = ImageOps.invert(processed_img)
                    
                    output_path = os.path.join(output_dir, filename)
                    inverted_img.save(output_path)
                    print(f"Inverted: {filename} -> {output_path}")
            except Exception as e:
                print(f"Failed to process {filename}: {e}")

if __name__ == "__main__":
    target_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    invert_pngs(target_dir)
