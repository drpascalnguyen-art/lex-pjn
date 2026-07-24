# 2026-07-24 — AI Front Desk (number bought, emergency-flow decision, deploy prep)

**Session:** Claude Code remote · **File under:** 03 - Projects / AI Dental Institute

## Milestones today
- **Twilio Business Profile APPROVED** (7/24) — confirmed via Gmail. Error 18606 fix (domain-matched email) worked.
- **Number purchased: +1 971-385-6800** (SMS + MMS + Voice). Saved to password manager.
- **Anthropic API key created** (`pjn-front-desk`, no expiration). Copy kept by Pascal. Only
  used in one place: Render env var `ANTHROPIC_API_KEY` (SMS side). Voice/Retell uses Retell's
  built-in Claude, so the key isn't needed there.

## Key decision — emergency handling (no on-call line)
Pascal clarified the practice has NO live after-hours line today: patients leave a message, staff
call ASAP. Decision: **don't stand up an answering service just for this.** Instead Dana mirrors
the current workflow —
- Life-threatening (breathing/swallowing trouble, eye/throat swelling) → **911/ER**.
- Urgent dental (knocked-out tooth, severe pain, broken tooth) → first-aid tip + take
  name/callback/details → **flag to staff as URGENT** (instant text) for ASAP callback.
- Routine → appointment request / message.
This is an upgrade over voicemail: staff get an instant structured URGENT text instead of a
message sitting in a mailbox. An answering service remains a clean future upgrade if desired.

## Build changes made (all committed)
Removed the on-call number everywhere and rewired to the URGENT-message flow:
- `prompts/receptionist-voice-FILLED.md` — updated Dana prompt (no placeholder; ready to paste)
- `prompts/receptionist-voice.md`, `prompts/sms-agent.md`, `prompts/email-triage.md` — aligned
- `server.js` — `escalate_emergency` now texts STAFF_ALERT_PHONE as URGENT; dropped ON_CALL_PHONE
- `retell/functions.json` — function description updated
- `render.yaml`, `.env.example`, `DEPLOY.md` — ON_CALL_PHONE removed; practice facts + 971 number in
- `CODEX-PROMPT-retell-setup.md` — rewritten to the no-on-call design
- Server syntax verified OK.

## Deploy prep done (turnkey as possible)
- `render.yaml` Render blueprint (practice facts pre-filled; secrets as sync:false)
- `DEPLOY.md` step-by-step (buy number ✓ → Render → paste secrets → webhooks → A2P/BAA/test)
- `A2P-registration-answers.md` — copy-paste A2P registration content (STOP-compliant samples)
- `package.json` start no longer needs a local .env (Render injects env)
- `.gitignore` protects secrets

## What only Pascal can do (by design)
Buy number ✓ done · deploy on Render (his login) · paste secret keys into Render (never in chat).

## Open items
- [ ] Re-paste the UPDATED Dana prompt into Retell (no-on-call version)
- [ ] Deploy server to Render (follow DEPLOY.md) — Claude assists live
- [ ] Wire number webhooks: Voice → Retell, Messaging → server
- [ ] A2P registration (answers ready), call forwarding, sign 3 BAAs, test → go live
- [ ] Decide STAFF_ALERT_PHONE (which front-desk number gets the alerts/URGENT texts)

## Artifacts
- Build folder: `ai-dentist/ai-front-desk/build/` · Tracker: `build/SETUP-PROGRESS.md`
- PR: https://github.com/drpascalnguyen-art/lex-pjn/pull/3
