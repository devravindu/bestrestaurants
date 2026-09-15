import React from 'react';
import Link from 'next/link';

export default function VendorCTA() {
  return (
    <section className="bg-chili text-cream py-[70px]">
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px] flex items-center justify-between gap-[32px] flex-wrap max-lg:flex-col max-lg:items-start">
        <div>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-display font-semibold max-w-[14ch]">
            Are you a restaurant owner?
          </h2>
          <p className="mt-[12px] text-[1.02rem] text-cream/90 max-w-[44ch]">
            Claim your listing, connect with thousands of diners, and grow your business today.
          </p>
        </div>
        <Link 
          href="#" 
          className="inline-flex items-center justify-center gap-[8px] font-bold text-[0.92rem] py-[11px] px-[20px] rounded-s bg-ink text-cream hover:bg-black transition-colors shrink-0"
        >
          Claim your business — it's free
        </Link>
      </div>
    </section>
  );
}