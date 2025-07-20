export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { verifyPassword } from '@/lib/authUtils';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('investors')
      .select('email,name,password')
      .eq('email', email)
      .single();
    if (error || !data) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    if (!verifyPassword(data.password, password)) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    const user = { email: data.email, name: data.name, type: 'investor' };
    const response = NextResponse.json({ success: true });
    response.cookies.set('user', JSON.stringify(user), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
      sameSite: 'strict',
      httpOnly: false,
    });
    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
