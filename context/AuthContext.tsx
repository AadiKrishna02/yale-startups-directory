"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  netid: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper: get a cookie by name
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const userCookie = getCookie('user');
      if (userCookie) {
        try {
          const parsed = JSON.parse(decodeURIComponent(userCookie));
          setUser(parsed);
        } catch (error) {
          // Fallback: use cookie as simple string if JSON parse fails
          setUser({ netid: decodeURIComponent(userCookie), name: decodeURIComponent(userCookie) });
        }
      }
    }
  }, []);

  const login = () => {
    window.location.href = "/api/cas/login";
  };

  const logout = () => {
    document.cookie = "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
