# 2026-07-21 — AI Front Desk Setup Session (Twilio / Retell / Anthropic)

**Session:** Claude Code remote · **File under:** 03 - Projects / AI Dental Institute

## What we did

Walked through account signups for the AI phone/text front-desk build (Path B from the
2026-07-18 assessment). Explained each service in plain terms: Twilio = phone company for
software (number + SMS), Retell = the voice-agent platform (answers calls, low latency),
Anthropic/Claude = the brain. Also explained BAAs (Business Associate Agreements — the
free HIPAA contract required before any patient data flows).

## Where each service landed (all in progress, none finished)

- **Twilio:** account active ($50 balance). Portland **503 area code was sold out** for
  numbers with SMS+MMS+Voice → picked a **971 (Beaverton)** local number instead. Purchase
  is **gated behind Twilio's compliance-profile review** (normal for new accounts; clears
  in hours–2 business days, email confirms). Compliance profile submitted as **Direct
  Customer**, legal business name per IRS CP 575.
- **Retell:** workspace "PJN Dental" created. Conductor wizard built a starter Receptionist
  agent (voice Cimo, GPT 5.4, ~$0.115/min). Test call was weak — expected, since it's still
  the generic script, not our Dana prompt.
- **Anthropic:** Console account created. Got routed into a developer/terminal quickstart,
  which caused confusion → paused here. API key not yet captured.

## Decisions / clarifications

- Twilio number stays **behind the scenes** — practice's public number is unchanged;
  missed/after-hours calls forward to Twilio. Number only visible to patients on outbound texts.
- 971 is fine (same Portland metro); not worth chasing a 503.
- Anthropic key is **least urgent** — only powers SMS, wired at server-deploy time (days away).
- Model was reset to claude-opus-4-8 mid-session (harness note).

## Open items (owner: Pascal, when home)

1. Retell transplant: provide 4 practice facts (name/hours/address/on-call #) → Claude returns
   Dana prompt → paste + switch model to Claude → re-test.
2. Finish Anthropic API key (`pjn-front-desk`, copy `sk-ant-...`, add $25 credits). Ignore terminal steps.
3. Fire off all 3 BAAs (Twilio, Retell, Anthropic).
4. Once Twilio compliance clears (email): buy the 971 number.

## Artifacts

- Live tracker: `ai-dentist/ai-front-desk/build/SETUP-PROGRESS.md` (resume-here checklist)
- Build scaffold + prompts: `ai-dentist/ai-front-desk/build/`
- Prior assessment: `ai-dentist/ai-front-desk/2026-07-18-arini-clone-assessment.md`
- PR: https://github.com/drpascalnguyen-art/lex-pjn/pull/3
