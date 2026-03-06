export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}
import {
  sanitizeInput,
  isValidEmail,
  checkRateLimit,
  SECURITY_CONFIG,
} from '@/lib/security';

const TOKEN_EXPIRY_HOURS = 1;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`forgot-password:${ip}`, 3)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const sanitizedEmail = sanitizeInput(email.toLowerCase());

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: true });
    }

    // Check if investor exists
    const { data: investor, error: fetchError } = await supabase
      .from('investors')
      .select('email')
      .eq('email', sanitizedEmail)
      .single();

    // Always return success to avoid leaking whether the email exists
    if (fetchError || !investor) {
      return NextResponse.json({ success: true });
    }

    // Delete any existing tokens for this email
    await supabase
      .from('investor_password_reset_tokens')
      .delete()
      .eq('investor_email', sanitizedEmail);

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + TOKEN_EXPIRY_HOURS);

    const { error: insertError } = await supabase
      .from('investor_password_reset_tokens')
      .insert({
        investor_email: sanitizedEmail,
        token,
        expires_at: expiresAt.toISOString(),
      });

    if (insertError) {
      console.error('Failed to store reset token:', insertError);
      return NextResponse.json({ success: true });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    try {
      await fetch(`${baseUrl}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: sanitizedEmail,
          subject: 'Reset your Yale Pitchbook password',
          html: `
            <h2>Reset your password</h2>
            <p>You requested a password reset for your Yale Pitchbook investor account.</p>
            <p><a href="${resetLink}">Click here to reset your password</a></p>
            <p>This link expires in ${TOKEN_EXPIRY_HOURS} hour(s).</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
          `,
        }),
      });
    } catch (emailError) {
      console.error('Failed to send reset email:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Forgot password error:', err);
    return NextResponse.json({ success: true });
  }
}
