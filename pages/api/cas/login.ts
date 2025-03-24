import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Use your environment variable for the base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return res.status(500).send("Base URL is not defined");
  }
  const serviceUrl = encodeURIComponent(`${baseUrl}/api/cas/callback`);
  const casLoginUrl = `https://secure.its.yale.edu/cas/login?service=${serviceUrl}`;
  res.redirect(casLoginUrl);
}
