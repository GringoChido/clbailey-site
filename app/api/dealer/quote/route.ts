import { NextRequest, NextResponse } from "next/server";
import { getConfigOptions, getProductConfig } from "@/lib/salesforce";
import { quoteSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const productSlug = request.nextUrl.searchParams.get("product");

  if (productSlug) {
    if (!/^[a-z0-9-]+$/.test(productSlug) || productSlug.length > 100) {
      return NextResponse.json(
        { error: "Invalid product identifier" },
        { status: 400 }
      );
    }

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
    const result = quoteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { configurations, customerName } = result.data;

    const quoteNumber = `CLB-Q-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json(
      {
        quoteNumber,
        message: "Quote generated successfully",
        configurations,
        customerName,
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
