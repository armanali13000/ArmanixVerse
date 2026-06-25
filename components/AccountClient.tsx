"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { Bell, Cloud, UserCircle } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export function AccountClient() {
  const [email, setEmail] = useState("player@armanixverse.local");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const { user, role, error, loginGoogle, loginEmail, logout } = useAuth();

  useEffect(() => {
    setBookmarks(JSON.parse(window.localStorage.getItem("av-bookmarks") ?? "[]") as string[]);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-ember">User Account</p>
      <h1 className="mt-4 text-4xl font-black">Profile, Sync, And Preferences</h1>
      <div className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="glass rounded-lg p-5">
          <UserCircle className="h-16 w-16 text-pulse" />
          {user?.photoURL ? <img src={user.photoURL} alt={user.displayName ?? "User avatar"} className="mt-4 h-16 w-16 rounded-full border border-white/15" /> : null}
          <p className="mt-4 text-sm text-white/60">{user ? `${user.email} • ${role}` : "Sign in to sync bookmarks, products, progress, and admin roles."}</p>
          {error ? <p className="mt-4 rounded-md border border-ember/20 bg-ember/10 p-3 text-sm text-ember">{error}</p> : null}
          <label className="mt-5 block text-sm text-white/55">Display name</label>
          <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
          <label className="mt-4 block text-sm text-white/55">Email login</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
          <label className="mt-4 block text-sm text-white/55">Password</label>
          <input value={password} type="password" onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
          <button onClick={() => loginEmail(email, password, name)} className="mt-4 w-full rounded-md bg-white px-4 py-3 font-bold text-black">Continue With Email</button>
          <button onClick={loginGoogle} className="mt-3 w-full rounded-md border border-white/10 bg-white/10 px-4 py-3 font-bold">Continue With Google</button>
          {user ? <button onClick={logout} className="mt-3 w-full rounded-md border border-ember/20 bg-ember/10 px-4 py-3 font-bold text-ember">Logout</button> : null}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="glass rounded-lg p-5">
            <Cloud className="mb-4 h-6 w-6 text-ion" />
            <h2 className="font-bold">Firebase Sync Ready</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">Authentication, Firestore progress sync, Storage avatars, notifications, and preferences are modeled for production keys.</p>
          </div>
          <div className="glass rounded-lg p-5">
            <Bell className="mb-4 h-6 w-6 text-ember" />
            <h2 className="font-bold">Notifications</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">Spoiler-safe guide alerts, new article digests, achievement reminders, and community replies.</p>
          </div>
          <div className="glass rounded-lg p-5 md:col-span-2">
            <h2 className="font-bold">Saved Guides</h2>
            <p className="mt-2 text-sm text-white/55">{bookmarks.length ? bookmarks.join(", ") : "No saved articles yet. Bookmark an article to see it here."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
