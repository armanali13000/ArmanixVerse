import type { Metadata } from "next";
import { CinematicPanel } from "@/components/CinematicPanel";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: "About ArmanixVerse, an independent premium gaming companion platform.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <CinematicPanel eyebrow="About" title="A Premium Companion Universe" body={`${site.name} is built for scalable game hubs, official-info tracking, editorial systems, affiliate commerce, community features, and AI assistance. ${site.notice}`} />;
}
