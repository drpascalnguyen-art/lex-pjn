---
title: GlutenWise — PWA
created: 2026-04-20
tags: [project, glutenwise, pwa, health, celiac, gluten-free]
repo: drpascalnguyen-art/lex-pjn
branch: claude/build-glutenwise-pwa-el9iJ
live-url: https://drpascalnguyen-art.github.io/lex-pjn/
stack: [React, Vite, TypeScript, Tailwind, Framer Motion, vite-plugin-pwa]
---

# 🌿 GlutenWise

A beautiful, educational PWA for people newly diagnosed with celiac disease or
gluten intolerance. Wellness-magazine aesthetic, science-informed content, an
AI food scanner, meal journal, and gamified gut-healing journey.

> [!info] Live URL
> https://drpascalnguyen-art.github.io/lex-pjn/
>
> (Enable GitHub Pages → `gh-pages` branch in repo settings once, then it's permanent.)

---

## 🚀 Run it on your Mac

```bash
# Install Node if needed
brew install node

# Clone & enter
git clone https://github.com/drpascalnguyen-art/lex-pjn.git
cd lex-pjn
git checkout claude/build-glutenwise-pwa-el9iJ

# Install & run
npm install
npm run dev         # → http://localhost:5173
```

Other commands:

```bash
npm run build       # production bundle
npm run preview     # serve the production bundle locally
npm run deploy      # build + push to gh-pages branch
```

---

## 🔑 AI Food Scanner setup

- Get an API key from **console.anthropic.com**
- In the app, open **Scanner** → paste your `sk-ant-...` key when prompted
- Stored only in browser `localStorage`
- Model used: `claude-sonnet-4-20250514`
- For production, proxy through a serverless function so the key stays server-side

---

## 🗺️ Section tour

| Tab | What to do | Badge reward |
| --- | --- | --- |
| 🏠 **Home** | Edit your name, watch the Gut-Health ring grow | — |
| 🧠 **Gluten 101** | Flip all 5 cards; scroll to villi animation | 🛡️ Gut Guardian |
| 🚫 **Avoid** | Search ingredients; tap 10+ cards to "learn" | 🔍 Gluten Detective |
| ✅ **Eat** | Filter by category, toggle Low-FODMAP | — |
| 📸 **Scanner** | Snap a meal or label → AI report | 📸 Scanner Novice |
| 💊 **Protocol** | Read all supplement cards across 5 stacks | 📚 Supplement Scholar |
| 📊 **Journal** | Log meals + symptoms; keep the 🔥 streak | 🔥 7-Day Warrior, 📓 Journal Keeper |
| 🎓 **School** | Swipe 6 deep-dive lessons | unlocks collected badges |

Cross-cutting:

- 🎵 Floating music player (bottom-right) — ambient lofi + chime SFX
- 🏅 XP + badges persisted to localStorage
- 📱 Installable PWA — "Add to Home Screen" for full-screen app experience

---

## 🎨 Design tokens

- **Fonts**: Playfair Display (headings) · DM Sans (body)
- **Palette**:
  - Sage: `#BBF7D0` → `#22C55E` → `#15803D`
  - Blush: `#FCE7F3` → `#F9A8D4` → `#EC4899`
  - Sky: `#E0F2FE` → `#BAE6FD` → `#0EA5E9`
  - Cream: `#FEF9EF` → `#FBF1DA`
- **Vibe**: Goop meets WebMD but beautiful. Optimistic, empowering, non-clinical.

---

## 🛠️ Deploy anywhere

**GitHub Pages** — already wired:
```bash
npm run deploy
```
Then repo → Settings → Pages → Source: `gh-pages` branch → `/ (root)`.

**Vercel** — zero config:
vercel.com/new → import `drpascalnguyen-art/lex-pjn` → framework: Vite → Deploy.

---

## 🧭 Philosophy

Evidence-informed but never fear-mongering. Blends:

- **Fasano-lab science** on zonulin / tight junctions / leaky gut
- **Morley Robbins' Root Cause Protocol** — mineral metabolism, ceruloplasmin, whole-food vitamin C, retinol
- **Functional medicine** gut-repair stacks (L-glutamine, zinc carnosine, S. boulardii, etc.)
- **Environmental health** — glyphosate, hybridized wheat, oil quality

Tone: *"You CAN heal."*

---

## 📁 Project structure

```
src/
  App.tsx · main.tsx · index.css
  components/   Layout · NavBar · MusicPlayer · SectionHero
  pages/        Home · WhatIsGluten · WhatToAvoid · WhatToEat
                FoodScanner · Supplements · MealJournal · GutSchool
  data/         tips · avoid · eat · supplements · lessons
  hooks/        useLocalStorage · useSound
  lib/          gameState (XP, badges) · scanner (Claude API)
public/         icon.svg · icon-192.png · icon-512.png · apple-touch-icon.png
```

---

## 📌 Disclaimer

GlutenWise is for educational purposes only. Always consult a qualified
healthcare provider before changing your diet or supplement routine.

---

## Links

- Repo → https://github.com/drpascalnguyen-art/lex-pjn
- Branch → `claude/build-glutenwise-pwa-el9iJ`
- Related: [[Root Cause Protocol]] · [[Leaky Gut]] · [[Celiac Disease]]
