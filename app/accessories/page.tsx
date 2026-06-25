import type { Metadata } from "next";
import { CinematicPanel } from "@/components/CinematicPanel";
import { ProductGridClient } from "@/components/ProductGridClient";

export const metadata: Metadata = { title: "Gaming Accessories Store", description: "Premium affiliate-ready gaming accessories store.", alternates: { canonical: "/accessories" } };

export default function AccessoriesPage() {
  const categories = ["PS5", "Xbox", "Controllers", "Gaming Chairs", "Gaming Monitor", "Keyboard", "Mouse", "Headset", "SSD", "Graphics Card", "Gaming Desk", "Streaming Equipment", "Capture Cards", "VR Headsets"];
  return (
    <>
      <CinematicPanel eyebrow="Accessories Store" title="Build The Setup Around The Game" body="Affiliate-ready products with images, titles, descriptions, prices, discounts, ratings, badges, categories, and admin-managed links." />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">{categories.map((category) => <span key={category} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/65">{category}</span>)}</div>
        <ProductGridClient />
      </section>
    </>
  );
}
