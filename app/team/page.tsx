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

interface TeamSection {
  title: string;
  description: string;
  members: TeamMember[];
}

export default function TeamPage() {
  const teamSections: TeamSection[] = [
    {
      title: "Leadership Team",
      description: "Our dedicated leadership team brings together expertise in entrepreneurship, finance, and business development to guide Yale's next generation of founders.",
      members: [
        {
          name: "Emily Zhang",
          role: "Executive Director",
          bio: "MBA '23, with previous experience at Goldman Sachs and several successful startup exits. Emily oversees all PitchBook operations and strategy.",
          imageUrl: "/team/emily-zhang.jpg",
          linkedinUrl: "#",
          twitterUrl: "#",
          emailUrl: "#"
        },
        {
          name: "Michael Chen",
          role: "Managing Director",
          bio: "Yale School of Management '24, previously founded two tech startups and worked at McKinsey. Michael leads our investor relations and pitch events.",
          imageUrl: "/team/michael-chen.jpg",
          linkedinUrl: "#",
          twitterUrl: "#",
          emailUrl: "#"
        },
        {
          name: "Aisha Johnson",
          role: "Program Director",
          bio: "Yale College '23, Computer Science major with experience in startup acceleration at Y Combinator. Aisha manages our coaching and mentorship programs.",
          imageUrl: "/team/aisha-johnson.jpg", 
          linkedinUrl: "#",
          twitterUrl: "#",
          emailUrl: "#"
        },
      ]
    },
    {
      title: "Advisory Board",
      description: "Distinguished alumni and industry experts who provide strategic guidance and support to our mission.",
      members: [
        {
          name: "Dr. Robert Wilson",
          role: "Faculty Advisor",
          bio: "Professor of Entrepreneurship at Yale School of Management, with 20+ years of experience in venture capital and business development.",
          imageUrl: "/team/robert-wilson.jpg",
          linkedinUrl: "#",
          emailUrl: "#"
        },
        {
          name: "Sarah Patel",
          role: "Investor Advisor",
          bio: "Yale '07, Managing Partner at Horizon Ventures with expertise in early-stage funding for tech and healthcare startups.",
          imageUrl: "/team/sarah-patel.jpg",
          linkedinUrl: "#",
          twitterUrl: "#",
          emailUrl: "#"
        },
        {
          name: "David Huang",
          role: "Alumni Advisor",
          bio: "Yale '02, Founder and CEO of TechForward, previously led product development at Amazon and Microsoft.",
          imageUrl: "/team/david-huang.jpg",
          linkedinUrl: "#",
          twitterUrl: "#",
          emailUrl: "#"
        },
      ]
    },
    {
      title: "Student Team",
      description: "Passionate Yale students who drive our day-to-day operations, event planning, and startup support initiatives.",
      members: [
        {
          name: "Jason Kim",
          role: "Marketing Lead",
          bio: "Yale College '25, Economics major. Jason manages our social media presence, email campaigns, and event promotions.",
          imageUrl: "/team/jason-kim.jpg",
          linkedinUrl: "#",
          twitterUrl: "#",
          emailUrl: "#"
        },
        {
          name: "Maya Rodriguez",
          role: "Operations Coordinator",
          bio: "Yale School of Management '25. Maya oversees our pitch events, workshops, and coordinates with campus partners.",
          imageUrl: "/team/maya-rodriguez.jpg",
          linkedinUrl: "#",
          emailUrl: "#"
        },
        {
          name: "Alex Thompson",
          role: "Tech Lead",
          bio: "Yale College '24, Computer Science major. Alex manages our digital platform, database of startups, and technical resources.",
          imageUrl: "/team/alex-thompson.jpg",
          linkedinUrl: "#",
          githubUrl: "#", 
          emailUrl: "#"
        },
      ]
    }
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
        </div>

        <div className="max-w-6xl mx-auto space-y-8 relative">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/50 to-blue-50/50 rounded-3xl blur-xl"></div>
            </div>
            <h1 className="text-5xl font-bold text-blue-900 tracking-tight mb-4">Meet Our Team</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The talented individuals behind Yale PitchBook working to connect Yale's brightest entrepreneurs with the resources they need to succeed.
            </p>
          </div>

          {/* Team Sections */}
          {teamSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-blue-800 mb-3">{section.title}</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">{section.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.members.map((member, memberIndex) => (
                  <TeamMemberCard key={memberIndex} member={member} />
                ))}
              </div>
            </div>
          ))}

          {/* Join Our Team Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-10 mt-16 mb-20">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Join Our Team</h2>
              <p className="text-gray-600 mb-8">
                Are you passionate about entrepreneurship and the Yale startup ecosystem? We're always looking for talented students to join our team and help us support Yale's founders.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </div>

          {/* Yale Institutions Section */}
          <YaleInstitutions />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
