'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-4">Your Account</h1>
        {user && (
          <p className="text-lg text-gray-700 mb-4">Welcome, {user.name}!</p>
        )}
        <p className="text-lg text-gray-700">
          This is your account page. Editing startup information coming soon!
        </p>
        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-8 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </main>
      <Footer />
    </div>
  );
}
