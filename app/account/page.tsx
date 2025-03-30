'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import ExcelJS from 'exceljs';

interface Startup {
  id?: number; // assume an id field exists in your Supabase table
  name?: string;
  description?: string;
  industry?: string;
  founders?: string;
  stage?: string;
  team?: string;
  website?: string;
  [key: string]: string | number | undefined;
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
        const response = await fetch('/startups.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);
        const worksheet = workbook.worksheets[0];

        // Extract headers from the first row (ignoring the first element)
        const headers = (worksheet.getRow(1).values as any[]).slice(1) as string[];

        const data: Startup[] = [];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return; // skip header row
          const rowData: Startup = {};
          const values = row.values as (string | ExcelJS.CellValue | undefined)[];
          values.slice(1).forEach((value, index) => {
            const header = headers[index];
            if (header) {
              if (value && typeof value === 'object' && 'text' in value) {
                rowData[header] = value.text;
              } else {
                rowData[header] = value?.toString();
              }
            }
          });
          data.push(rowData);
        });

        // Normalize the user's full name by removing spaces and lowercasing
        const normalizedUserName = user.name.replace(/\s+/g, '').toLowerCase();

        // Filter startups where the "founders" column (normalized) includes the user's full name.
        const filtered = data.filter((startup) => {
          if (!startup.founders) return false;
          const foundersList = startup.founders.split(',')
            .map(f => f.replace(/\s+/g, '').toLowerCase());
          return foundersList.includes(normalizedUserName);
        });
        setUserStartups(filtered);
      } catch (error) {
        console.error('Error loading startups for account:', error);
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
            {/* Logout button on the account page */}
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
                  {userStartups.map((startup, index) => (
                    <div key={index} className="p-4 border rounded shadow-sm bg-white">
                      <div className="mb-2">
                        <label className="block font-medium">Startup Name</label>
                        <input
                          type="text"
                          value={startup.name || ''}
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
                      {/* Additional fields as needed */}
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
