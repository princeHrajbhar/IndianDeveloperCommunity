"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { AuthButton, AuthField, StatusBanner, authInputClass } from "@/src/components/auth/form-controls";
import { AuthShell } from "@/src/components/auth/auth-shell";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useForgotPasswordMutation } from "@/src/lib/features/auth/auth-api";

export default function ForgotPasswordPage() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await forgotPassword({ email: email.trim().toLowerCase() }).unwrap();
      setMessage(response.message);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Reset your"
      accent="account password."
      description="Enter your registered email. For privacy, the response remains the same whether or not the account exists."
      footer={<Link href="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">Return to sign in</Link>}
    >
      <form onSubmit={submit} className="space-y-5">
        {error ? <StatusBanner type="error">{error}</StatusBanner> : null}
        {message ? <StatusBanner type="success">{message}</StatusBanner> : null}

        <AuthField label="Registered email" htmlFor="email">
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className={authInputClass} placeholder="you@example.com" />
        </AuthField>

        <AuthButton type="submit" loading={isLoading}>Send reset link</AuthButton>
      </form>
    </AuthShell>
  );
}
