"use client";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

const trustItems = [
  "No sales pressure",
  "NDA available",
  "Practical recommendations",
];

export default function AIFinalCTASection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative overflow-hidden bg-transparent pb-12 pt-20 text-white sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative border-y border-white/[0.1] py-12 sm:py-16 lg:py-20"
        >
          {/* Decorative route */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent"
          />

          <motion.span
            aria-hidden="true"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: ["-20%", "110%"],
                  }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "linear",
            }}
            className="absolute top-[-2px] h-[3px] w-24 bg-gradient-to-r from-transparent via-cyan-200 to-transparent blur-[1px]"
          />

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-300 opacity-35" />
                  <span className="relative h-2.5 w-2.5 rounded-full border border-cyan-200 bg-cyan-300/30" />
                </span>

                <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-cyan-300/70">
                  Start with the use case
                </p>
              </div>

              <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-7xl">
                Have an AI use case
                <span className="block text-cyan-300">
                  in mind?
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                Tell us about the process you want to improve, the
                information you already have and the outcome you want
                to achieve.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                We will help you determine whether AI is the right
                solution and recommend a practical path from idea to
                implementation.
              </p>
            </div>

            <div className="lg:pb-1">
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/book-consultation"
                  className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-7 text-sm font-bold text-[#020711] shadow-[0_18px_55px_rgba(34,211,238,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(34,211,238,0.27)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  <span className="absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />

                  <span className="relative flex items-center gap-2">
                    Book an AI Consultation
                    <ArrowIcon />
                  </span>
                </Link>

                <Link
                  href="/contact?subject=AI%20Project%20Requirements"
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-7 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  Send Your Requirements

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                {trustItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/65" />

                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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