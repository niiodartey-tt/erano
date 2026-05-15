-- Migration: 001_fix_notifications_rls.sql
-- Sprint 15 — Security fix HIGH-01
-- Run in Supabase SQL Editor. Do NOT run via automated migration tooling.

-- system_insert_notifications was removed: service role bypasses RLS.
-- All notification inserts happen server-side via service role client (lib/supabase-server.ts).
-- admins_insert_notifications covers admin-initiated inserts if ever needed via anon key.
-- With this open policy present, any authenticated user could inject notifications
-- for any user_id (including admin) via the Supabase REST API using the public anon key.

DROP POLICY IF EXISTS "system_insert_notifications" ON notifications;
