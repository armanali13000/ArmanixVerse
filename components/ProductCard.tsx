"use client";

/* eslint-disable @next/next/no-img-element */

import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { saveRecord, makeId } from "@/lib/db";
import { useAuth } from "@/components/AuthProvider";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { user } = useAuth();

  async function buyNow() {
    const visitorId = window.localStorage.getItem("av-visitor-id") ?? makeId("visitor");
    window.localStorage.setItem("av-visitor-id", visitorId);
    await saveRecord("affiliateClicks", {
      productId: product.id ?? product.slug,
      productName: product.title,
      storeName: product.storeName,
      clickedAt: new Date().toISOString(),
      userId: user?.uid,
      visitorId,
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    window.open(product.affiliateUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <article className="group gradient-border rounded-lg">
      <div className="glass h-full rounded-lg p-5 transition duration-300 group-hover:-translate-y-1">
        <div className="relative mb-5 flex h-48 items-start justify-between overflow-hidden rounded-md border border-white/10 bg-[radial-gradient(circle_at_22%_18%,rgba(255,79,162,.42),transparent_30%),radial-gradient(circle_at_82%_32%,rgba(0,217,255,.22),transparent_30%),linear-gradient(135deg,#141414,#090909)] p-4">
          {product.imageUrl ? <img src={product.imageUrl} alt={product.title} className="absolute inset-0 h-full w-full object-cover opacity-70" /> : null}
          <span className="relative rounded-full bg-black/45 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-ion">{product.category}</span>
          {product.featured ? <span className="relative rounded-full bg-ember px-3 py-1 text-xs font-black text-black">{product.badge}</span> : null}
        </div>
        <Link href={`/accessories/${product.slug}`} className="text-xl font-black hover:text-ion">{product.title}</Link>
        <p className="mt-3 text-sm leading-6 text-white/62">{product.description}</p>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="font-black text-white">{product.price}</span>
          <span className="text-ember">{product.discount}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm text-white/65"><Star className="h-4 w-4 fill-ember text-ember" /> {product.rating}</span>
          <button onClick={buyNow} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
            {product.buttonText || "Buy Now"} <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
        <a href={product.affiliateUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="sr-only">Affiliate link for {product.title}</a>
      </div>
    </article>
  );
}
