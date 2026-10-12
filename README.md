# 🌀 Mazey // The Ultimate Tactile Maze & Arrow Puzzle Hub

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Platforms](https://img.shields.io/badge/Platforms-Android%20%7C%20Linux%20%7C%20Windows%20%7C%20macOS%20%7C%20Web-blue.svg)](#supported-platforms)
[![Tech Stack](https://img.shields.io/badge/Tech-Kotlin%20%7C%20Canvas%202D%20%7C%20WebAudio%20%7C%20Electron-orange.svg)](#architecture)
[![Status](https://img.shields.io/badge/Release-v1.0.0-00e5ff.svg)](#installation--launch)

*A minimalist, tactile puzzle suite modeled after the viral "Arrows GO!" path-untangling maze, featuring shaped silhouettes (including the iconic Turtle), 3D isometric labyrinths, torchlight fog-of-war mazes, paint roller flood puzzles, and a custom shape builder.*

<br/>

<img src="icon.png" width="180" alt="Mazey App Icon" style="border-radius: 36px; box-shadow: 0 8px 32px rgba(0,229,255,0.3);"/>

</div>

---

## 🎮 Game Overview

**Mazey** is designed as a meditative, deeply satisfying spatial reasoning game. Modeled after the viral arrow maze puzzle video, players deduce the correct dependency order to clear interlocking winding arrows from artistic silhouettes.

Beyond the signature Arrow Escape mode, Mazey expands into a complete maze entertainment suite with **5 distinct game modes**, fluid 60/120 FPS canvas physics, and real-time procedural WebAudio sound synthesis with zero external audio latency.

---

## ✨ Features & Game Modes

### 1. 🏹 Arrow Escape (Core Video Mode)
- **Topological Untangling**: Winding polyline paths weave together across dense discrete grids.
- **Escape Mechanics**:
  - Tapping an arrow raycasts its exit path along its pointing direction.
  - **Unblocked**: Slithers smoothly off the board with high-fps easing, an electric cyan trail, particle bursts, and ascending pentatonic chime streaks!
  - **Blocked**: Elastic collision bounce against the obstacle, glowing vibrant coral red (`#EF4444`), lateral shake animation, and tactile haptic thud.
- **Revealed Grid**: As arrows exit, subtle ambient grid dots are unveiled on the dark AMOLED canvas.
- **10 Handcrafted & Procedural Silhouettes**:
  1. 🐢 **The Turtle** — Exact silhouette from the reference video!
  2. ❤️ **Sacred Heart**
  3. 🐱 **Lucky Cat**
  4. ⭐ **Super Star**
  5. 👑 **Royal Crown**
  6. 🐠 **Ocean Koi**
  7. 🦋 **Monarch Wing**
  8. 💀 **Cyber Skull**
  9. 💎 **Gem Diamond**
  10. ♾️ **Infinity Knot**
  11. 🎲 **Procedural Endless Mode** — Infinite guaranteed-solvable puzzles!
- **Tactical Aids**: Built-in **Hint** (pulses an unblocked arrow with golden radiance) and **Undo** (steps back with reverse slide-in).

### 2. 🏛️ 3D Isometric Labyrinth (Inspired by App Icon)
- **Art Style Grounded in the App Icon**: Tiered 2.5D isometric blocks rendered in warm coral, orange, yellow, and deep teal with clean white top ridges.
- **Physics**: Roll a glowing crystal marble through winding 3D corridors using swipe, touch drag, or arrow keys.
- **Collectibles**: Gather spinning golden energy shards and reach the cyan vortex portal.

### 3. 🔦 Torch Run (Fog of War)
- **Atmospheric Darkness**: Explore a pitch-black labyrinth with dynamic raycasted torchlight.
- **Objective**: Find the hidden Golden Key to unlock the ancient portal before your torch fuel burns out. Collect scattered fire embers to replenish your flame!

### 4. 🎨 Paint Roller (Color Flood)
- **Fluid Splatters**: Swipe to glide the roller from wall to wall, splashing vibrant colors across the corridors until 100% of the maze is painted.

### 5. ✨ Shape Sandbox & Level Builder
- **Custom Puzzle Creator**: An interactive grid drawing tool where you can sketch any custom silhouette, click **Generate Puzzle**, and immediately solve your own custom creation!

---

## 🔊 Procedural WebAudio Sound Engine

Mazey contains a custom built-in synthesizer (`js/audio.js`) that produces all game sounds procedurally with pure code:
- **Whoosh**: Frequency-swept bandpass white noise filter mimicking sliding wood/silk.
- **Blocked Bump**: Low-dampened 140Hz -> 55Hz pitch-dropped triangle thud.
- **Chimes**: Ascending C-Major pentatonic bells (C5 to E6) that pitch-shift higher with every combo streak.
- **Victory Fanfare**: Harmonized multi-voice chord progression.
- **Haptics**: Direct Android vibration integration via `AndroidBridge.vibrate(ms)`.

---

## 🏗️ Architecture

```
Mazey/
├── Mazey.apk                    # Standalone Android APK (5.3 MB)
├── index.html                   # Playable web entrypoint
├── style.css                    # AMOLED dark theme & glassmorphism HUD
├── js/
│   ├── audio.js                 # Procedural WebAudio synthesizer
│   ├── shapes.js                # Silhouette masks (Turtle, Heart, Cat, etc.)
│   ├── arrow_engine.js          # Core Arrow Escape engine & solver
│   ├── isometric_engine.js      # 3D Isometric Labyrinth engine
│   ├── torch_engine.js          # Fog of War Torch Run engine
│   ├── paint_engine.js          # Paint Roller color-flood engine
│   ├── sandbox_engine.js        # Custom shape builder & generator
│   └── main.js                  # Main controller, HUD & confetti cannon
├── app/                         # Android Native Wrapper (Kotlin, API 34)
│   ├── src/main/java/           # MainActivity & AndroidBridge
│   ├── src/main/assets/www/     # Bundled game engine
│   └── src/main/res/            # Adaptive icons across all mipmap densities
├── Linux app/                   # Linux Desktop Client (Electron)
├── Windows app/                 # Windows Desktop Client (Electron)
├── Mac app/                     # macOS Desktop Client (Electron)
├── scripts/
│   └── process_icon.py          # Icon processor from user photo
├── releases/
│   └── Mazey-v1.0.0.apk         # Release package
└── run.sh                       # One-click launcher script
```

---

## 🚀 Installation & Launch

### 1. Web / Direct Browser
Double-click `index.html` in your file browser or run:
```bash
./run.sh
```

### 2. Android Device / Emulator
Install the compiled release APK:
```bash
adb install Mazey.apk
```
Or rebuild from source:
```bash
./gradlew assembleRelease
```

### 3. Linux Desktop (Fedora, Ubuntu, Arch)
```bash
./run.sh --desktop
```
Or manually:
```bash
cd "Linux app"
npm install
npm start
```

### 4. Windows Desktop
```bash
cd "Windows app"
npm install
npm start
```

### 5. macOS Desktop
```bash
cd "Mac app"
npm install
npm start
```

---

## 📄 License
MIT License. Created for prime3vil.

---

## 📦 Pre-Built Cross-Platform Packages

Ready-to-use binaries are available under [Releases](https://github.com/Prime3vil/Mazey/releases):

| Platform | Package File | Architecture | Format |
|---|---|---|---|
| **Android** | `Mazey.apk` | Universal | Standalone Installable APK |
| **Linux (x64)** | `Mazey-Linux-x64.zip` | x86_64 | Portable Standalone Binary |
| **Windows (x64)** | `Mazey-Windows-x64.zip` | x86_64 | Portable `.zip` (`Mazey.exe`) |
| **macOS (Apple Silicon)** | `Mazey-Mac-AppleSilicon-arm64.zip` | Apple Silicon (M1–M4) | Standalone `.app` bundle |
| **macOS (Intel)** | `Mazey-Mac-Intel-x64.zip` | Intel x64 | Standalone `.app` bundle |

---

## 🖱️ GUI Installation Guide (Pre-Built Apps)

Follow the simple visual instructions below to install and launch Mazey through your operating system's graphical interface:

### 🤖 Android (`Mazey.apk`)
1. Download **`Mazey.apk`** from [Releases](https://github.com/Prime3vil/Mazey/releases) directly on your device.
2. Open your device's **Files** or **Downloads** app and tap **`Mazey.apk`**.
3. If Android displays *"For your security, your phone is not allowed to install unknown apps from this source"*:
   - Tap **Settings** in the prompt.
   - Toggle **"Allow from this source"** to **ON**.
   - Tap the back arrow.
4. Tap **Install** and wait for completion.
5. Tap **Open** to launch Mazey!

---

### 🪟 Windows (`Mazey-Windows-x64.zip`)
1. Download **`Mazey-Windows-x64.zip`** from [Releases](https://github.com/Prime3vil/Mazey/releases).
2. Locate the file in **Windows File Explorer** (in `Downloads`).
3. Right-click **`Mazey-Windows-x64.zip`** -> select **Extract All...** -> click **Extract**.
4. Open the extracted folder.
5. Double-click **`Mazey.exe`** to launch.
6. *(First Launch / SmartScreen)*: If Windows SmartScreen displays *"Windows protected your PC"*:
   - Click **"More info"**.
   - Click **"Run anyway"**.

---

### 🍎 macOS (`Mazey-Mac-AppleSilicon-arm64.zip` / `Mazey-Mac-Intel-x64.zip`)
1. Download the archive matching your Mac's processor from [Releases](https://github.com/Prime3vil/Mazey/releases):
   - **Apple Silicon (M1–M4)**: `Mazey-Mac-AppleSilicon-arm64.zip`
   - **Intel x64**: `Mazey-Mac-Intel-x64.zip`
2. In **Finder**, double-click the `.zip` file to extract.
3. Drag **`Mazey.app`** into your **Applications** folder (`/Applications`).
4. Launch **`Mazey`** from Applications, Launchpad, or Spotlight.
5. *(Gatekeeper Notice)*: If macOS reports developer unverified:
   - Right-click (or Control-click) `Mazey.app` in Finder -> choose **Open** -> click **Open**.

---

### 🐧 Linux Desktop (`Mazey-Linux-x64.zip`)
1. Download **`Mazey-Linux-x64.zip`** from [Releases](https://github.com/Prime3vil/Mazey/releases).
2. Open your desktop file manager (**Dolphin** or **Files/Nautilus**) and right-click -> **Extract Here**.
3. Open the extracted folder.
4. Right-click the **`Mazey`** binary -> **Properties** -> **Permissions** -> check **"Allow executing file as program"** (or **"Is executable"**).
5. Double-click **`Mazey`** to play!

---

## 💻 CLI Installation & Terminal Launch Guide

### 🤖 Android (via ADB)
```bash
adb install -r "Mazey.apk"
```

### 🐧 Linux Terminal
```bash
unzip "Mazey-Linux-x64.zip" -d "Mazey"
chmod +x "Mazey/Mazey-linux-x64/Mazey"
"./Mazey/Mazey-linux-x64/Mazey"
```

### 🪟 Windows (PowerShell)
```powershell
Expand-Archive -Path ".\Mazey-Windows-x64.zip" -DestinationPath ".\Mazey"
& ".\Mazey\Mazey-win32-x64\Mazey.exe"
```

### 🍎 macOS (Terminal)
```bash
unzip "Mazey-Mac-AppleSilicon-arm64.zip" -d /Applications/
xattr -cr "/Applications/Mazey.app"
open "/Applications/Mazey.app"
```

