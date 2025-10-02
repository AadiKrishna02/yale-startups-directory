export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url);
  const redirect = searchParams.get('redirect');

  // Build callback service URL and pass through redirect if provided
  const serviceUrl = new URL('/api/cas/callback', origin);
  if (redirect) {
    serviceUrl.searchParams.set('redirect', redirect);
  }

  // Redirect to Yale’s secure CAS login URL
  const casLoginUrl = new URL('https://secure.its.yale.edu/cas/login');
  casLoginUrl.searchParams.set('service', serviceUrl.toString());

  return NextResponse.redirect(casLoginUrl.toString());
}
