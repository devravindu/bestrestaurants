import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function AdminDashboard() {
  // Fetch all restaurants awaiting approval
  const pendingRestaurants = await prisma.restaurant.findMany({
    where: { status: Status.PENDING },
  });

  // Next.js Server Action to handle the database update securely on the server
  async function approveRestaurant(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    
    await prisma.restaurant.update({
      where: { id },
      data: { status: Status.APPROVED },
    });
    
    // Instantly refresh the admin list and the public explore grid
    revalidatePath("/admin");
    revalidatePath("/explore");
  }

  return (
    <main className="min-h-screen bg-paper py-[60px] px-[20px] md:px-[40px]">
      <div className="max-w-[1000px] mx-auto">
        <header className="mb-[40px]">
          <h1 className="text-[2.5rem] font-display font-bold text-ink mb-[8px]">
            Platform Administration
          </h1>
          <p className="text-ink/70 text-[1.1rem]">
            Review and approve new vendor submissions.
          </p>
        </header>

        {pendingRestaurants.length === 0 ? (
          <div className="bg-white border border-line rounded-xl p-[60px] text-center shadow-sm">
            <p className="text-ink/60 text-[1.1rem]">No pending listings require review at this time.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-[16px]">
            {pendingRestaurants.map((restaurant) => (
              <div 
                key={restaurant.id} 
                className="bg-white border border-line rounded-xl p-[24px] flex flex-col md:flex-row justify-between items-start md:items-center gap-[16px] shadow-sm"
              >
                <div>
                  <h2 className="text-[1.25rem] font-bold text-ink mb-[4px]">{restaurant.name}</h2>
                  <div className="flex items-center gap-[8px] text-ink/60 text-[0.9rem]">
                    <span>{restaurant.location}</span>
                    {restaurant.phone && (
                      <>
                        <span>•</span>
                        <span>{restaurant.phone}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <form action={approveRestaurant}>
                  <input type="hidden" name="id" value={restaurant.id} />
                  <button 
                    type="submit"
                    className="bg-teal text-white font-bold py-[10px] px-[24px] rounded-s hover:bg-teal/90 transition-colors"
                  >
                    Approve Listing
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}