"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  Braces,
  Cable,
  Check,
  CheckCircle2,
  Code2,
  Database,
  FileCheck2,
  Gauge,
  Inbox,
  Layers3,
  Sparkles,
  Workflow,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const reasons = [
  "Your team is stuck doing repetitive manual work",
  "Your tools do not talk to each other",
  "Your workflow is too specific for off-the-shelf software",
  "You need a customer portal, internal platform or SaaS product",
];

const capabilities = [
  { label: "AI Agents", icon: Bot },
  { label: "Automation", icon: Workflow },
  { label: "Custom Software", icon: Code2 },
  { label: "Web Apps", icon: Braces },
  { label: "SaaS", icon: Boxes },
  { label: "API Integrations", icon: Cable },
];

const process = ["Problem", "Plan", "Build", "Launch"];

export default function CustomSoftwarePremiumDashboard() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white py-16 text-[#0b2242] sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0 opacity-[0.42]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(30,64,175,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(30,64,175,.035) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center xl:gap-16">
          {/* =====================================================
              LEFT — MESSAGE / DECISION
          ====================================================== */}
          <div className="max-w-[640px]">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#d8e5f5] bg-[#f7faff] px-4 py-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />

              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#2563eb]">
                Custom Software
              </span>
            </motion.div>

            <h2 className="mt-5 text-[clamp(2.9rem,5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#0b2242]">
              Don&apos;t See What You Need?
              <span className="mt-1 block text-[#2563eb]">
                We&apos;ll Build It.
              </span>
            </h2>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.58, delay: 0.1, ease }}
              className="mt-6 border-l-2 border-[#2563eb] pl-5"
            >
              <p className="text-[18px] font-semibold leading-8 text-[#2f4f76] sm:text-[20px]">
                Tell us what you&apos;re trying to achieve, and we&apos;ll
                design and build a custom solution around your workflow,
                goals, and business needs.
              </p>
            </motion.div>

            <p className="mt-5 text-sm leading-7 text-[#6b84a3]">
              Ideal when existing tools do not fit the way your business
              actually operates.
            </p>

            {/* reasons */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.12 + index * 0.05,
                  }}
                  className="flex items-start gap-3 border-t border-[#e0e9f4] pt-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-[#2563eb]">
                    <Check size={12} />
                  </span>

                  <p className="text-sm leading-6 text-[#486786]">{reason}</p>
                </motion.div>
              ))}
            </div>

            {/* capabilities */}
            <div className="mt-7">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7893b2]">
                What we can build
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {capabilities.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-[#dce7f4] bg-white px-3.5 py-2 text-xs font-semibold text-[#315581]"
                  >
                    <Icon size={13} className="text-[#2563eb]" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book-consultation"
                className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#0f2f5f] px-6 text-sm font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                Build My Solution

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <div className="flex items-center gap-2 px-1 text-xs font-semibold text-[#7893b2]">
                <Sparkles size={13} className="text-[#2563eb]" />
                No fixed stack. No generic package.
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT — ANIMATED CUSTOM SOFTWARE DASHBOARD
          ====================================================== */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 28,
                    rotateY: -4,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              rotateY: 0,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            style={{ transformPerspective: 1200 }}
            className="relative"
          >
            {/* offset frame */}
            <div className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-[30px] border border-[#d8e4f3] bg-[#f5f8fc] lg:block" />

            <div className="relative overflow-hidden rounded-[30px] border border-[#d8e4f3] bg-[#f8fbff] shadow-[0_28px_90px_rgba(15,47,95,0.14)]">
              {/* window chrome */}
              <div className="flex items-center justify-between border-b border-[#dfe8f3] bg-white px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d8e2ee]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d8e2ee]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d8e2ee]" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6d86a4]">
                    Custom platform · Live
                  </span>
                </div>
              </div>

              <div className="grid min-h-[600px] sm:min-h-[620px] lg:grid-cols-[150px_1fr]">
                {/* sidebar */}
                <div className="hidden border-r border-[#dfe8f3] bg-[#0b2242] p-4 lg:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Layers3 size={17} />
                  </div>

                  <div className="mt-8 space-y-2">
                    {[
                      ["Overview", Gauge],
                      ["Workflows", Workflow],
                      ["Customers", Database],
                      ["Approvals", FileCheck2],
                    ].map(([label, Icon], index) => {
                      const LucideIcon = Icon as typeof Gauge;

                      return (
                        <div
                          key={label as string}
                          className={[
                            "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold",
                            index === 0
                              ? "bg-white/10 text-white"
                              : "text-slate-400",
                          ].join(" ")}
                        >
                          <LucideIcon size={14} />
                          {label as string}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-10 border-t border-white/10 pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      Connected
                    </p>

                    <div className="mt-3 space-y-2">
                      {["CRM", "Email", "Billing"].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-[11px] font-semibold text-slate-400"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* main dashboard */}
                <div className="p-4 sm:p-5 lg:p-6">
                  {/* top metrics */}
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#7893b2]">
                        Operations overview
                      </p>
                      <p className="mt-1 text-xl font-bold tracking-[-0.03em] text-[#0b2242]">
                        Everything in one workflow.
                      </p>
                    </div>

                    <span className="hidden rounded-full border border-[#d8e5f3] bg-white px-3 py-1.5 text-[11px] font-bold text-[#45698e] sm:inline-flex">
                      Today
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2.5">
                    {[
                      ["Active", "128", "+18%"],
                      ["Automated", "74%", "+12%"],
                      ["Pending", "08", "-21%"],
                    ].map(([label, value, delta]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-[#dfe8f3] bg-white p-3.5"
                      >
                        <p className="text-[11px] font-semibold text-[#7893b2]">
                          {label}
                        </p>
                        <p className="mt-1 text-xl font-black text-[#0b2242]">
                          {value}
                        </p>
                        <p className="mt-1 text-[10px] font-bold text-emerald-600">
                          {delta}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* workflow map */}
                  <div className="mt-4 rounded-[22px] border border-[#dfe8f3] bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-[#0b2242]">
                          Lead-to-customer workflow
                        </p>
                        <p className="mt-1 text-[11px] text-[#8298b3]">
                          Automated across your tools
                        </p>
                      </div>

                      <span className="rounded-full bg-[#eef5ff] px-2.5 py-1 text-[10px] font-bold text-[#2563eb]">
                        RUNNING
                      </span>
                    </div>

                    <div className="relative mt-5 grid grid-cols-4 gap-2">
                      <div className="absolute left-[11%] right-[11%] top-[21px] h-px bg-[#c9d8ea]" />

                      {!reduceMotion && (
                        <motion.span
                          animate={{
                            left: ["11%", "82%"],
                            opacity: [0, 1, 1, 0],
                          }}
                          transition={{
                            duration: 3.8,
                            repeat: Infinity,
                            repeatDelay: 0.7,
                            ease: "linear",
                          }}
                          className="absolute top-[18px] z-20 h-2 w-2 rounded-full bg-[#2563eb]"
                        />
                      )}

                      {[
                        ["Lead", Inbox],
                        ["AI Check", Bot],
                        ["Approval", CheckCircle2],
                        ["CRM", Database],
                      ].map(([label, Icon]) => {
                        const LucideIcon = Icon as typeof Inbox;

                        return (
                          <div
                            key={label as string}
                            className="relative z-10 text-center"
                          >
                            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#cbdced] bg-white text-[#2563eb] shadow-[0_5px_14px_rgba(37,99,235,0.08)]">
                              <LucideIcon size={15} />
                            </span>

                            <p className="mt-2 text-[10px] font-bold text-[#45698e]">
                              {label as string}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* chart + activity */}
                  <div className="mt-4 grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[22px] border border-[#dfe8f3] bg-white p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[#0b2242]">
                          Work completed
                        </p>
                        <span className="text-[10px] font-bold text-[#7893b2]">
                          7 days
                        </span>
                      </div>

                      <div className="mt-5 flex h-28 items-end gap-2">
                        {[42, 62, 48, 76, 58, 88, 72].map(
                          (height, index) => (
                            <motion.div
                              key={index}
                              initial={
                                reduceMotion
                                  ? false
                                  : {
                                      height: 0,
                                    }
                              }
                              whileInView={{
                                height: `${height}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.55,
                                delay: 0.15 + index * 0.05,
                                ease,
                              }}
                              className="w-full rounded-t-md bg-[#0f2f5f]"
                            />
                          )
                        )}
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-[#dfe8f3] bg-[#0f2f5f] p-4 text-white">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold">Live activity</p>
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      </div>

                      <div className="mt-4 space-y-3">
                        {[
                          ["Lead qualified", "Just now"],
                          ["Approval completed", "2m"],
                          ["CRM updated", "4m"],
                        ].map(([label, time], index) => (
                          <motion.div
                            key={label}
                            initial={
                              reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    x: 10,
                                  }
                            }
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.4,
                              delay: 0.3 + index * 0.1,
                            }}
                            className="flex items-center justify-between gap-3 border-b border-white/10 pb-2.5 last:border-b-0 last:pb-0"
                          >
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-emerald-300">
                                <Check size={11} />
                              </span>
                              <p className="text-[11px] font-semibold text-slate-100">
                                {label}
                              </p>
                            </div>

                            <span className="text-[10px] text-slate-400">
                              {time}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* process footer */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#dfe8f3] pt-4">
                    {process.map((step, index) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#315581]">
                          {step}
                        </span>

                        {index < process.length - 1 && (
                          <ArrowRight
                            size={12}
                            className="text-[#9bb0c8]"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}