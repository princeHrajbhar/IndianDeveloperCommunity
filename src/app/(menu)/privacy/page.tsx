import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "QuantumFinix privacy information.",
};

export default function PrivacyPage() {
  return (
    <article className="bg-[#020711] px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Privacy</p>
        <h1 className="mt-4 text-4xl font-black">Privacy information</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-400">
          <p>QuantumFinix uses information submitted through account, profile and enquiry forms to provide the requested service, operate the website and respond to users.</p>
          <p>Authentication cookies are used to maintain secure signed-in sessions. They should be configured as HTTP-only and secure in production.</p>
          <p>Enquiry information may include contact details, project context, referral information and campaign parameters supplied by the browser.</p>
          <p>This page is a concise website notice and should be reviewed with your legal adviser before commercial launch.</p>
        </div>
      </div>
    </article>
  );
}
