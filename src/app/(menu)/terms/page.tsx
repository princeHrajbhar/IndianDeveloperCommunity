import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms of Use | QuantumFinix",
  description:
    "Terms governing access to QuantumFinix websites, software, AI, automation, custom development and growth services.",
};

const LAST_UPDATED = "16 August 2026";

const COMPANY_NAME = "QuantumFinix";
const CONTACT_EMAIL = "hello@quantumfinix.com";

const navigation = [
  { id: "acceptance", label: "Acceptance" },
  { id: "scope", label: "Scope" },
  { id: "definitions", label: "Definitions" },
  { id: "eligibility", label: "Eligibility & Authority" },
  { id: "engagement", label: "No Automatic Engagement" },
  { id: "services", label: "Our Services" },
  { id: "proposals", label: "Quotes & Proposals" },
  { id: "accounts", label: "Accounts & Security" },
  { id: "license", label: "Website Licence" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "prohibited-use", label: "Prohibited Conduct" },
  { id: "security", label: "Security Restrictions" },
  { id: "customer-data", label: "Customer Data" },
  { id: "customer-warranties", label: "Customer Warranties" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "custom-software", label: "Custom Software IP" },
  { id: "feedback", label: "Feedback" },
  { id: "trademarks", label: "Brand & Trademarks" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "ai", label: "AI & Automation" },
  { id: "growth", label: "Growth Services" },
  { id: "third-parties", label: "Third Parties" },
  { id: "open-source", label: "Open Source" },
  { id: "beta", label: "Beta Features" },
  { id: "availability", label: "Availability" },
  { id: "changes", label: "Service Changes" },
  { id: "payments", label: "Fees & Payments" },
  { id: "refunds", label: "Refunds & Cancellations" },
  { id: "taxes", label: "Taxes" },
  { id: "compliance", label: "Legal Compliance" },
  { id: "suspension", label: "Suspension" },
  { id: "termination", label: "Termination" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "no-results", label: "No Guaranteed Results" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "indemnity", label: "Business Indemnity" },
  { id: "force-majeure", label: "Force Majeure" },
  { id: "consumer-rights", label: "Consumer Rights" },
  { id: "disputes", label: "Disputes" },
  { id: "governing-law", label: "Governing Law" },
  { id: "electronic", label: "Electronic Communications" },
  { id: "notices", label: "Legal Notices" },
  { id: "assignment", label: "Assignment" },
  { id: "severability", label: "Severability" },
  { id: "waiver", label: "No Waiver" },
  { id: "entire-agreement", label: "Entire Agreement" },
  { id: "priority", label: "Document Priority" },
  { id: "survival", label: "Survival" },
  { id: "updates", label: "Changes to Terms" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] text-[#0b1220]">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-48 h-[40rem] w-[40rem] rounded-full bg-cyan-400/[0.08] blur-[140px]"
        />

        <div
          aria-hidden="true"
          className="absolute -left-40 top-1/2 h-[30rem] w-[30rem] rounded-full bg-blue-500/[0.06] blur-[130px]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.2] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 lg:px-12 lg:pb-28 lg:pt-32 xl:px-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-cyan-200 bg-cyan-50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-800">
              <span className="h-1.5 w-1.5 bg-cyan-500" />
              Legal
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Website • Software • AI • Development • Growth
            </span>
          </div>

          <h1 className="mt-8 max-w-7xl text-[clamp(3.6rem,10.5vw,9.2rem)] font-black uppercase leading-[0.82] tracking-[-0.07em] text-[#07101f]">
            Terms of
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Use.
            </span>
          </h1>

          <p className="mt-10 max-w-4xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9 lg:text-2xl lg:leading-10">
            These Terms govern access to QuantumFinix websites, communications,
            accounts, software, AI systems, automation, existing software
            products, custom development and growth-related services unless a
            separate written agreement expressly provides otherwise.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-3">
            <HeaderInfo label="Last updated" value={LAST_UPDATED} />

            <HeaderInfo
              label="Website operator"
              value={COMPANY_NAME}
            />

            <HeaderInfo
              label="Legal contact"
              value={CONTACT_EMAIL}
            />
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1500px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:px-12 lg:py-24 xl:grid-cols-[290px_minmax(0,1fr)] xl:px-16">
        {/* NAVIGATION */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-3">
            <p className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
              Legal index
            </p>

            <nav className="border-l border-slate-200">
              {navigation.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-3 border-l-2 border-transparent py-2 pl-4 text-[11px] font-medium text-slate-500 transition hover:border-cyan-500 hover:text-[#07101f]"
                >
                  <span className="font-mono text-[8px] text-slate-300 group-hover:text-cyan-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <article className="min-w-0">
          {/* IMPORTANT NOTICE */}
          <div className="mb-16 border-l-4 border-cyan-500 bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.05)] sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-700">
              Important contractual notice
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              These Terms are intended primarily to govern the website and
              general use of QuantumFinix services. Custom development,
              enterprise software, retainers, managed services and other paid
              engagements may require a separate Master Services Agreement,
              Statement of Work, Order Form, licence agreement or other written
              contract.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              A separate signed agreement may contain project-specific terms
              concerning price, deliverables, milestones, acceptance,
              intellectual property, service levels, support, warranties,
              confidentiality and liability.
            </p>

            <p className="mt-4 text-base font-semibold leading-8 text-[#07101f]">
              Nothing in these Terms excludes a right or liability that
              applicable law does not permit to be excluded.
            </p>
          </div>

          <LegalSection id="acceptance" number="01" title="Acceptance of Terms">
            <LegalText>
              By creating an account, purchasing a service, submitting an order,
              clicking a button indicating acceptance, signing up for a
              QuantumFinix product, or otherwise using functionality presented
              subject to these Terms, you agree to these Terms to the extent
              permitted by applicable law.
            </LegalText>

            <LegalText>
              If you do not agree, you must not create an account, purchase or
              use the applicable service.
            </LegalText>

            <LegalText>
              Where you merely browse publicly available pages, the provisions
              concerning authorised website use, intellectual property,
              security, prohibited conduct and other provisions applicable to
              visitors apply to the extent enforceable by law.
            </LegalText>
          </LegalSection>

          <LegalSection id="scope" number="02" title="Scope">
            <LegalText>
              These Terms may apply to websites, portals, demonstrations,
              dashboards, applications, software, digital products, APIs, AI
              functionality, integrations, automation tools, consultancy and
              related services operated or made available by QuantumFinix.
            </LegalText>

            <LegalText>
              Service-specific terms may supplement these Terms. Where a
              service-specific agreement validly conflicts with these Terms,
              the more specific agreement will generally govern the relevant
              subject matter.
            </LegalText>
          </LegalSection>

          <LegalSection id="definitions" number="03" title="Definitions">
            <DefinitionGrid
              items={[
                {
                  title: "QuantumFinix",
                  text: "QuantumFinix and, where applicable, the contracting entity, owner, authorised affiliates, successors and permitted assigns operating the relevant service.",
                },
                {
                  title: "Services",
                  text: "Websites, software, applications, AI features, automation, custom development, consulting, digital growth services and related functionality supplied by QuantumFinix.",
                },
                {
                  title: "User",
                  text: "A visitor, customer, account holder, authorised representative or other person accessing or using a Service.",
                },
                {
                  title: "Business Customer",
                  text: "A person or organisation acquiring or using Services principally for commercial, professional, organisational or business purposes.",
                },
                {
                  title: "Customer Data",
                  text: "Content, data, instructions, files, records, prompts or information submitted to a Service by or for a customer.",
                },
                {
                  title: "Order",
                  text: "An accepted Order Form, proposal, Statement of Work, checkout purchase, subscription or other documented purchase arrangement.",
                },
              ]}
            />
          </LegalSection>

          <LegalSection
            id="eligibility"
            number="04"
            title="Eligibility & Authority"
          >
            <LegalText>
              You may use Services only if you have legal capacity to enter the
              relevant transaction or are validly authorised to act for the
              organisation on whose behalf you use the Services.
            </LegalText>

            <LegalText>
              If you accept these Terms for a company, organisation or other
              legal entity, you represent that you possess authority to bind
              that entity.
            </LegalText>

            <LegalText>
              You must not falsely claim authority to act for another person or
              organisation.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="engagement"
            number="05"
            title="An Enquiry Does Not Create an Engagement"
          >
            <LegalText>
              Contacting QuantumFinix, submitting an enquiry, booking a call,
              requesting a demonstration, discussing a project or receiving
              preliminary information does not by itself create a consulting,
              development, employment, agency, partnership, fiduciary or other
              professional relationship.
            </LegalText>

            <LegalText>
              A commercial project begins only in accordance with an accepted
              Order, Statement of Work, written agreement or other arrangement
              expressly accepted by QuantumFinix.
            </LegalText>

            <NoticeBox title="Do not send confidential trade secrets prematurely">
              Unless a confidentiality agreement or protected submission
              process applies, do not send source code, credentials, trade
              secrets, highly confidential business information or other
              sensitive material merely to request an initial consultation.
            </NoticeBox>
          </LegalSection>

          <LegalSection id="services" number="06" title="Services">
            <LegalText>
              QuantumFinix may provide one or more categories of technology
              services, including ready-to-use software, configurable software,
              custom software development, artificial intelligence,
              integrations, business automation, research and development,
              digital growth, marketing technology and related consulting.
            </LegalText>

            <LegalText>
              Features, specifications, availability, eligibility and commercial
              terms may differ between products and customers.
            </LegalText>

            <LegalText>
              Information displayed on the website does not guarantee that a
              particular Service, integration, feature or commercial arrangement
              will be available to every customer.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="proposals"
            number="07"
            title="Quotes, Estimates & Proposals"
          >
            <LegalText>
              Unless expressly identified as a binding offer, website pricing,
              preliminary quotations, estimates, demonstrations, schedules,
              statements and project discussions are informational and may be
              subject to confirmation.
            </LegalText>

            <LegalText>
              A project estimate may change when requirements, dependencies,
              assumptions, integrations, scope, third-party costs, customer
              instructions or technical conditions change.
            </LegalText>

            <LegalList
              items={[
                "A proposal may have an expiry date.",
                "Taxes and third-party charges may be additional unless expressly included.",
                "Timelines may depend on customer cooperation and third-party systems.",
                "Scope not expressly included may require a change request or separate charge.",
                "Oral discussions do not modify a signed written agreement unless the agreement permits that modification.",
              ]}
            />
          </LegalSection>

          <LegalSection id="accounts" number="08" title="Accounts & Credentials">
            <LegalText>
              You are responsible for maintaining the confidentiality and
              security of credentials associated with your account and for
              activity performed through authorised users under your control,
              except to the extent applicable law provides otherwise.
            </LegalText>

            <LegalList
              items={[
                "Use strong and unique passwords.",
                "Enable available security controls where appropriate.",
                "Restrict administrative credentials to authorised personnel.",
                "Do not share private API keys or authentication secrets publicly.",
                "Remove access promptly when personnel no longer require it.",
                "Notify QuantumFinix promptly of suspected unauthorised account access.",
              ]}
            />

            <LegalText>
              QuantumFinix may require password resets, authentication changes,
              access reviews or other security actions where reasonably
              necessary to protect Services or users.
            </LegalText>
          </LegalSection>

          <LegalSection id="license" number="09" title="Limited Website Licence">
            <LegalText>
              Subject to these Terms, QuantumFinix grants you a limited,
              revocable, non-exclusive, non-transferable and non-sublicensable
              permission to access and use the website and applicable Services
              for their intended lawful purpose.
            </LegalText>

            <LegalText>
              This permission does not transfer ownership of QuantumFinix
              technology or intellectual property.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="acceptable-use"
            number="10"
            title="Acceptable Use"
          >
            <LegalText>
              You must use QuantumFinix websites and Services lawfully,
              responsibly and within the intended technical and commercial
              purpose of the relevant Service.
            </LegalText>

            <LegalList
              items={[
                "Follow applicable laws and regulations.",
                "Respect intellectual-property and privacy rights.",
                "Use only accounts, systems and data you are authorised to access.",
                "Comply with reasonable technical limits and security requirements.",
                "Ensure your employees and authorised users comply with applicable contractual requirements.",
              ]}
            />
          </LegalSection>

          <LegalSection
            id="prohibited-use"
            number="11"
            title="Prohibited Conduct"
          >
            <LegalText>
              To the maximum extent permitted by applicable law, you must not
              use QuantumFinix websites or Services to engage in or facilitate
              unlawful, abusive, fraudulent or unauthorised conduct.
            </LegalText>

            <LegalList
              items={[
                "Fraud, impersonation, identity theft or deceptive activity.",
                "Unauthorised access to systems, accounts, networks or data.",
                "Malware, ransomware, destructive code or malicious payload distribution.",
                "Credential theft, phishing or unauthorised credential collection.",
                "Harassment, threats, unlawful discrimination or illegal surveillance.",
                "Distribution of content you have no legal right to distribute.",
                "Infringement of intellectual-property or confidentiality rights.",
                "Unlawful scraping or harvesting of personal information.",
                "Circumvention of authentication, rate limits, access controls or security measures.",
                "Interference with the availability, integrity or performance of Services.",
                "Using the Services to violate sanctions, export restrictions or other applicable trade controls.",
                "Using the Services to commit or conceal criminal activity.",
                "Attempting to obtain unauthorised source code, confidential information or system secrets.",
              ]}
            />
          </LegalSection>

          <LegalSection
            id="security"
            number="12"
            title="Security & Technical Restrictions"
          >
            <LegalText>
              Unless expressly authorised in writing, you must not conduct
              penetration testing, vulnerability scanning, exploitation,
              reverse engineering or other security testing against
              QuantumFinix infrastructure.
            </LegalText>

            <LegalList
              items={[
                "Do not bypass authentication or authorisation.",
                "Do not probe non-public endpoints without permission.",
                "Do not deliberately generate unreasonable infrastructure load.",
                "Do not interfere with logging, telemetry or security controls.",
                "Do not attempt to access another customer's tenant, workspace or data.",
                "Do not introduce malicious code into any QuantumFinix-controlled environment.",
              ]}
            />

            <LegalText>
              Good-faith security researchers should request authorisation
              before performing testing.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="customer-data"
            number="13"
            title="Customer Data"
          >
            <LegalText>
              As between QuantumFinix and the customer, customers generally
              retain their rights in Customer Data, subject to any separate
              agreement.
            </LegalText>

            <LegalText>
              You grant QuantumFinix and its authorised service providers the
              rights reasonably necessary to host, transmit, reproduce,
              transform, process and otherwise handle Customer Data solely as
              needed to provide, secure, maintain and support the applicable
              Services and fulfil lawful contractual obligations.
            </LegalText>

            <LegalText>
              This operational licence does not transfer ownership of Customer
              Data to QuantumFinix.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="customer-warranties"
            number="14"
            title="Customer Representations & Warranties"
          >
            <LegalText>
              When you submit data, content, instructions, software or other
              material, you represent, to the extent applicable to your use,
              that:
            </LegalText>

            <LegalList
              items={[
                "You own the material or possess sufficient authority to use and provide it.",
                "Our processing of the material according to your instructions will not knowingly violate applicable law.",
                "You have obtained legally required notices, permissions and consents.",
                "The material does not knowingly infringe third-party intellectual-property rights.",
                "Your instructions are not designed to cause QuantumFinix to violate law or third-party rights.",
                "You will not knowingly provide stolen, unlawfully obtained or malicious data.",
                "You have authority to connect any third-party account or integration you instruct us to connect.",
              ]}
            />
          </LegalSection>

          <LegalSection
            id="intellectual-property"
            number="15"
            title="QuantumFinix Intellectual Property"
          >
            <LegalText>
              QuantumFinix websites, branding, software architecture, platform
              technology, source code, object code, interfaces, designs,
              documentation, workflows, algorithms, know-how, templates,
              frameworks, libraries, methodologies and other proprietary
              materials are owned by QuantumFinix or its licensors except where
              expressly stated otherwise.
            </LegalText>

            <LegalText>
              No licence is granted except the limited rights expressly stated
              in these Terms or a separate written agreement.
            </LegalText>

            <LegalList
              items={[
                "You may not reproduce protected website content for commercial redistribution without permission.",
                "You may not remove proprietary notices.",
                "You may not represent QuantumFinix technology as your own.",
                "You may not sell or sublicense a Service except where expressly authorised.",
                "You may not create a competing copy through prohibited extraction or unauthorised reproduction.",
                "You may not use non-public QuantumFinix materials to train competing machine-learning systems without written authorisation.",
              ]}
            />
          </LegalSection>

          <LegalSection
            id="custom-software"
            number="16"
            title="Custom Software & Project Intellectual Property"
          >
            <LegalText>
              Intellectual-property ownership for custom software must be
              determined by the applicable Statement of Work, Master Services
              Agreement, licence agreement or other written project contract.
            </LegalText>

            <LegalText>
              Unless a written agreement expressly transfers ownership,
              delivery of software, demonstrations, prototypes or files does
              not by itself constitute an assignment of QuantumFinix
              intellectual property.
            </LegalText>

            <LegalText>
              QuantumFinix may retain ownership of pre-existing technology,
              generic frameworks, reusable modules, development tools,
              methodologies, know-how, libraries, templates and improvements
              that are not uniquely owned by a customer under a written
              agreement.
            </LegalText>

            <NoticeBox title="Project agreements control ownership">
              If you require source-code ownership, exclusivity, assignment,
              escrow, white-labelling or special licence rights, those rights
              must be expressly documented in the applicable project agreement.
            </NoticeBox>
          </LegalSection>

          <LegalSection id="feedback" number="17" title="Feedback">
            <LegalText>
              If you voluntarily provide product suggestions, feature requests,
              improvement ideas or other non-confidential feedback about
              QuantumFinix Services, you permit QuantumFinix to use that
              feedback to evaluate and improve its products without an
              obligation to implement the suggestion.
            </LegalText>

            <LegalText>
              This clause does not give QuantumFinix ownership of Customer Data,
              confidential customer materials or inventions governed by a
              separate written agreement.
            </LegalText>
          </LegalSection>

          <LegalSection id="trademarks" number="18" title="Brand & Trademarks">
            <LegalText>
              QuantumFinix names, logos, marks, branding and associated
              identifiers may be protected intellectual property.
            </LegalText>

            <LegalText>
              You may not use them in a way that falsely suggests sponsorship,
              endorsement, affiliation or ownership.
            </LegalText>

            <LegalText>
              Nothing in these Terms prevents lawful commentary, comparative
              statements or honest reviews that applicable law protects.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="confidentiality"
            number="19"
            title="Confidentiality"
          >
            <LegalText>
              Confidentiality obligations for commercial projects should
              normally be governed by an NDA, Master Services Agreement,
              Statement of Work or similar written agreement.
            </LegalText>

            <LegalText>
              Merely contacting QuantumFinix through a general website form
              does not create a special fiduciary, attorney-client or
              unrestricted confidentiality relationship.
            </LegalText>

            <LegalText>
              This does not reduce privacy, security or confidentiality
              obligations independently imposed by applicable law.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="ai"
            number="20"
            title="Artificial Intelligence & Automation"
          >
            <LegalText>
              QuantumFinix Services may use artificial intelligence, language
              models, machine learning, automated classification,
              recommendation technology or workflow automation.
            </LegalText>

            <LegalText>
              AI systems can generate incomplete, outdated, unexpected or
              inaccurate outputs. Outputs should be independently evaluated
              before being used for important decisions.
            </LegalText>

            <LegalList
              items={[
                "AI output is not guaranteed to be factually accurate.",
                "AI output is not automatically unique or free of third-party similarities.",
                "Users remain responsible for reviewing output before operational use.",
                "Users must not rely solely on general-purpose AI output for legal, medical, financial, safety-critical or similarly high-stakes decisions.",
                "Automated actions should be tested before deployment into production environments.",
                "Customers are responsible for determining whether their intended automated decision-making use is lawful.",
              ]}
            />

            <LegalText>
              Separate AI-specific contractual provisions may apply to
              enterprise or custom AI projects.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="growth"
            number="21"
            title="Marketing & Growth Services"
          >
            <LegalText>
              Growth, SEO, advertising, conversion optimisation, marketing
              automation and related Services involve market conditions and
              third-party platforms outside QuantumFinix&apos;s exclusive
              control.
            </LegalText>

            <LegalList
              items={[
                "Search-engine rankings are not guaranteed.",
                "Advertising account approval is not guaranteed.",
                "Platform policies may change without QuantumFinix controlling those changes.",
                "Lead volume, revenue, conversions and return on advertising spend are not guaranteed unless expressly stated in a separate written agreement.",
                "Previous results, examples or case studies do not guarantee identical future performance.",
                "Customers remain responsible for the legality and accuracy of claims concerning their own products and services.",
                "Customers must promptly approve or reject time-sensitive campaign materials when their approval is required.",
              ]}
            />
          </LegalSection>

          <LegalSection
            id="third-parties"
            number="22"
            title="Third-Party Services"
          >
            <LegalText>
              Services may interoperate with hosting providers, cloud
              infrastructure, payment providers, advertising platforms,
              analytics services, APIs, AI providers, app stores, social
              platforms, CRMs, communication services and other independent
              third parties.
            </LegalText>

            <LegalText>
              Third-party services may be governed by their own agreements,
              availability, pricing, policies and technical restrictions.
            </LegalText>

            <LegalText>
              QuantumFinix does not control an independent third party and is
              not responsible for that third party&apos;s independent acts,
              omissions, policy changes, service interruptions or decisions,
              except where applicable law expressly imposes responsibility on
              QuantumFinix.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="open-source"
            number="23"
            title="Open-Source & Third-Party Components"
          >
            <LegalText>
              Software may incorporate open-source or third-party components
              governed by separate licences.
            </LegalText>

            <LegalText>
              Applicable open-source licence terms will control the relevant
              component where those terms legally apply.
            </LegalText>

            <LegalText>
              Nothing in these Terms is intended to restrict rights granted
              directly to you under a governing open-source licence.
            </LegalText>
          </LegalSection>

          <LegalSection id="beta" number="24" title="Beta & Experimental Features">
            <LegalText>
              Alpha, beta, preview, experimental, research or early-access
              functionality may be incomplete, changed, discontinued or subject
              to additional restrictions.
            </LegalText>

            <LegalText>
              Unless otherwise agreed in writing, you should not use
              experimental functionality as the sole basis for mission-critical
              production operations.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="availability"
            number="25"
            title="Availability & Maintenance"
          >
            <LegalText>
              Unless a separate written Service Level Agreement expressly
              states otherwise, QuantumFinix does not promise uninterrupted,
              error-free or continuously available operation.
            </LegalText>

            <LegalText>
              Services may be unavailable because of maintenance, upgrades,
              security incidents, internet failures, infrastructure failures,
              third-party outages, emergency action, legal requirements or
              circumstances outside reasonable control.
            </LegalText>
          </LegalSection>

          <LegalSection id="changes" number="26" title="Changes to Services">
            <LegalText>
              QuantumFinix may modify, improve, replace or discontinue features
              where reasonably necessary for security, technical, operational,
              legal or commercial reasons.
            </LegalText>

            <LegalText>
              For material changes affecting paid contractual commitments,
              applicable Orders, written agreements and mandatory law will
              govern the parties&apos; rights.
            </LegalText>
          </LegalSection>

          <LegalSection id="payments" number="27" title="Fees & Payments">
            <LegalText>
              Fees for paid Services are determined by the applicable Order,
              checkout page, invoice, proposal, subscription or written
              agreement.
            </LegalText>

            <LegalList
              items={[
                "Payment must be made using an accepted payment method.",
                "Customers are responsible for maintaining accurate billing information.",
                "Late or failed payments may result in suspension where contractually and legally permitted.",
                "QuantumFinix may contest improper chargebacks and provide transaction evidence to payment providers.",
                "Reasonable collection costs may be recoverable where a contract and applicable law permit recovery.",
                "Project work outside agreed scope may require additional fees.",
              ]}
            />
          </LegalSection>

          <LegalSection
            id="refunds"
            number="28"
            title="Refunds, Cancellation & Credits"
          >
            <LegalText>
              Refund, cancellation and credit rights depend on the relevant
              Service, Order, project agreement and mandatory law.
            </LegalText>

            <LegalText>
              Unless a contrary right is expressly provided, work already
              properly performed, customised development, consumed
              infrastructure, third-party charges and committed project
              resources may be non-refundable to the extent permitted by law.
            </LegalText>

            <LegalText>
              Nothing in this section removes a refund, cancellation or remedy
              that mandatory consumer law requires.
            </LegalText>
          </LegalSection>

          <LegalSection id="taxes" number="29" title="Taxes">
            <LegalText>
              Unless expressly stated otherwise, quoted fees may exclude taxes,
              duties, levies or similar government charges.
            </LegalText>

            <LegalText>
              Customers are responsible for taxes lawfully imposed on their
              purchase except taxes imposed on QuantumFinix&apos;s own income
              or where applicable law requires QuantumFinix to collect and
              remit the relevant tax.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="compliance"
            number="30"
            title="Legal & Regulatory Compliance"
          >
            <LegalText>
              Each party remains responsible for laws applicable to its own
              activities.
            </LegalText>

            <LegalList
              items={[
                "Privacy and data-protection obligations.",
                "Intellectual-property rights.",
                "Employment and workplace obligations.",
                "Advertising and consumer-protection laws.",
                "Anti-bribery and anti-corruption rules.",
                "Applicable sanctions and export-control requirements.",
                "Industry-specific licensing requirements.",
                "Cybersecurity and computer-misuse restrictions.",
              ]}
            />

            <LegalText>
              QuantumFinix does not become responsible for a customer&apos;s
              independent regulatory obligations merely because it provides
              software or technology to that customer, except where the law or
              a written agreement expressly provides otherwise.
            </LegalText>
          </LegalSection>

          <LegalSection id="suspension" number="31" title="Suspension">
            <LegalText>
              To the extent permitted by applicable law and contract,
              QuantumFinix may restrict or suspend access where reasonably
              necessary to:
            </LegalText>

            <LegalList
              items={[
                "Prevent or investigate a security incident.",
                "Respond to suspected fraud or unlawful activity.",
                "Protect users, third parties or infrastructure.",
                "Respond to a legally binding requirement.",
                "Prevent material harm to a Service.",
                "Address material breach of applicable terms.",
                "Address undisputed overdue payments where suspension is contractually permitted.",
              ]}
            />

            <LegalText>
              Where reasonably practicable and appropriate, QuantumFinix may
              provide notice and an opportunity to remedy a curable breach.
            </LegalText>
          </LegalSection>

          <LegalSection id="termination" number="32" title="Termination">
            <LegalText>
              Termination rights for paid engagements are governed primarily by
              the applicable Order or written agreement.
            </LegalText>

            <LegalText>
              QuantumFinix may terminate access to a free or general website
              feature where access is no longer offered, where these Terms have
              been materially violated, or where continued provision creates a
              significant legal, security or technical risk.
            </LegalText>

            <LegalText>
              Termination does not automatically cancel payment obligations,
              intellectual-property rights, confidentiality obligations or
              other provisions intended to survive termination.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="disclaimers"
            number="33"
            title="Disclaimers"
          >
            <LegalText>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AND EXCEPT FOR
              EXPRESS WARRANTIES CONTAINED IN A SEPARATE WRITTEN AGREEMENT,
              SERVICES ARE PROVIDED ON AN &quot;AS AVAILABLE&quot; AND
              &quot;AS IS&quot; BASIS.
            </LegalText>

            <LegalText>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, QUANTUMFINIX DISCLAIMS
              IMPLIED WARRANTIES THAT MAY OTHERWISE APPLY, INCLUDING IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              NON-INFRINGEMENT OR UNINTERRUPTED AVAILABILITY, BUT ONLY TO THE
              EXTENT SUCH WARRANTIES MAY LAWFULLY BE DISCLAIMED.
            </LegalText>

            <NoticeBox title="Mandatory rights remain">
              Some jurisdictions do not permit exclusion of certain warranties
              or statutory guarantees. In those jurisdictions, the exclusion
              applies only to the maximum extent legally permitted.
            </NoticeBox>
          </LegalSection>

          <LegalSection
            id="no-results"
            number="34"
            title="No Guaranteed Business Outcome"
          >
            <LegalText>
              Unless a separate written agreement expressly provides a specific
              contractual commitment, QuantumFinix does not guarantee that any
              software, AI system, automation, consultation or growth service
              will produce a particular financial, commercial, ranking,
              operational or business outcome.
            </LegalText>

            <LegalText>
              Business outcomes may depend on customer implementation,
              management decisions, market conditions, third-party platforms,
              competition, data quality and circumstances outside
              QuantumFinix&apos;s control.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="liability"
            number="35"
            title="Limitation of Liability"
          >
            <LegalText>
              The following limitations apply only to the maximum extent
              permitted by applicable law.
            </LegalText>

            <LegalText>
              QUANTUMFINIX AND ITS OWNERS, DIRECTORS, OFFICERS, EMPLOYEES,
              CONTRACTORS, REPRESENTATIVES AND AFFILIATES WILL NOT BE LIABLE FOR
              INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE OR
              CONSEQUENTIAL LOSS ARISING FROM THE WEBSITE OR SERVICES WHERE
              SUCH LOSS MAY LAWFULLY BE EXCLUDED.
            </LegalText>

            <LegalText>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, EXCLUDED LOSSES MAY
              INCLUDE:
            </LegalText>

            <LegalList
              items={[
                "Loss of anticipated profits.",
                "Loss of business opportunity.",
                "Loss of goodwill.",
                "Loss of anticipated savings.",
                "Indirect loss of revenue.",
                "Business interruption.",
                "Consequential loss arising from third-party platform failure.",
                "Indirect loss arising from customer misuse or unauthorised configuration.",
              ]}
            />

            <LegalText>
              FOR BUSINESS CUSTOMERS, UNLESS A SEPARATE WRITTEN AGREEMENT
              PROVIDES A DIFFERENT LIABILITY CAP, QUANTUMFINIX&apos;S AGGREGATE
              LIABILITY ARISING FROM A PAID SERVICE WILL, TO THE MAXIMUM EXTENT
              PERMITTED BY LAW, NOT EXCEED THE FEES ACTUALLY PAID TO
              QUANTUMFINIX FOR THE SPECIFIC AFFECTED SERVICE DURING THE TWELVE
              MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
            </LegalText>

            <LegalText>
              For claims arising solely from free website use where no fees
              were paid, liability will be limited to the minimum extent
              permitted by applicable law.
            </LegalText>

            <LegalText>
              Nothing in these Terms excludes or restricts liability for fraud,
              fraudulent misrepresentation, wilful misconduct, death or
              personal injury where liability cannot lawfully be excluded, or
              any other liability that applicable law prohibits from being
              excluded or restricted.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="indemnity"
            number="36"
            title="Business Customer Indemnity"
          >
            <NoticeBox title="Primarily applicable to business users">
              This section is intended primarily for Business Customers and
              applies only to the extent enforceable under applicable law.
            </NoticeBox>

            <LegalText>
              A Business Customer agrees to defend, indemnify and hold harmless
              QuantumFinix and its owners, directors, officers, employees,
              contractors and affiliates against third-party claims, damages,
              liabilities, penalties, costs and reasonable professional fees to
              the extent arising from:
            </LegalText>

            <LegalList
              items={[
                "Customer Data supplied without sufficient legal authority.",
                "A customer's unlawful use of the Services.",
                "A customer's infringement of third-party intellectual-property rights.",
                "A customer's material breach of its representations or warranties.",
                "A customer's instructions that cause unlawful processing where QuantumFinix reasonably relied on the customer's authority.",
                "Fraudulent, malicious or intentionally unlawful activity by the customer or its authorised users.",
                "Content, products, advertising claims or services independently supplied by the customer.",
              ]}
            />

            <LegalText>
              QuantumFinix will not seek indemnification to the extent a claim
              was caused by QuantumFinix&apos;s own conduct for which applicable
              law does not permit indemnification.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="force-majeure"
            number="37"
            title="Force Majeure"
          >
            <LegalText>
              To the extent permitted by applicable law and the applicable
              contract, QuantumFinix will not be liable for delay or failure
              caused by circumstances outside its reasonable control.
            </LegalText>

            <LegalList
              items={[
                "Natural disasters and extreme weather.",
                "War, terrorism, civil disorder or governmental action.",
                "Widespread telecommunications or internet failures.",
                "Cloud or infrastructure outages outside reasonable control.",
                "Labour disruption not reasonably avoidable.",
                "Utility failures.",
                "Epidemics or public-health emergencies.",
                "Cyberattacks despite reasonable preventative measures.",
                "Changes in law or binding government restrictions.",
                "Failure of critical third-party systems outside reasonable control.",
              ]}
            />

            <LegalText>
              Force majeure does not excuse payment obligations for Services
              already properly delivered unless applicable law or the relevant
              written agreement provides otherwise.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="consumer-rights"
            number="38"
            title="Mandatory Consumer Rights"
          >
            <LegalText>
              If you are legally considered a consumer, mandatory consumer
              protection laws may provide rights that these Terms cannot waive.
            </LegalText>

            <LegalText>
              Nothing in these Terms is intended to remove statutory guarantees,
              refund rights, remedies, fairness protections, jurisdictional
              rights or other consumer protections that applicable law makes
              mandatory.
            </LegalText>

            <LegalText>
              Where a provision of these Terms conflicts with a mandatory
              consumer protection requirement, the mandatory requirement
              controls to the extent of that conflict.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="disputes"
            number="39"
            title="Dispute Resolution"
          >
            <LegalText>
              Before commencing formal proceedings, the parties are encouraged,
              where appropriate, to attempt in good faith to resolve a
              commercial dispute through written notice and reasonable
              discussion.
            </LegalText>

            <LegalText>
              This informal process does not prevent either party from seeking
              urgent interim or injunctive relief where necessary to protect
              intellectual property, confidential information, security or
              other rights requiring immediate protection.
            </LegalText>

            <LegalText>
              If an applicable Master Services Agreement, Order Form or other
              written contract contains a valid arbitration or dispute
              resolution clause, that clause will govern disputes within its
              scope.
            </LegalText>

            <LegalText>
              These Website Terms do not attempt to remove access to a court,
              tribunal, regulator or dispute mechanism where applicable law
              requires that access.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="governing-law"
            number="40"
            title="Governing Law & Jurisdiction"
          >
            <LegalText>
              Where a separate written agreement identifies governing law and
              jurisdiction, that agreement governs disputes within its scope.
            </LegalText>

            <LegalText>
              Otherwise, and subject to mandatory consumer or jurisdictional
              protections, these Terms are intended to be governed by the laws
              applicable at the principal establishment of the QuantumFinix
              entity operating or contracting for the relevant Service,
              excluding conflict-of-law rules to the extent permitted.
            </LegalText>

            <LegalText>
              Business users agree, to the extent legally permitted, that
              competent courts having jurisdiction over that QuantumFinix
              establishment may hear disputes not subject to another valid
              dispute-resolution agreement.
            </LegalText>

            <NoticeBox title="Set this precisely before major commercial launch">
              For maximum enforceability, your company lawyer should replace
              this general provision with the exact legal entity name,
              registered office, governing State/Country, court jurisdiction
              and—if desired for B2B contracts—a carefully drafted arbitration
              provision.
            </NoticeBox>
          </LegalSection>

          <LegalSection
            id="electronic"
            number="41"
            title="Electronic Communications"
          >
            <LegalText>
              Where legally permitted, communications, approvals, notices,
              transactions, acceptance records and signatures may be made
              electronically.
            </LegalText>

            <LegalText>
              You are responsible for maintaining a valid email address and
              reviewing communications reasonably associated with your account
              or contractual relationship.
            </LegalText>
          </LegalSection>

          <LegalSection id="notices" number="42" title="Legal Notices">
            <LegalText>
              Formal notices concerning an enterprise agreement should be sent
              using the notice procedure specified in that agreement.
            </LegalText>

            <LegalText>
              General legal correspondence concerning these Website Terms may
              be sent to:
            </LegalText>

            <div className="my-8 border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Legal contact
              </p>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 block break-all text-2xl font-black tracking-[-0.04em] text-[#07101f] transition hover:text-cyan-600 sm:text-3xl"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </LegalSection>

          <LegalSection id="assignment" number="43" title="Assignment">
            <LegalText>
              A user may not assign a paid enterprise agreement where that
              agreement prohibits assignment without consent.
            </LegalText>

            <LegalText>
              Subject to applicable law and contractual restrictions,
              QuantumFinix may assign applicable rights and obligations in
              connection with a corporate reorganisation, financing, merger,
              acquisition, sale of business or transfer to an affiliated or
              successor entity.
            </LegalText>
          </LegalSection>

          <LegalSection id="severability" number="44" title="Severability">
            <LegalText>
              If a court or other competent authority determines that a
              provision of these Terms is invalid or unenforceable, that
              provision should be applied to the maximum extent legally
              permissible or severed to the minimum extent necessary.
            </LegalText>

            <LegalText>
              The remaining provisions will continue in effect to the extent
              legally permitted.
            </LegalText>
          </LegalSection>

          <LegalSection id="waiver" number="45" title="No Waiver">
            <LegalText>
              A failure or delay by QuantumFinix to exercise a contractual right
              does not by itself permanently waive that right.
            </LegalText>

            <LegalText>
              A waiver of a particular breach does not automatically waive a
              later or different breach unless expressly stated.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="entire-agreement"
            number="46"
            title="Entire Agreement"
          >
            <LegalText>
              These Terms, together with applicable Orders, service-specific
              terms and referenced policies, constitute the agreement governing
              the matters within their scope unless another signed agreement
              provides otherwise.
            </LegalText>

            <LegalText>
              They do not replace a Master Services Agreement or other contract
              that expressly states that it supersedes these Terms.
            </LegalText>
          </LegalSection>

          <LegalSection
            id="priority"
            number="47"
            title="Order of Precedence"
          >
            <LegalText>
              Unless a signed agreement states otherwise, conflicts should
              generally be resolved in the following order for the subject
              matter concerned:
            </LegalText>

            <PriorityList
              items={[
                "Signed Master Services Agreement or negotiated contract",
                "Signed or accepted Statement of Work / Order Form",
                "Service-specific contractual terms",
                "Data Processing Agreement for data-processing matters",
                "These Terms of Use",
                "General website descriptions and marketing materials",
              ]}
            />

            <LegalText>
              Marketing material does not override an expressly agreed written
              contractual provision.
            </LegalText>
          </LegalSection>

          <LegalSection id="survival" number="48" title="Survival">
            <LegalText>
              Provisions that by their nature should continue after termination
              will survive termination to the extent legally permitted.
            </LegalText>

            <LegalList
              items={[
                "Accrued payment obligations.",
                "Intellectual-property provisions.",
                "Confidentiality obligations where applicable.",
                "Customer-data obligations where applicable.",
                "Warranty disclaimers.",
                "Limitations of liability.",
                "Indemnification obligations.",
                "Dispute-resolution provisions.",
                "Governing-law provisions.",
                "Provisions concerning interpretation and enforcement.",
              ]}
            />
          </LegalSection>

          <LegalSection
            id="updates"
            number="49"
            title="Changes to These Terms"
          >
            <LegalText>
              QuantumFinix may update these Terms to reflect changes in
              Services, law, technology, security practices or business
              operations.
            </LegalText>

            <LegalText>
              Updated Terms may be published with a revised &quot;Last
              updated&quot; date.
            </LegalText>

            <LegalText>
              Where applicable law or an existing contract requires advance
              notice, affirmative acceptance or another procedure for a
              material contractual change, QuantumFinix will follow that
              applicable requirement.
            </LegalText>

            <LegalText>
              QuantumFinix does not rely on this section to retroactively remove
              vested rights where doing so would be prohibited by applicable
              law.
            </LegalText>
          </LegalSection>

          <LegalSection id="contact" number="50" title="Contact QuantumFinix">
            <LegalText>
              Questions concerning these Terms may be directed to QuantumFinix.
            </LegalText>

            <div className="mt-8 overflow-hidden border border-slate-200 bg-white">
              <ContactRow
                label="Organisation"
                value={COMPANY_NAME}
              />

              <ContactRow
                label="Email"
                value={CONTACT_EMAIL}
                href={`mailto:${CONTACT_EMAIL}`}
              />

              <ContactRow
                label="Website"
                value="QuantumFinix"
                href="/"
              />
            </div>

            <div className="mt-10 bg-[#07101f] p-7 text-white sm:p-10 lg:p-12">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">
                Preservation of legal rights
              </p>

              <h3 className="mt-5 max-w-3xl text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                Maximum lawful protection — not unlawful avoidance.
              </h3>

              <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                Nothing in these Terms is intended to exclude, restrict,
                transfer or modify a right, remedy, obligation, guarantee or
                liability where applicable law prohibits such exclusion,
                restriction, transfer or modification.
              </p>

              <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                If a provision conflicts with mandatory applicable law, the
                mandatory law controls only to the extent necessary, and the
                remainder of these Terms should continue to operate to the
                maximum extent legally permissible.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} QuantumFinix. All rights reserved.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link
                  href="/privacy"
                  className="font-semibold transition hover:text-cyan-600"
                >
                  Privacy
                </Link>

                <Link
                  href="/contact"
                  className="font-semibold transition hover:text-cyan-600"
                >
                  Contact
                </Link>
              </div>
            </div>
          </LegalSection>
        </article>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* UI COMPONENTS                                                               */
/* -------------------------------------------------------------------------- */

function HeaderInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white p-5 sm:p-6">
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold text-[#07101f]">
        {value}
      </p>
    </div>
  );
}

function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-slate-200 py-14 first:border-t-0 first:pt-0 sm:py-16 lg:py-20"
    >
      <div className="mb-8 flex items-start gap-4 sm:mb-10 sm:gap-6">
        <span className="mt-2 shrink-0 font-mono text-xs font-bold text-cyan-600">
          {number}
        </span>

        <h2 className="max-w-5xl text-[clamp(2.2rem,5vw,4.7rem)] font-black leading-[0.95] tracking-[-0.055em] text-[#07101f]">
          {title}
        </h2>
      </div>

      <div className="max-w-5xl sm:ml-10">
        {children}
      </div>
    </section>
  );
}

function LegalText({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="mb-6 max-w-4xl text-[15px] leading-8 text-slate-600 sm:text-base sm:leading-8 lg:text-[17px] lg:leading-9">
      {children}
    </p>
  );
}

function LegalList({
  items,
}: {
  items: string[];
}) {
  return (
    <ul className="my-8 grid gap-3">
      {items.map((item, index) => (
        <li
          key={`${index}-${item}`}
          className="grid grid-cols-[32px_1fr] gap-3 border border-slate-200 bg-white p-4 sm:grid-cols-[38px_1fr] sm:p-5"
        >
          <span className="font-mono text-[10px] font-bold text-cyan-600">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="text-sm leading-7 text-slate-600 sm:text-[15px]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function DefinitionGrid({
  items,
}: {
  items: {
    title: string;
    text: string;
  }[];
}) {
  return (
    <div className="my-8 grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="bg-white p-6 sm:p-7"
        >
          <h3 className="text-base font-black tracking-[-0.02em] text-[#07101f]">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

function NoticeBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 border-l-4 border-blue-500 bg-blue-50/70 p-5 sm:p-7">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
        {title}
      </p>

      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
        {children}
      </p>
    </div>
  );
}

function PriorityList({
  items,
}: {
  items: string[];
}) {
  return (
    <div className="my-8 overflow-hidden border border-slate-200 bg-white">
      {items.map((item, index) => (
        <div
          key={item}
          className="grid grid-cols-[54px_1fr] items-center border-b border-slate-100 p-5 last:border-b-0 sm:grid-cols-[70px_1fr]"
        >
          <span className="font-mono text-xs font-bold text-cyan-600">
            {String(index + 1).padStart(2, "0")}
          </span>

          <p className="text-sm font-semibold text-slate-700 sm:text-[15px]">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="grid gap-2 border-b border-slate-100 p-5 last:border-b-0 sm:grid-cols-[180px_1fr] sm:items-center sm:p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>

      {href ? (
        <a
          href={href}
          className="break-all text-sm font-bold text-[#07101f] transition hover:text-cyan-600"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm font-bold text-[#07101f]">
          {value}
        </p>
      )}
    </div>
  );
}