import Link from "next/link";

export function ContentHero({ eyebrow, title, accent, description }: { eyebrow: string; title: string; accent: string; description: string }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#020711] px-5 py-20 sm:px-8 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.14),transparent_30%),radial-gradient(circle_at_82%_30%,rgba(59,130,246,.12),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">{title} <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">{accent}</span></h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/course" className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-6 py-3 text-sm font-black text-[#020711]">Explore courses</Link><Link href="/blog" className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-bold text-white">Read the blog</Link></div>
      </div>
    </section>
  );
}
