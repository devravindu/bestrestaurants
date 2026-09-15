import React from 'react';
import Link from 'next/link';
import RestaurantCard from './RestaurantCard';

// Temporary data array representing your featured restaurants
const featuredData = [
  {
    id: 1,
    title: "Sundara by the Sea",
    location: "Mount Lavinia, Colombo",
    rating: 5,
    badgeText: "★ Featured",
    gradientFrom: "#0F3B35",
    gradientTo: "#1B5C52",
  },
  {
    id: 2,
    title: "Cinnamon & Salt",
    location: "Galle Face, Colombo 03",
    rating: 4,
    badgeText: "★ Featured",
    gradientFrom: "#B23A26",
    gradientTo: "#8F2C1B",
  },
  {
    id: 3,
    title: "The Jaffna Table",
    location: "Wellawatte, Colombo",
    rating: 5,
    badgeText: "★ Featured",
    gradientFrom: "#DB9E2C",
    gradientTo: "#B27A1F",
  },
  {
    id: 4,
    title: "Wattala Fish Market",
    location: "Wattala, Gampaha",
    rating: 4,
    badgeText: "★ Featured",
    gradientFrom: "#1B5C52",
    gradientTo: "#0F3B35",
  },
];

export default function FeaturedCarousel() {
  return (
    <section className="bg-paper py-[88px] max-sm:py-[56px]">
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px]">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-[44px] gap-[24px] flex-wrap">
          <div>
            <h2 className="text-[clamp(1.6rem,2.6vw,2.1rem)] tracking-[-0.01em] max-w-[16ch] font-display font-semibold">
              Featured culinary destinations
            </h2>
            <p className="text-ink/60 text-[1rem] mt-[10px] max-w-[48ch]">
              Hand-picked places our editors keep going back to.
            </p>
          </div>
          <Link 
            href="#" 
            className="text-[0.9rem] font-bold text-chili border-b-[1.5px] border-chili pb-[2px] shrink-0 hover:text-chili-deep transition-colors"
          >
            See all featured
          </Link>
        </div>
      </div>

      {/* Carousel Rail Container */}
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px]">
        <div 
          className="flex gap-[22px] overflow-x-auto pb-[8px] snap-x snap-proximity -mx-[32px] px-[32px] 
          [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-thumb]:rounded-[4px]"
        >
          {featuredData.map((item) => (
            <RestaurantCard
              key={item.id}
              variant="featured"
              title={item.title}
              location={item.location}
              rating={item.rating}
              badgeText={item.badgeText}
              gradientFrom={item.gradientFrom}
              gradientTo={item.gradientTo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}