import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Briefcase, Lightbulb } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LaunchPage() {
  const eventPhotos = [
    '/event-photo1.PNG',
    '/event-photo2.jpg',
    '/event-photo3.JPG',
  ];
  const flyerUrl = '/Yale Pitchbook & Launch - Latest.jpg';
  const xfundLogo = '/xfund-logo.png';

  return (
    <>
      <Head>
        <title>Launch Mixer Recap | Yale Pitchbook</title>
        <meta name="description" content="Recap of our mixer launch event" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Header />

        <main className="flex-1 py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Launch Mixer Recap
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-3xl mx-auto space-y-6 text-lg"
            >
              <p>
                To launch <span className="font-semibold">Yale Pitchbook</span>, we held a mixer for alumni investors & founders, leading VC firms,
                Yale entrepreneurs, and students on
                <time dateTime="2025-04-03" className="font-semibold"> April 3, 2025</time>
                from 8:30–10:30&nbsp;PM at Steep Café, sponsored by Xfund.
              </p>
              <p>Check out the flyer below for more details:</p>

              <div className="inline-block mt-4">
                <Link href={flyerUrl} target="_blank">
                  <a className="inline-block bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
                    Download Event Flyer
                  </a>
                </Link>
              </div>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
            >
              {[
                { icon: Users, label: 'Attendees', value: '125+' },
                { icon: Briefcase, label: 'VC Firms', value: '5+' },
                { icon: Lightbulb, label: 'Founders', value: '25+' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-gray-800 p-6 rounded-2xl shadow-md text-center">
                  <Icon className="mx-auto mb-2 h-8 w-8 text-purple-400" />
                  <div className="text-4xl font-bold">{value}</div>
                  <div className="mt-1">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Photo Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto"
            >
              {eventPhotos.map((src, idx) => (
                <motion.div
                  key={src}
                  whileHover={{ scale: 1.05 }}
                  className="overflow-hidden rounded-2xl shadow-lg"
                >
                  <Image
                    src={src}
                    alt={`Event Photo ${idx + 1}`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Sponsor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-20 text-center"
            >
              <h2 className="text-2xl font-semibold mb-4">Presented by</h2>
              <Link href="https://xfund.com" target="_blank" rel="noopener noreferrer">
                <a className="inline-block bg-white p-6 rounded-2xl shadow-xl">
                  <Image
                    src={xfundLogo}
                    alt="Xfund Logo"
                    width={180}
                    height={80}
                    className="object-contain"
                  />
                </a>
              </Link>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}


