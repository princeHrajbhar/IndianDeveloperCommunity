import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | QuantumFinix",
  description:
    "Learn how QuantumFinix collects, uses, stores, protects and handles personal information across its websites, software, AI, automation and growth services.",
};

const LAST_UPDATED = "16 August 2026";

const navigation = [
  { id: "scope", label: "Scope & Roles" },
  { id: "definitions", label: "Definitions" },
  { id: "collection", label: "Information We Collect" },
  { id: "sources", label: "Sources of Information" },
  { id: "use", label: "How We Use Information" },
  { id: "legal-bases", label: "Legal Bases" },
  { id: "customer-data", label: "Customer Data" },
  { id: "responsibilities", label: "User Responsibilities" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "ai", label: "AI & Automation" },
  { id: "sharing", label: "Sharing & Disclosure" },
  { id: "transfers", label: "International Transfers" },
  { id: "retention", label: "Retention" },
  { id: "security", label: "Security" },
  { id: "breach", label: "Data Breaches" },
  { id: "rights", label: "Your Rights" },
  { id: "regional", label: "Regional Rights" },
  { id: "children", label: "Children" },
  { id: "third-party", label: "Third Parties" },
  { id: "requests", label: "Privacy Requests" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] text-[#0b1220]">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-400/[0.08] blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="absolute -left-40 top-1/2 h-96 w-96 rounded-full bg-blue-500/[0.06] blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.22] [mask-image:linear-gradient(to_bottom,black,transparent)]"
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
              Privacy / Data Protection / Global Notice
            </span>
          </div>

          <h1 className="mt-8 max-w-6xl text-[clamp(3.8rem,11vw,9.5rem)] font-black uppercase leading-[0.82] tracking-[-0.07em] text-[#07101f]">
            Privacy
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Policy.
            </span>
          </h1>

          <p className="mt-10 max-w-4xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9 lg:text-2xl lg:leading-10">
            This Privacy Policy explains how QuantumFinix handles personal
            information when you visit our websites, contact us, purchase or
            use software, engage us for custom development, use AI or
            automation solutions, or work with us for digital growth services.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-3">
            <HeaderInfo
              label="Last updated"
              value={LAST_UPDATED}
            />

            <HeaderInfo
              label="Privacy contact"
              value="hello@quantumfinix.com"
            />

            <HeaderInfo
              label="Applies to"
              value="Web • Software • AI • Growth"
            />
          </div>
        </div>
      </header>

      {/* MAIN POLICY */}
      <div className="mx-auto grid w-full max-w-[1500px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16 lg:px-12 lg:py-24 xl:grid-cols-[280px_minmax(0,1fr)] xl:px-16">
        {/* SIDE NAVIGATION */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
              On this page
            </p>

            <nav className="border-l border-slate-200">
              {navigation.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-3 border-l-2 border-transparent py-2.5 pl-4 text-xs font-medium text-slate-500 transition hover:border-cyan-500 hover:text-[#07101f]"
                >
                  <span className="font-mono text-[9px] text-slate-300 group-hover:text-cyan-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 border border-slate-200 bg-white p-5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-700">
                Questions?
              </p>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Contact us regarding privacy, data access, deletion,
                correction or other data protection concerns.
              </p>

              <a
                href="mailto:hello@quantumfinix.com"
                className="mt-4 inline-flex text-xs font-bold text-[#07101f] transition hover:text-cyan-600"
              >
                Contact privacy team →
              </a>
            </div>
          </div>
        </aside>

        <article className="min-w-0">
          {/* IMPORTANT NOTICE */}
          <div className="mb-16 border-l-4 border-cyan-500 bg-white p-6 shadow-[0_16px_60px_rgba(15,23,42,0.05)] sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-700">
              Important
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              This Policy applies subject to applicable law. Nothing in this
              Policy is intended to remove, restrict or waive a privacy,
              consumer or data protection right that cannot legally be
              excluded or waived.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Certain QuantumFinix products, customer agreements, Data
              Processing Agreements, service-specific notices or contractual
              terms may contain additional privacy provisions. Where required
              by law, those additional provisions will apply together with
              this Policy.
            </p>
          </div>

          <PolicySection
            id="scope"
            number="01"
            title="Scope & Our Role"
          >
            <PolicyText>
              This Privacy Policy applies to QuantumFinix websites,
              applications, software products, online platforms, consultation
              services, custom software development, AI solutions,
              integrations, automation systems, research and development
              activities, digital growth services and other services that
              reference this Policy.
            </PolicyText>

            <PolicyText>
              Depending on the circumstances, QuantumFinix may process
              personal information as an independent business, controller,
              data fiduciary, service provider, processor, contractor or
              similar role defined by applicable privacy law.
            </PolicyText>

            <PolicyText>
              Where QuantumFinix processes personal information solely on
              behalf of a business customer and under that customer&apos;s
              documented instructions, that customer may determine the
              purposes and means of processing. In those circumstances, the
              customer&apos;s privacy notice and our agreement with that
              customer may govern the processing.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="definitions"
            number="02"
            title="Key Definitions"
          >
            <PolicyText>
              Different privacy laws use different terminology. For simplicity,
              this Policy uses the following general terms.
            </PolicyText>

            <DefinitionGrid
              items={[
                {
                  title: "Personal Information",
                  text: "Information relating to an identified or reasonably identifiable individual, including information defined as personal data, personal information or equivalent terminology under applicable law.",
                },
                {
                  title: "Sensitive Information",
                  text: "Information receiving heightened legal protection, which may include health information, biometric information, government identifiers, precise geolocation, financial credentials, racial or ethnic origin, political or religious beliefs, sexual orientation and similar protected categories.",
                },
                {
                  title: "Processing",
                  text: "Any operation performed on personal information, including collecting, recording, organising, storing, using, analysing, sharing, transmitting, modifying, retrieving or deleting it.",
                },
                {
                  title: "Customer Data",
                  text: "Information, files, content, records, instructions or datasets submitted to a QuantumFinix service by or on behalf of a customer.",
                },
              ]}
            />
          </PolicySection>

          <PolicySection
            id="collection"
            number="03"
            title="Information We May Collect"
          >
            <PolicyText>
              The information we collect depends on your relationship with
              QuantumFinix, the service you use and the choices you make.
            </PolicyText>

            <PolicyList
              items={[
                "Identity information such as name, username, job title, company or organisation.",
                "Contact information such as email address, business email address, telephone number, billing address or business address.",
                "Account information including account identifiers, profile information, authentication status and account preferences.",
                "Business information such as company size, industry, project requirements, software requirements, operational challenges and technology environment.",
                "Enquiry and communication information including messages, support requests, meeting notes, feedback and correspondence.",
                "Transaction and commercial information concerning requested services, subscriptions, proposals, invoices, purchases and contractual relationships.",
                "Technical information including IP address, device type, operating system, browser, language, time zone, approximate location, session information and diagnostic information.",
                "Usage information concerning pages viewed, features used, interactions, navigation paths, timestamps, error logs and service activity.",
                "Referral and marketing information including referral URLs, campaign identifiers, UTM parameters and marketing attribution data.",
                "Customer Data submitted to software, custom applications, integrations or automation systems.",
                "Information supplied during recruitment, employment or contractor applications where applicable.",
                "Information submitted voluntarily through questionnaires, forms, surveys, demonstrations, consultations or project discovery processes.",
              ]}
            />

            <NoticeBox title="Sensitive information">
              Unless a specific QuantumFinix service expressly requires it and
              appropriate contractual and security arrangements have been
              agreed, you should not submit highly sensitive personal
              information, passwords, private cryptographic keys, authentication
              secrets, complete payment-card information, government secrets or
              unlawful material through general website forms.
            </NoticeBox>
          </PolicySection>

          <PolicySection
            id="sources"
            number="04"
            title="Where Information Comes From"
          >
            <PolicyText>
              We may receive information from several sources.
            </PolicyText>

            <PolicyList
              items={[
                "Directly from you when you contact us, create an account, submit a form, request a consultation or use a service.",
                "From your employer, organisation, administrator or authorised team member.",
                "Automatically from browsers, devices, applications, servers, cookies and similar technologies.",
                "From integrations and third-party services that you authorise to connect to a QuantumFinix service.",
                "From business partners, service providers, referral partners and professional advisers.",
                "From publicly available professional or business sources where collection and use are lawful.",
                "From customers who instruct us to process Customer Data on their behalf.",
              ]}
            />
          </PolicySection>

          <PolicySection
            id="use"
            number="05"
            title="How We Use Information"
          >
            <PolicyText>
              Subject to applicable law, we may process information for the
              following business and operational purposes.
            </PolicyText>

            <PolicyList
              items={[
                "Providing, operating, maintaining and supporting our websites, software and services.",
                "Creating and administering user accounts.",
                "Responding to enquiries, consultation requests and support requests.",
                "Designing, developing, testing and maintaining custom software.",
                "Configuring software, AI systems, integrations and automation workflows.",
                "Performing requested transactions and fulfilling contractual obligations.",
                "Providing customer support and service communications.",
                "Monitoring reliability, performance, uptime and technical health.",
                "Detecting, investigating and preventing fraud, abuse, malicious activity, security incidents and unauthorised access.",
                "Protecting QuantumFinix, customers, users and third parties.",
                "Conducting internal analytics, forecasting and service improvement.",
                "Improving usability, functionality, performance and accessibility.",
                "Understanding business demand and service effectiveness.",
                "Personalising services where lawful and appropriate.",
                "Managing billing, accounting, taxation, auditing and business records.",
                "Complying with legal, regulatory, contractual and law-enforcement obligations.",
                "Establishing, exercising or defending legal claims.",
                "Enforcing agreements, acceptable-use requirements and security policies.",
                "Sending marketing communications where permitted by law.",
                "Conducting research and development using lawful and appropriately protected information.",
              ]}
            />
          </PolicySection>

          <PolicySection
            id="legal-bases"
            number="06"
            title="Legal Bases for Processing"
          >
            <PolicyText>
              Where applicable law requires a legal basis for processing, our
              basis may depend on the context.
            </PolicyText>

            <DefinitionGrid
              items={[
                {
                  title: "Contract",
                  text: "Processing may be necessary to enter into or perform a contract with you or provide a service you request.",
                },
                {
                  title: "Legitimate Interests",
                  text: "We may process information for legitimate business interests where those interests are not overridden by rights requiring protection.",
                },
                {
                  title: "Consent",
                  text: "We may rely on valid consent where consent is required or otherwise appropriate. Where legally available, consent may be withdrawn.",
                },
                {
                  title: "Legal Obligation",
                  text: "Processing may be necessary to satisfy laws, court orders, regulatory requirements, taxation obligations or similar legal duties.",
                },
                {
                  title: "Vital / Public Interests",
                  text: "In limited circumstances, processing may be permitted or required to protect vital interests or satisfy another basis recognised by applicable law.",
                },
                {
                  title: "Other Lawful Bases",
                  text: "Additional legal bases may apply where recognised by the privacy law governing a particular processing activity.",
                },
              ]}
            />
          </PolicySection>

          <PolicySection
            id="customer-data"
            number="07"
            title="Customer-Controlled Data"
          >
            <PolicyText>
              QuantumFinix may develop or operate software that allows
              customers to upload, store, analyse, transmit or otherwise
              process information concerning their own employees, users,
              clients, leads, customers or other individuals.
            </PolicyText>

            <PolicyText>
              When we process such Customer Data solely on behalf of a
              customer, we generally process that information according to the
              customer&apos;s instructions, the applicable service agreement
              and, where relevant, a Data Processing Agreement.
            </PolicyText>

            <PolicyText>
              The customer is responsible for determining whether it has the
              legal authority to collect and instruct us to process Customer
              Data, except to the extent applicable law expressly places the
              relevant responsibility on QuantumFinix.
            </PolicyText>

            <NoticeBox title="Requests concerning customer-controlled data">
              If your information was submitted to a QuantumFinix-powered
              system by one of our customers, we may direct your privacy
              request to that customer where the customer is legally
              responsible for responding.
            </NoticeBox>
          </PolicySection>

          <PolicySection
            id="responsibilities"
            number="08"
            title="Your Responsibilities"
          >
            <PolicyText>
              When you provide information to QuantumFinix or use our
              services, you are responsible for your own conduct to the extent
              permitted by applicable law.
            </PolicyText>

            <PolicyList
              items={[
                "Provide information that is accurate and not knowingly false, fraudulent or misleading.",
                "Only provide personal information that you are legally authorised to provide.",
                "Obtain notices, permissions, consents and other legal authority required for information you upload or instruct us to process.",
                "Do not submit another person's confidential, personal or sensitive information unlawfully.",
                "Do not submit stolen credentials, access tokens, private keys, passwords or information obtained through unauthorised access.",
                "Protect your account credentials, API keys, administrator accounts and connected systems.",
                "Use reasonable security measures on devices and networks you use to access QuantumFinix services.",
                "Immediately notify us if you reasonably believe your account or integration has been compromised.",
                "Review permissions before connecting third-party integrations.",
                "Ensure that your instructions to QuantumFinix are lawful.",
                "Comply with privacy, employment, marketing, intellectual-property, cybersecurity and other laws applicable to your own activities.",
                "Avoid using our services to facilitate fraud, harassment, unlawful surveillance, unauthorised profiling, discrimination or other illegal activity.",
                "Do not attempt to bypass security controls, authentication systems, rate limits or access restrictions.",
                "Do not access data, accounts, systems or networks without lawful authorisation.",
              ]}
            />

            <PolicyText>
              A customer&apos;s failure to satisfy its own legal obligations
              does not automatically transfer those obligations to
              QuantumFinix where the law or applicable contract places the
              responsibility on the customer.
            </PolicyText>

            <PolicyText>
              Nothing in this section excludes responsibility that applicable
              law expressly requires QuantumFinix to retain.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="cookies"
            number="09"
            title="Cookies, Devices & Tracking"
          >
            <PolicyText>
              QuantumFinix websites and services may use cookies, local
              storage, pixels, SDKs, session technologies and similar
              mechanisms where appropriate.
            </PolicyText>

            <PolicyList
              items={[
                "Strictly necessary technologies used for security, authentication, routing, account functionality and core service operation.",
                "Preference technologies used to remember settings and user choices.",
                "Analytics technologies used to understand service performance and website activity.",
                "Performance technologies used to identify errors, latency and reliability problems.",
                "Marketing or advertising technologies, where enabled and legally permitted.",
              ]}
            />

            <PolicyText>
              Where applicable law requires consent before placing
              non-essential technologies, we intend to request the applicable
              choice before using those technologies.
            </PolicyText>

            <PolicyText>
              You may also be able to control cookies using browser settings,
              device controls or a consent interface made available on the
              relevant QuantumFinix service.
            </PolicyText>

            <PolicyText>
              Where applicable law requires recognition of legally valid
              browser-based opt-out preference signals, we may process those
              signals in accordance with applicable requirements.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="ai"
            number="10"
            title="Artificial Intelligence & Automation"
          >
            <PolicyText>
              Some QuantumFinix products or projects may include artificial
              intelligence, machine learning, automated workflows, language
              models, recommendation systems, analytics or other automated
              technologies.
            </PolicyText>

            <PolicyText>
              Depending on the service, information submitted to an
              AI-enabled feature may be transmitted to systems operated by
              QuantumFinix or an authorised technology provider for the
              purpose of generating the requested output or operating the
              relevant feature.
            </PolicyText>

            <PolicyList
              items={[
                "We may use automated systems to assist with software functionality, analysis, classification, support or workflow execution.",
                "AI-generated outputs may be probabilistic, incomplete or inaccurate and should be independently reviewed where important decisions are involved.",
                "Customers must not knowingly submit information to AI features when they lack authority to process that information.",
                "Customers should avoid entering highly sensitive information into general-purpose AI functionality unless the applicable service expressly supports that use.",
                "Where applicable law grants rights concerning solely automated decisions producing legal or similarly significant effects, those rights remain available.",
              ]}
            />
          </PolicySection>

          <PolicySection
            id="sharing"
            number="11"
            title="When Information May Be Shared"
          >
            <PolicyText>
              We do not disclose personal information arbitrarily. Subject to
              applicable law, information may be disclosed to recipients
              reasonably necessary for the purposes described in this Policy.
            </PolicyText>

            <PolicyList
              items={[
                "Cloud infrastructure and hosting providers.",
                "Authentication and identity providers.",
                "Database, storage, monitoring and security providers.",
                "Email, communication and customer-support providers.",
                "Payment, billing and accounting providers where applicable.",
                "Analytics and performance providers.",
                "AI and technology providers used to provide requested functionality.",
                "Professional advisers such as accountants, auditors, insurers and lawyers.",
                "Contractors and personnel authorised to perform services for QuantumFinix.",
                "Business partners where necessary for a service you request.",
                "Government authorities, regulators, courts or law enforcement where disclosure is legally required or otherwise legally permitted.",
                "A buyer, investor, successor or relevant adviser in connection with a merger, financing, restructuring, acquisition, insolvency or sale of all or part of the business, subject to appropriate safeguards.",
              ]}
            />

            <PolicyText>
              Service providers receiving personal information are expected to
              process information for authorised purposes and subject to
              applicable contractual and legal obligations.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="transfers"
            number="12"
            title="International Data Transfers"
          >
            <PolicyText>
              QuantumFinix may work with customers, infrastructure providers,
              technology providers, personnel and service providers located
              in different countries.
            </PolicyText>

            <PolicyText>
              As a result, information may be processed in a country other
              than the country where it was originally collected.
            </PolicyText>

            <PolicyText>
              Where applicable privacy law restricts international transfers,
              we intend to use an available lawful transfer mechanism,
              contractual safeguard, adequacy mechanism, certification,
              consent mechanism, statutory exemption or other permitted
              transfer basis as applicable.
            </PolicyText>

            <PolicyText>
              Laws and protections applicable in a destination country may
              differ from those in your home jurisdiction.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="retention"
            number="13"
            title="Data Retention"
          >
            <PolicyText>
              QuantumFinix generally retains personal information only for as
              long as reasonably necessary for the purpose for which it was
              collected, subject to legitimate operational, contractual,
              security and legal requirements.
            </PolicyText>

            <PolicyText>
              Factors affecting retention may include:
            </PolicyText>

            <PolicyList
              items={[
                "The duration of our relationship with you or your organisation.",
                "The type, volume and sensitivity of information.",
                "The purposes for which information was collected.",
                "Legal, accounting, tax and regulatory retention requirements.",
                "Security, fraud-prevention and incident-investigation requirements.",
                "The establishment, exercise or defence of legal claims.",
                "Applicable contractual obligations.",
                "Backup and disaster-recovery cycles.",
              ]}
            />

            <PolicyText>
              When information is no longer reasonably required, we may delete
              it, anonymise it, aggregate it or otherwise dispose of it in
              accordance with applicable requirements.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="security"
            number="14"
            title="Security"
          >
            <PolicyText>
              QuantumFinix seeks to use technical and organisational
              safeguards appropriate to the nature of the information,
              applicable risks and services involved.
            </PolicyText>

            <PolicyList
              items={[
                "Access controls and authentication mechanisms.",
                "Role-based or need-to-know access where appropriate.",
                "Secure communications and encryption where appropriate.",
                "Infrastructure monitoring and logging.",
                "Backup and recovery controls.",
                "Software maintenance and vulnerability management.",
                "Security review and incident-response processes.",
                "Provider and vendor security considerations.",
                "Administrative controls and confidentiality obligations.",
              ]}
            />

            <NoticeBox title="No system is completely risk-free">
              No internet transmission, cloud environment, application,
              network, storage mechanism or security control can guarantee
              absolute security. Users should maintain appropriate security
              measures for their own devices, accounts, networks, credentials
              and integrations.
            </NoticeBox>
          </PolicySection>

          <PolicySection
            id="breach"
            number="15"
            title="Security Incidents & Data Breaches"
          >
            <PolicyText>
              If we identify a suspected security incident involving personal
              information, we may investigate, contain, remediate and document
              the incident as appropriate.
            </PolicyText>

            <PolicyText>
              Where applicable law requires notification to affected
              individuals, customers, data protection authorities or other
              regulators, we intend to provide notifications in accordance
              with applicable legal requirements.
            </PolicyText>

            <PolicyText>
              Customers are responsible for promptly notifying QuantumFinix
              about suspected compromise of customer-controlled credentials,
              integrations or systems where prompt notification is necessary
              for us to investigate or mitigate the incident.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="rights"
            number="16"
            title="Your Privacy Rights"
          >
            <PolicyText>
              Depending on your location, the nature of the processing and the
              law that applies, you may have one or more privacy rights.
            </PolicyText>

            <PolicyList
              items={[
                "Request information about whether and how your personal information is processed.",
                "Request access to eligible personal information.",
                "Request correction of inaccurate personal information.",
                "Request completion or updating of certain information.",
                "Request deletion or erasure where legally available.",
                "Request restriction of certain processing.",
                "Object to certain processing.",
                "Withdraw consent where processing relies on consent.",
                "Request a portable copy of eligible information.",
                "Opt out of certain targeted advertising, sale, sharing or profiling where the applicable law provides that right.",
                "Request limitation of certain uses of sensitive personal information where applicable.",
                "Request review of certain automated decisions where applicable.",
                "Submit a complaint to an appropriate supervisory or regulatory authority.",
                "Exercise applicable rights without unlawful discrimination or retaliation.",
              ]}
            />

            <PolicyText>
              Privacy rights are not absolute. Applicable law may allow or
              require us to deny or limit a request in certain circumstances,
              including where information must be retained for legal,
              security, contractual or other recognised purposes.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="regional"
            number="17"
            title="Regional & International Privacy Rights"
          >
            <PolicyText>
              Privacy law differs by jurisdiction. The following provisions
              apply only to the extent the relevant law applies to
              QuantumFinix and the processing concerned.
            </PolicyText>

            <RegionalCard title="European Economic Area">
              Where the EU General Data Protection Regulation applies, eligible
              individuals may have rights including access, rectification,
              erasure, restriction, portability, objection, withdrawal of
              consent and rights concerning certain automated decision-making.
              Individuals may also have the right to complain to a competent
              supervisory authority.
            </RegionalCard>

            <RegionalCard title="United Kingdom">
              Where UK data protection law applies, individuals may exercise
              rights available under the UK GDPR and applicable UK data
              protection legislation, subject to statutory conditions,
              exemptions and limitations.
            </RegionalCard>

            <RegionalCard title="California & Applicable U.S. State Laws">
              Where applicable U.S. state privacy legislation applies,
              residents may have rights concerning access, correction,
              deletion, portability, sensitive information, targeted
              advertising, certain profiling and the sale or sharing of
              personal information. Certain states may also provide an appeal
              process where a privacy request is denied.
            </RegionalCard>

            <RegionalCard title="India">
              Where India&apos;s Digital Personal Data Protection framework
              applies, eligible Data Principals may exercise rights available
              under applicable provisions of the Digital Personal Data
              Protection Act, 2023 and rules or notifications brought into
              force under it, including applicable access, correction,
              updating, erasure, grievance and nomination-related rights.
            </RegionalCard>

            <RegionalCard title="Brazil">
              Where Brazil&apos;s Lei Geral de Proteção de Dados Pessoais
              applies, eligible data subjects may exercise applicable rights
              concerning confirmation of processing, access, correction,
              anonymisation, blocking, deletion, portability, information
              concerning sharing and consent-related rights, subject to law.
            </RegionalCard>

            <RegionalCard title="Canada">
              Where Canadian private-sector privacy legislation applies,
              individuals may have rights to understand how information is
              handled, request access, request correction and challenge
              compliance, subject to applicable federal or provincial law.
            </RegionalCard>

            <RegionalCard title="Australia">
              Where Australia&apos;s Privacy Act and Australian Privacy
              Principles apply, eligible individuals may have rights
              concerning access, correction, complaints and transparent
              handling of personal information.
            </RegionalCard>

            <RegionalCard title="Singapore">
              Where Singapore&apos;s Personal Data Protection Act applies,
              individuals may have applicable rights concerning access,
              correction, consent and other protections provided under the
              PDPA.
            </RegionalCard>

            <RegionalCard title="Other Countries & Regions">
              If privacy legislation in another jurisdiction applies to our
              processing, QuantumFinix intends to recognise mandatory rights
              and obligations imposed by that applicable legislation. A
              service-specific, regional or supplemental notice may be
              provided where appropriate or legally required.
            </RegionalCard>

            <NoticeBox title="Jurisdictional limitations">
              Publication of this Policy does not mean QuantumFinix is
              established in, actively targeting, licensed in, or legally
              subject to every jurisdiction worldwide. Applicability is
              determined by the relevant law and factual circumstances.
            </NoticeBox>
          </PolicySection>

          <PolicySection
            id="children"
            number="18"
            title="Children & Young People"
          >
            <PolicyText>
              QuantumFinix&apos;s general business, software-development and
              professional services are primarily intended for businesses and
              professional users rather than children.
            </PolicyText>

            <PolicyText>
              We do not intend to knowingly collect personal information from
              children through general business enquiry forms where the
              collection would be unlawful.
            </PolicyText>

            <PolicyText>
              If a specific product is designed for or expected to involve
              children or young people, additional notices, age-assurance
              measures, parental or guardian permissions and other safeguards
              may apply where required.
            </PolicyText>

            <PolicyText>
              If you believe a child has provided information to QuantumFinix
              in circumstances where that processing is not permitted, please
              contact us.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="third-party"
            number="19"
            title="Third-Party Websites & Services"
          >
            <PolicyText>
              QuantumFinix websites or software may contain links to,
              integrations with, or functionality provided by third-party
              websites, APIs, platforms or services.
            </PolicyText>

            <PolicyText>
              When you independently interact with a third party, that
              provider&apos;s terms, security practices and privacy policy may
              govern its processing.
            </PolicyText>

            <PolicyText>
              QuantumFinix is not responsible for the independent privacy
              practices of third parties that we do not control, except to the
              extent applicable law expressly provides otherwise.
            </PolicyText>

            <PolicyText>
              You should review third-party privacy information before
              providing personal information to an external service.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="requests"
            number="20"
            title="Submitting a Privacy Request"
          >
            <PolicyText>
              You may contact us to submit an applicable privacy request.
            </PolicyText>

            <div className="my-8 border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Privacy contact
              </p>

              <a
                href="mailto:hello@quantumfinix.com"
                className="mt-4 block break-all text-2xl font-black tracking-[-0.04em] text-[#07101f] transition hover:text-cyan-600 sm:text-3xl"
              >
                hello@quantumfinix.com
              </a>
            </div>

            <PolicyText>
              To protect information from unauthorised disclosure, we may take
              reasonable steps to verify the identity or authority of a person
              making a request.
            </PolicyText>

            <PolicyText>
              Verification requirements may vary depending on the sensitivity
              of the information, the nature of the request, the account
              involved and applicable law.
            </PolicyText>

            <PolicyText>
              You may be permitted to use an authorised agent where applicable
              law provides that right. We may request evidence of the
              agent&apos;s authority where legally permitted.
            </PolicyText>

            <PolicyText>
              We may retain records concerning privacy requests where
              necessary to demonstrate compliance, prevent fraud or satisfy
              legal obligations.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="changes"
            number="21"
            title="Changes to This Policy"
          >
            <PolicyText>
              QuantumFinix may update this Privacy Policy as services,
              technology, business practices, regulatory requirements or laws
              change.
            </PolicyText>

            <PolicyText>
              When we publish an updated version, we may update the
              &quot;Last updated&quot; date shown on this page.
            </PolicyText>

            <PolicyText>
              Where applicable law requires additional notice, consent or
              another action before a material change takes effect, we intend
              to take the action required by that law.
            </PolicyText>

            <PolicyText>
              Previous versions may be retained where reasonably necessary for
              legal, compliance or record-keeping purposes.
            </PolicyText>
          </PolicySection>

          <PolicySection
            id="contact"
            number="22"
            title="Contact QuantumFinix"
          >
            <PolicyText>
              Questions, complaints or requests concerning this Privacy Policy
              or our handling of personal information may be directed to:
            </PolicyText>

            <div className="mt-8 overflow-hidden border border-slate-200 bg-white">
              <ContactRow
                label="Organisation"
                value="QuantumFinix"
              />

              <ContactRow
                label="Email"
                value="hello@quantumfinix.com"
                href="mailto:hello@quantumfinix.com"
              />

              <ContactRow
                label="Website"
                value="QuantumFinix"
                href="/"
              />
            </div>

            <div className="mt-8 bg-[#07101f] p-7 text-white sm:p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">
                Final legal statement
              </p>

              <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                Nothing in this Privacy Policy is intended to exclude,
                restrict or modify any right, remedy, guarantee, obligation or
                liability that applicable law prohibits the parties from
                excluding, restricting or modifying.
              </p>

              <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                Where a provision of this Policy conflicts with mandatory
                applicable privacy law, the mandatory legal requirement will
                control to the extent of that conflict.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} QuantumFinix. All rights reserved.
              </p>

              <div className="flex gap-5">
                <Link
                  href="/terms"
                  className="font-semibold transition hover:text-cyan-600"
                >
                  Terms
                </Link>

                <Link
                  href="/contact"
                  className="font-semibold transition hover:text-cyan-600"
                >
                  Contact
                </Link>
              </div>
            </div>
          </PolicySection>
        </article>
      </div>
    </main>
  );
}

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

function PolicySection({
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

        <h2 className="max-w-4xl text-[clamp(2.2rem,5vw,4.7rem)] font-black leading-[0.95] tracking-[-0.055em] text-[#07101f]">
          {title}
        </h2>
      </div>

      <div className="ml-0 max-w-5xl sm:ml-10">
        {children}
      </div>
    </section>
  );
}

function PolicyText({
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

function PolicyList({
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

function RegionalCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="group my-3 border border-slate-200 bg-white p-6 transition hover:border-cyan-300 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="mt-1.5 h-2 w-2 shrink-0 bg-cyan-500 transition group-hover:scale-125" />

        <div>
          <h3 className="text-lg font-black tracking-[-0.025em] text-[#07101f] sm:text-xl">
            {title}
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-[15px]">
            {children}
          </p>
        </div>
      </div>
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