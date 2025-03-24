import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export async function GET(request: Request) {
  // You can extract query params from the URL:
  const { searchParams } = new URL(request.url);
  const ticket = searchParams.get("ticket");
  if (!ticket) {
    return NextResponse.json({ error: "No ticket provided" }, { status: 400 });
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json({ error: "Base URL not configured" }, { status: 500 });
  }
  const serviceUrl = encodeURIComponent(`${baseUrl}/api/cas/callback`);

  try {
    const validationUrl = `https://secure.its.yale.edu/cas/serviceValidate?ticket=${ticket}&service=${serviceUrl}`;
    const response = await axios.get(validationUrl);

    const parser = new XMLParser({ ignoreAttributes: false });
    const result = parser.parse(response.data);

    const authSuccess = result['cas:serviceResponse']?.['cas:authenticationSuccess'];
    if (!authSuccess) {
      return NextResponse.json({ error: "CAS authentication failed" }, { status: 401 });
    }

    const user = Array.isArray(authSuccess)
      ? authSuccess[0]['cas:user']
      : authSuccess['cas:user'];

    // Set a cookie with the username.
    const headers = new Headers();
    headers.append("Set-Cookie", `user=${encodeURIComponent(user)}; Path=/; SameSite=Lax`);
    
    // Redirect to the account page.
    return NextResponse.redirect(`${baseUrl}/account`, { headers });
  } catch (error) {
    console.error("Error validating ticket", error);
    return NextResponse.json({ error: "Error validating ticket" }, { status: 500 });
  }
}
