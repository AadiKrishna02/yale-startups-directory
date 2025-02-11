'use client';

import React from 'react';
import { ArrowUpRight, Users, Eye, Briefcase, Database, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  const benefits = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Gain Visibility with Leading Investors",
      description: "Connect directly with top-tier venture capital firms and angel investors actively looking for innovative Yale startups."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Connect with Talented Team Members",
      description: "Find co-founders and team members from Yale's diverse pool of talented individuals across various disciplines."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Amplify Your Reach",
      description: "Showcase your startup to the Yale and larger entrepreneurial community, expanding your network and opportunities."
    }
  ];

  const stats = [
    { number: "60+", label: "VC Partners" },
    { number: "$27B", label: "Assets Managed" },
    { number: "$23M", label: "Investments Facilitated" }
  ];

  const offerings = [
    {
      icon: <Database className="w-8 h-8" />,
      title: "Yale Startup Directory",
      description: "A comprehensive database showcasing the innovative startups emerging from Yale's entrepreneurial ecosystem. Get discovered by investors, potential team members, and collaborators.",
      cta: {
        text: "Submit Your Startup",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform"
      }
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Yale Startup Pitchbook",
      description: "An exclusive opportunity to present your venture to our extensive network of investors. Selected startups will be featured in our curated pitchbook distributed to top-tier VCs.",
      cta: {
        text: "Coming Soon!",
        isComingSoon: true
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="relative bg-gradient-to-b from-blue-900 to-blue-800">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            <svg className="absolute transform translate-x-1/3 translate-y-1/4 opacity-10" width="404" height="384" fill="none" viewBox="0 0 404 384">
              <defs>
                <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-blue-400" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
            </svg>
            <svg className="absolute transform -translate-x-1/3 -translate-y-1/4 opacity-10" width="404" height="384" fill="none" viewBox="0 0 404 384">
              <defs>
                <pattern id="d3eb07ae-5182-43e6-857d-35c643af9035" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-blue-400" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9035)" />
            </svg>
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700/30 via-transparent to-transparent"></div>
          
          {/* Animated Circles */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight bg-clip-text">
                Yale Pitchbook
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
                Connecting Yale's most innovative startups with resources, talent, and investment opportunities.
              </p>
              <p className="text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
                Yale Undergraduate Capital Partners (YUCP) is thrilled to announce the launch of the 
                <span className="font-semibold text-white"> Yale Startup Directory</span> and <span className="font-semibold text-white"> Yale Startup Pitchbook</span>!
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </div>
      </div>

      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Offerings Section */}
          <div className="pt-12 pb-24">
            <h2 className="text-4xl font-bold text-center text-blue-950 mb-12">Our Initiatives</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {offerings.map((offering, index) => (
                <div key={index} className="bg-white/95 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-blue-100 rounded-xl p-4 text-blue-600">
                      {offering.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-blue-950">{offering.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-8 text-lg">
                    {offering.description}
                  </p>
                  {offering.cta.isComingSoon ? (
                    <div className="text-2xl font-bold text-blue-600 tracking-wide">
                      {offering.cta.text}
                    </div>
                  ) : (
                    <a
                      href={offering.cta.link}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {offering.cta.text}
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="pb-24">
            <h2 className="text-4xl font-bold text-center text-blue-950 mb-12">Why Join Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="group bg-white/95 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-950 mb-4 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Network Section */}
          <div className="pb-24">
            <h2 className="text-4xl font-bold text-center text-blue-950 mb-12">Our Network</h2>
            <div className="bg-blue-900 rounded-2xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-950"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/50 via-transparent to-transparent"></div>
              <div className="relative grid md:grid-cols-3 gap-12 text-center">
                {stats.map((stat, index) => (
                  <div key={index} className="group">
                    <div className="text-5xl font-bold text-white mb-3">{stat.number}</div>
                    <div className="text-blue-200 text-lg">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About YUCP Section */}
          <div className="pb-24">
            <h2 className="text-4xl font-bold text-center text-blue-950 mb-8">About YUCP</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-700 mb-6">
                Yale Undergraduate Capital Partners (YUCP) is a student-led organization dedicated to fostering entrepreneurship
                and innovation within the Yale community. As a proud member of the Collegiate Capital Partners network, which spans
                five universities, we have built an impressive track record of connecting startups with opportunities.
              </p>
              <p className="text-lg text-gray-700">
                Our mission is to bridge the gap between Yale's innovative startups and the resources they need to succeed,
                whether that's connecting with investors, finding team members, or gaining visibility in the startup ecosystem.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="max-w-3xl mx-auto text-center mb-24">
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Join the Directory</h3>
              <p className="text-gray-700 mb-6 text-lg">
                To join the Yale Startup Directory, please fill out our brief form. Startups will continue to be 
                added on a rolling basis.
              </p>
              <p className="text-gray-600 text-lg">
                Questions? Contact us at{' '}
                <a href="mailto:aadi.krishna@yale.edu" className="text-blue-600 hover:text-blue-700 font-medium">
                  aadi.krishna@yale.edu
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
