import Link from "next/link";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
        <div className="bg-cream border border-line rounded-m p-[32px] text-center max-w-[600px] mt-[40px]">
          <div className="text-[3rem] mb-[16px]">🏪</div>

          <h2 className="font-display text-[1.8rem] font-semibold mb-[12px]">
            Own a restaurant?
          </h2>

          <p className="text-ink/70 mb-[24px]">
            You currently have a standard account. Upgrade to a Vendor account
            to list your restaurant, manage menus, and respond to reviews.
          </p>

          <Link
            href="/dashboard/onboarding"
            className="inline-flex items-center justify-center font-bold text-[1rem] py-[12px] px-[24px] rounded-s bg-chili text-cream hover:bg-chili-deep transition-colors"
          >
            Register my Restaurant
          </Link>
        </div>
      )}

      {/* 2. VENDOR VIEW */}
      {userRole === "VENDOR" && (
        <div className="grid grid-cols-3 gap-[24px]">
          <div className="bg-cream border border-line p-[24px] rounded-m shadow-soft">
            <h3 className="font-bold text-teal mb-[8px]">Total Views</h3>
            <p className="text-[2.2rem] font-display font-bold">0</p>
          </div>

          <div className="bg-cream border border-line p-[24px] rounded-m shadow-soft">
            <h3 className="font-bold text-teal mb-[8px]">Average Rating</h3>
            <p className="text-[2.2rem] font-display font-bold">
              {restaurant?.avgRating?.toFixed(1) || "0.0"}{" "}
              <span className="text-[1.2rem]">⭐️</span>
            </p>
          </div>

          <div className="bg-cream border border-line p-[24px] rounded-m shadow-soft">
            <h3 className="font-bold text-teal mb-[8px]">Total Reviews</h3>
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
                      className="bg-teal text-white font-bold py-[10px] px-[24px] rounded-s hover:bg-teal/90 transition-colors"
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