import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser();

    if (!supabaseUser?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, location, phone } = body;

    if (!name || !location) {
      return NextResponse.json(
        { message: "Name and location are required." },
        { status: 400 }
      );
    }

    // Find the currently logged-in Prisma user through Supabase UID
    const user = await prisma.user.findUnique({
      where: { supabaseUserId: supabaseUser.id },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Generate a URL-friendly slug from the restaurant name
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

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
          status: "PENDING",
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { role: "VENDOR" },
      }),
    ]);

    return NextResponse.json(
      {
        restaurant: newRestaurant,
        message: "Welcome to the Vendor Dashboard!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Onboarding error:", error);

    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}