export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import cheerio from 'cheerio';

export async function GET(request: Request) {
  // Dynamically derive the base URL from the request
  const { origin } = new URL(request.url);

  // Extract the CAS ticket from the query parameters
  const ticket = new URL(request.url).searchParams.get('ticket');
  if (!ticket) {
    return NextResponse.redirect(`${origin}/`);
  }

  // Validate the ticket with Yale CAS
  const serviceUrl = `${origin}/api/cas/callback`;
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  const res = await fetch(casValidateUrl.toString());
  const text = await res.text();

  // Extract the netid from <cas:user>
  const netidMatch = text.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (!netidMatch) {
    return NextResponse.redirect(`${origin}/`);
  }
  const netid = netidMatch[1];

  // Scrape yalies.io to find the correct person block with the matching netid
  let fullName = netid; // Fallback if scraping fails
  try {
    const htmlRes = await fetch(`https://yalies.io/${netid}`);
    if (htmlRes.ok) {
      const html = await htmlRes.text();
      const $ = cheerio.load(html);

      // We expect multiple .person blocks, each with .Name and .pill.NetID
      // We'll find the one whose .pill.NetID text matches our netid
      $('.person').each((_, personEl) => {
        const netidInPill = $(personEl).find('.pill.NetID').text().trim();
        if (netidInPill.toLowerCase() === netid.toLowerCase()) {
          const nameText = $(personEl).find('.Name').text().trim();
          if (nameText) {
            fullName = nameText;
          }
        }
      });
    }
  } catch (error) {
    console.error('Error scraping yalies.io HTML:', error);
  }

  // Create the user object
  const user = { netid, name: fullName };

  // Set a cookie with the user data (as JSON) and redirect to /account
  const response = NextResponse.redirect(`${origin}/account`);
  response.cookies.set('user', JSON.stringify(user), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: 'strict',
    httpOnly: false,
  });

  return response;
}
