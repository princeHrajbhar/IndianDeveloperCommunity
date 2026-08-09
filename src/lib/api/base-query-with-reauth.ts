import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import { API_URL } from "@/src/lib/env";
import { sessionCleared } from "@/src/lib/features/auth/auth-slice";

const refreshMutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders(headers) {
    headers.set("Accept", "application/json");
    headers.set("X-Requested-With", "XMLHttpRequest");
    return headers;
  },
});

const noRefreshPaths = new Set([
  "/auth/login",
  "/auth/google",
  "/auth/register",
  "/auth/verify-otp",
  "/auth/resend-otp",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/refresh",
  "/auth/logout",
]);

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await refreshMutex.waitForUnlock();

  let result = await rawBaseQuery(withNoStore(args), api, extraOptions);

  if (!shouldRefresh(args, result.error)) {
    return result;
  }

  if (!refreshMutex.isLocked()) {
    const release = await refreshMutex.acquire();

    try {
      const refreshResult = await rawBaseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          cache: "no-store",
        },
        api,
        extraOptions,
      );

      if (!refreshResult.error) {
        result = await rawBaseQuery(withNoStore(args), api, extraOptions);
      } else {
        api.dispatch(sessionCleared());
      }
    } finally {
      release();
    }
  } else {
    await refreshMutex.waitForUnlock();
    result = await rawBaseQuery(withNoStore(args), api, extraOptions);
  }

  // A 403 means the session is valid but the user lacks permission.
  // Only an unrecoverable 401 should clear the authenticated session.
  if (result.error?.status === 401) {
    api.dispatch(sessionCleared());
  }

  return result;
};

function shouldRefresh(
  args: string | FetchArgs,
  error: FetchBaseQueryError | undefined,
): boolean {
  if (error?.status !== 401) return false;

  const url = typeof args === "string" ? args : args.url;
  return !noRefreshPaths.has(normalizeApiPath(url));
}

function withNoStore(args: string | FetchArgs): FetchArgs {
  if (typeof args === "string") {
    return { url: args, cache: "no-store" };
  }

  return {
    ...args,
    cache: args.cache ?? "no-store",
  };
}

function normalizeApiPath(url: string): string {
  try {
    const pathname = new URL(url, `${API_URL}/`).pathname;
    return pathname.replace(/^\/api(?=\/)/, "");
  } catch {
    return url.split("?")[0] ?? url;
  }
}
