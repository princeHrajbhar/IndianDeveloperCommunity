"use client";

import { motion, MotionConfig, useReducedMotion } from "motion/react";

/**
 * Demo-only testimonial content.
 * Every person, company, and quote below is fictional.
 * Replace with verified client feedback before publishing publicly.
 */
const testimonials = [
  {
    quote:
      "QuantumFinix helped us convert an early product concept into a clear, usable platform. Their communication was structured, the delivery process was transparent, and every feature was connected to a business objective.",
    name: "Aarav Mehta",
    role: "Founder",
    company: "Nexora Systems",
    location: "Bengaluru, India",
    project: "SaaS product development",
  },
  {
    quote:
      "The team understood our workflow before recommending technology. The automation they designed reduced repetitive work and gave our operations team a much clearer view of daily activity.",
    name: "Priya Sharma",
    role: "Operations Director",
    company: "Velora Consulting",
    location: "Gurugram, India",
    project: "Business-process automation",
  },
  {
    quote:
      "What stood out was the balance between speed and technical discipline. We received regular demonstrations, honest feedback, and a product foundation that is ready for future expansion.",
    name: "Rohan Kapoor",
    role: "Co-founder",
    company: "Arclight Commerce",
    location: "Mumbai, India",
    project: "E-commerce platform",
  },
  {
    quote:
      "QuantumFinix simplified a complex internal process into a clean web application. The final system is easier for our team to use, easier to manage, and significantly more reliable than our previous setup.",
    name: "Ananya Iyer",
    role: "Product Manager",
    company: "Miraq Technologies",
    location: "Chennai, India",
    project: "Internal web application",
  },
  {
    quote:
      "They approached AI as a practical business capability rather than a trend. The assistant was designed around our documents, permissions, and review process, which made the solution useful from the beginning.",
    name: "Vikram Malhotra",
    role: "Managing Director",
    company: "Northstar Advisory",
    location: "New Delhi, India",
    project: "AI knowledge assistant",
  },
  {
    quote:
      "Our mobile application moved from rough sketches to a polished release through a very organized process. The team was responsive, thoughtful, and focused on delivering a smooth customer experience.",
    name: "Sneha Reddy",
    role: "Chief Operating Officer",
    company: "UrbanNest Services",
    location: "Hyderabad, India",
    project: "Android and iOS application",
  },
  {
    quote:
      "The project was handled with clarity from discovery to launch. Technical decisions were explained in simple language, risks were discussed early, and progress remained visible throughout development.",
    name: "Kunal Desai",
    role: "Founder",
    company: "Finbridge Labs",
    location: "Ahmedabad, India",
    project: "Fintech product engineering",
  },
  {
    quote:
      "QuantumFinix gave us more than a website. They created a fast, professional digital experience that communicates our services clearly and gives our team a stronger platform for growth.",
    name: "Meera Nair",
    role: "Marketing Head",
    company: "Asterline Partners",
    location: "Kochi, India",
    project: "Corporate website development",
  },
  {
    quote:
      "Their team quickly understood our operational challenges and developed a dashboard that brings important information into one place. It has improved visibility and made decision-making much faster.",
    name: "Aditya Joshi",
    role: "Strategy Lead",
    company: "LogiCraft Networks",
    location: "Pune, India",
    project: "Operations dashboard",
  },
  {
    quote:
      "The collaboration felt professional and direct. We always knew what was being built, why it mattered, and what would happen next. That level of transparency made the entire engagement easier.",
    name: "Ishita Banerjee",
    role: "Co-founder",
    company: "EduVanta Learning",
    location: "Kolkata, India",
    project: "Education technology platform",
  },
];

type Testimonial = (typeof testimonials)[number];

export default function TestimonialsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="testimonials-heading"
        className="relative isolate overflow-hidden py-20 text-white sm:py-24 lg:py-28"
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-7 lg:px-10 xl:px-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-left"
          >
            <div className="flex items-center justify-start gap-3">
              <span className="h-px w-9 bg-gradient-to-r from-cyan-300 to-transparent" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200/70 sm:text-[11px]">
                Client perspectives
              </p>
            </div>

            <h2
              id="testimonials-heading"
              className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl"
            >
              Built through clear
              <span className="block bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                collaboration.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              Professional product delivery depends on transparent communication,
              practical engineering, and progress that clients can see.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: 0.9,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="qf-testimonial-marquee relative mt-14 overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        >
          <div className="qf-testimonial-track flex w-max">
            <TestimonialGroup testimonials={testimonials} />
            <TestimonialGroup testimonials={testimonials} clone />
          </div>
        </motion.div>

        

        <style jsx global>{`
          @keyframes qf-testimonial-marquee {
            from {
              transform: translate3d(0, 0, 0);
            }

            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          .qf-testimonial-track {
            animation: qf-testimonial-marquee
              78s linear infinite;
            backface-visibility: hidden;
            transform: translateZ(0);
            will-change: transform;
          }

          .qf-testimonial-marquee:hover .qf-testimonial-track,
          .qf-testimonial-marquee:focus-within .qf-testimonial-track {
            animation-play-state: paused;
          }

          @media (max-width: 640px) {
            .qf-testimonial-track {
              animation-duration: 62s;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .qf-testimonial-marquee {
              overflow-x: auto;
              scrollbar-width: none;
            }

            .qf-testimonial-marquee::-webkit-scrollbar {
              display: none;
            }

            .qf-testimonial-track {
              animation: none;
            }

            .qf-testimonial-group[aria-hidden="true"] {
              display: none;
            }
          }
        `}</style>
      </section>
    </MotionConfig>
  );
}

function TestimonialGroup({
  testimonials,
  clone = false,
}: {
  testimonials: readonly Testimonial[];
  clone?: boolean;
}) {
  return (
    <div
      aria-hidden={clone ? "true" : undefined}
      className="qf-testimonial-group flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5"
    >
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={`${clone ? "clone" : "original"}-${testimonial.name}`}
          testimonial={testimonial}
          index={index}
          clone={clone}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  clone,
}: {
  testimonial: Testimonial;
  index: number;
  clone: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      tabIndex={clone ? -1 : 0}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -8,
              scale: 1.01,
            }
      }
      whileFocus={
        reduceMotion
          ? undefined
          : {
              y: -8,
              scale: 1.01,
            }
      }
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="group relative flex min-h-[390px] w-[min(86vw,360px)] shrink-0 flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.09] p-6 outline-none transition-colors duration-500 hover:border-cyan-300/25 focus-visible:border-cyan-300/40 focus-visible:ring-2 focus-visible:ring-cyan-300/20 sm:min-h-[410px] sm:w-[410px] sm:p-7 lg:w-[450px]"
    >
      <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/75 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <QuoteIcon />

        <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-300/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <blockquote className="mt-6 text-[15px] leading-7 text-slate-300 sm:text-base sm:leading-8">
        “{testimonial.quote}”
      </blockquote>

      <div className="mt-auto pt-8">
        <div className="border-t border-white/[0.08] pt-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.06,
                      rotate: 2,
                    }
              }
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 text-xs font-bold text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.08)]"
            >
              {getInitials(testimonial.name)}
            </motion.div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">
                {testimonial.name}
              </p>
              <p className="mt-1 truncate text-xs text-slate-400">
                {testimonial.role}, {testimonial.company}
              </p>
              <p className="mt-1 text-[10px] text-slate-600">
                {testimonial.location}
              </p>
            </div>
          </div>

          <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-300/50">
            {testimonial.project}
          </p>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-160%", "320%"],
              }
        }
        transition={{
          duration: 5,
          delay: index * 0.3,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-blue-400/75 to-transparent"
      />
    </motion.article>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="none"
      className="h-9 w-12 text-cyan-200/60"
      aria-hidden="true"
    >
      <path
        d="M4 44V27.5C4 12.9 11.3 4.8 25.9 3l1.8 6.7C18.9 12 15 16.9 15 24.7h12.5V44H4Zm32.5 0V27.5C36.5 12.9 43.8 4.8 58.4 3l1.8 6.7C51.4 12 47.5 16.9 47.5 24.7H60V44H36.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}