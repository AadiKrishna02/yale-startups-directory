'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

export default function PitchbookAccessPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'choose' | 'password' | 'request'>('choose');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [reason, setReason] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [requestMessage, setRequestMessage] = useState('');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push('/login?redirect=/pitchbook-access');
    }
  }, [user, router]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    try {
      const res = await fetch('/api/pitchbook/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Password correct, redirect to pitchbook
        router.push('/pitchbook');
      } else {
        setPasswordError('Incorrect password. Please try again.');
      }
    } catch (err) {
      setPasswordError('An error occurred. Please try again.');
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestStatus('loading');
    setRequestMessage('');

    try {
      const res = await fetch('/api/pitchbook/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ affiliation, reason }),
      });

      if (res.ok) {
        setRequestStatus('success');
        setRequestMessage('Your request has been submitted! You will receive an email once your access is approved.');
      } else {
        const data = await res.json();
        setRequestStatus('error');
        setRequestMessage(data.error || 'Failed to submit request. Please try again.');
      }
    } catch (err) {
      setRequestStatus('error');
      setRequestMessage('An error occurred. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-semibold text-center mt-8">Access Yale Startup Pitchbook</h1>
          <p className="text-center text-sm text-gray-600">
            To view the pitchbook, you can either enter the access password or request access.
          </p>

          {mode === 'choose' && (
            <div className="space-y-3">
              <button
                onClick={() => setMode('password')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
              >
                I have the password
              </button>
              <button
                onClick={() => setMode('request')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded px-4 py-2"
              >
                Request access
              </button>
            </div>
          )}

          {mode === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => setMode('choose')}
                className="text-sm text-blue-600 hover:underline"
              >
                ← Back
              </button>
              {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
              <div>
                <label className="block text-sm font-medium mb-1">Access Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                  placeholder="Enter password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
              >
                Submit
              </button>
            </form>
          )}

          {mode === 'request' && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setMode('choose')}
                className="text-sm text-blue-600 hover:underline"
              >
                ← Back
              </button>
              
              {requestStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded p-4">
                  <p>{requestMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  {requestStatus === 'error' && (
                    <p className="text-red-600 text-sm">{requestMessage}</p>
                  )}
                  
                  {user.type === 'student' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Investment Firm Affiliation
                        </label>
                        <input
                          type="text"
                          value={affiliation}
                          onChange={(e) => setAffiliation(e.target.value)}
                          className="w-full border rounded px-3 py-2"
                          required
                          placeholder="e.g., Yale Ventures, XYZ Capital"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Why do you want to view the pitchbook?
                        </label>
                        <textarea
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="w-full border rounded px-3 py-2 min-h-[100px]"
                          required
                          placeholder="Please explain your reason for requesting access"
                        />
                      </div>
                    </>
                  )}

                  {user.type === 'investor' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Additional information (optional)
                      </label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full border rounded px-3 py-2 min-h-[100px]"
                        placeholder="Any additional context for your request"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={requestStatus === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
                  >
                    {requestStatus === 'loading' ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
