"use client";

import { useEffect, useState } from "react";
import { listRecords } from "@/lib/db";
import { site, trailers } from "@/lib/content";
import type { TrailerEmbed } from "@/lib/types";

export function TrailerSectionClient() {
  const [rows, setRows] = useState<TrailerEmbed[]>(trailers);

  useEffect(() => {
    void listRecords<TrailerEmbed>("trailers", trailers).then((items) => setRows(items.filter((item) => item.status === "published")));
  }, []);

  const trailer = rows.find((item) => item.featured) ?? rows[0];
  if (!trailer) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="glass aspect-video overflow-hidden rounded-lg">
          <iframe
            className="h-full w-full"
            src={trailer.embedUrl}
            title={trailer.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="glass rounded-lg p-6">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-ember">Official Trailer Embed</p>
          <h2 className="mt-4 text-3xl font-black">{trailer.title}</h2>
          <p className="mt-4 text-sm leading-6 text-white/62">{trailer.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={trailer.watchUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-5 py-3 font-bold text-black">Watch on Official Channel</a>
            <a href={site.officialGtaUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ember/30 bg-ember/10 px-5 py-3 font-bold text-ember">Visit Official GTA VI Website</a>
          </div>
        </div>
      </div>
    </section>
  );
}
