#!/usr/bin/env python3
import os
import shutil
import subprocess
import json
import zipfile
import tarfile
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAP_SRC = os.path.join(BASE_DIR, "app", "src", "main", "assets", "www")
ICON_PNG = os.path.join(BASE_DIR, "icon.png")
ICON_ICO = os.path.join(BASE_DIR, "icon.ico")
ICON_ICNS = os.path.join(BASE_DIR, "icon.icns")
RELEASES_DIR = os.path.join(BASE_DIR, "releases")
MAINFRAME_DIR = "/home/prime3vil/Mainframe"

HOME = os.path.expanduser("~")
LOCAL_SHARE = os.path.join(HOME, ".local", "share")
LOCAL_BIN = os.path.join(HOME, ".local", "bin")
APPLICATIONS_DIR = os.path.join(LOCAL_SHARE, "applications")
ICONS_BASE = os.path.join(LOCAL_SHARE, "icons", "hicolor")
TARGET_APP_DIR = os.path.join(LOCAL_SHARE, "mazey")

PKG_JSON = {
    "name": "mazey",
    "productName": "Mazey",
    "version": "1.1.3",
    "description": "Mazey - The Ultimate Tactile Maze & Arrow Puzzle Hub",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    },
    "author": "Mazey Dev Team",
    "license": "MIT"
}

PRELOAD_JS = """const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopBridge', {
  platform: '__PLATFORM__',
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close')
});
"""

def get_main_js(icon_file):
    return f"""const {{ app, BrowserWindow, ipcMain }} = require('electron');
const path = require('path');

app.commandLine.appendSwitch('ozone-platform-hint', 'auto');
app.setName('Mazey');

let mainWindow = null;

function createWindow() {{
  mainWindow = new BrowserWindow({{
    width: 1200,
    height: 850,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#070A12',
    icon: path.join(__dirname, '{icon_file}'),
    webPreferences: {{
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false
    }}
  }});

  // Strict security lockdown: prevent unauthorized navigation or popups
  mainWindow.webContents.on('will-navigate', (event) => {{
    event.preventDefault();
  }});
  mainWindow.webContents.setWindowOpenHandler(() => {{
    return {{ action: 'deny' }};
  }});

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  mainWindow.on('closed', () => {{
    mainWindow = null;
  }});
}}

ipcMain.on('window-minimize', () => {{ if (mainWindow) mainWindow.minimize(); }});
ipcMain.on('window-maximize', () => {{
  if (!mainWindow) return;
  if (mainWindow.isMaximized()) mainWindow.unmaximize();
  else mainWindow.maximize();
}});
ipcMain.on('window-close', () => {{ if (mainWindow) mainWindow.close(); }});

app.whenReady().then(() => {{
  createWindow();

  app.on('activate', () => {{
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  }});
}});

app.on('window-all-closed', () => {{
  if (process.platform !== 'darwin') app.quit();
}});
"""

def copy_tree(src, dst):
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)

def zip_folder(folder_path, output_zip_path):
    print(f"Creating zip archive: {output_zip_path} ...")
    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, os.path.dirname(folder_path))
                zipf.write(full_path, rel_path)
    print(f"✓ Zip ready: {output_zip_path} ({os.path.getsize(output_zip_path)} bytes)")

def build_linux():
    print("\n==========================================")
    print("1. BUILDING LINUX DESKTOP APP (x64)")
    print("==========================================")
    app_dir = os.path.join(BASE_DIR, "Linux app")
    os.makedirs(app_dir, exist_ok=True)
    
    copy_tree(MAP_SRC, os.path.join(app_dir, "src"))
    shutil.copyfile(ICON_PNG, os.path.join(app_dir, "icon.png"))
    
    with open(os.path.join(app_dir, "package.json"), "w") as f:
        json.dump(PKG_JSON, f, indent=2)
    with open(os.path.join(app_dir, "preload.js"), "w") as f:
        f.write(PRELOAD_JS.replace("__PLATFORM__", "linux"))
    with open(os.path.join(app_dir, "main.js"), "w") as f:
        f.write(get_main_js("icon.png"))

    cmd = [
        "npx", "--yes", "electron-packager", ".", "Mazey",
        "--platform=linux", "--arch=x64",
        "--electron-version=34.3.0",
        "--out=dist",
        "--overwrite", "--prune=true", "--asar"
    ]
    subprocess.check_call(cmd, cwd=app_dir)
    
    dist_dir = os.path.join(app_dir, "dist")
    out_app_folder = os.path.join(dist_dir, "Mazey-linux-x64")
    zip_path = os.path.join(dist_dir, "Mazey-Linux-x64.zip")
    zip_folder(out_app_folder, zip_path)
    
    shutil.copyfile(zip_path, os.path.join(RELEASES_DIR, "Mazey-Linux-x64.zip"))
    print("✓ Linux App Build Complete & Synced to releases/!")
    return out_app_folder

def build_windows():
    print("\n==========================================")
    print("2. BUILDING WINDOWS DESKTOP APP (x64)")
    print("==========================================")
    app_dir = os.path.join(BASE_DIR, "Windows app")
    os.makedirs(app_dir, exist_ok=True)
    
    copy_tree(MAP_SRC, os.path.join(app_dir, "src"))
    shutil.copyfile(ICON_PNG, os.path.join(app_dir, "icon.png"))
    shutil.copyfile(ICON_ICO, os.path.join(app_dir, "icon.ico"))
    
    with open(os.path.join(app_dir, "package.json"), "w") as f:
        json.dump(PKG_JSON, f, indent=2)
    with open(os.path.join(app_dir, "preload.js"), "w") as f:
        f.write(PRELOAD_JS.replace("__PLATFORM__", "win32"))
    with open(os.path.join(app_dir, "main.js"), "w") as f:
        f.write(get_main_js("icon.ico"))

    cmd = [
        "npx", "--yes", "electron-packager", ".", "Mazey",
        "--platform=win32", "--arch=x64",
        "--electron-version=34.3.0",
        "--out=dist",
        "--overwrite", "--prune=true", "--asar"
    ]
    env = os.environ.copy()
    env["WINE_BINARY"] = "/usr/bin/true"
    subprocess.check_call(cmd, cwd=app_dir, env=env)
    
    dist_dir = os.path.join(app_dir, "dist")
    out_app_folder = os.path.join(dist_dir, "Mazey-win32-x64")
    shutil.copyfile(ICON_ICO, os.path.join(out_app_folder, "icon.ico"))
    win_zip = os.path.join(dist_dir, "Mazey-Windows-x64.zip")
    zip_folder(out_app_folder, win_zip)
    
    shutil.copyfile(win_zip, os.path.join(RELEASES_DIR, "Mazey-Windows-x64.zip"))
    print("✓ Windows App Build Complete & Synced to releases/!")

def build_mac():
    print("\n==========================================")
    print("3. BUILDING MAC DESKTOP APPS (Apple Silicon & Intel)")
    print("==========================================")
    app_dir = os.path.join(BASE_DIR, "Mac app")
    os.makedirs(app_dir, exist_ok=True)
    
    copy_tree(MAP_SRC, os.path.join(app_dir, "src"))
    shutil.copyfile(ICON_PNG, os.path.join(app_dir, "icon.png"))
    shutil.copyfile(ICON_ICNS, os.path.join(app_dir, "icon.icns"))
    
    with open(os.path.join(app_dir, "package.json"), "w") as f:
        json.dump(PKG_JSON, f, indent=2)
    with open(os.path.join(app_dir, "preload.js"), "w") as f:
        f.write(PRELOAD_JS.replace("__PLATFORM__", "darwin"))
    with open(os.path.join(app_dir, "main.js"), "w") as f:
        f.write(get_main_js("icon.icns"))

    cmd = [
        "npx", "--yes", "electron-packager", ".", "Mazey",
        "--platform=darwin", "--arch=x64,arm64",
        "--electron-version=34.3.0",
        "--out=dist", "--icon=icon.icns",
        "--overwrite", "--prune=true", "--asar"
    ]
    subprocess.check_call(cmd, cwd=app_dir)
    
    dist_dir = os.path.join(app_dir, "dist")
    arm_folder = os.path.join(dist_dir, "Mazey-darwin-arm64")
    x64_folder = os.path.join(dist_dir, "Mazey-darwin-x64")
    
    if os.path.exists(arm_folder):
        arm_zip = os.path.join(dist_dir, "Mazey-Mac-AppleSilicon-arm64.zip")
        zip_folder(arm_folder, arm_zip)
        shutil.copyfile(arm_zip, os.path.join(RELEASES_DIR, "Mazey-Mac-AppleSilicon-arm64.zip"))
    if os.path.exists(x64_folder):
        intel_zip = os.path.join(dist_dir, "Mazey-Mac-Intel-x64.zip")
        zip_folder(x64_folder, intel_zip)
        shutil.copyfile(intel_zip, os.path.join(RELEASES_DIR, "Mazey-Mac-Intel-x64.zip"))
    print("✓ Mac App Builds Complete & Synced to releases/!")

def install_native_fedora(built_linux_folder):
    print("\n==========================================")
    print("4. UPDATING NATIVE FEDORA APP INSTALLATION")
    print("==========================================")
    os.makedirs(TARGET_APP_DIR, exist_ok=True)
    if os.path.exists(TARGET_APP_DIR):
        shutil.rmtree(TARGET_APP_DIR)
    shutil.copytree(built_linux_folder, TARGET_APP_DIR)
    os.chmod(os.path.join(TARGET_APP_DIR, "Mazey"), 0o755)
    
    os.makedirs(LOCAL_BIN, exist_ok=True)
    bin_launcher = os.path.join(LOCAL_BIN, "mazey")
    with open(bin_launcher, "w") as f:
        f.write("#!/usr/bin/env bash\n")
        f.write('exec "$HOME/.local/share/mazey/Mazey" "$@"\n')
    os.chmod(bin_launcher, 0o755)
    
    master_img = Image.open(ICON_PNG).convert("RGBA")
    sizes = [16, 32, 48, 64, 128, 256, 512]
    for sz in sizes:
        icon_dir = os.path.join(ICONS_BASE, f"{sz}x{sz}", "apps")
        os.makedirs(icon_dir, exist_ok=True)
        master_img.resize((sz, sz), Image.Resampling.LANCZOS).save(os.path.join(icon_dir, "mazey.png"))
    master_img.resize((256, 256), Image.Resampling.LANCZOS).save(os.path.join(LOCAL_SHARE, "icons", "mazey.png"))
    
    os.makedirs(APPLICATIONS_DIR, exist_ok=True)
    desktop_file = os.path.join(APPLICATIONS_DIR, "mazey.desktop")
    with open(desktop_file, "w") as f:
        f.write("""[Desktop Entry]
Version=1.0
Type=Application
Name=Mazey
GenericName=Tactile Maze & Arrow Puzzle Hub
Comment=Untangle interlocking arrows, navigate 3D isometric labyrinths, and explore atmospheric mazes
Exec=/home/prime3vil/.local/bin/mazey %U
Icon=mazey
Terminal=false
Categories=Game;LogicGame;Puzzle;
StartupWMClass=Mazey
Keywords=maze;puzzle;arrow;labyrinth;game;casual;logic;turtle;
""")
    os.chmod(desktop_file, 0o755)
    
    try:
        subprocess.run(["update-desktop-database", APPLICATIONS_DIR], check=False)
        subprocess.run(["gtk-update-icon-cache", "-f", "-t", os.path.join(LOCAL_SHARE, "icons", "hicolor")], check=False)
    except Exception:
        pass
    print("✓ Fedora native desktop integration refreshed!")

def sync_mainframe():
    print("\n==========================================")
    print("5. SYNCING COMPLETE SOFTWARE SUITE TO MAINFRAME")
    print("==========================================")
    app_target = os.path.join(MAINFRAME_DIR, "Mazey")
    os.makedirs(app_target, exist_ok=True)
    if os.path.exists(app_target):
        for item in os.listdir(RELEASES_DIR):
            src_f = os.path.join(RELEASES_DIR, item)
            dst_f = os.path.join(app_target, item)
            if os.path.isfile(src_f):
                shutil.copyfile(src_f, dst_f)
                print(f"✓ Synced to Mainframe/Mazey: {item}")
        apk_src = os.path.join(BASE_DIR, "Mazey.apk")
        if os.path.exists(apk_src):
            shutil.copyfile(apk_src, os.path.join(app_target, "Mazey.apk"))
            print("✓ Synced unversioned APK to Mainframe/Mazey/Mazey.apk")

def main():
    os.makedirs(RELEASES_DIR, exist_ok=True)
    
    # Sync root web files
    copy_tree(MAP_SRC, os.path.join(BASE_DIR, "web"))
    shutil.copyfile(os.path.join(MAP_SRC, "index.html"), os.path.join(BASE_DIR, "index.html"))
    shutil.copyfile(os.path.join(MAP_SRC, "style.css"), os.path.join(BASE_DIR, "style.css"))
    copy_tree(os.path.join(MAP_SRC, "js"), os.path.join(BASE_DIR, "js"))
    
    linux_folder = build_linux()
    build_windows()
    build_mac()
    install_native_fedora(linux_folder)
    sync_mainframe()
    
    print("\n🎉 COMPLETE MAZEY SOFTWARE SUITE BUILT, SECURED & DISTRIBUTED!")

if __name__ == "__main__":
    main()
