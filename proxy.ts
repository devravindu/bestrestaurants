// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Rename the exported function to 'proxy'
export function proxy(request: NextRequest) {
  return NextResponse.next();
}

// 2. Keep your existing matcher config if present
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};