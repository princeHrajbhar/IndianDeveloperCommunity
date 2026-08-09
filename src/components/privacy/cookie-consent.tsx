"use client";

import { useEffect, useState } from "react";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";

const STORAGE_KEY = "qf-cookie-consent-v1";
type ConsentChoice = "necessary" | "recommended" | "all";

function hasStatus(error: unknown, status: number): boolean {
  return Boolean(error && typeof error === "object" && "status" in error && (error as { status?: unknown }).status === status);
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const session = useGetMeQuery(undefined, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (session.isLoading || session.isFetching) return;
    const authenticated = Boolean(session.data?.data);
    const anonymous = hasStatus(session.error, 401) || hasStatus(session.error, 403);
    if (authenticated) {
      setVisible(false);
      return;
    }
    if (anonymous && !window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, [session.data, session.error, session.isFetching, session.isLoading]);

  function save(choice: ConsentChoice) {
    const preferences = {
      choice,
      necessary: true,
      preferences: choice !== "necessary",
      analytics: choice !== "necessary",
      marketing: choice === "all",
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    document.cookie = `qf_cookie_consent=${choice}; Max-Age=31536000; Path=/; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent("qf-cookie-consent", { detail: preferences }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl dark:border-white/10 dark:bg-slate-950 dark:text-white sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 id="cookie-title" className="text-lg font-black">Your cookie choices</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Necessary cookies keep QuantumFinix secure and working. You can also allow recommended cookies for preferences and anonymous analytics, or allow all cookies.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:max-w-md lg:justify-end">
            <button type="button" onClick={() => save("necessary")} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold transition hover:bg-slate-100 dark:border-white/15 dark:hover:bg-white/5">Reject optional cookies</button>
            <button type="button" onClick={() => save("recommended")} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">Accept recommended</button>
            <button type="button" onClick={() => save("all")} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold transition hover:bg-slate-100 dark:border-white/15 dark:hover:bg-white/5">Accept all</button>
          </div>
        </div>
      </div>
    </div>
  );
}
