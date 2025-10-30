'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function PitchbookPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    // Don't redirect while still loading
    if (loading) return;
    
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
  }, [user, loading, router]);

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
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">{loading ? 'Loading...' : 'Redirecting to login...'}</p>
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
            <a href="/20252910_Investor_Pitchbook_vFinal.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 hover:underline">Open in new tab</a>
          </div>
          <div className="w-full min-h-[800px] bg-gray-50">
            {!pdfError ? (
              <iframe
                src="/20252910_Investor_Pitchbook_vFinal.pdf#view=FitH&toolbar=1"
                title="Yale Startup Pitchbook v1"
                className="w-full h-[800px] border-0"
                onLoad={() => console.log('PDF loaded successfully')}
                onError={() => {
                  console.error('PDF iframe failed to load');
                  setPdfError(true);
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-[800px] text-center p-8">
                <div className="text-gray-600">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg font-medium mb-2">PDF Preview Unavailable</p>
                  <p className="text-sm text-gray-500 mb-6">Your browser cannot display this PDF inline.</p>
                  <div className="space-y-3">
                    <a 
                      href="/20252910_Investor_Pitchbook_vFinal.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open in New Tab
                    </a>
                    <br />
                    <button 
                      onClick={() => setPdfError(false)}
                      className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 text-sm text-gray-600">
            If the PDF does not load above, <a href="/20252910_Investor%20Pitchbook_vFinal.pdf" className="text-blue-700 hover:underline">download it here</a>.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
