"use client";

import React, { createContext, useEffect, useState, useCallback } from "react";
import { User, UserRole, AuthContextType, ProfileUpdate } from "./types";
import { isEmailSuspended, upsertKnownUser } from "@/lib/shared/crossAccountStore";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function readJson(response: Response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || "Something went wrong. Please try again.");
  }
  return data;
}

function trackKnownUser(user: User) {
  upsertKnownUser({ id: user.id, name: user.name, avatar: user.avatar, role: user.role });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // The session itself now lives in an httpOnly cookie the server set — this
  // just asks the server who that cookie belongs to, instead of trusting a
  // plaintext localStorage blob the client used to be able to edit itself.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        if (!cancelled) setUser(data.user ?? null);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await readJson(response);
      const loggedInUser: User = data.user;

      // Best-effort only: the admin "suspend user" list still lives in this
      // browser's localStorage rather than the real accounts table, so it
      // can't stop the same person from another device. That gap is tracked
      // separately (reconciling admin's user store with real accounts) — this
      // just keeps the existing suspend-on-login behavior working exactly as
      // it did before, rather than silently dropping it.
      if (isEmailSuspended(loggedInUser.email)) {
        await fetch("/api/auth/logout", { method: "POST" });
        throw new Error("This account has been suspended. Contact an administrator.");
      }

      trackKnownUser(loggedInUser);
      setUser(loggedInUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string, role: UserRole) => {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name, role }),
        });
        const data = await readJson(response);
        const newUser: User = data.user;
        trackKnownUser(newUser);
        setUser(newUser);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    await readJson(response);
  }, []);

  const deleteAccount = useCallback(async () => {
    await fetch("/api/auth/delete-account", { method: "POST" });
    setUser(null);
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    const response = await fetch("/api/auth/password-reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await readJson(response);
    return data.token as string;
  }, []);

  const resetPasswordWithToken = useCallback(async (token: string, newPassword: string) => {
    const response = await fetch("/api/auth/password-reset/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    await readJson(response);
  }, []);

  const requestEmailVerification = useCallback(async () => {
    const response = await fetch("/api/auth/email-verification/request", { method: "POST" });
    const data = await readJson(response);
    return data.code as string;
  }, []);

  const verifyEmail = useCallback(async (code: string) => {
    const response = await fetch("/api/auth/email-verification/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await readJson(response);
    setUser(data.user);
  }, []);

  const updateProfile = useCallback(async (updates: ProfileUpdate) => {
    const response = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });
    const data = await readJson(response);
    trackKnownUser(data.user);
    setUser(data.user);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    changePassword,
    deleteAccount,
    requestPasswordReset,
    resetPasswordWithToken,
    requestEmailVerification,
    verifyEmail,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
