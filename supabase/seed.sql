-- ============================================================
-- Briançon Fantômes — Supabase seed
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. user_profile table
--    One row per registered user, created/updated by the server
--    (Netlify Function) using the service role key after payment.
CREATE TABLE IF NOT EXISTS public.user_profile (
  id              UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT        NOT NULL,
  product         TEXT        NOT NULL DEFAULT '',   -- 'fr' | 'en' | 'both'
  paid            BOOLEAN     NOT NULL DEFAULT FALSE,
  start_date      TIMESTAMPTZ,
  end_date        TIMESTAMPTZ,                        -- access expires after 7 days
  paypal_order_id TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Row Level Security — users can only read their own row.
--    Writes always come from the server (service role bypasses RLS).
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON public.user_profile;

CREATE POLICY "Users can read own profile"
  ON public.user_profile
  FOR SELECT
  USING (auth.uid() = id);

-- 3. Auto-update updated_at on every change
DROP TRIGGER IF EXISTS trg_user_profile_updated_at ON public.user_profile;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_user_profile_updated_at
  BEFORE UPDATE ON public.user_profile
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
