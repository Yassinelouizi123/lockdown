/* Synthesized sound effects (Web Audio) + optional read-aloud voice (speechSynthesis). No audio files. */
import confettiLib from 'canvas-confetti';

let ctx = null, soundOn = true;
const ac = () => {
  if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; } }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
};
function tone(f, d = .12, type = 'sine', v = .12, delay = 0, slide = 0) {
  if (!soundOn) return;
  const c = ac(); if (!c) return;
  const t0 = c.currentTime + delay, o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t0);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, f + slide), t0 + d);
  g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(v, t0 + .015); g.gain.exponentialRampToValueAtTime(.0001, t0 + d);
  o.connect(g).connect(c.destination); o.start(t0); o.stop(t0 + d + .03);
}
export const Sfx = {
  setOn: v => { soundOn = v; },
  tap: () => tone(520, .05, 'triangle', .08),
  tick: () => tone(1000, .025, 'square', .03),
  ok: () => { tone(660, .1, 'sine', .14); tone(990, .18, 'sine', .14, .09); },
  bad: () => tone(200, .28, 'sawtooth', .1, 0, -110),
  alarm: () => { for (let i = 0; i < 3; i++) { tone(880, .12, 'square', .07, i * .2); tone(620, .12, 'square', .07, i * .2 + .1); } },
  win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .2, 'triangle', .13, i * .09)),
  lose: () => [392, 330, 262].forEach((f, i) => tone(f, .22, 'triangle', .12, i * .13))
};

let voiceOn = false;
const VMAP = { fr: 'fr-FR', en: 'en-US', ar: 'ar-SA' };
const clean = s => String(s).replace(/<[^>]+>/g, '').replace(/[\u{1F000}-\u{1FFFF}☀-➿️]/gu, '').replace(/[«»“”]/g, '');
export const Voice = {
  setOn: v => { voiceOn = v; if (!v && 'speechSynthesis' in window) speechSynthesis.cancel(); },
  say(text, lang, force) {
    if ((!voiceOn && !force) || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean(text)); u.lang = VMAP[lang];
    const v = speechSynthesis.getVoices().find(x => x.lang.toLowerCase().startsWith(u.lang.slice(0, 2)));
    if (v) u.voice = v; speechSynthesis.speak(u);
  },
  stop() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }
};

export function confetti() {
  const base = { colors: ['#c8ff00', '#6d8bff', '#ff5d73', '#34d399', '#fbbf24'], zIndex: 100 };
  confettiLib({ ...base, particleCount: 90, spread: 80, origin: { y: .55 } });
  setTimeout(() => confettiLib({ ...base, particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: .7 } }), 200);
  setTimeout(() => confettiLib({ ...base, particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: .7 } }), 200);
}
