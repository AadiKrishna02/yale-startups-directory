export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import cheerio from 'cheerio';

export async function GET(request: Request) {
  // Dynamically derive the origin from the incoming request
  const { origin } = new URL(request.url);
  
  // Extract the CAS ticket from query parameters
  const ticket = new URL(request.url).searchParams.get('ticket');
  if (!ticket) {
    console.error("No ticket provided");
    return NextResponse.redirect(`${origin}/`);
  }

  // Validate the ticket with Yale CAS
  const serviceUrl = `${origin}/api/cas/callback`;
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  const res = await fetch(casValidateUrl.toString());
  const text = await res.text();

  // Extract the netid from the CAS XML response
  const netidMatch = text.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (!netidMatch) {
    console.error("No netid found in CAS response");
    return NextResponse.redirect(`${origin}/`);
  }
  const netid = netidMatch[1];
  console.log(`Extracted netid: ${netid}`);

  // Default fullName to netid
  let fullName = netid;

  try {
    // Fetch the yalies.io page for this netid
    const mappingRes = await fetch(`https://yalies.io/${netid}`);
    if (mappingRes.ok) {
      const html = await mappingRes.text();
      console.log("Fetched HTML snippet:", html.slice(0, 500));
      const $ = cheerio.load(html);
      let foundName: string | null = null;

      // Iterate over each person container
      $('.person').each((i, elem) => {
        // Within each person, find a pill element inside a container with class "pills"
        const pillElement = $(elem)
          .find('.pills .pill')
          .filter((i, el) => {
            const pillText = $(el).text().trim();
            // Check if the pill text contains "NetID"
            return /NetID/i.test(pillText);
          })
          .first();
        if (pillElement.length > 0) {
          const pillText = pillElement.text().trim();
          // Extract the netid from the pill text using a regex, e.g. "NetID aec238"
          const netidFromPillMatch = pillText.match(/NetID\s*(\S+)/i);
          if (netidFromPillMatch) {
            const foundNetid = netidFromPillMatch[1].trim();
            console.log(`Found netid in pill: ${foundNetid}`);
            // If the found netid matches our netid...
            if (foundNetid.toLowerCase() === netid.toLowerCase()) {
              // Then look for the full name in the nested elements:
              // person -> header_wrap -> name_wrap -> name
              const nameText = $(elem)
                .find('.header_wrap .name_wrap .name')
                .text()
                .trim();
              console.log(`Found name text: "${nameText}"`);
              if (nameText) {
                foundName = nameText;
              }
            }
          }
        }
      });

      if (foundName) {
        fullName = foundName;
        console.log(`Mapped netid ${netid} to full name: ${fullName}`);
      } else {
        console.warn(`No matching person block found for netid ${netid}`);
      }
    } else {
      console.error(`Failed to fetch yalies.io page for netid ${netid}: ${mappingRes.statusText}`);
    }
  } catch (error) {
    console.error("Error scraping yalies.io:", error);
  }

  // Create the user object using the mapped full name (or netid if mapping failed)
  const user = { netid, name: fullName };

  // Set a cookie with the user data (as JSON) and redirect to the account page
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
