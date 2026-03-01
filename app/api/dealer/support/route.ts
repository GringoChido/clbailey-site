import { NextRequest, NextResponse } from "next/server";
import { getSupportTickets, getSupportTicket } from "@/lib/salesforce";

export async function GET(request: NextRequest) {
  const ticketId = request.nextUrl.searchParams.get("id");

  if (ticketId) {
    const ticket = await getSupportTicket(ticketId);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    return NextResponse.json({ ticket });
  }

  const tickets = await getSupportTickets();
  return NextResponse.json({ tickets });
}
