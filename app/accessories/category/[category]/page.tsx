import { ProductGridClient } from "@/components/ProductGridClient";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const label = category.replace(/-/g, " ");
  return {
    title: `${label} Accessories`,
    description: `Premium gaming accessories in the ${label} category.`,
    alternates: { canonical: `/accessories/category/${category}` }
  };
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-ember">Accessory Category</p>
      <h1 className="mt-4 text-5xl font-black capitalize">{category.replace(/-/g, " ")}</h1>
      <div className="mt-10"><ProductGridClient category={category} /></div>
    </div>
  );
}
