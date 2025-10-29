export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

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
    
    // Check if they have password access via cookie
    const accessCookie = cookieStore.get('pitchbook_access');
    if (accessCookie?.value === 'granted') {
      return NextResponse.json({ hasAccess: true, method: 'password' });
    }

    // Check if user is authenticated
    const userCookie = cookieStore.get('user');
    if (!userCookie) {
      return NextResponse.json({ hasAccess: false });
    }

    const user = JSON.parse(userCookie.value);
    const userEmail = user.type === 'student' ? `${user.netid}@yale.edu` : user.email;

    // Check if they have an approved access request
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('pitchbook_access_requests')
          .select('*')
          .eq('user_email', userEmail)
          .eq('status', 'approved')
          .single();

        if (data && !error) {
          return NextResponse.json({ hasAccess: true, method: 'approved' });
        }
      } catch (dbError) {
        console.error('Database query failed:', dbError);
      }
    }

    return NextResponse.json({ hasAccess: false });
  } catch (error) {
    console.error('Check access error:', error);
    return NextResponse.json({ hasAccess: false });
  }
}
