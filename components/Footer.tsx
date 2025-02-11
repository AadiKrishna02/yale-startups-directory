'use client';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full">
      <footer className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 w-full relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-blue-300 blur-3xl"></div>
        </div>
        
        {/* Content container with wider max-width and adjusted padding */}
        <div className="max-w-[90%] mx-auto px-6 py-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-blue-700/30">
            {/* Logo and Description Section - Made wider */}
            <div className="md:col-span-6 flex flex-col items-center md:items-start">
              <img
                src="/Logo.png"
                alt="Yale Logo"
                className="h-20 w-auto mb-6 brightness-0 invert"
              />
              <h4 className="text-xl font-semibold text-white/90 mb-4">Yale Startup Directory</h4>
              <p className="text-base text-blue-100/80 text-center md:text-left max-w-xl">
                Connecting Yale startups with resources, talent, and funding opportunities. Join our growing community of innovators and entrepreneurs.
              </p>
            </div>

            {/* Contact Section */}
            <div className="md:col-span-3 flex flex-col md:items-start items-center">
              <h4 className="text-lg font-semibold text-white/90 mb-6">Contact</h4>
              <div className="space-y-4">
                <p className="text-base text-blue-100/80 hover:text-white/90 transition-colors">
                  <a href="mailto:aadi.krishna@yale.edu">aadi.krishna@yale.edu</a>
                </p>
                <p className="text-base text-blue-100/80">New Haven, CT</p>
                <p className="text-base text-blue-100/80">Yale University</p>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="md:col-span-3 flex flex-col md:items-start items-center">
              <h4 className="text-lg font-semibold text-white/90 mb-6">Quick Links</h4>
              <ul className="space-y-4 text-center md:text-left">
                <li>
                  <Link href="/about" className="text-base text-blue-100/80 hover:text-white/90 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform" 
                    className="text-base text-blue-100/80 hover:text-white/90 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Submit Your Startup
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.yucp.org"
                    className="text-base text-blue-100/80 hover:text-white/90 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YUCP
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section with more padding */}
          <div className="pt-8 text-center">
            <p className="text-base text-blue-100/70">
              © {new Date().getFullYear()} Yale Undergraduate Capital Partners. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
