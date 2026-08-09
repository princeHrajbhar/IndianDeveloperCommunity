"use client";

import { useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Eye, Play } from "lucide-react";
import { ReelsFeed } from "@/src/components/videos/reels-feed";
import { VideoActions, compactNumber } from "@/src/components/videos/video-actions";
import { useGetVideoBySlugQuery, useGetVideosQuery, useRecordVideoEngagementMutation } from "@/src/lib/features/videos/video-api";

export default function VideoDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const query = useGetVideoBySlugQuery(slug, { skip: !slug });
  const allVideos = useGetVideosQuery({ page: 1, limit: 100 });
  const item = query.data?.data;
  const [record] = useRecordVideoEngagementMutation();
  const viewed = useRef(false);

  if (query.isLoading) return <main className="min-h-screen bg-[#030712] pt-32 text-center text-slate-500">Loading video…</main>;
  if (!item) return <main className="min-h-screen bg-[#030712] pt-32 text-center text-white"><h1 className="text-3xl font-black">Video unavailable</h1><Link href="/videos" className="mt-5 inline-block text-cyan-300">Browse videos</Link></main>;

  if (item.format === "short") {
    const shorts = (allVideos.data?.data ?? []).filter((video) => video.format === "short");
    const feed = shorts.some((video) => video.slug === item.slug) ? shorts : [item, ...shorts];
    return <ReelsFeed videos={feed} initialSlug={item.slug} />;
  }

  const recommendations = (allVideos.data?.data ?? []).filter((video) => video.format === "long" && video.slug !== item.slug).slice(0, 10);
  return <main className="min-h-screen bg-[#030712] px-4 pb-24 pt-24 text-white sm:px-6">
    <div className="mx-auto grid max-w-[1550px] gap-8 xl:grid-cols-[minmax(0,1fr)_390px]">
      <article className="min-w-0">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"><video src={item.video.url} poster={item.thumbnail?.url} controls playsInline preload="metadata" aria-label={item.altText || item.title} onPlay={() => { if (!viewed.current) { viewed.current = true; void record({ slug: item.slug, event: "view" }); } }} onEnded={() => void record({ slug: item.slug, event: "watch", watchSeconds: item.durationSeconds ?? 0, completed: true })} className="aspect-video h-auto w-full object-contain" /></div>
        <div className="pt-6"><p className="text-xs font-black uppercase tracking-[.18em] text-cyan-300">{item.category || "QuantumFinix video"}</p><h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">{item.title}</h1><div className="mt-4 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-black text-slate-100">{item.publishedBy || "QuantumFinix"}</p><p className="mt-1 flex items-center gap-2 text-sm text-slate-500"><Eye size={15} /> {compactNumber(item.analytics?.views)} views · {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "Recently published"}</p></div><div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-400"><span>{compactNumber(item.analytics?.likes)} likes</span><span>{compactNumber(item.analytics?.comments)} comments</span><span>{compactNumber(item.analytics?.shares)} shares</span></div></div>
          {item.caption ? <p className="mt-5 text-sm italic text-slate-500">{item.caption}</p> : null}
          <div className="mt-6 rounded-3xl border border-white/10 bg-[#07101f] p-6"><p className="whitespace-pre-wrap text-base leading-8 text-slate-300">{item.description || "No description provided."}</p>{item.tags?.length ? <div className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full bg-cyan-300/8 px-3 py-1 text-xs font-semibold text-cyan-200">#{tag}</span>)}</div> : null}</div>
          {item.transcript ? <section className="mt-7 rounded-3xl border border-white/10 bg-[#07101f] p-6"><h2 className="text-xl font-black">Transcript</h2><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-400">{item.transcript}</p></section> : null}
          <div className="mt-7"><VideoActions slug={item.slug} initialAnalytics={item.analytics} /></div>
        </div>
      </article>
      <aside className="self-start xl:sticky xl:top-24"><h2 className="mb-5 text-xl font-black">Up next</h2><div className="space-y-5">{recommendations.map((video) => <Link key={video.id ?? video._id} href={`/videos/${video.slug}`} className="group grid grid-cols-[160px_1fr] gap-3"><div className="relative aspect-video overflow-hidden rounded-xl bg-black">{video.thumbnail?.url ? <img src={video.thumbnail.url} alt={video.altText || video.title} className="h-full w-full object-cover" /> : <video src={video.video.url} muted preload="metadata" className="h-full w-full object-cover" />}<span className="absolute inset-0 grid place-items-center bg-black/20 opacity-0 group-hover:opacity-100"><Play size={20} fill="currentColor" /></span></div><div><h3 className="line-clamp-2 text-sm font-black leading-5 group-hover:text-cyan-200">{video.title}</h3><p className="mt-2 text-xs text-slate-500">{video.publishedBy || "QuantumFinix"}</p><p className="mt-1 text-xs text-slate-600">{compactNumber(video.analytics?.views)} views</p></div></Link>)}</div></aside>
    </div>
  </main>;
}
