export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Derive the base URL from the incoming request
  const { origin } = new URL(request.url);
  
  // Extract the CAS ticket from the query parameters
  const ticket = new URL(request.url).searchParams.get('ticket');
  if (!ticket) {
    // No ticket provided—redirect to home.
    return NextResponse.redirect(`${origin}/`);
  }

  // The service URL (callback) must match what was provided to CAS during login.
  const serviceUrl = `${origin}/api/cas/callback`;

  // Validate the ticket using Yale's secure CAS serviceValidate endpoint.
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  const res = await fetch(casValidateUrl.toString());
  const text = await res.text();

  // Extract the netid (from <cas:user>)
  const netidMatch = text.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (!netidMatch) {
    return NextResponse.redirect(`${origin}/`);
  }
  const netid = netidMatch[1];

  // Optionally extract the full name from <cas:displayName>, if available.
  const displayNameMatch = text.match(/<cas:displayName>([^<]+)<\/cas:displayName>/);
  const fullName = displayNameMatch ? displayNameMatch[1] : netid;

  // Create a user object.
  const user = { netid, name: fullName };

  // Set a cookie with the user data (stored as JSON) and redirect to the account page.
  const response = NextResponse.redirect(`${origin}/account`);
  response.cookies.set('user', encodeURIComponent(JSON.stringify(user)), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: 'strict',
    httpOnly: false, // Adjust if you wish to restrict access from client JS
  });

  return response;
}
