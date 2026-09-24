import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Using your singleton!
import { getServerSession } from "next-auth/next";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    // Added heroImageUrl here
    const { name, description, location, phone, website, category, workingHours, avgPrice, heroImageUrl, id } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { restaurants: true }
    });

    if (!user || user.restaurants[0].id !== id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: id },
      data: {
        name,
        description,
        location,
        phone,
        website,
        category,
        workingHours,
        heroImageUrl, // Saves the Supabase URL to the database
      },
    });

    return NextResponse.json({ restaurant: updatedRestaurant, message: "Profile updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}