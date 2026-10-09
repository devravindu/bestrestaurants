import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";
import SettingsDropdown from "@/components/SettingsDropdown";
import {
  LayoutDashboard,
  Store,
  Users,
  Settings,
  ExternalLink,
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const dbUser = await prisma.user.findUnique({
    where: { supabaseUserId: user?.id || "" },
    include: { restaurants: true },
  });

  const userRole = dbUser?.role || "USER";
  const restaurant = dbUser?.restaurants?.[0];

  return (
  <div className="min-h-screen bg-light">
    {/* Fixed Header */}
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-line flex items-center justify-between px-[32px] z-50">
      <div>
        <h1 className="font-bold text-[1.2rem] text-ink">
          BestRestaurant.lk
        </h1>
      </div>

      <div className="flex items-center gap-[16px]">

        <div className="w-[36px] h-[36px] bg-dark-deep text-white rounded-full flex items-center justify-center font-bold text-[0.9rem]">
          {dbUser?.name?.charAt(0) || "U"}
        </div>
      </div>
    </header>

    {/* Fixed Sidebar */}
    <aside className="hidden md:flex fixed left-0 top-[72px] h-[calc(100vh-72px)] w-[250px] bg-white border-r border-line flex-col">
      {/* ADMIN SIDEBAR */}
      {userRole === "ADMIN" && (
        <>
          <div className="p-[24px] border-b border-line">
            <p className="text-[0.75rem] font-bold text-dark uppercase tracking-wider mb-[4px]">
              Admin Portal
            </p>

            <h2 className="font-bold text-[1.1rem] text-ink truncate">
              Platform Control
            </h2>
          </div>

          <DashboardNav role="ADMIN" />
        </>
      )}

      {/* VENDOR SIDEBAR */}
      {userRole === "VENDOR" && (
        <>
          <div className="p-[24px] border-b border-line">
            <p className="text-[0.75rem] font-bold text-dark uppercase tracking-wider mb-[4px]">
              Managing
            </p>

            <div className="flex justify-between items-start gap-[8px]">
              <div className="overflow-hidden">
                <h2 className="font-bold text-[1.1rem] text-ink truncate">
                  {restaurant?.name || "Restaurant"}
                </h2>

                <span
              className={`inline-flex items-center gap-[5px] mt-[8px] px-[9px] py-[4px] rounded-full text-[0.68rem] font-bold uppercase tracking-wider ${
                    restaurant?.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : restaurant?.status === "PENDING"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
              <span className="w-[6px] h-[6px] rounded-full bg-current" />
              {restaurant?.status || "PENDING"}
              </span>
              </div>

              {restaurant?.slug && (
                <Link
                  href={`/restaurant/${restaurant.slug}`}
                  target="_blank"
                  title="View Public Page"
                  className="shrink-0 p-[8px] text-ink/50 hover:text-dark hover:bg-dark/5 rounded-s transition-colors"
                >
                  <ExternalLink className="w-[18px] h-[18px]" />
                </Link>
              )}
            </div>
          </div>

            <DashboardNav role="VENDOR" />

        </>
      )}

      {/* STANDARD USER */}
      {userRole === "USER" && (
        <div className="flex-grow p-[24px]">
          <p className="text-ink/60 text-[0.9rem]">Standard Account</p>
        </div>
      )}

      {/* Sidebar Footer */}
      <div className="p-[16px] border-t border-line mt-auto">
        <SettingsDropdown />
      </div>
    </aside>

    {/* Main Content */}
    <main className="md:ml-[250px] pt-[72px] min-h-screen">
      <div className="p-[20px] md:p-[40px]">
        {children}
      </div>
    </main>
  </div>
);
}