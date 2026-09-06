export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { readSessionCookie, isAdmin } from '@/lib/session';

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

export async function GET() {
  try {
    const user = readSessionCookie(cookies().get('user')?.value);

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (!isAdmin(user)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 });
    }

    // Fetch all requests, ordered by most recent first
    const { data, error } = await supabase
      .from('pitchbook_access_requests')
      .select('*')
      .order('requested_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
    }

    return NextResponse.json({ requests: data || [] });
  } catch (error) {
    console.error('Admin requests fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
