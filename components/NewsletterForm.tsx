"use client";

import { useState } from "react";
import { saveRecord } from "@/lib/db";

export function NewsletterForm({ source = "homepage" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await saveRecord("newsletterSubscribers", {
        email,
        source,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "published"
      });
      setEmail("");
      setMessage("Subscribed. You are on the spoiler-safe list.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Newsletter signup failed. Check Firestore rules.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="glass flex flex-col gap-3 rounded-lg p-4 md:flex-row">
      <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="you@example.com" className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
      <button disabled={loading} className="rounded-md bg-white px-6 py-3 font-bold text-black disabled:opacity-60">{loading ? "Joining..." : "Join Newsletter"}</button>
      {message ? <p className="text-sm text-white/65 md:self-center">{message}</p> : null}
    </form>
  );
}
