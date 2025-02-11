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
      features: [
        "Public visibility for your startup",
        "Connect with potential team members",
        "Join Yale's startup community"
      ],
      cta: {
        text: "Submit Your Startup",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform"
      }
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Yale Startup Pitchbook",
      description: "An exclusive opportunity to present your venture to our extensive network of investors. Selected startups will be featured in our curated pitchbook distributed to top-tier VCs.",
      features: [
        "Direct investor exposure",
        "Professional pitch presentation",
        "Targeted fundraising opportunities"
      ],
      cta: {
        text: "Learn More",
        link: "/about"
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-32">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-1/4 top-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute -left-1/4 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
                Empowering Yale Startups
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join Yale's premier platform connecting innovative startups with resources, talent, and investment opportunities.
              </p>
            </div>

            {/* Stats Section */}
            <div className="bg-blue-900 rounded-2xl p-12 mb-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-950"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/50 via-transparent to-transparent"></div>
              <div className="relative grid md:grid-cols-3 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div key={index} className="group">
                    <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offerings Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-24">
              {offerings.map((offering, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-100 rounded-xl p-4 text-blue-600">
                      {offering.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-blue-950">{offering.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {offering.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {offering.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={offering.cta.link}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    target={offering.cta.link.startsWith('http') ? "_blank" : undefined}
                    rel={offering.cta.link.startsWith('http') ? "noopener noreferrer" : undefined}
                  >
                    {offering.cta.text}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-24">
              {benefits.map((benefit, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
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

            {/* Contact Section */}
            <div className="max-w-3xl mx-auto text-center mb-24">
              <p className="text-gray-600">
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
