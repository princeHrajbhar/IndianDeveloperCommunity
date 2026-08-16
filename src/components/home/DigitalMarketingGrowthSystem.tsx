"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  BarChart3,
  Mail,
  Megaphone,
  MousePointerClick,
  Search,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type Channel = {
  id: string;
  label: string;
  short: string;
  color: string;
  soft: string;
  icon: typeof Search;
  metric: string;
  metricLabel: string;
  message: string;
};

const channels: Channel[] = [
  {
    id: "seo",
    label: "SEO",
    short: "Search",
    color: "#64d8ff",
    soft: "rgba(100,216,255,.14)",
    icon: Search,
    metric: "+184%",
    metricLabel: "organic visibility",
    message: "Get discovered when customers are already searching.",
  },
  {
    id: "social",
    label: "Social Media",
    short: "Social",
    color: "#a78bfa",
    soft: "rgba(167,139,250,.14)",
    icon: Share2,
    metric: "3.8×",
    metricLabel: "engagement lift",
    message: "Turn attention into an audience that remembers you.",
  },
  {
    id: "ppc",
    label: "PPC / Paid Ads",
    short: "Paid",
    color: "#ff7a59",
    soft: "rgba(255,122,89,.14)",
    icon: Megaphone,
    metric: "4.6×",
    metricLabel: "return on ad spend",
    message: "Put high-intent offers in front of the right people fast.",
  },
  {
    id: "email",
    label: "Email Marketing",
    short: "Email",
    color: "#f7c948",
    soft: "rgba(247,201,72,.14)",
    icon: Mail,
    metric: "+42%",
    metricLabel: "repeat conversions",
    message: "Nurture interest and turn customers into repeat buyers.",
  },
  {
    id: "content",
    label: "Content",
    short: "Content",
    color: "#ff5ca8",
    soft: "rgba(255,92,168,.14)",
    icon: Sparkles,
    metric: "2.7×",
    metricLabel: "qualified traffic",
    message: "Create useful content that earns attention and trust.",
  },
  {
    id: "cro",
    label: "CRO & Analytics",
    short: "CRO",
    color: "#5ee6a8",
    soft: "rgba(94,230,168,.14)",
    icon: BarChart3,
    metric: "+31%",
    metricLabel: "conversion rate",
    message: "Turn more of your existing traffic into measurable growth.",
  },
];

const orbitPositions = [
  "left-[4%] top-[12%]",
  "right-[4%] top-[13%]",
  "left-[1%] top-[46%]",
  "right-[1%] top-[47%]",
  "left-[11%] bottom-[8%]",
  "right-[10%] bottom-[8%]",
];

export default function DigitalMarketingCampaignUniverse() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = channels[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="relative overflow-hidden bg-[#03040a] py-16 text-white sm:py-20 lg:py-24">
      {/* atmospheric field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[10%] h-[360px] w-[360px] rounded-full bg-[#102244] opacity-50 blur-[100px]" />
        <div className="absolute right-[2%] top-[25%] h-[420px] w-[420px] rounded-full bg-[#2a1238] opacity-35 blur-[120px]" />
        <div className="absolute bottom-[-180px] left-[32%] h-[420px] w-[420px] rounded-full bg-[#082b33] opacity-45 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,255,255,.16) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage:
              "linear-gradient(to bottom, black 0%, transparent 94%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1520px] px-5 sm:px-7 lg:px-10 xl:px-16">
        {/* =====================================================
            TOP MESSAGE
        ====================================================== */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="h-px w-8 bg-[#6fdcff]" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ee6ff]">
                Digital Marketing
              </span>
            </div>

            <p className="mt-5 max-w-[430px] text-sm leading-7 text-slate-500">
              Introduction → Value → Direction. The detail belongs on the
              dedicated service pages.
            </p>
          </motion.div>

          <div>
            <h2 className="max-w-[1100px] text-[clamp(2.65rem,5.2vw,5.9rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
              <span className="text-white">Grow Your Business. </span>
              <span className="text-[#77d6ff]">
                Make every channel work together.
              </span>
            </h2>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="mt-6 max-w-[760px] text-[17px] leading-8 text-slate-300 sm:text-lg"
            >
              Improve visibility, traffic, leads and conversions with digital
              marketing built around your goals.
            </motion.p>
          </div>
        </div>

        {/* =====================================================
            CAMPAIGN UNIVERSE
        ====================================================== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.75, delay: 0.1, ease }}
          className="relative mt-10 min-h-[620px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#070913] sm:rounded-[34px] md:min-h-[720px]"
        >
          {/* animated aurora strips */}
          {!reduceMotion && (
            <>
              <motion.div
                aria-hidden="true"
                animate={{ x: ["-20%", "18%", "-20%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[-20%] top-[10%] h-[240px] w-[70%] rotate-[-12deg] bg-[#102a4a] opacity-45 blur-[70px]"
              />
              <motion.div
                aria-hidden="true"
                animate={{ x: ["12%", "-14%", "12%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[-22%] bottom-[6%] h-[250px] w-[70%] rotate-[10deg] bg-[#2c1538] opacity-35 blur-[80px]"
              />
            </>
          )}

          {/* constellation arcs */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 720"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
          >
            <ellipse
              cx="600"
              cy="355"
              rx="425"
              ry="230"
              stroke="rgba(255,255,255,.08)"
              strokeWidth="1"
              strokeDasharray="5 10"
            />
            <ellipse
              cx="600"
              cy="355"
              rx="330"
              ry="175"
              stroke="rgba(109,210,255,.10)"
              strokeWidth="1"
            />
            <path
              d="M180 355 C300 175 430 170 600 250 C770 330 900 220 1030 120"
              stroke="rgba(255,255,255,.06)"
              strokeWidth="1"
            />
          </svg>

          {/* orbiting channel controls */}
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            const selected = index === activeIndex;

            return (
              <motion.button
                key={channel.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: 0.18 + index * 0.07 }}
                whileHover={reduceMotion ? undefined : { scale: 1.05, y: -3 }}
                className={[
                  "absolute z-20 hidden items-center gap-3 rounded-full border px-3 py-2.5 text-left transition-colors duration-300 md:flex",
                  orbitPositions[index],
                  selected
                    ? "border-white/20 bg-white/[0.09]"
                    : "border-white/[0.08] bg-black/20 hover:bg-white/[0.05]",
                ].join(" ")}
                style={{
                  boxShadow: selected
                    ? `0 0 0 1px ${channel.color}22, 0 14px 34px ${channel.color}18`
                    : undefined,
                }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: channel.soft,
                    color: channel.color,
                  }}
                >
                  <Icon size={15} />
                </span>

                <span>
                  <span className="block text-xs font-bold text-white">
                    {channel.label}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-slate-500">
                    {channel.metric}
                  </span>
                </span>
              </motion.button>
            );
          })}

          {/* mobile channel selector — no horizontal scrollbar */}
          <div className="relative z-20 border-b border-white/[0.07] p-3 sm:p-4 md:hidden">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {channels.map((channel, index) => {
                const Icon = channel.icon;
                const selected = index === activeIndex;

                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={[
                      "flex min-w-0 items-center gap-2 rounded-2xl border px-3 py-2.5 text-left text-[11px] font-semibold transition-colors",
                      selected
                        ? "border-white/20 bg-white/[0.08] text-white"
                        : "border-white/[0.07] bg-white/[0.02] text-slate-500",
                    ].join(" ")}
                    style={{
                      boxShadow: selected
                        ? `inset 0 0 0 1px ${channel.color}22`
                        : undefined,
                    }}
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: channel.soft,
                        color: channel.color,
                      }}
                    >
                      <Icon size={12} />
                    </span>

                    <span className="truncate">{channel.short}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* central growth engine */}
          <div className="relative z-10 flex min-h-[560px] items-center justify-center px-3 py-6 sm:min-h-[620px] sm:px-5 sm:py-8 md:min-h-[720px]">
            <div className="relative w-full max-w-[720px]">
              {/* orbit glow */}
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: 26,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.08] sm:h-[360px] sm:w-[360px] md:h-[420px] md:w-[420px]"
              />

              {/* conversion particles */}
              {!reduceMotion &&
                Array.from({ length: 10 }).map((_, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      x: [0, (index % 2 ? 1 : -1) * (80 + index * 7), 0],
                      y: [0, -60 - index * 8, 0],
                      opacity: [0, 1, 0],
                      scale: [0.6, 1, 0.4],
                    }}
                    transition={{
                      duration: 4 + (index % 4),
                      repeat: Infinity,
                      delay: index * 0.35,
                      ease: "easeInOut",
                    }}
                    className={[
                      "absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full",
                      index > 4 ? "hidden sm:block" : "",
                    ].join(" ")}
                    style={{
                      backgroundColor: channels[index % channels.length].color,
                    }}
                  />
                ))}

              {/* device / campaign stage */}
              <div className="relative mx-auto max-w-[580px] overflow-hidden rounded-[30px] border border-white/[0.1] bg-[#0b0f1b] shadow-[0_30px_100px_rgba(0,0,0,.45)]">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: active.color }}
                    />
                    Live campaign
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 14, scale: 0.985 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.99 }}
                    transition={{ duration: 0.35, ease }}
                    className="p-4 sm:p-6"
                  >
                    {/* active channel headline */}
                    <div className="grid gap-4 sm:flex sm:items-start sm:justify-between">
                      <div>
                        <div
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold"
                          style={{
                            backgroundColor: active.soft,
                            color: active.color,
                          }}
                        >
                          <ActiveIcon size={12} />
                          {active.label}
                        </div>

                        <h3 className="mt-4 max-w-[430px] text-xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-3xl">
                          {active.message}
                        </h3>
                      </div>

                      <div className="text-left sm:text-right">
                        <p
                          className="text-2xl font-black"
                          style={{ color: active.color }}
                        >
                          {active.metric}
                        </p>
                        <p className="mt-1 max-w-[110px] text-[10px] leading-4 text-slate-500">
                          {active.metricLabel}
                        </p>
                      </div>
                    </div>

                    {/* colorful creative */}
                    <div className="mt-6 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
                      <motion.div
                        whileHover={reduceMotion ? undefined : { y: -4 }}
                        className="relative min-h-[225px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#101523] p-5"
                      >
                        <div
                          className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-[36px]"
                          style={{ backgroundColor: active.color }}
                        />

                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                          Campaign creative
                        </p>

                        <div className="mt-5">
                          <span
                            className="inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold"
                            style={{
                              backgroundColor: active.soft,
                              color: active.color,
                            }}
                          >
                            NEW CAMPAIGN
                          </span>

                          <h4 className="mt-4 max-w-[260px] text-[28px] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
                            Turn attention into action.
                          </h4>

                          <div className="mt-6 flex items-center gap-2">
                            <span
                              className="h-9 rounded-full px-4 text-[11px] font-black leading-9 text-[#05070d]"
                              style={{ backgroundColor: active.color }}
                            >
                              Discover more
                            </span>

                            <MousePointerClick
                              size={16}
                              style={{ color: active.color }}
                            />
                          </div>
                        </div>
                      </motion.div>

                      <div className="grid gap-3">
                        <div className="rounded-[22px] border border-white/[0.08] bg-[#0f1420] p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
                              Traffic pulse
                            </p>
                            <TrendingUp
                              size={14}
                              style={{ color: active.color }}
                            />
                          </div>

                          <div className="mt-4 flex h-[78px] items-end gap-1.5">
                            {[38, 52, 44, 68, 58, 86, 72, 94].map(
                              (height, index) => (
                                <motion.span
                                  key={index}
                                  initial={
                                    reduceMotion ? false : { height: 0 }
                                  }
                                  animate={{ height: `${height}%` }}
                                  transition={{
                                    duration: 0.45,
                                    delay: index * 0.04,
                                  }}
                                  className="w-full rounded-t-sm"
                                  style={{
                                    backgroundColor:
                                      index > 5 ? active.color : "#233148",
                                    opacity: index > 5 ? 0.95 : 0.7,
                                  }}
                                />
                              )
                            )}
                          </div>
                        </div>

                        <div className="rounded-[22px] border border-white/[0.08] bg-[#0f1420] p-4">
                          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
                            Funnel movement
                          </p>

                          <div className="mt-4 space-y-2.5">
                            {[
                              ["Visibility", 94],
                              ["Traffic", 76],
                              ["Leads", 54],
                              ["Conversions", 38],
                            ].map(([label, width], index) => (
                              <div key={label as string}>
                                <div className="flex justify-between text-[10px]">
                                  <span className="text-slate-500">
                                    {label as string}
                                  </span>
                                  <span className="font-bold text-slate-300">
                                    {width}%
                                  </span>
                                </div>
                                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                                  <motion.div
                                    initial={
                                      reduceMotion ? false : { width: 0 }
                                    }
                                    animate={{ width: `${width}%` }}
                                    transition={{
                                      duration: 0.7,
                                      delay: 0.12 + index * 0.08,
                                      ease,
                                    }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: active.color }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* footer action rail */}
          <div className="relative z-20 flex flex-col gap-4 border-t border-white/[0.07] bg-black/20 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                One strategy · Multiple channels
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-200">
                Visibility → Traffic → Leads → Conversions
              </p>
            </div>

            <Link
              href="/digital-marketing"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-black text-[#07101f] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Grow My Business
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}