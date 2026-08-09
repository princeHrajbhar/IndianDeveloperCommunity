import type { Metadata } from "next";

import { ContactLeadForm } from "@/src/components/public/contact-lead-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact QuantumFinix about AI, automation, software and research projects.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-[#020711] px-5 py-20 text-white sm:px-8 lg:py-28">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Contact QuantumFinix</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Start a practical project conversation.</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-400">
            Share the problem you are solving, the systems involved, and the outcome you need. Your enquiry is saved securely through the public lead endpoint.
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-300">
            <p>AI and intelligent software</p>
            <p>Custom product engineering</p>
            <p>Automation and integrations</p>
            <p>Research and technical validation</p>
          </div>
        </div>
        <ContactLeadForm />
      </div>
    </section>
  );
}
