import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { CinematicPanel } from "@/components/CinematicPanel";
import { articles } from "@/lib/content";

export const metadata: Metadata = { title: "Gaming News", description: "Premium gaming news and official-info tracking.", alternates: { canonical: "/news" } };

export default function NewsPage() {
  return (
    <>
      <CinematicPanel eyebrow="Newswire" title="Gaming News With Signal" body="Official details, platform updates, community movement, and spoiler-safe coverage for major releases." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {articles.filter((article) => article.kind === "news" || article.kind === "guide").map((article) => <ArticleCard key={article.slug} article={article} />)}
      </section>
    </>
  );
}
