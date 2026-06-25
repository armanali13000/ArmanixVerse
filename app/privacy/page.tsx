import type { Metadata } from "next";
import { CinematicPanel } from "@/components/CinematicPanel";

export const metadata: Metadata = { title: "Privacy Policy", description: "ArmanixVerse privacy policy.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <CinematicPanel eyebrow="Privacy" title="Privacy By Design" body="ArmanixVerse is structured for account data, bookmarks, progress sync, newsletter preferences, and analytics with clear consent controls and production Firebase rules." />;
}
