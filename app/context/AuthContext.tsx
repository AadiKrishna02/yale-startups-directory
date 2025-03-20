import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: { name: string } | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ name: string } | null>(null);

  // On mount, check if the "user" cookie exists.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split("; ").reduce((prev, current) => {
        const [name, ...value] = current.split("=");
        prev[name] = value.join("=");
        return prev;
      }, {} as Record<string, string>);
      if (cookies.user) {
        setUser({ name: decodeURIComponent(cookies.user) });
      }
    }
  }, []);

  // Redirect to our CAS login API route.
  const login = () => {
    window.location.href = "/api/cas/login";
  };

  // For logout, clear the cookie, update state, and redirect to home.
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
