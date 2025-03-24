import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export async function GET(request: Request) {
  // Extract the ticket from the query parameters.
  const { searchParams } = new URL(request.url);
  const ticket = searchParams.get("ticket");
  if (!ticket) {
    return NextResponse.json({ error: "No ticket provided" }, { status: 400 });
  }
  
  // Retrieve the base URL from the environment variables.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json({ error: "Base URL not configured" }, { status: 500 });
  }
  
  // Build the service URL (callback URL) and log it.
  const serviceUrlUnencoded = `${baseUrl}/api/cas/callback`;
  const serviceUrl = encodeURIComponent(serviceUrlUnencoded);
  console.log("Service URL (unencoded):", serviceUrlUnencoded);
  
  try {
    // Construct and log the validation URL.
    const validationUrl = `https://secure.its.yale.edu/cas/serviceValidate?ticket=${ticket}&service=${serviceUrl}`;
    console.log("Validation URL:", validationUrl);
    
    // Call the CAS service validation endpoint.
    const response = await axios.get(validationUrl);
    
    // Log the raw XML response from CAS.
    console.log("CAS Raw Response:", response.data);
    
    // Parse the XML response.
    const parser = new XMLParser({ ignoreAttributes: false });
    const result = parser.parse(response.data);
    
    // Log the parsed result.
    console.log("CAS Parsed Result:", result);
    
    // Check that the response has the expected structure.
    const serviceResponse = result['cas:serviceResponse'];
    if (!serviceResponse) {
      console.error("CAS service response missing", result);
      return NextResponse.json({ error: "Invalid CAS response" }, { status: 401 });
    }
    
    const authSuccess = serviceResponse['cas:authenticationSuccess'];
    if (!authSuccess) {
      console.error("CAS authentication failed", result);
      return NextResponse.json({ error: "CAS authentication failed" }, { status: 401 });
    }
    
    // Extract the user information.
    let user;
    if (Array.isArray(authSuccess)) {
      user = authSuccess[0]['cas:user'];
    } else {
      user = authSuccess['cas:user'];
    }
    
    if (!user) {
      console.error("CAS did not return a user", result);
      return NextResponse.json({ error: "No user found in CAS response" }, { status: 401 });
    }
    
    // Set a cookie with the username.
    const headers = new Headers();
    headers.append("Set-Cookie", `user=${encodeURIComponent(user)}; Path=/; SameSite=Lax`);
    
    // Redirect to the account page.
    // return NextResponse.redirect(`${baseUrl}`, { headers });
    return NextResponse.redirect(`${baseUrl}/account`, { headers });
  } catch (error) {
    console.error("Error validating ticket", error);
    return NextResponse.json({ error: "Error validating ticket" }, { status: 500 });
  }
}
