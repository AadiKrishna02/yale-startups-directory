export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { readSessionCookie, verifySignedValue } from '@/lib/session';

let supabase: any = null;

try {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.error('Supabase initialization failed:', error);
}

export async function GET() {
  try {
    const cookieStore = cookies();
    
    // Check if they have password access via cookie. Signed, so the value
    // cannot simply be typed into the browser's cookie editor.
    const accessCookie = cookieStore.get('pitchbook_access');
    if (verifySignedValue(accessCookie?.value) === 'granted') {
      return NextResponse.json({ hasAccess: true, method: 'password' });
    }

    // Check if user is authenticated
    const user = readSessionCookie(cookieStore.get('user')?.value);
    if (!user) {
      return NextResponse.json({ hasAccess: false });
    }
    const userEmail = user.type === 'student' ? `${user.netid}@yale.edu` : user.email;
    
    // Debug logging
    console.log('Access check for user:', { type: user.type, email: userEmail });

    // For investors, require explicit approval or password access only
    // No automatic access based on user type
    
    // Check if they have an approved access request
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('pitchbook_access_requests')
          .select('*')
          .eq('user_email', userEmail)
          .eq('status', 'approved')
          .single();

        console.log('Database query result:', { data, error });

        if (data && !error) {
          return NextResponse.json({ hasAccess: true, method: 'approved' });
        }
      } catch (dbError) {
        console.error('Database query failed:', dbError);
      }
    }

    console.log('No access found, returning false');
    return NextResponse.json({ hasAccess: false });
  } catch (error) {
    console.error('Check access error:', error);
    return NextResponse.json({ hasAccess: false });
  }
}
