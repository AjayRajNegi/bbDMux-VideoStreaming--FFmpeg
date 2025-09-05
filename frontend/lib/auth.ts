import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthResponse {
  user: UserPayload;
  token: string;
}

// Generate JWT token
export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch {
    return null;
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Create user
export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}): Promise<AuthResponse> {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "user",
    },
  });

  const userPayload: UserPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role || undefined,
  };

  const token = generateToken(userPayload);

  return {
    user: userPayload,
    token,
  };
}

// Authenticate user
export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const userPayload: UserPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role || undefined,
  };

  const token = generateToken(userPayload);

  return {
    user: userPayload,
    token,
  };
}
