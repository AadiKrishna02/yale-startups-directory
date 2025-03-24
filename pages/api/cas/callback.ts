import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ticket } = req.query;
  if (!ticket || typeof ticket !== 'string') {
    return res.status(400).send("No ticket provided");
  }

  // Use the environment variable for the base URL.
  // Ensure you have NEXT_PUBLIC_BASE_URL defined in your environment (or .env.local for local development).
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return res.status(500).send("Base URL not configured");
  }
  
  // Construct the service URL dynamically
  const serviceUrl = encodeURIComponent(`${baseUrl}/api/cas/callback`);

  try {
    const validationUrl = `https://secure.its.yale.edu/cas/serviceValidate?ticket=${ticket}&service=${serviceUrl}`;
    const response = await axios.get(validationUrl);

    // Use fast-xml-parser to convert XML to a JavaScript object.
    const parser = new XMLParser({ ignoreAttributes: false });
    const result = parser.parse(response.data);

    // Adjust property access based on the XML structure.
    const authSuccess = result['cas:serviceResponse']?.['cas:authenticationSuccess'];
    if (!authSuccess) {
      return res.status(401).send("CAS authentication failed");
    }

    // Extract the username (CAS protocol returns it under 'cas:user')
    const user = Array.isArray(authSuccess)
      ? authSuccess[0]['cas:user']
      : authSuccess['cas:user'];

    // Set a cookie containing the username.
    res.setHeader('Set-Cookie', `user=${encodeURIComponent(user)}; Path=/; SameSite=Lax`);

    // Redirect to the account page after successful login.
    res.redirect("/account");
  } catch (error) {
    console.error("Error validating ticket", error);
    res.status(500).send("Error validating ticket");
  }
}
