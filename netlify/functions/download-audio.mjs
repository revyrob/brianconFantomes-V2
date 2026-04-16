import { getStore } from "@netlify/blobs";

// Chapter stop names (same French place names for both language versions)
const CHAPTER_NAMES = [
  "Porte de Pignerol",
  "Chemin de Ronde",
  "Chemin du Fort des Têtes",
  "Rue du Pont d'Asfeld",
  "Rue Domaine Chautard",
  "Place d'Armes",
  "Rue Mercerie",
  "Avenue Vauban",
  "Rue du Pont d'Asfeld (fin)",
];

export default async (request) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const lang = url.searchParams.get("lang");
  const chapterStr = url.searchParams.get("chapter");

  if (!token || !lang || !chapterStr) {
    return new Response("Missing required parameters", { status: 400 });
  }

  if (lang !== "fr" && lang !== "en") {
    return new Response("Invalid language", { status: 400 });
  }

  const chapter = parseInt(chapterStr, 10);
  if (isNaN(chapter) || chapter < 1 || chapter > 9) {
    return new Response("Invalid chapter number", { status: 400 });
  }

  // Validate the download token
  const tokenStore = getStore("download-tokens");
  const tokenData = await tokenStore.getJSON(token);

  if (!tokenData) {
    return new Response("Invalid download link", { status: 404 });
  }

  if (Date.now() > tokenData.expiresAt) {
    return new Response("Download link has expired", { status: 410 });
  }

  // Check the token covers the requested language
  if (tokenData.product !== lang && tokenData.product !== "both") {
    return new Response("This link does not include the requested language", {
      status: 403,
    });
  }

  // Fetch the audio file from Netlify Blobs
  const audioStore = getStore("audio-files");
  const key = `${lang}/${chapter}.mp3`;
  const audioBlob = await audioStore.get(key, { type: "blob" });

  if (!audioBlob) {
    return new Response("Audio file not found — run the upload script first", {
      status: 404,
    });
  }

  const chapterTitle = (CHAPTER_NAMES[chapter - 1] || `Chapter ${chapter}`)
    .replace(/[^a-z0-9\s]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

  const filename = `briancon-fantomes-${lang}-ch${chapter}-${chapterTitle}.mp3`;

  return new Response(audioBlob, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
};
