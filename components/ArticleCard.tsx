import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group gradient-border block rounded-lg">
      <article className="glass h-full rounded-lg p-5 transition duration-300 group-hover:-translate-y-1">
        <div className="mb-5 flex h-36 items-end rounded-md border border-white/10 bg-[radial-gradient(circle_at_25%_20%,rgba(139,92,246,.45),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(251,146,60,.34),transparent_32%),linear-gradient(135deg,#11131a,#050508)] p-4">
          <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-ion">{article.kind}</span>
        </div>
        <h3 className="text-lg font-bold leading-tight text-white">{article.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/62">{article.dek}</p>
        <div className="mt-5 flex flex-wrap gap-3 text-xs text-white/50">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {article.readingMinutes} min</span>
          <span className="flex items-center gap-1"><Tag className="h-3.5 w-3.5" /> {article.tags[0]}</span>
        </div>
      </article>
    </Link>
  );
}
