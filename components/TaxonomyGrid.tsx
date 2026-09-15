import Link from "next/link";

export default function TaxonomyGrid() {
  const categories = [
    { name: "Authentic Sri Lankan", slug: "authentic-sri-lankan" },
    { name: "Fine Dining", slug: "fine-dining" },
    { name: "Cafes", slug: "cafes" },
    { name: "Romantic Vibes", slug: "romantic-vibes" },
  ];

  return (
    <section className="py-12 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Browse by Vibe & Cuisine</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/explore?category=${cat.slug}`}
              className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition font-medium text-gray-800"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
