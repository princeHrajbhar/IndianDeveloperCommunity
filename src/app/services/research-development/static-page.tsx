import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { PublicAccountLink } from "@/src/components/auth/public-account-link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Atom,
  Beaker,
  BrainCircuit,
  Check,
  ChevronRight,
  FlaskConical,
  Gauge,
  GitBranch,
  Lightbulb,
  LockKeyhole,
  Menu,
  Microscope,
  Network,
  Orbit,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Telescope,
  TestTube2,
  Workflow,
} from "lucide-react";

/**
 * Place at: app/services/research-development/page.tsx
 *
 * Expected image assets:
 * public/research-page/research-hero.jpg
 * public/research-page/research-workshop.jpg
 * public/research-page/research-dashboard.jpg
 * public/research-page/research-lab.jpg
 * public/logo.png
 */

const SITE_URL = "https://www.quantumfinix.com";
const PAGE_PATH = "/services/research-development";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const COMPANY = {
  name: "QuantumFinix",
  email: "hello@quantumfinix.com",
};

const IMAGES = {
  hero: "/research-page/research-hero.jpg",
  workshop: "/research-page/research-workshop.jpg",
  dashboard: "/research-page/research-dashboard.jpg",
  lab: "/research-page/research-lab.jpg",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Research & Development Services | QuantumFinix",
  description:
    "QuantumFinix helps organisations explore emerging technology, validate difficult ideas, build prototypes, test feasibility and turn research into practical product and engineering decisions.",
  keywords: [
    "research and development services",
    "technology R&D company",
    "applied research services",
    "innovation consulting",
    "technical feasibility study",
    "prototype development",
    "emerging technology research",
    "AI research and development",
    "product research",
    "experimental software development",
    "proof of concept development",
    "innovation lab",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: COMPANY.name,
    title: "Research & Development Services | QuantumFinix",
    description:
      "Applied research, technical experimentation and prototype engineering for uncertain, high-value product and technology questions.",
    images: [
      {
        url: IMAGES.hero,
        width: 1200,
        height: 630,
        alt: "QuantumFinix research and development laboratory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research & Development Services | QuantumFinix",
    description:
      "Explore emerging technology, validate feasibility and convert research into practical product decisions.",
    images: [IMAGES.hero],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const RESEARCH_AREAS = [
  {
    icon: BrainCircuit,
    title: "Applied AI research",
    description:
      "Evaluate models, agents, retrieval systems, multimodal interfaces and intelligent workflows against real operating requirements.",
    examples:
      "Model benchmarking, agent architecture, RAG evaluation, human review, safety controls and AI-native product concepts.",
  },
  {
    icon: Orbit,
    title: "Emerging technology exploration",
    description:
      "Investigate new technical capabilities before your organisation commits to a large platform, vendor or transformation programme.",
    examples:
      "Edge computing, spatial interfaces, digital twins, intelligent automation, privacy-preserving systems and new interaction models.",
  },
  {
    icon: FlaskConical,
    title: "Proofs of concept",
    description:
      "Build focused experiments that test the hardest assumption with enough realism to support an informed investment decision.",
    examples:
      "Technical spikes, demonstrators, simulation environments, data experiments and limited user pilots.",
  },
  {
    icon: Microscope,
    title: "Technical feasibility studies",
    description:
      "Assess whether an idea can work with the available data, infrastructure, integrations, budget, timeline and risk tolerance.",
    examples:
      "Architecture options, dependency analysis, model selection, performance tests, cost modelling and implementation constraints.",
  },
  {
    icon: Lightbulb,
    title: "Product and service innovation",
    description:
      "Translate research findings into new products, differentiated capabilities, improved operations and defensible customer value.",
    examples:
      "Opportunity portfolios, future journeys, concept validation, product hypotheses and experiment roadmaps.",
  },
  {
    icon: Network,
    title: "Research partnerships",
    description:
      "Work alongside internal product, engineering, data, design, research and leadership teams with visible methods and shared evidence.",
    examples:
      "Specialist workstreams, innovation labs, embedded researchers and collaborative technical programmes.",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Frame the research question",
    description:
      "We define the decision the research must support, the assumptions that matter, the expected users, the operating context and the cost of being wrong.",
    output:
      "Research brief, decision criteria, hypotheses, constraints, stakeholders and evidence plan.",
  },
  {
    number: "02",
    title: "Map the evidence and unknowns",
    description:
      "We review existing knowledge, systems, data, vendors, prior experiments and technical dependencies before designing new work.",
    output:
      "Evidence map, knowledge gaps, experiment priorities, risk register and initial technical options.",
  },
  {
    number: "03",
    title: "Design the experiments",
    description:
      "We select the smallest useful experiments, prototypes and evaluation methods capable of challenging the important assumptions.",
    output:
      "Experiment plan, success measures, datasets, test scenarios, prototype scope and review gates.",
  },
  {
    number: "04",
    title: "Build and investigate",
    description:
      "Researchers, designers and engineers create prototypes, run tests, compare alternatives and document what actually happened.",
    output:
      "Working prototypes, benchmark results, observations, technical artefacts and documented limitations.",
  },
  {
    number: "05",
    title: "Interpret the findings",
    description:
      "We separate promising evidence from novelty, identify what remains uncertain and explain the commercial and technical implications.",
    output:
      "Findings report, feasibility position, risk analysis, architecture direction and decision options.",
  },
  {
    number: "06",
    title: "Convert learning into action",
    description:
      "The research concludes with a clear recommendation: stop, continue testing, build a pilot, develop a product or adopt an existing solution.",
    output:
      "Recommendation, phased roadmap, investment range, next experiments and transition plan.",
  },
];

const DELIVERABLES = [
  "Research brief and decision framework",
  "Hypotheses, assumptions and evidence plan",
  "Technology landscape and option analysis",
  "Feasibility findings and risk register",
  "Prototype or technical demonstrator",
  "Benchmark and evaluation results",
  "Data, integration and architecture findings",
  "Security, privacy and operational considerations",
  "User testing and workflow observations",
  "Build-versus-buy recommendation",
  "Product or pilot roadmap",
  "Research documentation and knowledge transfer",
];

const CLIENT_INPUTS = [
  {
    title: "The decision you need to make",
    text: "What investment, product, technology or operating decision the work should support.",
  },
  {
    title: "The opportunity and uncertainty",
    text: "What could create value, what is currently unknown and which assumption creates the most risk.",
  },
  {
    title: "Available evidence",
    text: "Existing data, systems, prior research, vendors, prototypes, users and internal subject-matter expertise.",
  },
  {
    title: "Practical constraints",
    text: "Timing, budget, access, security, regulation, ownership, internal capability and decision responsibilities.",
  },
];

const FAQS = [
  {
    question: "What is applied research and development?",
    answer:
      "Applied R&D investigates a defined opportunity or technical uncertainty with the intention of supporting a practical decision, product, service or operating improvement. It combines research methods with design, experimentation and engineering.",
  },
  {
    question: "When should a company invest in R&D?",
    answer:
      "R&D is useful when an important opportunity depends on uncertain technology, data, user behaviour, integration, performance, cost or risk. It is most valuable when the organisation defines the decision the work must support before experimentation begins.",
  },
  {
    question: "What is the difference between a prototype and a production product?",
    answer:
      "A prototype is designed to answer questions quickly. It may not include the security, resilience, maintainability, testing, accessibility, monitoring or support required for production. QuantumFinix makes that boundary explicit.",
  },
  {
    question: "Can you research a technology without committing us to use it?",
    answer:
      "Yes. The purpose of the work is to produce evidence, not to justify a preferred technology. A valid outcome may be to delay, stop, buy an existing solution or choose a simpler approach.",
  },
  {
    question: "How long does an R&D engagement take?",
    answer:
      "A focused feasibility study or technical experiment may take several weeks. A broader research programme with multiple prototypes, users or technical workstreams may run for several months. The plan is shaped around the decision and evidence required.",
  },
  {
    question: "Who owns the prototypes and research outputs?",
    answer:
      "Ownership of source code, datasets, prototypes, research documents, reusable components, third-party licences and intellectual property is defined before the engagement begins.",
  },
  {
    question: "Can you work with our internal R&D or engineering team?",
    answer:
      "Yes. QuantumFinix can lead a focused investigation, provide specialist researchers and engineers, or work as part of a combined team with shared methods, repositories, reviews and decision gates.",
  },
  {
    question: "What should we prepare for the first conversation?",
    answer:
      "Bring the decision you need to make, the opportunity, the important unknowns, available evidence, known constraints, expected timing and the people who will use the findings.",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: COMPANY.name,
      url: SITE_URL,
      email: COMPANY.email,
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Research and Development",
      serviceType: "Applied Research and Development Services",
      url: PAGE_URL,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "Worldwide",
      description:
        "Applied research, technical feasibility studies, experimentation, prototype development and innovation programmes.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: "Research & Development", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

async function submitResearchBrief(formData: FormData) {
  "use server";

  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) redirect(`${PAGE_PATH}?form=success#contact`);

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const question = String(formData.get("question") ?? "").trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailIsValid || !company || question.length < 30) {
    redirect(`${PAGE_PATH}?form=error#contact`);
  }

  // Integration placeholder: send validated data to your CRM or email provider.
  redirect(`${PAGE_PATH}?form=success#contact`);
}

type PageProps = {
  searchParams?: Promise<{ form?: string | string[] }>;
};

export default async function ResearchDevelopmentPage({ searchParams }: PageProps = {}) {
  const params = searchParams ? await searchParams : {};
  const formState = Array.isArray(params.form) ? params.form[0] : params.form;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c"),
        }}
      />

      <div className="min-h-screen overflow-x-clip bg-[#f4f1f7] text-[#17121d] selection:bg-[#e5b8ff] selection:text-[#211027]">
        <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm font-bold text-black shadow-xl transition focus:translate-y-0">
          Skip to content
        </a>

        <header className="absolute inset-x-0 top-0 z-50 text-white">
          <div className="mx-auto flex h-20 max-w-[1380px] items-center justify-between px-4 sm:px-7 lg:px-10">
            <Link href="/" aria-label="QuantumFinix home" className="flex items-center gap-3">
              <img src="/logo.png" alt="QuantumFinix" width={160} height={64} className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-[1.03] sm:h-16" />
              <span className="hidden text-[17px] font-black tracking-[-0.04em] sm:inline">{COMPANY.name}</span>
            </Link>

            <nav aria-label="Primary navigation" className="hidden lg:block">
              <ul className="flex items-center gap-8 text-sm font-medium text-white/60">
                <li><Link href="#areas" className="transition hover:text-white">Research areas</Link></li>
                <li><Link href="#process" className="transition hover:text-white">Process</Link></li>
                <li><Link href="#outputs" className="transition hover:text-white">Outputs</Link></li>
                <li><Link href="#faq" className="transition hover:text-white">FAQ</Link></li>
              </ul>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <PublicAccountLink className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.10]" />
              <Link href="#contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#e5b8ff] px-5 text-sm font-black text-[#24102c] transition hover:-translate-y-0.5 hover:bg-white">
                Discuss a research question
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <details className="relative lg:hidden">
              <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-white/20 bg-white/[0.05] backdrop-blur marker:hidden">
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Toggle navigation</span>
              </summary>
              <nav aria-label="Mobile navigation" className="absolute right-0 top-14 w-[min(88vw,340px)] border border-white/10 bg-[#110b19]/95 p-5 shadow-2xl backdrop-blur-2xl">
                {[
                  ["Research areas", "#areas"],
                  ["Process", "#process"],
                  ["Outputs", "#outputs"],
                  ["FAQ", "#faq"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="flex min-h-12 items-center justify-between border-b border-white/10 text-sm font-semibold text-white/75">
                    {label}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
                <PublicAccountLink className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/[0.05] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.10]" />
                <Link href="#contact" className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#e5b8ff] px-5 text-sm font-black text-[#24102c]">
                  Discuss a research question
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </nav>
            </details>
          </div>
        </header>

        <main id="main-content">
          <section className="relative isolate overflow-hidden bg-[#120a19] px-4 pb-20 pt-28 text-white sm:px-7 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-28">
            <div aria-hidden="true" className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_76%_20%,rgba(192,132,252,0.28),transparent_30%),radial-gradient(circle_at_12%_25%,rgba(59,130,246,0.14),transparent_33%),linear-gradient(145deg,#0d0713_0%,#1a0e25_48%,#08070d_100%)]" />
            <div aria-hidden="true" className="absolute inset-0 -z-20 opacity-[0.2] [mask-image:linear-gradient(to_bottom,black,transparent_94%)]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(233,213,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(233,213,255,0.07)_1px,transparent_1px)] bg-[size:78px_78px]" />
            </div>
            <div aria-hidden="true" className="qf-orb absolute -right-48 top-12 -z-10 h-[42rem] w-[42rem] rounded-full bg-fuchsia-400/10 blur-[150px]" />
            <div aria-hidden="true" className="qf-scan absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-transparent via-fuchsia-100/[0.04] to-transparent" />

            <div className="mx-auto max-w-[1380px]">
              <nav aria-label="Breadcrumb" className="mb-9">
                <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/40">
                  <li><Link href="/" className="transition hover:text-white">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/services" className="transition hover:text-white">Services</Link></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-white/72">Research &amp; Development</li>
                </ol>
              </nav>

              <div className="grid gap-14 lg:min-h-[730px] lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.92fr)] lg:items-center lg:gap-16 xl:gap-24">
                <div className="qf-rise relative z-10 max-w-4xl">
                  <div className="inline-flex items-center gap-3 rounded-full border border-[#e5b8ff]/20 bg-[#e5b8ff]/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f3ddff] backdrop-blur-xl">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-[#e5b8ff] opacity-35" />
                      <span className="relative h-2 w-2 rounded-full bg-[#e5b8ff]" />
                    </span>
                    Research · experimentation · prototypes · decisions
                  </div>

                  <h1 className="mt-7 max-w-5xl text-[clamp(3.2rem,7vw,7rem)] font-black leading-[0.87] tracking-[-0.075em]">
                    <span className="block">Research &amp;</span>
                    <span className="block bg-gradient-to-r from-white via-[#e5b8ff] to-[#8bc8ff] bg-clip-text text-transparent">development with direction.</span>
                  </h1>

                  <p className="mt-8 max-w-2xl text-xl font-bold leading-8 tracking-[-0.025em] text-white sm:text-2xl">
                    Explore difficult ideas, challenge assumptions and create evidence before making a large product or technology commitment.
                  </p>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/56 sm:text-lg">
                    QuantumFinix combines applied research, product thinking, design and engineering to investigate emerging technology, build meaningful prototypes and turn uncertain questions into practical decisions.
                  </p>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link href="#contact" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#e5b8ff] px-7 text-sm font-black text-[#24102c] shadow-[0_18px_70px_rgba(192,132,252,0.18)] transition hover:-translate-y-0.5 hover:bg-white">
                      Start an R&amp;D conversation
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                    <Link href="#process" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/16 px-7 text-sm font-bold text-white transition hover:border-[#e5b8ff]/45 hover:bg-[#e5b8ff]/[0.05]">
                      See the research process
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-white/34">Focused research brief · NDA available · Evidence-led recommendation</p>

                  <div className="mt-9 grid gap-4 border-y border-white/10 py-5 sm:grid-cols-3">
                    {[
                      ["01", "Question before technology"],
                      ["02", "Experiments designed to disprove"],
                      ["03", "Clear stop, test or build decision"],
                    ].map(([number, item]) => (
                      <div key={number} className="flex gap-3">
                        <span className="font-mono text-[10px] text-[#e5b8ff]">{number}</span>
                        <p className="text-xs font-semibold leading-5 text-white/48">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <figure className="qf-float relative mx-auto w-full max-w-[620px]">
                  <div className="relative aspect-[5/6] overflow-hidden rounded-[2.2rem] border border-white/12 bg-[#1a1024] shadow-[0_45px_140px_rgba(0,0,0,0.42)] sm:aspect-[16/13] lg:aspect-[5/6]">
                    <img src={IMAGES.hero} alt="Research and development team investigating an emerging technology" width={1200} height={1440} fetchPriority="high" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120a19] via-[#120a19]/12 to-[#120a19]/8" />
                    <div className="absolute inset-6 rounded-[1.45rem] border border-white/14 sm:inset-8" />
                    <div className="qf-scan-card pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent via-[#e5b8ff]/16 to-transparent" />

                    <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f1d9ff]">Research system</p>
                      <p className="mt-2 max-w-[230px] text-xs leading-5 text-white/46">Questions, experiments and decisions connected in one visible programme.</p>
                    </div>

                    <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/14 bg-black/25 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-white/72 backdrop-blur sm:right-8 sm:top-8">
                      <span className="h-2 w-2 rounded-full bg-fuchsia-300" />
                      Experiment active
                    </div>

                    <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/12 bg-[#140b1c]/76 p-4 backdrop-blur-xl sm:inset-x-8 sm:bottom-8 sm:p-5">
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {[
                          ["01", "Question"],
                          ["02", "Test"],
                          ["03", "Learn"],
                          ["04", "Decide"],
                        ].map(([number, label], index) => (
                          <div key={number} className="relative">
                            {index < 3 && <span className="absolute left-[70%] top-3 h-px w-[60%] bg-gradient-to-r from-[#e5b8ff]/45 to-transparent" />}
                            <span className="relative mx-auto grid h-7 w-7 place-items-center rounded-full border border-[#e5b8ff]/35 bg-[#e5b8ff]/10 font-mono text-[9px] text-[#f3ddff]">{number}</span>
                            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.08em] text-white/48">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="qf-note absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/10 bg-[#160d20]/90 px-5 py-4 shadow-2xl backdrop-blur-xl sm:block lg:-left-9">
                    <ShieldCheck className="h-5 w-5 text-[#e5b8ff]" aria-hidden="true" />
                    <p className="mt-3 text-xs font-black text-white">Evidence first</p>
                    <p className="mt-1 text-[10px] text-white/40">Assumptions · experiments · limits</p>
                  </div>

                  <div className="qf-note-delay absolute -right-3 bottom-14 hidden rounded-2xl border border-white/10 bg-[#160d20]/90 px-5 py-4 text-right shadow-2xl backdrop-blur-xl sm:block lg:-right-9">
                    <Gauge className="ml-auto h-5 w-5 text-[#8bc8ff]" aria-hidden="true" />
                    <p className="mt-3 text-xs font-black text-white">Decision ready</p>
                    <p className="mt-1 text-[10px] text-white/40">Feasibility · risk · next step</p>
                  </div>
                </figure>
              </div>
            </div>
          </section>

          <section aria-label="QuantumFinix research principles" className="border-b border-black/10 bg-[#f4f1f7] px-4 sm:px-7 lg:px-10">
            <div className="mx-auto grid max-w-[1380px] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "Decision-led", "Research begins with the decision it must support"],
                ["02", "Evidence-based", "Claims are tested against observable results"],
                ["03", "Practical", "Experiments reflect real operating constraints"],
                ["04", "Transferable", "Methods, findings and artefacts remain visible"],
              ].map(([number, title, text], index) => (
                <div key={number} className={`py-7 ${index > 0 ? "border-t border-black/10 sm:border-l sm:border-t-0 sm:pl-7 lg:pl-9" : ""}`}>
                  <p className="font-mono text-[10px] text-[#7c2f9d]">{number}</p>
                  <p className="mt-2 text-sm font-black">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-black/48">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
              <SectionLabel>What R&amp;D means here</SectionLabel>
              <div>
                <h2 className="max-w-5xl text-4xl font-black leading-[1.01] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                  Research that changes a decision.
                  <span className="block text-black/28">Not experimentation without a destination.</span>
                </h2>
                <p className="mt-7 max-w-3xl text-base leading-8 text-black/56 sm:text-lg">
                  We focus on applied questions with a clear commercial, product or engineering consequence. The output is not only a report—it is tested evidence, visible limitations and a recommendation your team can act on.
                </p>
              </div>
            </div>
          </section>

          <section id="areas" className="scroll-mt-24 border-y border-black/10 bg-[#ebe5ef] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1380px]">
              <SectionHeading eyebrow="Research areas" title="Focused investigation across technology, product and operations" description="Each programme is shaped around the question, the available evidence and the level of confidence required before the next investment decision." />

              <div className="mt-14 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">
                {RESEARCH_AREAS.map((area, index) => {
                  const Icon = area.icon;
                  return (
                    <article key={area.title} className="qf-card group relative min-h-[360px] overflow-hidden bg-[#f4f1f7] p-7 sm:p-9">
                      <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-[#e5b8ff]/0 blur-3xl transition duration-500 group-hover:bg-[#e5b8ff]/35" />
                      <div className="flex items-start justify-between">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-white/45">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-[10px] text-black/30">0{index + 1}</span>
                      </div>
                      <h3 className="mt-10 text-2xl font-black leading-tight tracking-[-0.04em]">{area.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-black/56">{area.description}</p>
                      <p className="mt-5 border-t border-black/10 pt-5 text-xs leading-6 text-black/42"><strong className="font-bold text-black/67">Typical work:</strong> {area.examples}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
              <figure className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#1b1221]">
                  <img src={IMAGES.workshop} alt="Research workshop defining hypotheses and experiments" width={1200} height={900} loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]" />
                </div>
                <figcaption className="mt-4 max-w-xl text-xs leading-5 text-black/42">Good R&amp;D begins by making the decision, assumptions and evidence requirements visible.</figcaption>
              </figure>

              <div>
                <SectionLabel>Before we design an experiment</SectionLabel>
                <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">We need the important uncertainty—not a polished innovation brief.</h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-black/56">Clients do not need to arrive with a complete research plan. The most useful starting point is the decision, the opportunity, the unknowns and the evidence already available.</p>

                <div className="mt-9 border-t border-black/15">
                  {CLIENT_INPUTS.map((item, index) => (
                    <div key={item.title} className="grid gap-3 border-b border-black/15 py-6 sm:grid-cols-[auto_0.4fr_0.6fr] sm:gap-5">
                      <span className="font-mono text-[10px] text-[#7c2f9d]">0{index + 1}</span>
                      <h3 className="text-sm font-black">{item.title}</h3>
                      <p className="text-sm leading-7 text-black/54">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="process" className="scroll-mt-24 overflow-hidden bg-[#120a19] px-4 py-20 text-white sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1380px]">
              <SectionHeading dark eyebrow="Visible research process" title="From uncertain question to evidence-backed direction in six stages" description="Every stage produces an artefact, finding or decision. Stakeholders can see what is being tested, what changed and what remains unknown." />

              <ol className="mt-14 border-t border-white/12">
                {PROCESS.map((step) => (
                  <li key={step.number} className="qf-process-row grid gap-5 border-b border-white/12 py-8 sm:grid-cols-[0.1fr_0.32fr_0.58fr] sm:gap-8 sm:py-10">
                    <p className="font-mono text-[10px] text-[#e5b8ff]">{step.number}</p>
                    <h3 className="text-xl font-black tracking-[-0.035em] sm:text-2xl">{step.title}</h3>
                    <div>
                      <p className="text-sm leading-7 text-white/56 sm:text-base sm:leading-8">{step.description}</p>
                      <p className="mt-4 text-xs leading-6 text-white/34"><strong className="font-bold text-white/68">Output:</strong> {step.output}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="outputs" className="scroll-mt-24 px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-[0.44fr_0.56fr] lg:gap-20">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <SectionLabel>What you receive</SectionLabel>
                <h2 className="mt-5 text-4xl font-black leading-[1.01] tracking-[-0.055em] sm:text-5xl">Evidence, artefacts and a decision path—not a vague innovation presentation.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-black/56">The exact outputs depend on the question, but the objective is always the same: make uncertainty smaller and the next decision stronger.</p>

                <div className="mt-9 overflow-hidden rounded-[1.8rem] bg-[#1a1024] p-7 text-white sm:p-9">
                  <Sparkles className="h-6 w-6 text-[#e5b8ff]" aria-hidden="true" />
                  <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-[#e5b8ff]">Core principle</p>
                  <p className="mt-4 text-3xl font-black leading-tight tracking-[-0.045em]">The research succeeds when it improves the quality of the decision.</p>
                </div>
              </div>

              <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-2">
                {DELIVERABLES.map((item, index) => (
                  <div key={item} className="flex min-h-28 gap-4 bg-[#f4f1f7] p-6">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#ecd4f8] text-[#6b2888]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-[9px] text-black/28">{String(index + 1).padStart(2, "0")}</p>
                      <p className="mt-2 text-sm font-bold leading-6">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-black/10 bg-[#ebe5ef] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1380px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <SectionLabel>Research evidence</SectionLabel>
                <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">A prototype is useful only when the team knows what it proves.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-black/56">We connect technical measurements, user observations, cost, risk and operational constraints so the result can be interpreted responsibly.</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {["Hypothesis tracking", "Benchmark comparison", "User and workflow testing", "Architecture experiments", "Cost and performance modelling", "Documented limitations"].map((item) => (
                    <div key={item} className="flex items-center gap-3 border-b border-black/10 py-3 text-sm font-bold">
                      <Check className="h-4 w-4 text-[#7c2f9d]" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <figure className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-[2rem] bg-[#1a1024] sm:translate-y-10">
                  <img src={IMAGES.dashboard} alt="Research evaluation and experiment dashboard" width={900} height={1100} loading="lazy" className="h-full min-h-[420px] w-full object-cover transition duration-700 hover:scale-[1.03]" />
                </div>
                <div className="overflow-hidden rounded-[2rem] bg-[#1a1024]">
                  <img src={IMAGES.lab} alt="Research prototype and technical laboratory interface" width={700} height={1000} loading="lazy" className="h-full min-h-[420px] w-full object-cover transition duration-700 hover:scale-[1.03]" />
                </div>
              </figure>
            </div>
          </section>

          <section id="faq" className="scroll-mt-24 px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1080px]">
              <div className="text-center">
                <SectionLabel centered>Research &amp; development FAQ</SectionLabel>
                <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">Practical answers before you begin an R&amp;D programme</h2>
              </div>

              <div className="mt-12 border-t border-black/15">
                {FAQS.map((item) => (
                  <details key={item.question} className="group border-b border-black/15 py-1">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 marker:hidden">
                      <span className="text-lg font-black tracking-[-0.025em] sm:text-xl">{item.question}</span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/15 text-xl transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-4xl pb-7 text-sm leading-7 text-black/56 sm:text-base sm:leading-8">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="scroll-mt-24 bg-[#120a19] px-4 py-20 text-white sm:px-7 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-[0.46fr_0.54fr] lg:gap-20">
              <div>
                <SectionLabel dark>Start with the uncertainty</SectionLabel>
                <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.06em] sm:text-5xl lg:text-6xl">Turn an important unknown into a useful decision.</h2>
                <p className="mt-7 max-w-xl text-base leading-8 text-white/54">Tell us what you are considering, what remains uncertain and which decision the research must support. We will recommend a sensible first investigation.</p>

                <div className="mt-9 space-y-4 border-t border-white/12 pt-7">
                  {["NDA available before detailed discussions", "Research plan tied to a defined decision", "No obligation to continue into a full build", "Direct access to research and technical specialists"].map((item) => (
                    <div key={item} className="flex gap-3 text-sm text-white/58">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#e5b8ff]" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>

                <a href={`mailto:${COMPANY.email}`} className="mt-9 inline-flex items-center gap-2 text-sm font-black text-[#e5b8ff] transition hover:text-white">
                  {COMPANY.email}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-9">
                {formState === "success" && (
                  <div role="status" className="mb-6 rounded-2xl border border-fuchsia-200/20 bg-fuchsia-200/10 p-4 text-sm text-fuchsia-100">Thank you. Your research brief has been received.</div>
                )}
                {formState === "error" && (
                  <div role="alert" className="mb-6 rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100">Please complete every field and include at least 30 characters about the research question.</div>
                )}

                <form action={submitResearchBrief} className="grid gap-5">
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" autoComplete="name" placeholder="Your name" />
                    <Field label="Work email" name="email" type="email" autoComplete="email" placeholder="you@company.com" />
                  </div>
                  <Field label="Company" name="company" autoComplete="organization" placeholder="Company name" />
                  <label className="grid gap-2 text-sm font-bold">
                    What do you need to investigate or decide?
                    <textarea name="question" required minLength={30} rows={7} placeholder="Describe the opportunity, important unknowns, existing evidence, constraints and the decision the research should support." className="resize-y rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-sm font-normal leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-[#e5b8ff]/55 focus:ring-4 focus:ring-[#e5b8ff]/10" />
                  </label>

                  <button type="submit" className="group mt-2 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#e5b8ff] px-7 text-sm font-black text-[#24102c] transition hover:-translate-y-0.5 hover:bg-white">
                    Send research brief
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                  <p className="text-xs leading-5 text-white/30">By submitting this form, you agree that QuantumFinix may use these details to respond to your enquiry.</p>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-[#120a19] px-4 py-8 text-white sm:px-7 lg:px-10">
          <div className="mx-auto flex max-w-[1380px] flex-col gap-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {COMPANY.name}. Research, AI and product engineering.</p>
            <div className="flex flex-wrap gap-5">
              <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
              <Link href="/terms" className="transition hover:text-white">Terms</Link>
              <Link href="/contact" className="transition hover:text-white">Contact</Link>
            </div>
          </div>
        </footer>

        <style>{`
          @keyframes qf-rise { from { opacity: 0; transform: translateY(28px); filter: blur(10px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
          @keyframes qf-float { 0%,100% { transform: translateY(0) rotate(-0.25deg); } 50% { transform: translateY(-12px) rotate(0.25deg); } }
          @keyframes qf-orb { 0%,100% { transform: scale(.88) translate3d(0,0,0); opacity:.55; } 50% { transform: scale(1.12) translate3d(-40px,30px,0); opacity:.9; } }
          @keyframes qf-scan { from { transform: translateY(-180%); } to { transform: translateY(800%); } }
          @keyframes qf-note { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
          .qf-rise { animation: qf-rise .9s cubic-bezier(.16,1,.3,1) both; }
          .qf-float { animation: qf-float 7s ease-in-out infinite; }
          .qf-orb { animation: qf-orb 15s ease-in-out infinite; }
          .qf-scan { animation: qf-scan 10s linear infinite; }
          .qf-scan-card { animation: qf-scan 7s linear infinite; }
          .qf-note { animation: qf-note .8s .65s cubic-bezier(.16,1,.3,1) both; }
          .qf-note-delay { animation: qf-note .8s .9s cubic-bezier(.16,1,.3,1) both; }
          .qf-card { transition: transform .35s ease, box-shadow .35s ease; }
          .qf-card:hover { transform: translateY(-5px); box-shadow: 0 28px 70px rgba(54,20,71,.12); z-index:1; }
          .qf-process-row { transition: background-color .3s ease, padding-left .3s ease; }
          .qf-process-row:hover { background: rgba(229,184,255,.035); padding-left: .75rem; }
          @media (prefers-reduced-motion: reduce) {
            .qf-rise,.qf-float,.qf-orb,.qf-scan,.qf-scan-card,.qf-note,.qf-note-delay { animation: none !important; }
            .qf-card,.qf-process-row { transition: none !important; }
          }
        `}</style>
      </div>
    </>
  );
}

function SectionLabel({ children, dark = false, centered = false }: { children: ReactNode; dark?: boolean; centered?: boolean }) {
  return (
    <p className={`${centered ? "text-center" : ""} text-[10px] font-black uppercase tracking-[0.22em] ${dark ? "text-[#e5b8ff]" : "text-[#7c2f9d]"}`}>
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description: string; dark?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
      <SectionLabel dark={dark}>{eyebrow}</SectionLabel>
      <div>
        <h2 className={`max-w-5xl text-4xl font-black leading-[1.01] tracking-[-0.055em] sm:text-5xl lg:text-6xl ${dark ? "text-white" : "text-[#17121d]"}`}>{title}</h2>
        <p className={`mt-6 max-w-3xl text-base leading-8 ${dark ? "text-white/52" : "text-black/56"}`}>{description}</p>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", autoComplete, placeholder }: { label: string; name: string; type?: string; autoComplete?: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <input name={name} type={type} required autoComplete={autoComplete} placeholder={placeholder} className="min-h-12 rounded-2xl border border-white/12 bg-black/20 px-4 text-sm font-normal text-white outline-none transition placeholder:text-white/25 focus:border-[#e5b8ff]/55 focus:ring-4 focus:ring-[#e5b8ff]/10" />
    </label>
  );
}