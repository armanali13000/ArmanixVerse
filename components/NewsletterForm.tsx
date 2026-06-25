"use client";

import { useState } from "react";
import { saveRecord } from "@/lib/db";

export function NewsletterForm({ source = "homepage" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Enter a valid email address.");
      return;
    }
    await saveRecord("newsletterSubscribers", {
      email,
      source,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "published"
    });
    setEmail("");
    setMessage("Subscribed. You are on the spoiler-safe list.");
  }

  return (
    <form onSubmit={submit} className="glass flex flex-col gap-3 rounded-lg p-4 sm:flex-row">
      <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="you@example.com" className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
      <button className="rounded-md bg-white px-6 py-3 font-bold text-black">Join Newsletter</button>
      {message ? <p className="self-center text-sm text-white/65">{message}</p> : null}
    </form>
  );
}
