import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { CinematicPanel } from "@/components/CinematicPanel";
import { articles } from "@/lib/content";

export const metadata: Metadata = { title: "Gaming Guides", description: "Walkthroughs, trackers, guides, and spoiler-safe companion systems.", alternates: { canonical: "/guides" } };

export default function GuidesPage() {
  return (
    <>
      <CinematicPanel eyebrow="Guides" title="Spoiler-Safe Mastery" body="Guides are built around clarity: confirmed info, completion tools, bookmarks, reading time, related content, and community context." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {articles.filter((article) => article.kind === "guide" || article.kind === "walkthrough").map((article) => <ArticleCard key={article.slug} article={article} />)}
      </section>
    </>
  );
}
