/**
 * Mazey Main Application Controller
 * Handles UI interactions, game modes, modals, confetti particles, and state.
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const hudModeName = document.getElementById('hudModeName');
    const hudStatLabel = document.getElementById('hudStatLabel');
    const hudStatValue = document.getElementById('hudStatValue');
    const hudCombo = document.getElementById('hudCombo');

    // Controls
    const btnUndo = document.getElementById('btnUndo');
    const btnHint = document.getElementById('btnHint');
    const btnReset = document.getElementById('btnReset');
    const btnLevels = document.getElementById('btnLevels');
    const btnModes = document.getElementById('btnModes');
    const btnAudio = document.getElementById('btnAudio');
    const btnResetZoom = document.getElementById('btnResetZoom');
    const zoomLevelText = document.getElementById('zoomLevelText');

    // Modals
    const modalModes = document.getElementById('modalModes');
    const modalLevels = document.getElementById('modalLevels');
    const modalVictory = document.getElementById('modalVictory');
    const levelsGrid = document.getElementById('levelsGrid');
    const btnNextLevel = document.getElementById('btnNextLevel');
    const btnReplay = document.getElementById('btnReplay');

    // Sandbox controls container
    const sandboxControls = document.getElementById('sandboxControls');
    const btnClearSandbox = document.getElementById('btnClearSandbox');
    const btnGenerateCustom = document.getElementById('btnGenerateCustom');

    let currentMode = 'arrow';
    let currentShapeId = 'turtle';
    const shapeList = Object.keys(MAZEY_SHAPES);
    let shapeIndex = 0;

    // Confetti particles
    let confetti = [];
    const confettiCanvas = document.getElementById('confettiCanvas');
    const confCtx = confettiCanvas.getContext('2d');

    // Game Engines
    let arrowEngine = null;
    let sandboxEngine = null;
    let activeEngine = null;

    function handleResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        confettiCanvas.width = w * (window.devicePixelRatio || 1);
        confettiCanvas.height = h * (window.devicePixelRatio || 1);

        if (activeEngine && activeEngine.resize) {
            activeEngine.resize(w, h);
        }
    }
    window.addEventListener('resize', handleResize);

    // Initialise Engines
    arrowEngine = new ArrowEscapeEngine(
        canvas,
        onVictory,
        ({ remaining, moves, combo }) => {
            hudStatLabel.textContent = 'REMAINING';
            hudStatValue.textContent = remaining;
            if (combo > 1) {
                hudCombo.textContent = `${combo}x COMBO!`;
                hudCombo.style.display = 'inline-block';
            } else {
                hudCombo.style.display = 'none';
            }
        },
        (zoom) => {
            if (btnResetZoom && zoomLevelText) {
                if (zoom > 1.05 && currentMode === 'arrow') {
                    btnResetZoom.style.display = 'flex';
                    zoomLevelText.textContent = `${zoom.toFixed(1)}x`;
                } else {
                    btnResetZoom.style.display = 'none';
                }
            }
        }
    );

    sandboxEngine = new ShapeSandboxEngine(
        canvas,
        (customShape) => {
            MAZEY_SHAPES[customShape.id] = customShape;
            switchMode('arrow', customShape.id);
        }
    );

    function switchMode(mode, specificShapeId = null) {
        if (activeEngine) activeEngine.stop();
        currentMode = mode;

        // UI Adjustments
        if (btnResetZoom) btnResetZoom.style.display = 'none';
        sandboxControls.style.display = mode === 'sandbox' ? 'flex' : 'none';
        btnUndo.style.display = mode === 'arrow' ? 'inline-flex' : 'none';
        btnHint.style.display = mode === 'arrow' ? 'inline-flex' : 'none';
        btnLevels.style.display = mode === 'arrow' ? 'inline-flex' : 'none';

        if (mode === 'arrow') {
            activeEngine = arrowEngine;
            const sid = specificShapeId || currentShapeId;
            const def = MAZEY_SHAPES[sid] || MAZEY_SHAPES.turtle;
            hudModeName.textContent = def.name;
            arrowEngine.loadShape(sid);
        } else if (mode === 'sandbox') {
            activeEngine = sandboxEngine;
            hudModeName.textContent = 'Shape Builder Sandbox';
            hudStatLabel.textContent = 'TOOL';
            hudStatValue.textContent = 'DRAW';
            hudCombo.style.display = 'none';
            sandboxEngine.fillDefaultCircle();
        }

        handleResize();
        activeEngine.start();
        closeModals();
    }

    // Populate Level Select Grid
    function setupLevelSelector() {
        levelsGrid.innerHTML = '';
        shapeList.forEach((sid, idx) => {
            const shape = MAZEY_SHAPES[sid];
            const card = document.createElement('div');
            card.className = `level-card ${sid === currentShapeId ? 'active' : ''}`;
            card.innerHTML = `
                <div class="level-icon">${shape.icon}</div>
                <div class="level-title">${shape.name}</div>
            `;
            card.addEventListener('click', () => {
                currentShapeId = sid;
                shapeIndex = idx;
                switchMode('arrow', sid);
            });
            levelsGrid.appendChild(card);
        });

        // Endless Procedural Card
        const procCard = document.createElement('div');
        procCard.className = 'level-card';
        procCard.innerHTML = `
            <div class="level-icon">🎲</div>
            <div class="level-title">Endless</div>
        `;
        procCard.addEventListener('click', () => {
            const randomSid = shapeList[Math.floor(Math.random() * shapeList.length)];
            currentShapeId = randomSid;
            switchMode('arrow', randomSid);
        });
        levelsGrid.appendChild(procCard);
    }

    function onVictory() {
        showVictoryModal();
        triggerConfetti();
    }

    function showVictoryModal() {
        modalVictory.classList.add('visible');
    }

    function closeModals() {
        modalModes.classList.remove('visible');
        modalLevels.classList.remove('visible');
        modalVictory.classList.remove('visible');
    }

    // Button Listeners
    btnUndo.addEventListener('click', () => {
        if (currentMode === 'arrow') arrowEngine.undo();
    });

    btnHint.addEventListener('click', () => {
        if (currentMode === 'arrow') arrowEngine.giveHint();
    });

    btnReset.addEventListener('click', () => {
        if (currentMode === 'arrow') arrowEngine.loadShape(currentShapeId);
        else if (currentMode === 'sandbox') sandboxEngine.clear();
        if (window.soundEngine) window.soundEngine.playClick();
    });

    btnLevels.addEventListener('click', () => {
        setupLevelSelector();
        modalLevels.classList.add('visible');
        if (window.soundEngine) window.soundEngine.playClick();
    });

    btnModes.addEventListener('click', () => {
        modalModes.classList.add('visible');
        if (window.soundEngine) window.soundEngine.playClick();
    });

    btnAudio.addEventListener('click', () => {
        if (window.soundEngine) {
            const on = window.soundEngine.toggle();
            btnAudio.textContent = on ? '🔊' : '🔇';
        }
    });

    if (btnResetZoom) {
        btnResetZoom.addEventListener('click', () => {
            if (arrowEngine) arrowEngine.resetZoom();
            btnResetZoom.style.display = 'none';
            if (window.soundEngine) window.soundEngine.playClick();
        });
    }

    btnClearSandbox.addEventListener('click', () => {
        sandboxEngine.clear();
    });

    btnGenerateCustom.addEventListener('click', () => {
        sandboxEngine.generateShape();
    });

    btnNextLevel.addEventListener('click', () => {
        closeModals();
        shapeIndex = (shapeIndex + 1) % shapeList.length;
        currentShapeId = shapeList[shapeIndex];
        switchMode('arrow', currentShapeId);
    });

    btnReplay.addEventListener('click', () => {
        closeModals();
        switchMode(currentMode, currentShapeId);
    });

    // Mode Selector Items
    document.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', () => {
            const m = card.getAttribute('data-mode');
            switchMode(m);
        });
    });

    // Close Modals on backdrop click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModals();
        });
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // Confetti Cannon
    function triggerConfetti() {
        const colors = ['#00E5FF', '#14B8A6', '#FBBF24', '#F97316', '#EF4444', '#FFFFFF'];
        const w = confettiCanvas.width;
        const h = confettiCanvas.height;

        confetti = [];
        for (let i = 0; i < 90; i++) {
            confetti.push({
                x: w / 2,
                y: h * 0.45,
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.9) * 18,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.2,
                alpha: 1.0
            });
        }
    }

    function renderConfetti() {
        confCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        for (let i = confetti.length - 1; i >= 0; i--) {
            const c = confetti[i];
            c.x += c.vx;
            c.y += c.vy;
            c.vy += 0.45; // gravity
            c.rotation += c.rotSpeed;
            c.alpha -= 0.012;

            if (c.alpha <= 0) {
                confetti.splice(i, 1);
                continue;
            }

            confCtx.save();
            confCtx.translate(c.x, c.y);
            confCtx.rotate(c.rotation);
            confCtx.fillStyle = c.color;
            confCtx.globalAlpha = c.alpha;
            confCtx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
            confCtx.restore();
        }
        requestAnimationFrame(renderConfetti);
    }
    renderConfetti();

    // Android back button integration
    window.handleAndroidBack = () => {
        if (modalVictory.classList.contains('visible') ||
            modalModes.classList.contains('visible') ||
            modalLevels.classList.contains('visible')) {
            closeModals();
            return true;
        }
        if (currentMode !== 'arrow') {
            switchMode('arrow');
            return true;
        }
        return false;
    };

    // Launch initial Turtle level
    setupLevelSelector();
    switchMode('arrow', 'turtle');
});
