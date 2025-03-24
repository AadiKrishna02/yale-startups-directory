import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json({ error: "Base URL is not defined" }, { status: 500 });
  }
  const serviceUrl = encodeURIComponent(`${baseUrl}/api/cas/callback`);
  const casLoginUrl = `https://secure.its.yale.edu/cas/login?service=${serviceUrl}&renew=true`;
  // return NextResponse.redirect(casLoginUrl);
  return NextResponse.redirect(`${baseUrl}/account`, { headers });
}
