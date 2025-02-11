'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  { 
    name: 'Yale Startup Directory', 
    href: '/directory',
    isExternal: false 
  },
  { 
    name: 'Yale Startup Pitchbook', 
    href: '#',
    isExternal: false 
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

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled 
      ? 'bg-white/80 backdrop-blur-md border-b border-gray-200' 
      : 'bg-white border-b border-gray-200'
  }`;

  return (
    <header className={headerClasses}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center">
                <div className="flex items-baseline">
                  <span className="font-bold text-xl tracking-tight text-blue-800">Yale Pitchbook</span>
                  <span className="text-sm font-normal ml-0.5 text-gray-500">by</span>
                </div>
                <img
                  src="/Logo.png"
                  alt="YUCP Logo"
                  className="h-12 w-auto ml-1 group-hover:opacity-80 transition-opacity"
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              item.isExternal ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-1.5 text-sm font-medium transition-colors text-gray-600 hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    !scrolled && isHomePage 
                      ? 'text-blue-100 hover:text-white' 
                      : 'text-gray-600 hover:text-blue-700'
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
              className={`${
                !scrolled && isHomePage ? 'text-white' : 'text-gray-600 hover:text-blue-700'
              }`}
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
          <div className="md:hidden bg-white">
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
}
