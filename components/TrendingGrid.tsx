import { PrismaClient, Restaurant } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function TrendingGrid() {
  let trending: Partial<Restaurant>[] = [];
  try {
    // Defaulting to Colombo as per blueprint
    trending = await prisma.restaurant.findMany({
      where: {
        status: 'APPROVED',
        location: { contains: 'Colombo', mode: 'insensitive' },
      },
      orderBy: [
        { avgRating: 'desc' },
        { reviewCount: 'desc' },
      ],
      take: 4,
    });
  } catch (e) {
    console.error("Failed to fetch trending restaurants", e);
  }

  // Fallback for empty database during initial dev
  if (trending.length === 0) {
    trending = [
      { id: '1', name: 'Cafe Kumbuk (Mock)', avgRating: 4.8, reviewCount: 320, location: 'Colombo 07', slug: 'cafe-kumbuk' },
      { id: '2', name: 'Upalis (Mock)', avgRating: 4.6, reviewCount: 450, location: 'Colombo 07', slug: 'upalis' },
      { id: '3', name: 'Bake House (Mock)', avgRating: 4.5, reviewCount: 210, location: 'Colombo 03', slug: 'bake-house' },
      { id: '4', name: 'The t-Lounge (Mock)', avgRating: 4.7, reviewCount: 180, location: 'Colombo 01', slug: 't-lounge' },
    ];
  }

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Trending Near You (Colombo)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trending.map((place) => (
          <Link href={`/restaurant/${place.slug}`} key={place.id} className="block group">
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 h-full group-hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-1 group-hover:text-amber-600 transition-colors">{place.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{place.location}</p>
              <div className="flex items-center text-sm font-semibold text-gray-700">
                <span className="text-amber-500 mr-1">★</span> {place.avgRating} ({place.reviewCount})
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
