# 🌀 Mazey // The Ultimate Tactile Maze & Arrow Puzzle Hub

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Platforms](https://img.shields.io/badge/Platforms-Android%20%7C%20Linux%20%7C%20Windows%20%7C%20macOS%20%7C%20Web-blue.svg)](#supported-platforms)
[![Tech Stack](https://img.shields.io/badge/Tech-Kotlin%20%7C%20Canvas%202D%20%7C%20WebAudio%20%7C%20Electron-orange.svg)](#architecture)
[![Status](https://img.shields.io/badge/Release-v1.1.3--release-00e5ff.svg)](https://github.com/Prime3vil/Mazey/releases)

*A minimalist, tactile puzzle suite modeled after the viral "Arrows GO!" path-untangling maze, featuring handcrafted high-density silhouettes (including the iconic Turtle), procedural endless levels, and an interactive shape sandbox builder.*

<br/>

<img src="icon.png" width="180" alt="Mazey App Icon" style="border-radius: 36px; box-shadow: 0 8px 32px rgba(0,229,255,0.3);"/>

</div>

---

## 🎮 Game Overview

**Mazey** is designed as a meditative, deeply satisfying spatial reasoning game. Modeled after the viral arrow maze puzzle video, players deduce the correct dependency order to clear interlocking winding arrows from artistic silhouettes.

Mazey delivers high-density arrow untangling with fluid 60/120 FPS canvas physics, smooth touch/swipe navigation with multi-touch pinch-to-zoom, and real-time procedural WebAudio sound synthesis with zero external audio latency.

---

## ✨ Features & Game Modes

### 1. 🏹 Arrow Escape (Core Mode)
- **Topological Untangling**: Winding polyline paths weave together across dense discrete grids with up to 800+ arrows per silhouette.
- **Escape Mechanics**:
  - Tapping an arrow raycasts its exit path along its pointing direction.
  - **Unblocked**: Slithers smoothly off the board with high-fps easing, an electric cyan trail, particle bursts, and ascending pentatonic chime streaks!
  - **Blocked**: Elastic collision bounce against the obstacle, glowing vibrant coral red (`#EF4444`), lateral shake animation, and tactile haptic thud.
- **Revealed Grid**: As arrows exit, subtle ambient grid dots are unveiled on the dark AMOLED canvas.
- **10 Handcrafted & Procedural Silhouettes**:
  1. 🐢 **The Turtle** — Exact iconic silhouette from the viral puzzle video!
  2. ❤️ **Sacred Heart**
  3. 👑 **Royal Crown**
  4. 🦋 **Monarch Wing**
  5. 🐱 **Lucky Cat**
  6. 💎 **Gem Diamond**
  7. 🐠 **Ocean Koi**
  8. 💀 **Cyber Skull**
  9. ⭐ **Super Star**
  10. ♾️ **Infinity Knot**
  11. 🎲 **Procedural Endless Mode** — Infinite guaranteed-solvable puzzles!
- **Tactical Aids & Controls**:
  - **Hint**: Pulses an unblocked arrow with golden radiance.
  - **Undo**: Steps back a move with reverse slide-in animation.
  - **Zoom & Pan**: Multi-touch pinch-to-zoom and pan navigation with a dedicated **Fit-to-Screen** reset badge for navigating intricate, dense levels.

### 2. ✨ Shape Sandbox & Level Builder
- **Custom Puzzle Creator**: An interactive grid drawing tool where you can sketch any custom silhouette directly on screen.
- **Real-Time Solver**: Tapping **Generate Puzzle** converts your custom sketch into guaranteed-solvable interlocking arrow paths ready to play immediately!
- **Instant Playback**: Seamlessly transitions from drawing mode into Arrow Escape gameplay.

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
├── Mazey.apk                    # Standalone Android APK (API 34, Signed Release)
├── index.html                   # Playable web entrypoint
├── style.css                    # AMOLED dark theme & glassmorphism HUD
├── js/
│   ├── audio.js                 # Procedural WebAudio synthesizer
│   ├── shapes.js                # Silhouette masks (Turtle, Heart, Cat, etc.)
│   ├── arrow_engine.js          # Core Arrow Escape engine & solver
│   ├── sandbox_engine.js        # Custom shape builder & generator
│   └── main.js                  # Main controller, HUD & confetti cannon
├── app/                         # Android Native Client (Kotlin, API 34)
│   ├── src/main/java/           # MainActivity & AndroidBridge
│   ├── src/main/assets/www/     # Bundled game engine
│   └── src/main/res/            # Adaptive launcher icons across densities
├── Linux app/                   # Linux Desktop Client (Electron)
├── Windows app/                 # Windows Desktop Client (Electron)
├── Mac app/                     # macOS Desktop Client (Electron)
├── scripts/
│   └── process_icon.py          # Icon processor from user photo
├── releases/                    # Pre-compiled cross-platform release packages
└── run.sh                       # One-click launcher script
```

---

## 📦 Pre-Built Cross-Platform Packages

Ready-to-use binaries are available under [Releases](https://github.com/Prime3vil/Mazey/releases):

| Platform | Package File | Architecture | Format |
|---|---|---|---|
| **Android** | `Mazey.apk` | Universal | Standalone Installable APK (v1.1.3) |
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

---

## 🛠️ Building & Running from Source

### Web / Direct Browser
Double-click `index.html` or run:
```bash
./run.sh
```

### Android Release APK
```bash
./gradlew assembleRelease
```

### Desktop Apps (Electron)
```bash
cd "Linux app"    # or "Windows app" / "Mac app"
npm install
npm start
```

---

## 📄 License
MIT License. Created for prime3vil.
