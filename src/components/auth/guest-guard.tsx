"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { LoadingScreen } from "@/src/components/auth/loading-screen";
import {
  isForbiddenError,
  isUnauthorizedError,
} from "@/src/lib/api/error";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";

export function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const {
    data,
    error,
    isLoading,
    isFetching,
    isUninitialized,
  } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const anonymous = isUnauthorizedError(error) || isForbiddenError(error);
  const authenticated = Boolean(data?.data) && !error;
  const checking =
    isUninitialized ||
    isLoading ||
    (isFetching && !data && !error);

  useEffect(() => {
    if (!checking && authenticated) {
      router.replace("/profile/personal");
    }
  }, [authenticated, checking, router]);

  if (checking || authenticated) {
    return (
      <LoadingScreen
        label={authenticated ? "Opening your account" : "Checking your session"}
      />
    );
  }

  // Guest pages are public. A temporary session-service failure must not make
  // login, registration, OTP, or password recovery unreachable.
  if (anonymous || error) return children;

  return children;
}
