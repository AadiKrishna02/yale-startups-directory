// app/launch/page.tsx
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
          <Container className="text-center">
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
                To launch <span className="font-semibold">Yale Pitchbook</span>, we held a mixer for alumni investors & founders, leading VC firms, Yale entrepreneurs, and students on
                <time dateTime="2025-04-03" className="font-semibold"> April 3, 2025</time> from 8:30–10:30 PM at Steep Café, sponsored by Xfund.
              </p>
              <p>Check out the flyer below for more details:</p>
              <Card className="bg-gray-900 mx-auto shadow-lg">
                <CardContent className="py-6 px-8 flex justify-center">
                  <Link href={flyerUrl} target="_blank" passHref>
                    <Button variant="outline" size="lg">
                      Download Event Flyer
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
            >
              <Card className="bg-gray-800 text-center p-6 shadow-md">
                <Users className="mx-auto mb-2 h-8 w-8 text-purple-400" />
                <div className="text-4xl font-bold">125+</div>
                <div className="mt-1">Attendees</div>
              </Card>

              <Card className="bg-gray-800 text-center p-6 shadow-md">
                <Briefcase className="mx-auto mb-2 h-8 w-8 text-purple-400" />
                <div className="text-4xl font-bold">5+</div>
                <div className="mt-1">VC Firms</div>
              </Card>

              <Card className="bg-gray-800 text-center p-6 shadow-md">
                <Lightbulb className="mx-auto mb-2 h-8 w-8 text-purple-400" />
                <div className="text-4xl font-bold">25+</div>
                <div className="mt-1">Founders</div>
              </Card>
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
              <Card className="inline-block p-6 bg-white rounded-2xl shadow-xl">
                <Image
                  src={xfundLogo}
                  alt="Xfund Logo"
                  width={180}
                  height={80}
                  className="object-contain"
                />
              </Card>
            </motion.div>
          </Container>
        </main>

        <Footer />
      </div>
    </>
  );
}


