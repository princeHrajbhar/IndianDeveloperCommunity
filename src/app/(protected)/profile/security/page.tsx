"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { getApiErrorMessage } from "@/src/lib/api/error";
import { baseApi } from "@/src/lib/api/base-api";
import {
  useChangePasswordMutation,
  useGetSessionsQuery,
  useLogoutAllMutation,
} from "@/src/lib/features/auth/auth-api";
import { sessionCleared } from "@/src/lib/features/auth/auth-slice";
import { useAppDispatch } from "@/src/lib/hooks";
import {
  Field,
  PageHeading,
  Panel,
  PanelHeader,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
  inputClass,
} from "@/src/components/profile/profile-ui";

export default function SecurityPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading: sessionsLoading, refetch } = useGetSessionsQuery();
  const [changePassword, { isLoading: changingPassword }] = useChangePasswordMutation();
  const [logoutAll, { isLoading: loggingOutAll }] = useLogoutAllMutation();
  const [values, setValues] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (values.newPassword !== values.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const response = await changePassword(values).unwrap();
      setMessage(response.message);
      setValues({ currentPassword: "", newPassword: "", confirmPassword: "" });
      refetch();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  }

  async function signOutEverywhere() {
    setError("");
    setMessage("");

    try {
      await logoutAll().unwrap();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
      return;
    }

    dispatch(sessionCleared());
    dispatch(baseApi.util.resetApiState());
    router.replace("/login");
  }

  const sessions = data?.data.sessions ?? [];

  return (
    <>
      <PageHeading
        eyebrow="Account protection"
        title="Security and"
        accent="active sessions."
        description="Change your password, review signed-in devices and terminate every active account session."
      />

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Panel>
          <PanelHeader title="Change password" description="Changing your password keeps the current session and invalidates your other sessions." />
          <form onSubmit={submitPassword} className="space-y-5 p-5 sm:p-6">
            {error ? <div className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-200">{error}</div> : null}
            {message ? <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] px-4 py-3 text-sm text-emerald-200">{message}</div> : null}

            <Field label="Current password">
              <input type="password" autoComplete="current-password" required className={inputClass} value={values.currentPassword} onChange={(event) => setValues((current) => ({ ...current, currentPassword: event.target.value }))} />
            </Field>
            <Field label="New password" hint="At least 8 characters with uppercase, lowercase, number and special character.">
              <input type="password" autoComplete="new-password" required className={inputClass} value={values.newPassword} onChange={(event) => setValues((current) => ({ ...current, newPassword: event.target.value }))} />
            </Field>
            <Field label="Confirm new password">
              <input type="password" autoComplete="new-password" required className={inputClass} value={values.confirmPassword} onChange={(event) => setValues((current) => ({ ...current, confirmPassword: event.target.value }))} />
            </Field>

            <PrimaryButton type="submit" disabled={changingPassword}>
              {changingPassword ? "Updating password..." : "Update password"}
            </PrimaryButton>
          </form>
        </Panel>

        <Panel delay={0.05}>
          <PanelHeader
            title="Active sessions"
            description="Sessions are created at sign in and automatically expire after the backend session lifetime."
            action={<SecondaryButton type="button" onClick={() => refetch()} disabled={sessionsLoading}>Refresh</SecondaryButton>}
          />

          <div className="divide-y divide-white/[0.07]">
            {sessionsLoading ? (
              <div className="p-6 text-sm text-slate-500">Loading active sessions...</div>
            ) : sessions.length ? (
              sessions.map((session, index) => (
                <article key={session.id} className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-semibold text-white">{formatDevice(session.userAgent)}</p>
                        {index === 0 ? <StatusBadge tone="cyan">Recently active</StatusBadge> : null}
                      </div>
                      <p className="mt-2 break-all text-xs leading-5 text-slate-600">{session.userAgent || "Unknown browser"}</p>
                      <p className="mt-3 text-xs text-slate-500">IP: {session.ip || "Unavailable"}</p>
                    </div>
                    <div className="shrink-0 text-left text-xs leading-5 text-slate-600 sm:text-right">
                      <p>Last used</p>
                      <p className="text-slate-400">{formatDate(session.lastUsedAt)}</p>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="p-6 text-sm text-slate-500">No active sessions were returned.</div>
            )}
          </div>

          <div className="border-t border-white/[0.07] p-5 sm:p-6">
            <button type="button" onClick={signOutEverywhere} disabled={loggingOutAll} className="inline-flex h-11 items-center justify-center rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-5 text-sm font-semibold text-rose-200 transition hover:bg-rose-300/[0.1] disabled:cursor-not-allowed disabled:opacity-50">
              {loggingOutAll ? "Signing out..." : "Sign out from all devices"}
            </button>
          </div>
        </Panel>
      </div>
    </>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Unknown" : date.toLocaleString();
}

function formatDevice(userAgent?: string): string {
  if (!userAgent) return "Unknown device";
  if (/iphone|ipad/i.test(userAgent)) return "Apple mobile device";
  if (/android/i.test(userAgent)) return "Android device";
  if (/windows/i.test(userAgent)) return "Windows computer";
  if (/macintosh|mac os/i.test(userAgent)) return "Mac computer";
  if (/linux/i.test(userAgent)) return "Linux computer";
  return "Browser session";
}
