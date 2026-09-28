import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

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
    <div className="flex min-h-screen bg-paper">
      {/* Dynamic Sidebar */}
      <aside className="w-[250px] shrink-0 bg-cream border-r border-line flex flex-col">
        {/* ADMIN SIDEBAR */}
        {userRole === "ADMIN" && (
          <>
            <div className="p-[24px] border-b border-line">
              <p className="text-[0.75rem] font-bold text-teal uppercase tracking-wider mb-[4px]">
                Admin Portal
              </p>
              <div className="flex justify-between items-start gap-[8px]">
                <h2 className="font-bold text-[1.1rem] text-ink truncate">
                  Platform Control
                </h2>
              </div>
            </div>

            <nav className="flex-grow p-[24px] flex flex-col gap-[16px]">
              <Link
                href="/dashboard"
                className="font-medium text-[0.95rem] text-ink hover:text-teal transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/dashboard/restaurants"
                className="font-medium text-[0.95rem] text-ink hover:text-teal transition-colors"
              >
                Restaurants
              </Link>
              <Link
                href="/dashboard/users"
                className="font-medium text-[0.95rem] text-ink hover:text-teal transition-colors"
              >
                Users
              </Link>
            </nav>
          </>
        )}

        {/* VENDOR SIDEBAR */}
        {userRole === "VENDOR" && (
          <>
            <div className="p-[24px] border-b border-line">
              <p className="text-[0.75rem] font-bold text-teal uppercase tracking-wider mb-[4px]">
                Managing
              </p>

              <div className="flex justify-between items-start gap-[8px]">
                <div className="overflow-hidden">
                  <h2 className="font-bold text-[1.1rem] text-ink truncate">
                    {restaurant?.name || "Restaurant"}
                  </h2>

                  <span className="inline-block mt-[4px] bg-teal/10 text-teal text-[0.7rem] font-bold px-[8px] py-[2px] rounded-s uppercase tracking-wider">
                    {restaurant?.status}
                  </span>
                </div>

                {restaurant?.slug && (
                  <Link
                    href={`/restaurant/${restaurant.slug}`}
                    target="_blank"
                    title="View Public Page"
                    className="shrink-0 p-[8px] text-ink/50 hover:text-teal hover:bg-teal/5 rounded-s transition-colors"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>

            <nav className="flex-grow p-[24px] flex flex-col gap-[16px]">
              <Link
                href="/dashboard"
                className="font-medium text-[0.95rem] text-ink hover:text-teal transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/dashboard/profile"
                className="font-medium text-[0.95rem] text-ink hover:text-teal transition-colors"
              >
                Restaurant Profile
              </Link>
            </nav>
          </>
        )}

        {/* STANDARD USER / FALLBACK SIDEBAR */}
        {userRole === "USER" && (
          <div className="flex-grow p-[24px]">
            <p className="text-ink/60 text-[0.9rem]">Standard Account</p>
          </div>
        )}

        {/* SHARED SIDEBAR FOOTER */}
        <div className="p-[24px] border-t border-line mt-auto flex items-center gap-[12px] hover:bg-black/5 cursor-pointer transition-colors">
          <div className="w-[32px] h-[32px] bg-teal-deep text-white rounded-full flex items-center justify-center font-bold text-[0.9rem]">
            {dbUser?.name?.charAt(0) || "U"}
          </div>

          <span className="font-medium text-ink text-[0.9rem]">
            Settings
          </span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-[40px] max-w-[1200px]">
        {children}
      </main>
    </div>
  );
}