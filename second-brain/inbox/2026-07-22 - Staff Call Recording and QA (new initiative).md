# 2026-07-22 — Staff Call Recording & QA (new initiative)

**Session:** Claude Code remote · **File under:** 03 - Projects / AI Dental Institute

## What Pascal asked
While staff answer the main line, record and analyze those calls for training and knowledge.

## Key point
This is a **separate system** from the AI overflow line (Dana). Dana catches *missed* calls;
this is QA on *human* staff calls. Different plumbing — kept as its own initiative.

## Legality (verified)
- Oregon telephone calls = **one-party consent** — staff being on the call is enough in Oregon.
- BUT patients call from **all-party states** (CA, WA…), so **announce recording on every call**:
  "your call may be recorded for quality and training." Compliant everywhere; do this regardless.
- Recordings/transcripts are **PHI** → BAA + encryption + retention policy + access controls.
- (Oregon in-person convos are all-party per ORS 165.540(1)(c), upheld 9th Cir. Jan 2025 — not
  phone-relevant but noted for any in-op recording later.)

## Three paths
1. **Buy** dental call-analytics — Peerlogic (their original product) or Weave. Fastest.
2. **Existing phone system's built-in recording** — most VoIP have it; enable + export + add
   Claude analysis. Cheapest **if available**. ← check first.
3. **Build on Twilio + Claude** — record → transcribe → Claude scores vs rubric. Best course asset.

## Recommendation
Find out the current phone provider first (Pascal getting back on this). If it records → Path 2
+ Claude layer. If not → Peerlogic or Twilio route.

## Draft Claude QA rubric (per-call, 0–5 each)
Greeting/identity · booking conversion · missed-opportunity flag · new-patient capture ·
insurance/pricing handling · clinical-safety · empathy/tone · efficiency · resolution ·
knowledge gaps. Aggregate → weekly scorecards, top missed-booking reasons, FAQ/website gaps,
coaching themes.

## Open items
- [ ] Pascal: identify current phone system/provider (determines Path 2)
- [ ] Pascal: enable recording-disclosure greeting on main line (do regardless)
- [ ] Pascal: confirm QA scope with practice attorney
- [ ] Claude: once provider known, spec pipeline + finalize rubric + sample scorecard

## Artifacts
- Initiative brief: `ai-dentist/ai-front-desk/call-qa/2026-07-22-staff-call-recording-and-qa.md`
- PR: https://github.com/drpascalnguyen-art/lex-pjn/pull/3
