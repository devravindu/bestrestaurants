"use client";

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function SettingsDropdown() {
  return (
    <div className="relative group">
      <button className="flex items-center gap-[12px] w-full px-[16px] py-[12px] text-ink/70 hover:text-teal hover:bg-teal/5 rounded-s transition-colors font-semibold text-[0.95rem]">
        {/* Gear Icon */}
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        Settings
      </button>

      {/* Hover Popup Menu */}
      <div className="absolute bottom-full left-0 mb-[8px] w-full bg-white border border-line shadow-soft rounded-m opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
        <Link 
          href="/dashboard/settings" 
          className="block px-[16px] py-[12px] text-[0.9rem] font-medium text-ink hover:bg-paper transition-colors"
        >
          Account Settings
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })} 
          className="block w-full text-left px-[16px] py-[12px] text-[0.9rem] font-medium text-chili hover:bg-chili/5 border-t border-line transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  );
}