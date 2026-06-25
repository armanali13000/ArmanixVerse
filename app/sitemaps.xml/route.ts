import { getSitemapEntries } from "@/lib/sitemap-data";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const urls = getSitemapEntries()
    .map((entry) => {
      const lastmod = entry.lastModified instanceof Date ? entry.lastModified.toISOString() : new Date(entry.lastModified).toISOString();
      return [
        "  <url>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${entry.changeFrequency}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        "  </url>"
      ].join("\n");
    })
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
