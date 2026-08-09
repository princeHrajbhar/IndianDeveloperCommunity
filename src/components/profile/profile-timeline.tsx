"use client";

import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";

import {
  Field,
  Panel,
  PanelHeader,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
} from "@/src/components/profile/profile-ui";
import { getApiErrorMessage } from "@/src/lib/api/error";
import {
  useAddEducationMutation,
  useAddExperienceMutation,
  useDeleteEducationMutation,
  useDeleteExperienceMutation,
  useUpdateEducationMutation,
  useUpdateExperienceMutation,
} from "@/src/lib/features/profiles/profile-api";
import type {
  Education,
  EducationInput,
  Experience,
  ExperienceInput,
  Profile,
} from "@/src/lib/features/profiles/profile-types";

interface EducationFormState {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  grade: string;
  description: string;
}

interface ExperienceFormState {
  companyName: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  achievements: string;
}

const EMPTY_EDUCATION: EducationFormState = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  grade: "",
  description: "",
};

const EMPTY_EXPERIENCE: ExperienceFormState = {
  companyName: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  achievements: "",
};

export function EducationPanel({
  profile,
  onProfileChange,
  onMessage,
  onError,
  userId,
}: TimelineProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string>();
  const [form, setForm] = useState<EducationFormState>(EMPTY_EDUCATION);
  const [localError, setLocalError] = useState("");

  const [addEducation, addState] = useAddEducationMutation();
  const [updateEducation, updateState] = useUpdateEducationMutation();
  const [deleteEducation, deleteState] = useDeleteEducationMutation();
  const busy = addState.isLoading || updateState.isLoading || deleteState.isLoading;

  function openCreate() {
    setEditingId(undefined);
    setForm(EMPTY_EDUCATION);
    setLocalError("");
    setFormOpen(true);
  }

  function openEdit(entry: Education) {
    if (!entry._id) return;
    setEditingId(entry._id);
    setForm({
      institution: entry.institution,
      degree: entry.degree,
      fieldOfStudy: entry.fieldOfStudy,
      startDate: dateInput(entry.startDate),
      endDate: entry.endDate ? dateInput(entry.endDate) : "",
      isCurrent: entry.isCurrent,
      grade: entry.grade ?? "",
      description: entry.description ?? "",
    });
    setLocalError("");
    setFormOpen(true);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateTimeline(form.startDate, form.endDate, form.isCurrent);
    if (validation) {
      setLocalError(validation);
      return;
    }

    const body: EducationInput = {
      institution: form.institution.trim(),
      degree: form.degree.trim(),
      fieldOfStudy: form.fieldOfStudy.trim(),
      startDate: form.startDate,
      ...(form.isCurrent || !form.endDate ? {} : { endDate: form.endDate }),
      isCurrent: form.isCurrent,
      grade: form.grade.trim(),
      description: form.description.trim(),
    };

    try {
      const response = editingId
        ? await updateEducation({ educationId: editingId, body, userId }).unwrap()
        : await addEducation({ body, userId }).unwrap();
      onProfileChange(response.data);
      onMessage(editingId ? "Education updated successfully." : "Education added successfully.");
      closeForm();
    } catch (error) {
      const message = getApiErrorMessage(error);
      setLocalError(message);
      onError(message);
    }
  }

  async function remove(entry: Education) {
    if (!entry._id || !window.confirm(`Delete ${entry.degree} from your profile?`)) return;
    try {
      const response = await deleteEducation({ educationId: entry._id, userId }).unwrap();
      onProfileChange(response.data);
      onMessage("Education removed successfully.");
    } catch (error) {
      onError(getApiErrorMessage(error));
    }
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(undefined);
    setForm(EMPTY_EDUCATION);
    setLocalError("");
  }

  return (
    <Panel delay={0.15}>
      <PanelHeader
        title="Education"
        description="Add, edit or remove your academic background."
        action={
          !formOpen ? (
            <PrimaryButton type="button" onClick={openCreate}>
              Add education
            </PrimaryButton>
          ) : null
        }
      />

      {formOpen ? (
        <EducationForm
          form={form}
          setForm={setForm}
          error={localError}
          busy={busy}
          editing={Boolean(editingId)}
          onSubmit={submit}
          onCancel={closeForm}
        />
      ) : profile.education.length > 0 ? (
        <div className="divide-y divide-white/[0.07]">
          {profile.education.map((entry, index) => (
            <TimelineEntry
              key={entry._id ?? `${entry.institution}-${index}`}
              title={entry.degree}
              subtitle={`${entry.institution} · ${entry.fieldOfStudy}`}
              period={formatPeriod(entry.startDate, entry.endDate, entry.isCurrent)}
              meta={entry.grade}
              description={entry.description}
              onEdit={() => openEdit(entry)}
              onDelete={() => remove(entry)}
              busy={busy}
            />
          ))}
        </div>
      ) : (
        <TimelineEmpty
          title="No education added"
          description="Add your school, university or professional qualification."
          actionLabel="Add education"
          onAction={openCreate}
        />
      )}
    </Panel>
  );
}

export function ExperiencePanel({
  profile,
  onProfileChange,
  onMessage,
  onError,
  userId,
}: TimelineProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string>();
  const [form, setForm] = useState<ExperienceFormState>(EMPTY_EXPERIENCE);
  const [localError, setLocalError] = useState("");

  const [addExperience, addState] = useAddExperienceMutation();
  const [updateExperience, updateState] = useUpdateExperienceMutation();
  const [deleteExperience, deleteState] = useDeleteExperienceMutation();
  const busy = addState.isLoading || updateState.isLoading || deleteState.isLoading;

  function openCreate() {
    setEditingId(undefined);
    setForm(EMPTY_EXPERIENCE);
    setLocalError("");
    setFormOpen(true);
  }

  function openEdit(entry: Experience) {
    if (!entry._id) return;
    setEditingId(entry._id);
    setForm({
      companyName: entry.companyName,
      position: entry.position,
      location: entry.location ?? "",
      startDate: dateInput(entry.startDate),
      endDate: entry.endDate ? dateInput(entry.endDate) : "",
      isCurrent: entry.isCurrent,
      description: entry.description ?? "",
      achievements: (entry.achievements ?? []).join("\n"),
    });
    setLocalError("");
    setFormOpen(true);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateTimeline(form.startDate, form.endDate, form.isCurrent);
    if (validation) {
      setLocalError(validation);
      return;
    }

    const achievements = uniqueLines(form.achievements);
    const body: ExperienceInput = {
      companyName: form.companyName.trim(),
      position: form.position.trim(),
      location: form.location.trim(),
      startDate: form.startDate,
      ...(form.isCurrent || !form.endDate ? {} : { endDate: form.endDate }),
      isCurrent: form.isCurrent,
      description: form.description.trim(),
      achievements,
    };

    try {
      const response = editingId
        ? await updateExperience({ experienceId: editingId, body, userId }).unwrap()
        : await addExperience({ body, userId }).unwrap();
      onProfileChange(response.data);
      onMessage(editingId ? "Experience updated successfully." : "Experience added successfully.");
      closeForm();
    } catch (error) {
      const message = getApiErrorMessage(error);
      setLocalError(message);
      onError(message);
    }
  }

  async function remove(entry: Experience) {
    if (!entry._id || !window.confirm(`Delete ${entry.position} from your profile?`)) return;
    try {
      const response = await deleteExperience({ experienceId: entry._id, userId }).unwrap();
      onProfileChange(response.data);
      onMessage("Experience removed successfully.");
    } catch (error) {
      onError(getApiErrorMessage(error));
    }
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(undefined);
    setForm(EMPTY_EXPERIENCE);
    setLocalError("");
  }

  return (
    <Panel delay={0.2}>
      <PanelHeader
        title="Experience"
        description="Maintain your employment and professional project history."
        action={
          !formOpen ? (
            <PrimaryButton type="button" onClick={openCreate}>
              Add experience
            </PrimaryButton>
          ) : null
        }
      />

      {formOpen ? (
        <ExperienceForm
          form={form}
          setForm={setForm}
          error={localError}
          busy={busy}
          editing={Boolean(editingId)}
          onSubmit={submit}
          onCancel={closeForm}
        />
      ) : profile.experience.length > 0 ? (
        <div className="divide-y divide-white/[0.07]">
          {profile.experience.map((entry, index) => (
            <TimelineEntry
              key={entry._id ?? `${entry.companyName}-${index}`}
              title={entry.position}
              subtitle={`${entry.companyName}${entry.location ? ` · ${entry.location}` : ""}`}
              period={formatPeriod(entry.startDate, entry.endDate, entry.isCurrent)}
              description={entry.description}
              bullets={entry.achievements}
              onEdit={() => openEdit(entry)}
              onDelete={() => remove(entry)}
              busy={busy}
            />
          ))}
        </div>
      ) : (
        <TimelineEmpty
          title="No experience added"
          description="Add current or previous work experience to strengthen your profile."
          actionLabel="Add experience"
          onAction={openCreate}
        />
      )}
    </Panel>
  );
}

interface TimelineProps {
  profile: Profile;
  userId?: string;
  onProfileChange: (profile: Profile) => void;
  onMessage: (message: string) => void;
  onError: (message: string) => void;
}

function EducationForm({
  form,
  setForm,
  error,
  busy,
  editing,
  onSubmit,
  onCancel,
}: {
  form: EducationFormState;
  setForm: Dispatch<SetStateAction<EducationFormState>>;
  error: string;
  busy: boolean;
  editing: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5 p-5 sm:p-6">
      {error ? <InlineError message={error} /> : null}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Institution">
          <input className={inputClass} required maxLength={150} value={form.institution} onChange={(event) => setForm((current) => ({ ...current, institution: event.target.value }))} />
        </Field>
        <Field label="Degree">
          <input className={inputClass} required maxLength={120} value={form.degree} onChange={(event) => setForm((current) => ({ ...current, degree: event.target.value }))} />
        </Field>
        <Field label="Field of study">
          <input className={inputClass} required maxLength={120} value={form.fieldOfStudy} onChange={(event) => setForm((current) => ({ ...current, fieldOfStudy: event.target.value }))} />
        </Field>
        <Field label="Grade / score">
          <input className={inputClass} maxLength={50} value={form.grade} onChange={(event) => setForm((current) => ({ ...current, grade: event.target.value }))} />
        </Field>
        <Field label="Start date">
          <input className={inputClass} required type="date" value={form.startDate} onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))} />
        </Field>
        <Field label="End date">
          <input className={`${inputClass} disabled:opacity-50`} type="date" disabled={form.isCurrent} value={form.endDate} onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))} />
        </Field>
        <label className="flex items-center gap-3 md:col-span-2">
          <input type="checkbox" checked={form.isCurrent} onChange={(event) => setForm((current) => ({ ...current, isCurrent: event.target.checked, endDate: event.target.checked ? "" : current.endDate }))} className="h-4 w-4 accent-cyan-300" />
          <span className="text-sm text-slate-300">I currently study here</span>
        </label>
        <div className="md:col-span-2">
          <Field label="Description">
            <textarea className={textareaClass} maxLength={1500} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
          </Field>
        </div>
      </div>
      <FormActions busy={busy} saveLabel={editing ? "Update education" : "Add education"} onCancel={onCancel} />
    </form>
  );
}

function ExperienceForm({
  form,
  setForm,
  error,
  busy,
  editing,
  onSubmit,
  onCancel,
}: {
  form: ExperienceFormState;
  setForm: Dispatch<SetStateAction<ExperienceFormState>>;
  error: string;
  busy: boolean;
  editing: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5 p-5 sm:p-6">
      {error ? <InlineError message={error} /> : null}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company name">
          <input className={inputClass} required maxLength={150} value={form.companyName} onChange={(event) => setForm((current) => ({ ...current, companyName: event.target.value }))} />
        </Field>
        <Field label="Position">
          <input className={inputClass} required maxLength={120} value={form.position} onChange={(event) => setForm((current) => ({ ...current, position: event.target.value }))} />
        </Field>
        <Field label="Location">
          <input className={inputClass} maxLength={150} value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} />
        </Field>
        <div className="hidden md:block" />
        <Field label="Start date">
          <input className={inputClass} required type="date" value={form.startDate} onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))} />
        </Field>
        <Field label="End date">
          <input className={`${inputClass} disabled:opacity-50`} type="date" disabled={form.isCurrent} value={form.endDate} onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))} />
        </Field>
        <label className="flex items-center gap-3 md:col-span-2">
          <input type="checkbox" checked={form.isCurrent} onChange={(event) => setForm((current) => ({ ...current, isCurrent: event.target.checked, endDate: event.target.checked ? "" : current.endDate }))} className="h-4 w-4 accent-cyan-300" />
          <span className="text-sm text-slate-300">I currently work here</span>
        </label>
        <div className="md:col-span-2">
          <Field label="Description">
            <textarea className={textareaClass} maxLength={2000} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Achievements" hint="Add one achievement per line. Maximum 20.">
            <textarea className={textareaClass} value={form.achievements} onChange={(event) => setForm((current) => ({ ...current, achievements: event.target.value }))} />
          </Field>
        </div>
      </div>
      <FormActions busy={busy} saveLabel={editing ? "Update experience" : "Add experience"} onCancel={onCancel} />
    </form>
  );
}

function TimelineEntry({
  title,
  subtitle,
  period,
  meta,
  description,
  bullets,
  onEdit,
  onDelete,
  busy,
}: {
  title: string;
  subtitle: string;
  period: string;
  meta?: string;
  description?: string;
  bullets?: string[];
  onEdit: () => void;
  onDelete: () => void;
  busy: boolean;
}) {
  return (
    <article className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm text-cyan-200/75">{subtitle}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span>{period}</span>
            {meta ? <span>{meta}</span> : null}
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" disabled={busy} onClick={onEdit} className="h-9 rounded-lg border border-white/[0.1] px-3 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/25 hover:text-cyan-200 disabled:opacity-50">Edit</button>
          <button type="button" disabled={busy} onClick={onDelete} className="h-9 rounded-lg border border-rose-300/15 px-3 text-xs font-semibold text-rose-200 transition hover:bg-rose-300/[0.06] disabled:opacity-50">Delete</button>
        </div>
      </div>
      {description ? <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400">{description}</p> : null}
      {bullets?.length ? (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-sm leading-6 text-slate-400"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70" />{bullet}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function TimelineEmpty({ title, description, actionLabel, onAction }: { title: string; description: string; actionLabel: string; onAction: () => void }) {
  return (
    <div className="px-6 py-12 text-center">
      <span className="mx-auto block h-11 w-11 rounded-full border border-dashed border-cyan-300/30" />
      <h3 className="mt-5 font-bold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">{description}</p>
      <PrimaryButton type="button" className="mt-6" onClick={onAction}>{actionLabel}</PrimaryButton>
    </div>
  );
}

function FormActions({ busy, saveLabel, onCancel }: { busy: boolean; saveLabel: string; onCancel: () => void }) {
  return (
    <div className="flex justify-end gap-2">
      <SecondaryButton type="button" disabled={busy} onClick={onCancel}>Cancel</SecondaryButton>
      <PrimaryButton type="submit" disabled={busy}>{busy ? "Saving..." : saveLabel}</PrimaryButton>
    </div>
  );
}

function InlineError({ message }: { message: string }) {
  return <div role="alert" className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-200">{message}</div>;
}

function validateTimeline(startDate: string, endDate: string, isCurrent: boolean): string | undefined {
  if (!startDate) return "Start date is required.";
  if (isCurrent && endDate) return "A current entry cannot have an end date.";
  if (endDate && new Date(startDate) > new Date(endDate)) return "End date must be on or after start date.";
  return undefined;
}

function uniqueLines(value: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const line of value.split(/\n|,/)) {
    const item = line.trim();
    const key = item.toLocaleLowerCase();
    if (!item || seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result.slice(0, 20);
}

function dateInput(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function formatPeriod(start: string, end: string | undefined, current: boolean): string {
  return `${formatMonth(start)} — ${current ? "Present" : end ? formatMonth(end) : "Not specified"}`;
}

function formatMonth(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Unknown" : date.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}
