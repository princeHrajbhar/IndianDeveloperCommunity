"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";

import { LoadingScreen } from "@/src/components/auth/loading-screen";
import { AuthButton, AuthField, PasswordInput, StatusBanner, passwordMeetsPolicy } from "@/src/components/auth/form-controls";
import { AuthShell } from "@/src/components/auth/auth-shell";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useResetPasswordMutation } from "@/src/lib/features/auth/auth-api";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingScreen label="Preparing account page" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [values, setValues] = useState({ newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!token || !email || !/^[a-f0-9]{64}$/i.test(token)) {
      setError("This reset link is invalid or incomplete. Request a new password reset email.");
      return;
    }

    if (!passwordMeetsPolicy(values.newPassword)) {
      setError("Password must include uppercase, lowercase, number and special character, with at least 8 characters.");
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await resetPassword({ token, email, newPassword: values.newPassword }).unwrap();
      router.replace("/login?reset=true");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  }

  return (
    <AuthShell
      eyebrow="Choose a new password"
      title="Secure your"
      accent="QuantumFinix account."
      description={email ? `Create a new password for ${email}. The reset link is single-use and time limited.` : "Open the complete reset link from your email."}
      footer={<Link href="/forgot-password" className="font-semibold text-cyan-300 hover:text-cyan-200">Request another reset link</Link>}
    >
      <form onSubmit={submit} className="space-y-5">
        {error ? <StatusBanner type="error">{error}</StatusBanner> : null}
        {!token || !email ? <StatusBanner type="info">The URL must contain both token and email query parameters.</StatusBanner> : null}

        <AuthField label="New password" htmlFor="newPassword" hint="8–128 characters">
          <PasswordInput id="newPassword" autoComplete="new-password" required maxLength={128} value={values.newPassword} onChange={(event) => setValues((current) => ({ ...current, newPassword: event.target.value }))} />
        </AuthField>

        <AuthField label="Confirm new password" htmlFor="confirmPassword">
          <PasswordInput id="confirmPassword" autoComplete="new-password" required maxLength={128} value={values.confirmPassword} onChange={(event) => setValues((current) => ({ ...current, confirmPassword: event.target.value }))} />
        </AuthField>

        <AuthButton type="submit" loading={isLoading} disabled={!token || !email}>Reset password</AuthButton>
      </form>
    </AuthShell>
  );
}
