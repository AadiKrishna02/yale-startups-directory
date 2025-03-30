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
  category: 'leadership' | 'analyst' | 'tech';
}

export default function TeamPage() {
  const teamMembers: TeamMember[] = [
    {
      name: "Aadi Krishna",
      role: "Founder",
      bio: "Yale College '26, studying Computer Science and Ethics, Politics, and Economics.",
      imageUrl: "/aadi.JPG",
      linkedinUrl: "https://www.linkedin.com/in/aadi-krishna/",
      emailUrl: "mailto:aadi.krishna@yale.edu",
      category: 'leadership'
    },
    {
      name: "Rebecca Lynn",
      role: "Analyst",
      bio: "Yale College '26, Economics and Political Science.",
      imageUrl: "/rebecca.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/rebecca-lynn-640715257/",
      category: 'analyst'
    },
    {
      name: "Eric Arabadzhiev",
      role: "Analyst",
      bio: "Yale College '28, Economics and Global Affairs.",
      imageUrl: "/eric.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/eric-arabadzhiev/",
      category: 'analyst'
    },
    {
      name: "Oliver Hime",
      role: "Analyst",
      bio: "Yale College '28, Computer Science and Economics.",
      imageUrl: "/oliver.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/oliverhime/",
      category: 'analyst'
    },
    {
      name: "Sofiia Domochka",
      role: "Analyst",
      bio: "Yale College '27, Biotech and Economics.",
      imageUrl: "/sofiia.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/sofiia-domochka-372aab333/",
      category: 'analyst'
    },
    {
      name: "Yuto Kida",
      role: "Analyst",
      bio: "Yale College '26, Economics and Statistics & Data Science.",
      imageUrl: "/yuto.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/yuto-kida/",
      category: 'analyst'
    },
    {
      name: "Jack Yin",
      role: "Tech Lead",
      bio: "Yale College '28, Computer Science and Mathematics.",
      imageUrl: "/jack.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/jackjyin/",
      category: 'tech'
    },
  ];

  const TeamMemberCard = ({ member }: { member: TeamMember }) => {
    return (
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
        <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
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
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors mb-2">{member.name}</h3>
          <p className="text-gray-600 text-xs mb-3">{member.bio}</p>
          
          <div className="flex space-x-2">
            {member.linkedinUrl && (
              <a 
                href={member.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            )}
            
            {member.twitterUrl && (
              <a 
                href={member.twitterUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
            )}
            
            {member.emailUrl && (
              <a 
                href={member.emailUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
            )}
            
            {member.githubUrl && (
              <a 
                href={member.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Filter members by category
  const leadershipMembers = teamMembers.filter(member => member.category === 'leadership');
  const analystMembers = teamMembers.filter(member => member.category === 'analyst');
  const techMembers = teamMembers.filter(member => member.category === 'tech');

  // Section component to avoid repetition
  const TeamSection = ({ 
    title, 
    description, 
    members, 
    accentColor = "blue" 
  }: { 
    title: string, 
    description: string, 
    members: TeamMember[],
    accentColor?: string 
  }) => {
    return (
      <div className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">{title}</h2>
          <div className={`w-16 h-0.5 bg-${accentColor}-500 rounded-full`}></div>
          <p className="text-gray-600 mt-3 text-sm">{description}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {members.map((member, index) => (
            <div key={index} className="transform hover:-translate-y-1 transition-transform duration-300">
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 pt-20 px-4 sm:px-8 lg:px-16 pb-12">
        {/* Simple Hero Section */}
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">Our Team</h1>
          <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A dedicated group of Yale students working to connect the university's entrepreneurs with the resources they need to succeed.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Leadership Section */}
          <TeamSection 
            title="Leadership" 
            description="Guiding the vision and implementation of Yale PitchBook." 
            members={leadershipMembers}
            accentColor="blue"
          />
          
          {/* Analysts Section */}
          <TeamSection 
            title="PitchBook Analysts" 
            description="Sourcing and analyzing entrepreneurial ventures across Yale." 
            members={analystMembers}
            accentColor="blue"
          />
          
          {/* Tech Team Section */}
          <TeamSection 
            title="Tech Lead" 
            description="Building and maintaining the website." 
            members={techMembers}
            accentColor="blue"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
