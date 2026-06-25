/* eslint-disable @next/next/no-img-element */

export function Wordmark({ className = "h-auto w-[220px] max-w-full" }: { className?: string }) {
  return <img src="/brand/armanixverse-wordmark.png" alt="ArmanixVerse" className={className} />;
}
