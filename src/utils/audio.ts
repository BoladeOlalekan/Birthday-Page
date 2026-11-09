/**
 * Web Audio API Synthesizer
 * Provides zero-dependency, crystal-clear sound effects and ambient cinematic music.
 * Completely self-contained, no external mp3 assets that could 404 or fail CORS.
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private musicInterval: number | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : 0.6;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.ctx) {
      this.initContext();
    }
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.6;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.3);
    }

    if (!this.isMuted && !this.musicInterval) {
      this.startAmbientMusic();
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Soft pop for button interactions and micro-interactions
   */
  public playPop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  /**
   * Gentle whoosh / envelope landing chime
   */
  public playEnvelopeLand() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    // Chime chords: C5, E5, G5, B5 (Major 7th sparkle)
    const notes = [523.25, 659.25, 783.99, 987.77];
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);
      gain.gain.setValueAtTime(0, now + idx * 0.04);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.04 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.65);
    });
  }

  /**
   * Magical Portal chime on unlocking identity
   */
  public playPortalSwoosh() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    // Shimmering arpeggio
    const freqs = [329.63, 440, 554.37, 659.25, 880, 1108.73, 1318.51];
    freqs.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.001, now + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.06 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.85);
    });
  }

  /**
   * Wrong answer buzz / boing
   */
  public playWrong() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.22);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  /**
   * Celebration fan-fare for thank you and confetti
   */
  public playCelebration() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    const now = this.ctx.currentTime;
    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);

      gain.gain.setValueAtTime(0.2, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.95);
    });
  }

  /**
   * Generative warm ambient background music (dreamy synth pad chords)
   */
  private startAmbientMusic() {
    if (this.musicInterval) return;

    // Chords in F major / D minor / Bb major dreamy progression
    const chordProgressions = [
      [261.63, 329.63, 392.0, 523.25], // C major
      [220.0, 261.63, 329.63, 440.0],  // A minor
      [174.61, 220.0, 261.63, 349.23], // F major
      [196.0, 246.94, 293.66, 392.0],  // G major
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (this.isMuted || !this.ctx || !this.masterGain) return;
      const chord = chordProgressions[chordIdx % chordProgressions.length];
      chordIdx++;
      const now = this.ctx.currentTime;

      chord.forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);

        // Gentle swell
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.035, now + 1.2);
        gain.gain.linearRampToValueAtTime(0.001, now + 3.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 4.0);
      });
    };

    playChord();
    this.musicInterval = window.setInterval(playChord, 3800);
  }
}

export const sound = new SoundSystem();

