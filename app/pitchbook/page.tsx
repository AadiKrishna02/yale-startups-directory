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
        <h1 className="text-4xl font-bold mb-4 text-blue-950">Yale Startup Pitchbook — v1</h1>
        <div className="text-gray-700 leading-7 space-y-4 mb-8">
          <p>
            Yale Startup Pitchbook is a curated collection of startups by Yale founders seeking investment, part of the larger initiative to connect Yale startups with resources, talent, and investment opportunities at <a href="https://yalepitchbook.com" className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">yalepitchbook.com</a>.
          </p>
          <p>
            Analysts use conversations with founders and official material to collate information for each one-pager and form an opinion.
          </p>
          <p>
            Version 1 is the first iteration, analyzing 10+ Yale startups seeking investment, primarily in the pre-seed and seed stage. These companies represent high-potential, early-stage ventures with opportunities for mentorship, funding, or partnership.
          </p>
          <p>
            If you are interested in learning more about a startup or its founders, feel free to reach out to the founder directly, or let us know if you would like an introduction. We simply request that you let us know if you do—this is the primary mechanism for us to learn about the impact of our work.
          </p>
        </div>
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
        {/* Embedded PDF */}
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
            <span className="text-sm text-gray-600">Pitchbook v1 (PDF)</span>
            <a href="/pitchbook/v1.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 hover:underline">Open in new tab</a>
          </div>
          <div className="h-[80vh] w-full">
            <iframe
              src="/pitchbook/v1.pdf#view=FitH"
              title="Yale Startup Pitchbook v1"
              className="w-full h-full"
            />
          </div>
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 text-sm text-gray-600">
            If the PDF does not load, <a href="/pitchbook/v1.pdf" className="text-blue-700 hover:underline">download it here</a>.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
