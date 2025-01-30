'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Menu, X } from 'lucide-react';
import ExcelJS from 'exceljs';

const StartupsDirectory = () => {
  const [startups, setStartups] = useState([]);
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('industry');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filterOptions, setFilterOptions] = useState({
    industry: ['All'],
    stage: ['All'],
    timeline: ['All']
  });
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { name: 'Directory', href: '#' },
    { name: 'Submit', href: 'https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3">
              <img src="/Logo.png" alt="Yale Logo" className="h-16 w-auto" />
              {/* <span className="text-xl font-semibold text-blue-900">Yale Startups</span> */}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-700 px-3 py-2 text-base font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-700"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-700 hover:bg-gray-50 rounded-md"
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
        const data = [];
        
        const headers = worksheet.getRow(1).values.slice(1);
        
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return;
          
          const rowData = {};
          row.values.slice(1).forEach((value, index) => {
            if (value && typeof value === 'object' && value.text) {
              rowData[headers[index]] = value.text;
            } else {
              rowData[headers[index]] = value;
            }
          });
          data.push(rowData);
        });

        // Collect unique values for each filter type
        const uniqueIndustries = ['All', ...new Set(data.map(startup => startup.industry).filter(Boolean))];
        const uniqueStages = ['All', ...new Set(data.map(startup => startup.stage).filter(Boolean))];
        const uniqueTimelines = ['All', ...new Set(data.map(startup => startup.timeline).filter(Boolean))];
        
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
      const matchesSearch = startup.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          startup.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'All' || startup[filterType] === selectedFilter;
      return matchesSearch && matchesFilter;
    });
    setFilteredStartups(filtered);
  }, [searchTerm, selectedFilter, filterType, startups]);

  const StartupCard = ({ startup }) => (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer p-8 border border-gray-100 hover:border-blue-100 h-64 group relative overflow-hidden"
      onClick={() => {
        setSelectedStartup(startup);
        setIsModalOpen(true);
      }}
    >
      <h3 className="text-xl font-semibold mb-3 text-blue-900 font-inter">{startup.name}</h3>
      <div className="space-y-1 mb-4">
        <p className="text-sm text-blue-600 font-medium">{startup.industry}</p>
        <p className="text-sm text-gray-500 font-medium">{startup.stage || 'Stage not specified'}</p>
      </div>
      <p className="text-gray-700 text-base line-clamp-2 mb-4">{startup.description}</p>
      <p className="text-gray-800 text-base line-clamp-2">
        <span className="text-blue-700 font-medium">Solution: </span>
        {startup.solution || 'Not provided'}
      </p>
    </div>
  );

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
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

  const StartupDetails = ({ startup }) => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-blue-900">{startup.name}</h2>
        <div className="space-y-1">
          <p className="text-base text-blue-600 font-medium">{startup.industry}</p>
          <p className="text-base text-gray-500 font-medium">{startup.stage || 'Stage not specified'}</p>
        </div>
      </div>
      
      {[
        { title: 'Problem', content: startup.problem },
        { title: 'Solution', content: startup.solution },
        { title: 'Team Details', content: startup.team },
        { title: 'Funding To Date', content: startup.funding },
        { title: 'Timeline for Funding', content: startup.timeline }
      ].map(section => (
        <section key={section.title} className="bg-blue-50 p-5 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-lg mb-2 text-blue-800">{section.title}</h3>
          <p className="text-gray-800 text-base leading-relaxed">{section.content || 'Not provided'}</p>
        </section>
      ))}
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-32 px-8 pb-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Page Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-blue-900 font-inter tracking-tight mb-4">Yale Startup Directory</h1>
            <p className="text-gray-600 text-lg">Discover and connect with startups from the Yale ecosystem</p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search startups..."
                  className="w-full pl-12 pr-4 py-3 text-base bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:bg-white transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-gray-400" />
                {/* Filter Type Selector */}
                <select
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:bg-white transition-all text-gray-700"
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setSelectedFilter('All'); // Reset selected value when changing filter type
                  }}
                >
                  <option value="industry">Industry</option>
                  <option value="stage">Stage</option>
                  <option value="timeline">Timeline</option>
                </select>
                
                {/* Filter Value Selector */}
                <select
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:bg-white transition-all text-gray-700"
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
          <div className="mt-32 mb-16 border-t border-gray-200"></div>
          <footer className="pt-10 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-blue-900">Yale Startup Directory</h4>
                <p className="text-gray-600 text-sm">Connecting Yale startups with resources, talent, and funding opportunities.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-blue-900">Contact</h4>
                <p className="text-gray-600 text-sm">Email: startups@yale.edu</p>
                <p className="text-gray-600 text-sm">Location: New Haven, CT</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-blue-900">Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-blue-700 text-sm">About Us</a></li>
                  <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform" className="text-gray-600 hover:text-blue-700 text-sm">Submit Your Startup</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-700 text-sm">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-500 text-sm">© {new Date().getFullYear()} Yale Startup Directory. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default StartupsDirectory;