"use client";

// Standalone transparent module: ProjectConversationsOpen

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M4 10h12m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectConversationsOpen() {
  return (
    <section className="relative overflow-hidden bg-transparent px-5 py-24 text-white sm:px-7 sm:py-28 lg:px-10 xl:px-16">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2.5rem] border border-cyan-300/20 px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-cyan-100/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-300" />
              </span>

              Project conversations open
            </div>

            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
              Have a software or AI
              <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                project in mind?
              </span>
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
              Tell us what you are building, what challenge you are
              facing and where you need technical support. We will help
              you identify a practical next step.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/book-consultation"
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-7 text-sm font-bold text-[#020711] shadow-[0_0_45px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/65 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />

                <span className="relative flex items-center gap-2">
                  Book a Free Consultation
                  <ArrowIcon />
                </span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-300/30"
              >
                Send Project Details
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] uppercase tracking-[0.17em] text-slate-600">
              {[
                "No sales pressure",
                "NDA available",
                "Clear technical recommendations",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/50" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative flex h-64 w-64 items-center justify-center">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-300/20"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-8 rounded-full border border-cyan-300/15"
              />

              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    "0 0 40px rgba(34,211,238,0.15)",
                    "0 0 90px rgba(34,211,238,0.32)",
                    "0 0 40px rgba(34,211,238,0.15)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="relative flex h-36 w-36 items-center justify-center rounded-[2.5rem] border border-cyan-300/25"
              >
                <Image
                  src="/quantumfinix-mark.png"
                  alt="QuantumFinix"
                  width={220}
                  height={220}
                  className="h-32 w-32 object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
