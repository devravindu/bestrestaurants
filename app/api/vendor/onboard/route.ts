import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, location, phone } = body;

    if (!name || !location) {
      return NextResponse.json({ message: "Name and location are required." }, { status: 400 });
    }

    // Find the currently logged-in user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate a URL-friendly slug from the restaurant name
    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const uniqueSlug = `${baseSlug}-${Math.floor(Math.random() * 1000)}`; 

    // Create the restaurant AND update the user's role in one transaction
    const [newRestaurant, updatedUser] = await prisma.$transaction([
      prisma.restaurant.create({
        data: {
          name,
          slug: uniqueSlug,
          description,
          location,
          phone,
          vendorId: user.id,
          status: "PENDING", // Matches your schema default
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { role: "VENDOR" },
      })
    ]);

    return NextResponse.json({ restaurant: newRestaurant, message: "Welcome to the Vendor Dashboard!" }, { status: 201 });
    
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}