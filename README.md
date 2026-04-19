# GlutenWise 🌿

A beautiful, educational, and functional Progressive Web App for people newly
diagnosed with gluten intolerance or celiac disease. GlutenWise combines a
warm, wellness-forward aesthetic with evidence-informed content on leaky gut,
the microbiome, the Root Cause Protocol, and gluten-free healing.

> **Disclaimer.** GlutenWise is for educational purposes only. Always consult
> your healthcare provider before changing your diet or supplement routine.

---

## ✨ What's inside

| Tab | Highlights |
| --- | --- |
| 🏠 **Home** | Editable welcome card, daily tip carousel, animated Gut-Health ring, quick-access tiles. |
| 🧠 **What Is Gluten?** | Five flip cards, a CSS villi before/after animation, progress tracker. |
| 🚫 **What to Avoid** | Searchable, colour-coded database — gluten sources, hidden sources, inflammatory oils, FODMAPs, cross-contamination. |
| ✅ **What to Eat** | Food grid with GI rating, protein, gut-score, low-FODMAP filter, fun facts. |
| 📸 **Food Scanner** | Camera / upload → Claude API (`claude-sonnet-4-20250514`) → animated report with verdict (SAFE / CAUTION / AVOID), macros, glycemic impact, FODMAP, allergens, oil-quality flag. |
| 💊 **Protocol** | Five supplement stacks — Gut Repair, Microbiome, Detox & Cellular, Root Cause Protocol, Anti-Inflammatory — each with dose, form, timing, evidence badge. |
| 📊 **Meal Journal** | Log meals with 1–10 symptom sliders, streak counter, CSV export. |
| 🎓 **Gut School** | Swipeable lessons on the gut-brain axis, glyphosate/zonulin, testing, microbiome immunity, North-American wheat — with six unlockable badges. |

Cross-cutting features:

- 🎵 Floating ambient-lofi music player (royalty-free Pixabay stream) + chime / alert SFX via Web Audio — no audio files shipped.
- 🔊 Sound effects: gentle chime for SAFE, soft alert for AVOID, celebratory chord on badge unlock.
- 🏅 Gamification: XP, badges, Gut-Health % composite score — all persisted to `localStorage`.
- 📱 Full PWA: manifest, service worker (via `vite-plugin-pwa`), offline caching, Add-to-Home-Screen.

---

## 🛠️ Tech stack

- **React 18** + **TypeScript** + **Vite 5**
- **Tailwind CSS** (custom palette: sage, blush, sky, cream)
- **Framer Motion** for page transitions and reveal animations
- **React Router 6** (`HashRouter` for painless GitHub Pages deploys)
- **lucide-react** icons
- **vite-plugin-pwa** (Workbox) for service worker + Unsplash / Google Fonts runtime caching
- **Google Fonts**: _Playfair Display_ (headings) · _DM Sans_ (body)

Data lives entirely client-side — no backend needed. Add a serverless proxy later for Claude if you want to hide API keys.

---

## 🚀 Getting started

```bash
# install
npm install

# dev server (localhost:5173)
npm run dev

# production build (outputs to ./dist)
npm run build

# preview the production build locally
npm run preview
```

---

## 🔑 AI Food Scanner

The scanner calls Anthropic's Messages API directly from the browser for a
zero-backend v1. On first use the app asks for your Claude API key and stores
it in `localStorage` (browser-only, never transmitted anywhere else).

- Model: `claude-sonnet-4-20250514`
- Header: `anthropic-dangerous-direct-browser-access: true`
- Key pattern: `sk-ant-...`

**For production, proxy requests through a tiny serverless function (Vercel,
Cloudflare Worker, etc.) so the key stays server-side.**

---

## 📦 Deployment

### Option A — GitHub Pages (recommended for Pascal's existing repo)

1. Push the code to your repo on the `main` branch.
2. In `vite.config.ts`, `base: './'` is already set — works on any GitHub Pages path.
3. Build and publish to the `gh-pages` branch:

```bash
npm install          # installs the gh-pages devDep
npm run deploy
```

4. In the GitHub repo → **Settings → Pages**, choose **Deploy from branch → gh-pages → / (root)**.
5. Your PWA is live at `https://<user>.github.io/<repo>/`.

> `HashRouter` is used, so GitHub Pages sub-path routing works out of the box.

### Option B — Vercel (zero-config)

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Vite**.
3. Accept the defaults and deploy. PWA assets are served from the root.

---

## 📱 Install to home screen

Once deployed over HTTPS:

- **iOS / Safari**: Share → "Add to Home Screen"
- **Android / Chrome**: three-dot menu → "Install app"
- **Desktop / Chrome, Edge, Brave**: install icon in the address bar

The app works offline for all pages you've visited, including scan history and
your journal.

---

## 📁 Project structure

```
src/
  App.tsx
  main.tsx
  index.css
  components/
    Layout.tsx
    MusicPlayer.tsx
    NavBar.tsx
    SectionHero.tsx
  pages/
    Home.tsx
    WhatIsGluten.tsx
    WhatToAvoid.tsx
    WhatToEat.tsx
    FoodScanner.tsx
    Supplements.tsx
    MealJournal.tsx
    GutSchool.tsx
  data/
    tips.ts
    avoid.ts
    eat.ts
    supplements.ts
    lessons.ts
  hooks/
    useLocalStorage.ts
    useSound.ts
  lib/
    gameState.tsx   // XP, badges, persistence
    scanner.ts      // Claude API client
public/
  icon.svg, icon-192.png, icon-512.png, apple-touch-icon.png
```

Every major section is its own component file so the codebase stays modular
and easy to extend.

---

## 🧭 Tone & philosophy

GlutenWise is evidence-informed but never fear-mongering. The voice is warm,
optimistic, and empowering — **you CAN heal**. Content pulls from functional
medicine (leaky gut, the Gut-Brain axis), the Root Cause Protocol (Morley
Robbins), and mainstream celiac research (Fasano lab, Cyrex Array, GFCO).

Made with 🌿 for anyone beginning their gluten-free journey.
