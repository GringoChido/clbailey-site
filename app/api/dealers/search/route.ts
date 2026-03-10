import { NextRequest, NextResponse } from "next/server";
import { geocodeZip, findNearestDealers } from "@/lib/dealers";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ interval: 60 * 1000, limit: 15 });

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { success } = limiter.check(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");
  const limitParam = searchParams.get("limit") || "5";
  const limit = Math.min(Math.max(parseInt(limitParam, 10) || 5, 1), 20);

  if (!zip || !/^\d{5}$/.test(zip.trim())) {
    return NextResponse.json(
      { error: "Valid 5-digit ZIP code required" },
      { status: 400 }
    );
  }

  const coords = await geocodeZip(zip);
  if (!coords) {
    return NextResponse.json(
      { error: "Could not locate ZIP code. Please verify and try again." },
      { status: 404 }
    );
  }

  const results = findNearestDealers(coords.lat, coords.lng, limit);

  return NextResponse.json({
    zip,
    results,
  });
}
