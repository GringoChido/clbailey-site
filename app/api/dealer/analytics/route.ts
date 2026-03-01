import { NextResponse } from "next/server";
import { getDealerAnalytics } from "@/lib/salesforce";

export async function GET() {
  const analytics = await getDealerAnalytics();
  return NextResponse.json({ analytics });
}
