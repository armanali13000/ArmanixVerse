import { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  children,
  className = ""
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 ${className}`}>
      <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.28em] text-ember">{eyebrow}</p> : null}
          <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}
