import type { Article, Game, HomepageSettings, MapMarker, Product, ProductCategory, TrailerEmbed } from "@/lib/types";

export const site = {
  name: "ArmanixVerse",
  tagline: "The Ultimate Gaming Universe",
  url: "https://armanixverse.com",
  officialGtaUrl: "https://www.rockstargames.com/VI",
  notice:
    "ArmanixVerse is an independent gaming companion platform. It is not affiliated with Rockstar Games, Take-Two Interactive, Sony, Microsoft, Amazon, Flipkart, or any publisher/retailer."
};

const now = "2026-06-25T00:00:00.000Z";

export const games: Game[] = [
  {
    slug: "gta-6",
    title: "Grand Theft Auto VI Companion Hub",
    shortTitle: "GTA VI",
    publisherNotice: site.notice,
    releaseDate: "2026-11-19T00:00:00-05:00",
    platform: ["PlayStation 5", "Xbox Series X|S"],
    hero: "Vice City neon coastline at night with original futuristic gaming UI overlays",
    overview:
      "A premium independent companion hub for official GTA VI news, spoiler-safe guides, edition tracking, platform comparison, and future map, vehicle, weapon, mission, collectible, and achievement systems.",
    stats: [
      { label: "Tracked Systems", value: "11" },
      { label: "Official Platforms", value: "PS5 + Xbox" },
      { label: "Official Site", value: "Rockstar" },
      { label: "Unknown Systems", value: "Coming Soon" }
    ],
    editions: [
      {
        name: "Standard Edition",
        price: "Coming Soon",
        includes: ["Official details have not yet been announced."],
        bestFor: "Players waiting for final regional pricing and retailer details."
      },
      {
        name: "Ultimate Edition",
        price: "Coming Soon",
        includes: ["Rockstar describes this as an exclusive item collection for Jason and Lucia's story."],
        bestFor: "Fans who want the premium digital-content tier once full details are confirmed."
      },
      {
        name: "Pre-order Bonuses",
        price: "Pre-order opens June 25",
        includes: ["Vintage Vice City Pack is listed on the official GTA VI page."],
        bestFor: "Players who want official pre-order bonuses without relying on rumors."
      }
    ],
    characters: [
      {
        name: "Lucia Caminos",
        role: "Playable protagonist",
        bio: "Officially featured by Rockstar as one of the two central characters in Jason and Lucia's story."
      },
      {
        name: "Jason Duval",
        role: "Playable protagonist",
        bio: "Officially featured by Rockstar alongside Lucia in a story set across Vice City and Leonida."
      },
      {
        name: "Additional Characters",
        role: "Coming Soon",
        bio: "Official details have not yet been announced."
      }
    ],
    vehicles: [
      { name: "Vehicle Database", className: "Coming Soon", speed: 0, handling: 0, utility: "Official vehicle names and stats have not yet been announced." }
    ],
    weapons: [
      { name: "Weapon Database", category: "Coming Soon", power: 0, control: 0, bestUse: "Official weapon names and stats have not yet been announced." }
    ],
    missions: [
      { id: "m1", title: "Mission Guide", region: "Coming Soon", difficulty: "Coming Soon", reward: "Official mission details have not yet been announced." }
    ],
    collectibles: [
      { id: "c1", title: "Collectibles Guide", region: "Coming Soon", clue: "Official collectibles have not yet been announced." }
    ],
    achievements: [
      { id: "a1", title: "Achievement List", points: 0, requirement: "Official achievements have not yet been announced." }
    ],
    faqs: [
      {
        question: "Is this an official GTA VI site?",
        answer: "No. ArmanixVerse is an independent companion platform and uses original writing, tools, and illustrations."
      },
      {
        question: "Will progress sync across devices?",
        answer: "The architecture is Firebase-ready. Local progress works now, and authenticated cloud sync is prepared for production keys."
      },
      {
        question: "Can ArmanixVerse support more games?",
        answer: "Yes. Game pages are powered by typed data, reusable systems, and route conventions designed for expansion."
      }
    ]
  }
];

export const articles: Article[] = [
  {
    slug: "gta-6-launch-prep",
    title: "GTA VI Launch Prep: The ArmanixVerse 100% Readiness Plan",
    dek: "A practical roadmap for editions, platforms, storage, controller setup, and spoiler-safe guide tracking.",
    kind: "guide",
    gameSlug: "gta-6",
    author: "Armanix Editorial",
    publishedAt: "2026-06-20",
    readingMinutes: 7,
    tags: ["GTA VI", "Launch", "Checklist"],
    image: "launch-prep",
    body: [
      "Start with platform readiness: reserve fast SSD space, update your console, and configure capture settings before launch week.",
      "Create a spoiler-safe plan by bookmarking only the systems you want active: story, vehicles, collectibles, achievements, or map discovery.",
      "Use edition comparison for value, not fear of missing out. Digital extras are useful only when they affect the way you actually play."
    ]
  },
  {
    slug: "best-early-vehicles-gta-6",
    title: "GTA VI Vehicles Database: What Is Confirmed So Far",
    dek: "A spoiler-safe vehicle hub that clearly separates official information from coming-soon database fields.",
    kind: "guide",
    gameSlug: "gta-6",
    author: "Mira Vale",
    publishedAt: "2026-06-18",
    readingMinutes: 5,
    tags: ["Vehicles", "Comparison", "Progression"],
    image: "vehicles",
    body: [
      "Official vehicle names, manufacturers, performance ratings, spawn locations, and collection requirements have not yet been announced.",
      "ArmanixVerse is prepared to support images, galleries, related articles, categories, affiliate modules, and admin-editable stats when official details are available.",
      "Until then, every unconfirmed database field is labeled Coming Soon."
    ]
  },
  {
    slug: "weapon-control-guide",
    title: "GTA VI Weapons Database: Coming Soon System Design",
    dek: "Damage, type, stats, descriptions, and mission utility will appear only when official information exists.",
    kind: "walkthrough",
    gameSlug: "gta-6",
    author: "Dev Rayne",
    publishedAt: "2026-06-15",
    readingMinutes: 6,
    tags: ["Weapons", "Walkthrough", "Builds"],
    image: "weapons",
    body: [
      "Official weapon names, damage values, attachments, and mission recommendations have not yet been announced.",
      "The weapons database is built for admin-editable stats, article relationships, images, and future comparison tools.",
      "ArmanixVerse will not invent weapon performance data before official information is available."
    ]
  },
  {
    slug: "vice-city-newswire",
    title: "Vice City Watch: Confirmed Places And Coming-Soon Layers",
    dek: "Vice City and Leonida are confirmed; businesses, collectibles, vehicles, and mission layers remain marked as coming soon.",
    kind: "news",
    gameSlug: "gta-6",
    author: "Armanix Newsdesk",
    publishedAt: "2026-06-22",
    readingMinutes: 4,
    tags: ["News", "Community", "Maps"],
    image: "newswire",
    body: [
      "The biggest companion demand is granular map control: players want locations, collectibles, businesses, landmarks, vehicles, and mission prerequisites separated by layer.",
      "Spoiler filters are becoming a must-have feature for modern guide platforms.",
      "ArmanixVerse is structured so map layers, checklists, and AI answers can evolve without replacing the game hub."
    ]
  }
];

export const communityPosts = [
  { title: "Spoiler-safe map layers should be default", author: "NightDrive", replies: 128, heat: "Hot" },
  { title: "What makes a perfect first garage?", author: "Vesper", replies: 84, heat: "Rising" },
  { title: "Controller sensitivity presets for clean driving", author: "Axis", replies: 52, heat: "Guide" }
];

export const affiliateBlocks = [
  { title: "Performance SSDs", category: "Storage", cta: "Compare loadout-ready drives" },
  { title: "Precision Controllers", category: "Accessories", cta: "View pro controller picks" },
  { title: "OLED Gaming Monitors", category: "Displays", cta: "Browse cinematic screens" }
];

export const products: Product[] = [
  {
    id: "ps5-performance-ssd",
    slug: "ps5-performance-ssd",
    title: "PS5 Performance SSD",
    category: "SSD",
    brand: "Armanix Picks",
    imageUrl: "",
    galleryImages: [],
    description: "High-speed storage for large open-world installs, capture libraries, and fast switching.",
    fullDescription: "A console-ready NVMe SSD pick designed around fast load times, larger install libraries, and reliable thermal performance.",
    price: "$129.99",
    originalPrice: "$159.99",
    discount: "18% off",
    discountPercentage: 18,
    rating: 4.8,
    storeName: "Amazon",
    featured: true,
    trending: true,
    bestSeller: false,
    active: true,
    badge: "Featured",
    affiliateUrl: "https://example.com/affiliate/ps5-ssd",
    buttonText: "Buy Now",
    createdAt: now,
    updatedAt: now,
    status: "published",
    seoTitle: "Best PS5 Performance SSD",
    seoDescription: "A premium PS5 SSD accessory pick for large game installs and fast loading."
  },
  {
    id: "pro-wireless-controller",
    slug: "pro-wireless-controller",
    title: "Pro Wireless Controller",
    category: "Controllers",
    brand: "Armanix Picks",
    imageUrl: "",
    galleryImages: [],
    description: "Responsive sticks, remappable inputs, and long-session comfort for driving and aiming.",
    fullDescription: "A high-end wireless controller recommendation for players who want responsive inputs and long-session ergonomics.",
    price: "$179.99",
    originalPrice: "$199.99",
    discount: "Trending",
    discountPercentage: 10,
    rating: 4.7,
    storeName: "Amazon",
    featured: true,
    trending: true,
    bestSeller: true,
    active: true,
    badge: "Trending",
    affiliateUrl: "https://example.com/affiliate/controller",
    buttonText: "Buy Now",
    createdAt: now,
    updatedAt: now,
    status: "published",
    seoTitle: "Pro Wireless Controller",
    seoDescription: "Premium wireless controller for open-world action games."
  },
  {
    id: "oled-gaming-monitor",
    slug: "oled-gaming-monitor",
    title: "Cinematic OLED Monitor",
    category: "Gaming Monitor",
    brand: "Armanix Picks",
    imageUrl: "",
    galleryImages: [],
    description: "Deep contrast, low latency, and a cinematic panel for premium console setups.",
    fullDescription: "A cinematic display pick for players who want deep blacks, vibrant neon, and responsive gameplay.",
    price: "$699.99",
    originalPrice: "$849.99",
    discount: "Hot Deal",
    discountPercentage: 18,
    rating: 4.9,
    storeName: "Amazon",
    featured: true,
    trending: false,
    bestSeller: true,
    active: true,
    badge: "Editor Pick",
    affiliateUrl: "https://example.com/affiliate/oled",
    buttonText: "Buy Now",
    createdAt: now,
    updatedAt: now,
    status: "published",
    seoTitle: "Cinematic OLED Gaming Monitor",
    seoDescription: "Premium OLED monitor pick for cinematic gaming setups."
  },
  {
    id: "spatial-gaming-headset",
    slug: "spatial-gaming-headset",
    title: "Spatial Gaming Headset",
    category: "Headset",
    brand: "Armanix Picks",
    imageUrl: "",
    galleryImages: [],
    description: "Clear positional audio, clean mic capture, and lightweight comfort.",
    fullDescription: "A spatial audio headset pick for players and creators who need comfort, clarity, and reliable mic quality.",
    price: "$149.99",
    originalPrice: "$169.99",
    discount: "12% off",
    discountPercentage: 12,
    rating: 4.6,
    storeName: "Flipkart",
    featured: false,
    trending: true,
    bestSeller: false,
    active: true,
    badge: "Audio",
    affiliateUrl: "https://example.com/affiliate/headset",
    buttonText: "Buy Now",
    createdAt: now,
    updatedAt: now,
    status: "published",
    seoTitle: "Spatial Gaming Headset",
    seoDescription: "Gaming headset pick for positional audio and streaming."
  },
  {
    id: "streaming-capture-card",
    slug: "streaming-capture-card",
    title: "4K Streaming Capture Card",
    category: "Capture Cards",
    brand: "Armanix Picks",
    imageUrl: "",
    galleryImages: [],
    description: "Creator-ready recording and streaming for walkthroughs, reels, and launch coverage.",
    fullDescription: "A creator-focused capture card for recording walkthroughs, streaming gameplay, and producing launch coverage.",
    price: "$199.99",
    originalPrice: "$229.99",
    discount: "Creator",
    discountPercentage: 13,
    rating: 4.5,
    storeName: "Amazon",
    featured: false,
    trending: false,
    bestSeller: false,
    active: true,
    badge: "Streaming",
    affiliateUrl: "https://example.com/affiliate/capture",
    buttonText: "Buy Now",
    createdAt: now,
    updatedAt: now,
    status: "published",
    seoTitle: "4K Streaming Capture Card",
    seoDescription: "Capture card pick for creators and streamers.",
  }
];

export const productCategories: ProductCategory[] = [
  { name: "SSD", slug: "ssd", icon: "HardDrive", description: "Storage upgrades for console and PC libraries.", bannerImage: "", active: true, sortOrder: 1, createdAt: now, updatedAt: now, status: "published" },
  { name: "Controllers", slug: "controllers", icon: "Gamepad2", description: "Precision controllers and premium input devices.", bannerImage: "", active: true, sortOrder: 2, createdAt: now, updatedAt: now, status: "published" },
  { name: "Gaming Monitor", slug: "gaming-monitor", icon: "Monitor", description: "Cinematic displays for premium gaming setups.", bannerImage: "", active: true, sortOrder: 3, createdAt: now, updatedAt: now, status: "published" },
  { name: "Headset", slug: "headset", icon: "Headphones", description: "Spatial audio and streaming-ready headsets.", bannerImage: "", active: true, sortOrder: 4, createdAt: now, updatedAt: now, status: "published" },
  { name: "Capture Cards", slug: "capture-cards", icon: "Video", description: "Creator gear for recording and streaming.", bannerImage: "", active: true, sortOrder: 5, createdAt: now, updatedAt: now, status: "published" }
];

export const trailers: TrailerEmbed[] = [
  {
    id: "gta-vi-trailer-1",
    title: "Grand Theft Auto VI Trailer 1",
    embedUrl: "https://www.youtube.com/embed/QdBZY2fkU-0",
    watchUrl: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
    description: "Official YouTube embed from Rockstar Games. Video is embedded only and not hosted by ArmanixVerse.",
    publishedDate: "2023-12-05",
    featured: true,
    createdAt: now,
    updatedAt: now,
    status: "published"
  },
  {
    id: "gta-vi-trailer-2",
    title: "Grand Theft Auto VI Trailer 2",
    embedUrl: "https://www.youtube.com/embed/VQRLujxTm3c",
    watchUrl: "https://www.youtube.com/watch?v=VQRLujxTm3c",
    description: "Official YouTube embed from Rockstar Games. Video is embedded only and not hosted by ArmanixVerse.",
    publishedDate: "2025-05-06",
    featured: false,
    createdAt: now,
    updatedAt: now,
    status: "published"
  }
];

export const homepageSettings: HomepageSettings = {
  heroTitle: "ENTER THE NEXT GAMING UNIVERSE",
  heroSubtitle: "Everything GTA VI and gaming. Guides. News. Accessories. Community.",
  countdownDate: "2026-11-19T00:00:00-05:00",
  featuredGameSlug: "gta-6",
  footerText: site.notice,
  ctaButtons: [
    { label: "Explore GTA VI", href: "/games/gta-6" },
    { label: "Latest News", href: "/news" },
    { label: "Gaming Accessories", href: "/accessories" },
    { label: "Visit Official GTA VI Website", href: site.officialGtaUrl, external: true }
  ],
  socialLinks: [],
  createdAt: now,
  updatedAt: now,
  status: "published"
};

export const mapMarkers: MapMarker[] = [
  { id: "vice-city", title: "Vice City, USA", type: "Location", status: "Confirmed", x: 42, y: 34 },
  { id: "leonida", title: "State of Leonida", type: "Landmark", status: "Confirmed", x: 58, y: 52 },
  { id: "businesses", title: "Businesses", type: "Business", status: "Coming Soon", x: 32, y: 68 },
  { id: "collectibles", title: "Collectibles", type: "Collectible", status: "Coming Soon", x: 72, y: 28 },
  { id: "vehicles", title: "Vehicle Spawns", type: "Vehicle", status: "Coming Soon", x: 64, y: 72 }
];

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getGameArticles(gameSlug: string) {
  return articles.filter((article) => article.gameSlug === gameSlug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
