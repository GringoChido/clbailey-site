import { NextRequest, NextResponse } from "next/server";
import { dealerInquirySchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ interval: 60 * 1000, limit: 5 });

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { success } = limiter.check(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const result = dealerInquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const data = result.data;

    console.log("[Dealer Inquiry]", {
      dealer: data.dealerName,
      customer: data.customerEmail.replace(/(.{2}).*(@.*)/, "$1***$2"),
    });

    return NextResponse.json({ success: true, message: "Inquiry sent" });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
