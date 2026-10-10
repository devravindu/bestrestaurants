"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type User = {
  email?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
    picture?: string;
  };
};

export default function Header() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"loading" | "ready">("loading");

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setStatus("ready");
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setStatus("ready");
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

  const userName =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "";

  const userImage =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null;

  return (
    <header className="sticky top-0 z-[100] bg-light border-b border-line">
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px] h-[76px] flex items-center justify-between gap-[24px]">

        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[1.5rem] font-bold tracking-[-0.01em] flex items-baseline gap-[2px] shrink-0"
        >
          BestRestaurant
          <span className="text-chili italic">.</span>
          <span className="text-[0.62em] text-dark font-semibold ml-[2px]">
            lk
          </span>
        </Link>

        {/* Primary Navigation */}
        <nav className="flex gap-[36px] max-lg:hidden">
          <Link
            href="/"
            className="text-[0.95rem] font-semibold text-ink py-[6px] border-b-[2px] border-transparent hover:border-chili transition-colors"
          >
            Home
          </Link>
          <Link
            href="#trending"
            className="text-[0.95rem] font-semibold text-ink py-[6px] border-b-[2px] border-transparent hover:border-chili transition-colors"
          >
            Top 100
          </Link>
          <Link
            href="#"
            className="text-[0.95rem] font-semibold text-ink py-[6px] border-b-[2px] border-transparent hover:border-chili transition-colors"
          >
            Locations
          </Link>
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-[20px] shrink-0">
          {status === "loading" ? (
            /* Loading state placeholder */
            <div className="w-[120px] h-[30px] bg-dark-deep/5 animate-pulse rounded-s"></div>
          ) : user ? (
            /* Logged In State */
            <div className="flex items-center gap-[16px]">
              <div className="flex items-center gap-[10px]">
                {userImage && (
                  <img
                    src={userImage}
                    alt="Profile"
                    className="w-[32px] h-[32px] rounded-full border border-line"
                  />
                )}

                <span className="text-[0.9rem] font-semibold text-ink max-sm:hidden">
                  {userName.split(" ")[0]}
                </span>
              </div>


              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-[8px] font-bold text-[0.92rem] py-[11px] px-[20px] rounded-s bg-dark-deep text-white hover:bg-black transition-colors whitespace-nowrap"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            /* Logged Out State */
            <>
              <Link
                href="/login"
                className="text-[0.9rem] font-semibold text-dark whitespace-nowrap hover:underline max-sm:hidden"
              >
                Log in / Register
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-[8px] font-bold text-[0.92rem] py-[11px] px-[20px] rounded-s bg-chili text-white hover:bg-chili-deep transition-colors whitespace-nowrap"
              >
                + Add a restaurant
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

