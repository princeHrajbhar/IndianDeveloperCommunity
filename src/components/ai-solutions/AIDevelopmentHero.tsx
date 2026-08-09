"use client";

import Link from "next/link";
import type {
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { useEffect, useState } from "react";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

type PipelineStage = {
  number: string;
  label: string;
  title: string;
  description: string;
  status: string;
  icon: ReactNode;
};

const pipelineStages: PipelineStage[] = [
  {
    number: "01",
    label: "Connect",
    title: "Business Data",
    description:
      "Securely connect documents, applications, databases and operational information.",
    status: "Authorized sources connected",
    icon: <DataIcon />,
  },
  {
    number: "02",
    label: "Understand",
    title: "AI Intelligence",
    description:
      "Retrieve, classify, extract and reason over business information for a defined task.",
    status: "Context prepared for action",
    icon: <IntelligenceIcon />,
  },
  {
    number: "03",
    label: "Execute",
    title: "Automated Action",
    description:
      "Generate responses, update workflows and trigger approved actions across existing systems.",
    status: "Workflow action prepared",
    icon: <ActionIcon />,
  },
  {
    number: "04",
    label: "Control",
    title: "Human Review",
    description:
      "Send important, sensitive or uncertain decisions to the right person before execution.",
    status: "Human approval remains active",
    icon: <ReviewIcon />,
  },
];

const signalBars = [
  36, 58, 43, 76, 54, 91, 65, 82, 47, 72, 88, 61,
];

export default function AIDevelopmentHero() {
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const smoothX = useSpring(pointerX, {
    stiffness: 80,
    damping: 25,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 80,
    damping: 25,
  });

  const contentX = useTransform(smoothX, [0, 1], [-10, 10]);
  const contentY = useTransform(smoothY, [0, 1], [-8, 8]);

  const panelX = useTransform(smoothX, [0, 1], [24, -24]);
  const panelY = useTransform(smoothY, [0, 1], [18, -18]);

  const floatingOneX = useTransform(
    smoothX,
    [0, 1],
    [-35, 35],
  );

  const floatingOneY = useTransform(
    smoothY,
    [0, 1],
    [-25, 25],
  );

  const floatingTwoX = useTransform(
    smoothX,
    [0, 1],
    [42, -42],
  );

  const floatingTwoY = useTransform(
    smoothY,
    [0, 1],
    [30, -30],
  );

  const rotateX = useTransform(smoothY, [0, 1], [2.5, -2.5]);
  const rotateY = useTransform(smoothX, [0, 1], [-3, 3]);

  const active = pipelineStages[activeStage];

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveStage(
        (current) => (current + 1) % pipelineStages.length,
      );
    }, 3200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  function handlePointerMove(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    const bounds =
      event.currentTarget.getBoundingClientRect();

    pointerX.set(
      (event.clientX - bounds.left) / bounds.width,
    );

    pointerY.set(
      (event.clientY - bounds.top) / bounds.height,
    );
  }

  function handlePointerLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative m-0 min-h-[100svh] overflow-hidden p-0"
    >
      {/* Parallax decoration */}
      <motion.div
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : {
                x: floatingOneX,
                y: floatingOneY,
              }
        }
        className="pointer-events-none absolute left-[7%] top-[14%] hidden h-24 w-24 rounded-full border border-cyan-300/10 lg:block"
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-2 rounded-full border border-dashed border-cyan-300/15"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : {
                x: floatingTwoX,
                y: floatingTwoY,
              }
        }
        className="pointer-events-none absolute bottom-[12%] right-[6%] hidden h-36 w-36 rounded-[2rem] border border-blue-300/10 lg:block"
      >
        <div className="absolute inset-5 rotate-45 border border-cyan-300/10" />
      </motion.div>

      <div className="mx-auto grid min-h-[100svh] w-full max-w-[1560px] gap-10 px-5 py-0 sm:px-7 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16 lg:px-10 xl:px-16">
        {/* Copy */}
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  x: -35,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={
            reduceMotion
              ? undefined
              : {
                  x: contentX,
                  y: contentY,
                }
          }
          className="relative z-10 flex flex-col justify-center"
        >
          <div className="inline-flex w-fit items-center gap-3 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.055] px-4 py-2 backdrop-blur-xl">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200">
              <SparkIcon />

              <span className="absolute inset-0 animate-ping rounded-lg border border-cyan-300/20 opacity-30" />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.23em] text-cyan-100/75">
              AI Development &amp; Automation
            </span>
          </div>

          <h1 className="mt-6 max-w-[900px] text-[2.85rem] font-black leading-[0.93] tracking-[-0.065em] text-white sm:text-6xl lg:text-[4.7rem] xl:text-[5.55rem]">
            Turn business complexity into
            <span className="relative block">
              <span className="bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                controlled intelligence.
              </span>

              <motion.span
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-2 left-0 h-px w-[72%] origin-left bg-gradient-to-r from-cyan-300/80 via-blue-300/35 to-transparent"
              />
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            We build secure AI applications that understand your
            data, automate repetitive work and keep people in
            control when judgment matters.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book-consultation"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-7 text-sm font-bold text-[#020711] shadow-[0_20px_60px_rgba(34,211,238,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_75px_rgba(34,211,238,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              <span className="absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />

              <span className="relative flex items-center gap-2">
                Discuss Your AI Project
                <ArrowIcon />
              </span>
            </Link>

            <Link
              href="#ai-solutions"
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-7 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              Explore Our Solutions

              <span className="transition-transform group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[9px] font-medium uppercase tracking-[0.16em] text-slate-600">
            {[
              "No-obligation consultation",
              "NDA available",
              "Clear technical recommendations",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-sm bg-cyan-300/65 shadow-[0_0_10px_rgba(103,232,249,0.65)]" />

                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Interactive visual */}
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  x: 42,
                  scale: 0.94,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={
            reduceMotion
              ? undefined
              : {
                  x: panelX,
                  y: panelY,
                  rotateX,
                  rotateY,
                  transformPerspective: 1400,
                  transformStyle: "preserve-3d",
                }
          }
          className="relative flex items-center justify-center py-8 lg:py-0"
        >
          <div className="relative w-full max-w-[730px] overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#03101a]/72 shadow-[0_45px_150px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/65 to-transparent" />

            <div
              aria-hidden="true"
              className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-cyan-500/[0.09] blur-[100px]"
            />

            {/* Header */}
            <div className="relative flex flex-col gap-4 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-300/60">
                  AI operations engine
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  Human-controlled business automation
                </p>
              </div>

              <span className="flex w-fit items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.055] px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-emerald-300/70">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-300 opacity-45" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-300" />
                </span>

                Approval active
              </span>
            </div>

            <div className="relative grid md:grid-cols-[205px_1fr]">
              {/* Navigation */}
              <div className="border-b border-white/[0.07] p-3 md:border-b-0 md:border-r">
                <p className="px-3 pb-3 pt-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                  Intelligence pipeline
                </p>

                <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                  {pipelineStages.map((stage, index) => {
                    const selected = activeStage === index;

                    return (
                      <button
                        key={stage.number}
                        type="button"
                        onClick={() => setActiveStage(index)}
                        onMouseEnter={() => setActiveStage(index)}
                        onFocus={() => setActiveStage(index)}
                        className={[
                          "group relative flex min-h-20 items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                          selected
                            ? "border-cyan-300/25 bg-cyan-300/[0.085]"
                            : "border-transparent bg-white/[0.015] hover:border-white/[0.08] hover:bg-white/[0.035]",
                        ].join(" ")}
                      >
                        {selected && (
                          <motion.span
                            layoutId="active-ai-stage"
                            className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-to-b from-cyan-300 via-teal-300 to-blue-400"
                          />
                        )}

                        <span
                          className={[
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition",
                            selected
                              ? "border-cyan-300/25 bg-cyan-300/[0.1] text-cyan-100"
                              : "border-white/[0.07] bg-black/20 text-slate-600 group-hover:text-cyan-200",
                          ].join(" ")}
                        >
                          {stage.icon}
                        </span>

                        <span className="min-w-0">
                          <span className="block text-[8px] uppercase tracking-[0.16em] text-cyan-300/50">
                            {stage.label}
                          </span>

                          <span
                            className={[
                              "mt-1 block truncate text-[11px] font-semibold",
                              selected
                                ? "text-white"
                                : "text-slate-500",
                            ].join(" ")}
                          >
                            {stage.title}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active stage */}
              <div className="relative min-h-[430px] overflow-hidden p-5 sm:p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.28,
                    }}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.2em] text-cyan-300/50">
                          STAGE {active.number}
                        </p>

                        <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
                          {active.title}
                        </h2>
                      </div>

                      <motion.span
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                y: [0, -5, 0],
                                rotate: [0, 4, -3, 0],
                              }
                        }
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-100 shadow-[0_0_35px_rgba(34,211,238,0.15)]"
                      >
                        {active.icon}
                      </motion.span>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-slate-400">
                      {active.description}
                    </p>

                    <div className="mt-7 rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-slate-700">
                            Live processing signal
                          </p>

                          <p className="mt-2 text-xs font-medium text-slate-300">
                            {active.status}
                          </p>
                        </div>

                        <span className="font-mono text-[9px] text-emerald-300/65">
                          ACTIVE
                        </span>
                      </div>

                      <div className="mt-6 flex h-24 items-end gap-2">
                        {signalBars.map((height, index) => (
                          <motion.span
                            key={`${activeStage}-${index}`}
                            initial={{
                              scaleY: 0.15,
                              opacity: 0.2,
                            }}
                            animate={{
                              scaleY: reduceMotion
                                ? 1
                                : [0.45, 1, 0.62],
                              opacity: [0.3, 1, 0.55],
                            }}
                            transition={{
                              duration: 1.4 + index * 0.07,
                              delay: index * 0.035,
                              repeat: reduceMotion
                                ? 0
                                : Infinity,
                              repeatType: "reverse",
                            }}
                            style={{
                              height: `${height}%`,
                            }}
                            className="w-full origin-bottom rounded-sm bg-gradient-to-t from-blue-600/25 via-cyan-400/65 to-teal-200"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-7">
                      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.17em] text-slate-700">
                        <span>Business data</span>
                        <span>Human control</span>
                      </div>

                      <div className="relative mt-4 h-px bg-white/[0.08]">
                        <motion.div
                          animate={{
                            width: `${
                              (activeStage /
                                (pipelineStages.length - 1)) *
                              100
                            }%`,
                          }}
                          transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400"
                        />

                        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
                          {pipelineStages.map((stage, index) => (
                            <button
                              key={stage.number}
                              type="button"
                              aria-label={`Open ${stage.title}`}
                              onClick={() => setActiveStage(index)}
                              className={[
                                "h-3 w-3 rounded-full border transition",
                                index <= activeStage
                                  ? "border-cyan-200 bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]"
                                  : "border-white/15 bg-[#03101a]",
                              ].join(" ")}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-white/[0.07]">
              {[
                ["Data access", "Permission based"],
                ["AI execution", "Task specific"],
                ["Decision control", "Human reviewed"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-r border-white/[0.07] px-3 py-4 text-center last:border-r-0"
                >
                  <p className="text-[7px] uppercase tracking-[0.15em] text-slate-700">
                    {label}
                  </p>

                  <p className="mt-2 text-[9px] font-medium text-cyan-100/75">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: [0.85, 1.15, 0.85],
                    opacity: [0.12, 0.28, 0.12],
                  }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -bottom-16 left-1/2 -z-10 h-56 w-3/4 -translate-x-1/2 rounded-full bg-cyan-500/18 blur-[100px]"
          />
        </motion.div>
      </div>
    </section>
  );
}

function DataIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <ellipse
        cx="12"
        cy="5.5"
        rx="7"
        ry="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M5 5.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6M5 11.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IntelligenceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M9.5 5.5A3.5 3.5 0 0 0 6 9v.5A3.5 3.5 0 0 0 4.5 16 3.5 3.5 0 0 0 8 19.5c.6 0 1.1-.1 1.5-.3V5.5ZM14.5 5.5A3.5 3.5 0 0 1 18 9v.5a3.5 3.5 0 0 1 1.5 6.5 3.5 3.5 0 0 1-3.5 3.5c-.6 0-1.1-.1-1.5-.3V5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M9.5 9H7.5M9.5 14H7M14.5 9h2M14.5 14H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ActionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="5"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <rect
        x="14"
        y="13"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M10 8h5a3 3 0 0 1 3 3v2M18 13l-2-2M18 13l2-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle
        cx="9"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M3.5 19c.5-3.3 2.3-5 5.5-5 2.1 0 3.7.7 4.6 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="m15 17 2 2 4-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="m10 2 1.5 5.2L17 9l-5.5 1.8L10 16l-1.5-5.2L3 9l5.5-1.8L10 2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
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