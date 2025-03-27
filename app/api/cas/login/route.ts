import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Determine the base URL from env (or default to localhost)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  // The CAS callback URL (should match what you register with CAS)
  const serviceUrl = `${baseUrl}/api/cas/callback`;

  // Use Yale’s secure CAS login URL
  const casLoginUrl = new URL('https://secure.its.yale.edu/cas/login');
  casLoginUrl.searchParams.set('service', serviceUrl);

  return NextResponse.redirect(casLoginUrl.toString());
}
