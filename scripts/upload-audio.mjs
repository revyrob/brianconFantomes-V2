/**
 * One-time setup: uploads audio files to Supabase Storage (private 'audio' bucket).
 * Run after creating the bucket in the Supabase dashboard.
 *
 * Usage:
 *   node --env-file=.env scripts/upload-audio.mjs
 *
 * Prerequisites in .env:
 *   SUPABASE_URL=https://xxxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...
 */

import { createClient } from "@supabase/supabase-js";
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
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey || supabaseUrl.includes("YOUR_")) {
    console.error("❌  Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file first.");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  let uploaded = 0;
  let skipped = 0;

  for (const { dir, prefix, label } of LANGS) {
    console.log(`\n📁  ${label} — ${dir}`);

    if (!existsSync(dir)) {
      console.warn(`    ⚠  Directory not found. Run 'npm run build' first.`);
      skipped += 9;
      continue;
    }

    for (let i = 1; i <= 9; i++) {
      const filePath = join(dir, `Chpt${i}.mp3`);

      if (!existsSync(filePath)) {
        console.warn(`    ⚠  Missing: Chpt${i}.mp3`);
        skipped++;
        continue;
      }

      const buffer = readFileSync(filePath);
      const key = `${prefix}/${i}.mp3`;
      const sizeMB = (buffer.length / 1024 / 1024).toFixed(1);

      process.stdout.write(`    ${key} (${sizeMB} MB)… `);

      const { error } = await supabase.storage
        .from("audio")
        .upload(key, buffer, { contentType: "audio/mpeg", upsert: true });

      if (error) {
        console.log(`❌  ${error.message}`);
      } else {
        console.log("✓");
        uploaded++;
      }
    }
  }

  console.log(`\n✅  Done! ${uploaded} files uploaded to Supabase Storage.`);
  if (skipped > 0) console.log(`⚠   ${skipped} file(s) skipped.`);
  console.log("\nNext: deploy and test a full purchase at https://brianconfantomes.com");
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
