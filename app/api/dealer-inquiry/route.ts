import { NextResponse } from "next/server";

// TODO: Wire to Salesforce API
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { dealerName, customerName, customerEmail } = body;

    if (!dealerName || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields: dealerName, customerName, customerEmail" },
        { status: 400 }
      );
    }

    // Log the inquiry for now
    console.log("[Dealer Inquiry]", JSON.stringify(body, null, 2));

    // TODO: Wire to Salesforce API to create a Lead
    // TODO: Send confirmation email via Resend

    return NextResponse.json({ success: true, message: "Inquiry sent" });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
