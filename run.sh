#!/usr/bin/env bash
# Mazey Quick Launch Script

set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "========================================="
echo "   🌀 MAZEY - Tactile Maze & Arrow Hub   "
echo "========================================="

if [ "$1" == "--desktop" ] || [ "$1" == "-d" ]; then
    echo "Launching Mazey Linux Desktop App..."
    cd "$DIR/Linux app"
    if [ ! -d "node_modules" ]; then
        echo "Installing desktop dependencies..."
        npm install
    fi
    npm start
else
    echo "Opening Mazey in your default web browser..."
    if command -v xdg-open > /dev/null; then
        xdg-open "$DIR/index.html"
    elif command -v open > /dev/null; then
        open "$DIR/index.html"
    else
        python3 -m http.server 8080 --directory "$DIR"
    fi
fi
