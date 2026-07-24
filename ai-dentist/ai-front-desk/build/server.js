// AI Front Desk webhook server — Retell functions, missed-call text-back, SMS agent.
// See README.md for setup. Compliance gate: no real patient traffic until BAAs are signed.

import express from "express";
import twilio from "twilio";
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const {
  PORT = 3000,
  ANTHROPIC_API_KEY,
  ANTHROPIC_MODEL = "claude-sonnet-5",
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
  STAFF_ALERT_PHONE,
  PRACTICE_NAME,
  CITY,
  OFFICE_HOURS,
  ADDRESS,
  RETELL_WEBHOOK_SECRET,
} = process.env;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const smsSystemPrompt = readFileSync(join(__dirname, "prompts", "sms-agent.md"), "utf8")
  .split("---")
  .pop()
  .replaceAll("{{PRACTICE_NAME}}", PRACTICE_NAME)
  .replaceAll("{{CITY}}", CITY)
  .replaceAll("{{OFFICE_HOURS}}", OFFICE_HOURS)
  .replaceAll("{{ADDRESS}}", ADDRESS);

// In-memory SMS conversation state, 24h TTL. v2: move to Postgres for the HIPAA audit trail.
const conversations = new Map();
const DAY_MS = 24 * 60 * 60 * 1000;
function history(phone) {
  const entry = conversations.get(phone);
  if (!entry || Date.now() - entry.updated > DAY_MS) {
    conversations.set(phone, { messages: [], updated: Date.now() });
  }
  return conversations.get(phone);
}

async function sendSms(to, body) {
  return twilioClient.messages.create({ from: TWILIO_NUMBER, to, body });
}

async function alertStaff(text) {
  console.log(`[staff alert] ${text}`);
  if (STAFF_ALERT_PHONE) await sendSms(STAFF_ALERT_PHONE, text);
}

// ---------------------------------------------------------------------------
// Retell mid-call custom functions: request_appointment, take_message, escalate_emergency
// ---------------------------------------------------------------------------
app.post("/webhooks/retell", async (req, res) => {
  if (RETELL_WEBHOOK_SECRET && req.headers["x-retell-signature"] !== RETELL_WEBHOOK_SECRET) {
    return res.status(401).end();
  }
  const { name, args = {} } = req.body;
  try {
    if (name === "request_appointment") {
      await alertStaff(
        `APPT REQUEST: ${args.full_name} (${args.callback_number}) — ${args.reason}. ` +
          `Prefers: ${args.preferred_times}. ${args.is_current_patient ? "Current" : "NEW"} patient. Confirm at open.`
      );
      return res.json({ result: "Request logged. The team will confirm the exact time when the office opens." });
    }
    if (name === "take_message") {
      await alertStaff(`MESSAGE: ${args.full_name} (${args.callback_number}) — ${args.message}`);
      return res.json({ result: "Message delivered to the team." });
    }
    if (name === "escalate_emergency") {
      await alertStaff(`🚨 URGENT: ${args.full_name || "caller"} (${args.callback_number}) — ${args.situation}. Call back ASAP.`);
      return res.json({ result: "Urgent message flagged to the team. Tell the caller someone will call back as soon as possible, and to call 911 if it becomes life-threatening." });
    }
    return res.status(400).json({ error: `unknown function ${name}` });
  } catch (err) {
    console.error(err);
    return res.json({ result: "There was a system hiccup, but the message was logged. Reassure the caller." });
  }
});

// ---------------------------------------------------------------------------
// Retell post-call webhook: text back callers who hung up without completing anything
// ---------------------------------------------------------------------------
app.post("/webhooks/retell/post-call", async (req, res) => {
  res.status(204).end(); // ack immediately; Retell retries on non-2xx
  const call = req.body?.call || req.body || {};
  if ((req.body?.event || "call_analyzed") === "call_started") return;
  try {
    const caller = call.from_number;
    const completed = (call.transcript || "").includes("request_appointment") ||
      (call.call_analysis?.custom_analysis_data?.completed ?? false) ||
      (call.duration_ms ?? 0) > 90_000;
    if (caller && !completed) {
      await sendSms(
        caller,
        `Hi, this is ${PRACTICE_NAME} — looks like we got cut off! Reply here and I can set up an appointment request or take a message for the team.`
      );
      history(caller); // start a fresh SMS thread
    }
  } catch (err) {
    console.error("post-call handler:", err);
  }
});

// ---------------------------------------------------------------------------
// Inbound SMS → Claude conversation. [[STAFF_SUMMARY]] blocks are routed to staff.
// ---------------------------------------------------------------------------
app.post("/webhooks/twilio/sms", async (req, res) => {
  const from = req.body.From;
  const text = (req.body.Body || "").trim();
  const convo = history(from);
  convo.messages.push({ role: "user", content: text });
  convo.updated = Date.now();

  let reply = "Thanks for your message! The team will follow up during office hours.";
  try {
    const response = await anthropic.messages.create({
      model: ANTHROPIC_MODEL,
      max_tokens: 400,
      system: smsSystemPrompt,
      messages: convo.messages.slice(-20),
    });
    reply = response.content.find((b) => b.type === "text")?.text ?? reply;
  } catch (err) {
    console.error("claude:", err);
  }

  const [patientPart, staffSummary] = reply.split("[[STAFF_SUMMARY]]");
  reply = patientPart.trim();
  convo.messages.push({ role: "assistant", content: reply });
  if (staffSummary?.trim()) await alertStaff(`SMS LEAD: ${staffSummary.trim()} (thread: ${from})`);

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(reply);
  res.type("text/xml").send(twiml.toString());
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`AI front desk listening on :${PORT}`));
