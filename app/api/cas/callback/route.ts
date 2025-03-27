import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Parse the incoming URL for the CAS ticket
  const { searchParams } = new URL(request.url);
  const ticket = searchParams.get('ticket');

  // Determine base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const serviceUrl = `${baseUrl}/api/cas/callback`;

  if (!ticket) {
    // If no ticket is present, redirect to home (or handle the error as needed)
    return NextResponse.redirect(new URL('/', baseUrl).toString());
  }

  // Validate the ticket with Yale CAS's serviceValidate endpoint
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  const res = await fetch(casValidateUrl.toString());
  const text = await res.text();

  // A simple regex to extract the username from the XML response
  // Expected XML format:
  //   <cas:serviceResponse ...>
  //     <cas:authenticationSuccess>
  //       <cas:user>username</cas:user>
  //       ...
  //     </cas:authenticationSuccess>
  //   </cas:serviceResponse>
  const userMatch = text.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (userMatch) {
    const username = userMatch[1];
    // Create a response that redirects the user to the account page
    const response = NextResponse.redirect(new URL('/account', baseUrl).toString());
    // Set a cookie called "user" (accessible to client code) with the username.
    // Adjust options (like secure, sameSite, etc.) as needed.
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
