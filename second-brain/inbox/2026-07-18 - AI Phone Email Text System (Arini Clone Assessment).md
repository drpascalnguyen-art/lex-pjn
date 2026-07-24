# 2026-07-18 — AI Phone / Email / Text System (Arini Clone Assessment)

**Session:** Claude Code remote · **File under:** 03 - Projects / AI Dental Institute

## What Pascal asked

An AI phone, email, and text system for the practice. Arini was the system previously looked at — can we clone it, and what's recommended?

## What was produced

Full assessment + architecture blueprint saved to the repo:
`ai-dentist/ai-front-desk/2026-07-18-arini-clone-assessment.md`

## Decisions recommended (not yet made by Pascal)

1. **For the practice now → buy.** Trial Arini vs Viva AI vs Annie for 30 days on real missed-call volume. Expect $700–$1,400/mo all-in for Arini-class service. Fastest revenue-recovery win.
2. **For the AI Practice Systems business → build the "smart clone".** Retell AI (HIPAA standard, all plans) + Twilio w/ BAA + Claude API w/ BAA + Gmail triage. MVP = overflow/after-hours answering, missed-call text-back, message-taking, emergency triage, email draft replies. ~$200–$400/mo running cost for one practice. Becomes a course module / member offer / credibility asset.
3. **Don't clone Arini fully** — their moat is PMS write-back (Dentrix/Eaglesoft via NexHealth/Sikka middleware) + HIPAA ops at scale. Start with request-capture scheduling; Open Dental API later if needed.
4. **Avoid Vapi** for this use case ($1,000/mo HIPAA add-on). Avoid full custom telephony build (Path C) — months of latency engineering Retell already solved.

## Open items

- [ ] Pascal: book demos (Arini + Viva + Annie suggested)
- [ ] Pascal: decide Path B's role — practice tool, course asset, or member offer
- [ ] Pascal: BAAs (Retell, Twilio, Anthropic, Google) before any PHI flows if building
- [ ] Next Claude session: scaffold Retell agent config + Claude prompt pack + missed-call text-back flow (on request)

## Update (same day): Pascal said "Do it" — MVP scaffold built

Path B scaffold now lives in `ai-dentist/ai-front-desk/build/`:

- `README.md` — architecture diagram, ordered setup checklist (compliance gate first), safe rollout via overflow forwarding, test plan
- `prompts/receptionist-voice.md` — full Retell voice-agent prompt (Dana persona, emergency triage first, appointment-request + message flows, hard guardrails: no clinical advice/prices/promised slots)
- `prompts/sms-agent.md` — SMS conversation prompt with `[[STAFF_SUMMARY]]` routing marker
- `prompts/email-triage.md` — phase-2 email classification + draft-reply prompt (human always sends)
- `retell/functions.json` — 3 custom functions: request_appointment, take_message, escalate_emergency
- `server.js` — Express webhook server (syntax-verified): Retell mid-call functions → staff SMS alerts; post-call webhook → missed-call text-back; inbound SMS → Claude conversation
- `package.json` + `.env.example`

**Before any real patient traffic:** BAAs with Retell, Twilio, Anthropic (compliance gate is step 0 in the README).

## Artifacts

- Assessment memo: `ai-dentist/ai-front-desk/2026-07-18-arini-clone-assessment.md` (includes vendor table, 3-path analysis, MVP scope, compliance checklist, sources)
- MVP build scaffold: `ai-dentist/ai-front-desk/build/`
- PR: https://github.com/drpascalnguyen-art/lex-pjn/pull/3
