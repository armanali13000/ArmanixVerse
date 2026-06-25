"use client";

import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { getFirebaseServices, hasFirebaseConfig } from "@/lib/firebase";

export type Role = "admin" | "editor" | "user";

type AuthContextValue = {
  user: User | null;
  role: Role;
  loading: boolean;
  error: string;
  isAdmin: boolean;
  loginGoogle: () => Promise<void>;
  loginEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function adminEmail() {
  return process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase().trim();
}

async function syncRole(user: User): Promise<Role> {
  const email = user.email?.toLowerCase() ?? "";
  const fallbackRole: Role = email && email === adminEmail() ? "admin" : "user";

  if (!hasFirebaseConfig()) return fallbackRole;

  const { db } = getFirebaseServices();
  const userRef = doc(db, "users", user.uid);
  const existing = await getDoc(userRef);
  const role = (existing.data()?.role as Role | undefined) ?? fallbackRole;
  await setDoc(
    userRef,
    {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.photoURL,
      role,
      status: "published",
      updatedAt: new Date().toISOString(),
      createdAt: existing.data()?.createdAt ?? new Date().toISOString()
    },
    { merge: true }
  );
  return role;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>("user");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hasFirebaseConfig()) {
      setLoading(false);
      return;
    }
    const { auth } = getFirebaseServices();
    return onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setRole(nextUser ? await syncRole(nextUser) : "user");
      setLoading(false);
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role,
      loading,
      error,
      isAdmin: role === "admin",
      async loginGoogle() {
        setError("");
        if (!hasFirebaseConfig()) {
          setError("Firebase environment variables are required for Google login.");
          return;
        }
        const { auth } = getFirebaseServices();
        const credential = await signInWithPopup(auth, new GoogleAuthProvider());
        setUser(credential.user);
        setRole(await syncRole(credential.user));
      },
      async loginEmail(email, password) {
        setError("");
        if (!hasFirebaseConfig()) {
          setError("Firebase environment variables are required for email login.");
          return;
        }
        const { auth } = getFirebaseServices();
        try {
          const credential = await signInWithEmailAndPassword(auth, email, password);
          setUser(credential.user);
          setRole(await syncRole(credential.user));
        } catch (loginError) {
          setError(loginError instanceof Error ? loginError.message : "Email login failed.");
        }
      },
      async logout() {
        if (!hasFirebaseConfig()) return;
        const { auth } = getFirebaseServices();
        await signOut(auth);
        setUser(null);
        setRole("user");
      }
    }),
    [error, loading, role, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
