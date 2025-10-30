'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

export default function PitchbookPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showPdf, setShowPdf] = useState(false);
  const [embedMethod, setEmbedMethod] = useState('iframe'); // 'iframe', 'object', 'google'

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
        } else {
          // Access granted, show PDF
          setShowPdf(true);
        }
      } catch (err) {
        console.error('Failed to check access:', err);
        router.push('/pitchbook-access');
      }
    };

    checkAccess();
  }, [user, loading, router]);

  useEffect(() => {
    // Mark PDF as seen for investors
    const markSeen = async () => {
      try {
        if (user?.type === 'investor') {
          await fetch('/api/investor/pdf-seen', { method: 'POST' });
        }
      } catch (err) {
        console.error('Failed to mark PDF as seen', err);
      }
    };
    
    if (showPdf) {
      markSeen();
    }
  }, [user, showPdf]);

  // Show loading state while checking auth
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">{loading ? 'Loading...' : 'Redirecting to login...'}</p>
        </div>
      </div>
    );
  }

  const renderPdfEmbed = () => {
    const pdfUrl = '/Pitchbook.pdf';
    
    switch (embedMethod) {
      case 'iframe':
        return (
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="Yale Startup Pitchbook v1"
            className="w-full h-[800px] border-0 rounded"
            style={{ minHeight: '800px' }}
          />
        );
      
      case 'object':
        return (
          <object
            data={`${pdfUrl}#toolbar=1&navpanes=0`}
            type="application/pdf"
            className="w-full h-[800px] rounded"
            style={{ minHeight: '800px' }}
          >
            <embed
              src={`${pdfUrl}#toolbar=1&navpanes=0`}
              type="application/pdf"
              className="w-full h-[800px] rounded"
              style={{ minHeight: '800px' }}
            />
          </object>
        );
      
      case 'google':
        return (
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + pdfUrl)}&embedded=true`}
            title="Yale Startup Pitchbook v1"
            className="w-full h-[800px] border-0 rounded"
            style={{ minHeight: '800px' }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h1 className="text-4xl font-bold mb-6 text-blue-950">Yale Startup Pitchbook — v1</h1>
          <div className="text-gray-700 leading-7 space-y-4">
            <p>
              Welcome to the Yale Startup Pitchbook, a curated collection of high-potential startups founded by Yale students, alumni, and faculty. This resource is designed for investors, partners, and collaborators interested in connecting with the Yale entrepreneurial ecosystem.
            </p>
            <p>
              Our startups span diverse industries including technology, healthcare, sustainability, and social impact. Each profile includes key information about the company's mission, market opportunity, team, and current funding needs.
            </p>
            <p>
              Version 1 is the first iteration, analyzing 10+ Yale startups seeking investment, primarily in the pre-seed and seed stage. These companies represent high-potential, early-stage ventures with opportunities for mentorship, funding, or partnership.
            </p>
            <p className="text-blue-700 font-medium">
              If you are interested in learning more about a startup or its founders, please reach out to us for an introduction.
            </p>
          </div>
        </div>

        {/* PDF Viewer Section */}
        {showPdf ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* PDF Controls */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Pitchbook v1 (PDF)</h2>
                <div className="flex items-center space-x-4">
                  {/* Embed Method Selector */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">View method:</span>
                    <select
                      value={embedMethod}
                      onChange={(e) => setEmbedMethod(e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                    >
                      <option value="iframe">Standard</option>
                      <option value="object">Object Embed</option>
                      <option value="google">Google Viewer</option>
                    </select>
                  </div>
                  
                  {/* External Links */}
                  <a 
                    href="/Pitchbook.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in New Tab
                  </a>
                  
                  <a 
                    href="/Pitchbook.pdf" 
                    download="Yale-Startup-Pitchbook-v1.pdf"
                    className="inline-flex items-center px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            </div>

            {/* PDF Embed Container */}
            <div className="p-4 bg-gray-100">
              <div className="bg-white rounded shadow-inner">
                {renderPdfEmbed()}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
              <p className="text-sm text-gray-600">
                Having trouble viewing the PDF? Try switching the view method above or{' '}
                <a href="/Pitchbook.pdf" target="_blank" className="text-blue-600 hover:underline">
                  open it in a new tab
                </a>
                .
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking access permissions...</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
