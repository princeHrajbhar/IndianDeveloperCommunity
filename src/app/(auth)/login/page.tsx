"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";

import { LoadingScreen } from "@/src/components/auth/loading-screen";
import { AuthButton, AuthField, PasswordInput, StatusBanner, authInputClass } from "@/src/components/auth/form-controls";
import { AuthShell } from "@/src/components/auth/auth-shell";
import { AuthMethodDivider, GoogleAuthButton } from "@/src/components/auth/google-auth-button";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useLazyGetMeQuery, useLoginMutation } from "@/src/lib/features/auth/auth-api";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingScreen label="Preparing account page" />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();
  const [getMe, sessionCheck] = useLazyGetMeQuery();
  const [error, setError] = useState("");
  const [values, setValues] = useState({ email: "", password: "" });

  const destination = (() => {
    const requested = searchParams.get("next");
    return requested?.startsWith("/") && !requested.startsWith("//")
      ? requested
      : "/profile/personal";
  })();

  async function finishAuthentication() {
    router.replace(destination);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await login({ email: values.email.trim().toLowerCase(), password: values.password }).unwrap();
      await getMe(undefined, false).unwrap();

      await finishAuthentication();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your"
      accent="QuantumFinix account."
      description="Choose Google for a faster sign-in, or continue with your email and password."
      footer={<>New to QuantumFinix? <Link href="/register" className="font-semibold text-cyan-300 hover:text-cyan-200">Create an account</Link></>}
    >
      <div className="space-y-5">
        <GoogleAuthButton mode="signin" onAuthenticated={finishAuthentication} />
        <AuthMethodDivider />
        <form onSubmit={submit} className="space-y-5">
        {searchParams.get("verified") === "true" ? <StatusBanner type="success">Your email is verified. You can sign in now.</StatusBanner> : null}
        {searchParams.get("reset") === "true" ? <StatusBanner type="success">Password reset successful. Sign in with your new password.</StatusBanner> : null}
        {error ? <StatusBanner type="error">{error}</StatusBanner> : null}

        <AuthField label="Email address" htmlFor="email">
          <input id="email" name="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))} className={authInputClass} placeholder="you@example.com" />
        </AuthField>

        <AuthField label="Password" htmlFor="password" hint="Case sensitive">
          <PasswordInput id="password" name="password" autoComplete="current-password" required maxLength={128} value={values.password} onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))} placeholder="Enter your password" />
        </AuthField>

        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-xs font-semibold text-cyan-300/80 hover:text-cyan-200">Forgot password?</Link>
        </div>

          <AuthButton type="submit" loading={isLoading || sessionCheck.isFetching}>
            {sessionCheck.isFetching ? "Verifying session" : "Sign in securely"}
          </AuthButton>
        </form>
      </div>
    </AuthShell>
  );
}
