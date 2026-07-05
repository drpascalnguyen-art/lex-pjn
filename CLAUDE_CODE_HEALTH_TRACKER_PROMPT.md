# Claude Code prompt — Lex PJN personal health tracker upgrade

You are working in this repo:

`/Users/pascalnguyen/Developer/lex-pjn`

GitHub remote:

`https://github.com/drpascalnguyen-art/lex-pjn.git`

Current app facts:

- Single-file prototype in `index.html` using React from CDN and inline JS/CSS.
- Existing app name/header: `Lex · PJN`.
- Existing modes:
  - Morning Priming Protocol: 13 steps.
  - Evening Wind Down Protocol: 7 steps.
- Existing local storage key: `lex-pjn-progress-v1` for session count/streak.
- There is an uncommitted local progress/commercialization layer in `index.html` that adds `ProgressPanel`, `CommercialPanel`, and saves completed protocol sessions.
- `PRODUCTIZATION_REVIEW.md` exists and documents prior productization review.
- Do not remove the current morning/evening protocol experience. Expand it into a more usable personal health cockpit for Pascal first.

## Goal

Upgrade Lex PJN from a priming-only prototype into a private daily health/execution tracker for Pascal that can track:

1. Supplements.
2. Medications.
3. Workouts, including exercise-level entries.
4. Time-under-tension weight training, not just reps/sets.
5. Recovery practices.
6. Morning/evening routines.
7. Hydration.
8. Simple daily dashboard that shows what matters today.

Important: this is a self-tracking app, not medical advice. It must not recommend medication/supplement changes, dosing changes, or clinical decisions.

## Product direction

Make the app feel like “Pascal 2.0 cockpit,” not a generic habit tracker.

Core principle:

- The app should reduce friction.
- It should be usable on an iPhone at the gym.
- It should prioritize fast entry over perfect data modeling.
- It should make the next action obvious.

## Proposed navigation

Add a home dashboard with 4 primary cards:

1. **Today**
   - Morning priming status.
   - Evening wind-down status.
   - Supplements / medications due today.
   - Hydration progress.
   - Workout / recovery status.

2. **Stack**
   - Supplements and medications.
   - Track taken / skipped / notes.
   - Fields:
     - name
     - type: supplement | medication
     - dose text
     - timing: morning | midday | evening | bedtime | custom
     - frequency text
     - notes
     - active true/false
   - Include quick “Taken” check button.
   - Include “Add item” form.
   - Save to localStorage.

3. **Training**
   - Workout log.
   - Workout type: weights | cardio | mobility | sauna/cold plunge/red light | custom.
   - For weights, support exercises with:
     - exercise name
     - load/weight
     - sets
     - reps optional
     - tempo fields: eccentric seconds, pause seconds, concentric seconds
     - calculated time under tension per rep
     - calculated total time under tension = sets × reps × tempo total
     - RPE or effort 1-10 optional
     - notes
   - Allow “quick add set” and “duplicate last set.”
   - Show total session TUT and total workout duration.
   - Include explanation copy: “Control beats momentum. Time under tension is the signal.”
   - Make it easy to log controlled reps instead of ego reps.

4. **Routines**
   - Existing Morning Priming.
   - Existing Evening Wind Down.
   - Optional quick check-ins:
     - meditation 1
     - meditation 2
     - Pulsetto 1
     - Pulsetto 2
     - hydration streak

## Data model

Use localStorage for now. Do not add backend unless explicitly asked.

Add versioned storage keys:

- `lex-pjn-progress-v1` — keep existing.
- `lex-pjn-stack-v1` — supplement/medication definitions.
- `lex-pjn-daily-log-v1` — daily completions by date.
- `lex-pjn-workouts-v1` — workout sessions.

Suggested shape:

```js
const todayLog = {
  date: "YYYY-MM-DD",
  routines: {
    morning: false,
    evening: false,
    meditation1: false,
    meditation2: false,
    pulsetto1: false,
    pulsetto2: false
  },
  hydrationOz: 0,
  stackTaken: {
    [stackItemId]: { taken: true, at: ISODate, note: "" }
  },
  recovery: {
    sauna: false,
    coldPlunge: false,
    redLight: false,
    hocatt: false,
    ammortal: false
  }
}
```

Workout shape:

```js
const workout = {
  id,
  date,
  type: "weights",
  startedAt,
  endedAt,
  notes,
  exercises: [
    {
      id,
      name,
      sets: [
        {
          weight,
          reps,
          eccentricSec,
          pauseSec,
          concentricSec,
          tutSec,       // reps * (eccentric + pause + concentric)
          rpe,
          notes
        }
      ]
    }
  ],
  totalTutSec
}
```

## Implementation requirements

1. Preserve existing visual identity: calm, premium, biological-performance feel.
2. Keep it mobile-friendly. Test at narrow widths.
3. No backend, no accounts, no cloud sync.
4. No clinical recommendations.
5. Add import/export JSON buttons for backup.
6. Add a visible privacy note: “Private local tracker. Not medical advice.”
7. Add seed/demo defaults only if useful, but allow Pascal to delete or edit them.
8. If the single-file architecture becomes too fragile, do the smallest safe refactor:
   - keep deployment simple;
   - avoid a big framework migration unless necessary;
   - split helper functions only if local testing still works.

## UX details

Dashboard card priorities:

- “What needs attention today?” at top.
- Big hydration counter with +8 oz button.
- Stack due list with one-tap Taken.
- Training start button.
- Recovery toggles.
- Morning/evening routine buttons.

Workout details:

- Default tempo preset: 3 sec eccentric / 1 sec pause / 2 sec concentric.
- Let Pascal edit tempo per set.
- Show per-set TUT and exercise total.
- Highlight controlled lifting:
  - fast sloppy reps should not be rewarded;
  - quality = load × control × time under tension.

Suggested labels:

- “Controlled reps”
- “Time under tension”
- “Tempo”
- “Quality volume”
- “Momentum is not muscle.”

## Acceptance criteria

After implementation:

1. Open app locally and verify no console errors.
2. Add one supplement and mark it taken.
3. Add one medication and mark it taken.
4. Add hydration twice with +8 oz and verify daily total updates.
5. Create a weights workout with at least:
   - Dumbbell curl
   - 2 sets
   - 10 reps
   - 25 lb
   - tempo 3-1-2
   - verify total TUT = 2 × 10 × 6 = 120 seconds.
6. Complete or open Morning Priming and verify existing flow still works.
7. Refresh browser and verify localStorage persistence.
8. Export JSON and verify it contains stack, daily log, and workouts.
9. Run any available lint/test/build command if the repo has one; if none, document manual verification.
10. Commit changes with a clear commit message.

## Git safety

Before editing:

```bash
git status --short
git diff -- index.html
```

There are existing uncommitted changes. Preserve them unless clearly broken.

After editing and testing:

```bash
git status --short
git diff --stat
git add index.html CLAUDE_CODE_HEALTH_TRACKER_PROMPT.md
git commit -m "Expand Lex PJN into personal health tracker"
```

Do not push unless Pascal explicitly asks.

## Tone/copy

Use Pascal language:

- “Pascal 2.0”
- “Body is the instrument”
- “Controlled reps beat momentum”
- “Private local tracker”
- “Not medical advice”

Avoid generic wellness-app fluff.

## Final response expected from Claude Code

Return:

- Files changed.
- What was added.
- Exact manual tests run and results.
- Any limitations.
- Whether commit was created.
