'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function PitchbookPage() {
  const { user, login } = useAuth();

  useEffect(() => {
    const markSeen = async () => {
      try {
        if (user?.type === 'investor') {
          await fetch('/api/investor/pdf-seen', { method: 'POST' });
        }
      } catch (err) {
        console.error('Failed to mark PDF as seen', err);
      }
    };
    markSeen();
  }, [user]);

  const notLoggedIn = !user;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-6">Pitchbook v1</h1>
        {notLoggedIn ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded p-4 mb-6">
            <p className="mb-2">Please log in to view the pitchbook.</p>
            <div className="flex gap-3">
              <button onClick={login} className="bg-blue-600 text-white px-4 py-2 rounded">Go to Login</button>
              <Link href="/login?redirect=/pitchbook" className="underline text-blue-700">Login with redirect</Link>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded p-4 mb-6">
            <p>Logged in as {user.name} ({user.type}).</p>
          </div>
        )}

        {/* Placeholder for embedded PDF - replace with your embed later */}
        <div className="aspect-[3/4] w-full bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-500">
          <span>Embedded PDF goes here</span>
        </div>
      </main>
      <Footer />
    </div>
  );
}
