export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

import {
  REQUIRED_FIELDS,
  StartupSubmission,
  EMPTY_SUBMISSION,
} from '@/lib/startupForm';

// The service-role key bypasses RLS, which is the point: `startups` is closed to
// the anon key so private columns can never be read from the browser.
let supabase: any = null;

try {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.error('Supabase initialization failed:', error);
}

// Generous per-field caps so a paragraph answer fits but a paste bomb doesn't.
const MAX_LENGTHS: Partial<Record<keyof StartupSubmission, number>> = {
  email: 254,
  name: 200,
  stage: 200,
  industry: 200,
  description: 500,
  problem: 5000,
  solution: 5000,
  website: 500,
  founders: 5000,
  team: 200,
  contact_person: 2000,
  funding_raised: 200,
  funding_timeline: 200,
  pitchbook_opt_in: 10,
};

function normalizeWebsite(website: string): string | null {
  const trimmed = website.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Only read keys we know about; ignore anything else the client sends so a
    // caller can't set `status` and publish itself straight to the directory.
    const submission: StartupSubmission = { ...EMPTY_SUBMISSION };

    for (const key of Object.keys(EMPTY_SUBMISSION) as (keyof StartupSubmission)[]) {
      const value = body?.[key];
      if (key === 'display_founders') {
        submission.display_founders = value === true;
      } else if (typeof value === 'string') {
        (submission[key] as string) = value.trim();
      }
    }

    const missing = REQUIRED_FIELDS.filter((field) => !submission[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required field(s): ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    for (const [field, max] of Object.entries(MAX_LENGTHS)) {
      const value = submission[field as keyof StartupSubmission];
      if (typeof value === 'string' && value.length > (max as number)) {
        return NextResponse.json(
          { error: `${field} is too long (max ${max} characters).` },
          { status: 400 }
        );
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 });
    }

    const { data, error } = await supabase
      .from('startups')
      .insert({
        // Public columns.
        name: submission.name,
        description: submission.description,
        industry: submission.industry,
        stage: submission.stage,
        team: submission.team,
        founders: submission.founders,
        problem: submission.problem,
        solution: submission.solution,
        website: normalizeWebsite(submission.website),
        display_founders: submission.display_founders,

        // Private columns — not present in the `startups_public` view.
        submitter_email: submission.email,
        contact_person: submission.contact_person,
        funding_raised: submission.funding_raised,
        funding_timeline: submission.funding_timeline,
        pitchbook_opt_in: submission.pitchbook_opt_in,

        // Held for review; the directory only reads approved rows.
        status: 'pending',
        source: 'website',
        submitted_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to submit startup' }, { status: 500 });
    }

    // Notify an admin that something is waiting for review. A failure here must
    // not lose the submission, which is already saved.
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'aadi.krishna@yale.edu',
            subject: `New startup submission: ${submission.name}`,
            html: `
              <h2>New Startup Submission</h2>
              <p><strong>Startup:</strong> ${submission.name}</p>
              <p><strong>Submitted by:</strong> ${submission.email}</p>
              <p><strong>Stage:</strong> ${submission.stage}</p>
              <p><strong>Sector:</strong> ${submission.industry}</p>
              <p><strong>Yale affiliation:</strong> ${submission.team}</p>
              <p><strong>Description:</strong> ${submission.description}</p>
              <p><strong>Pitchbook opt-in:</strong> ${submission.pitchbook_opt_in}</p>
              <p><strong>Row ID:</strong> ${data.id}</p>
              <p>Set <code>status</code> to <code>approved</code> in Supabase to publish it.</p>
            `,
          }),
        }
      );
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Startup submission error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
