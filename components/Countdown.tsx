"use client";

import { useEffect, useState } from "react";

function getParts(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const day = 1000 * 60 * 60 * 24;
  return {
    days: Math.floor(diff / day),
    hours: Math.floor((diff % day) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  };
}

export function Countdown({ target }: { target: string }) {
  const [parts, setParts] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    setParts(getParts(target));
    const timer = window.setInterval(() => setParts(getParts(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {Object.entries(parts).map(([label, value]) => (
        <div key={label} className="rounded-lg border border-white/10 bg-black/35 p-3 text-center">
          <div className="text-2xl font-black text-white sm:text-4xl">{value.toString().padStart(2, "0")}</div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">{label}</div>
        </div>
      ))}
    </div>
  );
}
