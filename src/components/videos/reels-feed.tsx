"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRecordVideoEngagementMutation } from "@/src/lib/features/videos/video-api";
import type { VideoDto } from "@/src/lib/features/videos/video-types";
import { VideoActions, compactNumber } from "./video-actions";

export function ReelsFeed({ videos, initialSlug }: { videos: VideoDto[]; initialSlug: string }) {
  const initialIndex = Math.max(0, videos.findIndex((item) => item.slug === initialSlug));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [muted, setMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current?.children[initialIndex] as HTMLElement | undefined;
    node?.scrollIntoView({ block: "start" });
  }, [initialIndex]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset.index);
      if (Number.isFinite(index)) setActiveIndex(index);
    }, { root, threshold: [0.65, 0.8] });
    Array.from(root.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [videos.length]);

  return <main className="h-[calc(100dvh-80px)] overflow-hidden bg-[#02040a] text-white">
    <div ref={containerRef} className="h-full snap-y snap-mandatory overflow-y-auto overscroll-contain scroll-smooth">
      {videos.map((video, index) => <Reel key={video.id ?? video._id} video={video} active={index === activeIndex} muted={muted} onToggleMuted={() => setMuted((value) => !value)} index={index} />)}
    </div>
  </main>;
}

function Reel({ video, active, muted, onToggleMuted, index }: { video: VideoDto; active: boolean; muted: boolean; onToggleMuted: () => void; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const viewed = useRef(false);
  const [record] = useRecordVideoEngagementMutation();

  useEffect(() => {
    const media = ref.current;
    if (!media) return;
    if (active && !paused) {
      void media.play().catch(() => undefined);
      if (!viewed.current) { viewed.current = true; void record({ slug: video.slug, event: "view" }); }
      window.history.replaceState(null, "", `/videos/${video.slug}`);
    } else media.pause();
  }, [active, paused, record, video.slug]);

  function togglePlayback() {
    const media = ref.current;
    if (!media) return;
    if (media.paused) { void media.play(); setPaused(false); } else { media.pause(); setPaused(true); }
  }

  return <article data-index={index} className="relative flex h-full snap-start items-center justify-center bg-black">
    <div className="relative h-full w-full max-w-[520px] overflow-hidden bg-black sm:my-4 sm:h-[calc(100%-32px)] sm:rounded-3xl sm:border sm:border-white/10">
      <video ref={ref} src={video.video.url} poster={video.thumbnail?.url} muted={muted} loop playsInline preload={active ? "auto" : "metadata"} onClick={togglePlayback} onEnded={() => void record({ slug: video.slug, event: "watch", watchSeconds: video.durationSeconds ?? 0, completed: true })} aria-label={video.altText || video.title} className="h-full w-full object-contain" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/80" />
      <button type="button" onClick={togglePlayback} className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 backdrop-blur" aria-label={paused ? "Play" : "Pause"}>{paused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}</button>
      <button type="button" onClick={onToggleMuted} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 backdrop-blur" aria-label={muted ? "Unmute" : "Mute"}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
      <div className="absolute bottom-5 left-5 right-20">
        <Link href={`/videos/${video.slug}`} className="text-lg font-black hover:text-cyan-200">{video.title}</Link>
        <p className="mt-2 text-sm font-bold text-cyan-200">@{video.publishedBy || "QuantumFinix"}</p>
        {video.caption || video.description ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-200">{video.caption || video.description}</p> : null}
        <p className="mt-2 text-xs text-white/60">{compactNumber(video.analytics?.views)} views</p>
      </div>
      <div className="absolute bottom-5 right-4"><VideoActions slug={video.slug} initialAnalytics={video.analytics} compact /></div>
    </div>
  </article>;
}
