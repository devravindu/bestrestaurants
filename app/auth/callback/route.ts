import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/";

  // Prevent external redirect URLs
  const safeNext = next.startsWith("/") ? next : "/";

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const email = user.email?.trim().toLowerCase();

        if (email) {
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (existingUser) {
            // Link existing Prisma user to Supabase
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                supabaseUserId: user.id,
                name: existingUser.name || user.user_metadata?.name || null,
                image: existingUser.image || user.user_metadata?.avatar_url || null,
              },
            });
          } else {
            // Create a new Prisma user for the Google account
            await prisma.user.create({
              data: {
                email,
                name: user.user_metadata?.name || null,
                image: user.user_metadata?.avatar_url || null,
                supabaseUserId: user.id,
              },
            });
          }
        }

        return NextResponse.redirect(`${origin}${safeNext}`);
      }
    }
  }

  return NextResponse.redirect(
    `${origin}/login?error=auth_callback_failed`
  );
}