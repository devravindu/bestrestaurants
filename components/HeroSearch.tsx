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
    // Replicating your existing routing logic
    router.push(`/explore?q=${encodeURIComponent(what)}&loc=${encodeURIComponent(where)}`);
  };

  return (
    <section className="bg-paper pt-[120px] pb-[80px] border-b border-line">
        <div className="max-w-[1200px] mx-auto px-[24px] md:px-[40px] flex flex-col items-center text-center">
          
          <p className="text-[0.75rem] font-bold text-ink uppercase tracking-[0.2em] mb-[24px]">
            The Curated Dining Directory
          </p>
          
          <h1 className="text-[3.5rem] md:text-[5rem] leading-[1.1] font-display font-bold text-ink mb-[32px] max-w-[900px] tracking-tight">
            Discover Sri Lanka's ultimate dining experiences.
          </h1>
          
          <p className="text-chili text-[1.25rem] max-w-[600px] mb-[48px]">
            From hidden street food legends to exclusive fine dining. Read reviews, explore menus, and reserve your next table.
          </p>

          {/* Minimalist Search Bar */}
          <div className="w-full max-w-[700px] bg-white border-2 border-ink flex items-center p-[8px]">
            <div className="flex-grow flex items-center px-[16px]">
              <Search className="w-[20px] h-[20px] text-ink/50 mr-[12px]" />
              <input 
                type="text" 
                placeholder="Restaurant name, cuisine, or location..."
                className="w-full bg-transparent border-none outline-none text-ink placeholder:text-ink/40 text-[1.1rem]"
              />
            </div>
            <button className="bg-ink text-white font-bold px-[32px] py-[16px] hover:bg-ink/80 transition-colors uppercase tracking-wide text-[0.9rem]">
              Search
            </button>
          </div>

        </div>
      </section>
  );
}