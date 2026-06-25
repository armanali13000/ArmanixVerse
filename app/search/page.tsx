import type { Metadata } from "next";
import { SearchClient } from "@/components/SearchClient";
import { articles, games, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search ArmanixVerse games, articles, news, guides, and walkthroughs.",
  alternates: { canonical: "/search" }
};

export default function SearchPage() {
  return <SearchClient articles={articles} games={games} products={products} />;
}
