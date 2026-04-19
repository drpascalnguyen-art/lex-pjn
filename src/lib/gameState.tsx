import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSound } from '../hooks/useSound';

export type BadgeId =
  | 'gluten-detective'
  | 'gut-guardian'
  | 'supplement-scholar'
  | 'seven-day-warrior'
  | 'scanner-novice'
  | 'journal-keeper';

export const BADGES: Record<BadgeId, { title: string; description: string; icon: string }> = {
  'gluten-detective': {
    title: 'Gluten Detective',
    description: 'Investigated 10 ingredients in the Avoid database.',
    icon: '🔍',
  },
  'gut-guardian': {
    title: 'Gut Guardian',
    description: 'Completed every section of What Is Gluten.',
    icon: '🛡️',
  },
  'supplement-scholar': {
    title: 'Supplement Scholar',
    description: 'Read every supplement card in the protocol.',
    icon: '📚',
  },
  'seven-day-warrior': {
    title: '7-Day Warrior',
    description: 'Stayed gluten-free for 7 consecutive days.',
    icon: '🔥',
  },
  'scanner-novice': {
    title: 'Scanner Novice',
    description: 'Completed your first AI food scan.',
    icon: '📸',
  },
  'journal-keeper': {
    title: 'Journal Keeper',
    description: 'Logged 10 meals in the Meal Journal.',
    icon: '📓',
  },
};

export type MealEntry = {
  id: string;
  dateISO: string;
  name: string;
  tag: 'compliant' | 'exposure' | 'unsure';
  symptoms: {
    bloating: number;
    fatigue: number;
    brainFog: number;
    skin: number;
    joint: number;
  };
  notes?: string;
};

export type ScanRecord = {
  id: string;
  dateISO: string;
  verdict: 'SAFE' | 'CAUTION' | 'AVOID';
  summary: string;
  thumbnail?: string;
};

export type GameState = {
  userName: string;
  xp: number;
  badges: BadgeId[];
  completedLessons: string[]; // lesson ids
  readSupplements: string[]; // supplement ids
  readAvoidItems: string[]; // food ids
  meals: MealEntry[];
  scans: ScanRecord[];
  musicOn: boolean;
  soundOn: boolean;
};

const DEFAULT_STATE: GameState = {
  userName: '',
  xp: 0,
  badges: [],
  completedLessons: [],
  readSupplements: [],
  readAvoidItems: [],
  meals: [],
  scans: [],
  musicOn: false,
  soundOn: true,
};

type Ctx = {
  state: GameState;
  update: (patch: Partial<GameState>) => void;
  addXp: (amount: number, reason?: string) => void;
  grantBadge: (id: BadgeId) => void;
  completeLesson: (id: string) => void;
  markSupplementRead: (id: string) => void;
  markAvoidRead: (id: string) => void;
  addMeal: (meal: MealEntry) => void;
  removeMeal: (id: string) => void;
  addScan: (scan: ScanRecord) => void;
  setName: (name: string) => void;
  toggleMusic: () => void;
  toggleSound: () => void;
  gutHealthPct: number;
  streakDays: number;
  playChime: (tone: 'safe' | 'avoid' | 'tap' | 'badge') => void;
};

const GameCtx = createContext<Ctx | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useLocalStorage<GameState>('glutenwise:v1', DEFAULT_STATE);
  const [toast, setToast] = useState<string | null>(null);
  const { play } = useSound(state.soundOn);

  const update = useCallback(
    (patch: Partial<GameState>) => setState((s) => ({ ...s, ...patch })),
    [setState],
  );

  const addXp = useCallback(
    (amount: number, reason?: string) => {
      setState((s) => ({ ...s, xp: s.xp + amount }));
      if (reason) {
        setToast(`+${amount} XP · ${reason}`);
        setTimeout(() => setToast(null), 1800);
      }
    },
    [setState],
  );

  const grantBadge = useCallback(
    (id: BadgeId) => {
      setState((s) => {
        if (s.badges.includes(id)) return s;
        return { ...s, badges: [...s.badges, id], xp: s.xp + 50 };
      });
      play('badge');
      setToast(`🏅 Badge unlocked — ${BADGES[id].title}`);
      setTimeout(() => setToast(null), 2400);
    },
    [setState, play],
  );

  const completeLesson = useCallback(
    (id: string) => {
      setState((s) => {
        if (s.completedLessons.includes(id)) return s;
        return {
          ...s,
          completedLessons: [...s.completedLessons, id],
          xp: s.xp + 20,
        };
      });
    },
    [setState],
  );

  const markSupplementRead = useCallback(
    (id: string) => {
      setState((s) => {
        if (s.readSupplements.includes(id)) return s;
        return {
          ...s,
          readSupplements: [...s.readSupplements, id],
          xp: s.xp + 5,
        };
      });
    },
    [setState],
  );

  const markAvoidRead = useCallback(
    (id: string) => {
      setState((s) => {
        if (s.readAvoidItems.includes(id)) return s;
        return {
          ...s,
          readAvoidItems: [...s.readAvoidItems, id],
          xp: s.xp + 2,
        };
      });
    },
    [setState],
  );

  const addMeal = useCallback(
    (meal: MealEntry) => {
      setState((s) => ({
        ...s,
        meals: [meal, ...s.meals].slice(0, 400),
        xp: s.xp + 10,
      }));
    },
    [setState],
  );

  const removeMeal = useCallback(
    (id: string) => setState((s) => ({ ...s, meals: s.meals.filter((m) => m.id !== id) })),
    [setState],
  );

  const addScan = useCallback(
    (scan: ScanRecord) => {
      setState((s) => ({
        ...s,
        scans: [scan, ...s.scans].slice(0, 100),
        xp: s.xp + 15,
      }));
    },
    [setState],
  );

  const setName = useCallback((name: string) => update({ userName: name }), [update]);
  const toggleMusic = useCallback(() => update({ musicOn: !state.musicOn }), [update, state.musicOn]);
  const toggleSound = useCallback(() => update({ soundOn: !state.soundOn }), [update, state.soundOn]);

  // Gut health % — composite of reading + meals + scans
  const gutHealthPct = useMemo(() => {
    const lessonPct = Math.min(1, state.completedLessons.length / 12) * 35;
    const supPct = Math.min(1, state.readSupplements.length / 15) * 25;
    const avoidPct = Math.min(1, state.readAvoidItems.length / 15) * 15;
    const mealPct = Math.min(1, state.meals.length / 10) * 15;
    const scanPct = Math.min(1, state.scans.length / 5) * 10;
    return Math.round(lessonPct + supPct + avoidPct + mealPct + scanPct);
  }, [state]);

  // Streak = consecutive recent days with a compliant meal logged
  const streakDays = useMemo(() => {
    if (!state.meals.length) return 0;
    const byDay = new Set(
      state.meals
        .filter((m) => m.tag === 'compliant')
        .map((m) => new Date(m.dateISO).toISOString().slice(0, 10)),
    );
    let days = 0;
    for (let i = 0; i < 365; i += 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (byDay.has(key)) days += 1;
      else if (i === 0) continue; // allow today to be empty
      else break;
    }
    return days;
  }, [state.meals]);

  // Auto-grant badges
  useEffect(() => {
    if (state.readAvoidItems.length >= 10 && !state.badges.includes('gluten-detective')) {
      grantBadge('gluten-detective');
    }
    if (state.completedLessons.filter((id) => id.startsWith('whatisgluten:')).length >= 5 &&
        !state.badges.includes('gut-guardian')) {
      grantBadge('gut-guardian');
    }
    if (state.readSupplements.length >= 12 && !state.badges.includes('supplement-scholar')) {
      grantBadge('supplement-scholar');
    }
    if (streakDays >= 7 && !state.badges.includes('seven-day-warrior')) {
      grantBadge('seven-day-warrior');
    }
    if (state.scans.length >= 1 && !state.badges.includes('scanner-novice')) {
      grantBadge('scanner-novice');
    }
    if (state.meals.length >= 10 && !state.badges.includes('journal-keeper')) {
      grantBadge('journal-keeper');
    }
  }, [state, streakDays, grantBadge]);

  const value: Ctx = {
    state,
    update,
    addXp,
    grantBadge,
    completeLesson,
    markSupplementRead,
    markAvoidRead,
    addMeal,
    removeMeal,
    addScan,
    setName,
    toggleMusic,
    toggleSound,
    gutHealthPct,
    streakDays,
    playChime: play,
  };

  return (
    <GameCtx.Provider value={value}>
      {children}
      {toast && (
        <div
          className="fixed left-1/2 top-6 z-[60] -translate-x-1/2 rounded-full bg-sage-700/95 px-5 py-2 text-sm font-medium text-white shadow-soft backdrop-blur"
          role="status"
        >
          {toast}
        </div>
      )}
    </GameCtx.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameCtx);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
