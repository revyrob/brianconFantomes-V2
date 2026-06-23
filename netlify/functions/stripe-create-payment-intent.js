const { getStore } = require("@netlify/blobs");
const { Resend } = require("resend");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PRODUCTS = {
  fr: { amount: 500, description: "Briançon Fantômes - Version Française" },
  en: { amount: 500, description: "Briançon Fantômes - English Version" },
  both: { amount: 800, description: "Briançon Fantômes - FR + EN" },
};

const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Returns: "allow" | "block" | "block-and-alert" (first time limit is hit)
async function checkRateLimit(ip) {
  try {
    const store = getStore({ name: "rate-limits", consistency: "strong" });
    const key = `stripe-create:${ip}`;
    const now = Date.now();

    const data = await store.get(key, { type: "json" });

    if (!data || now - data.windowStart >= WINDOW_MS) {
      await store.set(key, JSON.stringify({ count: 1, windowStart: now, alerted: false }));
      return "allow";
    }

    if (data.count >= RATE_LIMIT) {
      // Only alert on the first blocked request, not every subsequent one
      if (!data.alerted) {
        await store.set(key, JSON.stringify({ ...data, alerted: true }));
        return "block-and-alert";
      }
      return "block";
    }

    await store.set(key, JSON.stringify({ ...data, count: data.count + 1 }));
    return "allow";
  } catch {
    return "allow";
  }
}

async function sendSpamAlert(ip) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Briançon Fantômes <noreply@brianconfantomes.com>",
      to: "brianconfantomes@gmail.com",
      subject: "⚠️ Spam alert — Stripe payment intent rate limit hit",
      html: `
        <div style="font-family:Arial,sans-serif;background:#111827;color:#f9fafb;padding:32px;">
          <h2 style="color:#fbbf24;margin:0 0 16px;">⚠️ Rate limit triggered</h2>
          <p>An IP address has made <strong>${RATE_LIMIT}+ requests</strong> to <code>stripe-create-payment-intent</code> within one hour.</p>
          <table style="margin:16px 0;border-collapse:collapse;">
            <tr>
              <td style="color:#9ca3af;padding:4px 12px 4px 0;">IP address</td>
              <td style="color:#f9fafb;font-family:monospace;">${ip}</td>
            </tr>
            <tr>
              <td style="color:#9ca3af;padding:4px 12px 4px 0;">Time</td>
              <td style="color:#f9fafb;">${new Date().toUTCString()}</td>
            </tr>
            <tr>
              <td style="color:#9ca3af;padding:4px 12px 4px 0;">Limit</td>
              <td style="color:#f9fafb;">${RATE_LIMIT} requests / hour</td>
            </tr>
          </table>
          <p style="color:#9ca3af;font-size:13px;">Further requests from this IP are blocked for the rest of the hour. No action needed unless you see repeated alerts.</p>
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

  const rateStatus = await checkRateLimit(ip);

  if (rateStatus === "block-and-alert") {
    await sendSpamAlert(ip);
    return {
      statusCode: 429,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Too many requests. Please try again later." }),
    };
  }

  if (rateStatus === "block") {
    return {
      statusCode: 429,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Too many requests. Please try again later." }),
    };
  }

  try {
    const { product } = JSON.parse(event.body);
    const productInfo = PRODUCTS[product];

    if (!productInfo) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid product" }),
      };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: productInfo.amount,
      currency: "eur",
      description: productInfo.description,
      metadata: { product },
      automatic_payment_methods: { enabled: true },
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (err) {
    console.error("stripe-create-payment-intent error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to create payment" }),
    };
  }
};
