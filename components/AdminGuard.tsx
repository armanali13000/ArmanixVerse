"use client";

import Link from "next/link";
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
          <p className="text-xs font-black uppercase tracking-[0.3em] text-ember">Protected Admin</p>
          <h1 className="mt-4 text-4xl font-black">Admin access required</h1>
          <p className="mt-4 text-white/62">Sign in with the email configured in `NEXT_PUBLIC_ADMIN_EMAIL`, or assign the user an `admin` role in the `users` collection.</p>
          {error ? <p className="mt-4 rounded-md border border-ember/20 bg-ember/10 p-3 text-sm text-ember">{error}</p> : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={loginGoogle} className="rounded-full bg-white px-5 py-3 font-bold text-black">Continue with Google</button>
            <Link href="/account" className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-bold">Email login</Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
