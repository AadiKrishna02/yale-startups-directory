import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Update the service URL to match your production domain as needed.
  const serviceUrl = encodeURIComponent("http://localhost:3000/api/cas/callback");
  const casLoginUrl = `https://secure.its.yale.edu/cas/login?service=${serviceUrl}`;
  res.redirect(casLoginUrl);
}
