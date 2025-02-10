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

export default function StartupsDirectory() {
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

  const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-gray-100 relative">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-full p-2 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const StartupCard = ({ startup }: { startup: Startup }) => (
    <div 
      className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100/50 hover:border-blue-200 h-56 relative overflow-hidden"
      onClick={() => {
        setSelectedStartup(startup);
        setIsModalOpen(true);
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-100/0 group-hover:from-blue-50/50 group-hover:via-blue-50/30 group-hover:to-blue-100/50 transition-all duration-300"></div>
      
      <div className="relative p-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-950 group-hover:text-blue-800 transition-colors">{startup.name}</h3>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
            <p className="text-sm text-blue-700 font-medium">{startup.industry}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-gray-300"></span>
            <p className="text-xs text-gray-600 font-medium">{startup.stage || 'Stage not specified'}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-700 transition-colors">{startup.description}</p>
      </div>
    </div>
  );

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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-24 px-4 sm:px-12 lg:px-24 pb-8 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-1/4 top-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -left-1/4 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8 relative">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/50 to-blue-50/50 rounded-3xl blur-xl"></div>
            </div>
            <h1 className="text-5xl font-bold text-blue-950 tracking-tight mb-4">Yale Startup Directory</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover and connect with innovative startups from the Yale ecosystem</p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-100 p-6 mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4 text-blue-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search startups..."
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-3">
                  <Filter className="h-4 w-4 text-blue-500 mr-2" />
                  <select
                    className="bg-transparent border-none text-sm focus:ring-0 text-gray-700 pr-8"
                    value={filterType}
                    onChange={handleFilterTypeChange}
                  >
                    <option value="industry">Industry</option>
                    <option value="stage">Stage</option>
                    <option value="timeline">Timeline</option>
                  </select>
                </div>
                
                <select
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-700 pr-8"
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
          
          {/* Startup Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStartups.map((startup, index) => (
              <StartupCard key={index} startup={startup} />
            ))}
          </div>

          {/* Modal */}
          <Modal 
            isOpen={isModalOpen} 
            onClose={() => {
              setIsModalOpen(false);
              setSelectedStartup(null);
            }}
          >
            {selectedStartup && <StartupDetails startup={selectedStartup} />}
          </Modal>

          {/* Footer */}
          <footer className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 mt-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
              <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
              <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-blue-300 blur-3xl"></div>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-12 lg:px-24 relative">
              <div className="py-8">
                {/* Logo and Description Section */}
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

                  {/* Contact Section */}
                  <div className="md:col-span-3 flex flex-col md:items-start items-center">
                    <h4 className="text-base font-semibold text-white/90 mb-3">Contact</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
                        <a href="mailto:startups@yale.edu">startups@yale.edu</a>
                      </p>
                      <p className="text-sm text-blue-100/80">New Haven, CT</p>
                    </div>
                  </div>

                  {/* Quick Links Section */}
                  <div className="md:col-span-4 flex flex-col md:items-start items-center">
                    <h4 className="text-base font-semibold text-white/90 mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-center md:text-left">
                      <li>
                        <a href="#" className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform" 
                          className="text-sm text-blue-100/80 hover:text-white/90 transition-colors"
                        >
                          Submit Your Startup
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
                          Privacy Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Copyright Section */}
                <div className="pt-6 text-center">
                  <p className="text-sm text-blue-100/70">
                    © {new Date().getFullYear()} Yale Startup Directory. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
