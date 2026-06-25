"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/components/AuthProvider";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, error, loginGoogle } = useAuth();

  if (loading) {
    return <div className="mx-auto max-w-4xl px-4 py-20 text-white/65">Checking admin access...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="glass rounded-lg p-6">
          <Logo />
          <p className="text-xs font-black uppercase tracking-[0.3em] text-ember">Protected Admin</p>
          <h1 className="mt-4 text-4xl font-black">Admin access required</h1>
          <p className="mt-4 text-white/62">Use your approved admin Google account to manage ArmanixVerse content, products, trailers, and settings.</p>
          {error ? <p className="mt-4 rounded-md border border-ember/20 bg-ember/10 p-3 text-sm text-ember">{error}</p> : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={loginGoogle} className="rounded-full bg-white px-5 py-3 font-bold text-black"><span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">G</span>Login with Google</button>
            <Link href="/login" className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-bold">User login</Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
