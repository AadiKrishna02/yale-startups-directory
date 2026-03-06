'use client';

import React, { useState, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/investor/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setMessage('Your password has been reset. You can now log in.');
        setPassword('');
        setConfirmPassword('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to reset password. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 py-24">
          <div className="w-full max-w-md space-y-6 text-center">
            <h1 className="text-2xl font-semibold">Invalid reset link</h1>
            <p className="text-gray-600">
              This password reset link is invalid or has expired. Please{' '}
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                request a new one
              </a>
              .
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-semibold text-center">Set new password</h1>
          {message && (
            <p
              className={`text-sm text-center ${
                status === 'success'
                  ? 'text-green-700'
                  : status === 'error'
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {message}
            </p>
          )}
          {status === 'success' ? (
            <p className="text-center">
              <a
                href="/investor-login"
                className="text-blue-600 hover:underline font-medium"
              >
                Back to investor login
              </a>
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  New password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                  minLength={8}
                  placeholder="At least 8 characters, 1 number, 1 special character"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                  minLength={8}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 disabled:opacity-50"
              >
                {status === 'loading' ? 'Resetting...' : 'Reset password'}
              </button>
            </form>
          )}
          <p className="text-center text-sm">
            <a
              href="/investor-login"
              className="text-blue-600 hover:underline"
            >
              Back to investor login
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
