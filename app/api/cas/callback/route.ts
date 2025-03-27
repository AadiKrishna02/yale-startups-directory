// Force dynamic and Node.js runtime
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Hardcode your production domain
  const baseUrl = 'https://www.yalepitchbook.com';

  // Extract the CAS ticket
  const { searchParams } = new URL(request.url);
  const ticket = searchParams.get('ticket');
  if (!ticket) {
    // No ticket => redirect home
    return NextResponse.redirect(`${baseUrl}/`);
  }

  // Validate the ticket
  const serviceUrl = `${baseUrl}/api/cas/callback`;
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  const res = await fetch(casValidateUrl.toString());
  const text = await res.text();

  // Extract <cas:user> from CAS response XML
  const userMatch = text.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (!userMatch) {
    return NextResponse.redirect(`${baseUrl}/`);
  }

  // Set cookie and redirect to /account
  const username = userMatch[1];
  const response = NextResponse.redirect(`${baseUrl}/account`);
  response.cookies.set('user', encodeURIComponent(username), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,             // recommended in production
    httpOnly: false,          // or true if you need stricter controls
    sameSite: 'strict',       // or 'lax' if you prefer
  });

  return response;
}
