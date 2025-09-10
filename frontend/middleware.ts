import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseAuthCookie, verifyJwt } from "./utils/jwt";

export async function middleware(request: NextRequest) {
  const token = parseAuthCookie(request.headers.get("cookie"));

  const unprotectedRoutes = ["/login", "/"];
  const isUnprotectedRoute = unprotectedRoutes.includes(
    request.nextUrl.pathname
  );

  const authenticatedRoutes = ["/"];
  const isAuthenticatedRoute = authenticatedRoutes.includes(
    request.nextUrl.pathname
  );

  if (!isUnprotectedRoute && !isAuthenticatedRoute) {
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

  if (isUnprotectedRoute) {
    if (token && verifyJwt(token)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
