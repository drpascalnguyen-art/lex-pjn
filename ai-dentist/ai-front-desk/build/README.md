# AI Front Desk — MVP Build (Retell + Twilio + Claude)

Scaffold for the practice's AI phone/text front desk, per the 2026-07-18 assessment
(`../2026-07-18-arini-clone-assessment.md`). Strategy: **overflow-first** — the AI
answers what the front desk misses (after-hours, busy, no-answer). It never replaces
the human on the main line on day one.

## What this MVP does

1. **Answers overflow/after-hours calls** via a Retell voice agent (prompt in `prompts/receptionist-voice.md`).
2. **Captures appointment requests** — collects name, callback number, reason, preferred times; staff confirms in the PMS next morning (no PMS write-back in v1).
3. **Takes messages** and pushes structured summaries to staff by SMS (and optionally email).
4. **Triages emergencies** — bleeding/swelling/trauma/pain scripts escalate to the on-call number immediately.
5. **Texts back dropped calls** — if a caller hangs up before completing anything, they get an SMS within a minute, and the AI continues the conversation over text (`prompts/sms-agent.md`).
6. **Email triage** — phase 2; prompt is ready (`prompts/email-triage.md`), wiring notes below.

## Architecture

```
Practice main line (unchanged)
   │  no-answer / busy / after-hours → call forward
   ▼
Twilio number ──(SIP trunk import)──► Retell voice agent (Claude-driven prompt)
                                          │ custom function calls (mid-call)
                                          ▼
                                   server.js  /webhooks/retell
                                          │
                     ┌────────────────────┼─────────────────────┐
                     ▼                    ▼                     ▼
             staff SMS alert     appointment-request log   on-call escalation
                                          ▲
Twilio SMS  ◄──── /webhooks/twilio/sms ───┘  (Claude-powered text conversation)
Retell post-call webhook ──► /webhooks/retell/post-call ──► missed-caller text-back
```

## Setup checklist (in order)

### 0. Compliance gate — before ANY real patient traffic
- [ ] Sign BAA with **Retell** (included on all plans — confirm in writing)
- [ ] Sign BAA with **Twilio** (request via Twilio console; use only HIPAA-eligible products)
- [ ] Sign BAA with **Anthropic** (Claude API — contact sales / check console eligibility)
- [ ] Written retention policy for recordings + transcripts; enable PII redaction in Retell
- [ ] Until all BAAs are signed: test with **staff/test callers only**, no PHI

### 1. Accounts & numbers
- [ ] Twilio account → buy one local number (voice + SMS)
- [ ] Retell account → import the Twilio number (Retell dashboard → Phone Numbers → connect via Twilio SIP trunk)
- [ ] Anthropic API key

### 2. Retell agent
- [ ] Create a Retell LLM agent; paste `prompts/receptionist-voice.md` as the general prompt
- [ ] Add the custom functions from `retell/functions.json`, pointing at `https://<your-host>/webhooks/retell`
- [ ] Set post-call webhook to `https://<your-host>/webhooks/retell/post-call`
- [ ] Pick a warm, professional voice; set interruption sensitivity to default; enable voicemail detection
- [ ] Fill the `{{...}}` placeholders in the prompt (practice name, hours, address, on-call number)

### 3. This server
- [ ] `cp .env.example .env` and fill in values
- [ ] `npm install && npm start` (deploy anywhere that gives you HTTPS — Render/Fly/Railway; must be a host you can cover under your compliance posture)
- [ ] Twilio console → your number → Messaging webhook → `POST https://<your-host>/webhooks/twilio/sms`

### 4. Call forwarding (the safe rollout)
- [ ] Office phone system: forward **no-answer (after ~5 rings), busy, and after-hours** to the Twilio number
- [ ] Main line behavior during office hours is otherwise unchanged

### 5. Test plan (do all of these with a personal cell before go-live)
- [ ] After-hours call → AI answers, books a request, staff gets SMS summary
- [ ] Mid-call hangup → text-back SMS arrives, conversation continues by text
- [ ] Say "I'm in a lot of pain and my face is swollen" → emergency script + on-call escalation fires
- [ ] Ask an off-script question (pricing for veneers) → AI takes a message instead of guessing
- [ ] Spanish caller → AI offers to continue by text (v1 voice is English-only; note for v2)

## Email triage (phase 2)
Prompt is ready in `prompts/email-triage.md`. Recommended wiring: Google Workspace (BAA
covered) + a small script polling the office inbox via Gmail API → Claude classifies
(emergency / appointment / billing / records / other) and drafts a reply → draft lands
in the inbox for a human to review and send. **Human always clicks send.**

## What's deliberately NOT in v1
- PMS write-back (Open Dental API / NexHealth is v2 — v1 captures requests, staff confirms)
- Insurance verification
- Outbound recall campaigns
- Replacing daytime answering on the main line

## Costs (single practice, moderate volume)
Retell ~$0.11–0.25/min all-in · Twilio number + SMS ~$20–50/mo · Claude API ~$10–30/mo
→ roughly **$200–400/mo** at ~1,000–1,500 overflow minutes.
