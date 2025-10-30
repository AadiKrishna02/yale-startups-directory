'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

export default function PitchbookPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

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

  const handleViewPdf = () => {
    // Open PDF in view-only mode using Google Docs Viewer (no download option)
    const pdfUrl = encodeURIComponent(window.location.origin + '/Pitchbook.pdf');
    const googleViewerUrl = `https://docs.google.com/viewer?url=${pdfUrl}&embedded=false`;
    window.open(googleViewerUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenPdf = () => {
    // Open PDF directly (may show download option depending on browser)
    window.open('/Pitchbook.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-4 text-blue-950">Yale Startup Pitchbook — v1</h1>
        <div className="text-gray-700 leading-7 space-y-4 mb-8">
          <p>
            Welcome to the Yale Startup Pitchbook, a curated collection of high-potential startups founded by Yale students, alumni, and faculty. This resource is designed for investors, partners, and collaborators interested in connecting with the Yale entrepreneurial ecosystem.
          </p>
          <p>
            Our startups span diverse industries including technology, healthcare, sustainability, and social impact. Each profile includes key information about the company's mission, market opportunity, team, and current funding needs.
          </p>
          <p>
            Version 1 is the first iteration, analyzing 10+ Yale startups seeking investment, primarily in the pre-seed and seed stage. These companies represent high-potential, early-stage ventures with opportunities for mentorship, funding, or partnership.
          </p>
          <p>
            If you are interested in learning more about a startup or its founders, please reach out to us for an introduction.
          </p>
        </div>

        {/* PDF Access Section */}
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div className="text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Yale Startup Pitchbook v1</h2>
              <p className="text-gray-600 mb-6">
                Access the complete pitchbook featuring 10+ high-potential Yale startups seeking investment.
              </p>
            </div>

            <div className="space-y-4">
              {/* Primary View Button - No Download Option */}
              <button
                onClick={handleViewPdf}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Pitchbook
              </button>

              {/* Alternative Open Button */}
              <div className="text-sm text-gray-500">
                <span>or </span>
                <button
                  onClick={handleOpenPdf}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  open PDF directly
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                The pitchbook will open in a new tab. If you experience any issues viewing the document, 
                please try the alternative link above or contact us for assistance.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
