import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import SettingsDropdown from "@/components/SettingsDropdown";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { restaurants: true }
  });

  if (!dbUser || dbUser.role !== "VENDOR") {
    return <>{children}</>; 
  }

  const restaurant = dbUser.restaurants[0];

  return (
    <>
      {/* Global Website Header */}
      <Header />
      
      {/* Dashboard Wrapper */}
      <div className="flex bg-paper" style={{ minHeight: 'calc(100vh - 76px)' }}>
        
        {/* Sidebar Navigation */}
        <aside className="w-[260px] bg-cream border-r border-line flex flex-col shrink-0 sticky top-[76px]" style={{ height: 'calc(100vh - 76px)' }}>
          
          <div className="p-[24px] border-b border-line">
            <p className="text-[0.75rem] font-bold text-teal uppercase tracking-wider mb-[4px]">Managing</p>
            <h2 className="font-bold text-[1.1rem] text-ink truncate">
              {restaurant?.name || "Restaurant"}
            </h2>
            <span className="inline-block mt-[4px] bg-teal/10 text-teal text-[0.7rem] font-bold px-[8px] py-[2px] rounded-s uppercase tracking-wider">
              {restaurant?.status}
            </span>
          </div>
          
          <nav className="flex-1 flex flex-col gap-[4px] p-[16px]">
            <Link href="/dashboard" className="px-[16px] py-[10px] rounded-s font-semibold text-[0.95rem] text-ink hover:bg-teal/5 transition-colors">
              Overview
            </Link>
            <Link href="/dashboard/profile" className="px-[16px] py-[10px] rounded-s font-semibold text-[0.95rem] text-ink hover:bg-teal/5 transition-colors">
              Restaurant Profile
            </Link>
            <Link href="/dashboard/reviews" className="px-[16px] py-[10px] rounded-s font-semibold text-[0.95rem] text-ink hover:bg-teal/5 transition-colors">
              Reviews
            </Link>
          </nav>

          {/* Settings Footer anchored to the bottom */}
          <div className="p-[16px] border-t border-line mt-auto">
            <SettingsDropdown />
          </div>

        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-[40px] max-w-[1200px]">
          {children}
        </main>
      </div>
    </>
  );
}