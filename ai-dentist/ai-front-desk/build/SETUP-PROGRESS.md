# AI Front Desk — Setup Progress Tracker

Live status of the account setup. Update as you go. See `README.md` for the full plan.

## Scoreboard (as of 2026-07-21)

| Service | Status | Notes |
|---|---|---|
| **Twilio** | 🟢 Number purchased: **+1 971-385-6800** | Account active (SID AC…f743). Profile approved 7/24. Number bought 7/24 w/ SMS+MMS+Voice. Voice webhook (→Retell) and Messaging webhook (→server) NOT set yet — wait for deploy. SHAKEN/STIR + Voice Integrity = optional/free, skipped. A2P texting registration = still to do (answers pre-written in `A2P-registration-answers.md`). BAA: not yet requested. |
| **Retell** | 🟢 Dana agent configured (via Codex) | Workspace "PJN Dental". Dana prompt pasted, model moved to Claude. Mostly set up. Still pending: (a) real `[ON-CALL NUMBER]` in prompt, (b) 3 custom functions (wait for server deploy), (c) importing the Twilio number once purchased. BAA: not yet requested. |
| **Anthropic** | 🟡 Account created, key pending | Console account made. Got routed into a developer/terminal quickstart and stopped. **To finish:** create an API key named `pjn-front-desk`, copy the `sk-ant-...` string to password manager, add ~$25 credits, request BAA. Ignore all terminal/CLI instructions — not needed. |
| **Server deploy** | ⚪ Not started | Later step; Claude handles the heavy lifting. |

## When you're back home — resume here (in priority order)

1. **Retell — the transplant (biggest visible win).** Give Claude these 4 facts:
   practice name (as patients know it), office hours, street address + parking note,
   on-call/emergency number. Claude returns the finished **Dana prompt**. Then in the
   Retell agent: paste Dana into the prompt, **switch model from GPT 5.4 → a Claude model**,
   re-test in browser. Should sound dramatically better.
2. **Anthropic — finish the key.** console.anthropic.com → API Keys → Create → name
   `pjn-front-desk` → copy `sk-ant-...` to password manager. Add $25 credits. (Ignore terminal steps.)
3. **BAAs — fire off all three** (free paperwork, runs on its own clock, only gates real
   patient traffic): Twilio (search "HIPAA" in console help), Retell (dashboard support),
   Anthropic (console support). One sentence each: "Dental practice handling PHI — please
   execute your BAA."
4. **Twilio — once compliance review clears** (check email): re-run the 971 search, buy the
   number. Then it waits for Retell + server before webhooks get wired.

## Credentials checklist (store in password manager, NEVER commit)
- [ ] Twilio Account SID (`AC...`)
- [ ] Twilio Auth Token
- [ ] Twilio phone number (the 971 once purchased)
- [ ] Anthropic API key (`sk-ant-...`)
- [ ] Retell API key (grab later, from Retell dashboard settings)

## Not-blocking reminders
- Anthropic key only powers the **SMS** side; the **voice** side uses Retell's built-in
  Claude, so voice testing needs no key.
- "Add a phone number" in Retell waits on Twilio's number being purchasable.
- Nothing here touches the practice's public number — it's all forward-to-Twilio.
