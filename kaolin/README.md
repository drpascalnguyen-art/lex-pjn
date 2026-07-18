# Kaolin

A [Clay](https://clay.com)-style lead-enrichment table + CLI, scoped for the **AI Practice Systems for Dentists** launch. (Kaolin is the clay used in dentistry — hence the name.)

Like Clay, the core idea is: **a table of leads where each column is an enrichment step**, run as a pipeline over every row:

- **`input`** — raw data from a CSV import
- **`formula`** — a JS expression over the row (derive domain, guess email patterns)
- **`http`** — fetch a URL templated from row values, extract a JSON path or regex match
- **`ai`** — a Claude prompt templated from row values (fit scoring, personalized openers) — uses `claude-opus-4-8` with adaptive thinking by default
- **`waterfall`** — Clay's signature move: try sources in order, first non-empty value wins (e.g. real email → pattern-guessed email)

Data lives as plain JSON in your repo (`tables/*.json`), so every enrichment run is diffable and versionable.

## Setup

```bash
cd kaolin && npm install
node bin/kaolin.js help        # or: npm link  →  kaolin help
export ANTHROPIC_API_KEY=sk-ant-...   # needed for ai columns only
```

## Quickstart (dental outreach)

```bash
mkdir ~/dental-leads && cd ~/dental-leads
kaolin init
kaolin import path/to/kaolin/examples/dental-practices.csv --table leads
kaolin recipe apply leads path/to/kaolin/recipes/dental-outreach.json
kaolin run leads               # formulas + waterfall run free; ai columns call Claude
kaolin view leads
kaolin export leads outreach.csv
```

The bundled `recipes/dental-outreach.json` pipeline:

1. `domain` (formula) — extract domain from website
2. `pattern_email` (formula) — `firstname@domain` guess
3. `best_email` (waterfall) — known email → pattern guess
4. `ai_fit_score` (ai) — 1–10 fit for the AI-dentist program
5. `ai_opener` (ai) — 2-sentence personalized cold-email opener from Dr. Pascal Nguyen

## Building your own columns

```bash
kaolin col add leads insta_handle --type ai \
  --prompt "Likely Instagram handle for {{practice_name}} in {{city}}? Reply ONLY the handle or NONE."

kaolin col add leads npi_lookup --type http \
  --url "https://npiregistry.cms.hhs.gov/api/?version=2.1&organization_name={{practice_name}}&state={{state}}" \
  --extract "results.0.number"

kaolin col add leads followup --type waterfall --sources best_email,insta_handle
```

`{{column_name}}` templates substitute row values in `ai` prompts and `http` URLs. `kaolin run` only computes empty cells (re-run safe / resumable); use `--force` to recompute, `--only col1,col2` to target columns, `--limit N` to test on a few rows first.

## Notes

- Concurrency for ai/http columns is set in `kaolin.json` (default 3).
- Columns run in definition order, so a waterfall can sit *after* the AI/HTTP columns it drinks from.
- Not affiliated with Clay.com — this is a personal-scale homage for one dentist's go-to-market, not a SaaS.
