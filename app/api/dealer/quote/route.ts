import { NextRequest, NextResponse } from "next/server";
import { getConfigOptions, getProductConfig } from "@/lib/salesforce";

export async function GET(request: NextRequest) {
  const productSlug = request.nextUrl.searchParams.get("product");

  if (productSlug) {
    const config = await getProductConfig(productSlug);
    if (!config) {
      return NextResponse.json(
        { error: "Product configuration not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ config });
  }

  const configs = await getConfigOptions();
  return NextResponse.json({ configs });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { configurations, customerName } = body as {
      configurations: unknown[];
      customerName: string;
    };

    if (!configurations?.length || !customerName) {
      return NextResponse.json(
        { error: "Configurations and customer name are required" },
        { status: 400 }
      );
    }

    // Mock: generate a quote reference number
    const quoteNumber = `CLB-Q-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json(
      {
        quoteNumber,
        message: "Quote generated successfully",
        ...body,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
