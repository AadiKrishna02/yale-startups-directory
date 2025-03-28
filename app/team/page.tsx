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
    imageUrl: "/team/aadi-krishna.jpg",
    linkedinUrl: "https://www.linkedin.com/in/aadi-krishna/",
    emailUrl: "mailto:aadi.krishna@yale.edu"
  };

  const teamMembers = [
    {
      name: "Rebecca Lynn",
      role: "Analyst",
      bio: "Yale College '26, Economics and Political Science major.",
      imageUrl: "/team/rebecca.jpg",
      linkedinUrl: "https://www.linkedin.com/in/rebecca-lynn-640715257/",
    },
    {
      name: "Eric Arabadzhiev",
      role: "Analyst",
      bio: "Yale College '28, Economics and Global Affairs major.",
      imageUrl: "/team/eric.jpg",
      linkedinUrl: "https://www.linkedin.com/in/eric-arabadzhiev/",
    },
    {
      name: "Oliver Hime",
      role: "Analyst",
      bio: "Yale College '28, Computer Science and Economics major.",
      imageUrl: "/team/oliver.jpg",
      linkedinUrl: "https://www.linkedin.com/in/oliverhime/",
    },
    {
      name: "Sofiia Domochka",
      role: "Analyst",
      bio: "Yale College '27, Biotech and Economics major.",
      imageUrl: "/team/sofiia.jpg",
      linkedinUrl: "#",
    },
    {
      name: "Yuto Kida",
      role: "Analyst",
      bio: "Yale College '26, Economics and Statistics & Data Science.",
      imageUrl: "/team/yuto.jpg",
      linkedinUrl: "https://www.linkedin.com/in/yuto-kida/",
    },
    {
      name: "Jack Yin",
      role: "Tech Lead",
      bio: "Yale College '28, Computer Science major. Jack manages the database of startups and technical resources.",
      imageUrl: "/team/jack.jpg",
      linkedinUrl: "https://www.linkedin.com/in/jackjyin/",
    },
  ];

  const TeamMemberCard = ({ member }: { member: TeamMember }) => {
    return (
      <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
        <div className="w-full h-64 bg-gray-200 overflow-hidden">
          {member.imageUrl ? (
            <img 
              src={member.imageUrl} 
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
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
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-1/4 top-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -left-1/4 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
          {/* Additional background elements */}
          <div className="absolute left-1/4 top-1/3 w-24 h-24 bg-blue-200/20 rounded-full"></div>
          <div className="absolute right-1/4 bottom-1/3 w-32 h-32 bg-blue-200/20 rounded-full"></div>
          <div className="absolute left-1/2 top-1/2 w-16 h-16 bg-blue-300/20 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8 relative">
          {/* Hero Section - More Interesting */}
          <div className="relative mb-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                  <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                    Yale PitchBook
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight mb-4">Meet Our Team</h1>
                  <p className="text-lg text-gray-600 mb-6">
                    The talented individuals behind Yale PitchBook working to connect Yale's brightest entrepreneurs with the resources they need to succeed.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">Entrepreneurship</span>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">Innovation</span>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">Startups</span>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">Yale</span>
                  </div>
                </div>
                <div className="hidden md:block h-full">
                  <div className="relative h-full min-h-[320px] bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-4 p-6 transform rotate-12">
                        {[...Array(9)].map((_, index) => (
                          <div 
                            key={index} 
                            className="w-20 h-20 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm flex items-center justify-center"
                            style={{ transform: `translateY(${Math.sin(index) * 10}px)` }}
                          >
                            <div className="w-12 h-12 rounded-full bg-blue-100/80"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Layout */}
          <div className="mb-16">
            {/* Founder with smaller card alongside regular team members */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-blue-800 mb-2">Our Team</h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Meet the individuals who drive Yale PitchBook forward
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Founder card with subtle highlight */}
              <div className="relative col-span-1 md:col-start-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded-2xl blur opacity-30"></div>
                <TeamMemberCard member={founderMember} />
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-medium">
                  Founder
                </div>
              </div>
              
              {/* Decorative connector */}
              <div className="md:hidden h-12 w-1 bg-blue-100 mx-auto"></div>
              
              {/* Team members in a grid */}
              {teamMembers.map((member, index) => (
                <div key={index} className="col-span-1">
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
