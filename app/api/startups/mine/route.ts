export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { readSessionCookie } from '@/lib/session';

// `startups` is closed to the anon key now that it holds private submission
// data, so the account page's reads and writes go through here instead.
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

// Columns the account page is allowed to see and edit. Private submission
// fields (submitter_email, contact_person, funding_*) are deliberately absent.
const EDITABLE_COLUMNS = [
  'name',
  'description',
  'founders',
  'industry',
  'stage',
  'team',
  'website',
  'problem',
  'solution',
  'display_founders',
] as const;

const SELECT_COLUMNS = ['id', 'status', ...EDITABLE_COLUMNS].join(', ');

const normalize = (value: string) => value.replace(/\s+/g, '').toLowerCase();

function getUser() {
  return readSessionCookie(cookies().get('user')?.value);
}

// Mirrors the founder matching the account page used to do client-side.
function isFounder(founders: string | null | undefined, userName: string) {
  if (!founders) return false;
  return founders
    .split(',')
    .map((founder) => normalize(founder))
    .includes(normalize(userName));
}

export async function GET() {
  const user = getUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  if (!supabase) {
    return NextResponse.json({ error: 'Database not available' }, { status: 500 });
  }

  const { data, error } = await supabase.from('startups').select(SELECT_COLUMNS);
  if (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to load startups' }, { status: 500 });
  }

  // Founders are stored as free text, so the match has to happen here rather
  // than in the query. Includes the user's pending submissions.
  const mine = (data as any[]).filter((startup) =>
    isFounder(startup.founders, user.name)
  );

  return NextResponse.json({ startups: mine });
}

export async function PATCH(request: Request) {
  const user = getUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  if (!supabase) {
    return NextResponse.json({ error: 'Database not available' }, { status: 500 });
  }

  const body = await request.json();
  const originalName = typeof body?.originalName === 'string' ? body.originalName : '';
  if (!originalName) {
    return NextResponse.json({ error: 'Missing startup name' }, { status: 400 });
  }

  const { data: existing, error: lookupError } = await supabase
    .from('startups')
    .select('id, founders')
    .eq('name', originalName)
    .maybeSingle();

  if (lookupError) {
    console.error('Database error:', lookupError);
    return NextResponse.json({ error: 'Failed to load startup' }, { status: 500 });
  }
  if (!existing) {
    return NextResponse.json({ error: 'Startup not found' }, { status: 404 });
  }

  // Without this check the service-role key would let any signed-in user edit
  // any listing — which is what the old anon-key update allowed.
  if (!isFounder(existing.founders, user.name)) {
    return NextResponse.json(
      { error: 'You are not listed as a founder of this startup.' },
      { status: 403 }
    );
  }

  const updates: Record<string, any> = {};
  for (const column of EDITABLE_COLUMNS) {
    const value = body?.updates?.[column];
    if (column === 'display_founders') {
      if (typeof value === 'boolean') updates[column] = value;
    } else if (typeof value === 'string') {
      updates[column] = value;
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('startups')
    .update(updates)
    .eq('id', existing.id)
    .select(SELECT_COLUMNS)
    .single();

  if (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to save changes' }, { status: 500 });
  }

  return NextResponse.json({ startup: data });
}
