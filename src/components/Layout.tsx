import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { NavBar } from './NavBar';
import { MusicPlayer } from './MusicPlayer';
import { GameProvider } from '../lib/gameState';

export function Layout() {
  const { pathname } = useLocation();
  return (
    <GameProvider>
      <div className="min-h-screen bg-warm-grad">
        <NavBar />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-6xl px-4 pb-28 pt-6 md:px-6 md:pt-10"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <MusicPlayer />
        <footer className="pb-safe mx-auto max-w-6xl px-4 pb-28 text-center text-xs text-slate-500 md:pb-10">
          <p className="mx-auto max-w-xl">
            <strong>Disclaimer.</strong> GlutenWise is for educational purposes
            only and does not provide medical advice. Always consult a qualified
            healthcare provider before changing your diet or supplement routine.
          </p>
        </footer>
      </div>
    </GameProvider>
  );
}
