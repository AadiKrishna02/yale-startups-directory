import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not set in the environment.');
  }
  
  // Parse the incoming URL for the CAS ticket
  const { searchParams } = new URL(request.url);
  const ticket = searchParams.get('ticket');

  // The service URL must match what was provided to CAS during login
  const serviceUrl = `${baseUrl}/api/cas/callback`;

  if (!ticket) {
    // No ticket provided, redirect back to home (or handle the error as needed)
    return NextResponse.redirect(new URL('/', baseUrl).toString());
  }

  // Validate the ticket with Yale CAS's serviceValidate endpoint
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  const res = await fetch(casValidateUrl.toString());
  const text = await res.text();

  // A simple regex to extract the username from the XML response
  const userMatch = text.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (userMatch) {
    const username = userMatch[1];
    // Create a response that redirects the user to the account page
    const response = NextResponse.redirect(new URL('/account', baseUrl).toString());
    // Set a cookie called "user" with the username.
    response.cookies.set('user', encodeURIComponent(username), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // cookie valid for 7 days
    });
    return response;
  } else {
    // If CAS validation fails, redirect back to home
    return NextResponse.redirect(new URL('/', baseUrl).toString());
  }
}
