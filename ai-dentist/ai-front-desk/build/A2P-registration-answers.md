# A2P 10DLC Registration — copy-paste answers

The texting registration US carriers require before SMS runs reliably. In Twilio:
**Messaging → Regulatory Compliance / A2P 10DLC** (or search "A2P"). You register a **Brand**
(the business) and a **Campaign** (why you text). Number on file: **+1 971-385-6800**.

## Brand (business identity — should mostly auto-fill from the approved profile)
- Legal business name: *(exact IRS/EIN entity name — same as the approved compliance profile)*
- EIN / Tax ID: *(same as compliance profile)*
- Business type: Private / for-profit
- Industry: Healthcare / Dental
- Website: *(the practice website)*
- Address, contact: *(same as compliance profile)*

## Campaign
- **Use case:** Mixed / Customer Care (or "Low Volume Mixed" if offered — fits a single practice)
- **Campaign description:**
  "PJN Dental sends appointment scheduling requests, appointment confirmations, and
  missed-call follow-up texts to patients of the practice. All messaging is in response to a
  patient calling or texting the practice; the practice does not send marketing or promotional
  messages through this number."
- **How do subscribers opt in / consent?**
  "Patients initiate contact by calling or texting the practice's published number. When a
  call is missed, the practice replies by text to continue the conversation. Consent is
  established by the patient's inbound call or text to the practice."
- **Opt-in message / call-to-action:** describe the missed-call flow:
  "When a patient calls and we miss the call, we text them back from our business number to
  offer to schedule or take a message. Patients may reply STOP to opt out at any time."
- **Sample messages** (provide 2–3):
  1. "Hi, this is PJN Dental — looks like we missed your call! Reply here and I can set up an
     appointment request or take a message for the team. Reply STOP to opt out."
  2. "Got it! The team will confirm your exact appointment time when the office opens
     (Mon/Tue/Wed 7am-7pm). Reply STOP to opt out."
  3. "Thanks — I've passed your message to the team, and they'll call you back during office
     hours. Reply STOP to opt out."
- **Opt-out:** patients reply STOP (Twilio handles STOP/UNSUBSCRIBE automatically).
- **Help:** patients reply HELP → response points them to call the office.

## Notes
- Include the "Reply STOP to opt out" language in the actual message templates — carriers
  check that opt-out is honored. (These match the tone of `prompts/sms-agent.md`.)
- Low-volume registration for a single practice usually approves in a few days.
- Once approved, associate the +1 971-385-6800 number with this campaign/Messaging Service.
