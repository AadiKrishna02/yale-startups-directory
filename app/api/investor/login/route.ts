export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { hashPassword, verifyPassword } from '@/lib/authUtils';
import { createSessionCookie } from '@/lib/session';
import { 
  sanitizeInput, 
  isValidEmail, 
  checkRateLimit,
  SECURITY_CONFIG 
} from '@/lib/security';

// A well-formed hash that no password matches, used to equalise timing.
const DUMMY_PASSWORD_HASH = hashPassword('unused-placeholder-for-timing');

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
      
    // Verify against a dummy hash when the email is unknown, so both paths cost
    // the same scrypt work. Returning early leaked which emails are registered.
    const storedHash = data?.password ?? DUMMY_PASSWORD_HASH;
    const passwordMatches = verifyPassword(storedHash, password);

    if (error || !data || !passwordMatches) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    const user = { email: data.email, name: data.name, type: 'investor' as const };

    const sessionCookie = createSessionCookie(user);
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Login is temporarily unavailable.' },
        { status: 503 }
      );
    }

    const response = NextResponse.json({ success: true });
    
    // Use secure cookie settings
    response.cookies.set('user', sessionCookie, {
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
