import type { Metadata } from "next";

import { ContactLeadForm } from "@/src/components/public/contact-lead-form";

export const metadata: Metadata = {
  title: "Book a consultation",
  description: "Request a consultation with the QuantumFinix team.",
};

export default function BookConsultationPage() {
  return (
    <section className="relative overflow-hidden bg-[#020711] px-5 py-20 text-white sm:px-8 lg:py-28">
      <div aria-hidden="true" className="absolute right-[10%] top-0 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-[130px]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Free initial consultation</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Discuss scope, feasibility and next steps.</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-400">
            Send the context first so the conversation can focus on decisions, risks, delivery options and a useful next action.
          </p>
        </div>
        <ContactLeadForm
          defaultPurpose="I would like to book a consultation about "
          submitLabel="Request consultation"
        />
      </div>
    </section>
  );
}
