import Link from "next/link";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Store, Utensils, MessageSquare, ArrowRight } from "lucide-react";

export default async function DashboardOverview() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch user data
  const dbUser = await prisma.user.findUnique({
    where: { supabaseUserId: user?.id || "" },
    include: { restaurants: true },
  });

  const firstName = dbUser?.name?.split(" ")[0] || "there";
  const userRole = dbUser?.role || "USER";
  const restaurant = dbUser?.restaurants?.[0];

  // Only fetch pending restaurants if the user is actually an ADMIN
  let pendingRestaurants: any[] = [];
  if (userRole === "ADMIN") {
    pendingRestaurants = await prisma.restaurant.findMany({
      where: { status: Status.PENDING },
    });
  }

  // Server Action for Admins to approve listings
  async function approveRestaurant(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;

    await prisma.restaurant.update({
      where: { id },
      data: { status: Status.APPROVED },
    });

    revalidatePath("/dashboard");
    revalidatePath("/explore");
  }

  return (
    <>
      <header className="mb-[40px]">
        <h1 className="font-display text-[2.5rem] font-bold text-ink mb-[8px]">
          {userRole === "ADMIN"
            ? "Platform Administration"
            : `Welcome, ${firstName}`}
        </h1>

        <p className="text-ink/60 text-[1.1rem]">
          {userRole === "ADMIN" &&
            "Review and approve new vendor submissions."}
          {userRole === "VENDOR" &&
            "Here is what is happening with your restaurant today."}
          {userRole === "USER" &&
            "Manage your account and platform activity."}
        </p>
      </header>


      {/* 1. STANDARD USER VIEW */}
      {userRole === "USER" && (
        <div className="flex-col items-center justify-center gap-6 md:flex flex-wrap">
        <div className="group relative mt-10 w-full max-w-[600px] overflow-hidden rounded-2xl border  border-black/[0.08] bg-white p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] sm:p-10">

          {/* Subtle decorative background */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-black/[0.025] blur-2xl transition-all duration-700 group-hover:bg-black/[0.06]" />

          {/* Restaurant icon */}
          <div className="relative mx-auto mb-7 flex h-[76px] w-[76px] items-center justify-center rounded-2xl border border-black/[0.08] bg-gradient-to-br from-white to-neutral-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:scale-105 group-hover:border-black/20 group-hover:shadow-lg">
            <Store
              size={34}
              strokeWidth={1.5}
              className="text-black transition-transform duration-500 group-hover:-rotate-3"
            />
          </div>

          {/* Heading */}
          <h2 className="relative mb-3 font-display text-3xl font-semibold tracking-tight text-black sm:text-[2.1rem]">
            Own a restaurant?
          </h2>

          {/* Description */}
          <p className="relative mx-auto mb-8 max-w-[430px] text-[15px] leading-7 text-neutral-500">
            Turn your restaurant into a local favourite. Create your listing,
            showcase your menu, and connect with customers through reviews.
          </p>

          {/* Benefits */}
          <div className="relative mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-medium tracking-wide text-neutral-600">
            <span className="inline-flex items-center gap-2">
              <Utensils size={15} strokeWidth={1.7} />
              Manage your menu
            </span>

            <span className="hidden h-4 w-px bg-neutral-200 sm:block" />

            <span className="inline-flex items-center gap-2">
              <MessageSquare size={15} strokeWidth={1.7} />
              Respond to reviews
            </span>
          </div>

          {/* CTA */}
          <Link
            href="/dashboard/onboarding"
            className="group/btn relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-black px-7 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] active:translate-y-0 active:scale-[0.98] sm:w-auto"
          >
            <span>Register my Restaurant</span>

            <ArrowRight
              size={17}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </Link>

          <p className="relative mt-5 text-xs text-neutral-400">
            Start building your restaurant&apos;s online presence.
          </p>
        </div>
        </div>
      )}



      {/* 2. VENDOR VIEW */}
      {userRole === "VENDOR" && (
        <div className="grid grid-cols-3 gap-[24px]">
          <div className="bg-white border border-line p-[24px] rounded-m shadow-soft">
            <h3 className="font-bold text-dark mb-[8px]">Total Views</h3>
            <p className="text-[2.2rem] font-display font-bold">0</p>
          </div>

          <div className="bg-white border border-line p-[24px] rounded-m shadow-soft">
            <h3 className="font-bold text-dark mb-[8px]">Average Rating</h3>
            <p className="text-[2.2rem] font-display font-bold">
              {restaurant?.avgRating?.toFixed(1) || "0.0"}{" "}
              <span className="text-[1.2rem]">⭐️</span>
            </p>
          </div>

          <div className="bg-white border border-line p-[24px] rounded-m shadow-soft">
            <h3 className="font-bold text-dark mb-[8px]">Total Reviews</h3>
            <p className="text-[2.2rem] font-display font-bold">
              {restaurant?.reviewCount || 0}
            </p>
          </div>
        </div>
      )}

      {/* 3. ADMIN VIEW */}
      {userRole === "ADMIN" && (
        <div>
          <h2 className="text-[1.5rem] font-bold text-ink mb-[24px]">
            Recent Pending Submissions
          </h2>

          <div className="flex flex-col gap-[16px]">
            {pendingRestaurants.length === 0 ? (
              <div className="bg-white border border-line rounded-xl p-[60px] text-center shadow-sm">
                <p className="text-ink/60 text-[1.1rem]">
                  No pending listings require review at this time.
                </p>
              </div>
            ) : (
              pendingRestaurants.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-line rounded-xl p-[24px] flex flex-col md:flex-row justify-between items-start md:items-center gap-[16px] shadow-sm"
                >
                  <div>
                    <h3 className="text-[1.25rem] font-bold text-ink mb-[4px]">
                      {req.name}
                    </h3>

                    <div className="flex items-center gap-[8px] text-ink/60 text-[0.9rem]">
                      <span>{req.location}</span>

                      {req.phone && (
                        <>
                          <span>•</span>
                          <span>{req.phone}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <form action={approveRestaurant}>
                    <input type="hidden" name="id" value={req.id} />

                    <button
                      type="submit"
                      className="bg-dark text-white font-bold py-[10px] px-[24px] rounded-s hover:bg-dark/90 transition-colors"
                    >
                      Approve Listing
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}