"use client";

import Link from "next/link";
import { Menu, Search, Shield, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";

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
  const [open, setOpen] = useState(false);

  return (
    <header className="theme-nav sticky top-0 z-30 border-b border-white/10 bg-void/72 backdrop-blur-2xl">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
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
            <span className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200 md:flex">
              <Shield className="h-3.5 w-3.5" />
              Independent
            </span>
            <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 xl:hidden" aria-label="Toggle menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="mt-4 grid gap-2 rounded-lg border border-white/10 bg-white/5 p-3 xl:hidden">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
