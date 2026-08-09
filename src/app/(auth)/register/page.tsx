"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { AuthButton, AuthField, PasswordInput, StatusBanner, authInputClass, passwordMeetsPolicy } from "@/src/components/auth/form-controls";
import { AuthShell } from "@/src/components/auth/auth-shell";
import { AuthMethodDivider, GoogleAuthButton } from "@/src/components/auth/google-auth-button";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useRegisterMutation } from "@/src/lib/features/auth/auth-api";

export default function RegisterPage() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState("");
  const [values, setValues] = useState({ email: "", password: "", confirmPassword: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!passwordMeetsPolicy(values.password)) {
      setError("Password must include uppercase, lowercase, number and special character, with at least 8 characters.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await register({ email: values.email.trim().toLowerCase(), password: values.password }).unwrap();
      const email = response.data.email || values.email;
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  }

  return (
    <AuthShell
      eyebrow="Create your account"
      title="Start your"
      accent="QuantumFinix journey."
      description="Create your account instantly with Google, or use email and verify with a six-digit OTP."
      footer={<>Already registered? <Link href="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">Sign in</Link></>}
    >
      <div className="space-y-5">
        <GoogleAuthButton mode="signup" onAuthenticated={() => router.replace("/profile/personal")} />
        <AuthMethodDivider />
        <form onSubmit={submit} className="space-y-5">
        {error ? <StatusBanner type="error">{error}</StatusBanner> : null}

        <AuthField label="Email address" htmlFor="email">
          <input id="email" type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))} className={authInputClass} placeholder="you@example.com" />
        </AuthField>

        <AuthField label="Password" htmlFor="password" hint="8–128 characters">
          <PasswordInput id="password" autoComplete="new-password" required maxLength={128} value={values.password} onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))} placeholder="Create a strong password" />
        </AuthField>

        <AuthField label="Confirm password" htmlFor="confirmPassword">
          <PasswordInput id="confirmPassword" autoComplete="new-password" required maxLength={128} value={values.confirmPassword} onChange={(event) => setValues((current) => ({ ...current, confirmPassword: event.target.value }))} placeholder="Repeat your password" />
        </AuthField>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-xs leading-6 text-slate-500">
          Use at least one uppercase letter, lowercase letter, number and special character.
        </div>

          <AuthButton type="submit" loading={isLoading}>Create account with email</AuthButton>
        </form>
      </div>
    </AuthShell>
  );
}
