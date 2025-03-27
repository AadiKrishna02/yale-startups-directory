export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET() {
  // Hardcoded production domain
  const baseUrl = 'https://www.yalepitchbook.com';
  // CAS callback URL must match what you register with CAS
  const serviceUrl = `${baseUrl}/api/cas/callback`;

  // Redirect to Yale’s secure CAS login URL
  const casLoginUrl = new URL('https://secure.its.yale.edu/cas/login');
  casLoginUrl.searchParams.set('service', serviceUrl);

  return NextResponse.redirect(casLoginUrl.toString());
}
