export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const ticket = new URL(request.url).searchParams.get('ticket');
  if (!ticket) {
    console.error("No ticket provided");
    return NextResponse.redirect(`${origin}/`);
  }

  // 1) Validate the CAS ticket
  const serviceUrl = `${origin}/api/cas/callback`;
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
  console.log(`Extracted netid: ${netid}`);

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
  const user = { netid, name: fullName, type: 'student' };

  const response = NextResponse.redirect(`${origin}/account`);
  response.cookies.set('user', JSON.stringify(user), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: 'strict',
    httpOnly: false,
  });

  return response;
}