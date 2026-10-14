import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";
import ShareButton from "./ShareButton"; // Adjust the import path as needed
import ReviewForm from "@/components/ReviewForm";

export default async function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });


  if (!restaurant) {
    notFound(); 
  }

  const formattedCategory = restaurant.category 
    ? restaurant.category.split(',').map(c => c.trim()).join(' • ') 
    : 'Restaurant';

  // Format dynamic links for the action buttons
  const mapQuery = encodeURIComponent(
    restaurant.lat != null && restaurant.lng != null
      ? `${restaurant.lat},${restaurant.lng}`
      : `${restaurant.name} ${restaurant.location || ""}`
  );

  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
    
  const whatsappNumber = restaurant.phone ? restaurant.phone.replace(/[^0-9]/g, '') : '';
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : '#';

  return (
    <main className="min-h-screen bg-white pb-[80px] pt-[40px] text-gray-900 font-sans">
      <div className="max-w-[1300px] mx-auto px-[20px] md:px-[40px]">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-[32px] gap-[16px]">
          <div className="flex items-center gap-[16px] flex-wrap">
            <h1 className="text-[2rem] font-bold leading-none tracking-tight">
              {restaurant.name}
            </h1>
            
          </div>
          
          <div className="flex items-center gap-[16px]">
            <span className="bg-[#FFF8E7] text-[#B8860B] text-[0.85rem] font-semibold px-[16px] py-[6px] rounded-full">
              Top 10 Sri Lanka 2026
            </span>
            <button className="w-[36px] h-[36px] bg-black text-white rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors shadow-md">
              <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] items-start">
          
          {/* Left Column: Media & Main Content */}
          <div className="lg:col-span-8 flex flex-col gap-[24px]">
            <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-sm">
              <div className="absolute top-6 left-6 z-10 bg-[#FFF8E7]/90 backdrop-blur-sm text-[#B8860B] px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className=" text-[0.95rem] mt-1 hidden md:block">
              {formattedCategory}
            </span>
              </div>
              
              {restaurant.heroImageUrl ? (
                <Image 
                  src={restaurant.heroImageUrl} 
                  alt={`${restaurant.name} cover`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                  No cover image provided
                </div>
              )}
            </div>

            <section className="mt-[24px]">
              <h2 className="text-[1.4rem] font-bold text-gray-900 mb-[16px]">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-[1rem] whitespace-pre-line">
                {restaurant.description || "Welcome to our restaurant. We provide a rare experience in taste."}
              </p>
            </section>

            {/* Customer reviews */}
            <section className="mt-10 border-t border-black/10 pt-8">
              <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-400">
                    Guest experiences
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
                    Reviews &amp; ratings
                  </h2>
                  <p className="mt-2 text-sm text-neutral-500">
                    Honest experiences shared by our community.
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start rounded-xl border border-black/10 px-4 py-3 sm:self-auto">
                  <span className="text-2xl font-bold text-black">
                    {restaurant.reviews.length
                      ? (
                          restaurant.reviews.reduce(
                            (sum, review) => sum + review.rating,
                            0
                          ) / restaurant.reviews.length
                        ).toFixed(1)
                      : "—"}
                  </span>
                  <div>
                    <div className="flex gap-0.5 text-sm text-black">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>
                          {star <= Math.round(
                            restaurant.reviews.length
                              ? restaurant.reviews.reduce(
                                  (sum, review) => sum + review.rating,
                                  0
                                ) / restaurant.reviews.length
                              : 0
                          ) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      {restaurant.reviews.length}{" "}
                      {restaurant.reviews.length === 1 ? "review" : "reviews"}
                    </p>
                  </div>
                </div>
              </div>

              {restaurant.reviews.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-black/15 bg-neutral-50 px-6 py-12 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-xl text-black">
                    ★
                  </div>
                  <h3 className="font-semibold text-black">Be the first to share</h3>
                  <p className="mt-2 text-sm text-neutral-500">
                    No reviews yet. Share your experience with the community.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {restaurant.reviews.map((review) => (
                    <article
                      key={review.id}
                      className="group rounded-2xl border border-black/[0.08] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl hover:shadow-black/[0.05]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          {review.user.image ? (
                            <img
                              src={review.user.image}
                              alt=""
                              className="h-11 w-11 shrink-0 rounded-full border border-black/10 object-cover"
                            />
                          ) : (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                              {(review.user.name || "G").charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-bold text-black">
                              {review.user.name || "Guest"}
                            </h3>
                            <p className="mt-1 text-xs text-neutral-400">
                              {new Date(review.createdAt).toLocaleDateString("en-LK", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        <span className="shrink-0 rounded-lg bg-black px-2.5 py-1.5 text-xs font-bold text-white">
                          {review.rating}/5
                        </span>
                      </div>

                      <div
                        className="mt-4 flex gap-1 text-sm text-black"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <= review.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>

                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-neutral-600">
                        {review.comment || "Rated this restaurant."}
                      </p>

                      <div className="mt-5 h-px w-10 bg-black/15 transition-all duration-300 group-hover:w-16 group-hover:bg-black" />
                    </article>
                  ))}
                </div>
              )}
            </section>
            {/* Write a review */}
            <ReviewForm restaurantId={restaurant.id} />

          </div>

          {/* Right Column: Info Sidebar Section */}
          <div className="lg:col-span-4 flex flex-col gap-[20px] sticky top-[40px]">
            
            {/* 1. Title & Rating Block */}
            <div className="flex gap-[16px] items-start mb-[4px]">
              
              <div className="flex-1">
                <h3 className="font-bold text-[1.4rem] text-gray-900 leading-tight mb-1">{restaurant.name}</h3>
                <p className="text-gray-500 text-[0.85rem] mb-2">{restaurant.location?.split(',')[0]} • {formattedCategory}</p>
              </div>
              {/* 1. Rating Block */}
              <div className="flex items-center gap-3 self-start rounded-xl border border-black/10 px-4 py-3 sm:self-auto">
                  <span className="text-2xl font-bold text-black">
                    {restaurant.reviews.length
                      ? (
                          restaurant.reviews.reduce(
                            (sum, review) => sum + review.rating,
                            0
                          ) / restaurant.reviews.length
                        ).toFixed(1)
                      : "—"}
                  </span>
                  <div>
                    <div className="flex gap-0.5 text-sm text-black">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>
                          {star <= Math.round(
                            restaurant.reviews.length
                              ? restaurant.reviews.reduce(
                                  (sum, review) => sum + review.rating,
                                  0
                                ) / restaurant.reviews.length
                              : 0
                          ) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      {restaurant.reviews.length}{" "}
                      {restaurant.reviews.length === 1 ? "review" : "reviews"}
                    </p>
                  </div>
                </div>
            </div>

            {/* 2. Contact Info Card */}
            <div className="border border-gray-100 rounded-2xl p-[24px] flex flex-col gap-[16px] text-[0.95rem] text-gray-800 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="flex items-start gap-[16px]">
                <svg className="w-[20px] h-[20px] shrink-0 mt-[2px] text-gray-900" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{restaurant.location || "12 Lighthouse Road, Unawatuna"}</span>
              </div>
              
              {restaurant.phone && (
                <div className="flex items-start gap-[16px]">
                  <svg className="w-[20px] h-[20px] shrink-0 mt-[2px] text-gray-900" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <div className="flex flex-wrap items-center gap-[8px]">
                    <span>{restaurant.phone}</span>
                    {restaurant.website && (
                      <>
                        <span className="text-gray-300">•</span>
                        <a href={`https://${restaurant.website}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{restaurant.website}</a>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

          {/* 3. Clean Opening Hours Card */}
            <div className="bg-gray-50 rounded-2xl p-[24px]">
              <div className="flex justify-between items-center mb-[20px]">
                <h4 className="font-bold text-[1.05rem] text-gray-900">Opening Hours</h4>
                <span className="text-[0.85rem] text-gray-500 font-medium">Open today</span>
              </div>
              
              <div className="flex flex-col gap-[14px] text-[0.95rem] text-gray-700">
                {restaurant.workingHours ? (
                  restaurant.workingHours.split('\n').map((line, i) => {
                    // Splits the text at the first number OR the word "Closed"
                    const match = line.match(/^(.*?)\s*(\d.*|Closed.*)$/i);
                    const day = match ? match[1].trim() : line;
                    const time = match ? match[2].trim() : '';
                    
                    return (
                      <div key={i} className="flex justify-between gap-[16px]">
                        <span className="text-gray-600">{day}</span>
                        <span className={`font-medium ${
                          time.toLowerCase().includes('closed') ? 'text-red-500' : 'text-gray-900'
                        }`}>
                          {time}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="flex justify-between gap-[16px]"><span className="text-gray-600">Mon - Thu</span><span className="font-medium text-gray-900">11:00 AM - 10:00 PM</span></div>
                    <div className="flex justify-between gap-[16px]"><span className="text-gray-600">Fri - Sun</span><span className="font-medium text-gray-900">10:00 AM - 11:30 PM</span></div>
                    <div className="flex justify-between gap-[16px]"><span className="text-gray-600">Brunch (Sat)</span><span className="font-medium text-gray-900">10:00 AM - 2:00 PM</span></div>
                  </>
                )}
              </div>
            </div>

            {/* 4. Map Placeholder Area */}
            {/* 4. Interactive Google Map */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <h4 className="font-bold text-gray-900">Find Us</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {restaurant.location}
                  </p>
                </div>

                <a
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-900 transition hover:bg-gray-100"
                >
                  Open Map ↗
                </a>
              </div>

              <div className="relative h-[260px] w-full bg-gray-100">
                <iframe
                  title={`Map showing ${restaurant.name}`}
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>

            {/* 5. Functional Action Buttons */}
            <div className="flex flex-wrap items-center gap-[12px] mt-[8px]">
              <a 
                href={mapLink}
                target="_blank" 
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-[10px] bg-[#0A0A0A] text-white py-[16px] px-[16px] rounded-xl font-medium text-[0.95rem] hover:bg-gray-800 transition-colors shadow-sm"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Get Directions
              </a>
              
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-[10px] bg-[#0A0A0A] text-white py-[16px] px-[16px] rounded-xl font-medium text-[0.95rem] hover:bg-gray-800 transition-colors shadow-sm"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Book Table
              </a>
              
              {/* Client Component for Share Functionality */}
              <ShareButton />
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}