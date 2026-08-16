import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  Braces,
  Cable,
  Check,
  Code2,
  LineChart,
  Megaphone,
  Search,
  Workflow,
} from "lucide-react";

const serviceAreas = [
  {
    title: "AI Software Development",
    href: "/services/ai-software-development",
    description:
      "Design and build AI-enabled software, AI agents and practical AI workflows that support real business tasks rather than adding AI for its own sake.",
    icon: Bot,
  },
  {
    title: "Custom Software Development",
    href: "/services/custom-software-development",
    description:
      "Build internal platforms, customer portals, workflow tools, web applications and custom systems around the way your business actually operates.",
    icon: Code2,
  },
  {
    title: "Automation & API Integration",
    href: "/services/automation-integration",
    description:
      "Connect forms, CRMs, databases, email, internal tools and external services so repetitive actions and data handoffs can happen with less manual effort.",
    icon: Workflow,
  },
  {
    title: "Digital Marketing",
    href: "/digital-marketing",
    description:
      "Improve visibility, traffic, lead generation and conversions through SEO, paid media, social, content, email marketing, CRO and analytics.",
    icon: Megaphone,
  },
];

const solutionPaths = [
  {
    label: "BUY",
    title: "Ready-made AI, software and automation solutions",
    body:
      "Choose this path when the business problem is common, the requirement is clear and you want to move faster without starting a new software project from zero.",
    href: "/solutions",
    cta: "Explore ready-made solutions",
  },
  {
    label: "BUILD",
    title: "Custom software designed around your workflow",
    body:
      "Choose this path when generic tools do not fit your process, when several systems need to work together, or when you are creating a new software or SaaS product.",
    href: "/book-consultation",
    cta: "Discuss a custom solution",
  },
  {
    label: "GROW",
    title: "Digital marketing built around a measurable goal",
    body:
      "Choose this path when the product or service is ready and the priority is improving discoverability, traffic, lead quality, conversion or customer growth.",
    href: "/digital-marketing",
    cta: "Explore digital marketing",
  },
];

const outcomes = [
  "Reduce repetitive manual work across sales, operations, support or administration.",
  "Connect business systems and APIs so information moves with fewer manual handoffs.",
  "Build customer portals, internal tools, web applications and SaaS products around specific workflows.",
  "Use AI agents where automated reasoning, qualification, assistance or response handling adds practical value.",
  "Improve search visibility and organic discovery through SEO and useful content.",
  "Generate and measure demand through PPC, paid campaigns, social media and email marketing.",
  "Improve conversion paths with clearer user journeys, CRO and analytics.",
  "Launch a focused first version and expand the system as requirements become clearer.",
];

const internalLinks = [
  {
    href: "/services/ai-software-development",
    title: "AI Software Development",
    text: "Explore AI-enabled applications, AI agents and intelligent software workflows.",
  },
  {
    href: "/services/custom-software-development",
    title: "Custom Software Development",
    text: "Learn about software built around a specific workflow, product or business requirement.",
  },
  {
    href: "/services/automation-integration",
    title: "Automation & Integration",
    text: "See how connected workflows, APIs and automation can reduce repetitive work.",
  },
  {
    href: "/solutions",
    title: "Ready-made Solutions",
    text: "Browse AI agents, software and automation products designed for repeatable business problems.",
  },
  {
    href: "/digital-marketing",
    title: "Digital Marketing",
    text: "Explore SEO, PPC, social media, email marketing, content, CRO and analytics.",
  },
  {
    href: "/about",
    title: "About QuantumFinix",
    text: "Learn more about the company, its focus and how projects are approached.",
  },
];

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "QuantumFinix",
  url: "https://quantumfinix.com/",
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QuantumFinix",
  url: "https://quantumfinix.com/",
  logo: "https://quantumfinix.com/quantumfinix-mark.png",
  email: "hello@quantumfinix.com",
  description:
    "QuantumFinix provides AI software development, custom software, business automation, API integration, ready-made solutions and digital marketing services.",
};

export default function SEOContentHub() {
  return (
    <section
      aria-labelledby="seo-content-heading"
      className="relative overflow-hidden bg-white py-16 text-[#0b2a5f] sm:py-20 lg:py-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(23,105,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(23,105,255,.035) 1px,transparent 1px)",
            backgroundSize: "86px 86px",
            maskImage: "linear-gradient(to bottom, black, transparent 92%)",
          }}
        />
        <div className="absolute -right-40 top-16 h-[360px] w-[360px] rounded-full bg-[#f3f8ff]" />
        <div className="absolute -left-40 bottom-40 h-[340px] w-[340px] rounded-full bg-[#f7faff]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 xl:px-16">
        {/* =====================================================
            INTRO / TOPICAL POSITIONING
        ====================================================== */}
        <div className="grid gap-8 border-b border-[#dfe8f3] pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#d8e5f4] bg-[#f8fbff] px-4 py-2">
              <Search size={13} className="text-[#1769ff]" />
              <span className="text-xs font-black uppercase tracking-[0.12em] text-[#1769ff]">
                AI · Software · Automation · Digital Growth
              </span>
            </div>

            <p className="mt-5 max-w-[470px] text-sm leading-7 text-[#6d88a7]">
              A practical guide to the services, solutions and business
              problems QuantumFinix is built to address.
            </p>
          </div>

          <div>
            <h2
              id="seo-content-heading"
              className="max-w-[1000px] text-[clamp(2.7rem,4.8vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-[#0b2a5f]"
            >
              AI, software, automation and digital marketing
              <span className="text-[#1769ff]"> built around real business problems.</span>
            </h2>

            <p className="mt-6 max-w-[900px] text-[16px] leading-8 text-[#4f7094] sm:text-[17px]">
              QuantumFinix helps businesses choose, build and grow digital
              systems. That may mean deploying a ready-made AI or automation
              solution, developing custom software around a specific workflow,
              connecting existing tools through APIs and automation, or
              improving digital visibility and lead generation through
              marketing. The starting point is the business problem, not a
              predetermined technology stack.
            </p>
          </div>
        </div>

        {/* =====================================================
            CORE SERVICE AREAS
        ====================================================== */}
        <div className="mt-12">
          <div className="max-w-[900px]">
            <p className="text-xs font-black uppercase tracking-[0.13em] text-[#1769ff]">
              Core capabilities
            </p>

            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0b2a5f] sm:text-[2.6rem]">
              Technology and growth services that connect to a business outcome.
            </h3>

            <p className="mt-4 text-[15px] leading-7 text-[#6a84a7]">
              The categories below describe the main ways a project can begin.
              Dedicated service pages provide the deeper technical and delivery
              detail.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {serviceAreas.map(({ title, href, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-[24px] border border-[#dce7f4] bg-[#fbfdff] p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef5ff] text-[#1769ff]">
                    <Icon size={18} />
                  </span>

                  <div>
                    <h4 className="text-xl font-bold tracking-[-0.025em] text-[#0b2a5f]">
                      {title}
                    </h4>

                    <p className="mt-3 text-sm leading-7 text-[#607fa2]">
                      {description}
                    </p>

                    <Link
                      href={href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1769ff]"
                    >
                      Learn about {title.toLowerCase()}
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =====================================================
            AI SECTION
        ====================================================== */}
        <div className="mt-14 grid gap-7 border-t border-[#dfe8f3] pt-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef5ff] text-[#1769ff]">
                <Bot size={17} />
              </span>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#1769ff]">
                AI software development
              </p>
            </div>
          </div>

          <div className="max-w-[930px]">
            <h3 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#0b2a5f] sm:text-[2.7rem]">
              AI agents and AI-enabled software should solve a defined task.
            </h3>

            <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#597a9e]">
              <p>
                AI software development is most useful when there is a clear
                business workflow to improve. Examples include qualifying
                incoming leads, assisting customer support, extracting and
                organizing information, helping teams work through repetitive
                decisions, or adding an AI-assisted experience to an existing
                software product.
              </p>

              <p>
                A useful AI solution needs more than a model connection. The
                surrounding software determines what information the AI can
                access, what actions it can take, where human approval is
                required, how outputs are stored, and how the workflow behaves
                when the AI is uncertain. For that reason, AI agents,
                automation, APIs, databases and user interfaces often need to
                be considered together.
              </p>

              <p>
                If the requirement is repeatable, a ready-made AI solution may
                be the faster route. If the workflow is unique, involves
                proprietary systems or needs a specific user experience, a
                custom AI software project may be more appropriate.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "AI agents for business",
                "AI-enabled applications",
                "Lead qualification AI",
                "Customer support AI",
                "Workflow assistance",
                "AI integrations",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#dce7f4] bg-white px-3 py-2 text-xs font-semibold text-[#45688e]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            CUSTOM SOFTWARE / SAAS / WEB APPS
        ====================================================== */}
        <div className="mt-12 grid gap-7 border-t border-[#dfe8f3] pt-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef5ff] text-[#1769ff]">
                <Braces size={17} />
              </span>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#1769ff]">
                Custom software development
              </p>
            </div>
          </div>

          <div className="max-w-[930px]">
            <h3 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#0b2a5f] sm:text-[2.7rem]">
              Custom software makes sense when the workflow is the requirement.
            </h3>

            <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#597a9e]">
              <p>
                Off-the-shelf software is often the best answer when the
                business process is standard. Custom software development
                becomes useful when existing tools create workarounds, when
                several systems need to be combined into one experience, or
                when the software itself is part of a new product or service.
              </p>

              <p>
                A custom project may involve an internal operations platform, a
                customer portal, a web application, a SaaS product, a workflow
                tool, a reporting interface or a system that connects several
                existing services. The objective is not to build more software
                than necessary. The objective is to create the smallest useful
                system that solves the important workflow well and can evolve
                later.
              </p>

              <p>
                For new product ideas, beginning with a focused first release
                or MVP can reduce unnecessary complexity. Once the core user
                journey and business value are proven, additional modules,
                automation, analytics, integrations and AI capabilities can be
                added with more confidence.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Internal business software", "Replace spreadsheets and disconnected processes with one purpose-built system."],
                ["Customer portals", "Give customers a dedicated place to manage requests, documents, orders or services."],
                ["Web application development", "Build browser-based software around a specific user journey or operational need."],
                ["SaaS development", "Turn a repeatable workflow or product idea into software that can serve multiple customers."],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-[20px] border border-[#dce7f4] bg-[#fbfdff] p-4"
                >
                  <p className="text-sm font-bold text-[#17385f]">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#6a84a7]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            AUTOMATION / INTEGRATION
        ====================================================== */}
        <div className="mt-12 grid gap-7 border-t border-[#dfe8f3] pt-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef5ff] text-[#1769ff]">
                <Cable size={17} />
              </span>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#1769ff]">
                Automation & API integration
              </p>
            </div>
          </div>

          <div className="max-w-[930px]">
            <h3 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#0b2a5f] sm:text-[2.7rem]">
              Automate the handoffs that waste time between systems and teams.
            </h3>

            <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#597a9e]">
              <p>
                Business automation is not only about replacing clicks. The
                larger opportunity is often reducing the number of times people
                copy information, chase approvals, update multiple systems or
                repeat the same action after an event happens somewhere else.
              </p>

              <p>
                API integration can connect websites, forms, CRMs, databases,
                email platforms, internal applications, payment services and
                other software so data can move through a defined workflow.
                Automation can then trigger the next action when appropriate:
                create a record, notify a team member, request approval, send a
                message, update a status or pass information to another system.
              </p>

              <p>
                The right design also decides where automation should stop.
                High-impact or ambiguous decisions may still need a human
                checkpoint. A reliable automation system should make those
                boundaries clear rather than hiding them.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            DIGITAL MARKETING
        ====================================================== */}
        <div className="mt-12 grid gap-7 border-t border-[#dfe8f3] pt-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef5ff] text-[#1769ff]">
                <LineChart size={17} />
              </span>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#1769ff]">
                Digital marketing
              </p>
            </div>
          </div>

          <div className="max-w-[930px]">
            <h3 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#0b2a5f] sm:text-[2.7rem]">
              Visibility is useful when it moves the right people toward action.
            </h3>

            <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#597a9e]">
              <p>
                Digital marketing should begin with the growth objective. A
                business may need more organic visibility, faster paid
                acquisition, stronger brand attention, better lead nurturing,
                clearer analytics or a website that converts more of its
                existing traffic. Those goals do not always require the same
                channel mix.
              </p>

              <p>
                SEO can support long-term discovery for topics and services
                people actively search for. PPC and paid advertising can reach
                targeted audiences more quickly and generate useful campaign
                data. Social media and content can build awareness, explain
                complex offers and create repeated exposure. Email marketing
                can nurture leads and support existing customer relationships.
                CRO and analytics help identify where users drop off and where
                the experience can be improved.
              </p>

              <p>
                The strongest marketing system connects those activities back
                to a measurable business journey: visibility, traffic, leads
                and conversions. Dedicated marketing pages can go deeper into
                each channel without forcing the home page to become a list of
                every possible tactic.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "SEO",
                "Social media",
                "PPC / paid ads",
                "Email marketing",
                "Content",
                "CRO & analytics",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#dce7f4] bg-white px-3 py-2 text-xs font-semibold text-[#45688e]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            BUY / BUILD / GROW DECISION
        ====================================================== */}
        <div className="mt-14 border-t border-[#dfe8f3] pt-10">
          <div className="max-w-[900px]">
            <p className="text-xs font-black uppercase tracking-[0.13em] text-[#1769ff]">
              Choose the right route
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0b2a5f] sm:text-[2.6rem]">
              Buy, build or grow: three different needs, three different next steps.
            </h3>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {solutionPaths.map((path) => (
              <article
                key={path.label}
                className="flex min-h-[300px] flex-col rounded-[24px] border border-[#dce7f4] bg-[#fbfdff] p-5 sm:p-6"
              >
                <p className="text-xs font-black uppercase tracking-[0.13em] text-[#1769ff]">
                  {path.label}
                </p>
                <h4 className="mt-4 text-xl font-bold leading-7 text-[#0b2a5f]">
                  {path.title}
                </h4>
                <p className="mt-4 text-sm leading-7 text-[#607fa2]">
                  {path.body}
                </p>

                <Link
                  href={path.href}
                  className="mt-auto inline-flex items-center gap-2 border-t border-[#e2eaf4] pt-5 text-sm font-bold text-[#1769ff]"
                >
                  {path.cta}
                  <ArrowUpRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* =====================================================
            OUTCOMES / USE CASE LANGUAGE
        ====================================================== */}
        <div className="mt-14 grid gap-8 border-t border-[#dfe8f3] pt-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.13em] text-[#1769ff]">
              Business outcomes
            </p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#0b2a5f]">
              Start with what needs to improve.
            </h3>
          </div>

          <div className="grid gap-x-8 sm:grid-cols-2">
            {outcomes.map((item) => (
              <div
                key={item}
                className="flex gap-3 border-t border-[#dfe8f3] py-4"
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-[#1769ff]">
                  <Check size={12} />
                </span>
                <p className="text-sm leading-7 text-[#55779b]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            PROCESS / TRUST
        ====================================================== */}
        <div className="mt-14 rounded-[28px] border border-[#dce7f4] bg-[#f8fbff] p-5 sm:p-7 lg:p-8">
          <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.13em] text-[#1769ff]">
                How projects move
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0b2a5f]">
                Understand → Plan → Build → Launch → Scale
              </h3>
            </div>

            <div className="space-y-4 text-[15px] leading-8 text-[#597a9e]">
              <p>
                A project starts by understanding the business, the users and
                the problem. The next step is choosing the right approach:
                ready-made product, custom software, automation, integration,
                AI, marketing, or a combination that makes sense.
              </p>
              <p>
                Planning turns the problem into a defined first scope. Build
                turns that plan into a working system. Launch includes the
                testing, deployment and handoff needed to put the solution into
                use. Scale is where improvements, new features, new channels or
                new automation can be added as the business changes.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            INTERNAL LINK HUB
        ====================================================== */}
        <div className="mt-14 border-t border-[#dfe8f3] pt-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.13em] text-[#1769ff]">
                Explore in more depth
              </p>
              <h3 className="mt-3 max-w-[480px] text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#0b2a5f]">
                Find the page that matches what you are trying to do.
              </h3>
              <p className="mt-4 max-w-[480px] text-sm leading-7 text-[#6a84a7]">
                These pages provide more focused information about each
                capability, solution type and next step.
              </p>
            </div>

            <nav
              aria-label="Related services and solutions"
              className="grid gap-3 sm:grid-cols-2"
            >
              {internalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-[20px] border border-[#dce7f4] bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-[#17385f]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#6a84a7]">
                        {item.text}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={15}
                      className="mt-1 shrink-0 text-[#1769ff] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* =====================================================
            FINAL CONTEXT CTA
        ====================================================== */}
        <div className="mt-14 flex flex-col gap-6 rounded-[28px] bg-[#0b2a5f] p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[850px]">
            <p className="text-xs font-black uppercase tracking-[0.13em] text-blue-200">
              Not sure which service applies?
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Start with the problem you are trying to solve.
            </h3>

            <p className="mt-3 max-w-[760px] text-sm leading-7 text-blue-100/80">
              You do not need a technical specification before starting. Share
              the workflow, bottleneck, product idea or growth goal and the
              next step can be defined from there.
            </p>
          </div>

          <Link
            href="/book-consultation"
            className="inline-flex min-h-[50px] shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#0b2a5f]"
          >
            Discuss Your Requirement
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}