export type ArticleKind = "news" | "guide" | "walkthrough" | "review" | "video";

export type Article = {
  slug: string;
  title: string;
  dek: string;
  kind: ArticleKind;
  gameSlug: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  image: string;
  body: string[];
};

export type Game = {
  slug: string;
  title: string;
  shortTitle: string;
  publisherNotice: string;
  releaseDate: string;
  platform: string[];
  hero: string;
  overview: string;
  stats: { label: string; value: string }[];
  editions: { name: string; price: string; includes: string[]; bestFor: string }[];
  characters: { name: string; role: string; bio: string }[];
  vehicles: { name: string; className: string; speed: number; handling: number; utility: string }[];
  weapons: { name: string; category: string; power: number; control: number; bestUse: string }[];
  missions: { id: string; title: string; region: string; difficulty: string; reward: string }[];
  collectibles: { id: string; title: string; region: string; clue: string }[];
  achievements: { id: string; title: string; points: number; requirement: string }[];
  faqs: { question: string; answer: string }[];
};

export type Product = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  brand: string;
  imageUrl: string;
  galleryImages: string[];
  description: string;
  fullDescription: string;
  price: string;
  originalPrice: string;
  discount: string;
  discountPercentage: number;
  rating: number;
  storeName: string;
  featured: boolean;
  trending: boolean;
  bestSeller: boolean;
  active: boolean;
  badge: string;
  affiliateUrl: string;
  buttonText: string;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "published" | "inactive";
  seoTitle: string;
  seoDescription: string;
};

export type ProductCategory = {
  id?: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  bannerImage: string;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "published" | "inactive";
};

export type TrailerEmbed = {
  id?: string;
  title: string;
  embedUrl: string;
  watchUrl: string;
  description: string;
  publishedDate: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "published" | "inactive";
};

export type HomepageSettings = {
  id?: string;
  heroTitle: string;
  heroSubtitle: string;
  countdownDate: string;
  featuredGameSlug: string;
  footerText: string;
  ctaButtons: { label: string; href: string; external?: boolean }[];
  socialLinks: { label: string; href: string }[];
  createdAt: string;
  updatedAt: string;
  status: "draft" | "published" | "inactive";
};

export type AffiliateClick = {
  id?: string;
  productId: string;
  productName: string;
  storeName: string;
  clickedAt: string;
  userId?: string;
  visitorId: string;
  status: "published";
  createdAt: string;
  updatedAt: string;
};

export type MapMarker = {
  id: string;
  title: string;
  type: "Location" | "Business" | "Collectible" | "Vehicle" | "Landmark";
  status: "Confirmed" | "Coming Soon";
  x: number;
  y: number;
};
