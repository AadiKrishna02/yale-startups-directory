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
        <div className="max-w-[90%] mx-auto px-6 py-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-10 border-b border-blue-700/30">
            {/* Logo and Description Section */}
            <div className="md:col-span-6 flex flex-col items-center md:items-start">
              <img
                src="/Logo.png"
                alt="Yale Logo"
                className="h-16 w-auto mb-4 brightness-0 invert"
              />
              <h4 className="text-2xl font-semibold text-white/90 mb-2">Yale Pitchbook</h4>
              <p className="text-sm text-blue-100/80 text-center md:text-left max-w-xl">
                Connecting Yale startups with resources, talent, and funding opportunities. Join our growing community of innovators and entrepreneurs.
              </p>
            </div>

            {/* Contact Section */}
            <div className="md:col-span-3 flex flex-col md:items-start items-center">
              <h4 className="text-sm font-semibold text-white/90 mb-4">Contact</h4>
              <div className="space-y-2">
                <p className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
                  <a href="mailto:aadi.krishna@yale.edu">aadi.krishna@yale.edu</a>
                </p>
                <p className="text-sm text-blue-100/80">New Haven, CT</p>
                <p className="text-sm text-blue-100/80">Yale University</p>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="md:col-span-3 flex flex-col md:items-start items-center">
              <h4 className="text-sm font-semibold text-white/90 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <Link href="/directory" className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
                    Yale Startup Directory
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
                    Yale Startup Pitchbook
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

          {/* Partner Section - Fixed styling for dark background */}
{/*           <div className="py-8 mt-4">
            <p className="text-sm text-blue-200/80 text-center mb-8">With support from</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              <img 
                src="/partners/venture.jpeg"  
                alt="Yale Ventures" 
                className="h-14 md:h-16 max-w-[180px] object-contain opacity-80 hover:opacity-100 transition-all duration-300"
              />
              <img 
                src="/partners/som.png" 
                alt="School of Management" 
                className="h-14 md:h-16 max-w-[180px] object-contain opacity-80 hover:opacity-100 transition-all duration-300"
              />
              <img 
                src="/partners/tsai-city.png"
                alt="Tsai CITY" 
                className="h-14 md:h-16 max-w-[180px] object-contain opacity-80 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div> */}

          {/* Copyright Section */}
          <div className="pt-6 text-center">
            <p className="text-xs text-blue-100/70">
              © {new Date().getFullYear()} Yale Undergraduate Capital Partners. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
