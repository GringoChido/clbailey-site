import { NextRequest, NextResponse } from "next/server";
import { geocodeZip, findNearestDealers } from "@/lib/dealers";

/*
  GET /api/dealers/search?zip=77377&limit=5
  Returns nearest dealers sorted by distance.
*/

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");
  const limit = parseInt(searchParams.get("limit") || "5", 10);

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
