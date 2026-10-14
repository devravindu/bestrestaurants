import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import TaxonomyGrid from "@/components/TaxonomyGrid";
import TrendingGrid from "@/components/TrendingGrid";
import ReviewMarquee from "@/components/ReviewMarquee";
import VendorCTA from "@/components/VendorCTA";
import prisma from "@/lib/prisma";
import RestaurantDiscovery from "@/components/RestaurantDiscovery";


const restaurants = await prisma.restaurant.findMany({
  where: { status: "APPROVED" },
  select: {
    id: true,
    name: true,
    slug: true,
    location: true,
    category: true,
    heroImageUrl: true,
    logoUrl: true,
    avgRating: true,
    reviewCount: true,
    isFeatured: true,
    lat: true,
    lng: true,
    reviews: {
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      select: { id: true },
    },
  },
  orderBy: { name: "asc" },
});

const discoveryRestaurants = restaurants.map((restaurant) => ({
  ...restaurant,
  recentReviewCount: restaurant.reviews.length,
  reviews: undefined,
}));

const areas = Array.from(
  new Set(
    restaurants
      .map((restaurant) => restaurant.location.split(",")[0]?.trim())
      .filter((area): area is string => Boolean(area))
  )
).sort((a, b) => a.localeCompare(b));


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroSearch />
      <FeaturedCarousel />
      <TaxonomyGrid />
      <RestaurantDiscovery
        restaurants={discoveryRestaurants}
        areas={areas.length > 0 ? areas : ["Colombo", "Mount Lavinia", "Dehiwala"]}
      />
      <ReviewMarquee />
      <VendorCTA />
      <Footer />
    </main>
  );
}
