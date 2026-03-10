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

  const ADMIN_PASSWORD = process.env.ADMIN_PORTAL_PASSWORD;
  if (!ADMIN_PASSWORD) {
    console.error("[AUTH] ADMIN_PORTAL_PASSWORD environment variable is not set");
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
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      console.warn(`[AUTH] Failed admin login attempt from ${ip}`);
      return NextResponse.json(
        { error: "Invalid credentials. Administrative access only." },
        { status: 401 }
      );
    }

    console.log(`[AUTH] Successful admin login from ${ip}`);

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-auth", "authorized", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1, // 1 day (reduced from 7)
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
