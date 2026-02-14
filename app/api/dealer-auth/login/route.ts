import { NextRequest, NextResponse } from "next/server";

const DEALER_PASSWORD = process.env.DEALER_PORTAL_PASSWORD || "clbailey2026";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (password !== DEALER_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password. Please contact C.L. Bailey for dealer access." },
        { status: 401 }
      );
    }

    // Set auth cookie — expires in 30 days
    const response = NextResponse.json({ success: true });
    response.cookies.set("dealer-auth", "authorized", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
