import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check whether a Prisma user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const supabase = await createClient();

    // Create the authentication account in Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      console.error("Supabase signup error:", error);

      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { message: "Unable to create account." },
        { status: 500 }
      );
    }

    // Create the application user in Prisma and link it to Supabase Auth
    const newUser = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        supabaseUserId: user.id,
      },
    });

    return NextResponse.json(
      {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        message:
          "Account created successfully. Please check your email to confirm your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}