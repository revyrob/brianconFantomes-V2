const { getStore } = require("@netlify/blobs");
const { Resend } = require("resend");
const { randomUUID } = require("crypto");

const PAYPAL_BASE =
  process.env.PAYPAL_LIVE === "true"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

async function getAccessToken() {
  const creds = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to get PayPal access token");
  return data.access_token;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { orderID, product, email } = JSON.parse(event.body);

    if (!orderID || !product || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // 1. Capture the PayPal payment
    const accessToken = await getAccessToken();
    const captureRes = await fetch(
      `${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const captureData = await captureRes.json();

    if (captureData.status !== "COMPLETED") {
      throw new Error(`Payment not completed: ${captureData.status}`);
    }

    // 2. Generate a 7-day download token and store it
    const token = randomUUID();
    const expiresAt = Date.now() + SEVEN_DAYS_MS;

    const store = getStore("download-tokens");
    await store.setJSON(token, {
      product,
      email,
      expiresAt,
      paypalOrderId: orderID,
      createdAt: Date.now(),
    });

    // 3. Send download email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const siteUrl = process.env.SITE_URL || "https://brianconfantomes.com";
    const downloadUrl = `${siteUrl}/download?token=${token}`;
    const expiryDate = new Date(expiresAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const expiryDateEn = new Date(expiresAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    await resend.emails.send({
      from: "Briançon Fantômes <noreply@brianconfantomes.com>",
      to: email,
      subject:
        product === "en"
          ? "Your Briançon Fantômes audio walk is ready!"
          : "Votre balade audio Briançon Fantômes est prête !",
      html: buildEmailHtml({ product, downloadUrl, expiryDate, expiryDateEn }),
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("paypal-capture-order error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Payment capture failed" }),
    };
  }
};

function buildEmailHtml({ product, downloadUrl, expiryDate, expiryDateEn }) {
  const isFr = product === "fr" || product === "both";
  const isEn = product === "en" || product === "both";
  const isBoth = product === "both";

  const productLabel = isBoth
    ? "Briançon Fantômes (FR + EN)"
    : product === "fr"
    ? "Briançon Fantômes - Version Française"
    : "Briançon Fantômes - English Version";

  const thankYou = isBoth
    ? "Merci ! / Thank you!"
    : isFr
    ? "Merci !"
    : "Thank you!";

  const frInstructions = isFr
    ? `<p style="color:#e5e7eb;margin:0 0 8px;">Votre balade audio est prête. Cliquez sur le bouton ci-dessous pour télécharger vos fichiers audio avant votre promenade.</p>`
    : "";
  const enInstructions = isEn
    ? `<p style="color:#e5e7eb;margin:0 0 8px;">Your audio walk is ready. Click the button below to download your audio files before your walk.</p>`
    : "";
  const frExpiry = isFr
    ? `⏱ Ce lien est valide jusqu'au <strong>${expiryDate}</strong>.`
    : "";
  const enExpiry = isEn
    ? `⏱ This link is valid until <strong>${expiryDateEn}</strong>.`
    : "";
  const btnLabel = isBoth
    ? "Télécharger / Download"
    : isFr
    ? "Télécharger mes fichiers"
    : "Download my files";
  const closing = isFr
    ? "Profitez de votre visite de la Cité Vauban !"
    : "Enjoy your visit to the Cité Vauban!";
  const questions = isFr ? "Questions ?" : "Questions?";

  return `<!DOCTYPE html>
<html lang="${product === "en" ? "en" : "fr"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Briançon Fantômes</title>
</head>
<body style="margin:0;padding:0;background:#111827;font-family:Arial,sans-serif;color:#f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="text-align:center;padding-bottom:24px;">
          <img src="https://brianconfantomes.com/logo512.png" alt="Briançon Fantômes" style="width:100px;height:auto;">
        </td></tr>
        <tr><td style="background:#1f2937;border-radius:12px;padding:32px;">
          <h1 style="color:#fbbf24;font-size:22px;margin:0 0 4px;">${thankYou}</h1>
          <p style="color:#9ca3af;margin:0 0 20px;font-size:14px;">${productLabel}</p>
          ${frInstructions}${enInstructions}
          <div style="text-align:center;margin:28px 0;">
            <a href="${downloadUrl}"
               style="background:#fbbf24;color:#111827;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:17px;display:inline-block;">
              ${btnLabel}
            </a>
          </div>
          <p style="color:#9ca3af;font-size:13px;margin:0 0 16px;">
            ${frExpiry}${isBoth ? "<br>" : ""}${enExpiry}
          </p>
          <hr style="border:none;border-top:1px solid #374151;margin:20px 0;">
          <p style="color:#9ca3af;font-size:13px;margin:0;">
            ${closing}<br><br>
            ${questions}
            <a href="mailto:brianconfantomes@gmail.com" style="color:#fbbf24;">brianconfantomes@gmail.com</a>
          </p>
        </td></tr>
        <tr><td style="text-align:center;padding-top:20px;">
          <p style="color:#6b7280;font-size:12px;margin:0;">
            © Briançon Fantômes —
            <a href="https://brianconfantomes.com" style="color:#6b7280;">brianconfantomes.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
