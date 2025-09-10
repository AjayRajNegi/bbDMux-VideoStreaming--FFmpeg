import Cookie from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export type JwtPayload = {
  userEmail: string;
  iat?: number;
  exp?: number;
};

export function parseAuthCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const cookies = Cookie.parse(cookieHeader);
  return cookies.authToken || null;
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
