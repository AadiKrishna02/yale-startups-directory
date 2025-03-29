// app/account/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

interface Startup {
  id: number;
  name: string;
  description?: string;
  founders?: string;
  // include other fields as needed
}

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [userStartups, setUserStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserStartups() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        // Query Supabase for startups where the founders field contains the user's netid.
        const { data, error } = await supabase
          .from('startups')
          .select('*')
          .ilike('founders', `%${user.netid}%`);
        if (error) {
          console.error("Error fetching startups:", error);
        } else {
          setUserStartups(data as Startup[]);
        }
      } catch (error) {
        console.error('Error loading startups:', error);
      } finally {
        setLoading(false);
      }
    }
    loadUserStartups();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              {user && <p className="text-xl font-medium">Hi, {user.name}!</p>}
              <h1 className="text-3xl font-bold">Your Account</h1>
            </div>
            {/* Logout button remains on the account page */}
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
          {loading ? (
            <p>Loading your startups...</p>
          ) : (
            <>
              {userStartups.length === 0 ? (
                <p>You are not listed as a founder for any startups.</p>
              ) : (
                <div className="space-y-6">
                  {userStartups.map((startup) => (
                    <div key={startup.id} className="p-4 border rounded shadow-sm bg-white">
                      <div className="mb-2">
                        <label className="block font-medium">Startup Name</label>
                        <input
                          type="text"
                          value={startup.name}
                          readOnly
                          className="w-full p-2 border rounded bg-gray-100"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block font-medium">Description</label>
                        <textarea
                          value={startup.description || ''}
                          readOnly
                          className="w-full p-2 border rounded bg-gray-100"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block font-medium">Founders</label>
                        <input
                          type="text"
                          value={startup.founders || ''}
                          readOnly
                          className="w-full p-2 border rounded bg-gray-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
