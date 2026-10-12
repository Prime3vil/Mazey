/**
 * Mazey Audio Engine - Procedural WebAudio Synthesizer
 * Zero external audio file dependencies, instant zero-latency playback.
 */
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.initOnFirstInteraction = this.initOnFirstInteraction.bind(this);
        window.addEventListener('pointerdown', this.initOnFirstInteraction, { once: true });
        window.addEventListener('keydown', this.initOnFirstInteraction, { once: true });
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    initOnFirstInteraction() {
        this.init();
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    /**
     * Tactile UI button click
     */
    playClick() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {}
    }

    /**
     * Arrow escape success sound - single consistent crisp swoosh and chime
     */
    playSwoosh() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;

            // Filtered noise swoosh (single consistent frequency sweep)
            const bufferSize = Math.floor(this.ctx.sampleRate * 0.16);
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(800, now);
            filter.frequency.exponentialRampToValueAtTime(2200, now + 0.14);
            filter.Q.value = 2.5;

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.14, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            noise.start(now);
            noise.stop(now + 0.17);

            // Accompanying single consistent harmonic chime
            this.playChime();
        } catch (e) {}
    }

    /**
     * Blocked arrow bump (low elastic thud)
     */
    playBlocked() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(55, now + 0.14);

            gain.gain.setValueAtTime(0.28, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.15);
        } catch (e) {}
    }

    /**
     * Single resonant bell chime for success (fixed frequency, no ascending notes)
     */
    playChime() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const freq = 880.00; // A5 - crisp, pleasant bell note

            const osc = this.ctx.createOscillator();
            const oscHarmonic = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            oscHarmonic.type = 'triangle';
            oscHarmonic.frequency.setValueAtTime(freq * 2.0, now);

            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

            osc.connect(gain);
            oscHarmonic.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            oscHarmonic.start(now);
            osc.stop(now + 0.40);
            oscHarmonic.stop(now + 0.40);
        } catch (e) {}
    }

    /**
     * Victory sound - single resonant chord played simultaneously
     */
    playVictory() {
        if (!this.enabled || !this.ctx) return;
        try {
            const chordNotes = [523.25, 659.25, 783.99, 1046.50]; // C Major
            const now = this.ctx.currentTime;
            chordNotes.forEach((freq) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.001, now);
                gain.gain.exponentialRampToValueAtTime(0.16, now + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now);
                osc.stop(now + 0.90);
            });
        } catch (e) {}
    }

    /**
     * Soft pop for collecting gems or paint fill
     */
    playPop() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(900, now);
            osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);

            gain.gain.setValueAtTime(0.16, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.09);
        } catch (e) {}
    }
}

window.soundEngine = new SoundEngine();
