export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { verifyPassword } from '@/lib/authUtils';
import { 
  sanitizeInput, 
  isValidEmail, 
  checkRateLimit,
  SECURITY_CONFIG 
} from '@/lib/security';

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`login:${ip}`, SECURITY_CONFIG.RATE_LIMITS.login)) {
      return NextResponse.json({ error: 'Too many login attempts. Please try again later.' }, { status: 429 });
    }

    const { email, password } = await request.json();
    
    // Input validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Sanitize email
    const sanitizedEmail = sanitizeInput(email.toLowerCase());

    const { data, error } = await supabase
      .from('investors')
      .select('email,name,password')
      .eq('email', sanitizedEmail)
      .single();
      
    if (error || !data) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    if (!verifyPassword(data.password, password)) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    const user = { email: data.email, name: data.name, type: 'investor' };
    const response = NextResponse.json({ success: true });
    
    // Use secure cookie settings
    response.cookies.set('user', JSON.stringify(user), {
      ...SECURITY_CONFIG.COOKIE_SETTINGS,
      maxAge: SECURITY_CONFIG.SESSION.maxAge,
      httpOnly: false, // Keep false for client-side access in auth context
    });
    
    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
