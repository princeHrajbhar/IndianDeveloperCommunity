"use client";

import { useEffect, useState, type FormEvent } from "react";

import {
  Field,
  Panel,
  PanelHeader,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
} from "@/src/components/profile/profile-ui";
import type {
  CreateProfileInput,
  Profile,
  ProfileGender,
} from "@/src/lib/features/profiles/profile-types";

interface ProfileFormState {
  firstName: string;
  lastName: string;
  gender: "" | ProfileGender;
  phoneNumber: string;
  dateOfBirth: string;
  currentLocation: string;
  headline: string;
  bio: string;
  portfolio: string;
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
}

const EMPTY_FORM: ProfileFormState = {
  firstName: "",
  lastName: "",
  gender: "",
  phoneNumber: "",
  dateOfBirth: "",
  currentLocation: "",
  headline: "",
  bio: "",
  portfolio: "",
  github: "",
  linkedin: "",
  instagram: "",
  twitter: "",
};

export function ProfileForm({
  mode,
  profile,
  accountEmail,
  accountRole,
  busy,
  onSubmit,
  onCancel,
}: {
  mode: "create" | "edit";
  profile?: Profile;
  accountEmail?: string;
  accountRole?: string;
  busy: boolean;
  onSubmit: (body: CreateProfileInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ProfileFormState>(() =>
    profile ? toFormState(profile) : EMPTY_FORM,
  );
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setForm(profile ? toFormState(profile) : EMPTY_FORM);
    setValidationError("");
  }, [profile, mode]);

  function updateField<K extends keyof ProfileFormState>(
    key: K,
    value: ProfileFormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const error = validateForm(form);
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError("");
    await onSubmit(toPayload(form));
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {validationError ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-200"
        >
          {validationError}
        </div>
      ) : null}

      <Panel>
        <PanelHeader
          title={mode === "create" ? "Create your profile" : "Edit personal information"}
          description={
            mode === "create"
              ? "Complete the required fields to create your profile record."
              : "Update your identity, contact information and professional summary."
          }
        />

        <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-2">
          <Field label="First name">
            <input
              className={inputClass}
              required
              maxLength={50}
              value={form.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
              placeholder="First name"
              autoComplete="given-name"
            />
          </Field>

          <Field label="Last name">
            <input
              className={inputClass}
              required
              maxLength={50}
              value={form.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
              placeholder="Last name"
              autoComplete="family-name"
            />
          </Field>

          <Field
            label="Account email"
            hint="Your email belongs to the authentication account and is read-only here."
          >
            <input
              className={`${inputClass} opacity-70`}
              type="email"
              value={accountEmail ?? profile?.email ?? ""}
              readOnly
            />
          </Field>

          <Field label="Phone number">
            <input
              className={inputClass}
              required
              maxLength={25}
              value={form.phoneNumber}
              onChange={(event) => updateField("phoneNumber", event.target.value)}
              placeholder="+91 99999 99999"
              autoComplete="tel"
            />
          </Field>

          <Field label="Date of birth">
            <input
              className={inputClass}
              required
              type="date"
              max={new Date().toISOString().slice(0, 10)}
              value={form.dateOfBirth}
              onChange={(event) => updateField("dateOfBirth", event.target.value)}
            />
          </Field>

          <Field label="Gender">
            <select
              className={inputClass}
              value={form.gender}
              onChange={(event) =>
                updateField("gender", event.target.value as ProfileFormState["gender"])
              }
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </Field>

          <Field label="Current location">
            <input
              className={inputClass}
              required
              maxLength={150}
              value={form.currentLocation}
              onChange={(event) => updateField("currentLocation", event.target.value)}
              placeholder="City, State, Country"
              autoComplete="address-level2"
            />
          </Field>

          <Field label="Account role">
            <input
              className={`${inputClass} capitalize opacity-70`}
              value={accountRole ?? profile?.role ?? "user"}
              readOnly
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Professional headline" hint="A short title shown on your profile and available in generated documents.">
              <input
                className={inputClass}
                maxLength={160}
                value={form.headline}
                onChange={(event) => updateField("headline", event.target.value)}
                placeholder="Example: Senior Full-Stack Engineer"
              />
              <p className="mt-2 text-right text-[10px] text-slate-600">
                {form.headline.length}/160
              </p>
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Professional bio" hint="Maximum 500 characters.">
              <textarea
                className={textareaClass}
                maxLength={500}
                value={form.bio}
                onChange={(event) => updateField("bio", event.target.value)}
                placeholder="Share a short professional introduction."
              />
              <p className="mt-2 text-right text-[10px] text-slate-600">
                {form.bio.length}/500
              </p>
            </Field>
          </div>
        </div>
      </Panel>

      <Panel delay={0.05}>
        <PanelHeader
          title="Social links"
          description="Optional public links. Only HTTP and HTTPS URLs are accepted."
        />
        <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-2">
          <UrlField
            label="Portfolio"
            value={form.portfolio}
            placeholder="https://yourportfolio.com"
            onChange={(value) => updateField("portfolio", value)}
          />
          <UrlField
            label="LinkedIn"
            value={form.linkedin}
            placeholder="https://linkedin.com/in/..."
            onChange={(value) => updateField("linkedin", value)}
          />
          <UrlField
            label="GitHub"
            value={form.github}
            placeholder="https://github.com/..."
            onChange={(value) => updateField("github", value)}
          />
          <UrlField
            label="Instagram"
            value={form.instagram}
            placeholder="https://instagram.com/..."
            onChange={(value) => updateField("instagram", value)}
          />
          <div className="md:col-span-2">
            <UrlField
              label="X / Twitter"
              value={form.twitter}
              placeholder="https://x.com/..."
              onChange={(value) => updateField("twitter", value)}
            />
          </div>
        </div>
      </Panel>

      <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-white/[0.1] bg-[#07101f]/92 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <span className="mr-auto text-xs text-slate-600">
          {mode === "create"
            ? "Your profile will be saved to the database."
            : "Changes are saved to your existing profile."}
        </span>
        <SecondaryButton type="button" onClick={onCancel} disabled={busy}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={busy}>
          {busy
            ? "Saving..."
            : mode === "create"
              ? "Create profile"
              : "Save changes"}
        </PrimaryButton>
      </div>
    </form>
  );
}

function UrlField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <input
        className={inputClass}
        type="url"
        maxLength={500}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </Field>
  );
}

function toFormState(profile: Profile): ProfileFormState {
  return {
    firstName: profile.firstName ?? "",
    lastName: profile.lastName ?? "",
    gender: profile.gender ?? "",
    phoneNumber: profile.phoneNumber ?? "",
    dateOfBirth: formatDateInput(profile.dateOfBirth),
    currentLocation: profile.currentLocation ?? "",
    headline: profile.headline ?? "",
    bio: profile.bio ?? "",
    portfolio: profile.socialLinks?.portfolio ?? "",
    github: profile.socialLinks?.github ?? "",
    linkedin: profile.socialLinks?.linkedin ?? "",
    instagram: profile.socialLinks?.instagram ?? "",
    twitter: profile.socialLinks?.twitter ?? "",
  };
}

function toPayload(form: ProfileFormState): CreateProfileInput {
  return {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    phoneNumber: form.phoneNumber.trim(),
    dateOfBirth: form.dateOfBirth,
    currentLocation: form.currentLocation.trim(),
    headline: form.headline.trim(),
    ...(form.gender ? { gender: form.gender } : {}),
    bio: form.bio.trim(),
    socialLinks: {
      portfolio: form.portfolio.trim(),
      github: form.github.trim(),
      linkedin: form.linkedin.trim(),
      instagram: form.instagram.trim(),
      twitter: form.twitter.trim(),
    },
  };
}

function validateForm(form: ProfileFormState): string | undefined {
  if (!form.firstName.trim()) return "First name is required.";
  if (!form.lastName.trim()) return "Last name is required.";

  const phone = form.phoneNumber.trim();
  if (phone.length < 7 || phone.length > 25) {
    return "Phone number must contain between 7 and 25 characters.";
  }
  if (!/^\+?[0-9()\-\s]+$/.test(phone)) {
    return "Phone number format is invalid.";
  }

  if (!form.dateOfBirth) return "Date of birth is required.";
  const birthDate = new Date(`${form.dateOfBirth}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return "Date of birth is invalid.";
  if (birthDate > new Date()) return "Date of birth cannot be in the future.";

  const oldestAllowed = new Date();
  oldestAllowed.setFullYear(oldestAllowed.getFullYear() - 120);
  if (birthDate < oldestAllowed) return "Date of birth is outside the allowed range.";

  if (!form.currentLocation.trim()) return "Current location is required.";

  const urls = [
    form.portfolio,
    form.github,
    form.linkedin,
    form.instagram,
    form.twitter,
  ];
  for (const value of urls) {
    if (!value.trim()) continue;
    try {
      const url = new URL(value.trim());
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return "Social links must use HTTP or HTTPS.";
      }
    } catch {
      return "One or more social links are invalid.";
    }
  }

  return undefined;
}

function formatDateInput(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}
