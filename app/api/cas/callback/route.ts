export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { createSessionCookie } from '@/lib/session';

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url);

  // The service URL must be byte-identical to the one /api/cas/login sent, or
  // CAS rejects the ticket. Rebuild it from the raw parameter and apply the
  // default only afterwards -- defaulting first appended a `redirect` that the
  // login route never sent, so ticket validation failed and the user was
  // bounced to the homepage with no error.
  const rawRedirect = searchParams.get('redirect');

  const ticket = searchParams.get('ticket');
  if (!ticket) {
    console.error("No ticket provided");
    return NextResponse.redirect(`${origin}/`);
  }

  // 1) Validate the CAS ticket
  const serviceUrlBuilder = new URL('/api/cas/callback', origin);
  if (rawRedirect) {
    serviceUrlBuilder.searchParams.set('redirect', rawRedirect);
  }
  const serviceUrl = serviceUrlBuilder.toString();

  // Only follow same-site paths, so `?redirect=https://evil.example` cannot
  // turn the login flow into an open redirect.
  const redirect =
    rawRedirect && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
      ? rawRedirect
      : '/account';
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  const casRes = await fetch(casValidateUrl.toString());
  const casText = await casRes.text();

  // 2) Extract the netid from CAS XML response
  const netidMatch = casText.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (!netidMatch) {
    console.error("No netid found in CAS response");
    return NextResponse.redirect(`${origin}/`);
  }
  const netid = netidMatch[1];
  if (process.env.NODE_ENV === 'development') {
    console.log(`Extracted netid: ${netid}`);
  }

  // Default name fallback to netid
  let fullName = netid;

  // 3) Use the Yalies API V2 to search for the person by netid
  try {
    const yaliesToken = process.env.YALIES_API_TOKEN;
    if (!yaliesToken) {
      console.error("YALIES_API_TOKEN not set in environment");
    } else {
      const searchPayload = {
        filters: { netid: [netid] },
        page: 0,           // page is now zero-indexed in V2
        page_size: 1       // just need one record
      };

      const peopleRes = await fetch("https://api.yalies.io/v2/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yaliesToken}`,
        },
        body: JSON.stringify(searchPayload),
      });

      if (peopleRes.ok) {
        const peopleData = await peopleRes.json();
        if (Array.isArray(peopleData) && peopleData.length > 0) {
          const person = peopleData[0];
          const { first_name, last_name, name } = person;
          if (first_name && last_name) {
            fullName = `${first_name} ${last_name}`;
          } else if (name) {
            // Fallback if the API returns a "name" field
            fullName = name;
          }
          console.log(`Mapped netid ${netid} to full name via Yalies API: ${fullName}`);
        } else {
          console.warn(`No person found for netid ${netid} using Yalies V2 API`);
        }
      } else {
        console.error(`Yalies API returned error: ${peopleRes.status} ${peopleRes.statusText}`);
      }
    }
  } catch (error) {
    console.error("Error calling Yalies API:", error);
  }

  // Ensure a row exists for this student in Supabase
  try {
    const { data: existing, error } = await supabase
      .from('students')
      .select('netid')
      .eq('netid', netid)
      .single();
    if (error || !existing) {
      await supabase.from('students').insert({ netid, affiliations: '' });
    }
  } catch (err) {
    console.error('Error ensuring student row:', err);
  }

  // 4) Set a cookie with user info, then redirect
  const user = { netid, name: fullName, type: 'student' as const };

  const sessionCookie = createSessionCookie(user);
  if (!sessionCookie) {
    console.error('Cannot issue a session: SESSION_SECRET is not configured.');
    return NextResponse.redirect(`${origin}/login?error=session`);
  }

  const response = NextResponse.redirect(`${origin}${redirect}`);
  response.cookies.set('user', sessionCookie, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: false,
  });

  return response;
}