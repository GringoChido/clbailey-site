import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

const loginLimiter = rateLimit({ interval: 15 * 60 * 1000, limit: 5 });

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const { success } = loginLimiter.check(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again in 15 minutes." },
      { status: 429 }
    );
  }

  const DEALER_PASSWORD = process.env.DEALER_PORTAL_PASSWORD;
  if (!DEALER_PASSWORD) {
    console.error("[AUTH] DEALER_PORTAL_PASSWORD environment variable is not set");
    return NextResponse.json(
      { error: "Authentication service unavailable" },
      { status: 503 }
    );
  }

  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (password.length > 128) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    if (password !== DEALER_PASSWORD) {
      console.warn(`[AUTH] Failed dealer login attempt from ${ip}`);
      return NextResponse.json(
        { error: "Invalid password. Please contact C.L. Bailey for dealer access." },
        { status: 401 }
      );
    }

    console.log(`[AUTH] Successful dealer login from ${ip}`);

    const response = NextResponse.json({ success: true });
    response.cookies.set("dealer-auth", "authorized", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days (reduced from 30)
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
