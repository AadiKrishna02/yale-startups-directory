// Signed session cookies.
//
// The `user` cookie used to be plain JSON, so anyone could paste a forged
// identity into their browser and be treated as that user — including the
// admin. The value is now `<base64url(payload)>.<hmac>`; without SESSION_SECRET
// a forged payload cannot produce a matching signature.
//
// The payload stays readable on purpose: AuthContext decodes it for display.
// Readable is fine, forgeable is not. Anything that grants access must call
// readSessionCookie() (or verifySignedValue()) so the signature is checked.

import { createHmac, timingSafeEqual } from 'crypto';

export interface SessionUser {
  netid?: string;
  email?: string;
  name: string;
  type: 'student' | 'investor';
}

function getSecret(): string | null {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    // Fail closed. A short or missing secret means signatures are worthless,
    // and silently accepting unsigned cookies would restore the original hole.
    console.error(
      'SESSION_SECRET is missing or shorter than 32 characters; sessions are disabled.'
    );
    return null;
  }
  return secret;
}

const toBase64Url = (input: string) => Buffer.from(input, 'utf8').toString('base64url');
const fromBase64Url = (input: string) => Buffer.from(input, 'base64url').toString('utf8');

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

/** Signs an arbitrary string. Returns null when no usable secret is set. */
export function signValue(value: string): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const payload = toBase64Url(value);
  return `${payload}.${sign(payload, secret)}`;
}

/** Returns the original string, or null if the value is absent or tampered with. */
export function verifySignedValue(signed: string | undefined | null): string | null {
  if (!signed) return null;
  const secret = getSecret();
  if (!secret) return null;

  const separator = signed.lastIndexOf('.');
  if (separator <= 0) return null;

  const payload = signed.slice(0, separator);
  const providedHex = signed.slice(separator + 1);
  const expectedHex = sign(payload, secret);

  // Compare in constant time, and only once the lengths match — timingSafeEqual
  // throws on a length mismatch.
  if (providedHex.length !== expectedHex.length) return null;
  const provided = Buffer.from(providedHex, 'hex');
  const expected = Buffer.from(expectedHex, 'hex');
  if (provided.length !== expected.length) return null;
  if (!timingSafeEqual(provided, expected)) return null;

  try {
    return fromBase64Url(payload);
  } catch {
    return null;
  }
}

/** Cookie value for a freshly authenticated user. Null if signing is unavailable. */
export function createSessionCookie(user: SessionUser): string | null {
  return signValue(JSON.stringify(user));
}

/** The verified user behind a `user` cookie, or null. */
export function readSessionCookie(signed: string | undefined | null): SessionUser | null {
  const raw = verifySignedValue(signed);
  if (!raw) return null;
  try {
    const user = JSON.parse(raw);
    if (!user || typeof user.name !== 'string') return null;
    if (user.type !== 'student' && user.type !== 'investor') return null;
    return user as SessionUser;
  } catch {
    return null;
  }
}

/**
 * Admin check, single source of truth for the routes and the admin page.
 * Students authenticate through CAS, which only puts a netid on the cookie —
 * an email comparison alone would never match.
 */
const ADMIN_NETIDS = ['ack69'];
const ADMIN_EMAILS = ['aadi.krishna@yale.edu'];

export function isAdmin(user: SessionUser | null): boolean {
  if (!user || user.type !== 'student') return false;
  if (user.netid && ADMIN_NETIDS.includes(user.netid)) return true;
  if (user.email && ADMIN_EMAILS.includes(user.email)) return true;
  return false;
}
