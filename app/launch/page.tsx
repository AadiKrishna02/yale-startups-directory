import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Briefcase, Lightbulb } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LaunchPage() {
  const eventPhotos = [
    '/event-photo1.PNG',
    '/event-photo2 2.jpg',
    '/event-photo3.JPG',
    '/event-photo4.jpg',
    '/event-photo5 2.jpg',
    '/event-photo6.jpg',
  ];
  const flyerUrl = '/Yale Pitchbook & Launch - Latest.jpg';
  const xfundLogo = '/xfund-logo.png';

  return (
    <>
      <Head>
        <title>Launch Mixer Recap | Yale Pitchbook</title>
        <meta name="description" content="Recap of our mixer launch event" />
      </Head>

      <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
        <Header />

        <main className="flex-1 py-20">
          <div className="container mx-auto px-6 text-center">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-[#0F4D92]">
              Launch Mixer Recap
            </h1>

            {/* Recap Text */}
            <div className="max-w-3xl mx-auto space-y-6 text-lg mb-12">
              <p>
                To launch <span className="font-semibold">Yale Pitchbook</span>, we held a mixer for alumni investors & founders, leading VC firms, Yale entrepreneurs, and students on
                <time dateTime="2025-04-03" className="font-semibold"> April 3, 2025</time> from 8:30–10:30 PM at Steep Café, sponsored by Xfund.
              </p>
              <p>Check out the flyer below for more details:</p>
              <div className="inline-block">
                <Link href={flyerUrl} target="_blank">
                  <a className="inline-block bg-[#0F4D92] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
                    Download Event Flyer
                  </a>
                </Link>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto mb-16">
              {[
                { icon: Users, label: 'Attendees', value: '125+' },
                { icon: Briefcase, label: 'VC Firms', value: '5+' },
                { icon: Lightbulb, label: 'Founders', value: '25+' },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-gray-50 p-6 rounded-2xl shadow-sm text-center"
                >
                  <Icon className="mx-auto mb-2 h-8 w-8 text-[#0F4D92]" />
                  <div className="text-4xl font-bold">{value}</div>
                  <div className="mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Photo Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto mb-16">
              {eventPhotos.map((src, idx) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={src}
                    alt={`Event Photo ${idx + 1}`}
                    layout="responsive"
                    width={600}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>

            {/* Sponsor */}
            <div className="mt-20 text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Sponsored by
              </h2>
              <Link href="https://xfund.com" target="_blank" rel="noopener noreferrer">
                <a className="inline-block bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                  <Image
                    src={xfundLogo}
                    alt="Xfund Logo"
                    width={180}
                    height={80}
                    className="object-contain"
                  />
                </a>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
