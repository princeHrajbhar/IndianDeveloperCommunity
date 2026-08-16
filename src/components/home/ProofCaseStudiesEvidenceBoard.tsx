"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Headphones,
  ShoppingBag,
  Workflow,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const proofs = [
  {
    number: "01",
    eyebrow: "E-commerce · Demo",
    icon: ShoppingBag,
    problem: "Manual lead and customer handling slows the team down.",
    solution: "AI qualification + automated CRM and follow-up workflow.",
    proof: "Working demo: capture → qualify → route → follow up.",
    accent: "#ff6b35",
  },
  {
    number: "02",
    eyebrow: "Operations · Process Proof",
    icon: Workflow,
    problem: "Approvals and data handoffs live across too many tools.",
    solution: "A custom workflow connecting requests, approvals and systems.",
    proof: "Prototype flow: request → approval → system update.",
    accent: "#3b82f6",
  },
  {
    number: "03",
    eyebrow: "Support · Capability Proof",
    icon: Headphones,
    problem: "Teams spend time answering the same customer questions.",
    solution: "Support AI with confidence checks and human escalation.",
    proof: "Demo flow: answer → verify confidence → escalate when needed.",
    accent: "#10b981",
  },
];

export default function ProofCaseStudiesEvidenceBoard() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-16 text-[#0b2a5f] sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="grid gap-8 border-b border-[#d7e4f4] pb-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="h-px w-8 bg-[#111827]" />
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#1769ff]">
                Proof / Case Studies
              </span>
            </div>

            <p className="mt-5 max-w-[430px] text-sm leading-7 text-[#6f8fb5]">
              We only publish outcomes we can substantiate. Until verified
              client results are available, we show working demos, process
              proof and capability evidence instead.
            </p>
          </motion.div>

          <div>
            <h2 className="text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#0b2a5f]">
              Real Problems.
              <span className="block text-[#1769ff]">
                Practical Solutions.
              </span>
            </h2>
          </div>
        </div>

        {/* =====================================================
            EVIDENCE LEDGER
        ====================================================== */}
        <div className="mt-8">
          {proofs.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.number}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease,
                }}
                className="group relative border-b border-[#d7e4f4] py-7 sm:py-8 lg:py-9"
              >
                {/* hover wash */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-2 left-0 right-0 scale-y-[0.92] rounded-[26px] opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100"
                  style={{
                    backgroundColor: `${item.accent}08`,
                  }}
                />

                <div className="relative grid gap-6 lg:grid-cols-[90px_1.05fr_1.05fr_1fr] lg:items-center lg:gap-8">
                  {/* number */}
                  <div className="flex items-center gap-3 lg:block">
                    <span
                      className="text-4xl font-black tracking-[-0.05em] sm:text-5xl"
                      style={{ color: item.accent }}
                    >
                      {item.number}
                    </span>

                    <span className="h-px flex-1 bg-[#dbe7f5] lg:hidden" />
                  </div>

                  {/* problem */}
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#6f8fb5]">
                      Problem
                    </p>

                    <div className="mt-3 flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
                        style={{
                          borderColor: `${item.accent}55`,
                          color: item.accent,
                          backgroundColor: "#ffffff",
                        }}
                      >
                        <Icon size={16} />
                      </span>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#6f8fb5]">
                          {item.eyebrow}
                        </p>

                        <p className="mt-2 text-[15px] font-semibold leading-7 text-[#16385f]">
                          {item.problem}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* connector / solution */}
                  <div className="relative">
                    <div className="mb-3 flex items-center gap-2 lg:hidden">
                      <ArrowRight size={14} className="text-[#9bb5d3]" />
                      <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#6f8fb5]">
                        Solution
                      </span>
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                      <div className="relative h-px flex-1 overflow-hidden bg-[#e2e8f0]">
                        {!reduceMotion && (
                          <motion.span
                            animate={{ x: ["-120%", "220%"] }}
                            transition={{
                              duration: 2.8,
                              repeat: Infinity,
                              delay: index * 0.35,
                              ease: "linear",
                            }}
                            className="absolute inset-y-0 left-0 w-16"
                            style={{ backgroundColor: item.accent }}
                          />
                        )}
                      </div>

                      <ArrowRight size={14} className="text-[#9bb5d3]" />
                    </div>

                    <p className="mt-3 text-[15px] font-semibold leading-7 text-[#16385f] lg:mt-4">
                      {item.solution}
                    </p>
                  </div>

                  {/* proof */}
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#6f8fb5]">
                      Proof
                    </p>

                    <div className="mt-3 flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: `${item.accent}18`,
                          color: item.accent,
                        }}
                      >
                        <CheckCircle2 size={14} />
                      </span>

                      <p className="text-sm font-medium leading-6 text-[#315581]">
                        {item.proof}
                      </p>
                    </div>
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

        {/* =====================================================
            FOOTER NOTE / ALL CASE STUDIES
        ====================================================== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease }}
          className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e4f4] bg-white text-[#1769ff]">
              <Cpu size={16} />
            </span>

            <div>
              <p className="text-sm font-bold text-[#16385f]">
                Evidence over empty claims.
              </p>

              <p className="mt-1 text-xs leading-5 text-[#6f8fb5]">
                Replace demo proof with verified client outcomes as they become
                publishable.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}