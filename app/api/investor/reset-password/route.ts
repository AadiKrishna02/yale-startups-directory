export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}
import { hashPassword } from '@/lib/authUtils';
import {
  sanitizeInput,
  isValidPassword,
  checkRateLimit,
} from '@/lib/security';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`reset-password:${ip}`, 5)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json({
        error: 'Password requirements not met',
        details: passwordValidation.errors,
      }, { status: 400 });
    }

    const sanitizedToken = sanitizeInput(token);

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    const { data: resetRow, error: fetchError } = await supabase
      .from('investor_password_reset_tokens')
      .select('investor_email, expires_at')
      .eq('token', sanitizedToken)
      .single();

    if (fetchError || !resetRow) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link. Please request a new one.' },
        { status: 400 }
      );
    }

    const expiresAt = new Date(resetRow.expires_at);
    if (expiresAt < new Date()) {
      await supabase
        .from('investor_password_reset_tokens')
        .delete()
        .eq('token', sanitizedToken);
      return NextResponse.json(
        { error: 'This reset link has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(password);

    const { error: updateError } = await supabase
      .from('investors')
      .update({ password: hashedPassword })
      .eq('email', resetRow.investor_email);

    if (updateError) {
      console.error('Failed to update password:', updateError);
      return NextResponse.json(
        { error: 'Failed to reset password. Please try again.' },
        { status: 500 }
      );
    }

    await supabase
      .from('investor_password_reset_tokens')
      .delete()
      .eq('token', sanitizedToken);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Reset password error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
