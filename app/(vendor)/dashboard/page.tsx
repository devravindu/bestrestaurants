import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Header from "@/components/Header";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Fetch fresh data directly from the database to bypass stale session cookies
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      restaurants: true, // Pull the restaurant they just created
    }
  });

  if (!dbUser) {
    redirect("/login");
  }

  const userRole = dbUser.role; // Always accurate database role
  const firstName = dbUser.name?.split(" ")[0] || "there";
  const myRestaurant = dbUser.restaurants[0]; // Get their first listed restaurant

  return (

    <div className="min-h-screen bg-paper p-[32px] max-w-[1240px] mx-auto">
      <header className="mb-[40px]">
        <h1 className="font-display text-[2.5rem] font-bold text-ink mb-[8px]">
          Welcome, {firstName}
        </h1>
        <p className="text-ink/60 text-[1.1rem]">
          Manage your account and platform activity.
        </p>
      </header>

      {userRole === "USER" && (
        <div className="bg-cream border border-line rounded-m p-[32px] text-center max-w-[600px] mx-auto mt-[80px]">
          <div className="text-[3rem] mb-[16px]">🏪</div>
          <h2 className="font-display text-[1.8rem] font-semibold mb-[12px]">Own a restaurant?</h2>
          <p className="text-ink/70 mb-[24px]">
            You currently have a standard diner account. Upgrade to a Vendor account to list your restaurant, manage menus, and respond to reviews.
          </p>
          <Link 
            href="/dashboard/onboarding"
            className="inline-flex items-center justify-center font-bold text-[1rem] py-[12px] px-[24px] rounded-s bg-chili text-cream hover:bg-chili-deep transition-colors"
          >
            Register my Restaurant
          </Link>
        </div>
      )}

      {userRole === "VENDOR" && (
        <div>
          {/* Displaying the actual data we just saved! */}
          <div className="mb-[32px] p-[24px] bg-teal/10 border border-teal rounded-m flex justify-between items-center">
            <div>
              <h2 className="font-bold text-[1.2rem] text-teal mb-[4px]">
                Active Property: {myRestaurant?.name || "Your Restaurant"}
              </h2>
              <p className="text-[0.95rem] text-ink/70">{myRestaurant?.location}</p>
            </div>
            <span className="bg-teal text-white text-[0.75rem] font-bold px-[12px] py-[4px] rounded-full uppercase tracking-wider">
              {myRestaurant?.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-[24px]">
            <div className="bg-cream border border-line p-[24px] rounded-m shadow-soft">
              <h3 className="font-bold text-teal mb-[8px]">Total Views</h3>
              <p className="text-[2.2rem] font-display font-bold">0</p>
            </div>
            <div className="bg-cream border border-line p-[24px] rounded-m shadow-soft">
              <h3 className="font-bold text-teal mb-[8px]">Average Rating</h3>
              <p className="text-[2.2rem] font-display font-bold">0.0 <span className="text-[1.2rem]">⭐️</span></p>
            </div>
            <div className="bg-cream border border-line p-[24px] rounded-m shadow-soft">
              <h3 className="font-bold text-teal mb-[8px]">Active Listings</h3>
              <p className="text-[2.2rem] font-display font-bold">1</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}