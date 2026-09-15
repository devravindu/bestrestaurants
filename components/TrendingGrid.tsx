import React from 'react';
import Link from 'next/link';
import RestaurantCard from './RestaurantCard';

const trendingData = [
  {
    id: 1,
    title: "Sundara by the Sea",
    location: "Hotel Road, Mount Lavinia",
    rating: 5,
    reviewsCount: 214,
    tags: ["Seafood", "Fine dining"],
    gradientFrom: "#0F3B35",
    gradientTo: "#1B5C52",
  },
  {
    id: 2,
    title: "Kola Kanda House",
    location: "De Saram Road, Mount Lavinia",
    rating: 4,
    reviewsCount: 158,
    tags: ["Sri Lankan", "Breakfast"],
    gradientFrom: "#B23A26",
    gradientTo: "#8F2C1B",
  },
  {
    id: 3,
    title: "Colombo Kade",
    location: "Galle Road, Colombo 06",
    rating: 5,
    reviewsCount: 124,
    tags: ["Street food", "Kottu"],
    gradientFrom: "#DB9E2C",
    gradientTo: "#B27A1F",
  }
];

export default function TrendingGrid() {
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
            href="#" 
            className="text-[0.9rem] font-bold text-chili border-b-[1.5px] border-chili pb-[2px] shrink-0 hover:text-chili-deep transition-colors"
          >
            View full ranking
          </Link>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-3 gap-[26px] max-lg:grid-cols-1">
          {trendingData.map((item) => (
            <RestaurantCard
              key={item.id}
              variant="trending"
              title={item.title}
              location={item.location}
              rating={item.rating}
              reviewsCount={item.reviewsCount}
              tags={item.tags}
              gradientFrom={item.gradientFrom}
              gradientTo={item.gradientTo}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}