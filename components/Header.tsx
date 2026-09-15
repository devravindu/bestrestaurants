"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link href="/" className="text-xl font-bold">
        BestRestaurant.lk
      </Link>
      <nav className="space-x-4">
        {session ? (
          <Link href="/dashboard" className="text-blue-500 hover:underline">
            Go to Dashboard
          </Link>
        ) : (
          <Link href="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        )}
        <Link
          href="/register?type=vendor"
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
        >
          + Add a Restaurant
        </Link>
      </nav>
    </header>
  );
}
