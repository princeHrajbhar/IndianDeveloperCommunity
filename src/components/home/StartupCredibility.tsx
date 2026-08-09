"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const principles = [
  {
    number: "01",
    title: "Founder-led collaboration",
    description:
      "Work directly with the people shaping the product, technology and research direction.",
  },
  {
    number: "02",
    title: "Focused AI experiments",
    description:
      "Begin with a clearly defined problem, test the idea and learn before expanding the scope.",
  },
  {
    number: "03",
    title: "Transparent communication",
    description:
      "Clear expectations, documented decisions and honest communication throughout the process.",
  },
  {
    number: "04",
    title: "Responsible innovation",
    description:
      "Privacy, security, human oversight and practical limitations are considered from the beginning.",
  },
];

const businessPoints = [
  "Explore a business problem that AI may improve",
  "Evaluate technical and operational feasibility",
  "Define a focused prototype or pilot",
  "Create a practical path toward production",
];

const studentPoints = [
  "Explore practical AI and software challenges",
  "Develop research and engineering discipline",
  "Participate in future community initiatives",
  "Create meaningful portfolio-ready work",
];

export default function StartupCredibility() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
      />

      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
        {/* Heading */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-100/75 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-300" />
              </span>

              Early-stage · Open to collaboration
            </div>

            <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
              Building trust through
              <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                real work.
              </span>
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
              QuantumFinix is an early-stage AI software and
              research startup. We are not presenting borrowed
              client logos or invented numbers. We are building
              credibility through useful experiments, clear
              communication, responsible engineering and open
              collaboration.
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              delay: 0.15,
            }}
            className="hidden lg:block"
          >
            <LogoCore reduceMotion={Boolean(reduceMotion)} />
          </motion.div>
        </div>

        {/* Honest credibility statement */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="mt-14 flex flex-col gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-300">
              <ShieldIcon />
            </span>

            <div>
              <p className="text-sm font-semibold text-white">
                Honest from the beginning
              </p>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                Our current strength is direct access,
                focused experimentation, adaptable thinking
                and the opportunity for early collaborators
                to influence what we build.
              </p>
            </div>
          </div>

          <Link
            href="/insights"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-cyan-200"
          >
            Explore our thinking

            <span className="transition-transform group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>

        {/* Collaboration cards */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <AudienceCard
            eyebrow="For businesses and founders"
            title="Start with one valuable AI opportunity."
            description="Bring a workflow, operational challenge or product idea. Together, we can clarify the problem, examine feasibility and shape a focused prototype."
            points={businessPoints}
            status="Pilot discussions open"
            href="/book-consultation"
            buttonLabel="Discuss your idea"
            icon={<BusinessIcon />}
          />

          <AudienceCard
            eyebrow="For students and builders"
            title="Learn by solving meaningful problems."
            description="QuantumFinix aims to create opportunities for students, developers and researchers to strengthen practical skills through experiments and collaborative learning."
            points={studentPoints}
            status="Student interest open"
            href="/community"
            buttonLabel="Join the community"
            icon={<StudentIcon />}
            secondary
          />
        </div>

        {/* Principles */}
        <div className="mt-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-3xl"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-300/65">
              How we intend to work
            </p>

            <h3 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl">
              Credibility is built through the process.
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              These principles guide how QuantumFinix approaches
              early customers, students, contributors and future
              research collaborators.
            </p>
          </motion.div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {principles.map((principle, index) => (
              <motion.article
                key={principle.number}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -7,
                      }
                }
                className="group relative overflow-hidden rounded-3xl border border-white/[0.075] bg-white/[0.025] p-6 backdrop-blur-xl transition-colors hover:border-cyan-300/20 hover:bg-cyan-300/[0.04]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-300/[0.05] font-mono text-xs text-cyan-200">
                    {principle.number}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-cyan-300/50 shadow-[0_0_14px_rgba(34,211,238,0.6)]" />
                </div>

                <h4 className="mt-6 text-lg font-semibold text-white">
                  {principle.title}
                </h4>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {principle.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type AudienceCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  status: string;
  href: string;
  buttonLabel: string;
  icon: React.ReactNode;
  secondary?: boolean;
};

function AudienceCard({
  eyebrow,
  title,
  description,
  points,
  status,
  href,
  buttonLabel,
  icon,
  secondary = false,
}: AudienceCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.8,
      }}
      whileHover={{
        y: -6,
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/[0.085] bg-[#06101c]/55 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="absolute -bottom-28 -right-24 h-64 w-64 rounded-full bg-cyan-500/[0.07] blur-[80px]" />

      <div className="relative">
        <div className="flex items-start justify-between gap-5">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
              secondary
                ? "border-blue-300/15 bg-blue-400/[0.07] text-blue-200"
                : "border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200"
            }`}
          >
            {icon}
          </span>

          <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-emerald-300/80">
            {status}
          </span>
        </div>

        <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300/65">
          {eyebrow}
        </p>

        <h3 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl">
          {title}
        </h3>

        <p className="mt-5 text-sm leading-7 text-slate-400">
          {description}
        </p>

        <ul className="mt-7 space-y-3">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm text-slate-300"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200">
                <CheckIcon />
              </span>

              {point}
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className={
            secondary
              ? "group/button mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-6 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.12]"
              : "group/button mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-6 text-sm font-bold text-[#020711] shadow-[0_0_35px_rgba(34,211,238,0.17)]"
          }
        >
          {buttonLabel}

          <span className="transition-transform group-hover/button:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

function LogoCore({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <div className="relative flex h-52 w-52 items-center justify-center">
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-300/15"
      >
        <span className="absolute left-1/2 top-[-4px] h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,1)]" />
      </motion.div>

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-6 rounded-full border border-cyan-300/15"
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.06, 1],
                boxShadow: [
                  "0 0 35px rgba(34,211,238,0.12)",
                  "0 0 70px rgba(34,211,238,0.28)",
                  "0 0 35px rgba(34,211,238,0.12)",
                ],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-cyan-300/20 bg-[#04111e]/90"
      >
        <Image
          src="/quantumfinix-mark.png"
          alt="QuantumFinix"
          width={180}
          height={180}
          className="h-24 w-24 object-contain"
        />
      </motion.div>
    </div>
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

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M12 3 20 6v6c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6l8-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="m8.5 12 2.2 2.2 4.8-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BusinessIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M4 20V8.5L12 4l8 4.5V20M8 20v-5h8v5M8 10h.01M12 10h.01M16 10h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StudentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="m3 9 9-5 9 5-9 5-9-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M7 12v4.5c3 2 7 2 10 0V12M21 9v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}