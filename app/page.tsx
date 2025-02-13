'use client';

import React from 'react';
import { ArrowUpRight, Users, Eye, Briefcase, Database, BookOpen, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function HomePage() {
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
    { number: "$27B", label: "AUM" },
    { number: "$23M", label: "Investments Facilitated" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section with Enhanced Visual Elements */}
      <div className="relative min-h-[75vh] flex items-center bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {/* Enhanced Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            
            {/* Glowing Orbs */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
        </div>

        {/* Hero Content with Enhanced Layout */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Yale Pitchbook
            </h1>
            <p className="text-1xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              Connecting Yale startups with resources, talent, and investment opportunities.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
              <Link
                href="/directory"
                className="group relative inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 text-base font-medium overflow-hidden"
              >
                <span className="relative z-10">View Directory</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <a
                href="#learn-more"
                className="group inline-flex items-center gap-2 text-white hover:text-blue-200 transition-colors text-base"
              >
                Learn More
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </div>

      <main className="bg-white relative">
{/*         {/* Curved Separator */}
        <div className="absolute top-0 inset-x-0 h-32 bg-blue-800">
          <svg 
            className="absolute bottom-0 w-full h-32 transform translate-y-1/2"
            viewBox="0 0 1440 160" 
            preserveAspectRatio="none" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M0 160L1440 160L1440 0C1440 0 1040 160 720 160C400 160 0 0 0 0L0 160Z" 
              fill="white"
            />
          </svg>
        </div> */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          {/* Initiatives Section */}
          <div className="pt-16 mb-16" id="learn-more">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold text-blue-950 mb-6">Our Initiatives</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                We provide two key platforms to support Yale's startup ecosystem. The Directory offers 
                a central hub for all Yale startups, while the Pitchbook provides curated 
                opportunities for investment-ready ventures.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="group bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-blue-100 rounded-xl p-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Database className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950">Yale Startup Directory</h3>
                </div>
                <p className="text-gray-600 mb-8 text-lg">
                  A comprehensive database showcasing startups emerging from Yale's entrepreneurial ecosystem. Get discovered by investors, potential team members, and users.
                </p>
                <Link
                  href="/directory"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg font-medium transform hover:-translate-y-1"
                >
                  View Directory
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="group bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-blue-100 rounded-xl p-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950">Yale Startup Pitchbook</h3>
                </div>
                <p className="text-gray-600 mb-8 text-lg">
                  A unique opportunity for select startups to be featured in our curated pitchbook distributed to an extensive set of global investors, including our network.
                </p>
                <div className="text-2xl font-bold text-blue-600 tracking-wide">
                  Coming Soon!
                </div>
              </div>
            </div>
          </div>


          {/* Benefits Section with Enhanced Cards */}
          <div className="pb-24">
            <h2 className="text-4xl font-bold text-center text-blue-950 mb-16">Why Join?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} 
                  className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="bg-blue-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
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

          {/* Contact Section with Enhanced Design */}
          <div className="max-w-3xl mx-auto text-center mb-24">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-12 border border-blue-100 shadow-lg">
              <h3 className="text-3xl font-bold text-blue-900 mb-6">Join the Directory</h3>
              <p className="text-gray-700 mb-8 text-lg">
                To join the Yale Startup Directory, please fill out our brief form. Startups will continue to be 
                added on a rolling basis.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg font-medium transform hover:-translate-y-1"
              >
                Join Now
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* About YUCP Section */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold text-center text-blue-950 mb-12">About YUCP</h2>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-xl text-gray-700 leading-relaxed">
                YUCP is a proud member of the Collegiate Capital Partners network, which spans five universities 
                and has built an impressive track record of connecting startups with opportunities.
              </p>
            </div>

            {/* Stats with new design */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
              <div className="relative grid md:grid-cols-3 gap-12">
                {stats.map((stat, index) => (
                  <div key={index} className="group text-center transform hover:-translate-y-1 transition-all duration-300">
                    <div className="text-5xl font-bold text-white mb-3 bg-clip-text">{stat.number}</div>
                    <div className="text-blue-200 text-lg font-light">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
