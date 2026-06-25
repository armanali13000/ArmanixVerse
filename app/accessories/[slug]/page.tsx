import type { Metadata } from "next";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { getProduct } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product?.seoTitle ?? "Accessory Product",
    description: product?.seoDescription ?? "Premium gaming accessory product details.",
    alternates: { canonical: `/accessories/${slug}` },
    openGraph: {
      title: product?.seoTitle ?? "Accessory Product",
      description: product?.seoDescription ?? "Premium gaming accessory product details."
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
