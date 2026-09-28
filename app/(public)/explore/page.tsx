import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";

export default async function ExplorePage() {
  // Fetch all active restaurants, ordered by highest rating first
  const restaurants = await prisma.restaurant.findMany({
    where: { status: Status.APPROVED }, 
    orderBy: { avgRating: "desc" },
  });

 return (
    <main className="min-h-screen bg-paper py-[60px]">
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px]">
        <header className="mb-[40px]">
          <h1 className="text-[3rem] font-display font-bold text-ink mb-[12px]">
            Discover Great Food
          </h1>
          <p className="text-ink/70 text-[1.1rem]">
            Find the best dining experiences reviewed by local foodies.
          </p>
        </header>

        {restaurants.length === 0 ? (
          <div className="text-center py-[60px] bg-white rounded-xl border border-line">
            <p className="text-ink/60 text-[1.1rem]">No active restaurants found. Add one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {restaurants.map((restaurant) => (
              <Link 
                href={`/restaurant/${restaurant.slug}`} 
                key={restaurant.id}
                className="group flex flex-col bg-white border border-line rounded-xl overflow-hidden hover:shadow-soft transition-all duration-300"
              >
                <div className="relative w-full h-[200px] bg-line/30 overflow-hidden">
                  {restaurant.heroImageUrl ? (
                    <Image 
                      src={restaurant.heroImageUrl} 
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink/40">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-[12px] right-[12px] bg-white/90 backdrop-blur-sm px-[10px] py-[4px] rounded-full flex items-center gap-[4px] shadow-sm">
                    <span className="text-[0.85rem] font-bold text-ink">
                      {restaurant.avgRating?.toFixed(1) || "0.0"}
                    </span>
                    <span className="text-[0.8rem]">⭐️</span>
                  </div>
                </div>
                
                <div className="p-[20px] flex flex-col flex-grow">
                  <h2 className="text-[1.25rem] font-bold text-ink mb-[4px] group-hover:text-teal transition-colors">
                    {restaurant.name}
                  </h2>
                  <p className="text-ink/60 text-[0.85rem] mb-[12px] truncate">
                    {restaurant.location?.split(',')[0]} {restaurant.category ? `• ${restaurant.category.split(',')[0]}` : ''}
                  </p>
                  
                  <div className="mt-auto pt-[16px] border-t border-line flex justify-between items-center text-[0.85rem] text-ink/70">
                    <span>{restaurant.reviewCount} reviews</span>
                    
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}