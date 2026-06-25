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
      <div className="theme-cinematic absolute inset-0 -z-10" />
      <div className="mx-auto grid min-h-[72vh] max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.36em] text-ember">{eyebrow}</p>
          <h2 className="mt-5 text-balance text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-soft via-pulse to-ember bg-clip-text text-transparent">{title}</span>
          </h2>
          {body ? <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{body}</p> : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
