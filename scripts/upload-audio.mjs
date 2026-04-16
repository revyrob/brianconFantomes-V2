/**
 * One-time setup script: uploads your audio MP3s to Netlify Blobs (private storage).
 * Run this ONCE before going live. After uploading, the files are served securely
 * through the download-audio function and are no longer needed in the build folder.
 *
 * Prerequisites:
 *   1. Make sure your .env file has NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN set
 *      - NETLIFY_SITE_ID:   Netlify dashboard → Site settings → General → Site ID
 *      - NETLIFY_AUTH_TOKEN: app.netlify.com/user/applications → Personal access tokens
 *
 * Usage:
 *   node --env-file=.env scripts/upload-audio.mjs
 *
 *   (Node 20+ supports --env-file. For older Node, use: npx dotenv-cli node scripts/upload-audio.mjs)
 */

import { getStore } from "@netlify/blobs";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const LANGS = [
  { dir: join(ROOT, "build", "audio", "audioFra"), prefix: "fr", label: "Français" },
  { dir: join(ROOT, "build", "audio", "audioAng"), prefix: "en", label: "English" },
];

async function main() {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_AUTH_TOKEN;

  if (!siteID || !token || siteID.includes("YOUR_") || token.includes("YOUR_")) {
    console.error("❌  Set NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN in your .env file first.");
    console.error("    NETLIFY_SITE_ID:    Netlify dashboard → Site settings → General → Site ID");
    console.error("    NETLIFY_AUTH_TOKEN: app.netlify.com/user/applications → Personal access tokens");
    process.exit(1);
  }

  const store = getStore({ name: "audio-files", siteID, token });

  let uploaded = 0;
  let skipped = 0;

  for (const { dir, prefix, label } of LANGS) {
    console.log(`\n📁  ${label} — reading from ${dir}`);

    if (!existsSync(dir)) {
      console.warn(`    ⚠  Directory not found: ${dir}`);
      console.warn(`    Make sure you have run "npm run build" first.`);
      skipped += 9;
      continue;
    }

    for (let i = 1; i <= 9; i++) {
      const filePath = join(dir, `Chpt${i}.mp3`);

      if (!existsSync(filePath)) {
        console.warn(`    ⚠  Not found: Chpt${i}.mp3`);
        skipped++;
        continue;
      }

      const buffer = readFileSync(filePath);
      const key = `${prefix}/${i}.mp3`;
      const sizeMB = (buffer.length / 1024 / 1024).toFixed(1);

      process.stdout.write(`    Uploading Ch.${i} (${sizeMB} MB)… `);
      await store.set(key, buffer);
      console.log("✓");
      uploaded++;
    }
  }

  console.log(`\n✅  Done! ${uploaded} files uploaded to Netlify Blobs.`);

  if (skipped > 0) {
    console.log(`⚠   ${skipped} file(s) were skipped (not found).`);
  }

  console.log("\nNext steps:");
  console.log("  1. Add these environment variables in Netlify dashboard → Site settings → Environment variables:");
  console.log("     PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_LIVE, RESEND_API_KEY, SITE_URL");
  console.log("  2. Deploy your site: git push");
  console.log("  3. Test a purchase using PayPal sandbox credentials.");
}

main().catch((err) => {
  console.error("❌  Upload failed:", err.message);
  process.exit(1);
});
