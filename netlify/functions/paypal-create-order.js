const PAYPAL_BASE =
  process.env.PAYPAL_LIVE === "true"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const PRODUCTS = {
  fr: { amount: "5.00", description: "Briançon Fantômes - Version Française" },
  en: { amount: "5.00", description: "Briançon Fantômes - English Version" },
  both: { amount: "8.00", description: "Briançon Fantômes - FR + EN" },
};

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
    const { product } = JSON.parse(event.body);
    const productInfo = PRODUCTS[product];

    if (!productInfo) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid product" }),
      };
    }

    const token = await getAccessToken();

    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: "EUR", value: productInfo.amount },
            description: productInfo.description,
          },
        ],
      }),
    });

    const order = await res.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: order.id }),
    };
  } catch (err) {
    console.error("paypal-create-order error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to create order" }),
    };
  }
};
