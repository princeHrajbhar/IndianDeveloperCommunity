import Image from "next/image";
import Link from "next/link";

const footerSections = [
  {
    title: "Services",
    links: [
      {
        label: "AI Software Development",
        href: "/services/ai-software-development",
      },
      {
        label: "Custom Software",
        href: "/services/custom-software-development",
      },
      {
        label: "Automation & Integration",
        href: "/services/automation-integration",
      },
      {
        label: "Research & Development",
        href: "/services/research-development",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
      },
      {
        label: "Careers",
        href: "/job",
      },
      {
        label: "Industries",
        href: "/industries",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "Insights",
        href: "/insights",
      },
      {
        label: "AI Solutions",
        href: "/ai-solutions",
      },
      {
        label: "Privacy Policy",
        href: "/privacy",
      },
      {
        label: "Terms of Service",
        href: "/terms",
      },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#02050c] text-white">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/[0.05] blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-7 lg:px-10 lg:py-20 xl:px-16">
        <div className="grid gap-12 border-b border-white/[0.07] pb-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="max-w-xl">
            <FooterBrand />

            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-500">
              QuantumFinix creates intelligent software, advanced AI
              solutions and future-focused research for organizations
              ready to build, innovate and grow.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book-consultation"
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 px-6 text-sm font-bold text-[#020711] shadow-[0_0_35px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />

                <span className="relative flex items-center gap-2">
                  Book a Free Consultation
                  <ArrowIcon />
                </span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-white transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06]"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                  {section.title}
                </h2>

                <ul className="mt-5 space-y-3.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-500 transition hover:text-cyan-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} QuantumFinix. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="mailto:hello@quantumfinix.com"
              className="transition hover:text-cyan-200"
            >
              hello@quantumfinix.com
            </a>

            <span className="hidden h-3 w-px bg-white/10 sm:block" />

            <p className="uppercase tracking-[0.18em]">
              Innovate • Intelligently • Infinite
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterBrand() {
  return (
    <Link
      href="/"
      aria-label="QuantumFinix home"
      className="group inline-flex items-center gap-4"
    >
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inset-1 rounded-full bg-cyan-400/20 opacity-60 blur-xl transition group-hover:opacity-100" />

        <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-cyan-300/20 bg-[#04111e] shadow-[inset_0_0_25px_rgba(34,211,238,0.1)]">
          <Image
            src="/quantumfinix-mark.png"
            alt=""
            width={112}
            height={112}
            className="h-full w-full object-contain p-1"
          />
        </span>
      </span>

      <span>
        <span className="block text-base font-bold tracking-[0.13em] text-white">
          QUANTUM
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            FINIX
          </span>
        </span>

        <span className="mt-1 block text-[8px] uppercase tracking-[0.3em] text-slate-600">
          Innovate intelligently
        </span>
      </span>
    </Link>
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