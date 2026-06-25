import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { CinematicPanel } from "@/components/CinematicPanel";
import { articles } from "@/lib/content";

export const metadata: Metadata = { title: "Blog", description: "Markdown-ready ArmanixVerse blog with tags, categories, SEO, search, and related articles.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  return (
    <>
      <CinematicPanel eyebrow="Blog" title="Editorial CMS Ready" body="Markdown support, rich editor fields, categories, tags, SEO fields, related articles, lazy loading, and future infinite scroll." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</section>
    </>
  );
}
