'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Search, Filter, X } from 'lucide-react';
import ExcelJS from 'exceljs';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YaleInstitutions from '@/components/YaleInstitutions';

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

export default function DirectoryPage() {
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

  const Modal = ({ isOpen, onClose, children }: { 
    isOpen: boolean; 
    onClose: () => void; 
    children: React.ReactNode 
  }) => {
    if (!isOpen) return null;
  
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    return (
      <div 
        className="fixed inset-0 bg-gray-950/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-gray-100 relative">
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

  const StartupCard = ({ startup }: { startup: Startup }) => {
    const industries = startup.industry?.split(',').map(i => i.trim()) || [];
    
    return (
      <div 
        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 h-48 relative overflow-hidden"
        onClick={() => {
          setSelectedStartup(startup);
          setIsModalOpen(true);
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-100/0 group-hover:from-blue-50/50 group-hover:via-blue-50/30 group-hover:to-blue-100/50 transition-all duration-300"></div>
        
        <div className="relative p-4 flex flex-col h-full">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-blue-950 group-hover:text-blue-800 transition-colors">{startup.name}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-gray-700 transition-colors">
              {startup.description}
            </p>
          </div>
  
          <div className="mt-auto">
            <div className="flex flex-wrap items-center gap-1">
              {industries.map((industry, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {industry}
                </span>
              ))}
              {startup.stage && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                  {startup.stage}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StartupDetails = ({ startup }: { startup: Startup }) => {
      const industries = startup.industry?.split(',').map(i => i.trim()) || [];
      
      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">{startup.name}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{startup.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {industries.map((industry, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {industry}
                </span>
              ))}
              {startup.stage && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                  {startup.stage}
                </span>
              )}
            </div>
          </div>
    
          {/* Content Grid */}
          <div className="grid grid-cols-2 gap-6">
            {startup.problem && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Problem</h3>
                <p className="text-gray-700">{startup.problem}</p>
              </div>
            )}
            
            {startup.solution && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Solution</h3>
                <p className="text-gray-700">{startup.solution}</p>
              </div>
            )}
            
            {startup.team && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Yale Affiliation</h3>
                <p className="text-gray-700">{startup.team}</p>
              </div>
            )}
            
            {startup.timeline && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Timeline</h3>
                <p className="text-gray-700">{startup.timeline}</p>
              </div>
            )}
          </div>
    
          {/* Website Link */}
          {startup.website && (
            <div className="pt-6 border-t border-gray-200">
              <a 
                href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      );
  };

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
            <h1 className="text-5xl font-bold text-blue-900 tracking-tight mb-4">Yale Startup Directory</h1>
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

          {/* Results Counter */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * startupsPerPage + 1} - {Math.min(currentPage * startupsPerPage, filteredStartups.length)} of {filteredStartups.length} startups
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedFilter !== 'All' && ` in ${filterType}: ${selectedFilter}`}
            </p>
            
            <div className="text-sm text-gray-500">
              Page {currentPage} of {Math.ceil(filteredStartups.length / startupsPerPage)}
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

          {/* Other Startups Section */}
          <div className="mt-24 mb-16 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-100 p-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">Other Startups</h2>
            <div className="flex justify-center gap-16">
              <Link 
                href="https://city.yale.edu/projects" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-10 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:-translate-y-1"
              >
                <span>Tsai CITY</span>
              </Link>
              <Link 
                href="https://ventures.yale.edu/yale-technologies/spinouts?page=0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-10 py-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-gray-900 hover:to-black transition-all duration-200 hover:-translate-y-1"
              >
                <span>Yale Ventures</span>
              </Link>
            </div>
          </div>

          {/* Yale Institutions Section */}
          <YaleInstitutions />

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
      
      <Footer />
    </div>
  );
}
