import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const user = verifyToken(token);
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", user.id);
    requestHeaders.set("x-user-email", user.email);
    requestHeaders.set("x-user-name", user.name);
    if (user.role) {
      requestHeaders.set("x-user-role", user.role);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (isAuthRoute && token) {
    const user = verifyToken(token);
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
