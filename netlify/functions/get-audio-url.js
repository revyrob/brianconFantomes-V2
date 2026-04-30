const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
  const { lang, chapter } = event.queryStringParameters || {};
  const authHeader = event.headers.authorization || "";
  const userToken = authHeader.replace("Bearer ", "").trim();

  if (!lang || !chapter || !userToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing parameters" }),
    };
  }

  if (!["fr", "en"].includes(lang)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid lang" }) };
  }

  const chapterNum = parseInt(chapter, 10);
  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 9) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid chapter" }),
    };
  }

  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Verify the user's JWT
  const {
    data: { user },
    error: authError,
  } = await supabaseAdmin.auth.getUser(userToken);

  if (authError || !user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  // Check their profile: paid + not expired + correct language
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("user_profile")
    .select("paid, product, end_date")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "No profile found" }),
    };
  }

  if (!profile.paid) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Payment required" }),
    };
  }

  if (new Date(profile.end_date) < new Date()) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Access expired" }),
    };
  }

  if (profile.product !== lang && profile.product !== "both") {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Language not included in purchase" }),
    };
  }

  // Generate a 1-hour signed URL
  const { data: signed, error: signedError } = await supabaseAdmin.storage
    .from("audio")
    .createSignedUrl(`${lang}/${chapterNum}.mp3`, 3600);

  if (signedError || !signed) {
    console.error("Signed URL error:", signedError);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate URL" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: signed.signedUrl }),
  };
};
