"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { BarChart3, Clock3, Eye, Film, Heart, MessageCircle, Plus, Share2, Trash2, Upload, Video as VideoIcon } from "lucide-react";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useGetStorageProvidersQuery } from "@/src/lib/features/files/file-api";
import { useGetProfileQuery } from "@/src/lib/features/profiles/profile-api";
import { useCreateVideoMutation, useDeleteVideoMutation, useGetAdminVideosQuery, useUpdateVideoMutation } from "@/src/lib/features/videos/video-api";
import type { VideoFormat, VideoOrientation, VideoStatus } from "@/src/lib/features/videos/video-types";

export default function VideosAdminPage() {
  const videos = useGetAdminVideosQuery({ page: 1, limit: 100 });
  const providers = useGetStorageProvidersQuery();
  const profile = useGetProfileQuery();
  const [createVideo, createState] = useCreateVideoMutation();
  const [updateVideo, updateState] = useUpdateVideoMutation();
  const [deleteVideo, deleteState] = useDeleteVideoMutation();
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [format, setFormat] = useState<VideoFormat>("long");
  const [orientation, setOrientation] = useState<VideoOrientation>("landscape");
  const [durationSeconds, setDurationSeconds] = useState<number | undefined>();
  const [publisher, setPublisher] = useState("");
  const [readingMedia, setReadingMedia] = useState(false);
  const busy = createState.isLoading || updateState.isLoading || deleteState.isLoading;
  const items = useMemo(() => videos.data?.data ?? [], [videos.data]);
  const totals = useMemo(() => items.reduce((sum, item) => ({
    views: sum.views + (item.analytics?.views ?? 0),
    likes: sum.likes + (item.analytics?.likes ?? 0),
    comments: sum.comments + (item.analytics?.comments ?? 0),
    shares: sum.shares + (item.analytics?.shares ?? 0),
  }), { views: 0, likes: 0, comments: 0, shares: 0 }), [items]);

  useEffect(() => {
    const fullName = profile.data?.data.fullName?.trim();
    if (fullName) setPublisher((current) => current || fullName);
  }, [profile.data?.data.fullName]);

  async function detectVideoMetadata(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setDurationSeconds(undefined);
    if (!file) return;
    setReadingMedia(true);
    const objectUrl = URL.createObjectURL(file);
    const media = document.createElement("video");
    media.preload = "metadata";
    media.onloadedmetadata = () => {
      const duration = Number.isFinite(media.duration) ? Math.max(0, Math.round(media.duration)) : undefined;
      setDurationSeconds(duration);
      if (media.videoHeight > media.videoWidth) {
        setOrientation("portrait");
        setFormat("short");
      } else if (media.videoHeight === media.videoWidth) {
        setOrientation("square");
      } else {
        setOrientation("landscape");
      }
      URL.revokeObjectURL(objectUrl);
      setReadingMedia(false);
    };
    media.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      setReadingMedia(false);
      setError("The browser could not read this video's metadata. You can still upload it.");
    };
    media.src = objectUrl;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setError(""); setNotice("");
    const form = new FormData(formElement);
    if (!(form.get("video") instanceof File) || !(form.get("video") as File).size) {
      setError("Select a video file."); return;
    }
    form.set("format", format);
    form.set("orientation", orientation);
    if (durationSeconds !== undefined) form.set("durationSeconds", String(durationSeconds));
    else form.delete("durationSeconds");
    if (publisher.trim()) form.set("publishedBy", publisher.trim());
    const tags = String(form.get("tags") || "").split(",").map((item) => item.trim()).filter(Boolean);
    form.set("tags", JSON.stringify(tags));
    const chapterText = String(form.get("chapters") || "").trim();
    if (chapterText) {
      try {
        const chapters = JSON.parse(chapterText) as unknown;
        if (!Array.isArray(chapters)) throw new Error("Chapters must be a JSON array.");
        form.set("chapters", JSON.stringify(chapters));
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Invalid chapters JSON.");
        return;
      }
    } else form.set("chapters", "[]");

    try {
      await createVideo(form).unwrap();
      formElement.reset();
      setFormat("long");
      setOrientation("landscape");
      setDurationSeconds(undefined);
      setPublisher(profile.data?.data.fullName?.trim() || "");
      setNotice("Video uploaded successfully.");
      setShowForm(false);
    } catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  async function changeStatus(id: string, status: VideoStatus) {
    try { await updateVideo({ id, body: { status } }).unwrap(); setNotice(`Video moved to ${status}.`); }
    catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this video and its stored media permanently?")) return;
    try { await deleteVideo(id).unwrap(); setNotice("Video deleted."); }
    catch (caught) { setError(getApiErrorMessage(caught)); }
  }

  return <section className="space-y-7">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Media publishing</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Video studio</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Publish long-form videos and portrait shorts with automatic duration detection, accessible metadata and interaction analytics.</p></div>
      <button type="button" onClick={() => setShowForm((value) => !value)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950"><Plus size={18} /> {showForm ? "Close uploader" : "Upload video"}</button>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Metric icon={<Eye size={18} />} label="Total views" value={totals.views} />
      <Metric icon={<Heart size={18} />} label="Likes" value={totals.likes} />
      <Metric icon={<MessageCircle size={18} />} label="Comments" value={totals.comments} />
      <Metric icon={<Share2 size={18} />} label="Shares" value={totals.shares} />
    </div>

    {error ? <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.07] p-4 text-sm text-rose-100">{error}</div> : null}
    {notice ? <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.07] p-4 text-sm text-emerald-100">{notice}</div> : null}

    {showForm ? <form onSubmit={submit} className="grid gap-6 rounded-3xl border border-white/10 bg-[#07101f]/90 p-5 shadow-2xl sm:p-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Video title" required><input name="title" required className={inputClass} /></Field>
        <Field label="Meaningful slug (optional)"><input name="slug" className={inputClass} placeholder="how-to-build-ai-agents" /></Field>
        <Field label="Video type"><select value={format} onChange={(event) => { const next = event.target.value as VideoFormat; setFormat(next); setOrientation(next === "short" ? "portrait" : "landscape"); }} className={inputClass}><option value="long">Long video</option><option value="short">Short video</option></select></Field>
        <Field label="Orientation"><select name="orientation" value={orientation} onChange={(event) => setOrientation(event.target.value as VideoOrientation)} className={inputClass}><option value="portrait">Portrait 9:16</option><option value="landscape">Landscape 16:9</option><option value="square">Square 1:1</option></select></Field>
        <Field label="Published by"><input name="publishedBy" value={publisher} onChange={(event) => setPublisher(event.target.value)} className={inputClass} placeholder="Profile name is filled automatically" /></Field>
        <Field label="Detected duration"><div className={`${inputClass} flex items-center gap-2 text-slate-300`}><Clock3 size={16} className="text-cyan-300" />{readingMedia ? "Reading video metadata…" : durationSeconds !== undefined ? formatDuration(durationSeconds) : "Select a video file"}</div></Field>
        <Field label="Category"><input name="category" className={inputClass} /></Field>
        <Field label="Tags (comma separated)"><input name="tags" className={inputClass} /></Field>
        <Field label="Language"><input name="language" defaultValue="English" className={inputClass} /></Field>
        <Field label="Caption"><input name="caption" className={inputClass} /></Field>
        <div className="md:col-span-2"><Field label="Accessible alt text"><input name="altText" className={inputClass} /></Field></div>
        <div className="md:col-span-2"><Field label="Description"><textarea name="description" rows={5} className={inputClass} /></Field></div>
        <Field label="SEO title"><input name="seoTitle" className={inputClass} /></Field>
        <Field label="SEO description"><textarea name="seoDescription" rows={3} className={inputClass} /></Field>
        <div className="md:col-span-2"><Field label="Transcript"><textarea name="transcript" rows={8} className={inputClass} placeholder="Optional searchable transcript" /></Field></div>
        <div className="md:col-span-2"><Field label="Chapters JSON"><textarea name="chapters" rows={5} className={`${inputClass} font-mono text-xs`} placeholder='[{"title":"Introduction","startSeconds":0},{"title":"Demo","startSeconds":120}]' /></Field></div>
      </div>
      <aside className="space-y-4 self-start xl:sticky xl:top-4">
        <UploadField name="video" label={format === "short" ? "Short video file" : "Long video file"} accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska" required onChange={detectVideoMetadata} />
        <UploadField name="thumbnail" label="Thumbnail / poster" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" />
        <Field label="Storage provider"><select name="provider" className={inputClass}><option value="">Default provider</option>{(providers.data?.data ?? []).map((provider) => <option key={provider}>{provider}</option>)}</select></Field>
        <Field label="Visibility"><select name="visibility" defaultValue="public" className={inputClass}><option value="public">Public storage</option><option value="private">Private signed access</option></select></Field>
        <Field label="Initial status"><select name="status" defaultValue="draft" className={inputClass}><option value="draft">Draft</option><option value="published">Published</option></select></Field>
        <button type="submit" disabled={busy || readingMedia} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 font-black text-slate-950 disabled:opacity-50"><Upload size={18} />{busy ? "Uploading…" : "Upload video"}</button>
        <p className="text-xs leading-5 text-slate-500">Maximum upload size: 2 GB. Duration and orientation are detected locally before upload; long media is streamed from temporary disk storage.</p>
      </aside>
    </form> : null}

    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#07101f]/85">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5"><div><h2 className="text-xl font-black">All videos</h2><p className="mt-1 text-sm text-slate-500">{items.length} managed records</p></div><BarChart3 className="text-cyan-300" /></div>
      {videos.isLoading ? <div className="p-8 text-slate-500">Loading videos…</div> : items.length ? <div className="max-h-[calc(100vh-320px)] overflow-auto"><table className="w-full min-w-[1180px] text-left text-sm"><thead className="sticky top-0 z-10 bg-[#07101f] text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="p-4">Video</th><th>Type</th><th>Publisher</th><th>Status</th><th>Views</th><th>Likes</th><th>Comments</th><th>Shares</th><th>Created</th><th className="pr-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-white/8">{items.map((item) => <tr key={item.id ?? item._id} className="hover:bg-white/[0.02]"><td className="p-4"><div className="flex items-center gap-3">{item.thumbnail?.url ? <img src={item.thumbnail.url} alt={item.altText || item.title} className="h-14 w-24 rounded-xl object-cover" /> : <span className="grid h-14 w-24 place-items-center rounded-xl bg-white/[0.04]"><Film size={22} /></span>}<div><p className="font-bold">{item.title}</p><p className="mt-1 text-xs text-slate-500">/videos/{item.slug} · {formatDuration(item.durationSeconds)}</p></div></div></td><td className="capitalize text-slate-300">{item.format} · {item.orientation}</td><td className="text-slate-300">{item.publishedBy || "QuantumFinix"}</td><td><select disabled={busy} value={item.status} onChange={(event) => void changeStatus(item.id ?? item._id, event.target.value as VideoStatus)} className="rounded-xl border border-white/10 bg-[#030712] px-3 py-2 text-xs"><option value="draft">Draft</option><option value="published">Published</option></select></td><td>{compact(item.analytics?.views)}</td><td>{compact(item.analytics?.likes)}</td><td>{compact(item.analytics?.comments)}</td><td>{compact(item.analytics?.shares)}</td><td className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td><td className="pr-4 text-right"><button type="button" disabled={busy} onClick={() => void remove(item.id ?? item._id)} className="inline-flex items-center gap-2 rounded-xl border border-rose-300/20 px-3 py-2 text-xs font-bold text-rose-200"><Trash2 size={14} /> Delete</button></td></tr>)}</tbody></table></div> : <div className="p-10 text-center text-slate-500"><VideoIcon className="mx-auto mb-3" />No videos uploaded.</div>}
    </div>
  </section>;
}

const inputClass = "w-full rounded-xl border border-white/10 bg-[#030712] px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40";
function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) { return <label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">{label}{required ? " *" : ""}</span>{children}</label>; }
function UploadField({ name, label, accept, required, onChange }: { name: string; label: string; accept: string; required?: boolean; onChange?: (event: ChangeEvent<HTMLInputElement>) => void }) { return <label className="block rounded-2xl border border-dashed border-white/15 bg-black/20 p-5"><span className="mb-3 flex items-center gap-2 text-sm font-black"><Upload size={17} className="text-cyan-300" />{label}</span><input name={name} type="file" accept={accept} required={required} onChange={onChange} className="block w-full text-xs text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-300 file:px-3 file:py-2 file:font-bold file:text-slate-950" /></label>; }
function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: number }) { return <div className="rounded-2xl border border-white/10 bg-[#07101f]/80 p-5"><div className="flex items-center gap-2 text-cyan-300">{icon}<span className="text-xs font-black uppercase tracking-wider text-slate-500">{label}</span></div><p className="mt-3 text-3xl font-black">{compact(value)}</p></div>; }
function formatDuration(value?: number) { if (!value && value !== 0) return "—"; const hours = Math.floor(value / 3600); const minutes = Math.floor((value % 3600) / 60); const seconds = Math.floor(value % 60); return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` : `${minutes}:${String(seconds).padStart(2, "0")}`; }
function compact(value?: number) { return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value ?? 0); }
