export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Dynamically derive the origin from the incoming request.
  const { origin } = new URL(request.url);
  
  // Extract the CAS ticket from query parameters.
  const ticket = new URL(request.url).searchParams.get('ticket');
  if (!ticket) {
    console.error("No ticket provided");
    return NextResponse.redirect(`${origin}/`);
  }

  // Validate the CAS ticket.
  const serviceUrl = `${origin}/api/cas/callback`;
  const casValidateUrl = new URL('https://secure.its.yale.edu/cas/serviceValidate');
  casValidateUrl.searchParams.set('ticket', ticket);
  casValidateUrl.searchParams.set('service', serviceUrl);

  const casRes = await fetch(casValidateUrl.toString());
  const casText = await casRes.text();

  // Extract the netid from the CAS XML response (<cas:user> element).
  const netidMatch = casText.match(/<cas:user>([^<]+)<\/cas:user>/);
  if (!netidMatch) {
    console.error("No netid found in CAS response");
    return NextResponse.redirect(`${origin}/`);
  }
  const netid = netidMatch[1];
  console.log(`Extracted netid: ${netid}`);

  // Default fullName is the netid.
  let fullName = netid;

  // Use the yalies.io API endpoint to search for the person by netid.
  try {
    const searchPayload = {
      filters: {
        netid: [netid]
      },
      page: 1,
      page_size: 1
    };

    const mappingRes = await fetch("https://yalies.io/api/people", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchPayload)
    });

    if (mappingRes.ok) {
      const people = await mappingRes.json();
      // Assume the endpoint returns a JSON array of person objects.
      if (Array.isArray(people) && people.length > 0) {
        const person = people[0];
        if (person.last_name && person.first_name) {
          fullName = `${person.last_name}, ${person.first_name}`;
        } else if (person.name) {
          fullName = person.name;
        }
        console.log(`Mapped netid ${netid} to full name: ${fullName}`);
      } else {
        console.warn(`No person found for netid ${netid} using yalies.io API`);
      }
    } else {
      console.error(`Search API error for netid ${netid}: ${mappingRes.statusText}`);
    }
  } catch (error) {
    console.error("Error calling yalies.io API:", error);
  }

  // Create the user object.
  const user = { netid, name: fullName };

  // Set a cookie with the user data (as JSON) and redirect to the /account page.
  const response = NextResponse.redirect(`${origin}/account`);
  response.cookies.set('user', JSON.stringify(user), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: 'strict',
    httpOnly: false, // Set to true if you wish to restrict client-side access.
  });

  return response;
}
