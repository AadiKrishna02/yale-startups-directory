export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Hardcoded production domain
  const baseUrl = 'https://www.yalepitchbook.com';

  // Extract the CAS ticket from the query parameters
  const { searchParams } = new URL(request.url);
  const ticket = searchParams.get('ticket');
  if (!ticket) {
    // If no ticket, redirect to home
    return NextResponse.redirect(`${baseUrl}/`);
  }

  // The service URL must match what you provided to CAS during login
  const serviceUrl = `${baseUrl}/api/cas/callback`;
  // Validate the ticket with Yale’s secure CAS serviceValidate endpoint
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  const res = await fetch(casValidateUrl.toString());
  const text = await res.text();

  // Extract the username from the CAS XML response using a simple regex
  const userMatch = text.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (!userMatch) {
    // If validation fails, redirect to home
    return NextResponse.redirect(`${baseUrl}/`);
  }

  const username = userMatch[1];

  // Create a response that sets a cookie with the username and redirects to the /account page
  const response = NextResponse.redirect(`${baseUrl}/account`);
  response.cookies.set('user', encodeURIComponent(username), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: 'strict',
    httpOnly: false, // Adjust to true if you want to restrict client-side access
  });

  return response;
}
