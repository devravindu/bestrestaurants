import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Await searchParams in Next.js 15+
  const params = await searchParams;
  const q = params.q as string;
  const loc = params.loc as string;
  const category = params.category as string;

  // Build the query where clause
  const whereClause: Prisma.RestaurantWhereInput = { status: 'APPROVED' };

  if (q) {
    whereClause.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
    ];
  }

  if (loc) {
    whereClause.location = { contains: loc, mode: 'insensitive' };
  }

  if (category) {
    // Basic filter for category
    whereClause.taxonomies = {
      some: {
        taxonomy: {
          slug: category
        }
      }
    };
  }

  type RestaurantWithTaxonomies = Prisma.RestaurantGetPayload<{
    include: { taxonomies: { include: { taxonomy: true } } }
  }>;

  // Use try-catch to handle empty database during build
  let restaurants: RestaurantWithTaxonomies[] = [];
  try {
    restaurants = await prisma.restaurant.findMany({
      where: whereClause,
      include: {
        taxonomies: {
          include: {
            taxonomy: true,
          }
        }
      }
    });
  } catch (e) {
    console.error("Database query failed", e);
  }

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Explore Restaurants</h1>

      {(q || loc || category) && (
        <div className="mb-6 text-gray-600">
          Showing results for:
          {q && <span className="font-semibold ml-2">Query: &quot;{q}&quot;</span>}
          {loc && <span className="font-semibold ml-2">Location: &quot;{loc}&quot;</span>}
          {category && <span className="font-semibold ml-2">Category: &quot;{category}&quot;</span>}
        </div>
      )}

      {restaurants.length === 0 ? (
        <p className="text-gray-500">No restaurants found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="h-40 bg-gray-200 w-full">
                {/* Image placeholder */}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{restaurant.location}</p>
                <div className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <span className="text-amber-500 mr-1">★</span> {restaurant.avgRating} ({restaurant.reviewCount})
                </div>
                <a href={`/restaurant/${restaurant.slug}`} className="text-blue-500 text-sm hover:underline">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
