-- Website-hosted "Submit Your Startup" form (replaces the Google Form).
--
-- Adds the form's remaining fields to `startups`, gates new rows behind an
-- approval status, and splits public vs. private data with a view so the
-- anon key can only ever read public columns.
--
-- Run this in the Supabase SQL editor before deploying the new form.

-- 1. New columns -------------------------------------------------------------

-- Public: rendered in the directory.
alter table public.startups add column if not exists solution text;

-- Private: collected by the form, never exposed to the browser.
alter table public.startups add column if not exists submitter_email  text;
alter table public.startups add column if not exists contact_person   text;
alter table public.startups add column if not exists funding_raised   text;
alter table public.startups add column if not exists funding_timeline text;
alter table public.startups add column if not exists pitchbook_opt_in text;

-- Workflow.
alter table public.startups add column if not exists status       text not null default 'pending';
alter table public.startups add column if not exists source       text not null default 'website';
alter table public.startups add column if not exists submitted_at timestamptz not null default now();

alter table public.startups drop constraint if exists startups_status_check;
alter table public.startups add constraint startups_status_check
  check (status in ('pending', 'approved', 'rejected'));

-- 2. Backfill ----------------------------------------------------------------
-- Everything already in the table is live today, so it stays live. The default
-- above only applies to rows inserted from here on.

update public.startups
   set status = 'approved',
       source = 'google_form'
 where status is distinct from 'approved'
   and submitted_at < now();

create index if not exists startups_status_idx on public.startups (status);

-- 3. Lock the table down -----------------------------------------------------
-- No policies are created for anon/authenticated, so RLS denies all direct
-- reads and writes from the browser. Server routes use the service-role key,
-- which bypasses RLS.

alter table public.startups enable row level security;

revoke all on public.startups from anon, authenticated;

-- 4. Public view -------------------------------------------------------------
-- security_invoker = false (the default) means the view runs as its owner and
-- so reads through the RLS above. Only approved rows, only public columns.

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
         display_founders
    from public.startups
   where status = 'approved';

grant select on public.startups_public to anon, authenticated;
