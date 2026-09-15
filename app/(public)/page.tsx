import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import TaxonomyGrid from "@/components/TaxonomyGrid";
import TrendingGrid from "@/components/TrendingGrid";
import ReviewMarquee from "@/components/ReviewMarquee";
import VendorCTA from "@/components/VendorCTA";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroSearch />
      <FeaturedCarousel />
      <TaxonomyGrid />
      <TrendingGrid />
      <ReviewMarquee />
      <VendorCTA />
      <Footer />
    </main>
  );
}
