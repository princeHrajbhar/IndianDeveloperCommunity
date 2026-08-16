"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";

const slides = [
  {
    id: "buy",
    eyebrow: "01 / BUY",
    kicker: "Launch faster",
    title: ["Buy", "ready-to-run", "digital systems."],
    description:
      "Skip the blank canvas. Start with proven software, automation and growth systems that can be configured around your business.",
    primary: { label: "Explore solutions", href: "/book-consultation" },
    secondary: { label: "See what fits", href: "/book-consultation" },
    chips: ["AI products", "Automation packs", "Growth systems"],
    stat: { value: "10×", label: "faster starting point" },
    accent: "cyan",
  },
  {
    id: "build",
    eyebrow: "02 / BUILD",
    kicker: "Create what does not exist",
    title: ["Build", "software around", "your advantage."],
    description:
      "Custom AI, software and connected workflows designed around the way your team actually operates — not the other way around.",
    primary: { label: "Build with us", href: "/book-consultation" },
    secondary: { label: "View capabilities", href: "/book-consultation" },
    chips: ["Custom AI", "Software", "Integrations"],
    stat: { value: "01", label: "system, fully connected" },
    accent: "blue",
  },
  {
    id: "grow",
    eyebrow: "03 / GROW",
    kicker: "Turn systems into momentum",
    title: ["Grow", "with an engine", "that compounds."],
    description:
      "Connect product, automation and digital growth into one measurable loop that learns, improves and keeps moving your business forward.",
    primary: { label: "Accelerate growth", href: "/digital-marketing" },
    secondary: { label: "Plan your growth", href: "/book-consultation" },
    chips: ["Acquisition", "Conversion", "Retention"],
    stat: { value: "24/7", label: "growth loop in motion" },
    accent: "cyan",
  },
] as const;

const particles = Array.from({ length: 24 }, (_, index) => ({
  left: (index * 41) % 100,
  top: (index * 67) % 100,
  size: index % 5 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
  duration: 6 + (index % 6),
  delay: (index % 8) * 0.35,
  drift: ((index % 7) - 3) * 8,
}));

const accentStyles = {
  cyan: {
    glow: "from-cyan-300 via-cyan-400 to-blue-500",
    text: "from-white via-cyan-100 to-cyan-400",
    ring: "border-cyan-300/25",
    soft: "bg-cyan-300/10",
  },
  blue: {
    glow: "from-blue-300 via-blue-500 to-cyan-400",
    text: "from-white via-blue-100 to-cyan-300",
    ring: "border-blue-300/25",
    soft: "bg-blue-400/10",
  },
} as const;

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotlightX = useMotionValue(700);
  const spotlightY = useMotionValue(400);

  const smoothX = useSpring(pointerX, {
    stiffness: 55,
    damping: 25,
    mass: 0.8,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 55,
    damping: 25,
    mass: 0.8,
  });

  const contentX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const contentY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const visualX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const visualY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);

  const spotlight = useMotionTemplate`
    radial-gradient(
      620px circle at ${spotlightX}px ${spotlightY}px,
      rgba(34, 211, 238, 0.11),
      transparent 72%
    )
  `;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX / window.innerWidth - 0.5);
    pointerY.set(event.clientY / window.innerHeight - 0.5);
    spotlightX.set(event.clientX - bounds.left);
    spotlightY.set(event.clientY - bounds.top);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const slide = slides[active];
  const accent = accentStyles[slide.accent];

  return (
    <MotionConfig reducedMotion="user">
      <section
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden bg-[#02050c] text-white sm:min-h-[calc(100svh-80px)]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_30%,rgba(14,165,233,0.14),transparent_28%),radial-gradient(circle_at_14%_22%,rgba(14,165,233,0.10),transparent_30%),linear-gradient(135deg,#02050c_0%,#061122_48%,#02040a_100%)]"
        />

        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 opacity-[0.18] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.075)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <motion.div
          aria-hidden="true"
          animate={{ rotate: [0, 8, -5, 0], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -right-64 top-[-18%] -z-20 h-[52rem] w-[52rem] rounded-full blur-[170px] ${accent.soft}`}
        />

        <div aria-hidden="true" className="absolute inset-0 -z-10">
          {particles.map((particle, index) => (
            <motion.span
              key={index}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                x: [0, particle.drift, 0],
                y: [0, -24, 0],
                opacity: [0.08, 0.72, 0.08],
                scale: [1, 1.6, 1],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(103,232,249,0.75)]"
            />
          ))}
        </div>

        <div className="mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-[1680px] grid-cols-1 items-center gap-10 px-4 py-10 sm:min-h-[calc(100svh-80px)] sm:px-7 lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.9fr)_110px] lg:gap-8 lg:px-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(520px,0.92fr)_132px] xl:px-16">
          <motion.div
            style={{ x: contentX, y: contentY }}
            className="relative z-20 min-w-0 py-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-300 backdrop-blur-xl">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
                    {slide.eyebrow}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-slate-600">
                    {slide.kicker}
                  </span>
                </div>

                <h1 className="max-w-5xl font-black uppercase leading-[0.86] tracking-[-0.055em]">
                  <motion.span
                    initial={{ opacity: 0, y: 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.05 }}
                    className="block text-[clamp(3.15rem,12vw,6.2rem)] text-white lg:text-[clamp(4.8rem,6.3vw,7.4rem)]"
                  >
                    {slide.title[0]}.
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.12 }}
                    className={`block bg-gradient-to-r bg-clip-text text-[clamp(2.2rem,8.5vw,4.5rem)] text-transparent sm:text-[clamp(3.2rem,6vw,5.6rem)] ${accent.text}`}
                  >
                    {slide.title[1]}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.18 }}
                    className="block text-[clamp(2.2rem,8.5vw,4.5rem)] text-slate-500 sm:text-[clamp(3.2rem,6vw,5.6rem)]"
                  >
                    {slide.title[2]}
                  </motion.span>
                </h1>

                <p className="mt-7 max-w-2xl text-[15px] leading-7 text-slate-400 sm:mt-9 sm:text-lg sm:leading-8">
                  {slide.description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
                  <Link
                    href={slide.primary.href}
                    className={`group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r px-7 text-sm font-bold text-[#020711] shadow-[0_0_50px_rgba(34,211,238,0.16)] ${accent.glow}`}
                  >
                    <span className="absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/65 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />
                    <span className="relative flex items-center gap-3">
                      {slide.primary.label}
                      <ArrowIcon />
                    </span>
                  </Link>

                  <Link
                    href={slide.secondary.href}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-6 text-sm font-semibold text-slate-300 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                  >
                    {slide.secondary.label}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-2 sm:mt-10">
                  {slide.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[11px] text-slate-500 backdrop-blur-lg"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex max-w-2xl items-center gap-4 border-t border-white/[0.07] pt-5 sm:mt-12 sm:gap-6 sm:pt-6">
              <div className="min-w-[96px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${slide.id}-stat`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-3xl font-black tracking-[-0.04em] text-white"
                  >
                    {slide.stat.value}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-600">
                  {slide.stat.label}
                </p>
              </div>

              <div className="h-px flex-1 overflow-hidden bg-white/[0.07]">
                <motion.div
                  key={`${slide.id}-progress`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 6.5, ease: "linear" }}
                  className={`h-full origin-left bg-gradient-to-r ${accent.glow}`}
                />
              </div>

              <span className="font-mono text-xs text-slate-600">
                0{active + 1} / 0{slides.length}
              </span>
            </div>
          </motion.div>

          <motion.div
            style={{ x: visualX, y: visualY }}
            className="relative mx-auto flex h-[420px] w-full max-w-[620px] items-center justify-center sm:h-[560px] lg:h-[650px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.86, rotate: -3, filter: "blur(18px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, rotate: 3, filter: "blur(16px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {slide.id === "buy" && <BuyVisual />}
                {slide.id === "build" && <BuildVisual />}
                {slide.id === "grow" && <GrowVisual />}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <aside className="relative z-30 hidden h-[72%] min-h-[430px] flex-col justify-center gap-3 lg:flex">
            {slides.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show ${item.id} slide`}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative flex min-h-[118px] w-full flex-col justify-between overflow-hidden rounded-[1.4rem] border p-3 text-left transition-all duration-500 xl:min-h-[132px] xl:p-4 ${
                    isActive
                      ? "border-white/20 bg-white/[0.07] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                      : "border-white/[0.07] bg-white/[0.025] opacity-55 hover:opacity-90"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-slate-500">0{index + 1}</span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? "bg-cyan-200 shadow-[0_0_14px_rgba(103,232,249,0.85)]" : "bg-slate-700"
                      }`}
                    />
                  </div>

                  <div>
                    <span className="block text-lg font-black uppercase tracking-[-0.03em] text-white xl:text-xl">
                      {item.id}
                    </span>
                    <span className="mt-1 block text-[9px] leading-4 text-slate-500 xl:text-[10px]">
                      {item.kicker}
                    </span>
                  </div>

                  {isActive && (
                    <motion.span
                      layoutId="active-slide-rail"
                      className="absolute inset-y-3 left-0 w-px bg-gradient-to-b from-transparent via-cyan-200 to-transparent"
                    />
                  )}
                </button>
              );
            })}
          </aside>
        </div>

        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2 lg:hidden">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${item.id} slide`}
              className={`h-1.5 rounded-full transition-all ${index === active ? "w-9 bg-cyan-200" : "w-4 bg-white/20"}`}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
        />
      </section>
    </MotionConfig>
  );
}

function BuyVisual() {
  const cards = [
    { title: "AI SALES", meta: "Ready stack", x: "left-[5%] top-[10%]", rotate: -7 },
    { title: "OPS FLOW", meta: "Automation", x: "right-[2%] top-[25%]", rotate: 6 },
    { title: "GROWTH KIT", meta: "Acquisition", x: "left-[11%] bottom-[8%]", rotate: 5 },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="absolute h-[76%] w-[76%] rounded-full border border-dashed border-cyan-200/15"
      />
      <div className="absolute h-[54%] w-[54%] rounded-full bg-cyan-400/15 blur-[100px]" />

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-[58%] max-w-[330px] rounded-[2.2rem] border border-cyan-100/20 bg-[#06131f]/80 p-5 shadow-[0_35px_110px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-7"
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.26em] text-cyan-100/55">Solution shelf</span>
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-[8px] uppercase tracking-[0.18em] text-emerald-200">Live</span>
        </div>
        <div className="mt-10 flex items-end justify-between">
          <div>
            <p className="text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">BUY</p>
            <p className="mt-2 text-xs text-slate-500">Configure. Connect. Launch.</p>
          </div>
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-100/15 bg-cyan-300/10">
            <PackageIcon />
          </div>
        </div>
        <div className="mt-8 space-y-2">
          {["Strategy", "System", "Deployment"].map((label, index) => (
            <div key={label} className="flex items-center gap-3 rounded-xl bg-white/[0.035] px-3 py-2.5">
              <span className="font-mono text-[9px] text-cyan-300/70">0{index + 1}</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">{label}</span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-300" />
            </div>
          ))}
        </div>
      </motion.div>

      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          animate={{ y: [0, index % 2 ? 10 : -10, 0] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
          style={{ rotate: card.rotate }}
          className={`absolute ${card.x} hidden w-36 rounded-2xl border border-white/10 bg-[#07111d]/78 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:block`}
        >
          <span className="text-[8px] uppercase tracking-[0.22em] text-slate-600">Module 0{index + 1}</span>
          <p className="mt-5 text-sm font-black tracking-[-0.02em] text-white">{card.title}</p>
          <p className="mt-1 text-[9px] text-cyan-100/50">{card.meta}</p>
        </motion.div>
      ))}
    </div>
  );
}

function BuildVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-[56%] w-[56%] rounded-full bg-blue-500/15 blur-[110px]" />
      {[0, 60, 120].map((rotation, index) => (
        <motion.div
          key={rotation}
          animate={{ rotate: [rotation, rotation + 360] }}
          transition={{ duration: 18 + index * 7, repeat: Infinity, ease: "linear" }}
          className="absolute h-[38%] w-[78%] rounded-[50%] border border-blue-300/[0.12]"
        />
      ))}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        className="absolute h-[80%] w-[80%] rounded-full border border-dashed border-blue-200/10"
      >
        <OrbitDot className="left-1/2 top-[-5px]" />
        <OrbitDot className="bottom-[8%] right-[14%]" />
        <OrbitDot className="left-[5%] top-[38%]" />
      </motion.div>

      <motion.div
        animate={{ scale: [0.97, 1.03, 0.97] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex h-[46%] w-[46%] min-w-[210px] items-center justify-center rounded-full border border-blue-100/20 bg-[#06101f]/82 shadow-[0_0_120px_rgba(59,130,246,0.2)] backdrop-blur-2xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
          className="absolute inset-5 rounded-full border-r border-t border-blue-200/45"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-10 rounded-full border-b border-l border-cyan-300/35"
        />
        <div className="grid h-[54%] w-[54%] place-items-center rounded-full border border-white/[0.07] bg-[radial-gradient(circle,rgba(59,130,246,0.18),rgba(3,10,20,0.92)_70%)]">
          <BuildMark />
        </div>
        <div className="absolute -bottom-10 text-center">
          <p className="text-[9px] uppercase tracking-[0.3em] text-blue-100/45">Design • Code • Connect</p>
          <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-blue-100">BUILD CORE</p>
        </div>
      </motion.div>

      <FloatingMetric className="left-[2%] top-[19%]" label="SYSTEM" value="Composable" />
      <FloatingMetric className="bottom-[15%] right-[1%]" label="LOGIC" value="Connected" delay={0.8} />
    </div>
  );
}

function GrowVisual() {
  const bars = [38, 56, 48, 72, 66, 89, 100];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-[58%] w-[58%] rounded-full bg-cyan-500/15 blur-[120px]" />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        className="absolute h-[82%] w-[82%] rounded-full border border-dashed border-cyan-200/10"
      />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-[72%] max-w-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080b18]/80 p-5 shadow-[0_35px_110px_rgba(0,0,0,0.48)] backdrop-blur-2xl sm:p-7"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.24em] text-cyan-200/50">Growth engine</p>
            <p className="mt-2 text-xl font-black tracking-[-0.03em] text-white">Compounding signal</p>
          </div>
          <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.16em] text-emerald-200">+28.4%</div>
        </div>

        <div className="relative mt-9 h-44 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 sm:h-52">
          <div className="absolute inset-x-4 top-1/2 h-px bg-white/[0.06]" />
          <div className="absolute inset-x-4 top-1/4 h-px bg-white/[0.04]" />
          <div className="absolute inset-x-4 top-3/4 h-px bg-white/[0.04]" />
          <div className="flex h-full items-end gap-2 sm:gap-3">
            {bars.map((height, index) => (
              <motion.div
                key={height + index}
                initial={{ height: "8%" }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex-1 rounded-t-md bg-gradient-to-t from-blue-500/20 via-cyan-500/60 to-cyan-300"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-white/70 shadow-[0_0_18px_rgba(165,243,252,0.9)]" />
              </motion.div>
            ))}
          </div>

          <motion.svg viewBox="0 0 420 160" className="pointer-events-none absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]" fill="none">
            <motion.path
              d="M4 139 C48 126, 70 132, 106 105 S167 112, 205 78 S270 92, 309 51 S363 58, 416 17"
              stroke="url(#growth-line)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <defs>
              <linearGradient id="growth-line" x1="4" y1="139" x2="416" y2="17">
                <stop stopColor="#3B82F6" />
                <stop offset="0.55" stopColor="#22D3EE" />
                <stop offset="1" stopColor="#67E8F9" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Acquire", "Convert", "Retain"].map((item, index) => (
            <div key={item} className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
              <span className="text-[8px] uppercase tracking-[0.18em] text-slate-600">0{index + 1}</span>
              <p className="mt-2 text-[10px] font-semibold text-slate-300">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <FloatingMetric className="left-[2%] top-[14%]" label="CAC" value="↓ 18%" />
      <FloatingMetric className="bottom-[11%] right-[0%]" label="LTV" value="↑ 34%" delay={0.9} />
    </div>
  );
}

function FloatingMetric({
  className,
  label,
  value,
  delay = 0,
}: {
  className: string;
  label: string;
  value: string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute hidden w-40 rounded-2xl border border-white/10 bg-[#07101c]/76 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:block ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[8px] uppercase tracking-[0.22em] text-slate-600">{label}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
      </div>
      <p className="mt-4 text-sm font-semibold text-cyan-50">{value}</p>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
        <motion.div
          animate={{ x: ["-120%", "240%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
        />
      </div>
    </motion.div>
  );
}

function OrbitDot({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-2.5 w-2.5 rounded-full border border-cyan-100/50 bg-cyan-300/30 shadow-[0_0_20px_rgba(34,211,238,0.85)] ${className}`}
    />
  );
}

function PackageIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7 text-cyan-100" aria-hidden="true">
      <path d="m7 10 9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 10v11l9 6 9-6V10M16 15v12" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BuildMark() {
  return (
    <motion.svg viewBox="0 0 80 80" fill="none" className="h-[70%] w-[70%]" aria-hidden="true">
      <motion.path
        d="M18 47 34 31l10 10 18-20"
        stroke="url(#build-gradient)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4 }}
      />
      <motion.path
        d="M20 58h40"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      <defs>
        <linearGradient id="build-gradient" x1="18" y1="47" x2="62" y2="21">
          <stop stopColor="#93C5FD" />
          <stop offset="0.55" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
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