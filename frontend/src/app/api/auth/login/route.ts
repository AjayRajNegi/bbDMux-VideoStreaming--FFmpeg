import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "../../../../../lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await authenticateUser(email, password);

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: result.user,
      },
      { status: 200 }
    );

    response.cookies.set("auth-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof Error) {
      if (error.message === "Invalid credentials") {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
