'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import ExcelJS from 'exceljs';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  team: string[];
}

export default function StartupsDirectory() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<keyof FilterOptions>('industry');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const startupsPerPage = 30;
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    industry: ['All'],
    stage: ['All'],
    team: ['All']
  });
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const PaginationControl = ({ totalItems }: { totalItems: number }) => {
    const totalPages = Math.ceil(totalItems / startupsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    const getVisiblePages = () => {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        end = Math.min(5, totalPages);
      }
      if (currentPage >= totalPages - 2) {
        start = Math.max(1, totalPages - 4);
      }
      
      return pageNumbers.slice(start - 1, end);
    };

    const visiblePages = getVisiblePages();

    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-colors"
        >
          Previous
        </button>
        
        {currentPage > 3 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              1
            </button>
            {currentPage > 4 && (
              <span className="px-2 text-gray-400">...</span>
            )}
          </>
        )}
        
        {visiblePages.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === number
                ? 'bg-blue-600 text-white border border-blue-600'
                : 'border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {number}
          </button>
        ))}
        
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-colors"
        >
          Next
        </button>
      </div>
    );
  };

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

        const allIndustries = data
          .map(startup => startup.industry?.split(',').map(i => i.trim()))
          .filter((value): value is string[] => value !== undefined)
          .flat();
        
        const uniqueIndustries = ['All', ...new Set(allIndustries)].sort();
        const uniqueStages = ['All', ...new Set(data.map(startup => startup.stage).filter((value): value is string => value !== undefined))];
        const uniqueTeam = ['All', ...new Set(data.map(startup => startup.team).filter((value): value is string => value !== undefined))];
        
        setFilterOptions({
          industry: uniqueIndustries,
          stage: uniqueStages,
          team: uniqueTeam
        });
        
        const sortedData = data.sort((a, b) => {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        
        setStartups(sortedData);
        setFilteredStartups(sortedData);
      } catch (error) {
        console.error('Error loading startup data:', error);
      }
    };

    loadStartups();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    const filtered = startups.filter(startup => {
      const matchesSearch = (startup.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (startup.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesFilter = 
        selectedFilter === 'All' || 
        (filterType === 'industry' 
          ? startup.industry?.split(',').map(i => i.trim()).includes(selectedFilter)
          : startup[filterType] === selectedFilter);
      return matchesSearch && matchesFilter;
    });
    
    const sortedFiltered = filtered.sort((a, b) => {
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
    
    setFilteredStartups(sortedFiltered);
  }, [searchTerm, selectedFilter, filterType, startups]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-32 px-4 sm:px-12 lg:px-24 pb-8 relative">
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
                    <option value="team">Team</option>
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
            {filteredStartups
              .slice((currentPage - 1) * startupsPerPage, currentPage * startupsPerPage)
              .map((startup, index) => (
                <StartupCard key={index} startup={startup} />
              ))}
          </div>

          {/* Pagination */}
          {filteredStartups.length > startupsPerPage && (
            <PaginationControl totalItems={filteredStartups.length} />
          )}

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
        </div>
      </main>
      
      {/* Footer moved outside of max-width container */}
      <Footer />
    </div>
  );
}
