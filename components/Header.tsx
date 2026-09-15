import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-[100] bg-paper border-b border-line">
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px] h-[76px] flex items-center justify-between gap-[24px]">
        
        {/* Logo */}
        <Link href="/" className="font-display text-[1.5rem] font-bold tracking-[-0.01em] flex items-baseline gap-[2px] shrink-0">
          BestRestaurant<span className="text-chili italic">.</span><span className="text-[0.62em] text-teal font-semibold ml-[2px]">lk</span>
        </Link>

        {/* Primary Navigation - Hidden on screens smaller than lg (approx 980px) */}
        <nav className="flex gap-[36px] max-lg:hidden">
          <Link href="/" className="text-[0.95rem] font-semibold text-ink py-[6px] border-b-[2px] border-transparent hover:border-chili transition-colors">
            Home
          </Link>
          <Link href="#trending" className="text-[0.95rem] font-semibold text-ink py-[6px] border-b-[2px] border-transparent hover:border-chili transition-colors">
            Top 100
          </Link>
          <Link href="#" className="text-[0.95rem] font-semibold text-ink py-[6px] border-b-[2px] border-transparent hover:border-chili transition-colors">
            Locations
          </Link>
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-[20px] shrink-0">
          <Link href="#" className="text-[0.9rem] font-semibold text-teal whitespace-nowrap hover:underline max-sm:hidden">
            Log in / Register
          </Link>
          <Link 
            href="#" 
            className="inline-flex items-center justify-center gap-[8px] font-bold text-[0.92rem] py-[11px] px-[20px] rounded-s bg-chili text-cream hover:bg-chili-deep transition-colors whitespace-nowrap"
          >
            + Add a restaurant
          </Link>
        </div>
        
      </div>
    </header>
  );
}