'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navItems = [
  { 
    name: 'Startup Directory', 
    href: '/directory',
    isExternal: false 
  },
  { 
    name: 'Startup Pitchbook', 
    href: '#',
    isExternal: false,
    disabled: true  // Mark this item as disabled
  },
  { 
    name: 'Submit Your Startup', 
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform',
    isExternal: true
  },
  { 
    name: 'YUCP', 
    href: 'https://www.yucp.org',
    isExternal: true 
  }
];

const partnerLogos = [
  {
    src: "/partners/y-ventures-removebg.png",
    alt: "Yale Ventures"
  },
  {
    src: "/partners/som-bg.png",
    alt: "School of Management"
  },
  {
    src: "/partners/tsai-city-bg.png",
    alt: "Tsai CITY"
  }
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // <header className="sticky top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
    <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center">
                <div className="flex items-baseline">
                  <span className="text-blue-800 font-bold text-2xl tracking-tight mr-1">
                    Yale Pitchbook
                  </span>
                  <span className="text-gray-500 text-sm font-normal ml-1 mr-2">by</span>
                </div>
                <img
                  src="/Logo.png"
                  alt="YUCP Logo"
                  className="h-8 w-auto group-hover:opacity-80 transition-opacity"
                />
              </div>
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              // Render as a non-clickable span if disabled
              if (item.disabled) {
                return (
                  <span
                    key={item.name}
                    className="text-gray-400 px-3 py-1.5 text-sm font-medium cursor-not-allowed"
                  >
                    {item.name}
                  </span>
                );
              }

              // Otherwise, render as an external or internal link
              return item.isExternal ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-700 px-3 py-1.5 text-sm font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-700 px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          {/* Mobile Menu Toggle Button */}
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
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                // Render as a non-clickable span if disabled
                if (item.disabled) {
                  return (
                    <span
                      key={item.name}
                      className="block px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
                    >
                      {item.name}
                    </span>
                  );
                }

                // Otherwise, render as an external or internal link
                return item.isExternal ? (
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
                );
              })}
            </div>
            {/* Improved Partner Logos for Mobile */}
            <div className="px-3 pt-4 pb-5 border-t border-gray-100 mt-2">
              <div className="flex flex-col items-start">
                <p className="text-xs text-gray-500 mb-3">With support from</p>
                <div className="flex items-center space-x-4 overflow-x-auto w-full pb-1">
                  {partnerLogos.map((logo) => (
                    <img
                      key={logo.alt}
                      src={logo.src}
                      alt={logo.alt}
                      className="h-7 w-auto object-contain"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Partner Logos Strip - Desktop Only */}
      <div className="hidden md:block bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5">
          <div className="flex items-center justify-start">
            <span className="text-xs text-gray-500 mr-4">With support from</span>
            <div className="flex items-center gap-4">
              {partnerLogos.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
