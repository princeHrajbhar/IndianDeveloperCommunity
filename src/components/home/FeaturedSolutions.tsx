"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  Headphones,
  Sparkles,
  Workflow,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type Solution = {
  id: "lead" | "automation" | "support";
  step: string;
  category: string;
  title: string;
  short: string;
  description: string;
  helps: string;
  price: string;
  href: string;
};

const solutions: Solution[] = [
  {
    id: "lead",
    step: "01",
    category: "AI Agent",
    title: "AI Lead Qualification Agent",
    short: "Qualify leads before your team touches them.",
    description:
      "Scores intent, asks the right questions and routes qualified opportunities to the right person automatically.",
    helps: "Sales teams handling inbound leads",
    price: "From ₹X/month",
    href: "/solutions/ai-lead-qualification-agent",
  },
  {
    id: "automation",
    step: "02",
    category: "Automation",
    title: "Business Automation Tool",
    short: "Turn repetitive operations into connected workflows.",
    description:
      "Moves data, triggers approvals, sends notifications and connects routine processes without constant manual work.",
    helps: "Operations teams with repetitive workflows",
    price: "From ₹X/month",
    href: "/solutions/business-automation-tool",
  },
  {
    id: "support",
    step: "03",
    category: "AI Agent",
    title: "Customer Support AI",
    short: "Give customers answers without growing the queue.",
    description:
      "Handles common questions instantly, keeps conversations moving and reduces repetitive support workload.",
    helps: "Support teams with high-volume queries",
    price: "From ₹X/month",
    href: "/solutions/customer-support-ai",
  },
];

export default function FeaturedSolutionsDarkLaunchpad() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const solution = solutions[active];

  return (
    <section className="relative overflow-hidden bg-[#050912] py-16 text-white sm:py-20 lg:py-24">
      {/* static atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(37,99,235,0.18),transparent_32%),radial-gradient(circle_at_22%_85%,rgba(14,165,233,0.09),transparent_30%)]" />

        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,165,250,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,.09) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/35 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1520px] px-5 sm:px-7 lg:px-10 xl:px-16">
        {/* =====================================================
            SECTION INTRO
        ====================================================== */}

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-blue-400/20 bg-blue-400/[0.07] px-4 py-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />

              <span className="text-xs font-bold uppercase tracking-[0.13em] text-blue-200">
                Featured solutions
              </span>
            </motion.div>

            <h2 className="mt-5 overflow-hidden text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
              <motion.span
                initial={reduceMotion ? false : { y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.75, ease }}
                className="block"
              >
                Pick a problem.
              </motion.span>

              <motion.span
                initial={reduceMotion ? false : { y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.75, delay: 0.08, ease }}
                className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-500 bg-clip-text text-transparent"
              >
                Launch a solution.
              </motion.span>
            </h2>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.14, ease }}
              className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-400 sm:text-base"
            >
              Ready-made products for common business bottlenecks — clear use
              case, clear starting price, clear next step.
            </motion.p>
          </div>

          <Link
            href="/solutions"
            className="group hidden items-center gap-2 text-sm font-bold text-blue-200 transition-colors hover:text-white lg:inline-flex"
          >
            Explore All Solutions

            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* =====================================================
            LAUNCHPAD
        ====================================================== */}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.72, delay: 0.12, ease }}
          className="mt-10 overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#08111f]/95 shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
        >
          <div className="grid lg:grid-cols-[270px_1fr]">
            {/* selector rail */}
            <div className="border-b border-white/[0.07] bg-[#07101d] lg:border-b-0 lg:border-r">
              <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Solution launcher
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-200">
                  Select a product
                </p>
              </div>

              <div className="grid grid-cols-3 lg:block">
                {solutions.map((item, index) => {
                  const selected = active === index;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      className={[
                        "group/selector relative w-full border-white/[0.06] px-3 py-4 text-left transition-colors duration-300 sm:px-5 lg:border-b lg:px-6 lg:py-6",
                        index > 0 ? "border-l lg:border-l-0" : "",
                        selected
                          ? "bg-blue-500/[0.10]"
                          : "bg-transparent hover:bg-white/[0.03]",
                      ].join(" ")}
                    >
                      {selected && (
                        <motion.span
                          layoutId="solution-selector"
                          transition={{ duration: 0.3, ease }}
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-400 lg:bottom-auto lg:right-auto lg:top-0 lg:h-full lg:w-[3px]"
                        />
                      )}

                      <div className="flex items-start gap-3">
                        <span
                          className={[
                            "mt-0.5 text-xs font-black",
                            selected ? "text-cyan-300" : "text-slate-600",
                          ].join(" ")}
                        >
                          {item.step}
                        </span>

                        <div className="min-w-0">
                          <p
                            className={[
                              "text-xs font-bold uppercase tracking-[0.1em] transition-colors sm:text-sm",
                              selected ? "text-white" : "text-slate-500",
                            ].join(" ")}
                          >
                            {item.id === "lead"
                              ? "Lead AI"
                              : item.id === "automation"
                                ? "Automation"
                                : "Support AI"}
                          </p>

                          <p className="mt-1 hidden text-xs leading-5 text-slate-600 lg:block">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* active product */}
            <div className="relative min-h-[620px] overflow-hidden sm:min-h-[600px] lg:min-h-[570px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={solution.id}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 24,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -18,
                  }}
                  transition={{
                    duration: 0.36,
                    ease,
                  }}
                  className="absolute inset-0"
                >
                  {/* dynamic visual */}
                  <div className="absolute inset-x-0 top-0 h-[255px] border-b border-white/[0.07] sm:h-[270px] lg:bottom-0 lg:left-auto lg:right-0 lg:h-full lg:w-[48%] lg:border-b-0 lg:border-l">
                    <ProductVisual type={solution.id} reduceMotion={reduceMotion} />
                  </div>

                  {/* content */}
                  <div className="relative z-10 flex min-h-[620px] flex-col px-5 pb-6 pt-[285px] sm:min-h-[600px] sm:px-7 sm:pt-[300px] lg:min-h-[570px] lg:w-[54%] lg:px-9 lg:py-9">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-3 py-1.5 text-xs font-bold text-blue-200">
                        {solution.category}
                      </span>

                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                        {solution.step}
                      </span>
                    </div>

                    <h3 className="mt-5 max-w-[620px] text-[clamp(2rem,3.6vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
                      {solution.title}
                    </h3>

                    <p className="mt-4 max-w-[590px] text-base font-medium leading-7 text-blue-100/80">
                      {solution.short}
                    </p>

                    <p className="mt-4 max-w-[590px] text-[15px] leading-7 text-slate-400">
                      {solution.description}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <InfoBlock
                        label="Best for"
                        value={solution.helps}
                        icon={<CheckCircle2 size={16} />}
                      />

                      <InfoBlock
                        label="Starting at"
                        value={solution.price}
                        icon={<CircleDollarSign size={16} />}
                      />
                    </div>

                    <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
                      <Link
                        href={solution.href}
                        className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-500 px-6 text-sm font-black text-[#04101f] transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        View Solution

                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>

                      <Link
                        href="/book-consultation"
                        className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/10 bg-white/[0.035] px-6 text-sm font-bold text-slate-200 transition-colors duration-300 hover:border-blue-300/30 hover:bg-blue-400/[0.06] hover:text-white"
                      >
                        Ask About This Solution
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* bottom system bar */}
          <div className="flex flex-col gap-3 border-t border-white/[0.07] bg-[#060d18] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-300 opacity-30" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-300" />
              </span>

              <p className="text-xs font-semibold text-slate-500">
                Ready-made products. Custom setup available.
              </p>
            </div>

            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2 text-xs font-bold text-blue-300 transition-colors hover:text-white lg:hidden"
            >
              Explore All Solutions
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   INFO BLOCK
========================================================= */

function InfoBlock({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="flex items-center gap-2 text-blue-300">
        {icon}
        <span className="text-xs font-bold uppercase tracking-[0.11em] text-slate-500">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   PRODUCT VISUALS
========================================================= */

function ProductVisual({
  type,
  reduceMotion,
}: {
  type: Solution["id"];
  reduceMotion: boolean | null;
}) {
  if (type === "automation") {
    return <AutomationVisual reduceMotion={reduceMotion} />;
  }

  if (type === "support") {
    return <SupportVisual reduceMotion={reduceMotion} />;
  }

  return <LeadVisual reduceMotion={reduceMotion} />;
}

function VisualShell({
  children,
  title,
  badge,
}: {
  children: React.ReactNode;
  title: string;
  badge: string;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#07111f] p-5 sm:p-7 lg:p-9">
      <div className="relative h-full max-h-[470px] w-full max-w-[560px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0a1628] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
        <div className="flex h-12 items-center justify-between border-b border-white/[0.07] px-4">
          <div>
            <p className="text-xs font-semibold text-slate-300">{title}</p>
          </div>

          <span className="rounded-full bg-blue-400/[0.10] px-2.5 py-1 text-[11px] font-bold text-blue-300">
            {badge}
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}

function LeadVisual({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <VisualShell title="Lead qualification" badge="AI ACTIVE">
      <div className="relative h-[calc(100%-48px)] p-4">
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Incoming", "24"],
              ["Qualified", "11"],
              ["High intent", "6"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
              >
                <p className="text-[11px] font-semibold text-slate-500">{label}</p>
                <p className="mt-1 text-lg font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-blue-400/10 bg-blue-400/[0.025]">
            <div className="absolute left-[12%] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#101f35]">
              <Bot size={18} className="text-blue-300" />
            </div>

            <div className="absolute left-[34%] h-px w-[22%] bg-blue-400/30" />

            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, 75, 150],
                      opacity: [0, 1, 0],
                    }
              }
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-[34%] h-2 w-2 rounded-full bg-cyan-300"
            />

            <div className="absolute right-[12%] rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.05] px-4 py-3">
              <p className="text-[11px] font-bold text-emerald-300">Qualified</p>
              <p className="mt-1 text-xs text-slate-500">Score 92/100</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5">
            <span className="text-[11px] text-slate-500">Next action</span>
            <span className="text-[11px] font-bold text-blue-300">
              Route to sales →
            </span>
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

function AutomationVisual({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  const nodes = [
    ["Form", "left-[8%] top-[14%]"],
    ["CRM", "right-[9%] top-[15%]"],
    ["Approval", "left-[10%] bottom-[16%]"],
    ["Notify", "right-[10%] bottom-[15%]"],
  ];

  return (
    <VisualShell title="Workflow automation" badge="RUNNING">
      <div className="relative h-[calc(100%-48px)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,165,250,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,.09) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-300/20 bg-blue-400/[0.10]">
          <Workflow size={25} className="text-blue-300" />
        </div>

        {nodes.map(([label, className]) => (
          <div
            key={label}
            className={`absolute ${className} rounded-xl border border-white/[0.08] bg-[#0e1b2e] px-3 py-2.5 text-xs font-semibold text-slate-300`}
          >
            {label}
          </div>
        ))}

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 500 330"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M105 75 C180 75 180 160 250 165"
            stroke="rgba(96,165,250,.35)"
            strokeWidth="1.5"
          />
          <path
            d="M395 75 C320 75 320 160 250 165"
            stroke="rgba(96,165,250,.35)"
            strokeWidth="1.5"
          />
          <path
            d="M110 258 C180 258 180 175 250 165"
            stroke="rgba(96,165,250,.35)"
            strokeWidth="1.5"
          />
          <path
            d="M390 258 C320 258 320 175 250 165"
            stroke="rgba(96,165,250,.35)"
            strokeWidth="1.5"
          />
        </svg>

        {!reduceMotion && (
          <motion.span
            animate={{
              scale: [1, 1.55, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300"
          />
        )}
      </div>
    </VisualShell>
  );
}

function SupportVisual({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <VisualShell title="Customer support AI" badge="ONLINE">
      <div className="flex h-[calc(100%-48px)] flex-col p-4">
        <div className="flex-1 space-y-3 overflow-hidden">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-blue-500 px-4 py-3">
            <p className="text-xs leading-5 text-white">
              Can I change my delivery address after ordering?
            </p>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-[86%] rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.04] px-4 py-3"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-400/[0.12]">
                <Headphones size={12} className="text-blue-300" />
              </span>
              <span className="text-[11px] font-bold text-blue-300">
                Support AI
              </span>
            </div>

            <p className="text-xs leading-5 text-slate-300">
              Yes. If the order has not shipped yet, you can update the
              delivery address from your order details.
            </p>
          </motion.div>

          <div className="max-w-[68%] rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, -3, 0],
                          opacity: [0.35, 1, 0.35],
                        }
                  }
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: dot * 0.14,
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-blue-300"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#07111f] px-3 py-3">
          <Sparkles size={13} className="text-blue-300" />
          <span className="text-[11px] text-slate-500">
            Answers instantly · Escalates when needed
          </span>
        </div>
      </div>
    </VisualShell>
  );
}