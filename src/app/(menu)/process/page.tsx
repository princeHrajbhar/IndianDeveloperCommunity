import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delivery process",
  description: "How QuantumFinix approaches discovery, delivery and improvement.",
};

const stages = [
  ["01", "Discover", "Clarify the problem, users, constraints and measurable outcome."],
  ["02", "Validate", "Test assumptions, technical feasibility and the smallest useful scope."],
  ["03", "Build", "Deliver in visible increments with testing, documentation and review."],
  ["04", "Operate", "Launch carefully, observe real usage and improve based on evidence."],
] as const;

export default function ProcessPage() {
  return (
    <section className="bg-[#020711] px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Delivery process</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">A visible path from uncertainty to working software.</h1>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {stages.map(([number, title, description]) => (
            <article key={number} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <span className="text-xs font-black tracking-[0.2em] text-cyan-300">{number}</span>
              <h2 className="mt-3 text-2xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
            </article>
          ))}
        </div>
        <Link href="/book-consultation" className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-bold text-slate-950">
          Discuss your project
        </Link>
      </div>
    </section>
  );
}
