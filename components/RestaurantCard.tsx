import Link from "next/link";
import Image from "next/image";

interface RestaurantCardProps {
  id: string; // We are passing the restaurant slug into this prop
  title: string;
  location: string;
  rating: number;
  badgeText?: string;
  imageUrl?: string | null;
  reviewCount?: number;
}

export default function RestaurantCard({
  id,
  title,
  location,
  rating,
  badgeText,
  imageUrl,
  reviewCount = 0,
}: RestaurantCardProps) {
  return (
    <div className="bg-white border border-line rounded-xl overflow-hidden flex flex-col hover:shadow-soft transition-shadow">
      
      {/* Image Section */}
      <div className="relative w-full h-[200px] bg-line/30">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink/40">
            No Image
          </div>
        )}
        
        {badgeText && (
          <div className="absolute top-[12px] left-[12px] bg-[#B8860B] text-white px-[10px] py-[4px] rounded-s text-[0.75rem] font-bold uppercase tracking-wide shadow-sm">
            {badgeText}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-[20px] flex flex-col flex-grow">
        <h3 className="text-[1.25rem] font-bold text-ink mb-[4px] truncate">{title}</h3>
        <p className="text-ink/60 text-[0.85rem] mb-[12px] truncate">{location}</p>
        
        {/* Star Ratings */}
        <div className="flex items-center gap-[4px] mb-[20px] text-[#B8860B] text-[1rem]">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
          <span className="text-ink/60 text-[0.85rem] ml-[4px]">({reviewCount} reviews)</span>
        </div>

        {/* Action Button (Opens in new tab) */}
        <div className="mt-auto">
          <Link 
            href={`/restaurant/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-ink text-white font-bold py-[10px] rounded-s hover:bg-black transition-colors"
          >
            View Restaurent
          </Link>
        </div>
      </div>
      
    </div>
  );
}