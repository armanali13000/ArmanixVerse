"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Item = { id: string; title: string; meta: string };

export function Tracker({ storageKey, title, items }: { storageKey: string; title: string; items: Item[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked, storageKey]);

  const complete = useMemo(() => items.filter((item) => checked[item.id]).length, [checked, items]);
  const percent = Math.round((complete / items.length) * 100);

  return (
    <div className="glass rounded-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-sm text-white/55">{complete} of {items.length} complete</p>
        </div>
        <span className="text-2xl font-black text-ember">{percent}%</span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-pulse via-ion to-ember" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <label key={item.id} className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3">
            <input
              type="checkbox"
              checked={Boolean(checked[item.id])}
              onChange={() => setChecked((state) => ({ ...state, [item.id]: !state[item.id] }))}
              className="mt-1 accent-violet-500"
            />
            <span>
              <span className="flex items-center gap-2 font-semibold text-white">
                {checked[item.id] ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : null}
                {item.title}
              </span>
              <span className="text-sm text-white/52">{item.meta}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
