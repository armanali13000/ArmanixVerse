"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

export function BookmarkButton({ slug, title }: { slug: string; title: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(window.localStorage.getItem("av-bookmarks") ?? "[]") as string[];
    setSaved(bookmarks.includes(slug));
  }, [slug]);

  function toggle() {
    const bookmarks = JSON.parse(window.localStorage.getItem("av-bookmarks") ?? "[]") as string[];
    const next = bookmarks.includes(slug) ? bookmarks.filter((item) => item !== slug) : [...bookmarks, slug];
    window.localStorage.setItem("av-bookmarks", JSON.stringify(next));
    setSaved(next.includes(slug));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
      aria-label={`Bookmark ${title}`}
    >
      <Bookmark className={`h-4 w-4 ${saved ? "fill-ember text-ember" : ""}`} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
