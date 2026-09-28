import React from 'react';
import Link from 'next/link';
import RestaurantCard from './RestaurantCard';
import prisma from '@/lib/prisma';
import { Status } from '@prisma/client';

// Change to async function so we can fetch data directly
export default async function TrendingGrid() {
  // Fetch top 3 most reviewed active restaurants
  const trendingRestaurants = await prisma.restaurant.findMany({
    where: { status: Status.APPROVED }, // Using APPROVED based on our previous fix
    orderBy: { reviewCount: "desc" },
    take: 3,
  });

  return (
    <section id="trending" className="bg-paper py-[88px] max-sm:py-[56px]">
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px]">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-[44px] gap-[24px] flex-wrap">
          <div>
            <h2 className="text-[clamp(1.6rem,2.6vw,2.1rem)] tracking-[-0.01em] max-w-[16ch] font-display font-semibold">
              Trending in Mount Lavinia & Colombo
            </h2>
            <p className="text-ink/60 text-[1rem] mt-[10px] max-w-[48ch]">
              The highest-rated spots making waves this week.
            </p>
          </div>
          <Link 
            href="/explore" 
            className="text-[0.9rem] font-bold text-chili border-b-[1.5px] border-chili pb-[2px] shrink-0 hover:text-chili-deep transition-colors"
          >
            View full ranking
          </Link>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-3 gap-[26px] max-lg:grid-cols-1">
          {trendingRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.slug}
              title={restaurant.name}
              location={restaurant.location?.split(',')[0] || "Sri Lanka"}
              rating={Math.round(restaurant.avgRating || 0)}
              reviewCount={restaurant.reviewCount}
              imageUrl={restaurant.heroImageUrl}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}