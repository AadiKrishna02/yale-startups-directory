export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { hashPassword } from '@/lib/authUtils';

export async function POST(request: Request) {
  try {
    const { email, name, firm, title, password } = await request.json();
    if (!email || !name || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const hashed = hashPassword(password);
    const { error } = await supabase
      .from('investors')
      .insert({ email, name, firm, title, password: hashed });
    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
