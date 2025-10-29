'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function InvestorLoginContent() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/investor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        window.location.href = redirect || '/pitchbook';
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-slate-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-lg">
          {/* Main login card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Header section */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Investor Login</h1>
                <p className="text-gray-600">Access your investor dashboard</p>
              </div>

              {/* Redirect notice */}
              {redirect && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-center text-sm text-blue-800">
                    You'll be redirected to <span className="font-mono font-semibold">{redirect}</span> after login
                  </p>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-center text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Form fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Login button and forgot password */}
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl px-6 py-4 font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:transform-none disabled:shadow-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <div className="text-center">
                  <a
                    href={`/forgot-password?email=${encodeURIComponent(email)}${redirect ? `&redirect=${encodeURIComponent(redirect)}` : ''}`}
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">New investor?</span>
                </div>
              </div>

              {/* Sign up link */}
              <div className="text-center">
                <a 
                  href="/signup" 
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 hover:underline"
                >
                  <span>Create an account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </form>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gray-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-slate-200/30 rounded-full blur-xl"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function InvestorLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <InvestorLoginContent />
    </Suspense>
  );
}
