-- Website-hosted "Submit Your Startup" form (replaces the Google Form).
--
-- Adds the form's remaining fields to `startups`, gates new rows behind an
-- approval status, and splits public vs. private data with a view so the
-- anon key can only ever read public columns.
--
-- Run this in the Supabase SQL editor before deploying the new form.

begin;

-- 1. Row identity ------------------------------------------------------------
-- The table has no id column, so rows could only be addressed by `name` — and
-- the account page lets founders rename a startup. Existing rows are numbered
-- automatically by the identity sequence.
--
-- This does not touch whatever primary key the table already has; it only adds
-- a stable unique handle for the app to use.

alter table public.startups add column if not exists id bigint generated always as identity;

create unique index if not exists startups_id_key on public.startups (id);

-- 2. New columns -------------------------------------------------------------

-- Public: rendered in the directory.
alter table public.startups add column if not exists solution text;

-- Private: collected by the form, never exposed to the browser.
alter table public.startups add column if not exists submitter_email  text;
alter table public.startups add column if not exists contact_person   text;
alter table public.startups add column if not exists funding_raised   text;
alter table public.startups add column if not exists funding_timeline text;
alter table public.startups add column if not exists pitchbook_opt_in text;

-- Workflow. Added without defaults so existing rows land on NULL and can be
-- told apart from anything inserted later; defaults are applied in step 3.
alter table public.startups add column if not exists status       text;
alter table public.startups add column if not exists source       text;
alter table public.startups add column if not exists submitted_at timestamptz;

-- 3. Backfill ----------------------------------------------------------------
-- Everything already in the table is live today, so it stays live. Only rows
-- inserted from here on start out pending.

update public.startups
   set status       = coalesce(status, 'approved'),
       source       = coalesce(source, 'google_form'),
       submitted_at = coalesce(submitted_at, now())
 where status is null
    or source is null
    or submitted_at is null;

alter table public.startups alter column status       set default 'pending';
alter table public.startups alter column source       set default 'website';
alter table public.startups alter column submitted_at set default now();

alter table public.startups alter column status       set not null;
alter table public.startups alter column source       set not null;
alter table public.startups alter column submitted_at set not null;

alter table public.startups drop constraint if exists startups_status_check;
alter table public.startups add constraint startups_status_check
  check (status in ('pending', 'approved', 'rejected'));

create index if not exists startups_status_idx on public.startups (status);

-- 4. Lock the table down -----------------------------------------------------
-- The existing policies granted SELECT and UPDATE to `public`, which is what
-- let any visitor rewrite any listing with the anon key. Both are replaced by
-- server routes holding the service-role key, which bypasses RLS.

drop policy if exists allow_public_select on public.startups;
drop policy if exists allow_all_updates  on public.startups;

alter table public.startups enable row level security;

revoke all on public.startups from anon, authenticated;

-- 5. Public view -------------------------------------------------------------
-- security_invoker = false (the default) means the view runs as its owner and
-- so reads past the RLS above. Only approved rows, only public columns.

drop view if exists public.startups_public;

create view public.startups_public
with (security_invoker = false) as
  select id,
         name,
         description,
         industry,
         founders,
         stage,
         team,
         website,
         problem,
         solution,
         announcement,
         display_founders
    from public.startups
   where status = 'approved';

grant select on public.startups_public to anon, authenticated;

commit;
