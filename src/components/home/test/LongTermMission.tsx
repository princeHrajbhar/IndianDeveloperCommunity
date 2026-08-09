"use client";

// Standalone transparent module: LongTermMission

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

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-3 w-3"
      aria-hidden="true"
    >
      <path
        d="m5.5 10.2 2.7 2.7 6.2-6.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LongTermMission() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-white sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{
            opacity: 0,
            x: -25,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.85,
          }}
          className="relative min-h-[480px] overflow-hidden rounded-[2rem] border border-white/[0.08] p-7"
        >

          <div className="relative flex h-full min-h-[420px] items-center justify-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 32,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-20 rounded-full border border-dashed border-cyan-300/10"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 21,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-12 rounded-full border border-cyan-300/12"
              />

              <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-cyan-300/20 shadow-[0_0_80px_rgba(34,211,238,0.18)]">
                <Image
                  src="/quantumfinix-mark.png"
                  alt="QuantumFinix logo"
                  width={240}
                  height={240}
                  className="h-36 w-36 object-contain"
                />
              </div>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-2">
              {[
                ["Founded", "2026"],
                ["Stage", "Founding year"],
                ["Direction", "AI + software"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/[0.07] p-3 text-center"
                >
                  <p className="text-[8px] uppercase tracking-[0.16em] text-slate-600">
                    {label}
                  </p>

                  <p className="mt-2 text-xs font-semibold text-cyan-100">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 25,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.85,
          }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-cyan-100/70">
            A new company with a long-term mission
          </div>

          <h2 className="mt-6 text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            Engineers, designers and strategists
            <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              thinking as one team.
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-400">
            QuantumFinix was founded in 2026 to build useful AI
            software and create a research-led environment for future
            innovation. The company is currently in its founding
            stage, developing its capabilities, project laboratory and
            early collaboration network.
          </p>

          <p className="mt-5 text-sm leading-7 text-slate-500">
            Our mission is to make advanced technology practical,
            understandable and responsibly connected to real
            organizational and human needs.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Practical AI implementation",
              "Product and software engineering",
              "Student and research participation",
              "Transparent founding-year growth",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] px-4 py-3 text-sm text-slate-300"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/15 text-cyan-200">
                  <CheckIcon />
                </span>

                {item}
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-cyan-100"
          >
            Read the QuantumFinix story

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/15 transition group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
    </section>
  );
}
