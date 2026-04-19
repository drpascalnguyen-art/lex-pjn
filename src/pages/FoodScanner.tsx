import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Key,
  Loader2,
  ShieldAlert,
  Upload,
} from 'lucide-react';
import { SectionHero } from '../components/SectionHero';
import { analyzeFood, fileToDataUrl, type ScanResult } from '../lib/scanner';
import { useGame } from '../lib/gameState';
import { useLocalStorage } from '../hooks/useLocalStorage';

const HERO =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=70';

const DEFAULT_MODEL = 'claude-sonnet-4-20250514';

export function FoodScanner() {
  const { addScan, state, playChime } = useGame();
  const [apiKey, setApiKey] = useLocalStorage<string>('glutenwise:claude-key', '');
  const [showKey, setShowKey] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cameraRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setResult(null);
    try {
      const dataUrl = await fileToDataUrl(file);
      setImage(dataUrl);
      if (!apiKey) {
        setShowKey(true);
        return;
      }
      setLoading(true);
      const r = await analyzeFood(apiKey, DEFAULT_MODEL, dataUrl);
      setResult(r);
      playChime(r.verdict === 'AVOID' ? 'avoid' : r.verdict === 'CAUTION' ? 'tap' : 'safe');
      addScan({
        id: crypto.randomUUID(),
        dateISO: new Date().toISOString(),
        verdict: r.verdict,
        summary: r.title,
        thumbnail: dataUrl,
      });
    } catch (e: any) {
      setError(e?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SectionHero
        image={HERO}
        eyebrow="AI-powered"
        title="Scan any meal or label"
        subtitle="Snap a photo and Claude analyzes gluten risk, macros, glycemic load, FODMAP flags, and oil quality."
      />

      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="glass rounded-3xl p-6 shadow-soft">
          <h2 className="font-display text-xl">Upload or shoot</h2>
          <p className="mt-1 text-sm text-slate-600">
            Works with dishes, packaged foods, restaurant menus, and ingredient panels.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <button
              onClick={() => cameraRef.current?.click()}
              className="flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-br from-sage-500 to-sky-500 p-5 text-white shadow-soft transition hover:brightness-110"
            >
              <Camera className="h-6 w-6" />
              <span className="text-sm font-medium">Use camera</span>
            </button>
            <button
              onClick={() => inputRef.current?.click()}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white/80 p-5 text-slate-700 shadow-soft transition hover:bg-white"
            >
              <Upload className="h-6 w-6" />
              <span className="text-sm font-medium">Upload image</span>
            </button>
          </div>

          <ApiKeyBox apiKey={apiKey} setApiKey={setApiKey} show={showKey} setShow={setShowKey} />

          {image && (
            <div className="mt-5 overflow-hidden rounded-2xl">
              <img src={image} alt="Preview" className="max-h-64 w-full object-cover" />
            </div>
          )}

          {loading && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Claude is reading your plate…
            </div>
          )}
          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {result && !loading && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setImage(null)}
                className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-soft"
              >
                Report unclear? Try again
              </button>
              <button
                onClick={() => {
                  /* already saved to scan history */
                  playChime('safe');
                }}
                className="rounded-full bg-sage-500 px-4 py-1.5 text-xs font-medium text-white shadow-soft"
              >
                ✓ Saved to meals
              </button>
            </div>
          )}
        </div>

        <ResultCard result={result} loading={loading} image={image} />
      </div>

      {state.scans.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-2xl">Recent scans</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {state.scans.slice(0, 6).map((s) => (
              <div key={s.id} className="lift overflow-hidden rounded-2xl bg-white/85 shadow-soft">
                {s.thumbnail && <img src={s.thumbnail} alt="" className="h-32 w-full object-cover" />}
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm">{s.summary}</span>
                    <VerdictPill v={s.verdict} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(s.dateISO).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ApiKeyBox({
  apiKey,
  setApiKey,
  show,
  setShow,
}: {
  apiKey: string;
  setApiKey: (v: string) => void;
  show: boolean;
  setShow: (v: boolean) => void;
}) {
  const [draft, setDraft] = useState(apiKey);
  return (
    <div className="mt-4 rounded-2xl bg-cream-100/80 p-4">
      <button
        onClick={() => setShow(!show)}
        className="flex w-full items-center justify-between text-sm font-medium text-slate-700"
      >
        <span className="flex items-center gap-2">
          <Key className="h-4 w-4 text-sage-700" />
          Claude API key {apiKey && '✓'}
        </span>
        <span className="text-xs text-slate-500">{show ? 'Hide' : 'Manage'}</span>
      </button>
      {show && (
        <div className="mt-3 space-y-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="sk-ant-..."
            type="password"
            className="w-full rounded-xl border border-white bg-white px-3 py-2 text-sm outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setApiKey(draft.trim());
                setShow(false);
              }}
              className="rounded-full bg-sage-500 px-3 py-1.5 text-xs font-medium text-white"
            >
              Save
            </button>
            {apiKey && (
              <button
                onClick={() => {
                  setApiKey('');
                  setDraft('');
                }}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">
            Your key is stored only in this browser. For production, proxy
            through a serverless function so keys never reach the client.
          </p>
        </div>
      )}
    </div>
  );
}

function VerdictPill({ v }: { v: 'SAFE' | 'CAUTION' | 'AVOID' }) {
  const config = {
    SAFE: { c: 'bg-sage-200 text-sage-700', icon: CheckCircle2 },
    CAUTION: { c: 'bg-amber-100 text-amber-700', icon: AlertTriangle },
    AVOID: { c: 'bg-red-100 text-red-700', icon: ShieldAlert },
  }[v];
  const Icon = config.icon;
  return (
    <span className={`pill ${config.c}`}>
      <Icon className="h-3 w-3" /> {v}
    </span>
  );
}

function ResultCard({
  result,
  loading,
  image,
}: {
  result: ScanResult | null;
  loading: boolean;
  image: string | null;
}) {
  return (
    <AnimatePresence mode="wait">
      {!result && !loading && !image && (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex min-h-[240px] flex-col items-center justify-center rounded-3xl bg-white/70 p-8 text-center text-slate-500 shadow-soft"
        >
          <Camera className="mb-3 h-10 w-10 text-sage-500" />
          <p className="max-w-xs text-sm">
            Your beautifully animated report will appear here after your first scan.
          </p>
        </motion.div>
      )}
      {loading && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex min-h-[240px] items-center justify-center rounded-3xl bg-white/70 p-8 text-center text-slate-500 shadow-soft"
        >
          <div className="animate-float">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-sage-500" />
            <p className="mt-3 text-sm">Reading your plate with care…</p>
          </div>
        </motion.div>
      )}
      {result && !loading && (
        <motion.div
          key={result.title}
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-white/90 p-6 shadow-soft md:p-7"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Report</p>
              <h2 className="font-display text-2xl">{result.title}</h2>
            </div>
            <VerdictPill v={result.verdict} />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{result.reasoning}</p>

          <div className="mt-5 grid grid-cols-5 gap-2 text-center text-xs">
            <Stat label="kcal" value={result.nutrition.calories} />
            <Stat label="Protein" value={result.nutrition.protein} />
            <Stat label="Carbs" value={result.nutrition.carbs} />
            <Stat label="Fat" value={result.nutrition.fat} />
            <Stat label="Fiber" value={result.nutrition.fiber} />
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <Row label="Glycemic impact">
              <span className="font-medium capitalize">{result.glycemicImpact}</span>
              <span className="text-slate-500"> — {result.glycemicExplanation}</span>
            </Row>
            <Row label="Gut score">
              <GutBar score={result.gutScore} />
            </Row>
            <Row label="FODMAP">
              <span className="capitalize">{result.fodmap}</span>
            </Row>
            {result.allergens.length > 0 && (
              <Row label="Allergens">
                <div className="flex flex-wrap gap-1">
                  {result.allergens.map((a) => (
                    <span key={a} className="pill bg-blush-100 text-blush-500">
                      {a}
                    </span>
                  ))}
                </div>
              </Row>
            )}
            <Row label="Oils">
              <span className="text-slate-700">{result.oilQualityFlag}</span>
            </Row>
            {result.ingredients.length > 0 && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-[0.15em] text-slate-500">
                  Ingredients
                </p>
                <p className="text-sm text-slate-600">{result.ingredients.join(', ')}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream-100 p-2">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 font-display text-sm leading-tight">{value}</p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-xs uppercase tracking-wider text-slate-500">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function GutBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score * 10}%` }}
          transition={{ duration: 0.7 }}
          className="h-full bg-gradient-to-r from-sage-500 to-blush-500"
        />
      </div>
      <span className="font-display text-sm">{score}/10</span>
    </div>
  );
}
