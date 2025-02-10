'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Menu, X } from 'lucide-react';
import ExcelJS from 'exceljs';

interface Startup {
  name?: string;
  description?: string;
  industry?: string;
  stage?: string;
  problem?: string;
  solution?: string;
  team?: string;
  funding?: string;
  timeline?: string;
  website?: string;
  [key: string]: string | undefined;
}

interface FilterOptions {
  industry: string[];
  stage: string[];
  timeline: string[];
}

const StartupsDirectory = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<keyof FilterOptions>('industry');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    industry: ['All'],
    stage: ['All'],
    timeline: ['All']
  });
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Submit', href: 'https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Log In', href: '#', isBoxed: true},
  ];

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="https://www.yucp.org/" className="flex items-center space-x-3">
              <img
                src="/Logo.png"
                alt="Yale Logo"
                className="h-10 w-auto"
              />
            </a>
          </div>
    
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-gray-600 hover:text-blue-700 px-3 py-1.5 text-sm font-medium transition-colors ${
                  item.isBoxed
                    ? 'border border-blue-700 rounded-lg px-3 py-1.5 bg-blue-100'
                    : ''
                }`}
              >
                {item.name}
              </a>
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
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-gray-50 rounded-md"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );

  useEffect(() => {
    const loadStartups = async () => {
      try {
        const response = await fetch('/startups.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);
        
        const worksheet = workbook.worksheets[0];
        const data: Startup[] = [];
        
        const row1 = worksheet.getRow(1);
        const headers = row1.values ? (row1.values as (string | undefined)[]).slice(1) : [];
        
        if (headers.length === 0) {
          throw new Error('No headers found in Excel file');
        }
        
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return;
          
          const rowData: Startup = {};
          const values = row.values as (string | ExcelJS.CellValue | undefined)[];
          
          values.slice(1).forEach((value, index) => {
            const header = headers[index];
            if (header) {
              if (value && typeof value === 'object' && 'text' in value) {
                rowData[header] = value.text;
              } else {
                rowData[header] = value?.toString();
              }
            }
          });
          data.push(rowData);
        });

        const uniqueIndustries = ['All', ...new Set(data.map(startup => startup.industry).filter((value): value is string => value !== undefined))];
        const uniqueStages = ['All', ...new Set(data.map(startup => startup.stage).filter((value): value is string => value !== undefined))];
        const uniqueTimelines = ['All', ...new Set(data.map(startup => startup.timeline).filter((value): value is string => value !== undefined))];
        
        setFilterOptions({
          industry: uniqueIndustries,
          stage: uniqueStages,
          timeline: uniqueTimelines
        });
        
        setStartups(data);
        setFilteredStartups(data);
      } catch (error) {
        console.error('Error loading startup data:', error);
      }
    };

    loadStartups();
  }, []);

  useEffect(() => {
    const filtered = startups.filter(startup => {
      const matchesSearch = (startup.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (startup.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'All' || startup[filterType] === selectedFilter;
      return matchesSearch && matchesFilter;
    });
    setFilteredStartups(filtered);
  }, [searchTerm, selectedFilter, filterType, startups]);

  const StartupCard = ({ startup }: { startup: Startup }) => (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-6 border border-gray-100 hover:border-blue-100 h-56 group relative overflow-hidden"
      onClick={() => {
        setSelectedStartup(startup);
        setIsModalOpen(true);
      }}
    >
      <h3 className="text-lg font-semibold mb-2 text-blue-900">{startup.name}</h3>
      <div className="space-y-1 mb-4">
        <p className="text-sm text-blue-600 font-medium">{startup.industry}</p>
        <p className="text-xs text-gray-500 font-medium">{startup.stage || 'Stage not specified'}</p>
      </div>
      <p className="text-sm text-gray-700 line-clamp-2">{startup.description}</p>
    </div>
  );

  const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-blue-700 hover:text-blue-500 font-bold text-xl"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const StartupDetails = ({ startup }: { startup: Startup }) => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2 text-blue-900">{startup.name}</h2>
        <div className="space-y-1">
          <p className="text-sm text-blue-600 font-medium">{startup.industry}</p>
          <p className="text-sm text-gray-500 font-medium">{startup.stage || 'Stage not specified'}</p>
        </div>
      </div>
      {[
        { title: 'Description', content: startup.description },
        { title: 'Website', content: startup.website },
        { title: 'Yale Affiliation', content: startup.team }
      ].map(section => (
        <section key={section.title} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-base mb-2 text-blue-800">{section.title}</h3>
          <p className="text-sm text-gray-800 leading-relaxed">{section.content || 'Not provided'}</p>
        </section>
      ))}
    </div>
  );

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value as keyof FilterOptions;
    setFilterType(newValue);
    setSelectedFilter('All');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-24 px-4 sm:px-12 lg:px-24 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold text-blue-900 tracking-tight mb-3">Yale Startup Directory</h1>
            <p className="text-base text-gray-600">Discover and connect with startups from the Yale ecosystem</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search startups..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:bg-white transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:bg-white transition-all text-gray-700"
                  value={filterType}
                  onChange={handleFilterTypeChange}
                >
                  <option value="industry">Industry</option>
                  <option value="stage">Stage</option>
                  <option value="timeline">Timeline</option>
                </select>
                
                <select
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:bg-white transition-all text-gray-700"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  {filterOptions[filterType].map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup, index) => (
              <StartupCard key={index} startup={startup} />
            ))}
          </div>
          
          <Modal 
            isOpen={isModalOpen} 
            onClose={() => {
              setIsModalOpen(false);
              setSelectedStartup(null);
            }}
          >
            {selectedStartup && <StartupDetails startup={selectedStartup} />}
          </Modal>

          <footer className="bg-gradient-to-br from-blue-900 to-blue-800 mt-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-12 lg:px-24">
              <div className="py-12">
                {/* Logo and Description Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-blue-700/50">
                  <div className="md:col-span-4 flex flex-col items-center md:items-start">
                    <img
                      src="/Logo.png"
                      alt="Yale Logo"
                      className="h-12 w-auto mb-4 brightness-0 invert"
                    />
                    <h4 className="text-lg font-semibold text-white mb-3">Yale Startup Directory</h4>
                    <p className="text-sm text-blue-100 text-center md:text-left">
                      Connecting Yale startups with resources, talent, and funding opportunities.
                    </p>
                  </div>

                  {/* Contact Section */}
                  <div className="md:col-span-4 flex flex-col md:items-start items-center">
                    <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-blue-100">Email: startups@yale.edu</p>
                      <p className="text-sm text-blue-100">Location: New Haven, CT</p>
                    </div>
                  </div>

                  {/* Quick Links Section */}
                  <div className="md:col-span-4 flex flex-col md:items-start items-center">
                    <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-center md:text-left">
                      <li>
                        <a href="#" className="text-sm text-blue-100 hover:text-white transition-colors">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform" 
                          className="text-sm text-blue-100 hover:text-white transition-colors"
                        >
                          Submit Your Startup
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-sm text-blue-100 hover:text-white transition-colors">
                          Privacy Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Copyright Section */}
                <div className="pt-8 text-center">
                  <p className="text-sm text-blue-200">
                    © {new Date().getFullYear()} Yale Startup Directory. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default StartupsDirectory;
