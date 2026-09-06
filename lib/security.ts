// Security configuration and utilities
export const SECURITY_CONFIG = {
  // Cookie settings
  COOKIE_SETTINGS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
  } as const,
  
  // Session settings
  SESSION: {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    pitchbookAccessMaxAge: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Rate limiting (requests per minute)
  RATE_LIMITS: {
    login: 5,
    signup: 3,
    passwordVerify: 10,
    adminActions: 20,
  },
  
  // Input validation
  VALIDATION: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: {
      minLength: 8,
      requireSpecialChar: true,
      requireNumber: true,
    },
    name: {
      maxLength: 100,
      // Unicode letters, not just A-Z: the old class rejected "José" and
      // "Müller" with "Invalid name format" and no way to proceed.
      allowedChars: /^[\p{L}\p{M}\s\-'\.]+$/u,
    },
  },
  
  // Admin access control
  ADMIN: {
    authorizedEmails: ['aadi.krishna@yale.edu'],
    authorizedNetIds: ['ack69'],
  },
};

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove potentially dangerous characters
    .substring(0, 1000); // Limit length
}

// Validate email format
export function isValidEmail(email: string): boolean {
  return SECURITY_CONFIG.VALIDATION.email.test(email);
}

// Validate password strength
export function isValidPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const config = SECURITY_CONFIG.VALIDATION.password;
  
  if (password.length < config.minLength) {
    errors.push(`Password must be at least ${config.minLength} characters`);
  }
  
  if (config.requireNumber && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (config.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return { valid: errors.length === 0, errors };
}

// Check if user is authorized admin
export function isAuthorizedAdmin(user: { email?: string; netid?: string; type?: string }): boolean {
  if (user.type !== 'student') return false;
  
  const emailAuthorized = user.email ? SECURITY_CONFIG.ADMIN.authorizedEmails.includes(user.email) : false;
  const netidAuthorized = user.netid ? SECURITY_CONFIG.ADMIN.authorizedNetIds.includes(user.netid) : false;
  
  return emailAuthorized || netidAuthorized;
}

// Secure logging (only in development)
export function secureLog(message: string, data?: any): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[SECURE LOG] ${message}`, data);
  }
}

// Rate limiting store (in-memory for simplicity)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(key: string, limit: number): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  
  const existing = rateLimitStore.get(key);
  
  if (!existing || now > existing.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (existing.count >= limit) {
    return false;
  }
  
  existing.count++;
  return true;
}
