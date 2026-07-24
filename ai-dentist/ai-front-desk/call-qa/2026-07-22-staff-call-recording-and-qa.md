# Staff Call Recording & QA — Initiative Brief

**Date:** 2026-07-22 · **For:** Dr. Pascal Nguyen · **Status:** Scoping — awaiting phone-system info

> **This is a SEPARATE system from the AI overflow line (Dana).**
> Dana = AI catches *missed* calls. Call QA = record + analyze *human staff* on the main line
> for training and knowledge. Different plumbing; do not bolt onto the Dana build.

---

## 1. Legality (Oregon + multi-state)

- **Oregon telephone calls = one-party consent** (ORS 165.540(1)(a)). Because staff is on the
  call, that satisfies Oregon law — no announcement legally required *in Oregon*.
- **BUT patients call from other states.** California, Washington, and others are **all-party
  consent** — every party must be told. A single inbound call from a two-party state subjects
  you to their rule.
- **Universal safe practice: announce recording on EVERY call.** Greeting line: *"Thanks for
  calling PJN Dental; your call may be recorded for quality and training."* Compliant in all
  states at once; patients expect it. (Get final sign-off from practice attorney.)
- **HIPAA:** call recordings + transcripts are PHI. Requirements: BAA with whoever stores them,
  encryption at rest, access controls, written retention/deletion policy, secure disposal.
- Note: Oregon *in-person* conversations are all-party (ORS 165.540(1)(c), upheld by 9th Cir.
  en banc Jan 2025) — not relevant to phone QA but good to know for op-room/consult recording.

## 2. Three implementation paths

**Path 1 — Buy a dental call-analytics product (fastest).**
Peerlogic (this was their original product — records, scores, flags missed booking chances,
team performance reports) or Weave. Monthly fee, dashboards, zero build. Live in ~a week.

**Path 2 — Use the existing phone system's built-in recording (cheapest if available).**
Most VoIP systems (RingCentral, Weave, Ooma Office, etc.) have call recording + a recording
announcement toggle built in. Enable it, export recordings, add the Claude analysis layer on
top. ← **Check this first.** *Blocked on: what phone system the practice uses (Pascal to confirm).*

**Path 3 — Build on the Twilio + Claude stack (most powerful, best course asset).**
Record → auto-transcribe (Deepgram/Whisper) → Claude scores each call against a rubric →
per-call scorecards + aggregate trends. "I built my own call-QA system" = flagship course module.

## 3. Recommendation
Confirm the current phone provider first. If it records → Path 2 + Claude analysis layer gets
~80% of the value cheaply. If not → choose Peerlogic (Path 1) or Twilio routing (Path 3).

## 4. Draft Claude analysis rubric — "what a good front-desk call scores on"
Feed each transcript to Claude; return JSON per call. Proposed dimensions (0–5 each + notes):

- **Greeting & identity** — answered promptly, named the practice, warm tone
- **Booking conversion** — if caller was a lead, did staff attempt to book? Offer specific times?
- **Missed opportunity flag** — caller wanted an appointment but didn't get booked (the money metric)
- **New-patient capture** — collected name + callback number + reason
- **Insurance/pricing handling** — accurate, didn't over-promise, routed correctly
- **Clinical-safety** — no diagnosis/advice beyond scope; urgent symptoms escalated properly
- **Empathy & tone** — acknowledged concern, patient-appropriate language
- **Efficiency** — reasonable call length, minimal dead air/holds
- **Resolution** — clear next step for the caller
- **Knowledge gaps** — questions staff couldn't answer (→ FAQ / website / training backlog)

Aggregate outputs: weekly scorecard per team member, top missed-booking reasons, recurring
questions to add to website/FAQ, coaching themes.

## 5. Open items
- [ ] Pascal: identify current phone system / provider → determines Path 2 feasibility — owner: Pascal
- [ ] Pascal: turn on a recording-disclosure greeting on the main line (do this regardless of path) — owner: Pascal
- [ ] Pascal: confirm recording-QA scope w/ practice attorney — owner: Pascal
- [ ] Claude session: once provider known, spec the pipeline + finalize rubric + sample scorecard — owner: Claude session

## Sources
- [Oregon call recording law (RecordPhoneCall)](https://recordphonecall.com/legal/us/oregon/)
- [Oregon Recording Laws 2026 (Recording Law)](https://www.recordinglaw.com/party-two-party-consent-states/oregon-recording-laws/)
- [9th Cir. upholds ORS 165.540(1)(c), Jan 2025 (Barran Liebman)](https://www.barran.com/ealerts/11325-ninth-circuit-upholds-oregons-conversational-privacy-statute-notice-required-to-record-in-person-conversations)
