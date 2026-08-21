"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function AuthShell({
  eyebrow,
  title,
  accent,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] px-5 py-8 text-white sm:px-7 lg:px-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[-12rem] h-[30rem] w-[30rem] rounded-full bg-cyan-400/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-16rem] right-[-10rem] h-[36rem] w-[36rem] rounded-full bg-blue-500/[0.06] blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_96%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[1240px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#050a14]/80 shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[0.92fr_1.08fr]">
          <motion.section
            initial={reduceMotion ? undefined : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden min-h-[720px] overflow-hidden border-r border-white/[0.08] p-10 lg:flex lg:flex-col"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
            <Link href="/" className="inline-flex items-center gap-4" aria-label="QuantumFinix home">
              <span className="relative h-16 w-16 overflow-hidden">
                <Image src="/logo.png" alt="QuantumFinix logo" fill priority sizes="64px" className="object-contain" />
              </span>
              <span>
                <span className="block text-xl font-black tracking-[-0.04em]">Quantum<span className="text-cyan-300">Finix</span></span>
                <span className="mt-1 block text-[9px] uppercase tracking-[0.22em] text-cyan-300/45">Innovate intelligently</span>
              </span>
            </Link>

            <div className="my-auto max-w-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/65">Secure account access</p>
              <h2 className="mt-5 text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white">
                Build skills.
                <span className="block text-cyan-300">Create opportunities.</span>
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                Access your profile, documents, applications, courses, notifications and support from one protected workspace.
              </p>

              <div className="mt-10 grid gap-4">
                {[
                  ["01", "HTTP-only session cookies"],
                  ["02", "Automatic access-token refresh"],
                  ["03", "Verified email onboarding"],
                ].map(([number, label]) => (
                  <div key={number} className="flex items-center gap-4 border-t border-white/[0.07] pt-4">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-300/45">{number}</span>
                    <span className="text-sm text-slate-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-700">Protected by QuantumFinix account security</p>
          </motion.section>

          <motion.section
            initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[680px] items-center p-5 sm:p-8 lg:p-12"
          >
            <div className="mx-auto w-full max-w-lg">
              <Link href="/" className="mb-10 inline-flex items-center gap-3 lg:hidden" aria-label="QuantumFinix home">
                <span className="relative h-12 w-12 overflow-hidden">
                  <Image src="/logo.png" alt="QuantumFinix logo" fill priority sizes="48px" className="object-contain" />
                </span>
                <span className="text-lg font-black">Quantum<span className="text-cyan-300">Finix</span></span>
              </Link>

              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/65">{eyebrow}</p>
              <h1 className="mt-4 text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl">
                {title}
                <span className="block text-cyan-300">{accent}</span>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">{description}</p>

              <div className="mt-8">{children}</div>
              {footer ? <div className="mt-7 text-center text-sm text-slate-500">{footer}</div> : null}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
