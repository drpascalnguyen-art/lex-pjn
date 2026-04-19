import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { SectionHero } from '../components/SectionHero';
import { AVOID_ITEMS, CATEGORY_META, type AvoidCategory } from '../data/avoid';
import { useGame } from '../lib/gameState';

const HERO =
  'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1400&q=70';

const FILTERS: (AvoidCategory | 'ALL')[] = [
  'ALL',
  'DEFINITELY_AVOID',
  'HIDDEN_SOURCE',
  'INFLAMMATORY',
  'FODMAP',
  'USUALLY_SAFE',
  'CERTIFIED_GF',
];

export function WhatToAvoid() {
  const { markAvoidRead, state, playChime } = useGame();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('ALL');

  const filtered = useMemo(() => {
    return AVOID_ITEMS.filter((item) => {
      const matchesCat = filter === 'ALL' || item.category === filter;
      const matchesQ =
        !query ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.note.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQ;
    });
  }, [filter, query]);

  return (
    <div>
      <SectionHero
        image={HERO}
        eyebrow="Ingredient library"
        title="What to avoid (and what's secretly fine)"
        subtitle="A searchable, colour-coded database of foods, additives and cross-contamination traps."
      />

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wheat, soy sauce, carrageenan…"
            className="w-full rounded-full border border-white bg-white/80 py-3 pl-11 pr-4 text-sm shadow-soft outline-none focus:border-sage-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                filter === f
                  ? 'bg-sage-700 text-white shadow-soft'
                  : 'bg-white/70 text-slate-600 hover:bg-white'
              }`}
            >
              {f === 'ALL' ? 'All' : CATEGORY_META[f].label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl bg-white/70 p-6 text-center text-slate-500 shadow-soft">
          No matches. Try another search.
        </p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => {
            const meta = CATEGORY_META[item.category];
            const readAlready = state.readAvoidItems.includes(item.id);
            const severe =
              item.category === 'DEFINITELY_AVOID' ||
              item.category === 'HIDDEN_SOURCE' ||
              item.category === 'INFLAMMATORY';
            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.02 * i, duration: 0.3 }}
                onClick={() => {
                  if (!readAlready) markAvoidRead(item.id);
                  playChime(severe ? 'avoid' : 'safe');
                }}
                className="lift flex h-full flex-col rounded-2xl bg-white/85 p-5 text-left shadow-soft"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className={`pill ${meta.color}`}>
                    {meta.emoji} {meta.label}
                  </span>
                  {readAlready && (
                    <span className="pill bg-sage-100 text-sage-700">✓ learned</span>
                  )}
                </div>
                <h3 className="font-display text-lg">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.note}</p>
              </motion.button>
            );
          })}
        </div>
      )}

      <section className="mt-10 rounded-3xl bg-gradient-to-br from-blush-100 to-sky-100 p-6 shadow-soft md:p-8">
        <h2 className="font-display text-2xl">Cross-contamination 101</h2>
        <p className="mt-2 max-w-2xl text-slate-700">
          Even a crumb-sized exposure (20 mg of gluten) can trigger celiac damage for 2–6
          weeks. Treat these household items with care:
        </p>
        <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm text-slate-700 md:grid-cols-2">
          <li>Buy a dedicated GF toaster — crumbs never fully leave the coils.</li>
          <li>Replace wooden cutting boards and scratched non-stick pans.</li>
          <li>Label butter, jam and nut butters "GF only" to avoid double-dipping.</li>
          <li>Ask restaurants about shared deep fryers before ordering fries.</li>
          <li>Rinse produce bins and bulk-bin scoops that may touch wheat flour.</li>
          <li>Bring your own utensils / straws to shared events when in doubt.</li>
        </ul>
      </section>
    </div>
  );
}
