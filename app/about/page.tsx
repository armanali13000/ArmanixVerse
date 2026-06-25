import type { Metadata } from "next";
import { CinematicPanel } from "@/components/CinematicPanel";
import { Wordmark } from "@/components/Wordmark";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: "About ArmanixVerse, an independent premium gaming companion platform.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <CinematicPanel eyebrow="About" title="A Premium Companion Universe" body={`Built for scalable game hubs, official-info tracking, editorial systems, affiliate commerce, community features, and AI assistance. ${site.notice}`}>
      <Wordmark className="h-auto w-[360px] max-w-full" />
    </CinematicPanel>
  );
}
