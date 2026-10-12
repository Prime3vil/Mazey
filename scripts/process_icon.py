#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

SRC_IMG = "/home/prime3vil/.gemini/antigravity/brain/6d6e5a87-cc3d-49de-87b8-0b7bc5dff814/.user_uploaded/media_1791725749239.jpg"
BASE_DIR = "/home/prime3vil/Documents/Antigravity/App Dev/Mazey"

def main():
    if not os.path.exists(SRC_IMG):
        print(f"Error: Source image not found at {SRC_IMG}")
        return

    img = Image.open(SRC_IMG).convert("RGBA")
    w, h = img.size
    
    # Center crop to square
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    square_img = img.crop((left, top, left + min_dim, top + min_dim))
    
    # Resize master to 1024x1024 with high-quality Lanczos
    master_icon = square_img.resize((1024, 1024), Image.Resampling.LANCZOS)
    
    # Create round icon mask
    circle_mask = Image.new("L", (1024, 1024), 0)
    draw_circle = ImageDraw.Draw(circle_mask)
    draw_circle.ellipse((0, 0, 1024, 1024), fill=255)
    
    round_master = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    round_master.paste(master_icon, (0, 0), circle_mask)
    
    # Rounded rectangle for desktop icon
    rounded_rect_mask = Image.new("L", (1024, 1024), 0)
    draw_rr = ImageDraw.Draw(rounded_rect_mask)
    draw_rr.rounded_rectangle((0, 0, 1024, 1024), radius=220, fill=255)
    
    desktop_master = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    desktop_master.paste(master_icon, (0, 0), rounded_rect_mask)
    
    # Save standard desktop and web icons
    desktop_master.resize((512, 512), Image.Resampling.LANCZOS).save(os.path.join(BASE_DIR, "icon.png"))
    desktop_master.resize((512, 512), Image.Resampling.LANCZOS).save(os.path.join(BASE_DIR, "Linux app", "icon.png"))
    desktop_master.resize((512, 512), Image.Resampling.LANCZOS).save(os.path.join(BASE_DIR, "Windows app", "icon.png"))
    desktop_master.resize((512, 512), Image.Resampling.LANCZOS).save(os.path.join(BASE_DIR, "Mac app", "icon.png"))
    desktop_master.resize((512, 512), Image.Resampling.LANCZOS).save(os.path.join(BASE_DIR, "app/src/main/assets/www", "icon.png"))
    desktop_master.resize((64, 64), Image.Resampling.LANCZOS).save(os.path.join(BASE_DIR, "app/src/main/assets/www", "favicon.png"))
    desktop_master.resize((64, 64), Image.Resampling.LANCZOS).save(os.path.join(BASE_DIR, "favicon.png"))

    # Generate ICO format for Windows
    ico_img = desktop_master.resize((256, 256), Image.Resampling.LANCZOS)
    ico_img.save(os.path.join(BASE_DIR, "icon.ico"), format="ICO", sizes=[(16,16), (32,32), (48,48), (64,64), (128,128), (256,256)])
    ico_img.save(os.path.join(BASE_DIR, "Windows app", "icon.ico"), format="ICO", sizes=[(16,16), (32,32), (48,48), (64,64), (128,128), (256,256)])

    # Generate ICNS format for macOS
    icns_img = desktop_master.resize((512, 512), Image.Resampling.LANCZOS)
    icns_img.save(os.path.join(BASE_DIR, "icon.icns"), format="ICNS")
    icns_img.save(os.path.join(BASE_DIR, "Mac app", "icon.icns"), format="ICNS")

    # Android mipmap densities
    densities = {
        "mipmap-mdpi": 48,
        "mipmap-hdpi": 72,
        "mipmap-xhdpi": 96,
        "mipmap-xxhdpi": 144,
        "mipmap-xxxhdpi": 192
    }
    
    res_dir = os.path.join(BASE_DIR, "app/src/main/res")
    for folder, size in densities.items():
        out_folder = os.path.join(res_dir, folder)
        os.makedirs(out_folder, exist_ok=True)
        
        # Square launcher icon
        master_icon.resize((size, size), Image.Resampling.LANCZOS).save(os.path.join(out_folder, "ic_launcher.png"))
        # Round launcher icon
        round_master.resize((size, size), Image.Resampling.LANCZOS).save(os.path.join(out_folder, "ic_launcher_round.png"))
        
    print("Successfully generated all Mazey app icons (PNG, ICO, ICNS, Android Mipmaps)!")

if __name__ == "__main__":
    main()
