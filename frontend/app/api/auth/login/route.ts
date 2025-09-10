import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signJwt } from "@/utils/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

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

  if (!user.password || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Incorrect Password" }, { status: 401 });
  }

  const token = await signJwt(user.email);

  const response = NextResponse.json({ message: "Login successfull" });
  response.cookies.set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: Number(process.env.JWT_EXPIRES_IN),
  });

  return response;
}
