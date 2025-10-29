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

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');
    
    if (!userCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = JSON.parse(userCookie.value);
    const { affiliation, reason } = await request.json();

    if (!supabase) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 });
    }

    // Insert access request into database
    const { data, error } = await supabase
      .from('pitchbook_access_requests')
      .insert({
        user_email: user.type === 'student' ? `${user.netid}@yale.edu` : user.email,
        user_name: user.name,
        user_type: user.type,
        affiliation: affiliation || null,
        reason: reason || null,
        status: 'pending',
        requested_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
    }

    // Send email notification to admin
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'aadi.krishna@yale.edu',
          subject: `New Pitchbook Access Request from ${user.name}`,
          html: `
            <h2>New Pitchbook Access Request</h2>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.type === 'student' ? `${user.netid}@yale.edu` : user.email}</p>
            <p><strong>User Type:</strong> ${user.type}</p>
            ${affiliation ? `<p><strong>Affiliation:</strong> ${affiliation}</p>` : ''}
            ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
            <p><strong>Request ID:</strong> ${data.id}</p>
            <p>To approve this request, visit the admin panel.</p>
          `,
        }),
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true, requestId: data.id });
  } catch (error) {
    console.error('Request access error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
