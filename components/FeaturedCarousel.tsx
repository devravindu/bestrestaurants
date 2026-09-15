import { PrismaClient, Restaurant } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function FeaturedCarousel() {
  let featured: Partial<Restaurant>[] = [];
  try {
    featured = await prisma.restaurant.findMany({
      where: {
        status: 'APPROVED',
        isFeatured: true,
      },
      take: 5,
    });
  } catch (e) {
    console.error("Failed to fetch featured restaurants", e);
  }

  // Fallback for empty database during initial dev
  if (featured.length === 0) {
    featured = [
      { id: '1', name: 'The Ministry of Crab (Mock)', slug: 'ministry-of-crab' },
      { id: '2', name: 'Nuga Gama (Mock)', slug: 'nuga-gama' },
      { id: '3', name: 'Gallery Cafe (Mock)', slug: 'gallery-cafe' },
    ];
  }

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Featured Restaurants</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {featured.map((restaurant) => (
          <div key={restaurant.id} className="min-w-[250px] bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-32">
            <h3 className="font-semibold text-lg line-clamp-2">{restaurant.name}</h3>
            <Link href={`/restaurant/${restaurant.slug}`} className="text-blue-500 text-sm hover:underline mt-2 inline-block">
              View details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
