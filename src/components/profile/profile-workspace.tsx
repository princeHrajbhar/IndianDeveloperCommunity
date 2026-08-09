"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ProfileHero, ResumePanel } from "@/src/components/profile/profile-assets";
import { SkillsLanguagesPanel } from "@/src/components/profile/profile-collections";
import { ProfileForm } from "@/src/components/profile/profile-form";
import { EducationPanel, ExperiencePanel } from "@/src/components/profile/profile-timeline";
import {
  PageHeading,
  Panel,
  PanelHeader,
  PrimaryButton,
  StatusBadge,
} from "@/src/components/profile/profile-ui";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { selectCurrentUser } from "@/src/lib/features/auth/auth-slice";
import {
  profileApi,
  useCreateProfileMutation,
  useGetProfileQuery,
  useGetProfileStatsQuery,
  useUpdateProfileMutation,
} from "@/src/lib/features/profiles/profile-api";
import type {
  CreateProfileInput,
  Profile,
} from "@/src/lib/features/profiles/profile-types";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";

type ScreenMode = "view" | "create" | "edit";

export function ProfileWorkspace() {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectCurrentUser);
  const [mode, setMode] = useState<ScreenMode>("view");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const {
    data: profileResponse,
    error: profileError,
    isLoading,
    isFetching,
    refetch,
  } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const profile = profileResponse?.data;
  const missing = hasStatus(profileError, 404) && !profile;

  const { data: statsResponse } = useGetProfileStatsQuery(undefined, {
    skip: !profile,
  });

  const [createProfile, createState] = useCreateProfileMutation();
  const [updateProfile, updateState] = useUpdateProfileMutation();
  const formBusy = createState.isLoading || updateState.isLoading;

  useEffect(() => {
    if (profile && mode === "create") setMode("view");
  }, [mode, profile]);

  function clearFeedback() {
    setError("");
    setMessage("");
  }

  function showMessage(value: string) {
    setError("");
    setMessage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showError(value: string) {
    setMessage("");
    setError(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function syncProfile(nextProfile: Profile) {
    dispatch(
      profileApi.util.upsertQueryData("getProfile", undefined, {
        success: true,
        data: nextProfile,
      }),
    );
    dispatch(
      profileApi.util.invalidateTags([
        { type: "ProfileStats", id: "SELF" },
      ]),
    );
  }

  async function saveProfile(body: CreateProfileInput) {
    clearFeedback();
    try {
      const response = profile
        ? await updateProfile({ body }).unwrap()
        : await createProfile({ body }).unwrap();
      syncProfile(response.data);
      setMode("view");
      showMessage(profile ? "Profile updated successfully." : "Profile created successfully.");
    } catch (requestError) {
      showError(getApiErrorMessage(requestError));
    }
  }

  if (isLoading && !missing) return <ProfileLoading />;

  if (profileError && !missing && !profile) {
    return (
      <>
        <PageHeading
          eyebrow="Account profile"
          title="Personal"
          accent="information."
          description="Your protected profile could not be loaded."
        />
        <Panel>
          <div className="px-6 py-16 text-center">
            <span className="mx-auto block h-12 w-12 rounded-full border border-dashed border-rose-300/30" />
            <h2 className="mt-5 text-lg font-bold text-white">Unable to load profile</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              {getApiErrorMessage(profileError)}
            </p>
            <PrimaryButton type="button" className="mt-6" onClick={() => refetch()}>
              Retry
            </PrimaryButton>
          </div>
        </Panel>
      </>
    );
  }

  if (!profile && mode !== "create") {
    return (
      <>
        <PageHeading
          eyebrow="Account profile"
          title="Build your"
          accent="professional profile."
          description="Create your profile once, then keep your information, experience and documents updated from this workspace."
        />

        <Feedback error={error} message={message} />

        <Panel>
          <div className="relative overflow-hidden px-6 py-16 text-center sm:px-10 sm:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-300/[0.06] blur-3xl" />
            <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] text-2xl font-black text-cyan-200">
              {getInitials(formatAccountName(account?.email))}
            </span>
            <p className="relative mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/60">
              Profile not created
            </p>
            <h2 className="relative mt-3 text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">
              No profile exists for this account yet.
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Add your name, phone number, date of birth and location. After saving, you can add a photo, resume, skills, education and experience.
            </p>
            <PrimaryButton
              type="button"
              className="relative mt-8 min-w-44"
              onClick={() => {
                clearFeedback();
                setMode("create");
              }}
            >
              Create profile
            </PrimaryButton>
          </div>
        </Panel>
      </>
    );
  }

  if (!profile && mode === "create") {
    return (
      <>
        <PageHeading
          eyebrow="Profile setup"
          title="Create your"
          accent="profile."
          description="Complete the required information. You can add the remaining professional details after the profile is saved."
        />
        <Feedback error={error} message={message} />
        <ProfileForm
          mode="create"
          accountEmail={account?.email}
          accountRole={account?.role}
          busy={formBusy}
          onSubmit={saveProfile}
          onCancel={() => {
            clearFeedback();
            setMode("view");
          }}
        />
      </>
    );
  }

  if (!profile) return null;

  const completion =
    statsResponse?.data.completion.percentage ?? calculateCompletion(profile);

  return (
    <>
      <PageHeading
        eyebrow="Account profile"
        title="Personal"
        accent="information."
        description="Manage the information stored in your protected QuantumFinix profile."
        action={
          <Link
            href="/profile/security"
            className="inline-flex h-11 items-center rounded-xl border border-white/[0.1] bg-white/[0.025] px-5 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/25 hover:text-cyan-200"
          >
            Account security
          </Link>
        }
      />

      <Feedback error={error} message={message} />

      {mode === "edit" ? (
        <ProfileForm
          mode="edit"
          profile={profile}
          accountEmail={account?.email}
          accountRole={account?.role}
          busy={formBusy}
          onSubmit={saveProfile}
          onCancel={() => {
            clearFeedback();
            setMode("view");
          }}
        />
      ) : (
        <div className="space-y-6">
          <ProfileHero
            profile={profile}
            accountEmail={account?.email}
            completion={completion}
            action={
              <PrimaryButton
                type="button"
                onClick={() => {
                  clearFeedback();
                  setMode("edit");
                }}
              >
                Edit profile
              </PrimaryButton>
            }
            onProfileChange={syncProfile}
            onMessage={showMessage}
            onError={showError}
          />

          <ProfileStats profile={profile} completion={completion} fetching={isFetching} />
          <ProfileOverview profile={profile} />

          <SkillsLanguagesPanel
            profile={profile}
            onProfileChange={syncProfile}
            onMessage={showMessage}
            onError={showError}
          />

          <EducationPanel
            profile={profile}
            onProfileChange={syncProfile}
            onMessage={showMessage}
            onError={showError}
          />

          <ExperiencePanel
            profile={profile}
            onProfileChange={syncProfile}
            onMessage={showMessage}
            onError={showError}
          />

          <ResumePanel
            profile={profile}
            onProfileChange={syncProfile}
            onMessage={showMessage}
            onError={showError}
          />
        </div>
      )}
    </>
  );
}

function ProfileStats({
  profile,
  completion,
  fetching,
}: {
  profile: Profile;
  completion: number;
  fetching: boolean;
}) {
  const stats = [
    { label: "Completion", value: `${completion}%` },
    { label: "Education", value: String(profile.education.length) },
    { label: "Experience", value: String(profile.experience.length) },
    { label: "Skills", value: String(profile.skills.length) },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div key={item.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.018] p-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            {item.label}
          </p>
          <p className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">
            {item.value}
          </p>
        </div>
      ))}
      {fetching ? (
        <p className="sr-only" role="status">Refreshing profile information</p>
      ) : null}
    </div>
  );
}

function ProfileOverview({ profile }: { profile: Profile }) {
  const socialLinks = Object.entries(profile.socialLinks ?? {}).filter(
    (entry): entry is [string, string] => Boolean(entry[1]),
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
      <Panel>
        <PanelHeader
          title="Profile details"
          description="Your saved personal and account information."
        />
        <dl className="grid gap-px bg-white/[0.07] sm:grid-cols-2">
          <InfoItem label="Full name" value={profile.fullName} />
          <InfoItem label="Phone number" value={profile.phoneNumber} />
          <InfoItem label="Date of birth" value={formatDate(profile.dateOfBirth)} />
          <InfoItem label="Gender" value={profile.gender || "Not provided"} />
          <InfoItem label="Current location" value={profile.currentLocation} />
          <InfoItem label="Professional headline" value={profile.headline || "Not provided"} />
          <InfoItem label="Account status" value={profile.isVerified ? "Verified" : "Not verified"} />
        </dl>
        <div className="border-t border-white/[0.07] p-5 sm:p-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">Professional bio</p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {profile.bio || "No professional bio has been added yet."}
          </p>
        </div>
      </Panel>

      <Panel delay={0.05}>
        <PanelHeader
          title="Social presence"
          description="Public links saved with your profile."
        />
        {socialLinks.length > 0 ? (
          <div className="divide-y divide-white/[0.07]">
            {socialLinks.map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 px-5 py-4 text-sm transition hover:bg-white/[0.02] sm:px-6"
              >
                <span className="capitalize text-slate-400">{name}</span>
                <span className="max-w-[65%] truncate text-cyan-200">{url}</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="font-semibold text-white">No social links added</p>
            <p className="mt-2 text-sm text-slate-500">Use Edit profile to add your links.</p>
          </div>
        )}
        <div className="border-t border-white/[0.07] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">Profile record</p>
              <p className="mt-2 text-xs text-slate-500">Updated {formatDateTime(profile.updatedAt)}</p>
            </div>
            <StatusBadge tone={profile.isProfileComplete ? "emerald" : "amber"}>
              {profile.isProfileComplete ? "Complete" : "In progress"}
            </StatusBadge>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 bg-[#07101f] p-5 sm:p-6">
      <dt className="text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-600">
        {label}
      </dt>
      <dd className="mt-2 break-words text-sm text-slate-300">{value}</dd>
    </div>
  );
}

function Feedback({ error, message }: { error: string; message: string }) {
  return (
    <>
      {error ? (
        <div role="alert" className="mb-6 rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}
      {message ? (
        <div role="status" className="mb-6 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] px-4 py-3 text-sm text-emerald-200">
          {message}
        </div>
      ) : null}
    </>
  );
}

function ProfileLoading() {
  return (
    <>
      <PageHeading
        eyebrow="Account profile"
        title="Personal"
        accent="information."
        description="Loading your protected profile information."
      />
      <Panel>
        <div className="grid min-h-80 place-items-center">
          <div className="text-center">
            <span className="mx-auto block h-9 w-9 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" />
            <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-slate-600">Loading profile</p>
          </div>
        </div>
      </Panel>
    </>
  );
}

function calculateCompletion(profile: Profile): number {
  const fields = [
    Boolean(profile.firstName && profile.lastName && profile.phoneNumber),
    Boolean(profile.dateOfBirth),
    Boolean(profile.currentLocation),
    Boolean(profile.bio),
    profile.education.length > 0,
    profile.experience.length > 0,
    profile.skills.length > 0,
    Boolean(profile.profilePicture),
  ];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Not provided"
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "recently" : date.toLocaleString();
}

function formatAccountName(email?: string): string {
  if (!email) return "QuantumFinix user";
  return (
    email
      .split("@")[0]
      ?.split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "QuantumFinix user"
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

function hasStatus(error: unknown, status: number): boolean {
  return Boolean(
    error &&
      typeof error === "object" &&
      "status" in error &&
      (error as { status?: unknown }).status === status,
  );
}
