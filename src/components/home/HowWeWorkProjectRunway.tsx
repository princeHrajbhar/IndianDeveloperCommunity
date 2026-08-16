"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  Check,
  Compass,
  Hammer,
  Rocket,
  Search,
  TrendingUp,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Understand",
    text: "Your business and problem.",
    color: "#67e8f9",
    icon: Search,
  },
  {
    number: "02",
    title: "Plan",
    text: "Choose the right solution.",
    color: "#a78bfa",
    icon: Compass,
  },
  {
    number: "03",
    title: "Build",
    text: "Design and implement.",
    color: "#fbbf24",
    icon: Hammer,
  },
  {
    number: "04",
    title: "Launch",
    text: "Test and deploy.",
    color: "#fb7185",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Scale",
    text: "Improve as the business grows.",
    color: "#34d399",
    icon: TrendingUp,
  },
];

export default function HowWeWorkDarkProcessFoundry() {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || manual || reduceMotion) return;

    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % steps.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [inView, manual, reduceMotion]);

  const current = steps[active];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#020409] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(111,156,206,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(111,156,206,.07) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage: "linear-gradient(to bottom, black, transparent 95%)",
          }}
        />

        <div className="absolute -left-32 top-[15%] h-80 w-80 rounded-full bg-[#0d2541] opacity-50 blur-[100px]" />
        <div className="absolute -right-20 bottom-[5%] h-96 w-96 rounded-full bg-[#161c3b] opacity-35 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1520px] px-5 sm:px-7 lg:px-10 xl:px-16">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2.5">
              <span className="h-px w-8 bg-cyan-300" />
              <span className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                How We Work
              </span>
            </div>

            <p className="mt-5 max-w-[430px] text-sm leading-7 text-slate-500">
              Five stages. One continuous build. No maze of handoffs or
              unnecessary complexity.
            </p>
          </div>

          <div>
            <h2 className="max-w-[980px] text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.91] tracking-[-0.06em] text-white">
              From problem
              <span className="text-slate-500"> to progress.</span>
            </h2>

            <p className="mt-5 max-w-[760px] text-[16px] leading-7 text-slate-400 sm:text-[17px]">
              You always know what stage the project is in, what we are doing,
              and what comes next.
            </p>
          </div>
        </div>

        {/* =====================================================
            PROCESS FOUNDRY
        ====================================================== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          className="mt-10 overflow-hidden rounded-[34px] border border-white/[0.08] bg-[#070b12]"
        >
          {/* top status */}
          <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-600">
                Project foundry
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-300">
                Each stage transforms the project into the next.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: current.color }}
              />
              Stage {current.number} · {current.title}
            </div>
          </div>

          {/* DESKTOP ASSEMBLY LINE */}
          <div className="relative hidden min-h-[590px] lg:block">
            {/* conveyor */}
            <div className="absolute left-[5%] right-[5%] top-[318px] h-[54px] rounded-full border border-white/[0.07] bg-[#0b111b]">
              <div className="absolute inset-x-5 top-1/2 h-px -translate-y-1/2 bg-white/[0.08]" />

              {!reduceMotion && (
                <motion.div
                  animate={{ x: ["0%", "760%"] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-6 top-1/2 h-2.5 w-10 -translate-y-1/2 rounded-full bg-white/[0.08]"
                />
              )}
            </div>

            <div className="relative grid min-h-[590px] grid-cols-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const selected = active === index;

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => {
                      setActive(index);
                      setManual(true);
                    }}
                    onMouseEnter={() => setActive(index)}
                    className="relative px-4 py-6 text-left"
                  >
                    {/* upper station */}
                    <div className="absolute left-4 right-4 top-7">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-black tracking-[0.12em]"
                          style={{
                            color: selected ? step.color : "#475569",
                          }}
                        >
                          {step.number}
                        </span>

                        <span
                          className={[
                            "text-[10px] font-black uppercase tracking-[0.1em]",
                            selected ? "text-slate-300" : "text-slate-700",
                          ].join(" ")}
                        >
                          {selected ? "In focus" : "Stage"}
                        </span>
                      </div>

                      <h3
                        className={[
                          "mt-4 text-[clamp(1.5rem,2vw,2.35rem)] font-semibold tracking-[-0.04em]",
                          selected ? "text-white" : "text-slate-600",
                        ].join(" ")}
                      >
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-[180px] text-sm leading-6 text-slate-600">
                        {step.text}
                      </p>
                    </div>

                    {/* vertical feeder */}
                    <div className="absolute left-1/2 top-[180px] h-[112px] w-px -translate-x-1/2 bg-white/[0.08]">
                      <motion.span
                        animate={{
                          height: selected ? "100%" : "28%",
                          opacity: selected ? 1 : 0.25,
                        }}
                        transition={{ duration: 0.45, ease }}
                        className="absolute left-0 top-0 w-px origin-top"
                        style={{ backgroundColor: step.color }}
                      />
                    </div>

                    {/* machine station */}
                    <motion.div
                      animate={{
                        y: selected ? -5 : 0,
                        scale: selected ? 1.04 : 1,
                      }}
                      transition={{ duration: 0.35, ease }}
                      className="absolute left-1/2 top-[272px] z-10 -translate-x-1/2"
                    >
                      <div
                        className="flex h-24 w-24 items-center justify-center rounded-[26px] border bg-[#090f18]"
                        style={{
                          borderColor: selected
                            ? `${step.color}66`
                            : "rgba(255,255,255,.08)",
                          boxShadow: selected
                            ? `0 18px 50px ${step.color}18`
                            : undefined,
                        }}
                      >
                        <Icon
                          size={26}
                          style={{ color: selected ? step.color : "#475569" }}
                        />
                      </div>
                    </motion.div>

                    {/* output below conveyor */}
                    <div className="absolute bottom-8 left-4 right-4">
                      <StageOutput
                        index={index}
                        active={selected}
                        color={step.color}
                        reduceMotion={reduceMotion}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* project object moves between stations */}
            {!reduceMotion && (
              <motion.div
                animate={{
                  left: ["8%", "28%", "48%", "68%", "88%"],
                }}
                transition={{
                  duration: 9.6,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute top-[329px] z-20 h-8 w-8 -translate-x-1/2 rounded-xl border border-white/15 bg-white shadow-[0_6px_24px_rgba(255,255,255,.14)]"
              />
            )}
          </div>

          {/* MOBILE / TABLET */}
          <div className="p-4 sm:p-5 lg:hidden">
            <div className="space-y-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const selected = active === index;

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => {
                      setActive(index);
                      setManual(true);
                    }}
                    className={[
                      "w-full overflow-hidden rounded-[22px] border text-left transition-colors",
                      selected
                        ? "border-white/[0.13] bg-white/[0.035]"
                        : "border-white/[0.06] bg-transparent",
                    ].join(" ")}
                  >
                    <div className="grid grid-cols-[48px_1fr_auto] items-center gap-3 px-4 py-4">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                        style={{
                          color: selected ? step.color : "#64748b",
                          borderColor: selected
                            ? `${step.color}55`
                            : "rgba(255,255,255,.07)",
                          backgroundColor: selected
                            ? `${step.color}10`
                            : "rgba(255,255,255,.02)",
                        }}
                      >
                        <Icon size={17} />
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-black tracking-[0.12em]"
                            style={{ color: step.color }}
                          >
                            {step.number}
                          </span>

                          <h3 className="text-base font-bold text-white">
                            {step.title}
                          </h3>
                        </div>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {step.text}
                        </p>
                      </div>

                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: selected ? step.color : "#334155",
                        }}
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {selected && (
                        <motion.div
                          initial={
                            reduceMotion
                              ? false
                              : { height: 0, opacity: 0 }
                          }
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/[0.07] px-4 py-4">
                            <StageOutput
                              index={index}
                              active
                              color={step.color}
                              reduceMotion={reduceMotion}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>

          {/* bottom reassurance */}
          <div className="flex flex-col gap-3 border-t border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Check size={13} className="text-emerald-400" />
              Simple process. Clear ownership. Visible progress.
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.11em] text-slate-600">
              Understand → Plan → Build → Launch → Scale
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StageOutput({
  index,
  active,
  color,
  reduceMotion,
}: {
  index: number;
  active: boolean;
  color: string;
  reduceMotion: boolean | null;
}) {
  if (index === 0) {
    return (
      <div className="relative h-[118px]">
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-3">
          {[34, 50, 66].map((size, i) => (
            <motion.span
              key={size}
              animate={{
                scale: active ? 1 : 0.92,
                opacity: active ? 1 : 0.35,
              }}
              className="rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: `${color}${i === 2 ? "66" : "33"}`,
              }}
            />
          ))}
        </div>
        <p className="absolute left-0 top-0 text-[10px] font-black uppercase tracking-[0.11em] text-slate-700">
          Discover the real problem
        </p>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="relative h-[118px] overflow-hidden">
        <svg
          viewBox="0 0 180 100"
          className="absolute inset-x-0 bottom-0 h-[95px] w-full"
          fill="none"
        >
          <motion.path
            d="M14 76 L52 36 L94 58 L132 22 L166 50"
            stroke={active ? color : "#334155"}
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0.4 }}
            transition={{ duration: 0.8, ease }}
          />
        </svg>
        <p className="absolute left-0 top-0 text-[10px] font-black uppercase tracking-[0.11em] text-slate-700">
          Map the right route
        </p>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="h-[118px]">
        <p className="text-[10px] font-black uppercase tracking-[0.11em] text-slate-700">
          Assemble the product
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((item) => (
            <motion.div
              key={item}
              initial={reduceMotion ? false : { y: 12, opacity: 0 }}
              animate={{
                y: active ? 0 : 8,
                opacity: active ? 1 : 0.28,
              }}
              transition={{ delay: item * 0.08, duration: 0.4 }}
              className="h-14 rounded-xl border border-white/[0.07] bg-white/[0.025]"
            >
              <div
                className="mx-auto mt-4 h-2 w-8 rounded-full"
                style={{ backgroundColor: color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className="relative h-[118px]">
        <p className="text-[10px] font-black uppercase tracking-[0.11em] text-slate-700">
          Test. Release. Go live.
        </p>

        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center">
          <motion.div
            animate={
              active && !reduceMotion
                ? {
                    y: [8, -10, 0],
                    scale: [0.92, 1.08, 1],
                  }
                : undefined
            }
            className="flex h-14 w-14 items-center justify-center rounded-full border"
            style={{
              borderColor: `${color}55`,
              color,
              backgroundColor: `${color}10`,
            }}
          >
            <Rocket size={19} />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[118px]">
      <p className="text-[10px] font-black uppercase tracking-[0.11em] text-slate-700">
        Keep improving
      </p>

      <div className="mt-5 flex h-[72px] items-end gap-2">
        {[28, 38, 48, 62, 78, 94].map((height, index) => (
          <motion.span
            key={height}
            initial={reduceMotion ? false : { height: 0 }}
            animate={{
              height: active ? `${height}%` : `${height * 0.45}%`,
            }}
            transition={{
              duration: 0.45,
              delay: index * 0.05,
            }}
            className="w-full rounded-t-md"
            style={{
              backgroundColor: index >= 4 ? color : "#1b3044",
            }}
          />
        ))}
      </div>
    </div>
  );
}