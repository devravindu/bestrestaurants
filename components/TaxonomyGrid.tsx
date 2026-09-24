import React from 'react';
import Link from 'next/link';

export default function TaxonomyGrid() {
  return (
    <section className="bg-paper-warm py-[88px] max-sm:py-[56px]">
      <div className="max-w-[1240px] mx-auto px-[32px] max-lg:px-[20px]">
        
        {/* Section Header */}
        <div className="mb-[44px]">
          <h2 className="text-[clamp(1.6rem,2.6vw,2.1rem)] tracking-[-0.01em] font-display font-semibold">
            What are you craving?
          </h2>
          <p className="text-ink/62 text-[1rem] mt-[10px] max-w-[48ch]">
            Browse by mood, not just menu.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-6 grid-rows-[repeat(2,180px)] gap-[14px] max-lg:grid-cols-2 max-lg:grid-rows-auto max-sm:grid-cols-1">
          
          {/* Tile 1: Beachfront */}
          <Link 
            href="#" 
            className="group relative rounded-2xl overflow-hidden block col-[1/4] row-[1/3] max-lg:col-[1/3] max-lg:row-auto max-lg:h-[220px] max-sm:col-[1] max-sm:h-[180px]"
          >
            {/* Background Image with Zoom Effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: "url('https://cdn.sanity.io/images/xhhnkk4g/production/e3f71cd0caf91e6f84ac1aa25e022b9c32493976-1080x720.webp')" }}
            ></div>
            
            {/* Dark Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
            
            {/* Hover Content */}
            <div className="absolute inset-0 p-[24px] flex flex-col justify-end">
              <div className="transform translate-y-6 transition-transform duration-300 ease-out group-hover:translate-y-0">
                <span className="block relative z-10 font-bold text-[1.4rem] text-white">Beachfront dining</span>
                <span className="block relative z-10 text-white/80 text-[0.95rem] mt-1 opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100">
                  Enjoy the ocean breeze and fresh seafood.
                </span>
              </div>
            </div>
          </Link>

          {/* Tile 2: Sri Lankan */}
          <Link 
            href="#" 
            className="group relative rounded-2xl overflow-hidden block col-[4/7] row-[1/2] max-lg:col-span-1 max-lg:row-auto max-lg:h-[160px] max-sm:col-[1] max-sm:h-[180px]"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: "url('https://thatswhatshehad.com/wp-content/uploads/2018/01/DSC_0133-1024x681.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
            <div className="absolute inset-0 p-[20px] flex flex-col justify-end">
              <div className="transform translate-y-6 transition-transform duration-300 ease-out group-hover:translate-y-0">
                <span className="block relative z-10 font-bold text-[1.15rem] text-white">Authentic Sri Lankan</span>
                <span className="block relative z-10 text-white/80 text-[0.9rem] mt-1 opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100">
                  Rich spices and traditional flavors.
                </span>
              </div>
            </div>
          </Link>

          {/* Tile 3: Cafes */}
          <Link 
            href="#" 
            className="group relative rounded-2xl overflow-hidden block col-[4/5] row-[2/3] max-lg:col-span-1 max-lg:row-auto max-lg:h-[160px] max-sm:col-[1] max-sm:h-[180px]"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
            <div className="absolute inset-0 p-[20px] flex flex-col justify-end">
              <div className="transform translate-y-6 transition-transform duration-300 ease-out group-hover:translate-y-0">
                <span className="block relative z-10 font-bold text-[1.15rem] text-white">Cafes & bakeries</span>
                <span className="block relative z-10 text-white/80 text-[0.9rem] mt-1 opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100">
                  Perfect spots for coffee.
                </span>
              </div>
            </div>
          </Link>

          {/* Tile 4: Late Night */}
          <Link 
            href="#" 
            className="group relative rounded-2xl overflow-hidden block col-[5/7] row-[2/3] max-lg:col-span-1 max-lg:row-auto max-lg:h-[160px] max-sm:col-[1] max-sm:h-[180px]"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
            <div className="absolute inset-0 p-[20px] flex flex-col justify-end">
              <div className="transform translate-y-6 transition-transform duration-300 ease-out group-hover:translate-y-0">
                <span className="block relative z-10 font-bold text-[1.15rem] text-white">Late night spots</span>
                <span className="block relative z-10 text-white/80 text-[0.9rem] mt-1 opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100">
                  Keep the night going.
                </span>
              </div>
            </div>
          </Link>

        </div>

        {/* Extra Row (Vegan) */}
        <div className="grid grid-cols-1 mt-[14px]">
          <Link 
            href="#" 
            className="group relative rounded-2xl overflow-hidden block h-[220px] max-sm:h-[180px]"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
            <div className="absolute inset-0 p-[24px] flex flex-col justify-end">
              <div className="transform translate-y-6 transition-transform duration-300 ease-out group-hover:translate-y-0">
                <span className="block relative z-10 font-bold text-[1.15rem] text-white">Vegan & vegetarian</span>
                <span className="block relative z-10 text-white/80 text-[0.9rem] mt-1 opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100">
                  Plant-based goodness for everyone.
                </span>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}