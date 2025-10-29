export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { hashPassword } from '@/lib/authUtils';
import { 
  sanitizeInput, 
  isValidEmail, 
  isValidPassword, 
  checkRateLimit,
  SECURITY_CONFIG 
} from '@/lib/security';

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`signup:${ip}`, SECURITY_CONFIG.RATE_LIMITS.signup)) {
      return NextResponse.json({ error: 'Too many signup attempts. Please try again later.' }, { status: 429 });
    }

    const { email, name, firm, title, password } = await request.json();
    
    // Input validation
    if (!email || !name || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate password strength
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json({ 
        error: 'Password requirements not met', 
        details: passwordValidation.errors 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email.toLowerCase());
    const sanitizedName = sanitizeInput(name);
    const sanitizedFirm = firm ? sanitizeInput(firm) : null;
    const sanitizedTitle = title ? sanitizeInput(title) : null;

    // Validate name format
    if (!SECURITY_CONFIG.VALIDATION.name.allowedChars.test(sanitizedName)) {
      return NextResponse.json({ error: 'Invalid name format' }, { status: 400 });
    }

    const hashed = hashPassword(password);
    
    const { error } = await supabase
      .from('investors')
      .insert({ 
        email: sanitizedEmail, 
        name: sanitizedName, 
        firm: sanitizedFirm, 
        title: sanitizedTitle, 
        password: hashed 
      });
      
    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
      }
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
