import { NextRequest, NextResponse } from "next/server";
import { getInventory, getProductAvailability } from "@/lib/salesforce";

export async function GET(request: NextRequest) {
  const productSlug = request.nextUrl.searchParams.get("product");

  if (productSlug) {
    const availability = await getProductAvailability(productSlug);
    return NextResponse.json({ inventory: availability });
  }

  const inventory = await getInventory();
  return NextResponse.json({ inventory });
}
