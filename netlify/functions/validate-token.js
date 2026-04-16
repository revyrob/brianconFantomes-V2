const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const token = event.queryStringParameters?.token;

  if (!token) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Missing token" }),
    };
  }

  try {
    const store = getStore("download-tokens");
    const data = await store.getJSON(token);

    if (!data) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "invalid" }),
      };
    }

    if (Date.now() > data.expiresAt) {
      return {
        statusCode: 410,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "expired", expiresAt: data.expiresAt }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: data.product,
        expiresAt: data.expiresAt,
      }),
    };
  } catch (err) {
    console.error("validate-token error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "server_error" }),
    };
  }
};
