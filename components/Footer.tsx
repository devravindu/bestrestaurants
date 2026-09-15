"use client";

export default function Footer() {
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("Subscribing:", email);
    // API call to /api/newsletter/subscribe
  };

  return (
    <footer className="bg-gray-800 text-white p-8 mt-12">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-2">BestRestaurant.lk</h2>
          <p className="text-sm text-gray-400">Discover the best places to eat.</p>
        </div>
        <form onSubmit={handleSubscribe} className="mt-4 md:mt-0 flex">
          <input
            type="email"
            name="email"
            placeholder="Subscribe to newsletter"
            required
            className="p-2 rounded-l text-black focus:outline-none"
          />
          <button type="submit" className="bg-amber-500 px-4 py-2 rounded-r hover:bg-amber-600">
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
}
