"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  netid?: string;
  email?: string;
  name: string;
  type: 'student' | 'investor';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

// The session cookie is `<base64url(payload)>.<hmac>`. Only the server can
// check the signature, so what we read here is for display only — every route
// that grants access re-verifies it. Never treat this result as proof of
// identity on the client.
function decodeSessionPayload(cookieValue: string): User | null {
  const separator = cookieValue.lastIndexOf('.');
  if (separator <= 0) return null;

  const base64 = cookieValue
    .slice(0, separator)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  try {
    const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || typeof parsed.name !== 'string') return null;
    return parsed as User;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const userCookie = getCookie('user');
      if (userCookie) {
        const parsed = decodeSessionPayload(userCookie);
        if (parsed) {
          if (!parsed.type) {
            parsed.type = parsed.netid ? 'student' : 'investor';
          }
          setUser(parsed);
        } else {
          // An unreadable cookie means a stale or tampered session. Treat it as
          // signed out rather than inventing a user from the raw cookie text.
          setUser(null);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = () => {
    window.location.href = "/login";
  };

  const logout = () => {
    document.cookie = "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
