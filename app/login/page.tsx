import type { Metadata } from "next";
import { AccountClient } from "@/components/AccountClient";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to ArmanixVerse to save guides, products, progress, and preferences.",
  alternates: { canonical: "/login" }
};

export default function LoginPage() {
  return <AccountClient />;
}
