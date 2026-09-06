export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { readSessionCookie, isAdmin } from '@/lib/session';

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
    // This route had no authentication: anyone who could POST to it could
    // approve their own pitchbook access request.
    const user = readSessionCookie(cookies().get('user')?.value);

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (!isAdmin(user)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const { requestId, status } = await request.json();

    if (!['approved', 'denied'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 });
    }

    // Update the request status
    const { data, error } = await supabase
      .from('pitchbook_access_requests')
      .update({
        status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.email || user.netid || 'admin',
      })
      .eq('id', requestId)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
    }

    // If approved, send approval email
    if (status === 'approved') {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: data.user_email,
            subject: 'Your Yale Startup Pitchbook Access Has Been Approved',
            html: `
              <h2>Access Approved!</h2>
              <p>Hi ${data.user_name},</p>
              <p>Your request to access the Yale Startup Pitchbook has been approved.</p>
              <p>You can now view the pitchbook at: <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://yalepitchbook.com'}/pitchbook">View Pitchbook</a></p>
              <p>Best regards,<br/>Yale Startup Pitchbook Team</p>
            `,
          }),
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Approve request error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
