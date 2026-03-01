import { NextRequest, NextResponse } from "next/server";
import { getLeads, getLead, updateLeadStatus } from "@/lib/salesforce";
import type { LeadStatus } from "@/lib/salesforce";

export async function GET(request: NextRequest) {
  const leadId = request.nextUrl.searchParams.get("id");

  if (leadId) {
    const lead = await getLead(leadId);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json({ lead });
  }

  const leads = await getLeads();
  return NextResponse.json({ leads });
}

export async function PATCH(request: NextRequest) {
  try {
    const { leadId, status, note } = (await request.json()) as {
      leadId: string;
      status: LeadStatus;
      note?: string;
    };

    if (!leadId || !status) {
      return NextResponse.json(
        { error: "Lead ID and status are required" },
        { status: 400 }
      );
    }

    const lead = await updateLeadStatus(leadId, status, note);
    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
