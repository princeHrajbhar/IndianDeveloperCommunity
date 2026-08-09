"use client";

import { useState, type FormEvent } from "react";
import { Heart, LogIn, MessageCircle, Send, Share2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useAddVideoCommentMutation, useDeleteVideoCommentMutation, useGetVideoCommentsQuery, useGetVideoInteractionQuery, useLikeVideoMutation, useRecordVideoEngagementMutation, useUnlikeVideoMutation } from "@/src/lib/features/videos/video-api";
import type { VideoAnalytics } from "@/src/lib/features/videos/video-types";

export function VideoActions({ slug, initialAnalytics, compact = false }: { slug: string; initialAnalytics: VideoAnalytics; compact?: boolean }) {
  const session = useGetMeQuery();
  const authenticated = Boolean(session.data?.data);
  const interaction = useGetVideoInteractionQuery(slug, { skip: !authenticated });
  const comments = useGetVideoCommentsQuery({ slug, page: 1, limit: 50 }, { skip: compact });
  const [like] = useLikeVideoMutation();
  const [unlike] = useUnlikeVideoMutation();
  const [record] = useRecordVideoEngagementMutation();
  const [addComment, addState] = useAddVideoCommentMutation();
  const [deleteComment] = useDeleteVideoCommentMutation();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const analytics = interaction.data?.data.analytics ?? initialAnalytics;
  const liked = interaction.data?.data.liked ?? false;

  async function toggleLike() {
    setError("");
    try { if (liked) await unlike(slug).unwrap(); else await like(slug).unwrap(); }
    catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: document.title, url });
      else { await navigator.clipboard.writeText(url); setMessage("Link copied"); }
      await record({ slug, event: "share" }).unwrap();
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === "AbortError") return;
      setError("Unable to share this video.");
    }
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const content = String(data.get("content") || "").trim();
    if (!content) return;
    try { await addComment({ slug, content }).unwrap(); form.reset(); }
    catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  return <div className={compact ? "space-y-3" : "space-y-7"}>
    <div className={compact ? "flex flex-col gap-3" : "flex flex-wrap items-center gap-3"}>
      {authenticated ? <button type="button" onClick={() => void toggleLike()} className={buttonClass(liked, compact)} aria-pressed={liked}><Heart size={compact ? 20 : 18} fill={liked ? "currentColor" : "none"} /><span>{compact ? compactNumber(analytics.likes) : `${compactNumber(analytics.likes)} likes`}</span></button> : <Link href="/login" className={buttonClass(false, compact)}><LogIn size={compact ? 20 : 18} /><span>{compact ? compactNumber(analytics.likes) : "Login to like"}</span></Link>}
      <button type="button" onClick={() => void share()} className={buttonClass(false, compact)}><Share2 size={compact ? 20 : 18} /><span>{compact ? compactNumber(analytics.shares) : `${compactNumber(analytics.shares)} shares`}</span></button>
      <span className={buttonClass(false, compact)}><MessageCircle size={compact ? 20 : 18} /><span>{compact ? compactNumber(analytics.comments) : `${compactNumber(analytics.comments)} comments`}</span></span>
    </div>
    {message ? <p className="text-xs font-semibold text-emerald-300">{message}</p> : null}
    {error ? <p className="rounded-xl border border-rose-300/20 bg-rose-300/[0.08] p-3 text-xs text-rose-100">{error}</p> : null}

    {!compact ? <section className="rounded-3xl border border-white/10 bg-[#07101f] p-5 sm:p-7">
      <h2 className="text-xl font-black">Comments <span className="text-slate-500">({comments.data?.pagination.total ?? analytics.comments})</span></h2>
      {authenticated ? <form onSubmit={submitComment} className="mt-5 flex gap-3"><input name="content" maxLength={2000} required placeholder="Add a respectful comment" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#030712] px-4 py-3 text-sm outline-none focus:border-cyan-300/40" /><button type="submit" disabled={addState.isLoading} className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-300 text-slate-950 disabled:opacity-50" aria-label="Post comment"><Send size={18} /></button></form> : <Link href="/login" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300"><LogIn size={16} /> Login to join the discussion</Link>}
      <div className="mt-6 space-y-4">{(comments.data?.data ?? []).map((comment) => <article key={comment.id ?? comment._id} className="rounded-2xl border border-white/8 bg-black/20 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-bold text-slate-100">{comment.displayName}</p><p className="mt-1 text-xs text-slate-600">{new Date(comment.createdAt).toLocaleString()}</p></div>{session.data?.data.userId === comment.userId ? <button type="button" onClick={() => void deleteComment({ slug, commentId: comment.id ?? comment._id })} className="text-slate-600 hover:text-rose-300" aria-label="Delete comment"><Trash2 size={15} /></button> : null}</div><p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">{comment.content}</p></article>)}</div>
    </section> : null}
  </div>;
}

function buttonClass(active: boolean, compact: boolean) {
  return ["inline-flex items-center justify-center gap-2 border font-bold transition", compact ? "h-11 w-11 flex-col rounded-full border-white/10 bg-black/45 text-[9px]" : "rounded-full px-4 py-2.5 text-sm", active ? "border-rose-300/30 bg-rose-300/10 text-rose-200" : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-cyan-300/30"].join(" ");
}
export function compactNumber(value?: number) { return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value ?? 0); }
