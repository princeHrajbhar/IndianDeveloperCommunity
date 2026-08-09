"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

type SecurityIconName =
  | "access"
  | "integration"
  | "privacy"
  | "evaluation"
  | "approval"
  | "monitoring"
  | "protection";

type SecurityControl = {
  number: string;
  category: string;
  title: string;
  description: string;
  icon: SecurityIconName;
  side: "left" | "right" | "center";
  desktopPosition: string;
};

const controls: SecurityControl[] = [
  {
    number: "01",
    category: "Identity",
    title: "Role-Based Access Controls",
    description:
      "Limit system access according to each user’s responsibilities and approved permissions.",
    icon: "access",
    side: "left",
    desktopPosition: "left-0 top-5",
  },
  {
    number: "02",
    category: "Connections",
    title: "Secure API and System Integrations",
    description:
      "Connect applications and data sources through authenticated and controlled interfaces.",
    icon: "integration",
    side: "right",
    desktopPosition: "right-0 top-5",
  },
  {
    number: "03",
    category: "Information",
    title: "Data Privacy and Retention Controls",
    description:
      "Define how sensitive information is accessed, stored, retained and removed.",
    icon: "privacy",
    side: "left",
    desktopPosition: "left-0 top-[220px]",
  },
  {
    number: "04",
    category: "Quality",
    title: "Output Evaluation and Testing",
    description:
      "Evaluate AI responses for accuracy, consistency and expected business behavior.",
    icon: "evaluation",
    side: "right",
    desktopPosition: "right-0 top-[220px]",
  },
  {
    number: "05",
    category: "Oversight",
    title: "Human Approval for Sensitive Actions",
    description:
      "Require responsible people to review important actions before execution.",
    icon: "approval",
    side: "left",
    desktopPosition: "bottom-[90px] left-0",
  },
  {
    number: "06",
    category: "Visibility",
    title: "Activity Logging and Monitoring",
    description:
      "Record relevant system activity to support visibility, review and investigation.",
    icon: "monitoring",
    side: "right",
    desktopPosition: "bottom-[90px] right-0",
  },
  {
    number: "07",
    category: "Protection",
    title: "Protection Against Unauthorized Data Access",
    description:
      "Prevent users and AI workflows from reaching information they are not permitted to access.",
    icon: "protection",
    side: "center",
    desktopPosition:
      "bottom-0 left-1/2 w-[430px] -translate-x-1/2",
  },
];

const connectorPoints = [
  { x: 300, y: 100 },
  { x: 880, y: 100 },
  { x: 285, y: 290 },
  { x: 895, y: 290 },
  { x: 320, y: 500 },
  { x: 860, y: 500 },
  { x: 590, y: 620 },
];

export default function AISecuritySection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative overflow-hidden bg-transparent py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-16">
        <SectionHeader reduceMotion={reduceMotion} />

        {/* Desktop security architecture */}
        <div className="relative mx-auto mt-16 hidden h-[700px] max-w-[1180px] lg:block">
          <SecurityConnections reduceMotion={reduceMotion} />

          <SecurityCore reduceMotion={reduceMotion} />

          {controls.map((control, index) => (
            <DesktopControl
              key={control.number}
              control={control}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* Mobile and tablet */}
        <div className="mt-12 lg:hidden">
          <CompactSecurityCore reduceMotion={reduceMotion} />

          <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {controls.map((control, index) => (
              <MobileControl
                key={control.number}
                control={control}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>

        <ArchitectureNote reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}

function SectionHeader({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <motion.header
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              y: 24,
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
      className="mx-auto max-w-4xl text-center"
    >
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-300/70" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/70">
          Security and responsible AI
        </p>

        <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-300/70" />
      </div>

      <h2 className="mt-5 text-4xl font-black leading-[1] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
        AI you can use
        <span className="block text-cyan-300">
          with confidence.
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
        Security and responsible implementation are considered
        throughout the project—not added after development.
      </p>
    </motion.header>
  );
}

function SecurityCore({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.8,
            }
      }
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute left-1/2 top-[47%] z-20 flex h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
    >
      {/* Outer control boundary */}
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-300/20"
      />

      {/* Middle boundary */}
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-10 rounded-full border border-blue-300/15"
      />

      {/* Inner boundary */}
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.04, 1],
                opacity: [0.55, 1, 0.55],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-[82px] rounded-full border border-cyan-300/25 shadow-[0_0_70px_rgba(34,211,238,0.12)]"
      />

      {/* Orbit markers */}
      {[0, 90, 180, 270].map((rotation, index) => (
        <motion.span
          key={rotation}
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.45, 1],
                  opacity: [0.35, 1, 0.35],
                }
          }
          transition={{
            duration: 2.8,
            delay: index * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transform: `rotate(${rotation}deg) translateY(-164px)`,
          }}
          className="absolute h-2 w-2 rounded-full border border-cyan-200 bg-cyan-300"
        />
      ))}

      {/* Core */}
      <div className="relative flex h-40 w-40 flex-col items-center justify-center text-center">
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -4, 0],
                  scale: [1, 1.04, 1],
                }
          }
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-cyan-300/25 text-cyan-100"
        >
          <ShieldIcon />
        </motion.div>

        <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.21em] text-cyan-300/60">
          Protected core
        </p>

        <p className="mt-2 text-xl font-bold tracking-[-0.035em] text-white">
          Secure AI
        </p>

        <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-slate-600">
          Controls at every layer
        </p>
      </div>

      {/* Scanning line */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [-100, 100, -100],
                opacity: [0, 0.8, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[72px] right-[72px] h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent shadow-[0_0_15px_rgba(103,232,249,0.8)]"
      />

      {/* Corner brackets */}
      <span className="absolute left-[62px] top-[62px] h-6 w-6 border-l border-t border-cyan-300/25" />
      <span className="absolute right-[62px] top-[62px] h-6 w-6 border-r border-t border-cyan-300/25" />
      <span className="absolute bottom-[62px] left-[62px] h-6 w-6 border-b border-l border-cyan-300/25" />
      <span className="absolute bottom-[62px] right-[62px] h-6 w-6 border-b border-r border-cyan-300/25" />
    </motion.div>
  );
}

function SecurityConnections({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const paths = [
    "M475 255 C420 200 370 135 300 100",
    "M705 255 C760 200 810 135 880 100",
    "M430 325 C380 315 335 300 285 290",
    "M750 325 C800 315 845 300 895 290",
    "M475 420 C420 455 370 485 320 500",
    "M705 420 C760 455 810 485 860 500",
    "M590 490 C590 535 590 580 590 620",
  ];

  return (
    <svg
      viewBox="0 0 1180 700"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {paths.map((path, index) => (
        <g key={path}>
          <path
            d={path}
            stroke={
              index > 4
                ? "rgba(96,165,250,0.13)"
                : "rgba(103,232,249,0.13)"
            }
            strokeWidth="1"
          />

          <motion.path
            d={path}
            stroke={
              index > 4
                ? "rgb(96,165,250)"
                : "rgb(103,232,249)"
            }
            strokeWidth="1.4"
            strokeDasharray="4 14"
            initial={
              reduceMotion
                ? undefined
                : {
                    pathLength: 0,
                  }
            }
            whileInView={{
              pathLength: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    strokeDashoffset: [0, -54],
                  }
            }
            transition={{
              pathLength: {
                duration: 1,
                delay: index * 0.08,
              },
              strokeDashoffset: {
                duration: 3 + index * 0.1,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />
        </g>
      ))}

      {connectorPoints.map((point, index) => (
        <g key={`${point.x}-${point.y}`}>
          <motion.circle
            cx={point.x}
            cy={point.y}
            r="11"
            fill="transparent"
            stroke="rgba(103,232,249,0.18)"
            animate={
              reduceMotion
                ? undefined
                : {
                    r: [8, 15, 8],
                    opacity: [0.2, 0.65, 0.2],
                  }
            }
            transition={{
              duration: 3,
              delay: index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <circle
            cx={point.x}
            cy={point.y}
            r="4"
            fill={
              index > 4
                ? "rgb(96,165,250)"
                : "rgb(103,232,249)"
            }
          />
        </g>
      ))}
    </svg>
  );
}

function DesktopControl({
  control,
  index,
  reduceMotion,
}: {
  control: SecurityControl;
  index: number;
  reduceMotion: boolean;
}) {
  const isRight = control.side === "right";
  const isCenter = control.side === "center";

  return (
    <motion.article
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              x: isRight ? 28 : isCenter ? 0 : -28,
              y: isCenter ? 20 : 12,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        delay: 0.12 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute z-30 ${
        isCenter ? "" : "w-[330px]"
      } ${control.desktopPosition}`}
    >
      <div
        className={[
          "group relative",
          isCenter
            ? "border-t border-white/[0.1] pt-5 text-center"
            : isRight
              ? "border-r border-white/[0.1] pr-6 text-right"
              : "border-l border-white/[0.1] pl-6",
        ].join(" ")}
      >
        <motion.span
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -4, 0],
                  rotate: [0, 3, -2, 0],
                }
          }
          transition={{
            duration: 3.4 + index * 0.18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={[
            "flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200",
            isCenter
              ? "absolute -top-5 left-1/2 -translate-x-1/2"
              : isRight
                ? "absolute -right-5 top-0"
                : "absolute -left-5 top-0",
          ].join(" ")}
        >
          <SecurityIcon name={control.icon} />
        </motion.span>

        <div
          className={[
            "flex items-center gap-3",
            isCenter
              ? "justify-center"
              : isRight
                ? "justify-end"
                : "",
          ].join(" ")}
        >
          <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-300/45">
            CONTROL {control.number}
          </span>

          <span className="h-px w-6 bg-cyan-300/35" />

          <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            {control.category}
          </span>
        </div>

        <h3
          className={[
            "mt-4 text-xl font-bold leading-tight tracking-[-0.03em] text-white",
            isCenter ? "mx-auto max-w-sm" : "",
          ].join(" ")}
        >
          {control.title}
        </h3>

        <p
          className={[
            "mt-3 text-sm leading-7 text-slate-400",
            isCenter ? "mx-auto max-w-md" : "",
          ].join(" ")}
        >
          {control.description}
        </p>
      </div>
    </motion.article>
  );
}

function CompactSecurityCore({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.85,
            }
      }
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.75,
      }}
      className="relative mx-auto flex h-52 w-52 items-center justify-center"
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
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-300/20"
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-7 rounded-full border border-blue-300/15"
      />

      <div className="flex flex-col items-center justify-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 text-cyan-100">
          <ShieldIcon />
        </span>

        <span className="mt-4 text-[9px] uppercase tracking-[0.2em] text-cyan-300/60">
          Protected core
        </span>

        <span className="mt-2 text-lg font-bold text-white">
          Secure AI
        </span>
      </div>
    </motion.div>
  );
}

function MobileControl({
  control,
  index,
  reduceMotion,
}: {
  control: SecurityControl;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "relative border-t border-white/[0.1] pt-6",
        index === controls.length - 1
          ? "sm:col-span-2 sm:mx-auto sm:max-w-xl sm:text-center"
          : "",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center gap-3",
          index === controls.length - 1
            ? "sm:justify-center"
            : "",
        ].join(" ")}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200">
          <SecurityIcon name={control.icon} />
        </span>

        <div>
          <p className="font-mono text-[9px] tracking-[0.18em] text-cyan-300/45">
            CONTROL {control.number}
          </p>

          <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.17em] text-slate-600">
            {control.category}
          </p>
        </div>
      </div>

      <h3 className="mt-5 text-xl font-bold leading-tight tracking-[-0.03em] text-white">
        {control.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-400">
        {control.description}
      </p>
    </motion.article>
  );
}

function ArchitectureNote({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              y: 18,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: 0.7,
      }}
      className="mx-auto mt-16 max-w-4xl border-y border-white/[0.08] py-7 text-center"
    >
      <div className="flex items-center justify-center gap-3">
        <span className="text-cyan-200">
          <LockIcon />
        </span>

        <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-cyan-300/60">
          Security architecture
        </p>
      </div>

      <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-400">
        The exact security architecture is selected according to
        your data, industry, operating environment and compliance
        requirements.
      </p>
    </motion.div>
  );
}

function SecurityIcon({
  name,
}: {
  name: SecurityIconName;
}) {
  if (name === "access") {
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
          d="M3.5 19c.5-3.4 2.3-5 5.5-5 1.7 0 3 .4 4 1.3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <rect
          x="14"
          y="13"
          width="7"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M16 13v-1a1.5 1.5 0 0 1 3 0v1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (name === "integration") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="5"
          width="7"
          height="7"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <rect
          x="14"
          y="12"
          width="7"
          height="7"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M10 8.5h3a4 4 0 0 1 4 4M14.5 10 17 12.5 19.5 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "privacy") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M12 3 5 6v5c0 4.3 2.6 7.2 7 9 4.4-1.8 7-4.7 7-9V6l-7-3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        <rect
          x="9"
          y="10"
          width="6"
          height="5"
          rx="1.2"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M10.5 10V8.8a1.5 1.5 0 0 1 3 0V10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (name === "evaluation") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M5 4h14v16H5V4Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="m8 10 2 2 4-4M8 16h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "approval") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle
          cx="8"
          cy="8"
          r="3"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M3 19c.5-3.3 2.2-5 5-5 1.8 0 3.1.6 4 1.7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="m14 17 2 2 5-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "monitoring") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="m6 13 3-3 3 2 4-5 2 2M9 21h6M12 18v3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M12 3 4.5 6.5v5.2c0 4.4 2.8 7.2 7.5 9.3 4.7-2.1 7.5-4.9 7.5-9.3V6.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M8 16 16 8M9 8h7v7"
        stroke="currentColor"
        strokeWidth="1.5"
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
      className="h-8 w-8"
      aria-hidden="true"
    >
      <path
        d="M12 2.5 4 6v5.5c0 4.7 3 7.7 8 10 5-2.3 8-5.3 8-10V6l-8-3.5Z"
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

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}