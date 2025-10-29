'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

interface AccessRequest {
  id: string;
  user_email: string;
  user_name: string;
  user_type: 'student' | 'investor';
  affiliation?: string;
  reason?: string;
  status: 'pending' | 'approved' | 'denied';
  requested_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export default function PitchbookRequestsAdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    // Basic admin check - you can make this more sophisticated
    if (!user || (user.type === 'student' && user.email !== 'aadi.krishna@yale.edu')) {
      router.push('/');
      return;
    }

    fetchRequests();
  }, [user, router]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/pitchbook-requests');
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      } else {
        setError('Failed to fetch requests');
      }
    } catch (err) {
      setError('An error occurred while fetching requests');
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (requestId: string, status: 'approved' | 'denied') => {
    try {
      setProcessingId(requestId);
      const res = await fetch('/api/pitchbook/approve-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          status,
          adminEmail: user?.email || 'admin',
        }),
      });

      if (res.ok) {
        // Refresh the requests list
        await fetchRequests();
      } else {
        const data = await res.json();
        setError(data.error || `Failed to ${status} request`);
      }
    } catch (err) {
      setError(`An error occurred while ${status === 'approved' ? 'approving' : 'denying'} the request`);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'denied':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (!user || (user.type === 'student' && user.email !== 'aadi.krishna@yale.edu')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Access denied</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-950 mb-2">Pitchbook Access Requests</h1>
          <p className="text-gray-600">Manage access requests for the Yale Startup Pitchbook</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-6">
            <p>{error}</p>
            <button
              onClick={() => setError('')}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No access requests found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.user_name}
                    </h3>
                    <p className="text-sm text-gray-600">{request.user_email}</p>
                    <p className="text-sm text-gray-500 capitalize">{request.user_type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={getStatusBadge(request.status)}>
                      {request.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(request.requested_at)}
                    </span>
                  </div>
                </div>

                {request.affiliation && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700">Affiliation:</p>
                    <p className="text-sm text-gray-600">{request.affiliation}</p>
                  </div>
                )}

                {request.reason && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Reason:</p>
                    <p className="text-sm text-gray-600">{request.reason}</p>
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleRequest(request.id, 'approved')}
                      disabled={processingId === request.id}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
                    >
                      {processingId === request.id ? 'Processing...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleRequest(request.id, 'denied')}
                      disabled={processingId === request.id}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
                    >
                      {processingId === request.id ? 'Processing...' : 'Deny'}
                    </button>
                  </div>
                )}

                {request.status !== 'pending' && request.reviewed_at && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      {request.status === 'approved' ? 'Approved' : 'Denied'} on{' '}
                      {formatDate(request.reviewed_at)}
                      {request.reviewed_by && ` by ${request.reviewed_by}`}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={fetchRequests}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Refresh
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
