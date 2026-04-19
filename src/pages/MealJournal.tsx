import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Flame, Trash2 } from 'lucide-react';
import { SectionHero } from '../components/SectionHero';
import { useGame, type MealEntry } from '../lib/gameState';

const HERO =
  'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&w=1400&q=70';

type SymKey = keyof MealEntry['symptoms'];
const SYMPTOMS: { key: SymKey; label: string; emoji: string }[] = [
  { key: 'bloating', label: 'Bloating', emoji: '🎈' },
  { key: 'fatigue', label: 'Fatigue', emoji: '😴' },
  { key: 'brainFog', label: 'Brain fog', emoji: '🌫️' },
  { key: 'skin', label: 'Skin', emoji: '🌺' },
  { key: 'joint', label: 'Joint', emoji: '🦴' },
];

export function MealJournal() {
  const { state, addMeal, removeMeal, streakDays } = useGame();
  const [draft, setDraft] = useState<Omit<MealEntry, 'id' | 'dateISO'>>({
    name: '',
    tag: 'compliant',
    symptoms: { bloating: 0, fatigue: 0, brainFog: 0, skin: 0, joint: 0 },
    notes: '',
  });

  const weeklySummary = useMemo(() => {
    const weekAgo = Date.now() - 7 * 864e5;
    const recent = state.meals.filter((m) => new Date(m.dateISO).getTime() > weekAgo);
    const compliant = recent.filter((m) => m.tag === 'compliant').length;
    const exposure = recent.filter((m) => m.tag === 'exposure').length;
    const unsure = recent.filter((m) => m.tag === 'unsure').length;
    return { total: recent.length, compliant, exposure, unsure };
  }, [state.meals]);

  const submit = () => {
    if (!draft.name.trim()) return;
    addMeal({
      ...draft,
      id: crypto.randomUUID(),
      dateISO: new Date().toISOString(),
    });
    setDraft({
      name: '',
      tag: 'compliant',
      symptoms: { bloating: 0, fatigue: 0, brainFog: 0, skin: 0, joint: 0 },
      notes: '',
    });
  };

  const exportCsv = () => {
    const headers = [
      'Date',
      'Meal',
      'Tag',
      'Bloating',
      'Fatigue',
      'BrainFog',
      'Skin',
      'Joint',
      'Notes',
    ];
    const rows = state.meals.map((m) => [
      new Date(m.dateISO).toISOString(),
      m.name,
      m.tag,
      m.symptoms.bloating,
      m.symptoms.fatigue,
      m.symptoms.brainFog,
      m.symptoms.skin,
      m.symptoms.joint,
      (m.notes || '').replace(/\n/g, ' '),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `glutenwise-journal-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <SectionHero
        image={HERO}
        eyebrow="Your story, kindly tracked"
        title="Meal journal & symptom tracker"
        subtitle="Notice the patterns. Celebrate the streaks. Your healing timeline lives here."
      />

      <div className="grid gap-5 md:grid-cols-3">
        <div className="glass rounded-3xl p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.18em] text-sage-700">Streak</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="font-display text-5xl text-sage-700">{streakDays}</span>
            <span className="pb-2 text-slate-500">days GF</span>
            <Flame className="mb-2 ml-auto h-6 w-6 text-blush-500" />
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Log a compliant meal today to keep your streak alive.
          </p>
        </div>
        <div className="glass rounded-3xl p-6 shadow-soft md:col-span-2">
          <p className="text-xs uppercase tracking-[0.18em] text-blush-500">This week</p>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            <Tile value={weeklySummary.compliant} label="Compliant meals" tint="bg-sage-100 text-sage-700" />
            <Tile value={weeklySummary.exposure} label="Accidental exposure" tint="bg-red-100 text-red-700" />
            <Tile value={weeklySummary.unsure} label="Unsure" tint="bg-amber-100 text-amber-700" />
          </div>
          <button
            onClick={exportCsv}
            disabled={state.meals.length === 0}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage-500 px-4 py-2 text-sm font-medium text-white shadow-soft disabled:opacity-50"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      <section className="mt-8 rounded-3xl bg-white/85 p-6 shadow-soft md:p-8">
        <h2 className="font-display text-2xl">Log a meal</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-slate-500">Meal</span>
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="e.g. Quinoa bowl with sardines"
              className="mt-1 w-full rounded-xl border border-white bg-cream-100 px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-slate-500">Status</span>
            <select
              value={draft.tag}
              onChange={(e) => setDraft({ ...draft, tag: e.target.value as MealEntry['tag'] })}
              className="mt-1 w-full rounded-xl border border-white bg-cream-100 px-3 py-2 text-sm outline-none"
            >
              <option value="compliant">✅ GF compliant</option>
              <option value="exposure">❌ Accidental exposure</option>
              <option value="unsure">🤔 Unsure</option>
            </select>
          </label>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {SYMPTOMS.map((s) => (
            <label key={s.key} className="block">
              <span className="text-xs text-slate-500">
                {s.emoji} {s.label}
              </span>
              <input
                type="range"
                min={0}
                max={10}
                value={draft.symptoms[s.key]}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    symptoms: { ...draft.symptoms, [s.key]: Number(e.target.value) },
                  })
                }
                className="mt-1 w-full accent-sage-500"
              />
              <span className="text-xs font-medium text-slate-700">
                {draft.symptoms[s.key]}/10
              </span>
            </label>
          ))}
        </div>
        <label className="mt-5 block">
          <span className="text-xs uppercase tracking-wider text-slate-500">Notes</span>
          <textarea
            rows={2}
            value={draft.notes}
            onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
            placeholder="How did you feel? Anything unusual?"
            className="mt-1 w-full rounded-xl border border-white bg-cream-100 px-3 py-2 text-sm outline-none"
          />
        </label>
        <button
          onClick={submit}
          className="mt-4 rounded-full bg-sage-500 px-5 py-2 text-sm font-medium text-white shadow-soft hover:bg-sage-700"
        >
          Save meal ({state.meals.length === 0 ? 'first one!' : `+${state.meals.length + 1}`})
        </button>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-2xl">History</h2>
        {state.meals.length === 0 ? (
          <p className="rounded-2xl bg-white/70 p-6 text-center text-slate-500 shadow-soft">
            No entries yet. Your first meal log is one small, brave step.
          </p>
        ) : (
          <div className="space-y-3">
            {state.meals.slice(0, 50).map((m, i) => (
              <motion.article
                key={m.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.02 * i }}
                className="flex items-start gap-4 rounded-2xl bg-white/90 p-4 shadow-soft"
              >
                <TagBadge tag={m.tag} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg">{m.name}</h3>
                    <button
                      onClick={() => removeMeal(m.id)}
                      className="rounded-full bg-cream-100 p-1.5 text-slate-500 transition hover:text-red-600"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    {new Date(m.dateISO).toLocaleString()}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                    {SYMPTOMS.map((s) => (
                      <span key={s.key} className="pill bg-cream-100 text-slate-600">
                        {s.emoji} {m.symptoms[s.key]}
                      </span>
                    ))}
                  </div>
                  {m.notes && (
                    <p className="mt-2 text-sm text-slate-600">{m.notes}</p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Tile({ value, label, tint }: { value: number; label: string; tint: string }) {
  return (
    <div className={`rounded-2xl px-3 py-4 ${tint}`}>
      <p className="font-display text-3xl">{value}</p>
      <p className="text-[11px]">{label}</p>
    </div>
  );
}

function TagBadge({ tag }: { tag: MealEntry['tag'] }) {
  const map = {
    compliant: { c: 'bg-sage-200 text-sage-700', l: '✓' },
    exposure: { c: 'bg-red-100 text-red-700', l: '!' },
    unsure: { c: 'bg-amber-100 text-amber-700', l: '?' },
  };
  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-full font-display ${map[tag].c}`}
    >
      {map[tag].l}
    </span>
  );
}
