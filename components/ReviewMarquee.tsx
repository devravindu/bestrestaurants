"use client";

import { useEffect, useState } from "react";

export default function ReviewMarquee() {
  const reviews = [
    { id: 1, text: "Absolutely stunning ambiance!", author: "Sarah L.", rating: 5 },
    { id: 2, text: "Best crab I have ever had.", author: "Mike T.", rating: 5 },
    { id: 3, text: "Great service and authentic flavors.", author: "Devi M.", rating: 5 },
    { id: 4, text: "A hidden gem in the city.", author: "John D.", rating: 5 },
  ];

  return (
    <section className="py-12 bg-amber-50 overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-center">Community Reviews</h2>
      <div className="relative w-full flex overflow-x-hidden">
        {/* Simple CSS animation for marquee effect */}
        <div className="flex whitespace-nowrap animate-marquee">
          {reviews.concat(reviews).map((review, i) => (
            <div key={`${review.id}-${i}`} className="mx-4 bg-white p-4 rounded-lg shadow w-80 inline-block shrink-0">
              <div className="flex text-amber-500 mb-2">
                {Array(review.rating).fill('★').join('')}
              </div>
              <p className="italic text-gray-700 mb-2">&quot;{review.text}&quot;</p>
              <p className="text-sm font-semibold text-right">- {review.author}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
