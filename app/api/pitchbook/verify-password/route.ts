export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Set your pitchbook access password here
const PITCHBOOK_PASSWORD = process.env.PITCHBOOK_PASSWORD || 'yale2024';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === PITCHBOOK_PASSWORD) {
      // Set a cookie to remember they have access
      const response = NextResponse.json({ success: true });
      response.cookies.set('pitchbook_access', 'granted', {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        httpOnly: true,
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
