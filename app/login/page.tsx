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
  const [showInvestorForm, setShowInvestorForm] = useState(false);

  useEffect(() => {
    // If already logged in as student, go straight to destination (default to /pitchbook)
    if (user?.type === 'student') {
      router.replace(redirect || '/pitchbook');
    }
  }, [user, redirect, router]);

  useEffect(() => {
    // If user came with mode=investor, open the investor form by default
    const mode = searchParams.get('mode');
    if (mode === 'investor') setShowInvestorForm(true);
  }, [searchParams]);

  const handleStudent = () => {
    // Pass redirect through CAS login so callback can route properly (default to /pitchbook)
    const url = new URL('/api/cas/login', window.location.origin);
    url.searchParams.set('redirect', redirect || '/pitchbook');
    window.location.href = url.toString();
  };

  const handleInvestor = async (e: FormEvent) => {
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
        // After successful investor login, go to requested destination (default to /pitchbook)
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          {redirect && (
            <p className="text-center text-sm text-gray-600">You will be redirected to <span className="font-mono">{redirect}</span> after login.</p>
          )}
          <div className="space-y-3">
            <button
              onClick={handleStudent}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
            >
              Login as Yale Student
            </button>
            <button
              onClick={() => setShowInvestorForm((v) => !v)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
            >
              {showInvestorForm ? 'Hide Investor Login' : 'Login as Investor'}
            </button>
          </div>
          {showInvestorForm && (
            <form onSubmit={handleInvestor} className="space-y-4 border-t pt-4">
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
                >
                  {loading ? 'Logging in...' : 'Login as Investor'}
                </button>
                <a
                  href={`/forgot-password?email=${encodeURIComponent(email)}${redirect ? `&redirect=${encodeURIComponent(redirect)}` : ''}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </form>
          )}
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
