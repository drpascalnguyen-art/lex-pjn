import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { SectionHero } from '../components/SectionHero';
import { GUT_SCHOOL_LESSONS } from '../data/lessons';
import { BADGES, useGame } from '../lib/gameState';

const HERO =
  'https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?auto=format&fit=crop&w=1400&q=70';

export function GutSchool() {
  const { state, completeLesson } = useGame();
  const [index, setIndex] = useState(0);
  const lesson = GUT_SCHOOL_LESSONS[index];
  const complete = state.completedLessons.includes(lesson.id);

  const next = () => {
    if (!complete) completeLesson(lesson.id);
    setIndex((i) => (i + 1) % GUT_SCHOOL_LESSONS.length);
  };
  const prev = () =>
    setIndex((i) => (i - 1 + GUT_SCHOOL_LESSONS.length) % GUT_SCHOOL_LESSONS.length);

  return (
    <div>
      <SectionHero
        image={HERO}
        eyebrow="Gut School"
        title="Short lessons, big shifts"
        subtitle="Swipeable cards on the science of gut health, testing, and the North-American wheat story."
      />

      <div className="relative mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.article
            key={lesson.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-white/90 p-6 shadow-soft md:p-10"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Lesson {index + 1} of {GUT_SCHOOL_LESSONS.length}
              </span>
              {complete && (
                <span className="pill bg-sage-100 text-sage-700">
                  <Check className="h-3 w-3" /> complete
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-4xl">{lesson.emoji}</span>
              <h2 className="font-display text-2xl md:text-3xl">{lesson.title}</h2>
            </div>
            <p className="mt-3 rounded-xl bg-cream-100 px-4 py-3 text-sm italic text-slate-700">
              TL;DR — {lesson.tldr}
            </p>
            <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-slate-700">
              {lesson.body}
            </p>
          </motion.article>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={prev}
            className="flex items-center gap-1 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-soft"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>
          <div className="flex gap-1.5">
            {GUT_SCHOOL_LESSONS.map((_, i) => (
              <span
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 cursor-pointer rounded-full transition-all ${
                  i === index ? 'w-8 bg-sage-500' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="flex items-center gap-1 rounded-full bg-sage-500 px-4 py-2 text-sm font-medium text-white shadow-soft"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">Your badges</h2>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Six badges to collect as you progress through GlutenWise. Each one is earned, not given.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(BADGES) as (keyof typeof BADGES)[]).map((id) => {
            const earned = state.badges.includes(id);
            const b = BADGES[id];
            return (
              <div
                key={id}
                className={`lift rounded-2xl p-5 shadow-soft transition ${
                  earned
                    ? 'bg-gradient-to-br from-sage-200 to-blush-200'
                    : 'bg-white/60 opacity-70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-3xl ${earned ? '' : 'grayscale'}`}>{b.icon}</span>
                  <h3 className="font-display text-lg">{b.title}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">{b.description}</p>
                <p className="mt-3 text-xs font-medium text-slate-500">
                  {earned ? '✓ Earned' : 'Locked'}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
