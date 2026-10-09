import React from 'react';
import Link from 'next/link';

export default function VendorCTA() {
  return (
    <section className="bg-chili text-white py-[70px]">
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px] flex items-center justify-between gap-[32px] flex-wrap max-lg:flex-col max-lg:items-start">
        <div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] leading-[0.98] tracking-[-0.035em] max-w-[14ch] font-bold">
            Are you a restaurant owner?
          </h2>
          <p className="mt-[12px] text-[1.02rem] text-white/90 max-w-[44ch]">
            Claim your listing, connect with thousands of diners, and grow your business today.
          </p>
        </div>
        <Link 
          href="#" 
          className="inline-flex items-center justify-center gap-[8px] font-bold text-[0.92rem] py-[11px] px-[20px] rounded-s bg-dark-deep text-white hover:bg-black transition-colors shrink-0"
        >
          Claim your business — it's free
        </Link>
      </div>
    </section>
  );
}