import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("Supabase User Check:", user?.email);

    if (!user?.id) {
      return NextResponse.json(
        { message: "You must be logged in to leave a review." },
        { status: 401 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { supabaseUserId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { rating, comment, restaurantId } = body;

    if (!rating || !restaurantId) {
      return NextResponse.json(
        { message: "Rating and Restaurant ID are required." },
        { status: 400 }
      );
    }

    // 1. Create the new review in the database
    const newReview = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment: comment || "",
        restaurantId: restaurantId,
        userId: dbUser.id,
      },
    });

    // 2. Calculate the new average rating and total count
    const aggregations = await prisma.review.aggregate({
      where: { restaurantId: restaurantId },
      _avg: { rating: true },
      _count: { id: true },
    });

    const newAvgRating = aggregations._avg.rating || 0;
    const newReviewCount = aggregations._count.id || 0;

    // 3. Update the Restaurant model with the fresh analytics
    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        avgRating: Number(newAvgRating.toFixed(1)),
        reviewCount: newReviewCount,
      },
    });

    return NextResponse.json(
      {
        review: newReview,
        message: "Review submitted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Review submission error:", error);

    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}