"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export const inputClass =
  "h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/[0.14] focus:border-cyan-300/45 focus:bg-white/[0.04] focus:ring-4 focus:ring-cyan-300/[0.06]";

export const textareaClass = `${inputClass} min-h-32 resize-y py-3 leading-6`;

export function PageHeading({
  eyebrow,
  title,
  accent,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  action?: ReactNode;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.header
      initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/70">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">
          {title}
          {accent ? <span className="block text-cyan-300">{accent}</span> : null}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          {description}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </motion.header>
  );
}

export function Panel({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.section
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.018] ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </motion.section>
  );
}

export function PanelHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h2 className="text-lg font-bold tracking-[-0.025em] text-white">{title}</h2>
        {description ? (
          <p className="mt-1.5 text-sm leading-6 text-slate-500">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-400">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-2 block text-xs leading-5 text-slate-600">{hint}</span> : null}
    </label>
  );
}

export function PrimaryButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex h-11 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-300 px-5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}

export function SecondaryButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.025] px-5 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/25 hover:text-cyan-200 ${className}`}
    />
  );
}

export function StatusBadge({
  children,
  tone = "cyan",
}: {
  children: ReactNode;
  tone?: "cyan" | "amber" | "emerald" | "slate" | "rose";
}) {
  const tones = {
    cyan: "border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-200",
    amber: "border-amber-300/20 bg-amber-300/[0.07] text-amber-200",
    emerald: "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200",
    slate: "border-white/[0.1] bg-white/[0.03] text-slate-400",
    rose: "border-rose-300/20 bg-rose-300/[0.07] text-rose-200",
  };

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="px-6 py-14 text-center">
      <span className="mx-auto block h-10 w-10 rounded-full border border-dashed border-cyan-300/30" />
      <h3 className="mt-5 font-bold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
