import type { Metadata } from "next";
import { AccountClient } from "@/components/AccountClient";

export const metadata: Metadata = {
  title: "Account",
  description: "ArmanixVerse profile, bookmarks, progress sync, achievements, notifications, and preferences.",
  alternates: { canonical: "/account" }
};

export default function AccountPage() {
  return <AccountClient />;
}
