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
    // If already logged in as student, go straight to destination (default to /pitchbook)
    if (user?.type === 'student') {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-2xl font-semibold text-center mt-12 mb-8">Login</h1>
          {redirect && (
            <p className="text-center text-sm text-gray-600 mb-8 px-4">You will be redirected to <span className="font-mono">{redirect}</span> after login.</p>
          )}
          <div className="space-y-3">
            <button
              onClick={handleStudent}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
            >
              Login as Yale Student
            </button>
            <button
              onClick={goToInvestorLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
            >
              Login as Investor
            </button>
          </div>
          <p className="text-sm text-center">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
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
