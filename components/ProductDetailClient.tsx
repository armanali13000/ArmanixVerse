"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { listRecords } from "@/lib/db";
import { products } from "@/lib/content";
import type { Product } from "@/lib/types";

export function ProductDetailClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    void listRecords<Product>("products", products).then((rows) => setProduct(rows.find((item) => item.slug === slug && item.active)));
  }, [slug]);

  if (product === undefined) return <div className="mx-auto max-w-5xl px-4 py-20 text-white/60">Loading product...</div>;
  if (!product) return <div className="mx-auto max-w-5xl px-4 py-20 text-white/60">Product not found or inactive.</div>;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    brand: product.brand,
    description: product.seoDescription || product.description,
    offers: { "@type": "Offer", price: product.price.replace(/[^0-9.]/g, ""), availability: "https://schema.org/InStock" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: 1 }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <p className="text-xs font-black uppercase tracking-[0.3em] text-ember">{product.category}</p>
      <h1 className="mt-4 text-5xl font-black">{product.title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">{product.fullDescription || product.description}</p>
      <div className="mt-8 max-w-xl"><ProductCard product={product} /></div>
    </div>
  );
}
