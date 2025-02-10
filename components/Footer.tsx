'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 w-full relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-blue-300 blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-12 lg:px-24 py-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-blue-700/30">
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            <img
              src="/Logo.png"
              alt="Yale Logo"
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <h4 className="text-lg font-semibold text-white/90 mb-2">Yale Startup Directory</h4>
            <p className="text-sm text-blue-100/80 text-center md:text-left">
              Connecting Yale startups with resources, talent, and funding opportunities.
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col md:items-start items-center">
            <h4 className="text-base font-semibold text-white/90 mb-3">Contact</h4>
            <div className="space-y-2">
              <p className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
                <a href="mailto:aadi.krishna@yale.edu">aadi.krishna@yale.edu</a>
              </p>
              <p className="text-sm text-blue-100/80">New Haven, CT</p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col md:items-start items-center">
            <h4 className="text-base font-semibold text-white/90 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link href="/about" className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform" 
                  className="text-sm text-blue-100/80 hover:text-white/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Submit Your Startup
                </a>
              </li>
              <li>
                <a 
                  href="https://www.yucp.org"
                  className="text-sm text-blue-100/80 hover:text-white/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YUCP
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-center">
          <p className="text-sm text-blue-100/70">
            © {new Date().getFullYear()} Yale Startup Directory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
