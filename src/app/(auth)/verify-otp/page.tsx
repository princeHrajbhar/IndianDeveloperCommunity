"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, type FormEvent } from "react";

import { LoadingScreen } from "@/src/components/auth/loading-screen";
import { AuthButton, AuthField, StatusBanner, authInputClass } from "@/src/components/auth/form-controls";
import { AuthShell } from "@/src/components/auth/auth-shell";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/src/lib/features/auth/auth-api";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<LoadingScreen label="Preparing account page" />}>
      <VerifyOtpForm />
    </Suspense>
  );
}

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = useMemo(() => searchParams.get("email") ?? "", [searchParams]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [values, setValues] = useState({ email: initialEmail, otp: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await verifyOtp({ email: values.email.trim().toLowerCase(), otp: values.otp }).unwrap();
      router.replace("/login?verified=true");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  }

  async function resend() {
    setError("");
    setMessage("");

    try {
      const response = await resendOtp({ email: values.email.trim().toLowerCase(), type: "REGISTER" }).unwrap();
      setMessage(response.message);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  }

  return (
    <AuthShell
      eyebrow="Email verification"
      title="Confirm your"
      accent="six-digit code."
      description="Enter the OTP sent to your email. The backend expires registration OTPs after five minutes."
      footer={<Link href="/register" className="font-semibold text-cyan-300 hover:text-cyan-200">Use a different account</Link>}
    >
      <form onSubmit={submit} className="space-y-5">
        {error ? <StatusBanner type="error">{error}</StatusBanner> : null}
        {message ? <StatusBanner type="success">{message}</StatusBanner> : null}

        <AuthField label="Email address" htmlFor="email">
          <input id="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))} className={authInputClass} />
        </AuthField>

        <AuthField label="Verification code" htmlFor="otp" hint="6 digits">
          <input id="otp" inputMode="numeric" autoComplete="one-time-code" required minLength={6} maxLength={6} pattern="[0-9]{6}" value={values.otp} onChange={(event) => setValues((current) => ({ ...current, otp: event.target.value.replace(/\D/g, "").slice(0, 6) }))} className={`${authInputClass} text-center font-mono text-xl tracking-[0.45em]`} placeholder="000000" />
        </AuthField>

        <AuthButton type="submit" loading={isLoading}>Verify email</AuthButton>

        <button type="button" disabled={isResending || !values.email.trim()} onClick={resend} className="h-11 w-full rounded-xl border border-white/[0.09] text-xs font-semibold text-slate-400 transition hover:border-cyan-300/20 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-50">
          {isResending ? "Sending new code..." : "Resend verification code"}
        </button>
      </form>
    </AuthShell>
  );
}
