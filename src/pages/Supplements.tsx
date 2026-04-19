import { motion } from 'framer-motion';
import { SectionHero } from '../components/SectionHero';
import {
  STACK_DESCRIPTION,
  STACK_ORDER,
  SUPPLEMENTS,
  type Supplement,
} from '../data/supplements';
import { useGame } from '../lib/gameState';

const HERO =
  'https://images.unsplash.com/photo-1584363539061-a9fbb2e75f99?auto=format&fit=crop&w=1400&q=70';

const EVIDENCE_STYLE: Record<Supplement['evidence'], string> = {
  Emerging: 'bg-blush-100 text-blush-500',
  Moderate: 'bg-sky-100 text-sky-500',
  Strong: 'bg-sage-200 text-sage-700',
};

export function Supplements() {
  const { state, markSupplementRead } = useGame();

  return (
    <div>
      <SectionHero
        image={HERO}
        eyebrow="Root-cause protocol"
        title="Supplements that help your gut rebuild"
        subtitle="Organised into five stacks — gut repair, microbiome, detox, root-cause mineral balance, and anti-inflammatory support."
      />

      <div className="rounded-2xl bg-cream-100 p-4 text-xs text-slate-600">
        <strong className="text-slate-700">Educational only.</strong> These are
        starting points informed by functional-medicine research. Dosing and
        combinations should be personalised with a practitioner.
      </div>

      {STACK_ORDER.map((stack) => {
        const items = SUPPLEMENTS.filter((s) => s.stack === stack);
        return (
          <section key={stack} className="mt-10">
            <h2 className="font-display text-2xl md:text-3xl">{stack}</h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-600">
              {STACK_DESCRIPTION[stack]}
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {items.map((s, i) => {
                const read = state.readSupplements.includes(s.id);
                return (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: 0.04 * i }}
                    onClick={() => markSupplementRead(s.id)}
                    className="lift flex h-full flex-col rounded-3xl bg-white/90 p-5 text-left shadow-soft"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{s.emoji}</span>
                        <div>
                          <h3 className="font-display text-xl">{s.name}</h3>
                          <p className="text-xs text-slate-500">{s.purpose}</p>
                        </div>
                      </div>
                      <span className={`pill ${EVIDENCE_STYLE[s.evidence]}`}>
                        {s.evidence}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{s.why}</p>
                    <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                      <Meta label="Dose" value={s.dose} />
                      <Meta label="Form" value={s.form} />
                      <Meta label="Timing" value={s.timing} />
                      <Meta label="Stack" value={s.stack} />
                    </dl>
                    {read && (
                      <span className="mt-3 self-end pill bg-sage-100 text-sage-700">
                        ✓ read
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="text-sm text-slate-700">{value}</dd>
    </div>
  );
}
