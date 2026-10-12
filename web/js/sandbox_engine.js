/**
 * Mazey Shape Sandbox & Level Builder
 * Draw your own custom shape silhouette and auto-generate solvable arrow mazes!
 */

class ShapeSandboxEngine {
    constructor(canvas, onPlayCustom) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.onPlayCustom = onPlayCustom;

        this.cols = 15;
        this.rows = 15;
        this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));

        this.cellSize = 24;
        this.offsetX = 0;
        this.offsetY = 0;

        this.isPainting = false;
        this.paintMode = true; // true = draw, false = erase
        this.animFrameId = null;

        this.bindEvents();
    }

    bindEvents() {
        const getCell = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const cx = (e.clientX - rect.left) * (this.canvas.width / rect.width);
            const cy = (e.clientY - rect.top) * (this.canvas.height / rect.height);
            const gx = Math.floor((cx - this.offsetX) / this.cellSize);
            const gy = Math.floor((cy - this.offsetY) / this.cellSize);
            return { gx, gy };
        };

        this.canvas.addEventListener('pointerdown', (e) => {
            const { gx, gy } = getCell(e);
            if (gx >= 0 && gx < this.cols && gy >= 0 && gy < this.rows) {
                this.isPainting = true;
                this.paintMode = !this.grid[gy][gx];
                this.grid[gy][gx] = this.paintMode;
                if (window.soundEngine) window.soundEngine.playClick();
            }
        });

        this.canvas.addEventListener('pointermove', (e) => {
            if (!this.isPainting) return;
            const { gx, gy } = getCell(e);
            if (gx >= 0 && gx < this.cols && gy >= 0 && gy < this.rows) {
                this.grid[gy][gx] = this.paintMode;
            }
        });

        const stopPainting = () => { this.isPainting = false; };
        this.canvas.addEventListener('pointerup', stopPainting);
        this.canvas.addEventListener('pointercancel', stopPainting);
    }

    resize(containerWidth, containerHeight) {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = containerWidth * dpr;
        this.canvas.height = containerHeight * dpr;

        const pad = 24 * dpr;
        this.cellSize = Math.min((this.canvas.width - pad * 2) / this.cols, (this.canvas.height - pad * 2) / this.rows);
        this.offsetX = (this.canvas.width - this.cols * this.cellSize) / 2;
        this.offsetY = (this.canvas.height - this.rows * this.cellSize) / 2;
    }

    clear() {
        this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
        if (window.soundEngine) window.soundEngine.playClick();
    }

    fillDefaultCircle() {
        this.clear();
        const center = (this.cols - 1) / 2;
        const radius = (this.cols - 3) / 2;
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (Math.hypot(x - center, y - center) <= radius) {
                    this.grid[y][x] = true;
                }
            }
        }
    }

    generateShape() {
        const coords = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.grid[y][x]) {
                    coords.push({ x, y });
                }
            }
        }
        if (coords.length < 8) {
            alert('Please paint at least 8 cells to generate a puzzle!');
            return null;
        }

        const customShape = {
            id: 'custom_' + Date.now(),
            name: 'Custom Creation',
            icon: '🎨',
            width: this.cols,
            height: this.rows,
            grid: this.grid.map(row => row.map(c => c ? '#' : '.').join(''))
        };

        if (this.onPlayCustom) {
            this.onPlayCustom(customShape);
        }
        return customShape;
    }

    start() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        const loop = () => {
            this.render();
            this.animFrameId = requestAnimationFrame(loop);
        };
        this.animFrameId = requestAnimationFrame(loop);
    }

    stop() {
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
    }

    render() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const px = this.offsetX + x * this.cellSize;
                const py = this.offsetY + y * this.cellSize;

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
                ctx.lineWidth = 1;
                ctx.strokeRect(px, py, this.cellSize, this.cellSize);

                if (this.grid[y][x]) {
                    ctx.fillStyle = '#00E5FF';
                    ctx.shadowColor = 'rgba(0, 229, 255, 0.5)';
                    ctx.shadowBlur = 8;
                    ctx.fillRect(px + 2, py + 2, this.cellSize - 4, this.cellSize - 4);
                    ctx.shadowBlur = 0;
                } else {
                    ctx.beginPath();
                    ctx.arc(px + this.cellSize / 2, py + this.cellSize / 2, 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                    ctx.fill();
                }
            }
        }
    }
}
window.ShapeSandboxEngine = ShapeSandboxEngine;
