const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { paymentIntentId, userToken } = JSON.parse(event.body);

    if (!paymentIntentId || !userToken) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 1. Verify the Supabase user from their session token
    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(userToken);

    if (authError || !user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid session" }),
      };
    }

    // 2. Verify the payment with Stripe — product comes from the
    // PaymentIntent's own metadata (set at creation time), never from
    // the client request, so a caller can't claim a cheaper purchase.
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      throw new Error(`Payment not completed: ${paymentIntent.status}`);
    }

    const product = paymentIntent.metadata?.product;
    if (!product) {
      throw new Error("Payment is missing product metadata");
    }

    // 3. Update user_profile in Supabase (7-day access)
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + SEVEN_DAYS_MS);

    const { error: upsertError } = await supabaseAdmin
      .from("user_profile")
      .upsert({
        id: user.id,
        email: user.email,
        product,
        paid: true,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        stripe_payment_intent_id: paymentIntentId,
        updated_at: startDate.toISOString(),
      });

    if (upsertError) throw new Error(`DB upsert failed: ${upsertError.message}`);

    // 4. Send confirmation email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const siteUrl = process.env.SITE_URL || "https://brianconfantomes.com";
    const expiryFr = endDate.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const expiryEn = endDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const isFr = product === "fr" || product === "both";
    const isEn = product === "en" || product === "both";
    const isBoth = product === "both";

    await resend.emails.send({
      from: "Briançon Fantômes <noreply@brianconfantomes.com>",
      to: user.email,
      subject:
        product === "en"
          ? "Your Briançon Fantômes access is ready!"
          : "Votre accès Briançon Fantômes est prêt !",
      html: buildEmailHtml({ product, siteUrl, expiryFr, expiryEn, isFr, isEn, isBoth }),
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("stripe-confirm-payment error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Payment confirmation failed" }),
    };
  }
};

function buildEmailHtml({ product, siteUrl, expiryFr, expiryEn, isFr, isEn, isBoth }) {
  const productLabel = isBoth
    ? "Briançon Fantômes (FR + EN)"
    : product === "fr"
    ? "Briançon Fantômes — Version Française"
    : "Briançon Fantômes — English Version";

  const thankYou = isBoth ? "Merci ! / Thank you!" : isFr ? "Merci !" : "Thank you!";
  const btnLabel = isBoth ? "Écouter / Listen" : isFr ? "Écouter les chapitres" : "Listen to the chapters";
  const frBody = isFr
    ? `<p style="color:#e5e7eb;margin:0 0 8px;">Votre accès est actif. Rendez-vous sur le site, connectez-vous, et écoutez les chapitres directement dans le navigateur — même sans connexion une fois mis en cache !</p>`
    : "";
  const enBody = isEn
    ? `<p style="color:#e5e7eb;margin:0 0 8px;">Your access is active. Visit the site, sign in, and listen to the chapters right in the browser — even offline once cached!</p>`
    : "";
  const expiry = [
    isFr ? `⏱ Accès valide jusqu'au <strong>${expiryFr}</strong>.` : "",
    isBoth ? "<br>" : "",
    isEn ? `⏱ Access valid until <strong>${expiryEn}</strong>.` : "",
  ]
    .filter(Boolean)
    .join("");

  return `<!DOCTYPE html>
<html lang="${product === "en" ? "en" : "fr"}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#111827;font-family:Arial,sans-serif;color:#f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="text-align:center;padding-bottom:24px;">
          <img src="https://brianconfantomes.com/logo512.png" alt="Briançon Fantômes" style="width:90px;">
        </td></tr>
        <tr><td style="background:#1f2937;border-radius:12px;padding:32px;">
          <h1 style="color:#fbbf24;font-size:22px;margin:0 0 4px;">${thankYou}</h1>
          <p style="color:#9ca3af;margin:0 0 20px;font-size:14px;">${productLabel}</p>
          ${frBody}${enBody}
          <div style="text-align:center;margin:28px 0;">
            <a href="${siteUrl}" style="background:#fbbf24;color:#111827;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:16px;display:inline-block;">${btnLabel}</a>
          </div>
          <p style="color:#9ca3af;font-size:13px;margin:0 0 16px;">${expiry}</p>
          <hr style="border:none;border-top:1px solid #374151;margin:20px 0;">
          <p style="color:#9ca3af;font-size:13px;margin:0;">
            Questions ? <a href="mailto:brianconfantomes@gmail.com" style="color:#fbbf24;">brianconfantomes@gmail.com</a>
          </p>
        </td></tr>
        <tr><td style="text-align:center;padding-top:20px;">
          <p style="color:#6b7280;font-size:12px;margin:0;">© Briançon Fantômes — <a href="${siteUrl}" style="color:#6b7280;">${siteUrl.replace("https://", "")}</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
