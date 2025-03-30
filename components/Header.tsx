"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { Menu, X } from 'lucide-react';
import { Menu, X, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { 
    name: 'Directory', 
    href: '/directory',
    isExternal: false 
  },
  { 
    name: 'Pitchbook', 
    href: '#',
    isExternal: false,
    disabled: true
  },
  { 
    name: 'Submit Startup', 
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform',
    isExternal: true
  },
  { 
    name: 'Team', 
    href: '/team',
    isExternal: false 
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
  const { user, login } = useAuth();
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === '#') return false;
    return pathname === href;
  };

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
      {/* Enhanced announcement banner */}
      <div className="bg-blue-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-center">
              Join us to celebrate Yale Pitchbook's launch - Network with investors & founders - 8:30 PM, April 3rd
              <a 
                href="https://lu.ma/5d47dx6x" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 font-semibold text-white bg-red-700 hover:bg-red-600 px-3 py-0.5 rounded-sm transition-colors"
              >
                RSVP
              </a>
            </div>
          </div>
        </div>
      </div>
{/*       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-baseline">
                <span className="text-blue-800 font-bold text-2xl tracking-tight mr-1">
                  Yale Pitchbook
                </span>
                <span className="text-gray-500 text-xs font-light ml-1 mr-2">by</span>
              </Link>
              <a 
                href="https://yucp.org" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img
                  src="/Logo.png"
                  alt="YUCP Logo"
                  className="h-8 w-auto hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
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
              
              const activeClass = isActive(item.href) 
                ? "text-blue-700 font-semibold border-b-2 border-blue-700" 
                : "text-gray-600 hover:text-blue-700";
              
              return item.isExternal ? (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${activeClass} px-3 py-1.5 text-sm font-medium transition-colors`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${activeClass} px-3 py-1.5 text-sm font-medium transition-colors`}
                >
                  {item.name}
                </Link>
              );
            })}
            {user ? (
              <Link
                href="/account"
                className="px-4 py-1.5 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md transition-colors"
              >
                My Account
              </Link>
            ) : (
              <button
                onClick={login}
                className="px-4 py-1.5 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md transition-colors"
              >
                Login
              </button>
            )}
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
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
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
                
                const activeClass = isActive(item.href) 
                  ? "text-blue-700 bg-blue-50 font-semibold" 
                  : "text-gray-600 hover:text-blue-700 hover:bg-gray-50";
                
                return item.isExternal ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-medium ${activeClass} rounded-md`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-medium ${activeClass} rounded-md`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-gray-100 pt-2">
              {user ? (
                <div className="px-3 py-2">
                  <Link
                    href="/account"
                    className="text-blue-600 text-sm block mb-1 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md px-3 py-1.5 text-center"
                  >
                    My Account
                  </Link>
                </div>
              ) : (
                <div className="px-3 py-2">
                  <button
                    onClick={login}
                    className="w-full text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md text-sm px-3 py-1.5"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
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
