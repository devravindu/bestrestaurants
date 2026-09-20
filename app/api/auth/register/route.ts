import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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

    // 1. Check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists." }, 
        { status: 409 }
      );
    }

    // 2. Securely hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Save the new user to the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    // Strip the password hash from the response for security
    const { passwordHash: _, ...safeUser } = newUser;

    return NextResponse.json(
      { user: safeUser, message: "Account created successfully." }, 
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