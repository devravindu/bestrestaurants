import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { restaurants: true }
  });

  if (!dbUser || dbUser.restaurants.length === 0) {
    redirect("/dashboard/onboarding");
  }

  const restaurant = dbUser.restaurants[0];

  return (
    <div className="max-w-[1200px]">
      <header className="mb-[40px]">
        <h1 className="font-display text-[2.5rem] font-bold text-ink mb-[8px]">
          Restaurant Profile
        </h1>
        <p className="text-ink/60 text-[1.1rem]">
          Update the public information displayed on your BestRestaurant.lk landing page.
        </p>
      </header>

      <ProfileForm initialData={restaurant} />
    </div>
  );
}