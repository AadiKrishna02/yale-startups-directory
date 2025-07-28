export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

function parseUserCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const cookie = cookieHeader
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith('user='));
  if (!cookie) return null;
  try {
    return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const user = parseUserCookie(request.headers.get('cookie'));
  if (!user || user.type !== 'investor' || !user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { error } = await supabase
    .from('investors')
    .update({ pdf_seen: true })
    .eq('email', user.email);
  if (error) {
    console.error('Error updating pdf_seen:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
