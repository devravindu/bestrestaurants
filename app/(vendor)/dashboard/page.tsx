import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";

export default async function DashboardOverview() {
  const session = await getServerSession();
  
  const dbUser = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

  const firstName = dbUser?.name?.split(" ")[0] || "there";

  return (
    <>
      <header className="mb-[40px]">
        <h1 className="font-display text-[2.5rem] font-bold text-ink mb-[8px]">
          Welcome, {firstName}
        </h1>
        <p className="text-ink/60 text-[1.1rem]">
          Here is what is happening with your restaurant today.
        </p>
      </header>

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
          <h3 className="font-bold text-teal mb-[8px]">Saved by Users</h3>
          <p className="text-[2.2rem] font-display font-bold">0</p>
        </div>
      </div>
    </>
  );
}