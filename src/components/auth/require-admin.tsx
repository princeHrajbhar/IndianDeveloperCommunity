"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { LoadingScreen } from "@/src/components/auth/loading-screen";
import { getApiErrorMessage, isUnauthorizedError } from "@/src/lib/api/error";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, error, isLoading, isFetching, refetch } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const user = data?.data;
  const checking = isLoading || (isFetching && !data && !error);

  useEffect(() => {
    if (!checking && isUnauthorizedError(error)) {
      router.replace("/login?next=%2Fdashboard");
    }
  }, [checking, error, router]);

  if (checking) return <LoadingScreen label="Verifying administrator access" />;
  if (isUnauthorizedError(error)) return <LoadingScreen label="Redirecting to sign in" />;

  if (error || !user) {
    return (
      <GuardMessage
        title="Unable to verify administrator access"
        description={getApiErrorMessage(error)}
        action={<button onClick={() => refetch()} className="rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950">Retry</button>}
      />
    );
  }

  if (user.mustChangePassword) {
    return (
      <GuardMessage
        title="Replace your temporary password"
        description="This administrator account is using a password set by another administrator. Update it before opening protected dashboard operations."
        action={<Link href="/profile/security" className="rounded-xl bg-amber-300 px-5 py-3 font-bold text-slate-950">Update password</Link>}
      />
    );
  }

  if (user.role !== "super-admin" && !user.permissions?.includes("dashboard.view")) {
    return (
      <GuardMessage
        title="Dashboard access required"
        description="Your current role does not include dashboard access. Contact a Super Admin if you need an operational module assigned."
        action={<Link href="/profile/personal" className="rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950">Open my profile</Link>}
      />
    );
  }

  return children;
}

function GuardMessage({ title, description, action }: { title: string; description: string; action: ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-[#030712] px-5 text-white">
      <div className="max-w-lg rounded-3xl border border-cyan-300/20 bg-white/[0.035] p-8 text-center shadow-2xl">
        <h1 className="text-2xl font-black">{title}</h1>
        <p className="mt-3 leading-7 text-slate-400">{description}</p>
        <div className="mt-6">{action}</div>
      </div>
    </div>
  );
}
