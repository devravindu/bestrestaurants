import React from 'react';

const reviewsData = [
  { id: 1, avatar: 'N', name: 'Nethmi', text: "The ambiance was incredible, and the spicy crab was the best I've had in the city.", target: 'Reviewed Sundara by the Sea' },
  { id: 2, avatar: 'R', name: 'Ravindu', text: "Genuinely the closest thing to my grandmother's kottu I've found outside a home kitchen.", target: 'Reviewed Colombo Kade' },
  { id: 3, avatar: 'A', name: 'Amaya', text: "Booked for a birthday and they remembered the sea view request without being asked twice.", target: 'Reviewed Cinnamon & Salt' },
  { id: 4, avatar: 'D', name: 'Dinesh', text: "Kola kanda at 7am, still warm, still cheap, still the best way to start a Sunday.", target: 'Reviewed Kola Kanda House' },
];

export default function ReviewMarquee() {
  return (
    <section className="bg-teal-deep text-cream overflow-hidden py-[88px] max-sm:py-[56px]">
      <style>{`
        @keyframes scrollReviews {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scrollReviews {
          animation: scrollReviews 42s linear infinite;
        }
      `}</style>

      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px]">
        <div className="mb-[44px]">
          <h2 className="text-[clamp(1.6rem,2.6vw,2.1rem)] tracking-[-0.01em] font-display font-semibold">
            Fresh off the table: recent reviews
          </h2>
          <p className="text-cream/65 text-[1rem] mt-[10px] max-w-[48ch]">
            What diners are saying, right now.
          </p>
        </div>
      </div>

      <div className="overflow-hidden -mx-[32px] px-[32px]" style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)' }}>
        <div className="flex gap-[20px] w-max animate-scrollReviews hover:[animation-play-state:paused]">
          {/* We render the array twice for the seamless looping effect */}
          {[...reviewsData, ...reviewsData].map((review, index) => (
            <div key={index} className="w-[340px] flex-none bg-cream/5 border border-line-light rounded-m p-[24px]">
              <div className="flex items-center gap-[12px] mb-[14px]">
                <div className="w-[38px] h-[38px] rounded-full bg-turmeric text-ink flex items-center justify-center font-bold text-[0.95rem] shrink-0">
                  {review.avatar}
                </div>
                <div className="font-bold text-[0.95rem]">{review.name}</div>
              </div>
              <p className="text-[0.94rem] text-cream/85 leading-[1.6] mb-[14px]">
                {review.text}
              </p>
              <span className="text-[0.84rem] text-turmeric font-semibold">
                {review.target}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}