"use client";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

const outcomes = [
  "Faster access to internal information",
  "Fewer repetitive support questions",
  "More consistent answers",
  "Easier onboarding for new employees",
];

const phases = [
  {
    number: "01",
    label: "The challenge",
    description:
      "Teams often spend unnecessary time searching across internal documents and repeatedly answering similar operational questions.",
  },
  {
    number: "02",
    label: "The solution",
    description:
      "This demonstration connects an AI knowledge assistant to a controlled library of approved documents. Users can ask questions naturally and receive relevant answers with references to the original material.",
  },
  {
    number: "03",
    label: "The intended value",
    description:
      "The concept demonstrates how approved business knowledge can become easier to access while keeping source documents visible and maintaining controlled information boundaries.",
  },
];

export default function AICaseStudySection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative overflow-hidden bg-transparent py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <motion.header
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 22,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-cyan-300/60" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-cyan-300/70">
              Demonstration case study
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            See what a practical
            <span className="block text-cyan-300">
              AI solution looks like.
            </span>
          </h2>
        </motion.header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* Case information */}
          <motion.aside
            initial={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: -24,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
            }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="flex items-center justify-between border-y border-white/[0.09] py-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">
                Project type
              </span>

              <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-cyan-200/70">
                Demonstration
              </span>
            </div>

            <h3 className="mt-7 max-w-lg text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
              AI Knowledge Assistant for a Service Business
            </h3>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
              A representative concept showing how an organization
              could provide controlled access to approved internal
              knowledge.
            </p>

            <div className="mt-8 border-l border-cyan-300/25 pl-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-300/60">
                Important notice
              </p>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                This is an illustrative demonstration and does not
                represent published results from a named client.
              </p>
            </div>

            <Link
              href="/case-studies/ai-knowledge-assistant-demo"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Read the Full Case Study

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </motion.aside>

          {/* Case progression */}
          <div>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-5 top-0 w-px bg-white/[0.09] sm:left-6"
              />

              <motion.div
                aria-hidden="true"
                initial={
                  reduceMotion
                    ? undefined
                    : {
                        scaleY: 0,
                      }
                }
                whileInView={{
                  scaleY: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-cyan-200 via-cyan-400 to-blue-500 sm:left-6"
              />

              <div className="space-y-12">
                {phases.map((phase, index) => (
                  <motion.article
                    key={phase.number}
                    initial={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            x: 24,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.3,
                    }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative pl-14 sm:pl-16"
                  >
                    <motion.span
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              scale: [1, 1.12, 1],
                            }
                      }
                      transition={{
                        duration: 3,
                        delay: index * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-[#020711] font-mono text-[9px] text-cyan-200 sm:h-12 sm:w-12"
                    >
                      {phase.number}
                    </motion.span>

                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/60">
                      {phase.label}
                    </p>

                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                      {phase.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Potential outcomes */}
            <motion.div
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 20,
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
                duration: 0.7,
              }}
              className="mt-14 border-y border-white/[0.09] py-8"
            >
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/60">
                    Potential operational benefits
                  </p>

                  <p className="mt-2 text-xs text-slate-600">
                    Outcomes would need to be validated in a real implementation.
                  </p>
                </div>

                <span className="hidden text-cyan-200 sm:block">
                  <OutcomeIcon />
                </span>
              </div>

              <div className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {outcomes.map((outcome, index) => (
                  <motion.div
                    key={outcome}
                    initial={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            y: 12,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.07,
                    }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200">
                      <CheckIcon />
                    </span>

                    <span className="text-sm leading-6 text-slate-300">
                      {outcome}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
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

function OutcomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M5 18V9M12 18V5M19 18v-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="m4 6 5-3 5 3 6-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}