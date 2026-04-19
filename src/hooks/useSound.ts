import { useCallback, useRef } from 'react';

type Tone = 'safe' | 'avoid' | 'tap' | 'badge';

// Tiny Web Audio synth — no external files needed, feels organic
export function useSound(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      const Ctx =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      if (Ctx) ctxRef.current = new Ctx();
    }
    return ctxRef.current;
  };

  const play = useCallback(
    (tone: Tone) => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      const notes =
        tone === 'safe'
          ? [523.25, 659.25, 783.99] // C5 E5 G5 – gentle chime
          : tone === 'avoid'
          ? [349.23, 329.63] // F4 E4 – soft downward alert
          : tone === 'badge'
          ? [523.25, 659.25, 783.99, 1046.5] // celebratory
          : [880]; // tap
      const spacing = tone === 'tap' ? 0 : 0.09;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = tone === 'avoid' ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * spacing);
        gain.gain.setValueAtTime(0, now + i * spacing);
        gain.gain.linearRampToValueAtTime(0.18, now + i * spacing + 0.02);
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          now + i * spacing + 0.55,
        );
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + i * spacing);
        osc.stop(now + i * spacing + 0.6);
      });
    },
    [enabled],
  );

  return { play };
}
