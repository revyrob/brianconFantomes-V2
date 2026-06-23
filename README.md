# Briançon Fantômes

Ghost audio walk through the Cité Vauban, Briançon, France.
Available in French and English — [brianconfantomes.com](https://brianconfantomes.com)

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React 18 + Tailwind CSS + Framer Motion |
| Auth | Supabase Auth (email + password) |
| Database | Supabase (`user_profile` table) |
| Audio storage | Supabase Storage (private bucket) |
| Payments | Stripe Payment Intents (Elements) |
| Email | Resend |
| Hosting | Netlify + Serverless Functions |

**Access model:** User registers → pays via Stripe → gets 7-day access → listens in-app.
Audio chapters stream via short-lived signed URLs and are cached by the browser for offline playback while walking in the old town.

---

## First-time Setup

### 1. Supabase — database + auth + storage

**a) Create a project**
1. Go to [supabase.com](https://supabase.com) and sign up for a free account
2. Click **New project**, choose a name (e.g. `briancon-fantomes`) and a strong database password — save the password somewhere safe
3. Wait ~2 minutes for the project to provision

**b) Run the database seed**
1. In the Supabase dashboard go to **SQL Editor** → **New query**
2. Open [`supabase/seed.sql`](supabase/seed.sql), copy the entire file and paste it into the editor
3. Click **Run** — you should see "Success. No rows returned"

**c) Create the private audio storage bucket**
1. Go to **Storage** in the left sidebar → **New bucket**
2. Name: `audio` (must be exactly this)
3. Toggle **Public bucket** → **OFF**
4. Click **Create bucket**

**d) Disable email confirmation (important for smooth UX)**
1. Go to **Authentication** → **Providers** → **Email**
2. Toggle **Confirm email** → **OFF**
3. Click **Save**

Without this, users would need to verify their email before they can log in, interrupting the purchase flow.

**e) Copy your credentials**
Go to **Project Settings** → **API** and copy:

| Value | Environment variable |
|---|---|
| Project URL | `SUPABASE_URL` and `REACT_APP_SUPABASE_URL` |
| `anon` public key | `REACT_APP_SUPABASE_ANON_KEY` |
| `service_role` secret key | `SUPABASE_SERVICE_ROLE_KEY` ⚠️ backend only |

---

### 2. Stripe — payments

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) and create an account
2. Go to **Developers** → **API keys** — stay in **Test mode** for now (toggle top-right)
3. Copy:
   - **Publishable key** (`pk_test_...`) → `VITE_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (`sk_test_...`) → `STRIPE_SECRET_KEY`
4. When ready for real payments: switch to **Live mode** and copy the `pk_live_...` / `sk_live_...` keys instead — no separate flag needed, the key prefix determines the mode

---

### 3. Resend — transactional email

1. Go to [resend.com](https://resend.com) and create a free account (3,000 emails/month free)
2. Go to **Domains** → **Add Domain** → enter `brianconfantomes.com`
3. Add the DNS records they provide to your domain registrar (where you bought the domain)
4. Once the domain shows as **Verified**, go to **API Keys** → **Create API Key** → copy it → `RESEND_API_KEY`

---

### 4. Environment variables

Fill in your `.env` file with all the values above:

```env
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Resend
RESEND_API_KEY=re_...

# Site URL (no trailing slash)
SITE_URL=https://brianconfantomes.com
```

---

### 5. Upload your audio files (one time only)

Audio files must be in Supabase Storage before the site works. The script reads from `build/audio/` — run `npm run build` first if that folder doesn't exist.

```bash
node --env-file=.env scripts/upload-audio.mjs
```

Expected output:
```
Uploading Français...
  fr/1.mp3 (4.2 MB) ✓
  fr/2.mp3 (3.8 MB) ✓
  ...
Uploading English...
  en/1.mp3 (4.1 MB) ✓
  ...
✅ Done! 18 files uploaded to Supabase Storage.
```

Run this again any time you update the audio files.

---

### 6. Local development

```bash
npm install

# Install Netlify CLI once
npm install -g netlify-cli

# Run everything locally (React + Netlify Functions)
netlify dev
```

Use `netlify dev` instead of `npm start` — it makes the serverless functions available at `/.netlify/functions/...` locally.

---

### 7. Deploy to production

```bash
git push
```

Netlify auto-deploys on push. Before going live, set these variables in **Netlify dashboard → Site settings → Environment variables**:

| Variable | Notes |
|---|---|
| `SUPABASE_URL` | |
| `SUPABASE_SERVICE_ROLE_KEY` | Keep secret — never put in frontend |
| `STRIPE_SECRET_KEY` | Keep secret — never put in frontend |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Safe for frontend, bundled at build time |
| `RESEND_API_KEY` | |
| `SITE_URL` | `https://brianconfantomes.com` |

---

### 8. Going live checklist

- [ ] Supabase project created and `seed.sql` run successfully
- [ ] Storage bucket `audio` created (private)
- [ ] Email confirmation disabled in Supabase Auth settings
- [ ] Audio files uploaded (`node --env-file=.env scripts/upload-audio.mjs`)
- [ ] Resend domain verified
- [ ] Stripe Live mode keys set (`pk_live_...` / `sk_live_...`)
- [ ] All environment variables set in Netlify dashboard
- [ ] Test full purchase flow end-to-end with a real card
- [ ] Confirm email arrives and audio plays then caches for offline use

---

## User flow

```
Visitor clicks buy card (🇫🇷 €5 / 🇬🇧 €5 / 🇫🇷🇬🇧 €8)
  → Modal opens: Register or Sign in
  → Authenticated → Stripe payment
  → Payment captured
      → user_profile row created in Supabase (paid: true, end_date: +7 days)
      → confirmation email sent via Resend
  → Audio player appears on the page
  → Each chapter plays via a 1-hour Supabase signed URL
  → Browser caches audio locally (Cache API)
  → Works fully offline while walking in old town
  → Access expires after 7 days
```

---

## Database schema

```sql
user_profile
  id              UUID        -- FK → auth.users(id)
  email           TEXT
  product         TEXT        -- 'fr' | 'en' | 'both'
  paid            BOOLEAN
  start_date      TIMESTAMPTZ
  end_date        TIMESTAMPTZ -- start_date + 7 days
  stripe_payment_intent_id TEXT
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ (auto-updated by trigger)
```

RLS policy: users can only `SELECT` their own row.
All `INSERT`/`UPDATE` is done by Netlify Functions using the `service_role` key (bypasses RLS).

---

## Audio offline caching

No Service Worker is used. Instead the **AudioPlayer** uses the browser **Cache API** directly:

1. On first play, the chapter is fetched via a short-lived Supabase signed URL and stored under a stable key (`/audio/fr/1`, `/audio/en/3`, etc.)
2. On subsequent plays — including when offline — the cached blob is served instantly
3. A **⬇** indicator on each chapter row shows what's already downloaded

This avoids the URL-matching problem that Service Workers would face with signed URLs that change on every request.


What was built
New files:

supabase/seed.sql — run this once in Supabase SQL Editor
README.md — full setup guide (Supabase, Stripe, Resend, deploy checklist)
src/lib/supabase.js — Supabase client
src/hooks/useAuth.js — session + profile state hook
src/components/AudioPlayer/AudioPlayer.js — in-app player with offline caching
netlify/functions/get-audio-url.js — validates user + issues 1-hour signed URL
Updated:

PurchaseModal.js — now has Register / Sign in → Stripe → Success flow
AudioBookLink.js — shows player if paid, buy cards if not, expiry notice if lapsed
stripe-confirm-payment.js — writes to Supabase user_profile instead of Netlify Blobs
scripts/upload-audio.mjs — now uploads to Supabase Storage
Deleted: validate-token.js, download-audio.mjs, DownloadPage component

Your next steps (in order)
✅ Create Supabase account → new project → run supabase/seed.sql → create audio ✅ bucket → disable email confirmation → copy credentials into .env
✅ Upload audio: node --env-file=.env scripts/upload-audio.mjs
Add Supabase vars to Netlify dashboard environment variables
Test with netlify dev — full purchase flow locally