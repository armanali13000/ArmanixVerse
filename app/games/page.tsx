import type { Metadata } from "next";
import Link from "next/link";
import { CinematicPanel } from "@/components/CinematicPanel";
import { Wordmark } from "@/components/Wordmark";
import { games } from "@/lib/content";

export const metadata: Metadata = { title: "Games", description: "Expandable ArmanixVerse game ecosystems.", alternates: { canonical: "/games" } };

export default function GamesPage() {
  return (
    <CinematicPanel eyebrow="Games" title="Every Game Becomes A Universe" body="This platform is structured to add future game hubs with guides, maps, databases, communities, and AI assistance.">
      <Wordmark className="mb-6 h-auto w-[280px] max-w-full" />
      <div className="grid gap-4">
        {games.map((game) => (
          <Link key={game.slug} href={`/games/${game.slug}`} className="glass rounded-lg p-5 transition hover:-translate-y-1">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-ion">Live Ecosystem</p>
            <h2 className="mt-3 text-3xl font-black">{game.shortTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-white/62">{game.overview}</p>
          </Link>
        ))}
      </div>
    </CinematicPanel>
  );
}
