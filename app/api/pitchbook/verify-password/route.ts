export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  sanitizeInput, 
  checkRateLimit,
  SECURITY_CONFIG 
} from '@/lib/security';
import { signValue } from '@/lib/session';

// Set your pitchbook access password here
const PITCHBOOK_PASSWORD = process.env.PITCHBOOK_PASSWORD || 'yale2024';

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`password-verify:${ip}`, SECURITY_CONFIG.RATE_LIMITS.passwordVerify)) {
      return NextResponse.json({ error: 'Too many password attempts. Please try again later.' }, { status: 429 });
    }

    const { password } = await request.json();

    // Input validation
    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid password format' }, { status: 400 });
    }

    // Sanitize input
    const sanitizedPassword = sanitizeInput(password);

    if (sanitizedPassword === PITCHBOOK_PASSWORD) {
      // Set a cookie to remember they have access
      const accessCookie = signValue('granted');
      if (!accessCookie) {
        return NextResponse.json(
          { error: 'Access is temporarily unavailable.' },
          { status: 503 }
        );
      }

      const response = NextResponse.json({ success: true });
      response.cookies.set('pitchbook_access', accessCookie, {
        ...SECURITY_CONFIG.COOKIE_SETTINGS,
        maxAge: SECURITY_CONFIG.SESSION.pitchbookAccessMaxAge,
      });
      return response;
    } else {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Password verification error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
