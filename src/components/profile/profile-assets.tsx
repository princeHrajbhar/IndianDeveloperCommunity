"use client";

import type { ChangeEvent, ReactNode } from "react";

import {
  Panel,
  PanelHeader,
  SecondaryButton,
  StatusBadge,
} from "@/src/components/profile/profile-ui";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useDeleteCoverPhotoMutation,
  useDeleteProfilePictureMutation,
  useDeleteResumeMutation,
  useUploadCoverPhotoMutation,
  useUploadProfilePictureMutation,
  useUploadResumeMutation,
} from "@/src/lib/features/profiles/profile-api";
import type { Profile } from "@/src/lib/features/profiles/profile-types";

export function ProfileHero({
  profile,
  accountEmail,
  completion,
  action,
  onProfileChange,
  onMessage,
  onError,
  userId,
}: {
  profile: Profile;
  accountEmail?: string;
  userId?: string;
  completion: number;
  action: ReactNode;
  onProfileChange: (profile: Profile) => void;
  onMessage: (message: string) => void;
  onError: (message: string) => void;
}) {
  const [uploadPicture, uploadPictureState] = useUploadProfilePictureMutation();
  const [deletePicture, deletePictureState] = useDeleteProfilePictureMutation();
  const [uploadCover, uploadCoverState] = useUploadCoverPhotoMutation();
  const [deleteCover, deleteCoverState] = useDeleteCoverPhotoMutation();

  const pictureBusy = uploadPictureState.isLoading || deletePictureState.isLoading;
  const coverBusy = uploadCoverState.isLoading || deleteCoverState.isLoading;

  async function handlePicture(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const response = await uploadPicture({
        file,
        altText: `Profile picture of ${profile.fullName}`,
        userId,
      }).unwrap();
      onProfileChange(response.data);
      onMessage("Profile picture updated successfully.");
    } catch (error) {
      onError(getApiErrorMessage(error));
    }
  }

  async function handleCover(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const response = await uploadCover({
        file,
        altText: `Profile cover for ${profile.fullName}`,
        userId,
      }).unwrap();
      onProfileChange(response.data);
      onMessage("Cover photo updated successfully.");
    } catch (error) {
      onError(getApiErrorMessage(error));
    }
  }

  async function removePicture() {
    try {
      const response = await deletePicture(userId ? { userId } : undefined).unwrap();
      onProfileChange(response.data);
      onMessage("Profile picture removed.");
    } catch (error) {
      onError(getApiErrorMessage(error));
    }
  }

  async function removeCover() {
    try {
      const response = await deleteCover(userId ? { userId } : undefined).unwrap();
      onProfileChange(response.data);
      onMessage("Cover photo removed.");
    } catch (error) {
      onError(getApiErrorMessage(error));
    }
  }

  return (
    <Panel className="mb-6">
      <div className="relative min-h-52 overflow-hidden border-b border-white/[0.07] bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,.12),transparent_32%),linear-gradient(135deg,#07101f,#040812)]">
        {profile.coverPhoto?.url ? (
          // Storage URLs may come from different providers and domains.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.coverPhoto.url}
            alt={profile.coverPhoto.alt || "Profile cover"}
            className="absolute inset-0 h-full w-full object-cover opacity-65"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07101f] via-[#07101f]/35 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

        <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
          <label
            className={`inline-flex h-10 cursor-pointer items-center rounded-xl border border-cyan-200/20 bg-[#07101f]/85 px-4 text-xs font-semibold text-cyan-200 backdrop-blur transition hover:bg-[#07101f] ${
              coverBusy ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {uploadCoverState.isLoading ? "Uploading..." : "Change cover"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              className="sr-only"
              onChange={handleCover}
            />
          </label>
          {profile.coverPhoto?.url ? (
            <button
              type="button"
              disabled={coverBusy}
              onClick={removeCover}
              className="h-10 rounded-xl border border-white/[0.1] bg-[#07101f]/85 px-4 text-xs font-semibold text-slate-300 backdrop-blur transition hover:border-rose-300/25 hover:text-rose-200 disabled:opacity-50"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>

      <div className="relative px-5 pb-6 sm:px-7">
        <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
            <div className="group/avatar relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl border-4 border-[#07101f] bg-cyan-300/[0.08] shadow-2xl shadow-black/40">
              {profile.profilePicture?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.profilePicture.url}
                  alt={profile.profilePicture.alt || profile.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-2xl font-black text-cyan-200">
                  {getInitials(profile.fullName)}
                </div>
              )}
              <label
                className={`absolute inset-x-2 bottom-2 flex h-9 cursor-pointer items-center justify-center rounded-xl border border-cyan-200/20 bg-[#07101f]/90 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-200 opacity-100 backdrop-blur transition sm:opacity-0 sm:group-hover/avatar:opacity-100 ${
                  pictureBusy ? "pointer-events-none opacity-50" : ""
                }`}
              >
                {uploadPictureState.isLoading ? "Uploading" : "Change"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  className="sr-only"
                  onChange={handlePicture}
                />
              </label>
            </div>

            <div className="min-w-0 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">
                  {profile.fullName}
                </h2>
                <StatusBadge tone={profile.isProfileComplete ? "emerald" : "amber"}>
                  {profile.isProfileComplete ? "Complete" : "In progress"}
                </StatusBadge>
              </div>
              {profile.headline ? (
                <p className="mt-2 truncate text-sm font-semibold text-cyan-100">{profile.headline}</p>
              ) : null}
              <p className={`${profile.headline ? "mt-1" : "mt-2"} truncate text-sm text-slate-400`}>
                {accountEmail || profile.email || "Authenticated account"}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                <span>{profile.currentLocation}</span>
                <span className="capitalize">{profile.role || "user"} account</span>
                <span>{Math.max(0, Math.min(100, completion))}% complete</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:pb-1">
            {profile.profilePicture?.url ? (
              <SecondaryButton type="button" disabled={pictureBusy} onClick={removePicture}>
                Remove picture
              </SecondaryButton>
            ) : null}
            {action}
          </div>
        </div>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_14px_rgba(34,211,238,.5)] transition-all duration-500"
            style={{ width: `${Math.max(0, Math.min(100, completion))}%` }}
          />
        </div>
      </div>
    </Panel>
  );
}

export function ResumePanel({
  profile,
  onProfileChange,
  onMessage,
  onError,
  userId,
}: {
  profile: Profile;
  userId?: string;
  onProfileChange: (profile: Profile) => void;
  onMessage: (message: string) => void;
  onError: (message: string) => void;
}) {
  const [uploadResume, uploadState] = useUploadResumeMutation();
  const [deleteResume, deleteState] = useDeleteResumeMutation();
  const busy = uploadState.isLoading || deleteState.isLoading;

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const response = await uploadResume({ file, userId }).unwrap();
      onProfileChange(response.data);
      onMessage("Resume uploaded successfully.");
    } catch (error) {
      onError(getApiErrorMessage(error));
    }
  }

  async function handleDelete() {
    try {
      const response = await deleteResume(userId ? { userId } : undefined).unwrap();
      onProfileChange(response.data);
      onMessage("Resume removed successfully.");
    } catch (error) {
      onError(getApiErrorMessage(error));
    }
  }

  return (
    <Panel delay={0.15}>
      <PanelHeader
        title="Resume"
        description="Private PDF, DOC or DOCX file. Download links are generated by the backend."
        action={
          <label
            className={`inline-flex h-10 cursor-pointer items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[0.07] px-4 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-300/[0.1] ${
              busy ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {uploadState.isLoading
              ? "Uploading..."
              : profile.resume
                ? "Replace resume"
                : "Upload resume"}
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={handleUpload}
            />
          </label>
        }
      />

      {profile.resume ? (
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">
              {profile.resume.originalName || "Profile resume"}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>{profile.resume.mimeType || "Document"}</span>
              <span>{formatBytes(profile.resume.size)}</span>
              {profile.resume.uploadedAt ? (
                <span>Uploaded {formatDate(profile.resume.uploadedAt)}</span>
              ) : null}
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {profile.resume.url ? (
              <a
                href={profile.resume.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[0.07] px-4 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-300/[0.1]"
              >
                Open resume
              </a>
            ) : null}
            <button
              type="button"
              onClick={handleDelete}
              disabled={busy}
              className="h-10 rounded-xl border border-rose-300/20 bg-rose-300/[0.05] px-4 text-xs font-semibold text-rose-200 transition hover:bg-rose-300/[0.08] disabled:opacity-50"
            >
              {deleteState.isLoading ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      ) : (
        <div className="px-6 py-10 text-center">
          <p className="font-semibold text-white">No resume uploaded</p>
          <p className="mt-2 text-sm text-slate-500">
            Upload a resume when you are ready to use it in career workflows.
          </p>
        </div>
      )}
    </Panel>
  );
}

function getInitials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "QF"
  );
}

function formatBytes(value?: number): string {
  if (!value || value <= 0) return "Size unavailable";
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "recently"
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}
