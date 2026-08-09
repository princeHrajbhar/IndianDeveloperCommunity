"use client";

import Link from "next/link";

import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";

export function PublicAccountLink({ className }: { className: string }) {
  const { data, isLoading, isFetching } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const authenticated = Boolean(data?.data);
  const checking = !authenticated && (isLoading || isFetching);

  return (
    <Link
      href={authenticated ? "/profile/personal" : "/login"}
      className={className}
      aria-label={
        authenticated
          ? "Open your QuantumFinix profile"
          : "Sign in to your QuantumFinix account"
      }
    >
      {checking ? "Account" : authenticated ? "My Profile" : "Login"}
    </Link>
  );
}
