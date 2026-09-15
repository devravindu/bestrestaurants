"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <section 
      className="relative text-cream overflow-hidden py-[88px] pb-[120px] max-sm:py-[56px]"
      style={{
        background: `radial-gradient(ellipse 60% 90% at 88% 20%, rgba(219,158,44,0.16), transparent 60%), linear-gradient(180deg, var(--color-teal) 0%, var(--color-teal-deep) 100%)`
      }}
    >
      {/* Background Weave Pattern */}
      <svg className="absolute inset-0 opacity-50 pointer-events-none w-full h-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="weave" width="46" height="46" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1.4" fill="rgba(250,244,230,0.08)"/>
            <circle cx="31" cy="24" r="1.4" fill="rgba(250,244,230,0.06)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#weave)"/>
      </svg>

      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px] relative z-10 grid grid-cols-[1.1fr_0.9fr] gap-[48px] items-center max-lg:grid-cols-1">
        
        {/* Left Content Column */}
        <div>
          <div className="inline-flex items-center gap-[10px] text-[0.82rem] font-semibold text-turmeric mb-[22px]">
            <span className="w-[28px] h-[1.5px] bg-turmeric"></span>
            Sri Lanka's dining guide, since the first kade
          </div>
          
          <h1 className="text-[clamp(2.3rem,4.4vw,3.6rem)] leading-[1.06] tracking-[-0.01em] max-w-[12.5ch] font-display font-semibold">
            Discover Sri Lanka's ultimate dining experiences.
          </h1>
          
          <p className="text-[1.08rem] text-cream/82 max-w-[46ch] mt-[22px]">
            From street food legends to fine dining. Read reviews, explore menus, and find your next meal.
          </p>

          {/* Search Panel */}
          <form 
            onSubmit={handleSearch}
            className="mt-[40px] bg-cream rounded-m p-[10px] grid grid-cols-[1fr_1fr_auto] gap-[2px] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.5)] max-md:grid-cols-1"
          >
            <div className="flex flex-col gap-[3px] py-[10px] px-[18px] border-r border-ink/10 max-md:border-r-0 max-md:border-b">
              <label htmlFor="what" className="text-[0.72rem] font-bold text-teal lowercase first-letter:uppercase">what</label>
              <input 
                id="what"
                type="text" 
                value={what}
                onChange={(e) => setWhat(e.target.value)}
                placeholder="Seafood, kottu, a restaurant name…"
                className="border-none bg-transparent text-ink font-body text-[0.98rem] font-medium outline-none py-[2px] placeholder:text-ink/40 w-full"
              />
            </div>
            
            <div className="flex flex-col gap-[3px] py-[10px] px-[18px]">
              <label htmlFor="where" className="text-[0.72rem] font-bold text-teal lowercase first-letter:uppercase">where</label>
              <input 
                id="where"
                type="text" 
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                placeholder="Mount Lavinia, Colombo 03…"
                className="border-none bg-transparent text-ink font-body text-[0.98rem] font-medium outline-none py-[2px] placeholder:text-ink/40 w-full"
              />
            </div>
            
            <button 
              type="submit"
              className="m-[6px] px-[32px] max-md:py-[12px] inline-flex items-center justify-center font-bold text-[0.95rem] rounded-s bg-chili text-cream hover:bg-chili-deep transition-colors"
            >
              Search
            </button>
          </form>

          {/* Meta Stats */}
          <div className="flex gap-[28px] mt-[28px] text-[0.86rem] text-cream/68 max-sm:flex-col max-sm:gap-[12px]">
            <span><strong className="text-cream font-bold">2,400+</strong> restaurants listed</span>
            <span><strong className="text-cream font-bold">38,000+</strong> diner reviews</span>
            <span><strong className="text-cream font-bold">26</strong> districts covered</span>
          </div>
        </div>

        {/* Right Art Column */}
        <div className="relative max-lg:hidden">
          <svg viewBox="0 0 480 480" fill="none" className="w-full h-auto">
            <circle cx="240" cy="240" r="210" stroke="rgba(250,244,230,0.14)" strokeWidth="1"/>
            <circle cx="240" cy="240" r="150" fill="var(--color-turmeric)" opacity="0.12"/>
            <circle cx="240" cy="240" r="150" stroke="var(--color-turmeric)" strokeWidth="1.5" opacity="0.5"/>
            <path d="M150 250c30-70 150-70 180 0-20 60-160 60-180 0z" fill="var(--color-chili)" opacity="0.85"/>
            <ellipse cx="240" cy="248" rx="86" ry="18" fill="rgba(15,59,53,0.35)"/>
            <circle cx="190" cy="150" r="7" fill="var(--color-turmeric)"/>
            <circle cx="330" cy="175" r="5" fill="var(--color-cream)" opacity="0.6"/>
            <circle cx="120" cy="330" r="6" fill="var(--color-turmeric)" opacity="0.7"/>
            <circle cx="360" cy="330" r="9" fill="var(--color-chili)" opacity="0.6"/>
            <path d="M110 130q40-30 70 4" stroke="rgba(250,244,230,0.3)" strokeWidth="2" fill="none"/>
            <path d="M330 350q40 30 70-4" stroke="rgba(250,244,230,0.3)" strokeWidth="2" fill="none"/>
          </svg>
        </div>

      </div>
    </section>
  );
}