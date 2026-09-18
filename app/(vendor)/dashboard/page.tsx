import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
// Make sure this points to your actual auth options if you exported them, 
// or we can just fetch the raw session.
// For now, we'll use a simpler server-side check.

export default async function DashboardPage() {
  const session = await getServerSession();

  // Double-checking security on the server side
  if (!session) {
    redirect("/login");
  }

  // NextAuth token passes the role we set in route.ts
  const userRole = (session.user as any)?.role || "USER";
  const firstName = session.user?.name?.split(" ")[0] || "there";

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
        <div className="grid grid-cols-3 gap-[24px]">
          {/* We will build the actual vendor stats here next */}
          <div className="bg-cream border border-line p-[24px] rounded-m">
            <h3 className="font-bold text-teal mb-[8px]">Total Views</h3>
            <p className="text-[2rem] font-display font-bold">1,248</p>
          </div>
          <div className="bg-cream border border-line p-[24px] rounded-m">
            <h3 className="font-bold text-teal mb-[8px]">Average Rating</h3>
            <p className="text-[2rem] font-display font-bold">4.8 ⭐️</p>
          </div>
          <div className="bg-cream border border-line p-[24px] rounded-m">
            <h3 className="font-bold text-teal mb-[8px]">Active Listings</h3>
            <p className="text-[2rem] font-display font-bold">1</p>
          </div>
        </div>
      )}
    </div>
  );
}