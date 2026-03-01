import { NextResponse } from "next/server";
import { getDealerProfile, getNotifications, getAnnouncements } from "@/lib/salesforce";

export async function GET() {
  const [profile, notifications, announcements] = await Promise.all([
    getDealerProfile(),
    getNotifications(),
    getAnnouncements(),
  ]);

  return NextResponse.json({ profile, notifications, announcements });
}
