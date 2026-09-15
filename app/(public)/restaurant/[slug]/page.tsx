import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function RestaurantPage({ params }: { params: { slug: string } }) {
  // Await the params object in Next.js 15+
  const { slug } = await params;

  // For testing when the database is empty, we can mock the data if not found
  let restaurant = await prisma.restaurant.findUnique({
    where: { slug: slug },
  });

  if (!restaurant) {
    // Mock data for display purposes
    restaurant = {
      id: 'mock-id',
      vendorId: 'vendor-id',
      name: 'Mock Restaurant',
      slug: slug,
      description: 'A mock restaurant description',
      location: 'Colombo',
      lat: null,
      lng: null,
      brandPrimaryColor: '#0ea5e9', // Sky blue
      brandSecondaryColor: '#0284c7',
      logoUrl: null,
      heroImageUrl: null,
      status: 'APPROVED',
      isFeatured: true,
      avgRating: 4.5,
      reviewCount: 120,
    };
  }

  return (
    <div
      className="restaurant-wrapper min-h-screen flex flex-col items-center justify-center p-8"
      style={
        {
          '--brand-primary': restaurant.brandPrimaryColor || '#f59e0b', // fallback amber-500
          '--brand-secondary': restaurant.brandSecondaryColor || '#d97706',
        } as React.CSSProperties
      }
    >
      <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--brand-primary)' }}>
        {restaurant.name}
      </h1>
      <p className="text-lg text-gray-700 mb-8">{restaurant.description}</p>

      {/*
        We use an inline style here for demonstration, but typically we would map these
        CSS variables in tailwind.config.js as well.
      */}
      <button
        className="px-6 py-3 text-white rounded-md font-semibold hover:opacity-90 transition-opacity"
        style={{ backgroundColor: 'var(--brand-primary)' }}
      >
        Book a Table
      </button>
    </div>
  );
}
