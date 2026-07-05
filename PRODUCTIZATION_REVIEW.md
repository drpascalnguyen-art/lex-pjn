# Lex PJN Productization Review — PJNA-214

Status: approval-ready private beta. Do not publish, sell, or enable checkout until Pascal approves the decisions below.

## What is ready

- Static PWA source lives in this repo.
- Home screen now frames the app as a private daily priming system.
- Start Here guidance is visible before protocol selection.
- Local progress tracking is built into `localStorage` under `lex-pjn-progress-v1`.
- No account, cloud sync, PHI capture, payment, or external data transfer is implemented.
- Safety footer says: `Not medical advice`.

## Recommended approval defaults

Use these unless Pascal overrides.

1. Public/private beta name: `Daily Prime by PJN`
2. Positioning line: `A privacy-first morning and evening reset app for calm leadership, focused work, and daily follow-through.`
3. First monetization path: private waitlist first, not checkout-first.
4. First price test: $19/month or $149/year after a free private beta.
5. Launch scope: non-clinical productivity/wellness tool only.
6. Claims boundary: no diagnosis, treatment, sleep/mental-health claims, or patient-specific advice.
7. Privacy stance: reflections stay on-device unless the user intentionally exports or submits them later.

## Approval gates before public launch

- Final public name.
- Pricing.
- Privacy policy and terms URL.
- Waitlist/checkout platform.
- Whether Pascal wants this to remain personal/private, open as a waitlist, or become a paid micro-product.
- Review of any public health/wellness language.

## QA checklist completed locally

- Inline JSX/JavaScript extracted from `index.html` and syntax-checked with Node.
- Manifest JSON parsed successfully.
- Static files confirmed present: `index.html`, `manifest.json`, `sw.js`, app icons.
- No payment script, analytics script, external form, or checkout URL found in the repo.

## Recommended next move

Move PJNA-214 to blocked after this pass because the remaining work is owner approval, not agent execution. Once Pascal approves name/price/privacy/waitlist route, the next agent task is: build the waitlist landing route and deploy/publish checklist.
