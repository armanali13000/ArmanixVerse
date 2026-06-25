import type { MetadataRoute } from "next";
import { articles, games, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...["search", "login", "games", "news", "guides", "vehicles", "weapons", "maps", "accessories", "community", "ai-assistant", "blog", "about", "contact", "privacy", "terms", "disclaimer"].map((path) => ({
      url: `${site.url}/${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "accessories" || path === "games" ? 0.85 : 0.7
    })),
    ...games.map((game) => ({
      url: `${site.url}/games/${game.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.95
    })),
    ...articles.map((article) => ({
      url: `${site.url}/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
