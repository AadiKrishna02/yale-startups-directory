'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function PitchbookPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push('/login?redirect=/pitchbook');
      return;
    }

    // Check if user has pitchbook access
    const checkAccess = async () => {
      try {
        const res = await fetch('/api/pitchbook/check-access');
        const data = await res.json();
        
        if (!data.hasAccess) {
          // Redirect to access gate
          router.push('/pitchbook-access');
        }
      } catch (err) {
        console.error('Failed to check access:', err);
        router.push('/pitchbook-access');
      }
    };

    checkAccess();
  }, [user, router]);

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

  // Show loading state while checking auth
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
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-4 text-blue-950">Yale Startup Pitchbook — v1</h1>
        <div className="text-gray-700 leading-7 space-y-4 mb-8">
          <p>
            Yale Startup Pitchbook is a curated collection of startups by Yale founders seeking investment, part of the larger initiative to connect Yale startups with resources, talent, and investment opportunities.
          </p>
          <p>
            Version 1 is the first iteration, analyzing 10+ Yale startups seeking investment, primarily in the pre-seed and seed stage. These companies represent high-potential, early-stage ventures with opportunities for mentorship, funding, or partnership.
          </p>
          <p>
            If you are interested in learning more about a startup or its founders, please reach out to us for an introduction.
          </p>
        </div>
        {/* Embedded PDF */}
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
            <span className="text-sm text-gray-600">Pitchbook v1 (PDF)</span>
            <a href="/202510_Pitchbook_vFinal.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 hover:underline">Open in new tab</a>
          </div>
          <div className="w-full" style={{ aspectRatio: '8.5 / 11' }}>
            <iframe
              src="/202510_Pitchbook_vFinal.pdf#view=FitH"
              title="Yale Startup Pitchbook v1"
              className="w-full h-full"
            />
          </div>
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 text-sm text-gray-600">
            If the PDF does not load, <a href="/202510_Pitchbook_vFinal.pdf" className="text-blue-700 hover:underline">download it here</a>.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
