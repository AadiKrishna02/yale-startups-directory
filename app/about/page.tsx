'use client';

import React from 'react';
import { ArrowUpRight, Users, Eye, Briefcase } from 'lucide-react';

const Header = () => (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/Logo.png"
                alt="Yale Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              item.isExternal ? (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-gray-600 hover:text-blue-700 px-3 py-1.5 text-sm font-medium transition-colors ${
                    item.isBoxed
                      ? 'border border-blue-700 rounded-lg px-3 py-1.5 bg-blue-100'
                      : ''
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-600 hover:text-blue-700 px-3 py-1.5 text-sm font-medium transition-colors ${
                    item.isBoxed
                      ? 'border border-blue-700 rounded-lg px-3 py-1.5 bg-blue-100'
                      : ''
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-700"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-gray-50 rounded-md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-gray-50 rounded-md"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-24">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-12 lg:px-24 relative">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
            About Yale Startup Directory
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connecting Yale's most promising startups with resources, talent, and opportunities.
          </p>
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

        {/* Content Section */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="prose prose-lg">
            <p className="text-lg mb-6">
              We are thrilled to announce that Yale Undergraduate Capital Partners (YUCP) is launching the 
              <span className="font-semibold text-blue-900"> Yale Startup Directory</span> – the largest 
              online database showcasing startups at Yale.
            </p>
            <p className="text-lg mb-6">
              YUCP is a proud member of the Collegiate Capital Partners network, which spans five universities 
              and has built an impressive track record of connecting startups with opportunities.
            </p>
            <p className="text-lg mb-6">
              For startups seeking funding, we're excited to announce our upcoming 
              <span className="font-semibold text-blue-900"> Yale Startup Pitchbook</span>, designed to 
              present your venture to an extensive network of investors. We will reach out to interested 
              startups for more information.
            </p>
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Join the Directory</h3>
              <p className="text-gray-700 mb-4">
                To join the Yale Startup Directory, please fill out our brief form by 
                <span className="font-semibold"> February 10, 2025</span>. Startups will continue to be 
                added on a rolling basis afterward.
              </p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Your Startup
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-gray-600">
              If you have any questions or need further information, don't hesitate to reach out to us at 
              <a href="mailto:aadi.krishna@yale.edu" className="text-blue-600 hover:text-blue-700"> aadi.krishna@yale.edu</a>. 
              We can't wait to hear your story and support your entrepreneurial aspirations!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
