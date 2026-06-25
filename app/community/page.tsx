import type { Metadata } from "next";
import { Trophy, Users } from "lucide-react";
import { CinematicPanel } from "@/components/CinematicPanel";
import { communityPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Community", description: "Profiles, comments, likes, badges, leaderboards, and future discussion forums.", alternates: { canonical: "/community" } };

export default function CommunityPage() {
  return (
    <>
      <CinematicPanel eyebrow="Community" title="The Player Network" body="Profiles, comments, likes, bookmarks, badges, leaderboards, and future discussion boards for every supported game.">
        <div className="grid gap-4">
          <div className="glass rounded-lg p-5"><Users className="mb-4 h-6 w-6 text-ion" /><b>Profiles + Badges</b><p className="mt-2 text-sm text-white/58">Identity, avatars, saved guides, and reputation systems.</p></div>
          <div className="glass rounded-lg p-5"><Trophy className="mb-4 h-6 w-6 text-ember" /><b>Leaderboards</b><p className="mt-2 text-sm text-white/58">Completion, collection, guide contribution, and future rewards.</p></div>
        </div>
      </CinematicPanel>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-3">{communityPosts.map((post) => <div key={post.title} className="glass rounded-lg p-5"><b>{post.title}</b><p className="mt-2 text-sm text-white/55">by {post.author} • {post.replies} replies • {post.heat}</p></div>)}</div>
      </section>
    </>
  );
}
