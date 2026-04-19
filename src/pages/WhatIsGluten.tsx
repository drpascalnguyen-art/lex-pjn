import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionHero } from '../components/SectionHero';
import { WHAT_IS_GLUTEN_SECTIONS } from '../data/lessons';
import { useGame } from '../lib/gameState';

const HERO =
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=70';

export function WhatIsGluten() {
  const { state, completeLesson } = useGame();
  const done = state.completedLessons.filter((id) => id.startsWith('whatisgluten:')).length;

  return (
    <div>
      <SectionHero
        image={HERO}
        eyebrow="Gluten 101"
        title="What is gluten, and why does it matter?"
        subtitle="A five-chapter primer written warmly — flip each card to reveal the science."
      >
        <div className="mt-4 flex items-center gap-3 text-sm text-slate-700">
          <span>Progress</span>
          <div className="flex-1 overflow-hidden rounded-full bg-white/70">
            <motion.div
              className="h-2 bg-gradient-to-r from-sage-500 to-blush-500"
              initial={{ width: 0 }}
              animate={{ width: `${(done / WHAT_IS_GLUTEN_SECTIONS.length) * 100}%` }}
              transition={{ duration: 0.7 }}
            />
          </div>
          <span className="font-medium">
            {done}/{WHAT_IS_GLUTEN_SECTIONS.length}
          </span>
        </div>
      </SectionHero>

      <div className="grid gap-5 md:grid-cols-2">
        {WHAT_IS_GLUTEN_SECTIONS.map((s, i) => (
          <FlipCard
            key={s.id}
            index={i}
            data={s}
            completed={state.completedLessons.includes(s.id)}
            onReveal={() => completeLesson(s.id)}
          />
        ))}
      </div>

      <VilliAnimation />
    </div>
  );
}

function FlipCard({
  index,
  data,
  completed,
  onReveal,
}: {
  index: number;
  data: { id: string; emoji: string; title: string; back: string };
  completed: boolean;
  onReveal: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.05 * index, duration: 0.5 }}
      className="[perspective:1200px]"
    >
      <button
        onClick={() => {
          setFlipped((v) => !v);
          if (!completed) onReveal();
        }}
        className="group relative block h-56 w-full cursor-pointer select-text text-left"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          {/* FRONT */}
          <div className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-cream-100 to-blush-100 p-6 shadow-soft [backface-visibility:hidden]">
            <span className="text-4xl">{data.emoji}</span>
            <div>
              <h3 className="font-display text-2xl">{data.title}</h3>
              <p className="mt-1 text-sm text-slate-600">Tap to reveal →</p>
            </div>
            {completed && (
              <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-sage-500 text-white">
                <Check className="h-4 w-4" />
              </span>
            )}
          </div>
          {/* BACK */}
          <div className="absolute inset-0 flex items-center rounded-3xl bg-sage-700 p-6 text-white shadow-soft [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-sm leading-relaxed">{data.back}</p>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

function VilliAnimation() {
  return (
    <section className="mt-12 rounded-3xl bg-white/70 p-6 shadow-soft md:p-10">
      <h2 className="font-display text-2xl md:text-3xl">Your villi — before & after gluten</h2>
      <p className="mt-2 max-w-2xl text-slate-600">
        The lush "shag carpet" of your small intestine absorbs nutrients. Under a gluten attack
        in a sensitive gut, it flattens to something closer to linoleum — which is why nutrient
        deficiencies are so common before diagnosis.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {[
          { label: 'Healthy villi', className: 'villi-healthy', color: 'bg-sage-500', sub: 'Tall, dense, absorbent.' },
          { label: 'Damaged villi', className: 'villi-damaged', color: 'bg-blush-500', sub: 'Flattened, inflamed, malabsorbing.' },
        ].map((g) => (
          <div key={g.label} className="rounded-2xl bg-cream-100 p-4">
            <p className="mb-2 text-sm font-medium text-slate-700">{g.label}</p>
            <div className={`flex h-20 items-end gap-1 ${g.className}`}>
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className={`block h-16 w-2 origin-bottom rounded-t-full ${g.color}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">{g.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
