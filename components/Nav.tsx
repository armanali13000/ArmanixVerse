import Link from "next/link";
import { Search, Shield, Sparkles, UserCircle } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/games/gta-6", label: "GTA VI" },
  { href: "/news", label: "News" },
  { href: "/guides", label: "Guides" },
  { href: "/accessories", label: "Store" },
  { href: "/community", label: "Community" },
  { href: "/search", label: "Search" },
  { href: "/admin", label: "Admin" }
];

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-void/72 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pulse via-ion to-ember shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.28em]">ArmanixVerse</span>
            <span className="text-xs text-white/55">The Ultimate Gaming Universe</span>
          </span>
        </Link>
        <div className="hidden max-w-3xl items-center gap-1 overflow-x-auto lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/search" className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80" aria-label="Global search">
            <Search className="h-4 w-4" />
          </Link>
          <Link href="/account" className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80" aria-label="Account">
            <UserCircle className="h-4 w-4" />
          </Link>
          <span className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200 sm:flex">
            <Shield className="h-3.5 w-3.5" />
            Independent
          </span>
        </div>
      </nav>
    </header>
  );
}
