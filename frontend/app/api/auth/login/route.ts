import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "asdfsd";
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN) || 499234;

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(email, password);

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      name: true,
      password: true,
      email: true,
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: "User does not exists." },
      { status: 401 }
    );
  }

  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword) {
    return NextResponse.json({ error: "Incorrect Password" }, { status: 401 });
  }

  const token = jwt.sign({ userEmail: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const response = NextResponse.json({ message: "Login successfull" });
  response.cookies.set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: JWT_EXPIRES_IN,
  });
  console.log(response);
  return response;
}
