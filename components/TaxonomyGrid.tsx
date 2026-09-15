import React from 'react';
import Link from 'next/link';

export default function TaxonomyGrid() {
  return (
    <section className="bg-paper-warm py-[88px] max-sm:py-[56px]">
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px]">
        
        {/* Section Header */}
        <div className="mb-[44px]">
          <h2 className="text-[clamp(1.6rem,2.6vw,2.1rem)] tracking-[-0.01em] font-display font-semibold">
            What are you craving?
          </h2>
          <p className="text-ink/62 text-[1rem] mt-[10px] max-w-[48ch]">
            Browse by mood, not just menu.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-6 grid-rows-[repeat(2,180px)] gap-[14px] max-lg:grid-cols-2 max-lg:grid-rows-auto max-sm:grid-cols-1">
          
          {/* Tile 1: Beachfront */}
          <Link 
            href="#" 
            className="relative rounded-m overflow-hidden text-cream flex items-end p-[20px] transition-transform duration-200 hover:scale-[1.015] col-[1/4] row-[1/3] max-lg:col-[1/3] max-lg:row-auto max-lg:h-[220px] max-sm:col-[1] max-sm:h-[180px]"
            style={{ background: 'linear-gradient(160deg,#123f3a,#1a5a52)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1412]/70"></div>
            <span className="absolute right-[14px] top-[14px] text-[1.4rem] opacity-90 z-10">🏖️</span>
            <span className="relative z-10 font-bold text-[1.05rem]">Beachfront dining</span>
          </Link>

          {/* Tile 2: Sri Lankan */}
          <Link 
            href="#" 
            className="relative rounded-m overflow-hidden text-cream flex items-end p-[20px] transition-transform duration-200 hover:scale-[1.015] col-[4/7] row-[1/2] max-lg:col-span-1 max-lg:row-auto max-lg:h-[160px] max-sm:col-[1] max-sm:h-[180px]"
            style={{ background: 'linear-gradient(160deg,#7a2a1c,#a6432c)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1412]/70"></div>
            <span className="absolute right-[14px] top-[14px] text-[1.4rem] opacity-90 z-10">🍛</span>
            <span className="relative z-10 font-bold text-[1.05rem]">Authentic Sri Lankan</span>
          </Link>

          {/* Tile 3: Cafes */}
          <Link 
            href="#" 
            className="relative rounded-m overflow-hidden text-cream flex items-end p-[20px] transition-transform duration-200 hover:scale-[1.015] col-[4/5] row-[2/3] max-lg:col-span-1 max-lg:row-auto max-lg:h-[160px] max-sm:col-[1] max-sm:h-[180px]"
            style={{ background: 'linear-gradient(160deg,#5c4321,#8a6a30)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1412]/70"></div>
            <span className="absolute right-[14px] top-[14px] text-[1.4rem] opacity-90 z-10">☕</span>
            <span className="relative z-10 font-bold text-[1.05rem]">Cafes & bakeries</span>
          </Link>

          {/* Tile 4: Late Night */}
          <Link 
            href="#" 
            className="relative rounded-m overflow-hidden text-cream flex items-end p-[20px] transition-transform duration-200 hover:scale-[1.015] col-[5/7] row-[2/3] max-lg:col-span-1 max-lg:row-auto max-lg:h-[160px] max-sm:col-[1] max-sm:h-[180px]"
            style={{ background: 'linear-gradient(160deg,#151515,#2b2b2b)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1412]/70"></div>
            <span className="absolute right-[14px] top-[14px] text-[1.4rem] opacity-90 z-10">🌙</span>
            <span className="relative z-10 font-bold text-[1.05rem]">Late night spots</span>
          </Link>

        </div>

        {/* Extra Row (Vegan) */}
        <div className="grid grid-cols-1 mt-[14px]">
          <Link 
            href="#" 
            className="relative rounded-m overflow-hidden text-cream flex items-end p-[20px] transition-transform duration-200 hover:scale-[1.015] h-[110px] max-sm:h-[180px]"
            style={{ background: 'linear-gradient(120deg,#2b5c34,#3f7a48)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1412]/70"></div>
            <span className="absolute right-[14px] top-[14px] text-[1.4rem] opacity-90 z-10">🌱</span>
            <span className="relative z-10 font-bold text-[1.05rem]">Vegan & vegetarian</span>
          </Link>
        </div>

      </div>
    </section>
  );
}