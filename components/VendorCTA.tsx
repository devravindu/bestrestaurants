import Link from "next/link";

export default function VendorCTA() {
  return (
    <section className="w-full bg-amber-500 text-gray-900 py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Are you a Restaurant Owner?</h2>
      <p className="text-lg mb-8">
        Join our platform to manage your listing, connect with customers, and grow your business.
      </p>
      <Link
        href="/onboarding"
        className="bg-gray-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
      >
        Get Started Now
      </Link>
    </section>
  );
}
