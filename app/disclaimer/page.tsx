import type { Metadata } from "next";
import { CinematicPanel } from "@/components/CinematicPanel";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Disclaimer", description: "ArmanixVerse independence and affiliate disclaimer.", alternates: { canonical: "/disclaimer" } };

export default function DisclaimerPage() {
  return <CinematicPanel eyebrow="Disclaimer" title="Independent. Original. Unaffiliated." body={`${site.notice} ArmanixVerse does not use Rockstar logos, screenshots, artwork, or proprietary UI. Affiliate links may generate commission without changing editorial independence.`} />;
}
