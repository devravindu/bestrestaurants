import { withAuth } from "next-auth/middleware";

// Wrap NextAuth's logic and export it strictly as 'proxy'
export const proxy = withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const isProtectedRoute = 
        req.nextUrl.pathname.startsWith("/dashboard") || 
        req.nextUrl.pathname.startsWith("/admin");
      
      if (isProtectedRoute) {
        return !!token; // Require a session for these routes
      }
      return true; // Let them through for public pages like /login or /
    },
  },
});

// We can optimize your matcher to only run this proxy on the routes we care about protecting
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};