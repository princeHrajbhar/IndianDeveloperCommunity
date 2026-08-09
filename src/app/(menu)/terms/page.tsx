import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "QuantumFinix website terms.",
};

export default function TermsPage() {
  return (
    <article className="bg-[#020711] px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Terms</p>
        <h1 className="mt-4 text-4xl font-black">Website terms</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-400">
          <p>The website content is provided for general information and project discussion. A submitted enquiry does not create a commercial engagement.</p>
          <p>Project scope, pricing, intellectual-property ownership, confidentiality, support and delivery obligations require a separate written agreement.</p>
          <p>Users must provide accurate information, protect their account credentials and avoid unlawful or abusive use of the website.</p>
          <p>This page is a concise placeholder and should be replaced or approved by your legal adviser before commercial launch.</p>
        </div>
      </div>
    </article>
  );
}
