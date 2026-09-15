"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      {/* Newsletter */}
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px]">
        <div className="border-b border-cream/15 py-[56px] flex items-center justify-between gap-[32px] flex-wrap max-sm:flex-col max-sm:items-start">
          <div>
            <h3 className="text-[1.5rem] font-display font-semibold max-w-[13ch]">Join the Foodie Club</h3>
            <p className="text-cream/60 mt-[8px] max-w-[38ch]">Get the best weekend spots delivered to your inbox.</p>
          </div>
          <form className="flex shrink-0 w-full max-w-[360px] max-sm:max-w-full" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="you@example.com" 
              aria-label="Email address"
              className="w-full py-[13px] px-[16px] border-[1.5px] border-cream/25 border-r-0 bg-transparent text-cream font-body text-[0.94rem] rounded-l-s outline-none placeholder:text-cream/45 focus-visible:outline focus-visible:outline-[2.5px] focus-visible:outline-chili focus-visible:outline-offset-[3px]"
            />
            <button type="submit" className="inline-flex items-center justify-center font-bold text-[0.92rem] py-[11px] px-[20px] rounded-r-s bg-chili text-cream hover:bg-chili-deep transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px] py-[52px] pb-[36px] grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-[32px] max-lg:grid-cols-2 max-sm:grid-cols-1">
        <div>
          <Link href="#" className="font-display text-[1.5rem] font-bold tracking-[-0.01em] flex items-baseline gap-[2px]">
            BestRestaurant<span className="text-chili italic">.</span><span className="text-[0.62em] text-teal font-semibold ml-[2px]">lk</span>
          </Link>
          <p className="text-cream/55 text-[0.9rem] mt-[14px] max-w-[32ch]">
            Sri Lanka's dining guide — reviews, menus, and the island's best tables, all in one place.
          </p>
          <div className="flex gap-[12px] mt-[16px]">
            {['f', 'ig', 'tt'].map((icon) => (
              <Link key={icon} href="#" aria-label={icon} className="w-[34px] h-[34px] rounded-full border border-cream/25 flex items-center justify-center hover:border-turmeric hover:text-turmeric transition-colors">
                {icon}
              </Link>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-[0.88rem] font-bold mb-[16px] text-cream/90">Explore</h4>
          <ul className="flex flex-col gap-[11px]">
            <li><Link href="#" className="text-[0.9rem] text-cream/60 hover:text-cream">Top 100</Link></li>
            <li><Link href="#" className="text-[0.9rem] text-cream/60 hover:text-cream">Locations</Link></li>
            <li><Link href="#" className="text-[0.9rem] text-cream/60 hover:text-cream">Cuisines</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[0.88rem] font-bold mb-[16px] text-cream/90">Company</h4>
          <ul className="flex flex-col gap-[11px]">
            <li><Link href="#" className="text-[0.9rem] text-cream/60 hover:text-cream">About us</Link></li>
            <li><Link href="#" className="text-[0.9rem] text-cream/60 hover:text-cream">Contact</Link></li>
            <li><Link href="#" className="text-[0.9rem] text-cream/60 hover:text-cream">Add a restaurant</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[0.88rem] font-bold mb-[16px] text-cream/90">Legal</h4>
          <ul className="flex flex-col gap-[11px]">
            <li><Link href="#" className="text-[0.9rem] text-cream/60 hover:text-cream">Privacy policy</Link></li>
            <li><Link href="#" className="text-[0.9rem] text-cream/60 hover:text-cream">Terms of service</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px]">
        <div className="border-t border-cream/15 py-[22px] text-[0.84rem] text-cream/45 flex justify-between flex-wrap gap-[10px]">
          <span>© 2026 BestRestaurant.lk. All rights reserved.</span>
          <span>Made for the island's food lovers.</span>
        </div>
      </div>
    </footer>
  );
}