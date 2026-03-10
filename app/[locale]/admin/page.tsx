import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Panel | C.L. Bailey & Co.",
  description: "Internal administration panel for C.L. Bailey & Co. operations.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
