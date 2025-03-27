export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Dynamically derive the base URL from the request
  const { origin } = new URL(request.url);
  
  // Extract the CAS ticket from the query parameters
  const ticket = new URL(request.url).searchParams.get('ticket');
  if (!ticket) {
    return NextResponse.redirect(`${origin}/`);
  }

  // The service (callback) URL must match what was provided during login.
  const serviceUrl = `${origin}/api/cas/callback`;
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  const res = await fetch(casValidateUrl.toString());
  const text = await res.text();

  // Extract the netid from the CAS XML response (<cas:user>)
  const netidMatch = text.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (!netidMatch) {
    return NextResponse.redirect(`${origin}/`);
  }
  const netid = netidMatch[1];

  // Attempt to map the netid to a full name via yalies.io.
  // (Adjust the URL and response parsing to match yalies.io's actual API.)
  let fullName = netid; // Fallback to netid if mapping fails.
  try {
    const mappingRes = await fetch(`https://yalies.io/api/v1/users/${netid}`);
    if (mappingRes.ok) {
      const mappingData = await mappingRes.json();
      // Assume the API returns an object with a "name" field.
      if (mappingData && mappingData.name) {
        fullName = mappingData.name;
      }
    }
  } catch (error) {
    console.error("Error mapping netid to name via yalies.io:", error);
  }

  // Create a user object with netid and the mapped name.
  const user = { netid, name: fullName };

  // Set a cookie with the user data (as JSON) and redirect to the account page.
  const response = NextResponse.redirect(`${origin}/account`);
  response.cookies.set('user', JSON.stringify(user), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: 'strict',
    httpOnly: false, // Change to true if you want to restrict client-side access.
  });

  return response;
}
