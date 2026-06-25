"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Countdown } from "@/components/Countdown";
import { homepageSettings } from "@/lib/content";
import { listRecords } from "@/lib/db";
import type { HomepageSettings } from "@/lib/types";

export function HomeHeroCopy() {
  const [settings, setSettings] = useState<HomepageSettings>(homepageSettings);

  useEffect(() => {
    void listRecords<HomepageSettings>("homepageSections", [homepageSettings]).then((rows) => setSettings(rows[0] ?? homepageSettings));
  }, []);

  return (
    <>
      <h1 className="text-balance text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-8xl">{settings.heroTitle}</h1>
      <p className="mt-5 max-w-2xl text-xl leading-8 text-white/68">{settings.heroSubtitle}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {settings.ctaButtons.map((button) =>
          button.external ? (
            <a key={button.label} href={button.href} target="_blank" rel="noreferrer" className="rounded-full border border-ember/35 bg-ember/10 px-6 py-3 font-bold text-ember">{button.label}</a>
          ) : (
            <Link key={button.label} href={button.href} className="rounded-full border border-white/15 bg-white/10 px-6 py-3 font-bold text-white first:bg-white first:text-black">{button.label}</Link>
          )
        )}
      </div>
    </>
  );
}

export function HomeCountdown({ fallback }: { fallback: string }) {
  const [target, setTarget] = useState(fallback);

  useEffect(() => {
    void listRecords<HomepageSettings>("homepageSections", [homepageSettings]).then((rows) => setTarget(rows[0]?.countdownDate ?? fallback));
  }, [fallback]);

  return <Countdown target={target} />;
}
