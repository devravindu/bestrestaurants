import React from 'react';
import Link from 'next/link';
import RestaurantCard from './RestaurantCard';
import prisma from '@/lib/prisma';
import { Status } from '@prisma/client';

export default async function FeaturedCarousel() {
  // Fetch the top 4 highest-rated approved restaurants directly inside the component
  const featuredRestaurants = await prisma.restaurant.findMany({
    where: { status: Status.APPROVED },
    orderBy: { avgRating: "desc" },
    take: 4, 
  });

  return (
    <section className="py-[80px] bg-paper">
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px]">
        
        <div className="flex justify-between items-end mb-[40px]">
          <div>
            <h2 className="text-[2.5rem] font-display font-bold text-ink mb-[8px]">
              Featured culinary<br/>destinations
            </h2>
            <p className="text-ink/60 text-[1.1rem]">
              Hand-picked places our editors keep going back to.
            </p>
          </div>
          <Link href="/explore" className="text-chili font-bold text-[0.95rem] hover:underline pb-[8px]">
            See all featured
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard 
              key={restaurant.id}
              id={restaurant.slug} 
              title={restaurant.name}
              location={restaurant.location?.split(',')[0] || "Sri Lanka"}
              rating={Math.round(restaurant.avgRating || 0)}
              reviewCount={restaurant.reviewCount} // Add this line!
              badgeText="★ Featured"
              imageUrl={restaurant.heroImageUrl} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}