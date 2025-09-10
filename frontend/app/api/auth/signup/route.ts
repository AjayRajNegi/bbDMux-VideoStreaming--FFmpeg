import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
  }

  const response = NextResponse.redirect(new URL("/login", req.url));
  return response;
}
