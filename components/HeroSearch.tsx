"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/explore?q=${encodeURIComponent(what)}&loc=${encodeURIComponent(where)}`);
  };

  return (
    <section className="bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col items-start text-left z-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
              The Curated Dining Directory
            </p>
            
            <h1 className="text-5xl lg:text-[4rem] leading-[1.05] font-bold text-black mb-6 tracking-tight">
              Discover Sri Lanka's ultimate dining experiences.
            </h1>
            
            <p className="text-gray-600 text-lg max-w-md mb-10 leading-relaxed">
              From hidden street food legends to exclusive fine dining. Read reviews, explore menus, and reserve your next table.
            </p>

            {/* Left-Aligned Search Input */}
            <form onSubmit={handleSearch} className="w-full max-w-lg bg-white border border-black flex flex-col sm:flex-row items-stretch focus-within:border-[#FC693D] focus-within:ring-1 focus-within:ring-[#FC693D] transition-all shadow-sm">
              <div className="flex-grow flex items-center px-5 h-14 w-full">
                <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <input 
                  type="text" 
                  value={what}
                  onChange={(e) => setWhat(e.target.value)}
                  placeholder="Restaurant, cuisine, or location..."
                  className="w-full bg-transparent border-none outline-none text-black placeholder:text-gray-400 text-base"
                />
              </div>
              <button type="submit" className="bg-[#FC693D] text-white font-bold px-8 h-14 hover:bg-black transition-colors uppercase tracking-wider text-sm flex-shrink-0">
                Search
              </button>
            </form>
          </div>

          {/* Right Column: Premium CSS Illustration */}
          <div className="hidden lg:flex relative h-[500px] w-full justify-center items-center">
            {/* Minimalist Backdrop Circle */}
            <div className="absolute w-[400px] h-[400px] border border-gray-100 rounded-full bg-gray-50 right-0 top-1/2 -translate-y-1/2"></div>
            
            {/* Main Architectural Shape (representing a premium doorway or menu) */}
            <div className="relative z-10 w-[280px] h-[400px] bg-black rounded-t-full shadow-2xl flex flex-col items-center justify-start p-10 overflow-hidden">
               {/* Abstract accent focal point inside */}
               <div className="w-full h-[180px] border border-white/20 rounded-t-full mt-4 flex items-end justify-center pb-8 relative">
                 <div className="w-16 h-16 bg-[#FC693D] rounded-full shadow-inner z-10"></div>
                 <div className="absolute w-24 h-24 border border-[#FC693D]/30 rounded-full bottom-4"></div>
               </div>
               
               {/* Clean structural lines */}
               <div className="w-full h-px bg-white/20 mt-12"></div>
               <div className="w-2/3 h-px bg-white/20 mt-6"></div>
            </div>

            {/* Floating Accent Card */}
            <div className="absolute z-20 w-24 h-24 bg-white border border-gray-100 right-[15%] bottom-[12%] flex items-center justify-center shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
               <div className="w-8 h-8 bg-[#FC693D] rounded-full"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}