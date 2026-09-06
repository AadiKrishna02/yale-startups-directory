'use client';
import { useState, FormEvent, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '';
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in (either type), go straight to the destination
    if (user) {
      router.replace(redirect || '/pitchbook');
    }
  }, [user, redirect, router]);

  // No inline investor form on this page anymore

  const handleStudent = () => {
    // Pass redirect through CAS login so callback can route properly (default to /pitchbook)
    const url = new URL('/api/cas/login', window.location.origin);
    url.searchParams.set('redirect', redirect || '/pitchbook');
    window.location.href = url.toString();
  };

  const goToInvestorLogin = () => {
    const url = new URL('/investor-login', window.location.origin);
    if (redirect) url.searchParams.set('redirect', redirect);
    window.location.href = url.toString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-lg">
          {/* Main login card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 space-y-8">
            {/* Header section */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-sm text-gray-600">Choose your login method to continue</p>
            </div>

            {/* Redirect notice */}
            {redirect && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-center text-sm text-blue-800">
                  You'll be redirected to <span className="font-mono font-semibold">{redirect}</span> after login
                </p>
              </div>
            )}

            {/* Login buttons */}
            <div className="space-y-3">
              <button
                onClick={handleStudent}
                className="group relative w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-4 py-3 font-medium text-base transition-all duration-200 transform hover:scale-[1.01] hover:shadow-md focus:outline-none focus:ring-3 focus:ring-blue-200"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Login as Yale Student</span>
                </div>
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>

              <button
                onClick={goToInvestorLogin}
                className="group relative w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg px-4 py-3 font-medium text-base transition-all duration-200 transform hover:scale-[1.01] hover:shadow-md focus:outline-none focus:ring-3 focus:ring-blue-200"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  <span>Login as Investor</span>
                </div>
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">New to Yale Pitchbook?</span>
              </div>
            </div>

            {/* Sign up link */}
            <div className="text-center">
              <a 
                href="/signup" 
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
              >
                <span>Create an account</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-xl"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
