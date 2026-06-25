import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="ArmanixVerse home">
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-gradient-to-br from-pulse via-ion to-ember shadow-glow">
        <span className="absolute inset-1 rounded-md bg-black/35" />
        <span className="relative text-lg font-black tracking-tighter text-white">AV</span>
      </span>
      {!compact ? (
        <span>
          <span className="block text-sm font-black uppercase tracking-[0.28em]">ArmanixVerse</span>
          <span className="text-xs text-white/55">The Ultimate Gaming Universe</span>
        </span>
      ) : null}
    </Link>
  );
}
