"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from "react";
import { Save, Trash2, Upload } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/components/AuthProvider";
import { deleteRecord, listRecords, saveRecord, uploadMedia } from "@/lib/db";
import { homepageSettings, productCategories, products, trailers } from "@/lib/content";
import type { AffiliateClick, HomepageSettings, Product, ProductCategory, TrailerEmbed } from "@/lib/types";

const tabs = ["Dashboard", "Affiliate Products", "Product Categories", "Trailer Embeds", "Homepage Sections", "Content Collections", "Media Library", "Newsletter", "Settings"];
const managedCollections = ["news", "guides", "games", "gtaDetails", "settings", "users"];

const emptyProduct: Product = {
  slug: "",
  title: "",
  category: "",
  brand: "",
  imageUrl: "",
  galleryImages: [],
  description: "",
  fullDescription: "",
  price: "",
  originalPrice: "",
  discount: "",
  discountPercentage: 0,
  rating: 0,
  storeName: "",
  featured: false,
  trending: false,
  bestSeller: false,
  active: true,
  badge: "",
  affiliateUrl: "",
  buttonText: "Buy Now",
  createdAt: "",
  updatedAt: "",
  status: "draft",
  seoTitle: "",
  seoDescription: ""
};

const emptyCategory: ProductCategory = {
  name: "",
  slug: "",
  icon: "Tag",
  description: "",
  bannerImage: "",
  active: true,
  sortOrder: 1,
  createdAt: "",
  updatedAt: "",
  status: "draft"
};

const emptyTrailer: TrailerEmbed = {
  title: "",
  embedUrl: "",
  watchUrl: "",
  description: "",
  publishedDate: new Date().toISOString().slice(0, 10),
  featured: false,
  createdAt: "",
  updatedAt: "",
  status: "draft"
};

const defaultSettings = {
  id: "global",
  siteName: "ArmanixVerse",
  tagline: "The Ultimate Gaming Universe",
  officialGtaUrl: "https://www.rockstargames.com/VI",
  footerDisclaimer:
    "ArmanixVerse is an independent gaming companion platform. It is not affiliated with Rockstar Games, Take-Two Interactive, Sony, Microsoft, Amazon, Flipkart, or any publisher/retailer.",
  defaultTheme: "dark",
  status: "published",
  createdAt: "",
  updatedAt: ""
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function AdminConsole() {
  const { user, logout } = useAuth();
  const [active, setActive] = useState(tabs[0]);
  const [productRows, setProductRows] = useState<Product[]>([]);
  const [categoryRows, setCategoryRows] = useState<ProductCategory[]>([]);
  const [trailerRows, setTrailerRows] = useState<TrailerEmbed[]>([]);
  const [home, setHome] = useState<HomepageSettings>(homepageSettings);
  const [clicks, setClicks] = useState<AffiliateClick[]>([]);
  const [newsletter, setNewsletter] = useState<Array<{ id?: string; email: string; source: string; createdAt: string }>>([]);
  const [media, setMedia] = useState<Array<{ id: string; url: string; path: string; alt: string }>>([]);
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [category, setCategory] = useState<ProductCategory>(emptyCategory);
  const [trailer, setTrailer] = useState<TrailerEmbed>(emptyTrailer);
  const [query, setQuery] = useState("");
  const [managedCollection, setManagedCollection] = useState(managedCollections[0]);
  const [managedRows, setManagedRows] = useState<Array<Record<string, unknown> & { id?: string }>>([]);
  const [managedJson, setManagedJson] = useState("{\n  \"title\": \"\",\n  \"status\": \"draft\"\n}");
  const [settings, setSettings] = useState(defaultSettings);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
    const [nextProducts, nextCategories, nextTrailers, nextClicks, nextNewsletter, nextMedia, homes, nextSettings] = await Promise.all([
      listRecords<Product>("products", products),
      listRecords<ProductCategory>("productCategories", productCategories),
      listRecords<TrailerEmbed>("trailers", trailers),
      listRecords<AffiliateClick>("affiliateClicks", []),
      listRecords<{ id?: string; email: string; source: string; createdAt: string }>("newsletterSubscribers", []),
      listRecords<{ id: string; url: string; path: string; alt: string }>("media", []),
      listRecords<HomepageSettings>("homepageSections", [homepageSettings]),
      listRecords<typeof defaultSettings>("settings", [defaultSettings])
    ]);
    setProductRows(nextProducts);
    setCategoryRows(nextCategories);
    setTrailerRows(nextTrailers);
    setClicks(nextClicks);
    setNewsletter(nextNewsletter);
    setMedia(nextMedia);
    setHome(homes[0] ?? homepageSettings);
    setSettings(nextSettings[0] ?? defaultSettings);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Admin data failed to load.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (active === "Content Collections") {
      void listRecords<Record<string, unknown> & { id?: string }>(managedCollection, []).then(setManagedRows);
    }
  }, [active, managedCollection]);

  const filteredProducts = useMemo(() => {
    const value = query.toLowerCase();
    return productRows.filter((item) => `${item.title} ${item.category} ${item.storeName}`.toLowerCase().includes(value));
  }, [productRows, query]);

  async function persistProduct() {
    setError("");
    if (!product.title || !product.category || !product.affiliateUrl || !product.price) {
      setError("Product name, category, price, and affiliate link are required.");
      return;
    }
    await saveRecord<Product>("products", { ...product, slug: product.slug || slugify(product.title) });
    setProduct(emptyProduct);
    setToast("Product saved.");
    await refresh();
  }

  async function persistCategory() {
    setError("");
    if (!category.name) {
      setError("Category name is required.");
      return;
    }
    await saveRecord<ProductCategory>("productCategories", { ...category, slug: category.slug || slugify(category.name) });
    setCategory(emptyCategory);
    setToast("Category saved.");
    await refresh();
  }

  async function persistTrailer() {
    setError("");
    if (!trailer.title || !trailer.embedUrl.includes("youtube.com/embed/")) {
      setError("Trailer title and a valid YouTube embed URL are required.");
      return;
    }
    await saveRecord<TrailerEmbed>("trailers", trailer);
    setTrailer(emptyTrailer);
    setToast("Trailer saved.");
    await refresh();
  }

  async function persistHome() {
    await saveRecord<HomepageSettings>("homepageSections", home);
    setToast("Homepage settings saved.");
    await refresh();
  }

  async function persistSettings() {
    await saveRecord("settings", settings);
    setToast("Settings saved.");
    await refresh();
  }

  async function handleUpload(file?: File) {
    if (!file) return;
    const uploaded = await uploadMedia(file, file.name);
    setMedia((items) => [uploaded, ...items]);
    setToast("Image uploaded.");
  }

  async function saveManagedRecord() {
    setError("");
    try {
      const parsed = JSON.parse(managedJson) as Record<string, unknown> & { id?: string };
      await saveRecord(managedCollection, parsed);
      setManagedJson("{\n  \"title\": \"\",\n  \"status\": \"draft\"\n}");
      setManagedRows(await listRecords(managedCollection, []));
      setToast(`${managedCollection} record saved.`);
    } catch {
      setError("JSON is invalid. Fix the record before saving.");
    }
  }

  const topProducts = Object.entries(clicks.reduce<Record<string, number>>((acc, click) => {
    acc[click.productName] = (acc[click.productName] ?? 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
          <span>{user?.email}</span>
          <button onClick={logout} className="rounded-full border border-ember/25 bg-ember/10 px-4 py-2 font-bold text-ember">Logout</button>
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">{tabs.map((tab) => <button key={tab} onClick={() => setActive(tab)} className={`rounded-full px-4 py-2 text-sm font-bold ${active === tab ? "bg-white text-black" : "border border-white/10 bg-white/5 text-white"}`}>{tab}</button>)}</div>
      {toast ? <p className="mb-4 rounded-md border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-200">{toast}</p> : null}
      {error ? <p className="mb-4 rounded-md border border-ember/20 bg-ember/10 p-3 text-sm text-ember">{error}</p> : null}
      {loading ? <p className="text-white/60">Loading admin data...</p> : null}

      {active === "Dashboard" ? (
        <div className="grid gap-5 md:grid-cols-4">
          {[["Products", productRows.length], ["Affiliate Clicks", clicks.length], ["Subscribers", newsletter.length], ["Trailers", trailerRows.length]].map(([label, value]) => <div key={label} className="glass rounded-lg p-5"><p className="text-3xl font-black">{value}</p><p className="text-sm text-white/55">{label}</p></div>)}
          <div className="glass rounded-lg p-5 md:col-span-4"><h2 className="font-bold">Top clicked products</h2><div className="mt-3 space-y-2 text-sm text-white/65">{topProducts.length ? topProducts.map(([name, count]) => <p key={name}>{name}: {count} clicks</p>) : "No clicks tracked yet."}</div></div>
        </div>
      ) : null}

      {active === "Affiliate Products" ? (
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <Editor title="Product Editor" onSave={persistProduct}>
            <Field label="Product Name" value={product.title} onChange={(title) => setProduct({ ...product, title })} />
            <Field label="Slug" value={product.slug} onChange={(slug) => setProduct({ ...product, slug })} />
            <Field label="Category" value={product.category} onChange={(category) => setProduct({ ...product, category })} />
            <Field label="Brand" value={product.brand} onChange={(brand) => setProduct({ ...product, brand })} />
            <Field label="Image URL" value={product.imageUrl} onChange={(imageUrl) => setProduct({ ...product, imageUrl })} />
            <Field label="Short Description" value={product.description} onChange={(description) => setProduct({ ...product, description })} />
            <Field label="Full Description" value={product.fullDescription} onChange={(fullDescription) => setProduct({ ...product, fullDescription })} textarea />
            <Field label="Price" value={product.price} onChange={(price) => setProduct({ ...product, price })} />
            <Field label="Original Price" value={product.originalPrice} onChange={(originalPrice) => setProduct({ ...product, originalPrice })} />
            <Field label="Discount %" value={String(product.discountPercentage)} onChange={(value) => setProduct({ ...product, discountPercentage: Number(value), discount: `${value}% off` })} />
            <Field label="Rating" value={String(product.rating)} onChange={(value) => setProduct({ ...product, rating: Number(value) })} />
            <Field label="Store Name" value={product.storeName} onChange={(storeName) => setProduct({ ...product, storeName })} />
            <Field label="Affiliate Link" value={product.affiliateUrl} onChange={(affiliateUrl) => setProduct({ ...product, affiliateUrl })} />
            <Field label="Button Text" value={product.buttonText} onChange={(buttonText) => setProduct({ ...product, buttonText })} />
            <Field label="SEO Title" value={product.seoTitle} onChange={(seoTitle) => setProduct({ ...product, seoTitle })} />
            <Field label="SEO Description" value={product.seoDescription} onChange={(seoDescription) => setProduct({ ...product, seoDescription })} textarea />
            <Toggles values={product} onChange={setProduct} />
          </Editor>
          <div className="glass rounded-lg p-5">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="mb-4 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
            <div className="space-y-3">{filteredProducts.map((item) => <AdminRow key={item.id ?? item.slug} title={item.title} detail={`${item.category} • ${item.storeName} • ${item.status}`} onEdit={() => setProduct(item)} onDelete={async () => window.confirm("Delete this product?") && item.id && (await deleteRecord("products", item.id), await refresh())} />)}</div>
          </div>
        </div>
      ) : null}

      {active === "Product Categories" ? (
        <div className="grid gap-5 lg:grid-cols-2"><Editor title="Category Editor" onSave={persistCategory}><Field label="Category Name" value={category.name} onChange={(name) => setCategory({ ...category, name })} /><Field label="Slug" value={category.slug} onChange={(slug) => setCategory({ ...category, slug })} /><Field label="Icon" value={category.icon} onChange={(icon) => setCategory({ ...category, icon })} /><Field label="Description" value={category.description} onChange={(description) => setCategory({ ...category, description })} textarea /><Field label="Banner Image" value={category.bannerImage} onChange={(bannerImage) => setCategory({ ...category, bannerImage })} /><Field label="Sort Order" value={String(category.sortOrder)} onChange={(value) => setCategory({ ...category, sortOrder: Number(value) })} /></Editor><List rows={categoryRows} titleKey="name" detail={(item) => item.description} onEdit={setCategory} collection="productCategories" refresh={refresh} /></div>
      ) : null}

      {active === "Trailer Embeds" ? (
        <div className="grid gap-5 lg:grid-cols-2"><Editor title="Trailer Editor" onSave={persistTrailer}><Field label="Trailer Title" value={trailer.title} onChange={(title) => setTrailer({ ...trailer, title })} /><Field label="YouTube Embed URL" value={trailer.embedUrl} onChange={(embedUrl) => setTrailer({ ...trailer, embedUrl })} /><Field label="Watch URL" value={trailer.watchUrl} onChange={(watchUrl) => setTrailer({ ...trailer, watchUrl })} /><Field label="Description" value={trailer.description} onChange={(description) => setTrailer({ ...trailer, description })} textarea /><Field label="Published Date" value={trailer.publishedDate} onChange={(publishedDate) => setTrailer({ ...trailer, publishedDate })} /><label className="flex gap-2 text-sm"><input type="checkbox" checked={trailer.featured} onChange={(event) => setTrailer({ ...trailer, featured: event.target.checked })} /> Featured</label></Editor><List rows={trailerRows} titleKey="title" detail={(item) => item.embedUrl} onEdit={setTrailer} collection="trailers" refresh={refresh} /></div>
      ) : null}

      {active === "Homepage Sections" ? (
        <Editor title="Homepage Editor" onSave={persistHome}><Field label="Hero Title" value={home.heroTitle} onChange={(heroTitle) => setHome({ ...home, heroTitle })} /><Field label="Hero Subtitle" value={home.heroSubtitle} onChange={(heroSubtitle) => setHome({ ...home, heroSubtitle })} textarea /><Field label="Countdown Date" value={home.countdownDate} onChange={(countdownDate) => setHome({ ...home, countdownDate })} /><Field label="Featured Game Slug" value={home.featuredGameSlug} onChange={(featuredGameSlug) => setHome({ ...home, featuredGameSlug })} /><Field label="Footer Text" value={home.footerText} onChange={(footerText) => setHome({ ...home, footerText })} textarea /></Editor>
      ) : null}

      {active === "Content Collections" ? (
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="glass rounded-lg p-5">
            <h2 className="mb-4 text-xl font-black">Collection Editor</h2>
            <select value={managedCollection} onChange={(event) => setManagedCollection(event.target.value)} className="mb-3 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none">{managedCollections.map((name) => <option key={name}>{name}</option>)}</select>
            <textarea value={managedJson} onChange={(event) => setManagedJson(event.target.value)} rows={14} className="w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm outline-none" />
            <button onClick={saveManagedRecord} className="mt-3 inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 font-bold text-black"><Save className="h-4 w-4" /> Save Record</button>
          </div>
          <div className="glass rounded-lg p-5">
            <h2 className="mb-4 text-xl font-black">{managedCollection}</h2>
            <div className="space-y-3">{managedRows.map((item) => <AdminRow key={item.id ?? JSON.stringify(item).slice(0, 20)} title={String(item.title ?? item.name ?? item.email ?? item.id ?? "Untitled")} detail={String(item.status ?? "record")} onEdit={() => setManagedJson(JSON.stringify(item, null, 2))} onDelete={async () => window.confirm("Delete this record?") && item.id && (await deleteRecord(managedCollection, item.id), setManagedRows(await listRecords(managedCollection, [])))} />)}</div>
          </div>
        </div>
      ) : null}

      {active === "Media Library" ? (
        <div className="glass rounded-lg p-5"><label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-black"><Upload className="h-4 w-4" /> Upload image<input type="file" accept="image/*" className="hidden" onChange={(event) => void handleUpload(event.target.files?.[0])} /></label><div className="mt-5 grid gap-4 md:grid-cols-3">{media.map((item) => <div key={item.id} className="rounded-md border border-white/10 p-3"><img src={item.url} alt={item.alt} className="h-36 w-full rounded object-cover" /><button onClick={() => navigator.clipboard.writeText(item.url)} className="mt-3 rounded bg-white/10 px-3 py-2 text-sm">Copy URL</button></div>)}</div></div>
      ) : null}

      {active === "Newsletter" ? <div className="glass rounded-lg p-5"><h2 className="font-bold">Subscribers</h2><div className="mt-4 space-y-2 text-sm text-white/65">{newsletter.map((item) => <p key={item.id ?? item.email}>{item.email} • {item.source} • {item.createdAt}</p>)}</div></div> : null}

      {active === "Settings" ? (
        <Editor title="Website Settings" onSave={persistSettings}>
          <Field label="Site Name" value={settings.siteName} onChange={(siteName) => setSettings({ ...settings, siteName })} />
          <Field label="Tagline" value={settings.tagline} onChange={(tagline) => setSettings({ ...settings, tagline })} />
          <Field label="Official GTA VI URL" value={settings.officialGtaUrl} onChange={(officialGtaUrl) => setSettings({ ...settings, officialGtaUrl })} />
          <Field label="Footer Disclaimer" value={settings.footerDisclaimer} onChange={(footerDisclaimer) => setSettings({ ...settings, footerDisclaimer })} textarea />
          <label className="block text-sm text-white/60">
            Default Theme
            <select value={settings.defaultTheme} onChange={(event) => setSettings({ ...settings, defaultTheme: event.target.value })} className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none">
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </label>
          <p className="text-sm leading-6 text-white/55">Collections configured: users, products, productCategories, news, guides, games, gtaDetails, trailers, homepageSections, media, settings, affiliateClicks, newsletterSubscribers.</p>
        </Editor>
      ) : null}
    </div>
  );
}

function Editor({ title, children, onSave }: { title: string; children: React.ReactNode; onSave: () => void }) {
  return <div className="glass rounded-lg p-5"><h2 className="mb-4 text-xl font-black">{title}</h2><div className="grid gap-3">{children}<button onClick={onSave} className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-3 font-bold text-black"><Save className="h-4 w-4" /> Save</button></div></div>;
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean }) {
  const shared = "mt-1 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none";
  return <label className="block text-sm text-white/60">{label}{textarea ? <textarea value={value} onChange={(event) => onChange(event.target.value)} className={shared} rows={3} /> : <input value={value} onChange={(event) => onChange(event.target.value)} className={shared} />}</label>;
}

function Toggles({ values, onChange }: { values: Product; onChange: (value: Product) => void }) {
  return <div className="grid grid-cols-2 gap-2 text-sm">{(["featured", "trending", "bestSeller", "active"] as const).map((key) => <label key={key} className="flex gap-2"><input type="checkbox" checked={Boolean(values[key])} onChange={(event) => onChange({ ...values, [key]: event.target.checked })} /> {key}</label>)}</div>;
}

function AdminRow({ title, detail, onEdit, onDelete }: { title: string; detail: string; onEdit: () => void; onDelete: () => void }) {
  return <div className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3"><div><b>{title}</b><p className="text-sm text-white/50">{detail}</p></div><div className="flex gap-2"><button onClick={onEdit} className="rounded bg-white/10 px-3 py-2 text-sm">Edit</button><button onClick={onDelete} className="rounded bg-ember/10 px-3 py-2 text-sm text-ember"><Trash2 className="h-4 w-4" /></button></div></div>;
}

function List<T extends { id?: string } & Record<string, unknown>>({ rows, titleKey, detail, onEdit, collection, refresh }: { rows: T[]; titleKey: keyof T; detail: (item: T) => string; onEdit: (item: T) => void; collection: string; refresh: () => Promise<void> }) {
  return <div className="glass rounded-lg p-5"><div className="space-y-3">{rows.map((item) => <AdminRow key={item.id ?? String(item[titleKey])} title={String(item[titleKey])} detail={detail(item)} onEdit={() => onEdit(item)} onDelete={async () => window.confirm("Delete this item?") && item.id && (await deleteRecord(collection, item.id), await refresh())} />)}</div></div>;
}
