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

  // Log for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('CAS Login Debug:');
    console.log('Origin:', origin);
    console.log('Service URL:', serviceUrl.toString());
    console.log('Redirect param:', redirect);
  }

  // Redirect to Yale’s secure CAS login URL
  const casLoginUrl = new URL('https://secure.its.yale.edu/cas/login');
  casLoginUrl.searchParams.set('service', serviceUrl.toString());

  if (process.env.NODE_ENV === 'development') {
    console.log('Final CAS URL:', casLoginUrl.toString());
  }

  return NextResponse.redirect(casLoginUrl.toString());
}
