import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export function parseAuthCookie(cookie: string | null): string | null {
  if (!cookie) {
    return null;
  }
  const token = cookie
    .split(";")
    .find((c) => c.trim().startsWith("authToken="));
  return token ? token.split("=")[1] : null;
}

export async function signJwt(userEmail: string): Promise<string> {
  const token = await new SignJWT({ userEmail })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secret);
  return token;
}

export async function verifyJwt(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
