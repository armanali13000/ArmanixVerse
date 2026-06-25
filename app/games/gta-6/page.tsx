import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AIAssistant } from "@/components/AIAssistant";
import { ArticleCard } from "@/components/ArticleCard";
import { Countdown } from "@/components/Countdown";
import { Section } from "@/components/Section";
import { TrailerSectionClient } from "@/components/TrailerSectionClient";
import { Tracker } from "@/components/Tracker";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { getGame, getGameArticles, mapMarkers, site } from "@/lib/content";

const game = getGame("gta-6");

export const metadata: Metadata = {
  title: "GTA VI Companion Hub",
  description: "GTA VI guides, news, missions, vehicles, weapons, achievements, collectibles, AI help, and progress tracking.",
  alternates: { canonical: "/games/gta-6" },
  openGraph: {
    title: "GTA VI Companion Hub",
    description: "Track progress, compare editions, browse guides, and prepare for GTA VI with ArmanixVerse."
  }
};

export default function GtaSixPage() {
  if (!game) notFound();
  const articles = getGameArticles(game.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(139,92,246,.34),transparent_30%),radial-gradient(circle_at_84%_12%,rgba(251,146,60,.24),transparent_26%),linear-gradient(135deg,#11131a,#050508)]" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember">Game Ecosystem</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">{game.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">{game.overview}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {game.stats.map((stat) => (
                <div key={stat.label} className="glass rounded-lg p-4">
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-sm text-white/55">{stat.label}</p>
                </div>
              ))}
            </div>
            <a href={site.officialGtaUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full border border-ember/30 bg-ember/10 px-5 py-3 font-bold text-ember">
              Visit Official GTA VI Website
            </a>
          </div>
          <div className="glass rounded-lg p-5">
            <p className="mb-4 text-sm font-semibold text-white/70">Live release countdown</p>
            <Countdown target={game.releaseDate} />
            <div className="mt-5 flex flex-wrap gap-2">
              {game.platform.map((platform) => (
                <span key={platform} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{platform}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Editions" title="Compare Editions">
        <div className="grid gap-5 md:grid-cols-3">
          {game.editions.map((edition) => (
            <div key={edition.name} className="glass rounded-lg p-5">
              <h3 className="text-xl font-black">{edition.name}</h3>
              <p className="mt-1 text-sm text-ember">{edition.price}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/65">
                {edition.includes.map((item) => <li key={item}>• {item}</li>)}
              </ul>
              <p className="mt-5 rounded-md bg-white/5 p-3 text-sm text-white/70">{edition.bestFor}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Release Information" title="Platforms And Requirements">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="glass rounded-lg p-5">
            <h3 className="text-xl font-black">Confirmed Platforms</h3>
            <p className="mt-3 text-sm leading-6 text-white/62">Rockstar lists PlayStation 5 and Xbox Series X|S on the official GTA VI page.</p>
          </div>
          <ComingSoonCard title="PC Version" detail="Coming Soon. Official PC details have not yet been announced." />
          <ComingSoonCard title="System Requirements" detail="Coming Soon. Official system requirements have not yet been announced." />
        </div>
      </Section>

      <Section eyebrow="News And Guides" title="Latest GTA VI Coverage">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => <ArticleCard key={article.slug} article={article} />)}
        </div>
      </Section>

      <TrailerSectionClient />

      <Section eyebrow="Characters" title="Key People">
        <div className="grid gap-5 md:grid-cols-3">
          {game.characters.map((character) => (
            <div key={character.name} className="glass rounded-lg p-5">
              <p className="text-xl font-black">{character.name}</p>
              <p className="mt-1 text-sm text-ion">{character.role}</p>
              <p className="mt-4 text-sm leading-6 text-white/62">{character.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Interactive Map" title="Spoiler-Safe Leonida Layers">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div className="glass min-h-[420px] rounded-lg p-4">
            <div className="relative h-full min-h-[390px] overflow-hidden rounded-md border border-white/10 bg-[radial-gradient(circle_at_25%_30%,rgba(56,189,248,.26),transparent_20%),radial-gradient(circle_at_70%_65%,rgba(251,146,60,.24),transparent_22%),linear-gradient(135deg,#0a1620,#150b22)]">
              {mapMarkers.map((marker) => (
                <span
                  key={marker.id}
                  className="absolute rounded-full border border-white/20 bg-black/50 px-3 py-2 text-xs font-semibold backdrop-blur"
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                >
                  {marker.title} <em className="ml-1 not-italic text-ember">{marker.status}</em>
                </span>
              ))}
              <div className="absolute inset-x-6 bottom-6 grid gap-2 sm:grid-cols-4">
                {["Missions", "Collectibles", "Businesses", "Safehouses"].map((layer) => (
                  <button key={layer} className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold">{layer}</button>
                ))}
              </div>
            </div>
          </div>
          <AIAssistant />
        </div>
      </Section>

      <Section eyebrow="Compare" title="Vehicles And Weapons">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="glass rounded-lg p-5">
            <h3 className="mb-4 text-xl font-black">Vehicles</h3>
            <div className="space-y-3">
              {game.vehicles.map((vehicle) => (
                <div key={vehicle.name} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex justify-between gap-4"><b>{vehicle.name}</b><span className="text-sm text-ion">{vehicle.className}</span></div>
                  <p className="mt-2 text-sm text-white/55">{vehicle.utility}</p>
                  <p className="mt-2 text-xs text-white/45">{vehicle.className === "Coming Soon" ? "Stats coming soon" : `Speed ${vehicle.speed} • Handling ${vehicle.handling}`}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-lg p-5">
            <h3 className="mb-4 text-xl font-black">Weapons</h3>
            <div className="space-y-3">
              {game.weapons.map((weapon) => (
                <div key={weapon.name} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex justify-between gap-4"><b>{weapon.name}</b><span className="text-sm text-ember">{weapon.category}</span></div>
                  <p className="mt-2 text-sm text-white/55">{weapon.bestUse}</p>
                  <p className="mt-2 text-xs text-white/45">{weapon.category === "Coming Soon" ? "Stats coming soon" : `Power ${weapon.power} • Control ${weapon.control}`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Progress" title="Mission, Achievement, And Collectible Trackers">
        <div className="grid gap-5 lg:grid-cols-3">
          <Tracker storageKey="av-gta6-missions" title="Mission Checklist" items={game.missions.map((mission) => ({ id: mission.id, title: mission.title, meta: `${mission.region} • ${mission.difficulty} • ${mission.reward}` }))} />
          <Tracker storageKey="av-gta6-achievements" title="Achievement Tracker" items={game.achievements.map((achievement) => ({ id: achievement.id, title: achievement.title, meta: `${achievement.points}G • ${achievement.requirement}` }))} />
          <Tracker storageKey="av-gta6-collectibles" title="Collectibles Tracker" items={game.collectibles.map((item) => ({ id: item.id, title: item.title, meta: `${item.region} • ${item.clue}` }))} />
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Frequently Asked Questions">
        <div className="grid gap-4 md:grid-cols-3">
          {game.faqs.map((faq) => (
            <div key={faq.question} className="glass rounded-lg p-5">
              <h3 className="font-bold">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{faq.answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm leading-6 text-white/55">{site.notice}</p>
      </Section>
    </>
  );
}
