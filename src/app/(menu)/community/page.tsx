import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community",
  description: "QuantumFinix community updates and participation information.",
};

export default function CommunityPage() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-[#020711] px-5 py-20 text-white">
      <div className="max-w-2xl rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Community</p>
        <h1 className="mt-4 text-4xl font-black">Community programmes are being prepared.</h1>
        <p className="mt-5 text-sm leading-7 text-slate-400">
          Student, developer and collaborator participation details are not published yet. Use the contact page to register your interest.
        </p>
        <Link href="/contact?subject=Community%20interest" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-bold text-slate-950">
          Register interest
        </Link>
      </div>
    </section>
  );
}
