import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser();

    if (!supabaseUser?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      name,
      description,
      location,
      phone,
      website,
      category,
      workingHours,
      avgPrice,
      heroImageUrl,
      id,
    } = body;

    const user = await prisma.user.findUnique({
      where: { supabaseUserId: supabaseUser.id },
      include: { restaurants: true },
    });

    if (!user || user.restaurants[0]?.id !== id) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id },
      data: {
        name,
        description,
        location,
        phone,
        website,
        category,
        workingHours,
        heroImageUrl,
      },
    });

    return NextResponse.json(
      {
        restaurant: updatedRestaurant,
        message: "Profile updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile update error:", error);

    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}