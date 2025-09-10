import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseAuthCookie, verifyJwt } from "./utils/jwt";

export async function middleware(request: NextRequest) {
  const token = parseAuthCookie(request.headers.get("cookie"));

  const protectedRoutes = ["/upload", "/watch", "/profile"];
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const payload = verifyJwt(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }

  const unprotectedRoutes = ["/login"];
  if (unprotectedRoutes.includes(request.nextUrl.pathname)) {
    if (token) {
      const payload = await verifyJwt(token);
      if (payload) {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
