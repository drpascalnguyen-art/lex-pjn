# AI Phone / Email / Text System — Arini Clone Assessment & Recommendation

**Date:** 2026-07-18 · **For:** Dr. Pascal Nguyen · **Status:** Recommendation — no build started

---

## 1. What Arini actually is

- Purpose-built **AI phone receptionist for dental practices** (Y Combinator W24), deployed across hundreds of DSO locations.
- Handles inbound calls with natural voice, books appointments **directly into the PMS** (Dentrix, Eaglesoft, Open Dental), verifies insurance eligibility, runs recall campaigns, texts back missed calls.
- Philosophy: depth over breadth — phones only, done extremely well.
- **Pricing:** base subscriptions in the $300–$800/mo range (sales call required), but real all-in cost for most practices lands at **$700–$1,400/mo** after setup fees ($500–$3,500 one-time), per-minute overages, PMS integration surcharges, and add-ons (insurance verification, bilingual).
- Reported results: ~80% reduction in missed calls, ~2 staff-hours/day recovered, case studies of 12% revenue lift.

## 2. Can we clone it? Honest answer

**The voice-AI layer: yes, in weeks, not months.** Managed voice-agent platforms (Retell AI, Vapi, Bland) give you the hard parts — telephony, sub-second latency, speech-to-text, text-to-speech, interruption handling — as a service. You supply the brain (Claude + prompts + tools) and the workflows.

**The full Arini: no, not as a side project.** Arini's moat is not the AI — it's:

1. **Deep PMS write-back integrations** (Dentrix/Eaglesoft are closed, legacy, on-prem systems; integration usually goes through middleware like NexHealth or Sikka, which is its own vendor relationship and cost).
2. **HIPAA operations at scale** — BAAs, audit logging, PII redaction, retention policies, SOC 2.
3. **Thousands of hours of dental-call edge cases** baked into their conversation design (emergency triage, insurance nuance, provider-specific scheduling rules).

A clone that answers calls, talks like a competent front desk, takes messages, texts back missed calls, and books into **Open Dental** (the one PMS with a genuinely open API) is very achievable. A clone that matches Arini across all major PMSs is a company, not a project.

## 3. The three paths

### Path A — Buy (fastest fix for the practice)
Trial 2–3 vendors head-to-head for 30 days on the practice's actual missed-call volume:

| Vendor | Angle | Notes |
|---|---|---|
| **Arini** | Phones only, deepest focus | Sales-call pricing; the benchmark |
| **Viva AI** | Full front-office stack | Outbound recall, multilingual, payments, forms, PMS write-back |
| **Annie (Dental Intelligence)** | Ease of use | Direct PMS scheduling, smart FAQ |
| **Peerlogic (Aimee)** | Receptionist + call analytics | Scores calls, surfaces missed opportunities |
| **Weave AI Receptionist** | Bundled with Weave phones | TrueLark acquired by Weave 5/2025 |

Cost: ~$200–$800/mo standalone; expect $700–$1,400/mo all-in for Arini-class service.

### Path B — Build on a managed voice platform (the smart "clone")
Stack recommendation:

- **Voice platform: Retell AI** — HIPAA + SOC 2 Type 2 standard **on every plan** (Vapi charges a $1,000/mo zero-data-retention add-on for HIPAA; that alone kills Vapi for dental). Real all-in cost ~$0.11–$0.25/min; ~$2,800/mo at 10,000 min. A single practice doing ~1,500 min/mo ≈ **$200–$400/mo**.
- **Telephony/SMS: Twilio** with signed BAA (Twilio is HIPAA-eligible on covered products).
- **Brain: Claude API** — Anthropic offers BAAs for HIPAA workflows. Claude drives conversation policy, triage, message-taking, and drafts.
- **Email: Gmail + Claude triage** — classify inbound patient email, auto-draft replies, human clicks send (keep human-in-the-loop for anything clinical).
- **Scheduling: start with request-capture** (AI collects preferred times, staff confirms in PMS) → upgrade to **Open Dental API** or **NexHealth/Sikka middleware** for true write-back later.

MVP scope (2–4 weeks of focused build):
1. AI answers overflow/after-hours calls (don't replace the human on day one — catch what's currently missed).
2. Missed-call instant text-back with booking link/conversation.
3. Message-taking with structured summaries pushed to staff (email/Slack).
4. Emergency triage script (bleeding/swelling/trauma → escalate to on-call).
5. Email inbox triage + drafted replies.

Compliance checklist before any PHI flows: BAA with Retell, Twilio, Anthropic, and Google Workspace; call recordings/transcripts encrypted at rest with a written retention policy; audit log of every AI action.

### Path C — Full custom build (Twilio Media Streams + own STT/TTS)
Maximum control, lowest per-minute cost at scale — and months of engineering on latency, barge-in, and reliability that Retell already solved. **Not recommended** at this stage.

## 4. Recommendation

**Do both A and B, for different reasons:**

1. **For the practice, this quarter: Path A.** Book demos with Arini, Viva, and Annie; run one against real call volume for 30 days. The missed-call revenue recovery pays for itself, and it starts working in days. This is the boring, correct answer for the practice's phones.

2. **For the AI Practice Systems business: Path B as a flagship asset.** Pascal implementing his own Retell + Claude + Twilio front-desk stack — and documenting it — is *exactly* the credibility engine for the membership ("I rebuilt my practice around AI" made concrete). It can become: a course module, a done-with-you offer for members, or eventually a white-label product. Build the MVP scope above against the practice's overflow line so it never risks the main number.

3. **Sequencing:** don't build PMS write-back first. Start with overflow answering + missed-call text-back + email triage (no PHI-heavy integrations, fastest win), sign the BAAs, then add scheduling depth.

**Rough budget, Path B MVP:** ~$200–$400/mo running cost for one practice + one-time build effort. Compare to $700–$1,400/mo for Arini — the delta funds the build, and the build feeds the business.

## 5. Open items

- [ ] Pascal: pick 2–3 vendors for demos (suggest Arini + Viva + Annie) — owner: Pascal
- [ ] Decide: is Path B a practice tool, a course asset, or a member offer? (Affects how it's documented/built) — owner: Pascal
- [ ] If Path B greenlit: sign BAAs (Retell, Twilio, Anthropic, Google) before any patient data flows — owner: Pascal
- [ ] Next session can scaffold the Retell agent config + Claude prompt pack + Twilio missed-call-textback flow — owner: Claude session

## Sources

- [Arini](https://www.arini.ai/) · [Arini review + alternatives (AInora)](https://ainora.lt/blog/arini-ai-dental-receptionist-review-alternatives-2026) · [Dental AI receptionist real costs (Buildberg)](https://www.buildberg.co/blog/dental-ai-receptionist-cost)
- [Viva vs Arini vs Dentina vs TrueLark vs Peerlogic](https://www.getviva.ai/viva-ai-vs-arini-vs-dentina-which-dental-ai-assistant-is-right-for-your-office/) · [2026 platform comparison (Orthia)](https://orthia.io/blog/dental-ai-receptionist-competition) · [TensorLinks 2026 comparison](https://www.tensorlinks.com/blog/best-ai-dental-receptionist-2026/)
- [Vapi vs Retell vs Bland true cost per minute](https://medium.com/@automation.labs/vapi-vs-retell-vs-bland-in-2026-the-true-cost-per-minute-578f38af3523) · [Bland vs Vapi vs Retell pricing & compliance](https://www.whitespacesolutions.ai/content/bland-ai-vs-vapi-vs-retell-comparison) · [Bland pricing](https://www.bland.ai/pricing)
- [Twilio & HIPAA](https://www.twilio.com/en-us/hipaa) · [Twilio HIPAA messaging guide](https://help.twilio.com/articles/360059959413-Building-HIPAA-Compliant-Messaging-Applications-with-Twilio) · [Is Twilio HIPAA compliant (AccountableHQ)](https://www.accountablehq.com/post/is-twilio-hipaa-compliant-baa-covered-services-and-how-to-use-twilio-with-phi)
