import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import xml2js from 'xml2js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ticket } = req.query;
  if (!ticket || typeof ticket !== 'string') {
    return res.status(400).send("No ticket provided");
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return res.status(500).send("Base URL is not defined");
  }
  const serviceUrl = encodeURIComponent(`${baseUrl}/api/cas/callback`);
  try {
    const validationUrl = `https://secure.its.yale.edu/cas/serviceValidate?ticket=${ticket}&service=${serviceUrl}`;
    const response = await axios.get(validationUrl);
    const result = await xml2js.parseStringPromise(response.data);

    const authSuccess = result['cas:serviceResponse']['cas:authenticationSuccess'];
    if (!authSuccess) {
      return res.status(401).send("CAS authentication failed");
    }
    const user = authSuccess[0]['cas:user'][0];
    res.setHeader('Set-Cookie', `user=${encodeURIComponent(user)}; Path=/; SameSite=Lax`);
    res.redirect("/account");
  } catch (error) {
    console.error("Error validating ticket", error);
    res.status(500).send("Error validating ticket");
  }
}
