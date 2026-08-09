"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { LoadingScreen } from "@/src/components/auth/loading-screen";
import {
  isForbiddenError,
  isUnauthorizedError,
} from "@/src/lib/api/error";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";

export function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    data,
    error,
    isLoading,
    isFetching,
    isUninitialized,
    refetch,
  } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const user = data?.data;
  const authenticated = Boolean(user);
  const rejectedSession = isUnauthorizedError(error) || isForbiddenError(error);
  const initialCheck =
    isUninitialized ||
    isLoading ||
    (isFetching && !data && !error);

  useEffect(() => {
    if (!initialCheck && rejectedSession) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${next}`);
    }
  }, [initialCheck, pathname, rejectedSession, router]);

  if (initialCheck) {
    return <LoadingScreen label="Verifying your secure session" />;
  }

  if (rejectedSession) {
    return <LoadingScreen label="Redirecting to sign in" />;
  }

  // Fail closed: protected content is never rendered when the session API cannot
  // be verified, even when an older RTK Query response previously existed.
  if (error || !authenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#030712] px-5 text-white">
        <div className="max-w-md rounded-2xl border border-rose-300/20 bg-rose-300/[0.05] p-6 text-center">
          <h1 className="text-xl font-bold">Unable to verify your session</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            The protected account area remains locked until the backend confirms
            your session. Check the API server and cookie configuration, then retry.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => refetch()}
              className="h-11 rounded-xl bg-cyan-300 px-5 text-sm font-bold text-slate-950"
            >
              Retry secure check
            </button>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 px-5 text-sm font-semibold text-white hover:border-cyan-300/30"
            >
              Return home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (user?.mustChangePassword && pathname !== "/profile/security") {
    return (
      <div className="grid min-h-screen place-items-center bg-[#030712] px-5 text-white">
        <div className="max-w-lg rounded-3xl border border-amber-300/20 bg-amber-300/[0.05] p-8 text-center shadow-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">Security action required</p>
          <h1 className="mt-3 text-2xl font-black">Replace your temporary password</h1>
          <p className="mt-3 leading-7 text-slate-400">
            This account was created or reset by an administrator. Choose a private password before continuing to protected account features.
          </p>
          <Link href="/profile/security" className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-amber-300 px-5 text-sm font-black text-slate-950">
            Update password
          </Link>
        </div>
      </div>
    );
  }

  return children;
}
