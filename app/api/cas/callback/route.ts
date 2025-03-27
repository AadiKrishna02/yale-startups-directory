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
    console.error("No ticket provided in URL");
    return NextResponse.redirect(`${origin}/`);
  }

  // The service (callback) URL must match what was provided during login.
  const serviceUrl = `${origin}/api/cas/callback`;
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  // Validate the CAS ticket
  const res = await fetch(casValidateUrl.toString());
  const text = await res.text();

  // Extract the netid from the CAS XML response (<cas:user>)
  const netidMatch = text.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (!netidMatch) {
    console.error("No netid found in CAS response");
    return NextResponse.redirect(`${origin}/`);
  }
  const netid = netidMatch[1];

  // Default to netid as fullName
  let fullName = netid; 

  // Attempt to fetch and scrape the correct full name from yalies.io
  try {
    const mappingRes = await fetch(`https://yalies.io/${netid}`);
    if (mappingRes.ok) {
      const html = await mappingRes.text();
      // Log a snippet of the HTML for debugging (first 200 characters)
      console.log("Fetched yalies.io HTML snippet:", html.slice(0, 200));
      const $ = cheerio.load(html);

      // Look for each .person block
      let foundName: string | null = null;
      $('.person').each((index, element) => {
        // Look for the netid within a pill element (adjust selector if needed)
        const pillText = $(element).find('.pill.NetID').text().trim();
        if (pillText.toLowerCase() === netid.toLowerCase()) {
          // If it matches, extract the text from the .Name element
          const nameText = $(element).find('.Name').text().trim();
          if (nameText) {
            foundName = nameText;
          }
        }
      });

      if (foundName) {
        fullName = foundName;
        console.log(`Mapped netid ${netid} to full name: ${fullName}`);
      } else {
        console.warn(`Could not find a matching name for netid ${netid} in the HTML.`);
      }
    } else {
      console.error(`Failed to fetch yalies.io page for netid ${netid}: ${mappingRes.statusText}`);
    }
  } catch (error) {
    console.error("Error scraping yalies.io HTML:", error);
  }

  // Create the user object
  const user = { netid, name: fullName };

  // Set a cookie with the user data (as JSON) and redirect to the account page.
  const response = NextResponse.redirect(`${origin}/account`);
  response.cookies.set('user', JSON.stringify(user), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: 'strict',
    httpOnly: false, // Adjust if you wish to restrict client-side access
  });

  return response;
}
