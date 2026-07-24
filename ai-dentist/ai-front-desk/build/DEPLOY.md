# Deploying the AI Front Desk server — step by step

Everything Claude could pre-build is done: the server, the Render blueprint (`render.yaml`),
practice facts pre-filled, and the `/health` check. What's left are the few actions that
require *your* accounts/card/secrets. Do them in this order.

## Prerequisites (gather into your password manager first)
- [ ] Twilio **Account SID** (`AC…f743`) and **Auth Token** — Twilio Console home page
- [ ] Twilio **phone number** (the 971 — buy it first, step 0)
- [ ] Anthropic **API key** (`sk-ant-…`)
- [ ] **Staff alert phone** — the cell/number that should receive lead + message + emergency texts
- [ ] **On-call phone** — emergency escalation number
- [ ] (optional) A **Retell webhook secret** — any random string you make up; you'll paste the
      same value into Retell's function webhook config later

## Step 0 — Buy the Twilio number (now that the profile is approved)
Twilio Console → Phone Numbers → Buy a number → 971, Local, SMS+MMS+Voice → Buy. Save it.

## Step 1 — Create the Render service from the blueprint
1. Go to **render.com** → sign up (GitHub login is easiest) → **New → Blueprint**.
2. Connect the **drpascalnguyen-art/lex-pjn** repo, branch `claude/ai-phone-email-text-peufgz`
   (or `main` after this PR merges).
3. Render reads `render.yaml`. If it asks for the **Root Directory**, set it to
   `ai-dentist/ai-front-desk/build`.
4. It will show the service `pjn-ai-front-desk` with the non-secret env vars pre-filled.

## Step 2 — Paste the secrets (the `sync:false` ones)
In the service's **Environment** tab, fill each secret from your password manager:
`ANTHROPIC_API_KEY`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_NUMBER`,
`STAFF_ALERT_PHONE`, `ON_CALL_PHONE`, `RETELL_WEBHOOK_SECRET`.
(Phone numbers in E.164 format, e.g. `+15035551234`.)

## Step 3 — Deploy & verify
1. Click **Create / Deploy**. Wait for the build to go green.
2. Copy your service URL (looks like `https://pjn-ai-front-desk.onrender.com`).
3. Visit `https://<your-url>/health` — should return `{"ok":true}`. That's the server live.

## Step 4 — Point Twilio's Messaging webhook at the server
Twilio Console → your 971 number → **Messaging** → "A message comes in" →
Webhook → `https://<your-url>/webhooks/twilio/sms` (HTTP POST). Save.
(Text the number from your cell — the AI should reply.)

## Step 5 — Point Twilio's Voice at Retell + import the number in Retell
- Retell dashboard → Phone Numbers → import/connect the Twilio number (Retell gives you the
  exact voice webhook or SIP settings to paste into the Twilio number's **Voice** config).
- Set the Retell **post-call webhook** to `https://<your-url>/webhooks/retell/post-call`
  (this powers missed-call text-back).

## Step 6 — Add Retell custom functions (now that the server has a URL)
In the Retell agent, add the 3 functions from `retell/functions.json`, each pointing at
`https://<your-url>/webhooks/retell`, and set the shared secret header to your
`RETELL_WEBHOOK_SECRET`.

## Step 7 — A2P 10DLC + call forwarding + BAAs + test
- A2P registration (Twilio Messaging → Regulatory Compliance) — needed for reliable texting.
- Office phones: forward no-answer/busy/after-hours → the 971 number.
- Sign BAAs: Twilio, Retell, Anthropic — before real patient traffic.
- Run the test plan in `README.md`, then flip forwarding on. Live.

## What Claude cannot do for you (and why)
- **Buy the number / create paid accounts** — charges your card.
- **Deploy** — uses your Render login.
- **Enter secret keys** — they must never be pasted into a chat; you put them straight into
  Render's encrypted env store.
Everything else (code, config, practice facts, prompts, this guide) is already done.
