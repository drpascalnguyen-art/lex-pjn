import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpenText,
  Camera,
  GraduationCap,
  NotebookPen,
  Pill,
  Salad,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { SectionHero } from '../components/SectionHero';
import { DAILY_TIPS } from '../data/tips';
import { useGame } from '../lib/gameState';

const HERO_IMG =
  'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1400&q=70';

const TILES = [
  { to: '/what-is-gluten', label: 'What Is Gluten?', icon: BookOpenText, tint: 'from-blush-200 to-blush-100' },
  { to: '/avoid', label: 'What to Avoid', icon: ShieldAlert, tint: 'from-red-200/80 to-red-100/60' },
  { to: '/eat', label: 'What to Eat', icon: Salad, tint: 'from-sage-200 to-sage-100' },
  { to: '/scanner', label: 'Food Scanner', icon: Camera, tint: 'from-sky-200 to-sky-100' },
  { to: '/supplements', label: 'Protocol', icon: Pill, tint: 'from-blush-200 to-cream-200' },
  { to: '/journal', label: 'Meal Journal', icon: NotebookPen, tint: 'from-cream-200 to-blush-100' },
  { to: '/school', label: 'Gut School', icon: GraduationCap, tint: 'from-sky-200 to-sage-100' },
];

export function Home() {
  const { state, setName, gutHealthPct, streakDays } = useGame();
  const [tip, setTip] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTip((i) => (i + 1) % DAILY_TIPS.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <SectionHero
        image={HERO_IMG}
        eyebrow="Welcome to GlutenWise"
        title={
          state.userName
            ? `Hey ${state.userName}, you're healing. 🌿`
            : 'You can heal — deliciously.'
        }
        subtitle="A warm companion for anyone newly diagnosed with celiac disease or gluten intolerance. Education, tools, and a few chime-worthy wins along the way."
      >
        <NameCard name={state.userName} setName={setName} />
      </SectionHero>

      <div className="grid gap-5 md:grid-cols-3">
        <GutHealthCard pct={gutHealthPct} xp={state.xp} streak={streakDays} badgeCount={state.badges.length} />
        <TipCarousel index={tip} />
      </div>

      <h2 className="mb-4 mt-10 font-display text-2xl md:text-3xl">
        Explore your toolkit
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {TILES.map(({ to, label, icon: Icon, tint }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <Link
              to={to}
              className={`lift flex h-32 flex-col justify-between rounded-2xl bg-gradient-to-br ${tint} p-4 shadow-soft`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sage-700">
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-display text-lg leading-tight">{label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function NameCard({ name, setName }: { name: string; setName: (n: string) => void }) {
  const [value, setValue] = useState(name);
  const [editing, setEditing] = useState(!name);
  return (
    <div className="glass mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 text-slate-700">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-blush-500" />
        {editing ? (
          <input
            autoFocus
            placeholder="Your name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        ) : (
          <span className="text-sm">
            Welcome back, <span className="font-semibold">{name || 'friend'}</span>.
          </span>
        )}
      </div>
      <button
        onClick={() => {
          if (editing) setName(value.trim());
          setEditing((v) => !v);
        }}
        className="rounded-full bg-sage-500 px-3 py-1 text-xs font-medium text-white shadow-soft hover:bg-sage-700"
      >
        {editing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
}

function GutHealthCard({ pct, xp, streak, badgeCount }: { pct: number; xp: number; streak: number; badgeCount: number }) {
  const circumference = 2 * Math.PI * 42;
  const dash = (pct / 100) * circumference;
  return (
    <div className="glass rounded-3xl p-6 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-sage-700">Gut Health Journey</p>
        <span className="pill bg-sage-100 text-sage-700">{xp} XP</span>
      </div>
      <div className="flex items-center gap-5">
        <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#DCFCE7" strokeWidth="10" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${dash} ${circumference}` }}
            transition={{ duration: 1 }}
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="text-sm">
          <div className="font-display text-4xl text-sage-700">{pct}%</div>
          <p className="text-slate-600">complete</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
            <span className="pill bg-blush-100 text-blush-500">🔥 {streak}d streak</span>
            <span className="pill bg-sky-100 text-sky-500">🏅 {badgeCount} badges</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TipCarousel({ index }: { index: number }) {
  const tip = DAILY_TIPS[index];
  return (
    <div className="glass rounded-3xl p-6 shadow-soft md:col-span-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-blush-500">Daily nudge</p>
        <div className="flex gap-1">
          {DAILY_TIPS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition ${
                i === index ? 'bg-sage-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="mt-4 flex items-start gap-4"
        >
          <span className="text-4xl">{tip.emoji}</span>
          <div>
            <h3 className="font-display text-xl md:text-2xl">{tip.title}</h3>
            <p className="mt-1 text-slate-600">{tip.body}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
