import { ReactNode } from "react";

export function CinematicPanel({
  eyebrow,
  title,
  body,
  children,
  className = ""
}: {
  eyebrow: string;
  title: string;
  body?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative isolate overflow-hidden border-y border-white/10 ${className}`}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,79,162,.28),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(0,217,255,.18),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(255,123,50,.16),transparent_30%),linear-gradient(135deg,#090909,#141414)]" />
      <div className="mx-auto grid min-h-[72vh] max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.36em] text-ember">{eyebrow}</p>
          <h2 className="mt-5 text-balance text-5xl font-black tracking-tight sm:text-7xl">
            <span className="bg-gradient-to-r from-soft via-pulse to-ember bg-clip-text text-transparent">{title}</span>
          </h2>
          {body ? <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{body}</p> : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
