"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/explore?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(location)}`);
  };

  return (
    <section className="relative h-[60vh] flex items-center justify-center">
      {/* Background Image (placeholder for high-quality dark-overlay) */}
      <div className="absolute inset-0 bg-gray-900 z-0">
         {/* <Image src="/hero.jpg" alt="Hero" fill priority className="object-cover opacity-50" /> */}
      </div>

      <div className="relative z-10 text-center w-full max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Find Your Next Great Meal
        </h1>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Restaurant, cuisine, or vibe"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 rounded shadow focus:outline-none"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 p-3 rounded shadow focus:outline-none"
          />
          <button type="submit" className="bg-amber-500 text-white p-3 rounded font-bold hover:bg-amber-600 shadow">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
