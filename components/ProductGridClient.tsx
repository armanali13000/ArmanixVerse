"use client";

import { useEffect, useMemo, useState } from "react";
import { listRecords } from "@/lib/db";
import { productCategories, products } from "@/lib/content";
import { ProductCard } from "@/components/ProductCard";
import type { Product, ProductCategory } from "@/lib/types";

export function ProductGridClient({ mode = "all", category }: { mode?: "all" | "featured" | "trending"; category?: string }) {
  const [rows, setRows] = useState<Product[]>(products);
  const [categories, setCategories] = useState<ProductCategory[]>(productCategories);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(category ?? "all");
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError("");
      try {
        const [nextProducts, nextCategories] = await Promise.all([
          listRecords<Product>("products", products),
          listRecords<ProductCategory>("productCategories", productCategories)
        ]);
        setRows(
          nextProducts.filter((item) => {
            const active = item.active !== false;
            const visibleStatus = !item.status || item.status === "published" || item.status === "draft";
            return active && visibleStatus;
          })
        );
        setCategories(nextCategories.filter((item) => item.active !== false));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Products failed to load.");
      } finally {
        setLoading(false);
      }
    }
    void loadProducts();
  }, []);

  const filtered = useMemo(() => {
    let next = rows.filter((item) => {
      if (mode === "featured" && !item.featured) return false;
      if (mode === "trending" && !item.trending) return false;
      if (selected !== "all" && item.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") !== selected) return false;
      return `${item.title} ${item.category} ${item.brand}`.toLowerCase().includes(query.toLowerCase());
    });
    if (mode === "featured" && next.length === 0) {
      next = rows.filter((item) => `${item.title} ${item.category} ${item.brand}`.toLowerCase().includes(query.toLowerCase()));
    }
    if (sort === "rating") next = next.sort((a, b) => b.rating - a.rating);
    if (sort === "price") next = next.sort((a, b) => Number(a.price.replace(/[^0-9.]/g, "")) - Number(b.price.replace(/[^0-9.]/g, "")));
    if (sort === "latest") next = next.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return next;
  }, [mode, query, rows, selected, sort]);

  return (
    <div>
      {mode === "all" ? (
        <div className="mb-8 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search accessories" className="rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
          <select value={selected} onChange={(event) => setSelected(event.target.value)} className="rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none">
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
          </select>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none">
            <option value="latest">Latest</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </div>
      ) : null}
      {mode === "all" ? <p className="mb-4 text-sm text-white/55">{loading ? "Loading store products..." : `${filtered.length} product${filtered.length === 1 ? "" : "s"} in store`}</p> : null}
      {error ? <p className="mb-4 rounded-md border border-ember/20 bg-ember/10 p-3 text-sm text-ember">{error}</p> : null}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id ?? product.slug} product={product} />)}</div>
      {!filtered.length ? <p className="text-white/60">No active products match this view.</p> : null}
    </div>
  );
}
