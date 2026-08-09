"use client";

import Link from "next/link";
import type {
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

type Service = {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  href: string;
  icon: ReactNode;
  accent: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Custom Software Development",
    description:
      "Design and build reliable software around the way your business actually works.",
    capabilities: [
      "SaaS and web platforms",
      "Internal business systems",
      "Enterprise integrations",
    ],
    href: "/services/custom-software-development",
    icon: <SoftwareIcon />,
    accent: "Software engineering",
  },
  {
    number: "02",
    title: "AI Development",
    description:
      "Turn data, decisions and workflows into practical intelligent systems that create measurable value.",
    capabilities: [
      "AI agents and assistants",
      "Predictive models",
      "Recommendation systems",
    ],
    href: "/services/ai-development",
    icon: <AIIcon />,
    accent: "Applied intelligence",
  },
  {
    number: "03",
    title: "Generative AI Solutions",
    description:
      "Build grounded AI experiences that understand your documents, knowledge and business context.",
    capabilities: [
      "RAG and knowledge systems",
      "Document intelligence",
      "Business AI copilots",
    ],
    href: "/services/generative-ai-solutions",
    icon: <GenerativeAIIcon />,
    accent: "Generative systems",
  },
  {
    number: "04",
    title: "Mobile App Development",
    description:
      "Create fast, intuitive mobile products that deliver a consistent experience across devices.",
    capabilities: [
      "Android and iOS apps",
      "Cross-platform development",
      "API and cloud integration",
    ],
    href: "/services/mobile-app-development",
    icon: <MobileIcon />,
    accent: "Mobile experiences",
  },
  {
    number: "05",
    title: "Cloud and DevOps",
    description:
      "Build the infrastructure, automation and visibility required to deploy software with confidence.",
    capabilities: [
      "Cloud architecture",
      "CI/CD automation",
      "Monitoring and optimization",
    ],
    href: "/services/cloud-devops",
    icon: <CloudIcon />,
    accent: "Reliable infrastructure",
  },
  {
    number: "06",
    title: "Product Design",
    description:
      "Transform complex product ideas into clear, useful and engaging experiences people can understand.",
    capabilities: [
      "User and market research",
      "UX strategy and flows",
      "Prototypes and UI design",
    ],
    href: "/services/product-design",
    icon: <DesignIcon />,
    accent: "Human-centred design",
  },
];

export default function CoreServices() {
  return (
    <section className="relative isolate overflow-hidden bg-transparent py-24 text-white sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.58fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              y: 28,
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
                <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-cyan-200" />
              </span>

              Engineering · AI · Product
            </div>

            <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
              Software and AI development
              <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                built around outcomes.
              </span>
            </h2>
          </motion.div>

          <motion.div
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.12,
            }}
          >
            <p className="text-base leading-8 text-slate-400">
              QuantumFinix helps startups, growing businesses and
              ambitious teams turn ideas into dependable software,
              intelligent automation and useful digital products.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-600">
              <span className="h-px w-12 bg-gradient-to-r from-cyan-300/60 to-transparent" />
              Select the capability your roadmap needs
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>

        <motion.div
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
            amount: 0.35,
          }}
          transition={{
            duration: 0.8,
            delay: 0.12,
          }}
          className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8"
        >
          <div
            aria-hidden="true"
            className="absolute -right-28 -top-28 h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-[90px]"
          />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/70">
                Need more than one capability?
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                Combine design, engineering, AI and cloud into one
                focused delivery plan.
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                We can help define the right starting point, reduce
                unnecessary scope and create a technical roadmap that
                supports your immediate goal and future growth.
              </p>
            </div>

            <Link
              href="/book-consultation"
              className="group relative inline-flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-6 text-sm font-bold text-[#020711] shadow-[0_0_35px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/65 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />

              <span className="relative flex items-center gap-2">
                Plan your project
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, {
    stiffness: 170,
    damping: 24,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 170,
    damping: 24,
  });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const glow = useMotionTemplate`
    radial-gradient(
      380px circle at ${glowX}% ${glowY}%,
      rgba(34, 211, 238, 0.12),
      transparent 65%
    )
  `;

  function handlePointerMove(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    const bounds =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - bounds.left) / bounds.width;

    const y =
      (event.clientY - bounds.top) / bounds.height;

    glowX.set(x * 100);
    glowY.set(y * 100);

    if (!reduceMotion) {
      rawRotateX.set((0.5 - y) * 5);
      rawRotateY.set((x - 0.5) * 5);
    }
  }

  function handlePointerLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -7,
            }
      }
      className="group relative min-h-[440px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#06101c]/50 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-colors duration-300 hover:border-cyan-300/20 sm:p-7"
    >
      <motion.div
        aria-hidden="true"
        style={{
          background: glow,
        }}
        className="pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-28 -right-28 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-[85px]"
      />

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: [0, 360],
              }
        }
        transition={{
          duration: 28 + index * 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-5 top-5 h-20 w-20 rounded-full border border-dashed border-cyan-300/[0.08]"
      />

      <div
        className="relative flex h-full flex-col"
        style={{
          transform: "translateZ(26px)",
        }}
      >
        <div className="flex items-start justify-between gap-5">
          <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
            <span className="absolute inset-0 rounded-2xl bg-cyan-300/[0.04] opacity-0 blur-lg transition group-hover:opacity-100" />
            <span className="relative">{service.icon}</span>
          </span>

          <span className="font-mono text-[10px] tracking-[0.22em] text-cyan-300/35">
            {service.number}
          </span>
        </div>

        <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.23em] text-cyan-300/65">
          {service.accent}
        </p>

        <h3 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-white">
          {service.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          {service.description}
        </p>

        <ul className="mt-7 space-y-3">
          {service.capabilities.map((capability) => (
            <li
              key={capability}
              className="flex items-start gap-3 text-sm text-slate-300"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200">
                <CheckIcon />
              </span>

              {capability}
            </li>
          ))}
        </ul>

        <Link
          href={service.href}
          aria-label={`Explore ${service.title}`}
          className="group/link mt-auto flex items-center justify-between border-t border-white/[0.07] pt-6 text-sm font-semibold text-cyan-100 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
        >
          Explore service

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200 transition duration-300 group-hover/link:translate-x-1 group-hover/link:border-cyan-300/35 group-hover/link:bg-cyan-300/[0.12]">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </motion.article>
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

function SoftwareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13l-2 2 2 2M16 13l2 2-2 2M13.5 12l-3 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="6"
        width="12"
        height="12"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="12"
        cy="12"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M12 2.5V6M12 18v3.5M2.5 12H6M18 12h3.5M5.3 5.3 7.8 7.8M16.2 16.2l2.5 2.5M18.7 5.3l-2.5 2.5M7.8 16.2l-2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GenerativeAIIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="m18.5 15 .8 2.7 2.7.8-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8.8-2.7ZM5 3l.7 2.3L8 6l-2.3.7L5 9l-.7-2.3L2 6l2.3-.7L5 3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect
        x="7"
        y="2.5"
        width="10"
        height="19"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M10 5h4M11.2 18.5h1.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M9.5 9.5h5v5h-5z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M7.5 18.5h10a4 4 0 0 0 .7-7.9A6 6 0 0 0 6.7 9.1 4.7 4.7 0 0 0 7.5 18.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9 14h6M12 11v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M4 20h5l11-11a2.8 2.8 0 0 0-4-4L5 16l-1 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="m14 7 3 3M5 16l3 3M4 4h6M4 8h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}