/// <reference path="../../../../global.d.ts" />
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import xml2js from 'xml2js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ticket } = req.query;
  if (!ticket || typeof ticket !== 'string') {
    return res.status(400).send("No ticket provided");
  }
  // Use the same service URL as in the login route.
  const serviceUrl = encodeURIComponent("http://localhost:3000/api/cas/callback");
  try {
    const validationUrl = `https://secure.its.yale.edu/cas/serviceValidate?ticket=${ticket}&service=${serviceUrl}`;
    const response = await axios.get(validationUrl);
    
    // Use the promise-based API for xml2js
    const result = await xml2js.parseStringPromise(response.data);

    const authSuccess = result['cas:serviceResponse']['cas:authenticationSuccess'];
    if (!authSuccess) {
      return res.status(401).send("CAS authentication failed");
    }
    // Extract the username (CAS protocol returns it under 'cas:user')
    const user = authSuccess[0]['cas:user'][0];

    // Set a cookie containing the username.
    // Removed the HttpOnly flag so that client-side code can read the cookie.
    res.setHeader('Set-Cookie', `user=${encodeURIComponent(user)}; Path=/; SameSite=Lax`);
    
    // Redirect to the account page after successful login.
    res.redirect("/account");
  } catch (error) {
    console.error("Error validating ticket", error);
    res.status(500).send("Error validating ticket");
  }
}
