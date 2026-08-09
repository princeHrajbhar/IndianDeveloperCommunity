"use client";

import Link from "next/link";
import { Clock3, Eye, Play, Sparkles } from "lucide-react";
import { useGetVideosQuery } from "@/src/lib/features/videos/video-api";
import { compactNumber } from "@/src/components/videos/video-actions";

export default function VideosPage() {
  const query = useGetVideosQuery({ page: 1, limit: 100 });
  const items = query.data?.data ?? [];
  const longVideos = items.filter((video) => video.format === "long");
  const shorts = items.filter((video) => video.format === "short");

  return <main className="min-h-screen bg-[#030712] px-4 pb-24 pt-28 text-white sm:px-6">
    <div className="mx-auto max-w-[1500px]">
      <header className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.13),transparent_38%),#07101f] px-6 py-10 sm:px-10 sm:py-14">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-cyan-300"><Sparkles size={16} /> QuantumFinix media</p>
        <h1 className="mt-4 text-4xl font-black sm:text-6xl">Videos built for builders.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">Deep technical explainers, product walkthroughs and fast vertical updates from the QuantumFinix team.</p>
      </header>

      {query.isLoading ? <p className="mt-12 text-slate-500">Loading videos…</p> : null}

      {shorts.length ? <section className="mt-12">
        <div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-cyan-300">Swipeable updates</p><h2 className="mt-2 text-3xl font-black">Shorts</h2></div><span className="text-sm text-slate-500">{shorts.length} videos</span></div>
        <div className="flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{shorts.map((video) => <Link key={video.id ?? video._id} href={`/videos/${video.slug}`} className="group relative aspect-[9/16] w-[210px] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-black sm:w-[250px]">{video.thumbnail?.url ? <img src={video.thumbnail.url} alt={video.altText || video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <video src={video.video.url} muted preload="metadata" className="h-full w-full object-cover" />}<div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/90" /><span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-slate-950"><Play size={18} fill="currentColor" /></span><div className="absolute inset-x-4 bottom-4"><h3 className="line-clamp-2 text-lg font-black">{video.title}</h3><p className="mt-2 text-xs text-white/65">{compactNumber(video.analytics?.views)} views · @{video.publishedBy || "QuantumFinix"}</p></div></Link>)}</div>
      </section> : null}

      <section className="mt-12">
        <div className="mb-5"><p className="text-xs font-black uppercase tracking-[.18em] text-cyan-300">In-depth learning</p><h2 className="mt-2 text-3xl font-black">Latest videos</h2></div>
        {longVideos.length ? <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{longVideos.map((video) => <Link key={video.id ?? video._id} href={`/videos/${video.slug}`} className="group"><div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">{video.thumbnail?.url ? <img src={video.thumbnail.url} alt={video.altText || video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <video src={video.video.url} muted preload="metadata" className="h-full w-full object-cover" />}<span className="absolute inset-0 grid place-items-center bg-black/10 opacity-0 transition group-hover:opacity-100"><span className="grid h-14 w-14 place-items-center rounded-full bg-cyan-300 text-slate-950"><Play fill="currentColor" /></span></span>{video.durationSeconds ? <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-xs font-bold">{formatDuration(video.durationSeconds)}</span> : null}</div><div className="pt-4"><p className="text-xs font-bold uppercase tracking-wider text-cyan-300">{video.category || "QuantumFinix"}</p><h3 className="mt-2 line-clamp-2 text-xl font-black leading-7 group-hover:text-cyan-200">{video.title}</h3><p className="mt-2 text-sm text-slate-500">{video.publishedBy || "QuantumFinix"}</p><div className="mt-2 flex items-center gap-3 text-xs text-slate-600"><span className="flex items-center gap-1"><Eye size={13} />{compactNumber(video.analytics?.views)}</span><span className="flex items-center gap-1"><Clock3 size={13} />{video.publishedAt ? new Date(video.publishedAt).toLocaleDateString() : "New"}</span></div></div></Link>)}</div> : !query.isLoading ? <div className="rounded-3xl border border-white/10 bg-[#07101f] p-12 text-center text-slate-500">No long-form videos are published yet.</div> : null}
      </section>
    </div>
  </main>;
}

function formatDuration(value: number) { const hours = Math.floor(value / 3600); const minutes = Math.floor((value % 3600) / 60); const seconds = Math.floor(value % 60); return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` : `${minutes}:${String(seconds).padStart(2, "0")}`; }
