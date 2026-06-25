"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function ClientChrome({ children }: { children: ReactNode }) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const glowX = useSpring(x, { stiffness: 120, damping: 24 });
  const glowY = useSpring(y, { stiffness: 120, damping: 24 });
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem("av-theme");
    if (saved === "light") setDark(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function animate() {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      gsap.fromTo("[data-chrome-enter]", { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" });
    }
    void animate();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
    window.localStorage.setItem("av-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div
      onMouseMove={(event) => {
        x.set(event.clientX - 160);
        y.set(event.clientY - 160);
      }}
      className="min-h-screen overflow-hidden bg-void text-white"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-40 h-80 w-80 rounded-full bg-pulse/20 blur-3xl"
        style={{ x: glowX, y: glowY }}
      />
      <div className="fixed inset-0 -z-10 bg-radial-grid" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,5,8,.4),#050508_75%)]" />
      <button
        type="button"
        onClick={() => setDark((value) => !value)}
        className="fixed bottom-5 right-5 z-50 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur"
        aria-label="Toggle dark mode"
      >
        {dark ? "Dark" : "Light"}
      </button>
      <div data-chrome-enter>{children}</div>
      <div className="noise" />
    </div>
  );
}
