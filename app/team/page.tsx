'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Linkedin, Mail, Twitter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YaleInstitutions from '@/components/YaleInstitutions';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  emailUrl?: string;
  githubUrl?: string;
}

export default function TeamPage() {
  const founderMember = {
    name: "Aadi Krishna",
    role: "Founder",
    bio: "Yale College '26, studying Computer Science and Ethics, Politics, and Economics. Aadi oversees PitchBook operations and strategy.",
    imageUrl: "/aadi.JPG",
    linkedinUrl: "https://www.linkedin.com/in/aadi-krishna/",
    emailUrl: "mailto:aadi.krishna@yale.edu"
  };

  const teamMembers = [
    {
      name: "Rebecca Lynn",
      role: "Analyst",
      bio: "Yale College '26, Economics and Political Science.",
      imageUrl: "/rebecca.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/rebecca-lynn-640715257/",
    },
    {
      name: "Eric Arabadzhiev",
      role: "Analyst",
      bio: "Yale College '28, Economics and Global Affairs.",
      imageUrl: "/eric.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/eric-arabadzhiev/",
    },
    {
      name: "Oliver Hime",
      role: "Analyst",
      bio: "Yale College '28, Computer Science and Economics.",
      imageUrl: "/oliver.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/oliverhime/",
    },
    {
      name: "Sofiia Domochka",
      role: "Analyst",
      bio: "Yale College '27, Biotech and Economics.",
      imageUrl: "/sofiia.jpeg",
      linkedinUrl: "#",
    },
    {
      name: "Yuto Kida",
      role: "Analyst",
      bio: "Yale College '26, Economics and Statistics & Data Science.",
      imageUrl: "/yuto.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/yuto-kida/",
    },
    {
      name: "Jack Yin",
      role: "Tech Lead",
      bio: "Yale College '28, Computer Science and Mathematics.",
      imageUrl: "/jack.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/jackjyin/",
    },
  ];

  const TeamMemberCard = ({ member }: { member: TeamMember }) => {
    return (
      <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
        <div className="w-full h-64 bg-gray-200 overflow-hidden relative">
          {member.imageUrl ? (
            <>
              <img 
                src={member.imageUrl} 
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <span className="text-blue-800 text-xl font-medium">{member.name.charAt(0)}</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">{member.name}</h3>
          <div className="text-sm font-medium text-blue-600 mb-3">{member.role}</div>
          <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
          
          <div className="flex space-x-3">
            {member.linkedinUrl && (
              <a 
                href={member.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            
            {member.twitterUrl && (
              <a 
                href={member.twitterUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
            
            {member.emailUrl && (
              <a 
                href={member.emailUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
            
            {member.githubUrl && (
              <a 
                href={member.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-24 px-4 sm:px-12 lg:px-24 pb-8 relative">
        {/* Enhanced Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-1/4 top-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -left-1/4 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-32 left-10 w-16 h-16 bg-blue-300/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-blue-200/20 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8 relative">
          {/* Enhanced Hero Section */}
          <div className="relative mb-20 overflow-hidden rounded-3xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-0"></div>
            
            {/* Decorative elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-full h-full">
                  <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5"></path>
                  <path d="M0,50 L100,50" stroke="white" strokeWidth="0.5"></path>
                  <path d="M50,0 L50,100" stroke="white" strokeWidth="0.5"></path>
                  <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5"></circle>
                  <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="0.5"></circle>
                </svg>
              </div>
              <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
              <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"></div>
            </div>
            
            <div className="relative z-10 px-8 py-16 md:py-20 flex flex-col md:flex-row items-center">
              {/* Left content */}
              <div className="md:w-1/2 text-left md:pr-12 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Team</span> Behind Yale PitchBook</h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-white rounded-full my-6"></div>
                <p className="text-lg text-blue-100 max-w-xl">
                  A group of dedicated Yale students working to connect the university's brightest entrepreneurs with the resources they need to succeed.
                </p>
              </div>
              
              {/* Right content - Graphic element */}
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-64">
                  {/* Abstract team graphic */}
                  <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400/20 rounded-2xl backdrop-blur-sm border border-white/20 transform rotate-12"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300/20 rounded-2xl backdrop-blur-sm border border-white/20 transform -rotate-12"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="font-semibold text-5xl">7</div>
                      <div className="uppercase tracking-wider text-sm mt-1">Team Members</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Combined Team Section with visual differentiation */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-2">Our Team</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 max-w-3xl mx-auto mt-3">
                Meet the individuals behind Yale PitchBook driving innovation, sourcing, diligence, and tech.
              </p>
            </div>
            
            {/* Founder row with special styling */}
            <div className="relative mb-16">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent rounded-xl -z-10"></div>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-6">
                {/* Founder info column */}
                <div className="flex flex-col justify-center md:pl-6">
                  <h3 className="text-xl font-semibold text-blue-800 flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mr-3">Founder</span>
                    Leadership
                  </h3>
                  <p className="text-gray-600 italic">
                    "Connecting Yale's brightest entrepreneurs with the resources they need to succeed."
                  </p>
                </div>
                
                {/* Founder card column */}
                <div className="md:col-span-2">
                  <div className="transform hover:-translate-y-1 transition-transform duration-300 max-w-md mx-auto md:mx-0">
                    <TeamMemberCard member={founderMember} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Team members grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, memberIndex) => (
                <div key={memberIndex} className="transform hover:-translate-y-2 transition-transform duration-300">
                  <TeamMemberCard member={member} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
