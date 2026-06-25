import type { Metadata } from "next";
import { AdminConsole } from "@/components/AdminConsole";
import { AdminGuard } from "@/components/AdminGuard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Protected ArmanixVerse admin dashboard for products, categories, trailers, homepage content, media, SEO, users, and settings.",
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminConsole />
    </AdminGuard>
  );
}
