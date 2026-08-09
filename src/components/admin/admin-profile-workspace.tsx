"use client";

import { useEffect, useState } from "react";
import { ProfileHero, ResumePanel } from "@/src/components/profile/profile-assets";
import { SkillsLanguagesPanel } from "@/src/components/profile/profile-collections";
import { ProfileForm } from "@/src/components/profile/profile-form";
import { EducationPanel, ExperiencePanel } from "@/src/components/profile/profile-timeline";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  profileApi,
  useCreateProfileMutation,
  useDeleteProfileMutation,
  useGetProfileQuery,
  useGetProfileStatsQuery,
  useUpdateProfileMutation,
} from "@/src/lib/features/profiles/profile-api";
import type {
  CreateProfileInput,
  Profile,
} from "@/src/lib/features/profiles/profile-types";
import { useAppDispatch } from "@/src/lib/hooks";
import {
  Button,
  Empty,
  ErrorNotice,
  LoadingRows,
  Panel,
  PanelTitle,
  SuccessNotice,
} from "./admin-ui";

type Mode = "view" | "create" | "edit";

export function AdminProfileWorkspace({
  userId,
  email,
  role,
  onClose,
}: {
  userId: string;
  email: string;
  role: string;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<Mode>("view");
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");
  const [profileDeleted, setProfileDeleted] = useState(false);

  const queryArg = { userId };
  const profileQuery = useGetProfileQuery(queryArg, {
    refetchOnMountOrArgChange: true,
  });
  const profile = profileDeleted ? undefined : profileQuery.data?.data;
  const missing = hasStatus(profileQuery.error, 404) && !profile;
  const statsQuery = useGetProfileStatsQuery(queryArg, { skip: !profile });

  const [createProfile, createState] = useCreateProfileMutation();
  const [updateProfile, updateState] = useUpdateProfileMutation();
  const [deleteProfile, deleteState] = useDeleteProfileMutation();
  const busy =
    createState.isLoading || updateState.isLoading || deleteState.isLoading;

  useEffect(() => {
    setMode("view");
    setMessage("");
    setLocalError("");
    setProfileDeleted(false);
  }, [userId]);

  function syncProfile(nextProfile: Profile) {
    dispatch(
      profileApi.util.upsertQueryData("getProfile", queryArg, {
        success: true,
        data: nextProfile,
      }),
    );
    dispatch(
      profileApi.util.invalidateTags([
        { type: "ProfileStats", id: userId },
      ]),
    );
  }

  function notify(value: string) {
    setLocalError("");
    setMessage(value);
  }

  function fail(value: string) {
    setMessage("");
    setLocalError(value);
  }

  async function save(body: CreateProfileInput) {
    setLocalError("");
    setMessage("");
    try {
      const response = profile
        ? await updateProfile({ userId, body }).unwrap()
        : await createProfile({ userId, body }).unwrap();
      setProfileDeleted(false);
      syncProfile(response.data);
      setMode("view");
      notify(profile ? "User profile updated." : "User profile created.");
    } catch (error) {
      fail(getApiErrorMessage(error));
    }
  }

  async function removeProfile() {
    if (
      !window.confirm(
        `Delete the complete profile for ${email}? Uploaded profile assets will also be detached.`,
      )
    ) {
      return;
    }

    try {
      await deleteProfile({ userId }).unwrap();
      setProfileDeleted(true);
      setMode("view");
      notify("User profile deleted.");
    } catch (error) {
      fail(getApiErrorMessage(error));
    }
  }

  const header = (
    <PanelTitle
      eyebrow="Administrator profile access"
      title={profile?.fullName || email}
      action={
        <div className="flex flex-wrap gap-2">
          {profile && mode === "view" ? (
            <>
              <Button onClick={() => setMode("edit")}>Edit profile</Button>
              <Button danger disabled={busy} onClick={() => void removeProfile()}>
                Delete profile
              </Button>
            </>
          ) : null}
          <Button secondary onClick={onClose}>Close</Button>
        </div>
      }
    />
  );

  if (profileQuery.isLoading && !missing) {
    return <Panel>{header}<LoadingRows /></Panel>;
  }

  if (profileQuery.error && !missing && !profile) {
    return (
      <Panel>
        {header}
        <ErrorNotice message={getApiErrorMessage(profileQuery.error)} />
        <div className="mt-4">
          <Button onClick={() => profileQuery.refetch()}>Retry profile request</Button>
        </div>
      </Panel>
    );
  }

  if (!profile && mode === "create") {
    return (
      <div className="space-y-5">
        <Panel>{header}{localError ? <ErrorNotice message={localError} /> : null}</Panel>
        <ProfileForm
          mode="create"
          accountEmail={email}
          accountRole={role}
          busy={busy}
          onSubmit={save}
          onCancel={() => setMode("view")}
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <Panel>
        {header}
        {localError ? <ErrorNotice message={localError} /> : null}
        {message ? <SuccessNotice message={message} /> : null}
        <Empty
          title="Profile not created"
          description="This account exists, but no profile record has been created yet."
        />
        <div className="mt-5 flex justify-center">
          <Button onClick={() => setMode("create")}>Create profile for user</Button>
        </div>
      </Panel>
    );
  }

  if (mode === "edit") {
    return (
      <div className="space-y-5">
        <Panel>{header}{localError ? <ErrorNotice message={localError} /> : null}</Panel>
        <ProfileForm
          mode="edit"
          profile={profile}
          accountEmail={email}
          accountRole={role}
          busy={busy}
          onSubmit={save}
          onCancel={() => setMode("view")}
        />
      </div>
    );
  }

  const completion =
    statsQuery.data?.data.completion.percentage ?? calculateCompletion(profile);

  return (
    <div className="space-y-6">
      <Panel>
        {header}
        {localError ? <ErrorNotice message={localError} /> : null}
        {message ? <SuccessNotice message={message} /> : null}
      </Panel>

      <ProfileHero
        profile={profile}
        accountEmail={email}
        completion={completion}
        userId={userId}
        action={<Button onClick={() => setMode("edit")}>Edit profile</Button>}
        onProfileChange={syncProfile}
        onMessage={notify}
        onError={fail}
      />

      <SkillsLanguagesPanel
        profile={profile}
        userId={userId}
        onProfileChange={syncProfile}
        onMessage={notify}
        onError={fail}
      />

      <ResumePanel
        profile={profile}
        userId={userId}
        onProfileChange={syncProfile}
        onMessage={notify}
        onError={fail}
      />

      <EducationPanel
        profile={profile}
        userId={userId}
        onProfileChange={syncProfile}
        onMessage={notify}
        onError={fail}
      />

      <ExperiencePanel
        profile={profile}
        userId={userId}
        onProfileChange={syncProfile}
        onMessage={notify}
        onError={fail}
      />
    </div>
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
