"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Article, Game, Product } from "@/lib/types";

export function SearchClient({ articles, games, products }: { articles: Article[]; games: Game[]; products: Product[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];
    const gameResults = games
      .filter((game) => `${game.title} ${game.overview}`.toLowerCase().includes(value))
      .map((game) => ({ href: `/games/${game.slug}`, title: game.title, type: "Game", dek: game.overview }));
    const articleResults = articles
      .filter((article) => `${article.title} ${article.dek} ${article.tags.join(" ")}`.toLowerCase().includes(value))
      .map((article) => ({ href: `/articles/${article.slug}`, title: article.title, type: article.kind, dek: article.dek }));
    const productResults = products
      .filter((product) => `${product.title} ${product.category} ${product.description}`.toLowerCase().includes(value))
      .map((product) => ({ href: "/accessories", title: product.title, type: "Accessory", dek: product.description }));
    return [...gameResults, ...articleResults, ...productResults];
  }, [articles, games, products, query]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-ember">Global Search</p>
      <h1 className="mt-4 text-4xl font-black">Instant Suggestions</h1>
      <div className="glass mt-8 flex items-center gap-3 rounded-lg p-4">
        <Search className="h-5 w-5 text-white/45" />
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-lg outline-none"
          placeholder="Search games, news, guides, accessories..."
        />
      </div>
      <div className="mt-6 space-y-3">
        {(query ? results : []).map((result) => (
          <Link key={result.href} href={result.href} className="glass block rounded-lg p-5 transition hover:-translate-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-ion">{result.type}</span>
            <h2 className="mt-2 text-xl font-bold">{result.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">{result.dek}</p>
          </Link>
        ))}
        {query && results.length === 0 ? <p className="text-white/55">No matches yet. Try “vehicle”, “weapon”, “GTA”, or “launch”.</p> : null}
      </div>
    </div>
  );
}
