import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_.8fr_.8fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">{site.notice}</p>
        </div>
        <div className="space-y-2 text-sm text-white/65">
          <p className="font-semibold text-white">Platform</p>
          <Link className="block hover:text-white" href="/">Home</Link>
          <Link className="block hover:text-white" href="/games">Games</Link>
          <Link className="block hover:text-white" href="/games/gta-6">GTA VI</Link>
          <Link className="block hover:text-white" href="/maps">Maps</Link>
          <Link className="block hover:text-white" href="/search">Search</Link>
          <Link className="block hover:text-white" href="/account">Profile</Link>
        </div>
        <div className="space-y-2 text-sm text-white/65">
          <p className="font-semibold text-white">Business</p>
          <Link className="block hover:text-white" href="/admin">Admin</Link>
          <Link className="block hover:text-white" href="/privacy">Privacy</Link>
          <Link className="block hover:text-white" href="/terms">Terms</Link>
          <Link className="block hover:text-white" href="/disclaimer">Disclaimer</Link>
          <span className="block">AdSense ready</span>
          <span className="block">Affiliate ready</span>
        </div>
      </div>
    </footer>
  );
}
