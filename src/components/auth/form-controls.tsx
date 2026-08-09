"use client";

import { useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react";

export const authInputClass =
  "h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-300/35 focus:bg-white/[0.04] focus:ring-4 focus:ring-cyan-300/[0.055] disabled:cursor-not-allowed disabled:opacity-60";

export function AuthField({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={htmlFor} className="text-xs font-semibold text-slate-300">{label}</label>
        {hint ? <span className="text-[10px] text-slate-600">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="mt-2 text-xs leading-5 text-rose-300">{error}</p> : null}
    </div>
  );
}

export function PasswordInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input {...props} type={visible ? "text" : "password"} className={`${authInputClass} pr-20 ${props.className ?? ""}`} />
      <button
        type="button"
        onClick={() => setVisible((value) => !value)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 transition hover:text-cyan-200"
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export function AuthButton({ loading, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="flex h-12 w-full items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-300 px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" /> : children}
    </button>
  );
}

export function StatusBanner({ type, children }: { type: "error" | "success" | "info"; children: ReactNode }) {
  const styles = {
    error: "border-rose-300/20 bg-rose-300/[0.06] text-rose-200",
    success: "border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-200",
    info: "border-cyan-300/20 bg-cyan-300/[0.05] text-cyan-100",
  }[type];

  return <div role={type === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm leading-6 ${styles}`}>{children}</div>;
}

export function passwordMeetsPolicy(password: string): boolean {
  return (
    password.length >= 8 &&
    password.length <= 128 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}
