-- Migration: 002_fix_audit_log_rls.sql
-- Sprint 15 — Security fix LOW-03
-- Run in Supabase SQL Editor. Do NOT run via automated migration tooling.

-- no_client_access and admins_read_audit were identical policies on audit_log FOR SELECT.
-- The name "no_client_access" was misleading (implied DENY/USING(false)) but the body
-- was a GRANT-to-admins policy. Dropping the duplicate; admins_read_audit is kept.

DROP POLICY IF EXISTS "no_client_access" ON audit_log;
