import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="ArmanixVerse home">
      <span className="brand-mark relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-black/20 shadow-glow">
        <img src="/brand/armanixverse-logo-hd.png" alt="" className="h-full w-full object-contain" />
      </span>
      {!compact ? (
        <span className="min-w-0">
          <img src="/brand/armanixverse-wordmark.png" alt="ArmanixVerse" className="h-auto w-[176px] max-w-[46vw] object-contain sm:w-[220px]" />
          <span className="text-xs text-white/55">The Ultimate Gaming Universe</span>
        </span>
      ) : null}
    </Link>
  );
}
