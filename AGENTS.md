# Global Agent Rules & Directives

## 1. Mainframe & Top Secret Network Shares (Zero-Root-Dump & All-Versions Isolation Policy)
* **Never Dump Files into Root**: When copying, deploying, or staging software suites, APKs, desktop zips, assets, or scripts to **Mainframe** (`/home/prime3vil/Mainframe`) or **Top Secret** (`/home/prime3vil/Top Secret`), you MUST NEVER place files directly in the root directory.
* **No Dual Dumps**: Never copy to the root AND to the subfolder. All files must exist EXCLUSIVELY inside `/home/prime3vil/Mainframe/<AppName>/`.
* **Include All Versions & Packages**: When organizing an application folder, place ALL release artifacts—including all historical versions (`v1.0.0`, `v1.0.1`...), the unversioned install APK (`<AppName>.apk`), and desktop packages (`.zip`)—inside the application subfolder. Never leave older versions stranded in root while only moving the newest one.
* **Root Verification**: `find /home/prime3vil/Mainframe -maxdepth 1 -type f` must return 0 files. Run `python3 /home/prime3vil/.gemini/config/skills/mainframe-deployment-sync/scripts/sync_app.py --sweep` if loose files are ever detected.
* **Mobile Experience (Samsung Galaxy S26 Ultra)**: This share is accessed via SMB by prime3vil. Keeping each application cleanly grouped inside its own folder prevents cluttered lists in Samsung My Files.

## 2. Communications Policy (Strict User Whitelist)
* **Authorized Contact**: You are authorized to contact **prime3vil** by any means necessary and available (Reticulum LXMF over LoRa, Signal, Email, local desktop notifications).
* **Zero Third-Party Contact**: You are strictly forbidden from contacting, alerting, sending data to, or notifying any third party or external service.

## 3. System Resource & Memory Management (8 GB RAM Budget)
* **No Permanent Model Locking**: System RAM is strictly limited to 8 GB. Local LLMs (Ollama / Llama 3.2) must never be locked permanently into RAM (`keep_alive: -1` is prohibited).
* **Automatic Unload**: Maintain a 15-minute inactivity timeout (`keep_alive: "15m"`) so RAM is freed for system tasks when idle.

## 4. Reticulum LoRa Mesh RF Guidelines
* **TX Power Limit**: Both Jarvis Base Station and Prime3vil Mobile Node must maintain a strict 17 dBm TX power ceiling.
* **Antenna Port**: Always route LoRa antennas to the Front IPEX port on Heltec WiFi LoRa 32 V4 hardware.
