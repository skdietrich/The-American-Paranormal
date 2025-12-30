/**
 * THE AMERICAN PARANORMAL | UI FX ENGINE
 * Generates sci-fi interface sounds using Web Audio API.
 * No external MP3s required.
 */

const AudioEngine = {
  ctx: null,

  init: function() {
    // Initialize context on first user interaction to bypass browser autoplay blocks
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  playHover: function() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // High tech "blip"
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, t);
    osc.frequency.exponentialRampToValueAtTime(4000, t + 0.05);

    gain.gain.setValueAtTime(0.02, t); // Very quiet
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  },

  playClick: function() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Mechanical "Thud/Chirp"
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.15);

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }
};

// AUTO-INITIALIZE
// Finds all buttons and links, attaches sound events automatically.
document.addEventListener('DOMContentLoaded', () => {
  
  const interactables = document.querySelectorAll('button, a, input[type="range"], select');

  interactables.forEach(el => {
    // Add Click Sound
    el.addEventListener('mousedown', () => AudioEngine.playClick());
    
    // Add Hover Sound (Desktop only)
    el.addEventListener('mouseenter', () => AudioEngine.playHover());
  });

  // Init audio context on first click anywhere (fix for Safari/Chrome autoplay policy)
  document.addEventListener('click', () => AudioEngine.init(), { once: true });
});
