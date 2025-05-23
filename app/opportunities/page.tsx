'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ExternalLink, Calendar, Info, Briefcase, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';

interface Startup {
  id?: number;
  name?: string;
  description?: string;
  industry?: string;
  founders?: string;
  stage?: string;
  team?: string;
  website?: string;
  problem?: string; // Used for announcements in the UI
  [key: string]: string | number | undefined;
}

export default function OpportunitiesPage() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'team' | 'industry' | 'stage'>('industry');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filterOptions, setFilterOptions] = useState({
    industry: ['All'],
    stage: ['All'],
    team: ['All']
  });

  // Load startups with announcements from Supabase
  useEffect(() => {
    async function loadStartupsWithAnnouncements() {
      try {
        const { data, error } = await supabase
          .from('startups')
          .select('*')
          .not('problem', 'is', null)
          .not('problem', 'eq', '');

        if (error) {
          throw error;
        }

        // Compute filter options from the data
        const industries = data
          .map((startup: Startup) => startup.industry?.split(',').map(i => i.trim()))
          .filter((value): value is string[] => value !== undefined)
          .flat();
        const uniqueIndustries = ['All', ...new Set(industries)].sort();
        
        const uniqueStages = ['All', ...new Set(data
          .map((startup: Startup) => startup.stage)
          .filter((value): value is string => !!value))];
        
        const uniqueTeams = ['All', ...new Set(data
          .map((startup: Startup) => startup.team)
          .filter((value): value is string => !!value))];

        setFilterOptions({
          industry: uniqueIndustries,
          stage: uniqueStages,
          team: uniqueTeams
        });

        // Sort the data by name
        const sortedData = data.sort((a, b) => {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        
        setStartups(sortedData);
        setFilteredStartups(sortedData);
      } catch (error) {
        console.error('Error loading startups with announcements:', error);
      }
    }
    
    loadStartupsWithAnnouncements();
  }, []);

  // Apply filtering based on search term and filter options
  useEffect(() => {
    const filtered = startups.filter(startup => {
      const matchesSearch = searchTerm === '' || 
        (startup.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (startup.problem?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
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

  // Get the date string for "Posted on" label
  const getPostedDate = () => {
    const date = new Date();
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value as 'team' | 'industry' | 'stage';
    setFilterType(newValue);
    setSelectedFilter('All');
  };

  // Announcement Card Component
  const AnnouncementCard = ({ startup }: { startup: Startup }) => {
    const industries = startup.industry?.split(',').map(i => i.trim()) || [];
    
    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-blue-900">{startup.name}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3.5 w-3.5 mr-1" /> 
              <span>Posted: {getPostedDate()}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-blue-800 mb-2">Opportunity</h4>
            <p className="text-gray-700 whitespace-pre-line">{startup.problem}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <h4 className="text-sm font-medium text-gray-600 flex items-center">
                <Info className="h-4 w-4 mr-1.5" />About
              </h4>
              <p className="text-sm text-gray-700 line-clamp-2 mt-1">
                {startup.description}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-600 flex items-center">
                <Briefcase className="h-4 w-4 mr-1.5" />Stage
              </h4>
              <p className="text-sm text-gray-700 mt-1">
                {startup.stage || 'Not specified'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-5">
            {industries.map((industry, i) => (
              <span 
                key={i}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
              >
                {industry}
              </span>
            ))}
            {startup.team && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {startup.team}
              </span>
            )}
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            {startup.website ? (
              <a 
                href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Visit Website
                <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="text-sm text-gray-400">No website provided</span>
            )}
            
            <Link 
              href={`/directory?startup=${encodeURIComponent(startup.name || '')}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View in Directory
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-24 px-4 sm:px-12 lg:px-24 pb-16 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-1/4 top-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -left-1/4 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/50 to-blue-50/50 rounded-3xl blur-xl"></div>
            </div>
            <h1 className="text-5xl font-bold text-blue-900 tracking-tight mb-4">Startup Opportunities</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover collaboration and talent opportunities with Yale startups
            </p>
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
                  placeholder="Search opportunities..."
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
          <div className="mb-8">
            <p className="text-sm text-gray-600">
              Showing {filteredStartups.length} opportunities
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedFilter !== 'All' && ` in ${filterType}: ${selectedFilter}`}
            </p>
          </div>
          
          {/* Announcements Grid */}
          {filteredStartups.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  items-start">
              {filteredStartups.map((startup, index) => (
                <AnnouncementCard key={index} startup={startup} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No opportunities found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedFilter !== 'All' 
                  ? "Try adjusting your search or filter criteria" 
                  : "Check back soon for new opportunities from Yale startups"}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
