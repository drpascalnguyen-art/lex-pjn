import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Music4, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useGame } from '../lib/gameState';

// Royalty-free lofi / ambient stream (Pixabay).  Swap freely.
const DEFAULT_TRACK =
  'https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2790e2f.mp3?filename=lofi-chill-medium-version-159456.mp3';

export function MusicPlayer() {
  const { state, toggleMusic, toggleSound } = useGame();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.35;
    if (state.musicOn) {
      el.play().catch(() => {
        // autoplay blocked; user will tap again
      });
    } else {
      el.pause();
    }
  }, [state.musicOn]);

  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-40 sm:bottom-6">
      <audio
        ref={audioRef}
        src={DEFAULT_TRACK}
        loop
        preload="none"
        onCanPlay={() => setLoaded(true)}
        crossOrigin="anonymous"
      />
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="pointer-events-auto mb-3 w-60 rounded-2xl bg-white/80 p-4 shadow-soft backdrop-blur-xl"
          >
            <div className="mb-2 flex items-center gap-2">
              <Music4 className="h-4 w-4 text-sage-700" />
              <span className="font-display text-sm">Ambient Lofi</span>
            </div>
            <p className="mb-3 text-xs text-slate-600">
              Soft chillwave for mindful eating &amp; reading. Riley-approved.
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={toggleMusic}
                className="flex items-center gap-2 rounded-full bg-sage-500 px-3 py-1.5 text-xs font-medium text-white shadow-soft transition hover:bg-sage-700"
              >
                {state.musicOn ? (
                  <>
                    <Pause className="h-3.5 w-3.5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" /> Play
                  </>
                )}
              </button>
              <button
                onClick={toggleSound}
                title={state.soundOn ? 'Mute effects' : 'Unmute effects'}
                className="rounded-full bg-cream-100 p-2 text-slate-600 transition hover:bg-cream-200"
              >
                {state.soundOn ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </button>
            </div>
            {!loaded && state.musicOn && (
              <p className="mt-2 text-[11px] text-slate-400">Loading stream…</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setExpanded((v) => !v)}
        className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full shadow-soft transition ${
          state.musicOn
            ? 'bg-gradient-to-br from-blush-500 to-sage-500 text-white'
            : 'bg-white text-sage-700'
        }`}
        aria-label="Toggle music player"
      >
        <Music4 className={`h-5 w-5 ${state.musicOn ? 'animate-float' : ''}`} />
      </motion.button>
    </div>
  );
}
