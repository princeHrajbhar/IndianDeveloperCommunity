"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  BriefcaseBusiness,
  Cable,
  Code2,
  Globe,
  Mail,
  Megaphone,
  Search,
  Settings2,
  Sparkles,
  Workflow,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const paths = [
  {
    id: "buy",
    eyebrow: "Ready-made solutions",
    title: "BUY",
    headline: "Launch faster with something ready-made.",
    description:
      "Choose proven AI agents, software and automation products that are ready to deploy.",
    line1: "AI agents, software & automation",
    line2: "Get up and running without starting from scratch",
    cta: "Explore Solutions",
    href: "/solutions",
    bestFor: "Best for businesses that want speed, clarity and a faster path to results.",
    includes: [
      { label: "AI Agents", icon: Bot },
      { label: "Software", icon: Boxes },
      { label: "Automation", icon: Workflow },
    ],
    accent: "#1769ff",
    soft: "#eef5ff",
  },
  {
    id: "build",
    eyebrow: "Custom solutions",
    title: "BUILD",
    headline: "Create exactly what your workflow needs.",
    description:
      "When off-the-shelf tools do not fit, we design and build a solution around your business.",
    line1: "AI, software, websites, SaaS",
    line2: "Built around your process, users and goals",
    cta: "Build My Solution",
    href: "/book-consultation",
    bestFor:
      "Best for businesses with unique workflows, new product ideas or custom requirements.",
    includes: [
      { label: "AI", icon: Bot },
      { label: "Software", icon: Code2 },
      { label: "Websites", icon: Globe },
      { label: "SaaS", icon: Cable },
    ],
    accent: "#0f4fbf",
    soft: "#edf3ff",
  },
  {
    id: "grow",
    eyebrow: "Digital marketing",
    title: "GROW",
    headline: "Bring in more visibility, leads and conversions.",
    description:
      "Use digital marketing to attract the right audience and turn attention into measurable growth.",
    line1: "SEO, social, PPC, email",
    line2: "A goal-led growth system for your business",
    cta: "Grow My Business",
    href: "/digital-marketing",
    bestFor:
      "Best for businesses ready to improve traffic, lead generation and marketing performance.",
    includes: [
      { label: "SEO", icon: Search },
      { label: "Social", icon: Megaphone },
      { label: "PPC", icon: BriefcaseBusiness },
      { label: "Email", icon: Mail },
    ],
    accent: "#2563eb",
    soft: "#eff6ff",
  },
] as const;

export default function BuyBuildGrowOutOfBoxWhite() {
  const [activeId, setActiveId] = useState<(typeof paths)[number]["id"]>("build");
  const reduceMotion = useReducedMotion();

  const active = paths.find((item) => item.id === activeId) ?? paths[1];

  return (
    <section className="relative overflow-hidden bg-white py-16 text-[#0b2a5f] sm:py-20 lg:py-24">
      {/* ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.34]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(23,105,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,105,255,.035) 1px, transparent 1px)",
            backgroundSize: "82px 82px",
            maskImage: "linear-gradient(to bottom, black, transparent 92%)",
          }}
        />

        <div className="absolute -top-28 right-[-80px] h-[300px] w-[300px] rounded-full bg-[#f2f7ff]" />
        <div className="absolute -bottom-32 left-[-100px] h-[340px] w-[340px] rounded-full bg-[#f6faff]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
        {/* =====================================================
            INTRO
        ====================================================== */}
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#d9e5f3] bg-[#f8fbff] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1769ff]" />
              <span className="text-xs font-black uppercase tracking-[0.12em] text-[#1769ff]">
                Buy / Build / Grow
              </span>
            </div>

            <p className="mt-5 max-w-[440px] text-sm leading-7 text-[#6f8fb5]">
              The clearest way to move forward: buy something ready-made, build
              something custom, or grow with digital marketing.
            </p>
          </motion.div>

          <div>
            <h2 className="max-w-[940px] text-[clamp(2.9rem,5vw,5.5rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-[#0b2a5f]">
              What do you need?
            </h2>

            <p className="mt-5 max-w-[760px] text-[16px] leading-7 text-[#476889] sm:text-[17px]">
              Choose the route that fits where your business is right now. Each
              path gives you a clear next step.
            </p>
          </div>
        </div>

        {/* =====================================================
            PATH CARDS
        ====================================================== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="mt-10"
        >
          <div className="grid gap-4 lg:grid-cols-3 xl:gap-5">
            {paths.map((path, index) => {
              const selected = path.id === activeId;

              return (
                <motion.button
                  key={path.id}
                  type="button"
                  onMouseEnter={() => setActiveId(path.id)}
                  onFocus={() => setActiveId(path.id)}
                  onClick={() => setActiveId(path.id)}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -6,
                        }
                  }
                  className={[
                    "group relative overflow-hidden rounded-[30px] border bg-white p-5 text-left transition-all duration-300 sm:p-6",
                    selected
                      ? "border-[#cdddf1] shadow-[0_22px_60px_rgba(23,105,255,0.12)]"
                      : "border-[#dde7f2] shadow-[0_12px_36px_rgba(23,105,255,0.05)] hover:border-[#cfddf0]",
                    index === 1 ? "lg:-translate-y-3 xl:-translate-y-4" : "",
                  ].join(" ")}
                >
                  {/* hover/active wash */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: path.soft }}
                  />

                  {/* top accent rail */}
                  <motion.span
                    initial={false}
                    animate={{
                      width: selected ? "100%" : "44%",
                      opacity: selected ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.35, ease }}
                    className="absolute left-0 top-0 h-[4px] rounded-r-full"
                    style={{ backgroundColor: path.accent }}
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.13em] text-[#8fa7c2]">
                          {path.eyebrow}
                        </p>

                        <h3
                          className="mt-3 text-[clamp(2rem,3vw,3.15rem)] font-semibold leading-none tracking-[-0.05em]"
                          style={{ color: selected ? path.accent : "#0b2a5f" }}
                        >
                          {path.title}
                        </h3>
                      </div>

                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-2xl"
                        style={{
                          backgroundColor: path.soft,
                          color: path.accent,
                        }}
                      >
                        {path.id === "buy" && <Boxes size={18} />}
                        {path.id === "build" && <Settings2 size={18} />}
                        {path.id === "grow" && <Megaphone size={18} />}
                      </span>
                    </div>

                    <div className="mt-7">
                      <p className="text-[22px] font-semibold leading-[1.15] tracking-[-0.035em] text-[#0b2a5f] sm:text-[26px]">
                        {path.headline}
                      </p>

                      <p className="mt-3 text-sm leading-6 text-[#6f8fb5]">
                        {path.description}
                      </p>
                    </div>

                    <div className="mt-6 space-y-3 rounded-[22px] border border-[#e2ebf4] bg-[#fbfdff] p-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8aa0b8]">
                          Core focus
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-[#315581]">
                          {path.line1}
                        </p>
                      </div>

                      <div className="h-px bg-[#e7eef6]" />

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8aa0b8]">
                          Outcome
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-[#315581]">
                          {path.line2}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {path.includes.map(({ label, icon: Icon }) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-2 rounded-full border border-[#dce6f2] bg-white px-3 py-2 text-[11px] font-semibold text-[#4a6a8c]"
                        >
                          <Icon size={12} style={{ color: path.accent }} />
                          {label}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#e3ebf4] pt-5">
                      <span className="text-sm font-bold text-[#1769ff]">
                        {path.cta}
                      </span>

                      <motion.span
                        animate={{
                          x: selected ? 4 : 0,
                          y: selected ? -1 : 0,
                        }}
                        transition={{ duration: 0.25, ease }}
                        style={{ color: path.accent }}
                      >
                        <ArrowUpRight size={18} />
                      </motion.span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* =====================================================
            ACTIVE DETAIL STRIP
        ====================================================== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.14, ease }}
          className="mt-5 overflow-hidden rounded-[28px] border border-[#dbe6f2] bg-[#f8fbff] shadow-[0_14px_40px_rgba(23,105,255,0.06)]"
        >
          <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[0.95fr_1.05fr_auto] lg:items-center lg:gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: active.accent }}
                />
                <p className="text-xs font-black uppercase tracking-[0.13em] text-[#8aa0b8]">
                  Selected path
                </p>
              </div>

              <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.035em] text-[#0b2a5f] sm:text-[28px]">
                {active.cta}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#5b7da2]">
                {active.bestFor}
              </p>
            </div>

            <div className="rounded-[22px] border border-[#dfe8f3] bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8ba1b9]">
                Why this path works
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease }}
                  className="mt-3"
                >
                  <p className="text-sm leading-7 text-[#315581]">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <Link
              href={active.href}
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: active.accent }}
            >
              {active.cta}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}