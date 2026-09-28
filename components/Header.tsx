"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Header() {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the initial session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for login/logout events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-[100] bg-paper border-b border-line">
      <div className="max-w-[1240px] mx-auto px-[32px] h-[72px] flex items-center justify-between">
        <Link href="/" className="text-[1.5rem] font-display font-bold text-ink">
          BestRestaurants
        </Link>
        
        <nav className="flex items-center gap-[24px]">
          {isLoading ? (
            <div className="w-[100px] h-[36px] bg-line animate-pulse rounded" />
          ) : session ? (
            <>
              <Link href="/dashboard" className="text-chili hover:text-ink font-semibold">
                Dashboard
              </Link>
              <button 
                onClick={() => supabase.auth.signOut()} 
                className="bg-ink text-white px-[20px] py-[8px] rounded-sm font-semibold hover:bg-ink/80 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-chili hover:text-ink font-semibold">
                Log in
              </Link>
              <Link 
                href="/register" 
                className="bg-ink text-white px-[20px] py-[8px] rounded-sm font-semibold hover:bg-ink/80 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}