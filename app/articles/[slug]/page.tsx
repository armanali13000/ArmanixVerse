import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ArticleCard } from "@/components/ArticleCard";
import { articles, getArticle, site } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

type ArticlePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.dek,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = articles.filter((item) => item.slug !== article.slug && item.gameSlug === article.gameSlug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: site.name }
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-ember">{article.kind} • {article.readingMinutes} min read</p>
        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">{article.title}</h1>
        <p className="mt-5 text-lg leading-8 text-white/68">{article.dek}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-white/55">
          <span>{article.author}</span>
          <span>{new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(article.publishedAt))}</span>
          <BookmarkButton slug={article.slug} title={article.title} />
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 h-72 rounded-lg border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,.44),transparent_30%),radial-gradient(circle_at_82%_40%,rgba(251,146,60,.28),transparent_28%),linear-gradient(135deg,#181b25,#050508)]" />
        <div className="glass rounded-lg p-6 sm:p-8">
          <div className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-pulse via-ion to-ember" />
          {article.body.map((paragraph) => (
            <p key={paragraph} className="mb-6 text-lg leading-8 text-white/75">{paragraph}</p>
          ))}
          <div className="mt-8 rounded-md border border-ember/20 bg-ember/10 p-4 text-sm text-white/75">
            Affiliate disclosure: ArmanixVerse may earn from qualifying accessory links. Recommendations are editorially independent.
          </div>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-black">Related Coverage</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => <ArticleCard key={item.slug} article={item} />)}
        </div>
      </section>
    </article>
  );
}
