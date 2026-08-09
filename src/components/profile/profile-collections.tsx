"use client";

import { useEffect, useState, type FormEvent } from "react";

import {
  Field,
  Panel,
  PanelHeader,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from "@/src/components/profile/profile-ui";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useUpdateLanguagesMutation,
  useUpdateSkillsMutation,
} from "@/src/lib/features/profiles/profile-api";
import type { Profile } from "@/src/lib/features/profiles/profile-types";

export function SkillsLanguagesPanel({
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
  const [updateSkills, skillsState] = useUpdateSkillsMutation();
  const [updateLanguages, languagesState] = useUpdateLanguagesMutation();

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <TagEditor
        title="Skills"
        description="Add up to 50 professional or technical skills."
        values={profile.skills}
        placeholder="Type skills separated by commas"
        saveLabel="Save skills"
        busy={skillsState.isLoading}
        onSave={async (values) => {
          try {
            const response = await updateSkills({ skills: values, userId }).unwrap();
            onProfileChange(response.data);
            onMessage("Skills updated successfully.");
          } catch (error) {
            onError(getApiErrorMessage(error));
            return false;
          }
          return true;
        }}
      />

      <TagEditor
        title="Languages"
        description="Add up to 20 languages you can communicate in."
        values={profile.languages}
        placeholder="Type languages separated by commas"
        saveLabel="Save languages"
        busy={languagesState.isLoading}
        onSave={async (values) => {
          try {
            const response = await updateLanguages({ languages: values, userId }).unwrap();
            onProfileChange(response.data);
            onMessage("Languages updated successfully.");
          } catch (error) {
            onError(getApiErrorMessage(error));
            return false;
          }
          return true;
        }}
      />
    </div>
  );
}

function TagEditor({
  title,
  description,
  values,
  placeholder,
  saveLabel,
  busy,
  onSave,
}: {
  title: string;
  description: string;
  values: string[];
  placeholder: string;
  saveLabel: string;
  busy: boolean;
  onSave: (values: string[]) => Promise<boolean>;
}) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(values.join(", "));

  useEffect(() => {
    if (!editing) setInput(values.join(", "));
  }, [editing, values]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const saved = await onSave(normalizeTags(input));
    if (saved) setEditing(false);
  }

  return (
    <Panel delay={0.1}>
      <PanelHeader
        title={title}
        description={description}
        action={
          !editing ? (
            <SecondaryButton type="button" onClick={() => setEditing(true)}>
              Edit
            </SecondaryButton>
          ) : null
        }
      />

      {editing ? (
        <form onSubmit={submit} className="space-y-4 p-5 sm:p-6">
          <Field label={`${title} list`} hint="Separate each item with a comma.">
            <input
              className={inputClass}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={placeholder}
            />
          </Field>
          <div className="flex justify-end gap-2">
            <SecondaryButton
              type="button"
              disabled={busy}
              onClick={() => {
                setInput(values.join(", "));
                setEditing(false);
              }}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? "Saving..." : saveLabel}
            </PrimaryButton>
          </div>
        </form>
      ) : values.length > 0 ? (
        <div className="flex flex-wrap gap-2 p-5 sm:p-6">
          {values.map((value) => (
            <span
              key={value}
              className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.055] px-3 py-1.5 text-xs font-medium text-cyan-100"
            >
              {value}
            </span>
          ))}
        </div>
      ) : (
        <div className="px-6 py-10 text-center">
          <p className="font-semibold text-white">No {title.toLowerCase()} added</p>
          <p className="mt-2 text-sm text-slate-500">
            Select Edit to add your first {title.toLowerCase()}.
          </p>
        </div>
      )}
    </Panel>
  );
}

function normalizeTags(value: string): string[] {
  const unique = new Map<string, string>();
  for (const item of value.split(",")) {
    const trimmed = item.trim();
    if (!trimmed) continue;
    const key = trimmed.toLocaleLowerCase();
    if (!unique.has(key)) unique.set(key, trimmed);
  }
  return [...unique.values()];
}
