// app/launch/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LaunchPage() {
  const eventPhotos = [
    '/event-photo1.PNG',
    '/event-photo2.jpg',
    '/event-photo3.JPG',
  ];
  const flyerUrl = '/Yale Pitchbook & Launch - Latest.jpg';   // or '/launch-flyer.pdf'
  const xfundLogo = '/xfund-logo.png';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <Header />

      <main className="flex-1 px-6 py-20">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">
          Launch Mixer Recap
        </h1>

        {/* Recap Text */}
        <div className="max-w-3xl mx-auto mb-12 space-y-4 text-center">
          <p className="italic">
            Apologies for the delay — I’ve been buried in exams and recovering from an illness.
          </p>
          <p className="text-lg">
            Despite a last-minute location change, our launch mixer at Steep Café was a huge
            success: over <strong>125 attendees</strong>, from founders and VCs to scouts,
            students, and alumni, all having fantastic conversations.
          </p>
          <p className="text-lg">
            Check out the flyer below for more details:
          </p>
          <Link
            href={flyerUrl}
            target="_blank"
            className="inline-block mt-2 bg-white text-blue-800 px-5 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Download Event Flyer
          </Link>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16 text-center max-w-4xl mx-auto">
          <div>
            <div className="text-6xl font-extrabold">125+</div>
            <div className="mt-2 text-lg">Attendees</div>
          </div>
          <div>
            <div className="text-6xl font-extrabold">5+</div>
            <div className="mt-2 text-lg">Investors</div>
          </div>
          <div>
            <div className="text-6xl font-extrabold">1</div>
            <div className="mt-2 text-lg">Sponsor</div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 max-w-5xl mx-auto">
          {eventPhotos.map((src, idx) => (
            <div key={idx} className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={src}
                alt={`Launch event photo ${idx + 1}`}
                width={400}
                height={300}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Event Details */}
        <div className="max-w-md mx-auto mb-16 space-y-2 text-center">
          <p className="text-xl">
            <strong>Date:</strong> Thursday, April 3
          </p>
          <p className="text-xl">
            <strong>Time:</strong> 8:30 – 10:30 pm
          </p>
          <p className="text-xl">
            <strong>Location:</strong> Steep Café, Kline Tower
          </p>
        </div>

        {/* Sponsor */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Presented by</h2>
          <div className="inline-block p-4 bg-white rounded-lg shadow-md">
            <Image
              src={xfundLogo}
              alt="Xfund Logo"
              width={200}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

