import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHero } from '../components/SectionHero';
import { EAT_CATEGORY_LABEL, EAT_ITEMS, type EatCategory } from '../data/eat';

const HERO =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=70';

const CATS: (EatCategory | 'ALL')[] = [
  'ALL',
  'PROTEIN',
  'VEGETABLE',
  'FRUIT',
  'GRAIN',
  'FAT',
  'FERMENTED',
  'HEALING',
];

export function WhatToEat() {
  const [cat, setCat] = useState<(typeof CATS)[number]>('ALL');
  const [lowFodmap, setLowFodmap] = useState(false);

  const list = useMemo(() => {
    return EAT_ITEMS.filter(
      (f) => (cat === 'ALL' || f.category === cat) && (!lowFodmap || f.lowFodmap),
    );
  }, [cat, lowFodmap]);

  return (
    <div>
      <SectionHero
        image={HERO}
        eyebrow="Your new pantry"
        title="What to eat — a garden of abundance"
        subtitle="Every food here is naturally gluten-free and friendly to a healing gut."
      />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              cat === c
                ? 'bg-sage-700 text-white shadow-soft'
                : 'bg-white/70 text-slate-600 hover:bg-white'
            }`}
          >
            {c === 'ALL' ? 'All' : EAT_CATEGORY_LABEL[c]}
          </button>
        ))}
        <label className="ml-auto flex cursor-pointer items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs">
          <input
            type="checkbox"
            className="accent-sage-500"
            checked={lowFodmap}
            onChange={(e) => setLowFodmap(e.target.checked)}
          />
          Low-FODMAP only
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((food, i) => (
          <motion.article
            key={food.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.03 * i }}
            className="lift overflow-hidden rounded-3xl bg-white/85 shadow-soft"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={food.image}
                alt={food.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-sage-700">
                Gut {food.gutScore}/10
              </span>
              {food.lowFodmap && (
                <span className="absolute right-3 top-3 rounded-full bg-sky-500/90 px-3 py-1 text-[11px] font-medium text-white">
                  Low-FODMAP
                </span>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl">{food.name}</h3>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="pill bg-sage-100 text-sage-700">
                  GI: {food.glycemic}
                </span>
                <span className="pill bg-blush-100 text-blush-500">
                  Protein {food.protein}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{food.fact}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
