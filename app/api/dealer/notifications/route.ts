import { NextRequest, NextResponse } from "next/server";
import { getNotifications, markNotificationRead } from "@/lib/salesforce";

export async function GET() {
  const notifications = await getNotifications();
  return NextResponse.json({ notifications });
}

export async function PATCH(request: NextRequest) {
  try {
    const { notificationId } = (await request.json()) as {
      notificationId: string;
    };

    if (!notificationId) {
      return NextResponse.json(
        { error: "Notification ID is required" },
        { status: 400 }
      );
    }

    await markNotificationRead(notificationId);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
