# 2026-07-22 — AI Front Desk Progress (Twilio fix, Dana prompt, Codex handoff)

**Session:** Claude Code remote · **File under:** 03 - Projects / AI Dental Institute

## Summary

Continued the AI phone/text front-desk build (Path B). Fixed a Twilio compliance rejection,
produced the finished "Dana" voice prompt with real PJN Dental details, and wrote a handoff
prompt so Codex can complete the Retell agent setup.

## Twilio Business Profile — rejected then fixed

- Checked Pascal's Gmail: Twilio rejected the Business Profile **7/22, Error 18606** =
  "email domain doesn't match website domain" (he'd used a Gmail address).
- Fix: changed the profile's business email to one on the **practice website's domain**
  (email + website now match). Legal name / EIN / website confirmed good.
- Pascal **resubmitted** the profile. Awaiting re-review (~1 day; result to Gmail).
- Account SID on file: AC…f743. Number purchase (971 Beaverton) still gated on approval.

## Retell — Dana prompt finalized

- Practice facts locked: **PJN Dental**, 17535 SW Tualatin Valley Highway, Beaverton, OR
  97003; hours **Mon/Tue/Wed 7am–7pm, closed Thu–Sun**; on-call number still TBD
  (placeholder `[ON-CALL NUMBER]`).
- Filled voice prompt saved: `ai-dentist/ai-front-desk/build/prompts/receptionist-voice-FILLED.md`
- **Handoff:** Pascal will have **Codex** complete the Retell setup. Wrote a full Codex
  prompt: `ai-dentist/ai-front-desk/build/CODEX-PROMPT-retell-setup.md` — instructs Codex to
  paste Dana, switch model GPT 5.4 → Claude (Sonnet), keep guardrails, NOT add custom
  functions yet, run 3 test conversations, and flag the on-call placeholder.

## Remaining roadmap for phone automation (given to Pascal)

1. Twilio approval → buy 971 number *(blocked on review)*
2. Finish Retell/Dana — paste prompt + Claude model *(Codex, unblocked now)*
3. Deploy server.js (Render/Railway) — powers text-back, SMS, staff alerts *(Claude-led)*
4. Wire number: Voice webhook → Retell, Messaging webhook → server *(quick)*
5. A2P 10DLC texting registration *(after profile approval)*
6. Office call-forwarding: no-answer/busy/after-hours → Twilio number
7. Sign 3 BAAs (Twilio, Retell, Anthropic) before real patient calls
8. End-to-end test → go live

## Open items (owner: Pascal)
- [ ] Run the Codex prompt to finish Dana
- [ ] Supply real on-call/emergency number
- [ ] Finish Anthropic API key (`pjn-front-desk`) + $25 credits
- [ ] Watch Gmail for Twilio approval → buy number
- [ ] Fire off 3 BAA requests

## Artifacts
- Codex handoff prompt: `ai-dentist/ai-front-desk/build/CODEX-PROMPT-retell-setup.md`
- Filled Dana prompt: `ai-dentist/ai-front-desk/build/prompts/receptionist-voice-FILLED.md`
- Live tracker: `ai-dentist/ai-front-desk/build/SETUP-PROGRESS.md`
- PR: https://github.com/drpascalnguyen-art/lex-pjn/pull/3
