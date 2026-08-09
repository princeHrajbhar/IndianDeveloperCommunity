import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#020711] px-5 text-white">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
          404 · Page not found
        </p>
        <h1 className="mt-4 text-3xl font-black sm:text-4xl">
          This page is not available.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400">
          The address may be outdated or the page may still be under development.
          You can return to the public website or explore the available services.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-bold text-slate-950"
          >
            Return home
          </Link>
          <Link
            href="/services"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 px-6 text-sm font-semibold text-white hover:border-cyan-300/30"
          >
            View services
          </Link>
        </div>
      </section>
    </main>
  );
}
