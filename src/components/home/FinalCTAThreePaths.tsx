"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Boxes,
  Megaphone,
  Sparkles,
  Wrench,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const choices = [
  {
    title: "Explore Solutions",
    description: "Buy something ready-made.",
    href: "/solutions",
    icon: Boxes,
    accent: "#1769ff",
    soft: "#eef5ff",
    number: "01",
  },
  {
    title: "Build My Solution",
    description: "Request something custom.",
    href: "/book-consultation",
    icon: Wrench,
    accent: "#0f4fbf",
    soft: "#edf3ff",
    number: "02",
  },
  {
    title: "Grow My Business",
    description: "Get marketing support.",
    href: "/digital-marketing",
    icon: Megaphone,
    accent: "#3b82f6",
    soft: "#f0f6ff",
    number: "03",
  },
];

export default function FinalCTAThreePaths() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white py-14 text-[#0b2a5f] sm:py-16 lg:py-20">
      {/* subtle background structure */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(23,105,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,105,255,.035) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "linear-gradient(to bottom, black, transparent 88%)",
          }}
        />

        <div className="absolute -right-32 -top-32 h-[320px] w-[320px] rounded-full bg-[#f1f6fd]" />
        <div className="absolute -bottom-36 -left-28 h-[300px] w-[300px] rounded-full bg-[#f5f9ff]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1420px] px-5 sm:px-7 lg:px-10 xl:px-16">
        {/* ============================================
            HEADER
        ============================================= */}
        <div className="mx-auto max-w-[980px] text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
            className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-[#d9e5f3] bg-[#f8fbff] px-4 py-2"
          >
            <Sparkles size={13} className="text-[#1769ff]" />

            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#1769ff]">
              Choose Your Next Step
            </span>
          </motion.div>

          <h2 className="mt-5 text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-[#0b2a5f]">
            Ready to Build,
            <span className="text-[#1769ff]"> Automate or Grow?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[650px] text-[15px] leading-7 text-[#6a84a7] sm:text-base">
            Pick the path that matches what you need right now.
          </p>
        </div>

        {/* ============================================
            THREE PATHS
        ============================================= */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.65, delay: 0.08, ease }}
          className="mx-auto mt-9 overflow-hidden rounded-[30px] border border-[#dbe6f2] bg-white shadow-[0_22px_60px_rgba(23,105,255,0.08)]"
        >
          <div className="grid lg:grid-cols-3">
            {choices.map((choice, index) => {
              const Icon = choice.icon;

              return (
                <motion.div
                  key={choice.title}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -4,
                        }
                  }
                  className={[
                    "group relative min-h-[250px] border-[#e0e8f2] p-5 sm:p-6 lg:p-7",
                    index < choices.length - 1
                      ? "border-b lg:border-b-0 lg:border-r"
                      : "",
                  ].join(" ")}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      backgroundColor: choice.soft,
                    }}
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-2xl"
                        style={{
                          backgroundColor: choice.soft,
                          color: choice.accent,
                        }}
                      >
                        <Icon size={18} />
                      </span>

                      <span className="text-xs font-black tracking-[0.12em] text-[#a0b3c8]">
                        {choice.number}
                      </span>
                    </div>

                    <div className="mt-7">
                      <h3 className="text-[24px] font-semibold tracking-[-0.035em] text-[#0b2a5f] sm:text-[28px]">
                        {choice.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#6a84a7]">
                        {choice.description}
                      </p>
                    </div>

                    <Link
                      href={choice.href}
                      className="mt-auto inline-flex min-h-[46px] items-center justify-between border-t border-[#e0e8f2] pt-5 text-sm font-bold text-[#1769ff]"
                    >
                      <span>{choice.title}</span>

                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* tiny closing line */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-5 text-center text-xs font-semibold text-[#8aa0b8]"
        >
          Ready-made solutions · Custom builds · Digital growth
        </motion.p>
      </div>
    </section>
  );
}