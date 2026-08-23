-- ==============================================================================
-- VIETANA PHASE 0 — SUPABASE ATTRIBUTION MIGRATION
-- ==============================================================================
-- This migration adds dedicated columns to the `leads` table in Supabase
-- to store first-touch and last-touch (session) attribution metadata.
--
-- NOTE: Until this SQL is executed in your Supabase SQL Editor, our API
-- safely formats and stores all attribution data inside the `message` column
-- and includes it in the Admin Notification Email to prevent any insertion failures.
-- ==============================================================================

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_term text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS gclid text,
  ADD COLUMN IF NOT EXISTS fbclid text,
  ADD COLUMN IF NOT EXISTS msclkid text,
  ADD COLUMN IF NOT EXISTS landing_page text,
  ADD COLUMN IF NOT EXISTS document_referrer text,
  ADD COLUMN IF NOT EXISTS first_touch_attribution jsonb,
  ADD COLUMN IF NOT EXISTS current_session_attribution jsonb;

-- Create indexes on frequently queried attribution columns for reporting
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON public.leads(utm_source);
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON public.leads(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_leads_gclid ON public.leads(gclid);
