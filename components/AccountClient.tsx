"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { Bell, Bookmark, Cloud, Gamepad2 } from "lucide-react";
import { GoogleIcon } from "@/components/GoogleIcon";
import { Logo } from "@/components/Logo";
import { Wordmark } from "@/components/Wordmark";
import { useAuth } from "@/components/AuthProvider";

export function AccountClient() {
  const [email, setEmail] = useState("player@armanixverse.local");
  const [password, setPassword] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const { user, role, error, loginGoogle, loginEmail, logout } = useAuth();

  useEffect(() => {
    setBookmarks(JSON.parse(window.localStorage.getItem("av-bookmarks") ?? "[]") as string[]);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-ember">Player Account</p>
      <div className="mt-4">
        {user ? (
          <div className="flex flex-wrap items-end gap-3">
            <span className="text-4xl font-black">Your</span>
            <Wordmark className="h-auto w-[260px] max-w-full" />
            <span className="text-4xl font-black">Profile</span>
          </div>
        ) : (
          <h1 className="text-4xl font-black">Login To Your Gaming Companion</h1>
        )}
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="glass rounded-lg p-5">
          <Logo />
          {user?.photoURL ? <img src={user.photoURL} alt={user.displayName ?? "User avatar"} className="mt-6 h-16 w-16 rounded-full border border-white/15" /> : null}
          <p className="mt-4 text-sm text-white/60">
            {user ? `${user.email} - ${role}` : "Login to save guides, bookmark products, track progress, and personalize your gaming dashboard."}
          </p>
          {error ? <p className="mt-4 rounded-md border border-ember/20 bg-ember/10 p-3 text-sm text-ember">{error}</p> : null}
          {!user ? (
            <>
              <label className="mt-5 block text-sm text-white/55">Email</label>
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
              <label className="mt-4 block text-sm text-white/55">Password</label>
              <input value={password} type="password" onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
              <button onClick={() => loginEmail(email, password)} className="mt-4 w-full rounded-md bg-white px-4 py-3 font-bold text-black">Login</button>
              <button onClick={loginGoogle} className="mt-3 w-full rounded-md border border-white/10 bg-white/10 px-4 py-3 font-bold">
                <GoogleIcon className="mr-2 inline-block h-5 w-5 align-[-4px]" />
                Continue With Google
              </button>
            </>
          ) : (
            <button onClick={logout} className="mt-5 w-full rounded-md border border-ember/20 bg-ember/10 px-4 py-3 font-bold text-ember">Logout</button>
          )}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="glass rounded-lg p-5">
            <Bookmark className="mb-4 h-6 w-6 text-ion" />
            <h2 className="font-bold">Saved Guides</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">Bookmark walkthroughs, news, and accessory picks for quick access.</p>
          </div>
          <div className="glass rounded-lg p-5">
            <Bell className="mb-4 h-6 w-6 text-ember" />
            <h2 className="font-bold">Spoiler-Safe Alerts</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">Get guide updates, trailer embeds, product picks, and community replies.</p>
          </div>
          <div className="glass rounded-lg p-5">
            <Cloud className="mb-4 h-6 w-6 text-pulse" />
            <h2 className="font-bold">Progress Sync</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">Keep mission, collectible, achievement, and product saves ready for cloud sync.</p>
          </div>
          <div className="glass rounded-lg p-5">
            <Gamepad2 className="mb-4 h-6 w-6 text-ember" />
            <h2 className="font-bold">Player Dashboard</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">Your hub for GTA VI prep, gaming accessories, guides, and AI questions.</p>
          </div>
          <div className="glass rounded-lg p-5 md:col-span-2">
            <h2 className="font-bold">Bookmarked Articles</h2>
            <p className="mt-2 text-sm text-white/55">{bookmarks.length ? bookmarks.join(", ") : "No saved articles yet. Bookmark an article to see it here."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
