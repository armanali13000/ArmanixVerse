# ArmanixVerse

ArmanixVerse is a premium independent gaming companion platform built with Next.js App Router, React, TypeScript, TailwindCSS, Framer Motion, Three.js, and Firebase-ready service hooks.

It includes a complete first ecosystem for GTA VI: editorial coverage, game hub, edition comparison, mission and achievement tracking, collectibles, weapon and vehicle database shells, interactive map layers, global search, account surfaces, admin modules, SEO outputs, newsletter and AI API routes.

## V2 Experience

The V2 redesign adds cinematic full-screen sections, stronger neon luxury theming, an official-info policy for GTA VI, top-level pages for games, news, guides, vehicles, weapons, maps, accessories, community, AI assistant, blog, about, contact, privacy, terms, and disclaimer.

GTA VI content separates confirmed information from unknown systems. If Rockstar has not officially announced vehicle names, weapon stats, mission lists, collectibles, achievements, PC requirements, or system requirements, the UI displays `Coming Soon` instead of invented data.

## Installation

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local` with Firebase keys when production auth/sync is enabled:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_ADMIN_EMAIL=darkdevil7325@gmail.com
```

`NEXT_PUBLIC_ADMIN_EMAIL` bootstraps the first admin. A signed-in user with this email receives the `admin` role automatically; later, roles can be edited in the `users` collection.

## Deployment

Deploy on Vercel with the environment variables above. Cloudflare Images can be used by adding delivery URLs under the existing `next.config.mjs` remote image pattern. The app emits `robots.txt`, `sitemap.xml`, metadata, Open Graph, Twitter cards, and article structured data.

## Admin Guide

The `/admin` route defines the operational modules for analytics, games, articles, categories, users, comments, media, SEO, newsletters, advertisements, and affiliate links. In production, gate this route with Firebase Authentication custom claims such as `admin: true`.

## Database Schema

Required Firestore collections:

- `games`: slug, title, releaseDate, platforms, overview, sections, media.
- `articles`: slug, title, dek, body, kind, gameSlug, authorId, tags, seo, status, publishedAt.
- `users`: email, displayName, avatarUrl, preferences, createdAt.
- `products`: product name, slug, category, brand, image URLs, descriptions, price, original price, discount, rating, store, affiliate link, badges, status, SEO.
- `productCategories`: name, slug, icon, description, banner image, active flag, sort order.
- `trailers`: title, YouTube embed URL, watch URL, description, published date, featured flag.
- `homepageSections`: hero title, subtitle, CTA buttons, countdown date, featured game, footer text, social links.
- `media`: image URL/path, alt text, createdAt, updatedAt, status.
- `affiliateClicks`: productId, productName, storeName, clickedAt, userId, visitorId.
- `newsletterSubscribers`: email, source, createdAt, updatedAt, status.
- `settings`: website, SEO, footer, navigation, official links, and AI settings.
- `progress`: userId, gameSlug, missions, achievements, collectibles, vehicles, weapons, updatedAt.
- `bookmarks`: userId, articleSlug, gameSlug, createdAt.
- `comments`: parentType, parentId, userId, body, status, likes, createdAt.

Every mutable record includes `id`, `createdAt`, `updatedAt`, and `status`.

## API Documentation

- `POST /api/ai` with `{ "question": "Best weapon?" }` returns a companion answer and is ready to connect to an AI provider.
- `POST /api/newsletter` accepts form data `email` and returns subscription status.

## Admin Login

1. Add Firebase web app keys and `NEXT_PUBLIC_ADMIN_EMAIL`.
2. Run `npm run dev`.
3. Open `/account` and sign in with Google or email/password.
4. Open `/admin`. Only the configured admin email or a Firestore user with role `admin` can access it.

The admin panel supports CRUD for affiliate products, categories, trailer embeds, homepage sections, media uploads, newsletter subscribers, and affiliate click analytics. Without Firebase keys, it uses a local browser database for development testing; with Firebase keys, records persist to Firestore and images upload to Firebase Storage.

## Testing Report

Verified locally with:

```bash
npm run build
npm run typecheck
```

Manual flow coverage implemented in code:

- Google/email auth with logout and role persistence.
- Protected `/admin` route.
- Product create/edit/delete with validation and delete confirmation.
- Category filters, search, and product sorting.
- Product detail and category routes.
- Affiliate click tracking to `affiliateClicks`.
- Newsletter signup to `newsletterSubscribers`.
- Official YouTube trailer iframe embeds only.
- No Rockstar logos, screenshots, artwork, or hosted trailer files.

## Legal

This website is an independent gaming companion platform and is not affiliated with Rockstar Games, Take-Two Interactive, or any game publisher. The project avoids copyrighted logos, screenshots, and artwork.
