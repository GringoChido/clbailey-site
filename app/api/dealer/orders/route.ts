import { NextRequest, NextResponse } from "next/server";
import { getOrders, createOrder } from "@/lib/salesforce";
import type { OrderLineItem } from "@/lib/salesforce";

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  try {
    const { dealerId, lineItems } = (await request.json()) as {
      dealerId: string;
      lineItems: OrderLineItem[];
    };

    if (!dealerId || !lineItems?.length) {
      return NextResponse.json(
        { error: "Dealer ID and line items are required" },
        { status: 400 }
      );
    }

    const order = await createOrder(dealerId, lineItems);
    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
