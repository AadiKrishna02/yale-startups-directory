// 'use client';
// import React from 'react';
// import Link from 'next/link';

// export default function Footer() {
//   return (
//     <div className="w-full">
//       <footer className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 w-full relative overflow-hidden">
//         {/* Background decoration */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
//           <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
//           <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-blue-300 blur-3xl"></div>
//         </div>
        
//         {/* Content container with wider max-width and adjusted padding */}
//         <div className="max-w-[90%] mx-auto px-6 py-10 relative">
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-10 border-b border-blue-700/30">
//             {/* Logo and Description Section */}
//             <div className="md:col-span-6 flex flex-col items-center md:items-start">
//               <img
//                 src="/Logo.png"
//                 alt="Yale Logo"
//                 className="h-16 w-auto mb-4 brightness-0 invert"
//               />
//               <h4 className="text-2xl font-semibold text-white/90 mb-2">Yale Pitchbook</h4>
//               <p className="text-sm text-blue-100/80 text-center md:text-left max-w-xl">
//                 Connecting Yale startups with resources, talent, and funding opportunities. Join our growing community of innovators and entrepreneurs.
//               </p>
//             </div>

//             {/* Contact Section */}
//             <div className="md:col-span-3 flex flex-col md:items-start items-center">
//               <h4 className="text-sm font-semibold text-white/90 mb-4">Contact</h4>
//               <div className="space-y-2">
//                 <p className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
//                   <a href="mailto:aadi.krishna@yale.edu">aadi.krishna@yale.edu</a>
//                 </p>
//                 <p className="text-sm text-blue-100/80">New Haven, CT</p>
//                 <p className="text-sm text-blue-100/80">Yale University</p>
//               </div>
//             </div>

//             {/* Quick Links Section */}
//             <div className="md:col-span-3 flex flex-col md:items-start items-center">
//               <h4 className="text-sm font-semibold text-white/90 mb-4">Quick Links</h4>
//               <ul className="space-y-2 text-center md:text-left">
//                 <li>
//                   <Link href="/directory" className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
//                     Yale Startup Directory
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
//                     Yale Startup Pitchbook
//                   </Link>
//                 </li>
//                 <li>
//                   <a 
//                     href="https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform" 
//                     className="text-sm text-blue-100/80 hover:text-white/90 transition-colors"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Submit Your Startup
//                   </a>
//                 </li>
//                 <li>
//                   <a 
//                     href="https://www.yucp.org"
//                     className="text-sm text-blue-100/80 hover:text-white/90 transition-colors"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     YUCP
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Copyright Section */}
//           <div className="pt-6 text-center">
//             <p className="text-xs text-blue-100/70">
//               © {new Date().getFullYear()} Yale Undergraduate Capital Partners. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  // Sample partner logos - replace with your actual partner logos
  const partnerLogos = [
    { name: 'Tsai CITY', image: '/partners/tsai-city.png' },
    { name: 'Yale SOM', image: '/partners/som.png' },
    { name: 'Yale Ventures', image: '/partners/ventures.png' },
    // { name: 'Yale Office of Cooperative Research', image: '/partners/ocr.png' },
    // { name: 'Yale Ventures', image: '/partners/yale-ventures.png' },
    // { name: 'Yale Center for Innovative Thinking', image: '/partners/cfit.png' },
  ];

  // State for carousel animation (if you want auto-scrolling)
  const [scrollPosition, setScrollPosition] = useState(0);

  // Optional: Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % partnerLogos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <footer className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 w-full relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-blue-300 blur-3xl"></div>
        </div>
        
        {/* Content container with wider max-width and adjusted padding */}
        <div className="max-w-[90%] mx-auto px-6 py-10 relative">
          {/* Partner Logo Section - Added above the main grid */}
          <div className="mb-12 pb-12 border-b border-blue-700/30">
            <h4 className="text-xl font-semibold text-white/90 mb-6 text-center">Our Partners</h4>
            
            {/* Logo Grid for larger screens */}
            <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
              {partnerLogos.map((partner, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-full h-24 flex items-center justify-center transition-all hover:bg-white/20"
                >
                  <img 
                    src={partner.image} 
                    alt={`${partner.name} logo`} 
                    className="max-h-16 max-w-full object-contain brightness-0 invert" 
                  />
                </div>
              ))}
            </div>
            
            {/* Logo Carousel for mobile */}
            <div className="md:hidden relative overflow-hidden">
              <div 
                className="flex gap-4 py-2 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${scrollPosition * 100}%)` }}
              >
                {partnerLogos.map((partner, index) => (
                  <div 
                    key={index} 
                    className="min-w-[180px] bg-white/10 backdrop-blur-sm rounded-lg p-4 h-24 flex items-center justify-center"
                  >
                    <img 
                      src={partner.image} 
                      alt={`${partner.name} logo`} 
                      className="max-h-16 max-w-full object-contain brightness-0 invert" 
                    />
                  </div>
                ))}
              </div>
              
              {/* Navigation dots for mobile carousel */}
              <div className="flex justify-center gap-2 mt-4">
                {partnerLogos.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2 h-2 rounded-full ${scrollPosition === index ? 'bg-white' : 'bg-white/30'}`}
                    onClick={() => setScrollPosition(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-10 border-b border-blue-700/30">
            {/* Logo and Description Section */}
            <div className="md:col-span-6 flex flex-col items-center md:items-start">
              <img
                src="/Logo.png"
                alt="Yale Logo"
                className="h-16 w-auto mb-4 brightness-0 invert"
              />
              <h4 className="text-2xl font-semibold text-white/90 mb-2">Yale Pitchbook</h4>
              <p className="text-sm text-blue-100/80 text-center md:text-left max-w-xl">
                Connecting Yale startups with resources, talent, and funding opportunities. Join our growing community of innovators and entrepreneurs.
              </p>
            </div>

            {/* Contact Section */}
            <div className="md:col-span-3 flex flex-col md:items-start items-center">
              <h4 className="text-sm font-semibold text-white/90 mb-4">Contact</h4>
              <div className="space-y-2">
                <p className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
                  <a href="mailto:aadi.krishna@yale.edu">aadi.krishna@yale.edu</a>
                </p>
                <p className="text-sm text-blue-100/80">New Haven, CT</p>
                <p className="text-sm text-blue-100/80">Yale University</p>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="md:col-span-3 flex flex-col md:items-start items-center">
              <h4 className="text-sm font-semibold text-white/90 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <Link href="/directory" className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
                    Yale Startup Directory
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-blue-100/80 hover:text-white/90 transition-colors">
                    Yale Startup Pitchbook
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfeuaJP4vEFNQuGmkOE4wXpbEUJluGD9gO308-NbzbvduTekQ/viewform" 
                    className="text-sm text-blue-100/80 hover:text-white/90 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Submit Your Startup
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.yucp.org"
                    className="text-sm text-blue-100/80 hover:text-white/90 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YUCP
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="pt-6 text-center">
            <p className="text-xs text-blue-100/70">
              © {new Date().getFullYear()} Yale Undergraduate Capital Partners. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
