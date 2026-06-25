import { Gamepad2, Radio, Trophy, Users, Video } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { HeroField } from "@/components/HeroField";
import { HomeCountdown, HomeHeroCopy } from "@/components/HomeHeroClient";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductGridClient } from "@/components/ProductGridClient";
import { Section } from "@/components/Section";
import { TrailerSectionClient } from "@/components/TrailerSectionClient";
import { articles, communityPosts, games } from "@/lib/content";

export default function HomePage() {
  const game = games[0];
  const trending = articles.filter((article) => article.kind === "news" || article.kind === "guide");

  return (
    <>
      <section className="relative overflow-hidden">
        <HeroField />
        <div className="mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-ember/25 bg-ember/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-ember">
              Premium Gaming Companion
            </p>
            <HomeHeroCopy />
          </div>
          <div className="glass gradient-border rounded-lg p-5">
            <div className="theme-cinematic rounded-lg border border-white/10 p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.22em] text-ion">Live countdown</span>
                <Gamepad2 className="h-5 w-5 text-ember" />
              </div>
              <h2 className="mb-5 text-2xl font-black">{game.shortTitle} Launch Window</h2>
              <HomeCountdown fallback={game.releaseDate} />
              <p className="mt-5 text-sm leading-6 text-white/58">{game.overview}</p>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Featured Game" title="Built As A Complete Ecosystem">
        <div className="grid gap-4 md:grid-cols-4">
          {game.stats.map((stat) => (
            <div key={stat.label} className="glass rounded-lg p-5">
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-white/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Editorial" title="Trending News And Latest Guides">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trending.map((article) => <ArticleCard key={article.slug} article={article} />)}
        </div>
      </Section>

      <TrailerSectionClient />

      <Section eyebrow="Community" title="Top Discussions, Videos, And Releases">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="glass rounded-lg p-5 lg:col-span-2">
            <div className="grid gap-3">
              {communityPosts.map((post) => (
                <div key={post.title} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] p-4">
                  <div>
                    <p className="font-semibold text-white">{post.title}</p>
                    <p className="text-sm text-white/50">by {post.author} • {post.replies} replies</p>
                  </div>
                  <span className="rounded-full bg-pulse/15 px-3 py-1 text-xs text-pulse">{post.heat}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-lg p-5">
            <div className="grid gap-4">
              {[
                { icon: Radio, label: "Upcoming Releases", value: "6 tracked" },
                { icon: Video, label: "Latest Videos", value: "18 queued" },
                { icon: Trophy, label: "Rewards", value: "Future ready" },
                { icon: Users, label: "Community", value: "Profiles + badges" }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-ember" />
                  <span><b>{item.label}</b><br /><span className="text-sm text-white/55">{item.value}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Monetization" title="Partner Brands And Premium Commerce">
        <ProductGridClient mode="featured" />
      </Section>

      <Section eyebrow="Newsletter" title="Get Spoiler-Safe Dispatches">
        <NewsletterForm />
      </Section>
    </>
  );
}
