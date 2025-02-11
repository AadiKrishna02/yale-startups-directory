'use client';

import React from 'react';
import { ArrowUpRight, Users, Eye, Briefcase, Database, BookOpen, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function HomePage() {
  const benefits = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Gain Visibility with Leading Investors",
      description: "Connect directly with top-tier venture capital firms and angel investors actively looking for innovative Yale startups."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Connect with Talented Team Members",
      description: "Find co-founders and team members from Yale's diverse pool of talented individuals across various disciplines."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Amplify Your Reach",
      description: "Showcase your startup to the Yale and larger entrepreneurial community, expanding your network and opportunities."
    }
  ];

  const stats = [
    { number: "60+", label: "VC Partners" },
    { number: "$27B", label: "Assets Managed" },
    { number: "$23M", label: "Investments Facilitated" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section with Enhanced Visual Elements */}
      <div className="relative min-h-screen flex items-center bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {/* Enhanced Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            
            {/* Glowing Orbs */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
        </div>

        {/* Hero Content with Enhanced Layout */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Yale Pitchbook
            </h1>
            <p className="text-2xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              Connecting Yale startups with resources, talent, and investment opportunities.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
              <Link
                href="/directory"
                className="group relative inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-300 text-lg font-medium overflow-hidden"
              >
                <span className="relative z-10">View Directory</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <a
                href="#learn-more"
                className="group inline-flex items-center gap-2 text-white hover:text-blue-200 transition-colors text-lg"
              >
                Learn More
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </div>

      <main className="bg-white relative">
        {/* Curved Separator */}
        <div className="absolute top-0 inset-x-0 h-32 bg-blue-800">
          <svg className="absolute bottom-0 w-full h-24 transform translate-y-1/2" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48h1440V0C1440 0 1320 48 720 48S0 0 0 0v48z" fill="white"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          {/* Stats Section with Enhanced Design */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {stats.map((stat, index) => (
              <div key={index} className="group bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-2xl text-center transform hover:-translate-y-1 transition-all duration-300">
                <div className="text-5xl font-bold text-white mb-3 bg-clip-text">{stat.number}</div>
                <div className="text-blue-200 text-lg font-light">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Benefits Section with Enhanced Cards */}
          <div className="pb-24" id="learn-more">
            <h2 className="text-4xl font-bold text-center text-blue-950 mb-16">Why Join?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} 
                  className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="bg-blue-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-950 mb-4 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section with Enhanced Design */}
          <div className="max-w-3xl mx-auto text-center mb-24">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-12 border border-blue-100 shadow-lg">
              <h3 className="text-3xl font-bold text-blue-900 mb-6">Join the Directory</h3>
              <p className="text-gray-700 mb-8 text-lg">
                To join the Yale Startup Directory, please fill out our brief form. Startups will continue to be 
                added on a rolling basis.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg font-medium transform hover:-translate-y-1"
              >
                Join Now
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Search, Filter, X } from 'lucide-react';
// import ExcelJS from 'exceljs';
// import Link from 'next/link';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import YaleInstitutions from '@/components/YaleInstitutions';

// interface Startup {
//   name?: string;
//   description?: string;
//   industry?: string;
//   stage?: string;
//   problem?: string;
//   solution?: string;
//   team?: string;
//   funding?: string;
//   timeline?: string;
//   website?: string;
//   [key: string]: string | undefined;
// }

// interface FilterOptions {
//   industry: string[];
//   stage: string[];
//   team: string[];
// }

// export default function Page() {
//   const [startups, setStartups] = useState<Startup[]>([]);
//   const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState<keyof FilterOptions>('industry');
//   const [selectedFilter, setSelectedFilter] = useState('All');
//   const [currentPage, setCurrentPage] = useState(1);
//   const startupsPerPage = 30;
//   const [filterOptions, setFilterOptions] = useState<FilterOptions>({
//     industry: ['All'],
//     stage: ['All'],
//     team: ['All']
//   });
//   const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
//     if (!isOpen) return null;

//     return (
//       <div className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//         <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-gray-100 relative">
//           <div className="absolute right-4 top-4">
//             <button
//               onClick={onClose}
//               className="bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-full p-2 transition-all duration-200"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>
//           <div className="mt-2">
//             {children}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const StartupCard = ({ startup }: { startup: Startup }) => (
//     <div 
//       className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100/50 hover:border-blue-200 h-56 relative overflow-hidden"
//       onClick={() => {
//         setSelectedStartup(startup);
//         setIsModalOpen(true);
//       }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-100/0 group-hover:from-blue-50/50 group-hover:via-blue-50/30 group-hover:to-blue-100/50 transition-all duration-300"></div>
      
//       <div className="relative p-6">
//         <h3 className="text-lg font-semibold mb-2 text-blue-950 group-hover:text-blue-800 transition-colors">{startup.name}</h3>
//         <div className="space-y-1.5 mb-4">
//           <div className="flex items-center space-x-2">
//             <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
//             <p className="text-sm text-blue-700 font-medium">{startup.industry}</p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className="inline-block w-2 h-2 rounded-full bg-gray-300"></span>
//             <p className="text-xs text-gray-600 font-medium">{startup.stage || 'Stage not specified'}</p>
//           </div>
//         </div>
//         <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-700 transition-colors">{startup.description}</p>
//       </div>
//     </div>
//   );

//   const StartupDetails = ({ startup }: { startup: Startup }) => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-xl font-bold mb-2 text-blue-900">{startup.name}</h2>
//         <div className="space-y-1">
//           <p className="text-sm text-blue-600 font-medium">{startup.industry}</p>
//           <p className="text-sm text-gray-500 font-medium">{startup.stage || 'Stage not specified'}</p>
//         </div>
//       </div>
//       {[
//         { title: 'Description', content: startup.description },
//         { title: 'Website', content: startup.website },
//         { title: 'Yale Affiliation', content: startup.team }
//       ].map(section => (
//         <section key={section.title} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//           <h3 className="font-semibold text-base mb-2 text-blue-800">{section.title}</h3>
//           <p className="text-sm text-gray-800 leading-relaxed">{section.content || 'Not provided'}</p>
//         </section>
//       ))}
//     </div>
//   );

//   const PaginationControl = ({ totalItems }: { totalItems: number }) => {
//     const totalPages = Math.ceil(totalItems / startupsPerPage);
//     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    
//     const getVisiblePages = () => {
//       let start = Math.max(1, currentPage - 2);
//       let end = Math.min(totalPages, currentPage + 2);
      
//       if (currentPage <= 3) {
//         end = Math.min(5, totalPages);
//       }
//       if (currentPage >= totalPages - 2) {
//         start = Math.max(1, totalPages - 4);
//       }
      
//       return pageNumbers.slice(start - 1, end);
//     };

//     const visiblePages = getVisiblePages();

//     return (
//       <div className="flex justify-center items-center space-x-2 mt-12">
//         <button
//           onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//           disabled={currentPage === 1}
//           className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-colors"
//         >
//           Previous
//         </button>
        
//         {currentPage > 3 && (
//           <>
//             <button
//               onClick={() => setCurrentPage(1)}
//               className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
//             >
//               1
//             </button>
//             {currentPage > 4 && (
//               <span className="px-2 text-gray-400">...</span>
//             )}
//           </>
//         )}
        
//         {visiblePages.map(number => (
//           <button
//             key={number}
//             onClick={() => setCurrentPage(number)}
//             className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//               currentPage === number
//                 ? 'bg-blue-600 text-white border border-blue-600'
//                 : 'border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
//             }`}
//           >
//             {number}
//           </button>
//         ))}
        
//         {currentPage < totalPages - 2 && (
//           <>
//             {currentPage < totalPages - 3 && (
//               <span className="px-2 text-gray-400">...</span>
//             )}
//             <button
//               onClick={() => setCurrentPage(totalPages)}
//               className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
//             >
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button
//           onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//           disabled={currentPage === totalPages}
//           className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-colors"
//         >
//           Next
//         </button>
//       </div>
//     );
//   };

//   const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newValue = e.target.value as keyof FilterOptions;
//     setFilterType(newValue);
//     setSelectedFilter('All');
//   };

//   useEffect(() => {
//     const loadStartups = async () => {
//       try {
//         const response = await fetch('/startups.xlsx');
//         const arrayBuffer = await response.arrayBuffer();
        
//         const workbook = new ExcelJS.Workbook();
//         await workbook.xlsx.load(arrayBuffer);
        
//         const worksheet = workbook.worksheets[0];
//         const data: Startup[] = [];
        
//         const row1 = worksheet.getRow(1);
//         const headers = row1.values ? (row1.values as (string | undefined)[]).slice(1) : [];
        
//         if (headers.length === 0) {
//           throw new Error('No headers found in Excel file');
//         }
        
//         worksheet.eachRow((row, rowNumber) => {
//           if (rowNumber === 1) return;
          
//           const rowData: Startup = {};
//           const values = row.values as (string | ExcelJS.CellValue | undefined)[];
          
//           values.slice(1).forEach((value, index) => {
//             const header = headers[index];
//             if (header) {
//               if (value && typeof value === 'object' && 'text' in value) {
//                 rowData[header] = value.text;
//               } else {
//                 rowData[header] = value?.toString();
//               }
//             }
//           });
//           data.push(rowData);
//         });

//         const allIndustries = data
//           .map(startup => startup.industry?.split(',').map(i => i.trim()))
//           .filter((value): value is string[] => value !== undefined)
//           .flat();
        
//         const uniqueIndustries = ['All', ...new Set(allIndustries)].sort();
//         const uniqueStages = ['All', ...new Set(data.map(startup => startup.stage).filter((value): value is string => value !== undefined))];
//         const uniqueTeam = ['All', ...new Set(data.map(startup => startup.team).filter((value): value is string => value !== undefined))];
        
//         setFilterOptions({
//           industry: uniqueIndustries,
//           stage: uniqueStages,
//           team: uniqueTeam
//         });
        
//         const sortedData = data.sort((a, b) => {
//           const nameA = (a.name || '').toLowerCase();
//           const nameB = (b.name || '').toLowerCase();
//           return nameA.localeCompare(nameB);
//         });
        
//         setStartups(sortedData);
//         setFilteredStartups(sortedData);
//       } catch (error) {
//         console.error('Error loading startup data:', error);
//       }
//     };

//     loadStartups();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//     const filtered = startups.filter(startup => {
//       const matchesSearch = (startup.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//                           (startup.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
//       const matchesFilter = 
//         selectedFilter === 'All' || 
//         (filterType === 'industry' 
//           ? startup.industry?.split(',').map(i => i.trim()).includes(selectedFilter)
//           : startup[filterType] === selectedFilter);
//       return matchesSearch && matchesFilter;
//     });
    
//     const sortedFiltered = filtered.sort((a, b) => {
//       const nameA = (a.name || '').toLowerCase();
//       const nameB = (b.name || '').toLowerCase();
//       return nameA.localeCompare(nameB);
//     });
    
//     setFilteredStartups(sortedFiltered);
//   }, [searchTerm, selectedFilter, filterType, startups]);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-32 px-4 sm:px-12 lg:px-24 pb-8 relative">
//         {/* Background decorative elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -right-1/4 top-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
//           <div className="absolute -left-1/4 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
//         </div>

//         <div className="max-w-6xl mx-auto space-y-8 relative">
//           {/* Hero Section */}
//           <div className="text-center max-w-3xl mx-auto mb-16 relative">
//             <div className="absolute inset-0 -z-10">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/50 to-blue-50/50 rounded-3xl blur-xl"></div>
//             </div>
//             <h1 className="text-5xl font-bold text-blue-900 tracking-tight mb-4">Yale Startup Directory</h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover and connect with innovative startups from the Yale ecosystem</p>
//           </div>
          
//           {/* Search and Filter Section */}
//           <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-100 p-6 mb-12">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                   <Search className="h-4 w-4 text-blue-500" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search startups..."
//                   className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
              
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-3">
//                   <Filter className="h-4 w-4 text-blue-500 mr-2" />
//                   <select
//                     className="bg-transparent border-none text-sm focus:ring-0 text-gray-700 pr-8"
//                     value={filterType}
//                     onChange={handleFilterTypeChange}
//                   >
//                     <option value="industry">Industry</option>
//                     <option value="stage">Stage</option>
//                     <option value="team">Team</option>
//                   </select>
//                 </div>
                
//                 <select
//                   className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-700 pr-8"
//                   value={selectedFilter}
//                   onChange={(e) => setSelectedFilter(e.target.value)}
//                 >
//                   {filterOptions[filterType].map(option => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Results Counter */}
//           <div className="flex justify-between items-center mb-6">
//             <p className="text-sm text-gray-600">
//               Showing {(currentPage - 1) * startupsPerPage + 1} - {Math.min(currentPage * startupsPerPage, filteredStartups.length)} of {filteredStartups.length} startups
//               {searchTerm && ` matching "${searchTerm}"`}
//               {selectedFilter !== 'All' && ` in ${filterType}: ${selectedFilter}`}
//             </p>
            
//             <div className="text-sm text-gray-500">
//               Page {currentPage} of {Math.ceil(filteredStartups.length / startupsPerPage)}
//             </div>
//           </div>
          
//           {/* Startup Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredStartups
//               .slice((currentPage - 1) * startupsPerPage, currentPage * startupsPerPage)
//               .map((startup, index) => (
//                 <StartupCard key={index} startup={startup} />
//               ))}
//           </div>

//           {/* Pagination */}
//           {filteredStartups.length > startupsPerPage && (
//             <PaginationControl totalItems={filteredStartups.length} />
//           )}

//           {/* Yale Institutions Section */}
//           <YaleInstitutions />

//           {/* Modal */}
//           <Modal 
//             isOpen={isModalOpen} 
//             onClose={() => {
//               setIsModalOpen(false);
//               setSelectedStartup(null);
//             }}
//           >
//             {selectedStartup && <StartupDetails startup={selectedStartup} />}
//           </Modal>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// }
