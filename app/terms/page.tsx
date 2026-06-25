import type { Metadata } from "next";
import { CinematicPanel } from "@/components/CinematicPanel";

export const metadata: Metadata = { title: "Terms", description: "ArmanixVerse terms of use.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <CinematicPanel eyebrow="Terms" title="Platform Terms" body="Use ArmanixVerse responsibly. Content is provided for independent companion, editorial, community, and affiliate discovery purposes." />;
}
