import { NextRequest, NextResponse } from "next/server";
import {
  getWarrantyRegistrations,
  getWarrantyClaims,
  getWarrantyClaim,
} from "@/lib/salesforce";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  const claimId = request.nextUrl.searchParams.get("claimId");

  if (claimId) {
    const claim = await getWarrantyClaim(claimId);
    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }
    return NextResponse.json({ claim });
  }

  if (type === "registrations") {
    const registrations = await getWarrantyRegistrations();
    return NextResponse.json({ registrations });
  }

  const [claims, registrations] = await Promise.all([
    getWarrantyClaims(),
    getWarrantyRegistrations(),
  ]);

  return NextResponse.json({ claims, registrations });
}
