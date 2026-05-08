-- ═══════════════════════════════════════════════════════════════════════
-- Erano Consulting — Supabase Schema
-- Apply via: Supabase Dashboard → SQL Editor → Run
-- Tables: 13 | Indexes: 8 | RLS policies: 29 | Seed rows: 6
-- ═══════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────────────
-- 1. EXTENSIONS
-- ─────────────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- ─────────────────────────────────────────────────────────────────────
-- 2. CUSTOM TYPES
-- ─────────────────────────────────────────────────────────────────────

CREATE TYPE account_state AS ENUM (
  'pending',
  'awaiting_agreement',
  'awaiting_payment',
  'awaiting_confirmation',
  'active',
  'expired'
);

CREATE TYPE user_role AS ENUM (
  'client',
  'admin'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'confirmed',
  'rejected'
);

CREATE TYPE document_status AS ENUM (
  'pending',
  'uploaded',
  'reviewed'
);


-- ─────────────────────────────────────────────────────────────────────
-- 3. TABLES
-- ─────────────────────────────────────────────────────────────────────

-- a. users
CREATE TABLE users (
  id                   uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  email                text          UNIQUE NOT NULL,
  role                 user_role     NOT NULL DEFAULT 'client',
  account_state        account_state NOT NULL DEFAULT 'pending',
  must_change_password boolean       NOT NULL DEFAULT true,
  created_at           timestamptz   NOT NULL DEFAULT now()
);

-- b. packages
CREATE TABLE packages (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL,
  description text        NOT NULL,
  price_ghs   numeric(10,2),
  is_active   boolean     NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- c. client_profiles
CREATE TABLE client_profiles (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid        NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  legal_name              text        NOT NULL,
  trading_name            text,
  reg_number              text,
  business_type           text        NOT NULL,
  industry                text        NOT NULL,
  country                 text        NOT NULL DEFAULT 'Ghana',
  contact_name            text        NOT NULL,
  contact_role            text        NOT NULL,
  contact_email           text        NOT NULL,
  contact_phone           text        NOT NULL,
  address                 text        NOT NULL,
  services_needed         text[]      NOT NULL DEFAULT '{}',
  turnover_bracket        text        NOT NULL,
  employee_count          integer     NOT NULL,
  has_accountant          boolean     NOT NULL,
  last_audited_year       text,
  gra_registered          boolean     NOT NULL,
  vat_registered          boolean     NOT NULL,
  outstanding_obligations boolean     NOT NULL,
  package_id              uuid        REFERENCES packages(id),
  custom_price_ghs        numeric(10,2),
  created_at              timestamptz NOT NULL DEFAULT now()
);

-- d. agreement_versions
CREATE TABLE agreement_versions (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  content        text        NOT NULL,
  version_number integer     NOT NULL UNIQUE,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- e. invoices
CREATE TABLE invoices (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       uuid        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id      uuid        REFERENCES packages(id),
  invoice_number  text        NOT NULL UNIQUE,
  final_price_ghs numeric(10,2) NOT NULL,
  file_path       text,
  status          text        NOT NULL DEFAULT 'generated'
                              CHECK (status IN ('generated', 'paid')),
  generated_at    timestamptz NOT NULL DEFAULT now()
);

-- f. agreements
CREATE TABLE agreements (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   uuid        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  version_id  uuid        NOT NULL REFERENCES agreement_versions(id),
  accepted_at timestamptz NOT NULL DEFAULT now(),
  ip_address  text
);

-- g. payment_timers
CREATE TABLE payment_timers (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id  uuid        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  started_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  is_active  boolean     NOT NULL DEFAULT true
);

-- h. payment_proofs
CREATE TABLE payment_proofs (
  id                    uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id             uuid           NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  invoice_id            uuid           REFERENCES invoices(id),
  file_url              text           NOT NULL,
  file_path             text           NOT NULL,
  transaction_reference text           NOT NULL,
  amount_paid           numeric(10,2)  NOT NULL,
  currency              text           NOT NULL DEFAULT 'GHS',
  payment_method        text           NOT NULL,
  bank_name             text,
  payment_date          date           NOT NULL,
  notes                 text,
  status                payment_status NOT NULL DEFAULT 'pending',
  uploaded_at           timestamptz    NOT NULL DEFAULT now()
);

-- i. document_requests
CREATE TABLE document_requests (
  id          uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   uuid            NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  admin_id    uuid            NOT NULL REFERENCES users(id),
  title       text            NOT NULL,
  description text            NOT NULL,
  category    text            NOT NULL,
  status      document_status NOT NULL DEFAULT 'pending',
  created_at  timestamptz     NOT NULL DEFAULT now()
);

-- j. document_uploads
CREATE TABLE document_uploads (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id  uuid        NOT NULL REFERENCES document_requests(id) ON DELETE CASCADE,
  client_id   uuid        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_url    text        NOT NULL,
  file_path   text        NOT NULL,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);

-- k. notifications
CREATE TABLE notifications (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type       text        NOT NULL,
  message    text        NOT NULL,
  read       boolean     NOT NULL DEFAULT false,
  link       text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- l. audit_log
CREATE TABLE audit_log (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id    uuid        REFERENCES users(id),
  actor_role  user_role,
  action      text        NOT NULL,
  target_type text,
  target_id   uuid,
  metadata    jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- m. cron_log
CREATE TABLE cron_log (
  id                 uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  job_name           text        NOT NULL,
  ran_at             timestamptz NOT NULL DEFAULT now(),
  records_processed  integer     NOT NULL DEFAULT 0,
  errors_encountered integer     NOT NULL DEFAULT 0,
  error_details      jsonb,
  duration_ms        integer
);


-- ─────────────────────────────────────────────────────────────────────
-- 4. INDEXES (T039)
-- ─────────────────────────────────────────────────────────────────────

CREATE INDEX idx_users_account_state          ON users(account_state);
CREATE INDEX idx_users_role                   ON users(role);
CREATE INDEX idx_notifications_user_read      ON notifications(user_id, read);
CREATE INDEX idx_payment_proofs_client_status ON payment_proofs(client_id, status);
CREATE INDEX idx_payment_proofs_tx_ref        ON payment_proofs(transaction_reference);
CREATE INDEX idx_doc_requests_client_status   ON document_requests(client_id, status);
CREATE INDEX idx_audit_log_target             ON audit_log(target_id, created_at DESC);
CREATE INDEX idx_payment_timers_active_expires ON payment_timers(is_active, expires_at);


-- ─────────────────────────────────────────────────────────────────────
-- 5. ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────────

ALTER TABLE users              ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages           ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreement_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices           ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreements         ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_timers     ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_proofs     ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_requests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_uploads   ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications      ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log          ENABLE ROW LEVEL SECURITY;
ALTER TABLE cron_log           ENABLE ROW LEVEL SECURITY;


-- ─────────────────────────────────────────────────────────────────────
-- 6. RLS POLICIES
-- ─────────────────────────────────────────────────────────────────────

-- users
CREATE POLICY "clients_read_own"
  ON users FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "admins_read_all"
  ON users FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "admins_update_all"
  ON users FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- client_profiles
CREATE POLICY "clients_read_own_profile"
  ON client_profiles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "clients_update_own_profile"
  ON client_profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "admins_all_profiles"
  ON client_profiles FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- invoices
CREATE POLICY "clients_read_own_invoices"
  ON invoices FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "admins_all_invoices"
  ON invoices FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- agreements
CREATE POLICY "clients_read_own_agreements"
  ON agreements FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "clients_insert_own_agreements"
  ON agreements FOR INSERT TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "admins_read_all_agreements"
  ON agreements FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- agreement_versions
CREATE POLICY "all_authenticated_read"
  ON agreement_versions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admins_insert_versions"
  ON agreement_versions FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- payment_timers
CREATE POLICY "clients_read_own_timer"
  ON payment_timers FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "admins_all_timers"
  ON payment_timers FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- payment_proofs
CREATE POLICY "clients_read_own_proofs"
  ON payment_proofs FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "clients_insert_own_proofs"
  ON payment_proofs FOR INSERT TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "admins_all_proofs"
  ON payment_proofs FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- document_requests
CREATE POLICY "clients_read_own_requests"
  ON document_requests FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "admins_all_requests"
  ON document_requests FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- document_uploads
CREATE POLICY "clients_read_own_uploads"
  ON document_uploads FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "clients_insert_own_uploads"
  ON document_uploads FOR INSERT TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "admins_read_all_uploads"
  ON document_uploads FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- notifications
CREATE POLICY "users_read_own_notifications"
  ON notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "users_update_own_notifications"
  ON notifications FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "admins_insert_notifications"
  ON notifications FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "system_insert_notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- audit_log
CREATE POLICY "no_client_access"
  ON audit_log FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "admins_read_audit"
  ON audit_log FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- packages
CREATE POLICY "all_authenticated_read"
  ON packages FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "public_read"
  ON packages FOR SELECT TO anon
  USING (true);

-- cron_log
CREATE POLICY "admins_read_cron"
  ON cron_log FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));


-- ─────────────────────────────────────────────────────────────────────
-- 7. PACKAGE SEED DATA
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO packages (name, description, price_ghs, is_active) VALUES
  ('Free Introductory',  'A no-cost entry point to explore our services with no commitment.',     0.00,     true),
  ('Starter Essentials', 'Core accounting and compliance support for small businesses.',           16500.00, true),
  ('Growth Booster',     'Expanded financial support for businesses in active growth.',            24500.00, true),
  ('Business Pro',       'Full-service accounting, tax advisory, and business support.',           32500.00, true),
  ('Elite Advantage',    'Premium end-to-end financial management for established firms.',         37500.00, true),
  ('Custom',             'Tailored to your exact needs. Price set after consultation.',            NULL,     true);
