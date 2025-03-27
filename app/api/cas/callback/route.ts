export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const ticket = new URL(request.url).searchParams.get('ticket');
  if (!ticket) {
    console.error("No ticket provided");
    return NextResponse.redirect(`${origin}/`);
  }

  // Validate the CAS ticket
  const serviceUrl = `${origin}/api/cas/callback`;
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  const casRes = await fetch(casValidateUrl.toString());
  const casText = await casRes.text();

  // Extract the netid from the CAS XML response
  const netidMatch = casText.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (!netidMatch) {
    console.error("No netid found in CAS response");
    return NextResponse.redirect(`${origin}/`);
  }
  const netid = netidMatch[1];
  console.log(`Extracted netid: ${netid}`);

  // Default to netid if no name is found
  let fullName = netid;

  // Use the Yalies API to search for a person by netid
  try {
    // Get your Yalies API token from environment variables
    const yaliesToken = process.env.YALIES_API_TOKEN;
    if (!yaliesToken) {
      console.error("YALIES_API_TOKEN not set in environment");
    } else {
      const searchPayload = {
        filters: { netid: [netid] },
        page: 1,
        page_size: 1
      };

      const peopleRes = await fetch("https://yalies.io/api/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yaliesToken}`
        },
        body: JSON.stringify(searchPayload)
      });

      if (peopleRes.ok) {
        const peopleData = await peopleRes.json();
        // Assume the API returns a JSON array of person objects.
        if (Array.isArray(peopleData) && peopleData.length > 0) {
          const person = peopleData[0];
          // Construct full name using last_name and first_name if available.
          if (person.last_name && person.first_name) {
            fullName = `${person.last_name}, ${person.first_name}`;
          } else if (person.name) {
            fullName = person.name;
          }
          console.log(`Mapped netid ${netid} to full name via Yalies API: ${fullName}`);
        } else {
          console.warn(`No person found for netid ${netid} using Yalies API`);
        }
      } else {
        console.error(`Yalies API returned error: ${peopleRes.status} ${peopleRes.statusText}`);
      }
    }
  } catch (error) {
    console.error("Error calling Yalies API:", error);
  }

  // Create the user object with the mapped full name (or fallback netid)
  const user = { netid, name: fullName };

  // Set a cookie with the user data (as JSON) and redirect to /account.
  const response = NextResponse.redirect(`${origin}/account`);
  response.cookies.set('user', JSON.stringify(user), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: 'strict',
    httpOnly: false, // Set to true to restrict client-side access if desired.
  });

  return response;
}
