import React from 'react';
import Link from 'next/link';

interface RestaurantCardProps {
  variant: 'featured' | 'trending';
  title: string;
  location: string;
  rating: number; // 1 to 5
  reviewsCount?: number;
  tags?: string[];
  badgeText?: string | number; // e.g., "★ Featured" or "1"
  gradientFrom: string;
  gradientTo: string;
}

export default function RestaurantCard({
  variant,
  title,
  location,
  rating,
  reviewsCount,
  tags,
  badgeText,
  gradientFrom,
  gradientTo,
}: RestaurantCardProps) {
  // Helper to render stars based on rating
  const renderStars = () => {
    return (
      <span className="inline-flex gap-[2px] text-turmeric text-[0.95rem]">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? '' : 'text-ink/20'}>
            ★
          </span>
        ))}
      </span>
    );
  };

  if (variant === 'featured') {
    return (
      <article className="flex-none w-[300px] snap-start bg-cream border border-line rounded-m">
        <div 
          className="relative flex items-end overflow-hidden rounded-t-m aspect-[16/11]"
          style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
        >
          {badgeText && (
            <span className="absolute top-[14px] left-[14px] bg-turmeric text-ink text-[0.75rem] font-bold py-[5px] pl-[9px] pr-[11px] rounded-[2px] flex items-center gap-[5px] shadow-card -rotate-2 z-10">
              {badgeText}
            </span>
          )}
          {/* Abstract glyph placeholder */}
          <svg className="absolute -right-[6%] -top-[10%] w-[58%] opacity-[0.18]" viewBox="0 0 200 200">
            <path d="M100 20c30 0 55 30 55 65s-25 65-55 65-55-30-55-65 25-65 55-65z" fill="#FAF4E6"/>
          </svg>
        </div>
        <div className="p-[18px_20px_22px]">
          <h3 className="text-[1.12rem] mb-[6px] font-display font-semibold">{title}</h3>
          <p className="text-[0.86rem] text-ink/60 mb-[10px]">{location}</p>
          {renderStars()}
        </div>
      </article>
    );
  }

  // Trending Variant
  return (
    <article className="border border-line rounded-m bg-cream overflow-hidden flex flex-col">
      <div 
        className="relative flex items-end overflow-hidden aspect-[4/3]"
        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
      >
        {badgeText && (
          <span className="absolute top-[14px] left-[14px] w-[30px] h-[30px] rounded-full bg-ink text-cream flex items-center justify-center text-[0.85rem] font-bold z-10">
            {badgeText}
          </span>
        )}
        {/* Abstract glyph placeholder */}
        <svg className="absolute -right-[6%] -top-[10%] w-[58%] opacity-[0.16]" viewBox="0 0 200 200">
          <path d="M40 160c-10-60 30-120 80-120 20 40 20 90-10 120H40z" fill="#FAF4E6"/>
        </svg>
      </div>
      <div className="p-[20px_22px_24px] flex flex-col flex-grow">
        <h3 className="text-[1.18rem] font-display font-semibold">{title}</h3>
        
        {tags && tags.length > 0 && (
          <div className="flex gap-[8px] flex-wrap my-[10px]">
            {tags.map((tag, i) => (
              <span key={i} className="text-[0.76rem] font-semibold text-teal bg-teal/10 px-[10px] py-[4px] rounded-[20px]">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <p className="text-[0.87rem] text-ink/60 mb-[12px]">{location}</p>
        
        <div className="flex items-center gap-[8px] mb-[18px]">
          {renderStars()}
          <span className="text-[0.85rem] text-ink/55">({reviewsCount} reviews)</span>
        </div>
        
        <Link 
          href="#" 
          className="mt-auto flex items-center justify-center gap-[8px] font-bold text-[0.92rem] py-[11px] px-[20px] rounded-s bg-ink text-cream hover:bg-black transition-colors"
        >
          View menu & reviews
        </Link>
      </div>
    </article>
  );
}