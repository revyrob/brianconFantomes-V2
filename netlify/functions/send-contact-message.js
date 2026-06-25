const { getStore } = require("@netlify/blobs");
const { Resend } = require("resend");

const ALLOWED_REASONS = ["Customer Question", "App Issue", "Other"];
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);
}

const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Returns: "allow" | "block" | "block-and-alert" (first time limit is hit)
async function checkRateLimit(ip) {
  try {
    const store = getStore({ name: "rate-limits", consistency: "strong" });
    const key = `contact-message:${ip}`;
    const now = Date.now();

    const data = await store.get(key, { type: "json" });

    if (!data || now - data.windowStart >= WINDOW_MS) {
      await store.set(key, JSON.stringify({ count: 1, windowStart: now, alerted: false }));
      return "allow";
    }

    if (data.count >= RATE_LIMIT) {
      if (!data.alerted) {
        await store.set(key, JSON.stringify({ ...data, alerted: true }));
        return "block-and-alert";
      }
      return "block";
    }

    await store.set(key, JSON.stringify({ ...data, count: data.count + 1 }));
    return "allow";
  } catch (err) {
    console.error("contact rate limit check failed:", err);
    return "allow";
  }
}

async function sendSpamAlert(resend, ip) {
  try {
    await resend.emails.send({
      from: "Briançon Fantômes <noreply@brianconfantomes.com>",
      to: "brianconfantomes@gmail.com",
      subject: "⚠️ Spam alert — contact form rate limit hit",
      html: `
        <div style="font-family:Arial,sans-serif;background:#111827;color:#f9fafb;padding:32px;">
          <h2 style="color:#fbbf24;margin:0 0 16px;">⚠️ Rate limit triggered</h2>
          <p>An IP address has made <strong>${RATE_LIMIT}+ requests</strong> to <code>send-contact-message</code> within one hour.</p>
          <p style="color:#9ca3af;">IP: <code>${ip}</code> — further requests from it are blocked for the rest of the hour.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send spam alert:", err);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const ip =
    event.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    event.headers["client-ip"] ||
    "unknown";

  const resend = new Resend(process.env.RESEND_API_KEY);
  const rateStatus = await checkRateLimit(ip);

  if (rateStatus === "block-and-alert") {
    await sendSpamAlert(resend, ip);
  }
  if (rateStatus === "block" || rateStatus === "block-and-alert") {
    return {
      statusCode: 429,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Too many requests. Please try again later." }),
    };
  }

  try {
    const { reason, email, message } = JSON.parse(event.body);

    if (!reason || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }
    if (!ALLOWED_REASONS.includes(reason)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid reason" }) };
    }
    if (!EMAIL_RE.test(email)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid email" }) };
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return { statusCode: 400, body: JSON.stringify({ error: "Message too long" }) };
    }

    await resend.emails.send({
      from: "Briançon Fantômes <noreply@brianconfantomes.com>",
      to: "brianconfantomes@gmail.com",
      replyTo: email,
      subject: `WEBSITE CONTACT: ${reason}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#111827;color:#f9fafb;padding:32px;">
          <h2 style="color:#fbbf24;margin:0 0 16px;">New website contact message</h2>
          <table style="margin:0 0 20px;border-collapse:collapse;">
            <tr>
              <td style="color:#9ca3af;padding:4px 12px 4px 0;">Reason</td>
              <td style="color:#f9fafb;">${reason}</td>
            </tr>
            <tr>
              <td style="color:#9ca3af;padding:4px 12px 4px 0;">From</td>
              <td style="color:#f9fafb;">${escapeHtml(email)}</td>
            </tr>
          </table>
          <p style="color:#f9fafb;white-space:pre-wrap;border-top:1px solid #374151;padding-top:16px;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("send-contact-message error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to send message" }),
    };
  }
};
