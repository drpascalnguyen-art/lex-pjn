# 2026-07-18 — Kaolin: Clay-style lead enrichment CLI

## Decisions
- Built a personal-scale Clay.com clone as a CLI + local table engine (not a web app) — named **Kaolin** (the clay used in dentistry).
- Lives in `kaolin/` at repo root (kept separate from the priming PWA and `ai-dentist/` per workspace rules).
- Data model: tables are plain JSON in the workspace (`tables/*.json`) so enrichment runs are diffable/versionable.
- Column types mirror Clay's core loop: `input`, `formula` (JS expr), `http` (templated fetch + JSON-path/regex extract), `ai` (Claude prompt), `waterfall` (first non-empty source wins).
- AI columns use the official Anthropic SDK, default model `claude-opus-4-8` with adaptive thinking; model overridable per column or in `kaolin.json`.
- Runs are resumable: only empty cells compute; `--force`, `--only`, `--limit` flags for control.

## Work produced
- `kaolin/bin/kaolin.js` — CLI: init, import (CSV), tables, view, col add/ls/rm, recipe apply, run, export.
- `kaolin/src/` — csv.js (RFC-4180 parser/serializer), store.js (workspace + tables), enrich.js (enrichment engine, concurrency pool, Claude calls), render.js (terminal tables).
- `kaolin/recipes/dental-outreach.json` — ready-made pipeline: domain → pattern_email → best_email (waterfall) → ai_fit_score → ai_opener (personalized cold-email opener from Dr. Pascal Nguyen).
- `kaolin/examples/dental-practices.csv` — 6 fictional practices for testing.
- `kaolin/README.md` — setup + quickstart + custom-column examples (incl. free NPI registry lookup as an http column).
- Verified end-to-end in a scratch workspace: import, recipe apply, formula + waterfall enrichment (18 cells), view, CSV export all work; AI columns fail gracefully with a clear warning when no `ANTHROPIC_API_KEY` is set (couldn't live-test Claude calls — no API credentials in the remote session).

## Open items
1. **Pascal** — set `ANTHROPIC_API_KEY` locally and run the two AI columns on the sample table to sanity-check tone of `ai_opener` (`kaolin run leads --only ai_fit_score,ai_opener --limit 2`).
2. **Pascal** — replace the fictional sample CSV with a real prospect list export.
3. **Next session** — optional: add a real email-finder / website-scrape http column (needs a data-provider API key), and a `kaolin serve` mini web view if terminal tables feel cramped.
4. **Next session** — review/merge the draft PR on branch `claude/clay-clone-ai-dentist-g01750`.

## Context for future sessions
- Kaolin workspaces are created anywhere with `kaolin init` (looks upward for `kaolin.json` like git). Test workspace used this session was in scratchpad (ephemeral) — the repo only carries the tool, recipes, and examples, no lead data.
- Columns run in definition order, so waterfalls can sit after the AI/HTTP columns they consume.
- `kaolin.json` holds `model` and `concurrency` (default 3 for ai/http).
- Not affiliated with Clay.com; README states this.
