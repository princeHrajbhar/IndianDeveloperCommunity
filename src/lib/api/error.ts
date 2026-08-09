import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ErrorPayload {
  message?: unknown;
  error?: { message?: unknown };
  issues?: Array<{ message?: unknown }>;
  errors?: Array<{ message?: unknown; field?: unknown }>;
}

export function getApiErrorMessage(error: unknown): string {
  if (!error) return "Something went wrong. Please try again.";

  if (typeof error === "string") return error;

  if (isFetchBaseQueryError(error)) {
    if (typeof error.data === "string" && error.data.trim()) return error.data;

    const payload = error.data as ErrorPayload | undefined;
    if (typeof payload?.message === "string") return payload.message;
    if (typeof payload?.error?.message === "string") return payload.error.message;

    const issue = payload?.issues?.find((item) => typeof item.message === "string");
    if (typeof issue?.message === "string") return issue.message;

    const validationError = payload?.errors?.find((item) => typeof item.message === "string");
    if (typeof validationError?.message === "string") return validationError.message;

    if (error.status === "FETCH_ERROR") {
      return "Unable to reach the API. Check that the backend is running.";
    }

    if (error.status === 429) return "Too many requests. Please wait and try again.";
  }

  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return Boolean(error && typeof error === "object" && "status" in error);
}

export function isUnauthorizedError(error: unknown): boolean {
  return isFetchBaseQueryError(error) && error.status === 401;
}

export function isForbiddenError(error: unknown): boolean {
  return isFetchBaseQueryError(error) && error.status === 403;
}
