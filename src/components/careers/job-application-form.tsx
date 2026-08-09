"use client";

import Link from "next/link";
import {
  useParams,
  useRouter,
} from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import { RequireAuth } from "@/src/components/auth/require-auth";
import { getApiErrorMessage } from "@/src/lib/api/error";
import { useGetMeQuery } from "@/src/lib/features/auth/auth-api";
import {
  useCheckJobApplicationDuplicateQuery,
  useCreateJobApplicationMutation,
} from "@/src/lib/features/job-applications/job-application-api";
import type {
  ApplicationEducation,
  ApplicationExperience,
  ApplicationPersonalInfo,
  ApplicationSocialLinks,
} from "@/src/lib/features/job-applications/job-application-types";
import { useGetJobBySlugQuery } from "@/src/lib/features/jobs/job-api";
import { useGetProfileQuery } from "@/src/lib/features/profiles/profile-api";

const emptyPersonal: ApplicationPersonalInfo = {
  firstName: "",
  lastName: "",
  gender: "",
  phoneNumber: "",
  dateOfBirth: "",
  currentLocation: "",
};

const emptyEducation = (): ApplicationEducation => ({
  schoolOrUniversity: "",
  degree: "",
  startDate: "",
  endDate: "",
  percentageOrCGPA: "",
});

const emptyExperience = (): ApplicationExperience => ({
  companyName: "",
  role: "",
  responsibilities: "",
  startDate: "",
  endDate: "",
});

export function JobApplicationPage() {
  return (
    <RequireAuth>
      <JobApplicationForm />
    </RequireAuth>
  );
}

function JobApplicationForm() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const jobQuery = useGetJobBySlugQuery(slug, {
    skip: !slug,
  });

  const job = jobQuery.data?.data;

  const meQuery = useGetMeQuery();
  const profileQuery = useGetProfileQuery();

  const duplicateQuery =
    useCheckJobApplicationDuplicateQuery(
      job?.id ?? "",
      {
        skip: !job?.id,
      },
    );

  const [
    createApplication,
    createState,
  ] = useCreateJobApplicationMutation();

  const [personal, setPersonal] =
    useState<ApplicationPersonalInfo>(
      emptyPersonal,
    );

  const [education, setEducation] = useState<
    ApplicationEducation[]
  >([emptyEducation()]);

  const [experience, setExperience] = useState<
    ApplicationExperience[]
  >([]);

  const [socialLinks, setSocialLinks] =
    useState<ApplicationSocialLinks>({});

  const [resume, setResume] = useState<File>();
  const [photo, setPhoto] = useState<File>();
  const [coverLetter, setCoverLetter] =
    useState<File>();

  const [
    declarationAccepted,
    setDeclarationAccepted,
  ] = useState(false);

  const [
    screeningAnswers,
    setScreeningAnswers,
  ] = useState<
    Record<
      string,
      string | string[] | number
    >
  >({});

  const [prefilled, setPrefilled] =
    useState(false);

  const [localError, setLocalError] =
    useState("");

  const [jsonOpen, setJsonOpen] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonMessage, setJsonMessage] = useState("");
  const jsonFileInput = useRef<HTMLInputElement>(null);

  const profile = profileQuery.data?.data;

  useEffect(() => {
    if (
      prefilled ||
      !meQuery.data?.data
    ) {
      return;
    }

    const user = meQuery.data.data;

    setPersonal((current) => ({
      ...current,
      email: user.email,
      ...(profile
        ? {
            firstName:
              profile.firstName,
            lastName:
              profile.lastName,
            gender:
              profile.gender ?? "",
            phoneNumber:
              profile.phoneNumber,
            dateOfBirth: dateInput(
              profile.dateOfBirth,
            ),
            currentLocation:
              profile.currentLocation,
          }
        : {}),
    }));

    if (profile?.socialLinks) {
      setSocialLinks(
        profile.socialLinks,
      );
    }

    if (profile?.education.length) {
      setEducation(
        profile.education.map(
          (item) => ({
            schoolOrUniversity:
              item.institution,
            degree: [
              item.degree,
              item.fieldOfStudy,
            ]
              .filter(Boolean)
              .join(" · "),
            startDate: dateInput(
              item.startDate,
            ),
            endDate: dateInput(
              item.endDate ??
                item.startDate,
            ),
            percentageOrCGPA:
              item.grade,
          }),
        ),
      );
    }

    if (profile?.experience.length) {
      setExperience(
        profile.experience.map(
          (item) => ({
            companyName:
              item.companyName,
            role: item.position,
            responsibilities:
              item.description ||
              item.achievements?.join(
                "\n",
              ) ||
              "Professional experience",
            startDate: dateInput(
              item.startDate,
            ),
            endDate: item.isCurrent
              ? undefined
              : dateInput(
                  item.endDate,
                ),
          }),
        ),
      );
    }

    setPrefilled(true);
  }, [
    meQuery.data,
    prefilled,
    profile,
  ]);

  const alreadyApplied =
    duplicateQuery.data?.data
      .isDuplicate;

  const busy = createState.isLoading;

  const errorMessage =
    localError ||
    (createState.error
      ? getApiErrorMessage(
          createState.error,
        )
      : "");

  const canSubmit = useMemo(
    () =>
      Boolean(
        job &&
          resume &&
          declarationAccepted &&
          education.length &&
          personal.firstName.trim() &&
          personal.lastName.trim() &&
          personal.gender.trim() &&
          personal.phoneNumber.trim() &&
          personal.dateOfBirth &&
          personal.currentLocation.trim() &&
          job.screeningQuestions.every(
            (question) =>
              !question.required ||
              hasScreeningAnswer(
                screeningAnswers[
                  question.question
                ],
              ),
          ),
      ),
    [
      declarationAccepted,
      education.length,
      job,
      personal,
      resume,
      screeningAnswers,
    ],
  );

  function importApplicationJson(raw = jsonText) {
    setJsonMessage("");
    try {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const source = objectRecord(parsed.data) || parsed;
      const importedPersonal = objectRecord(source.personalInfo) || objectRecord(source.personal) || {};
      const importedSocial = objectRecord(source.socialLinks) || {};
      const stringValue = (value: unknown, fallback = "") => typeof value === "string" ? value : fallback;
      const numberValue = (value: unknown) => typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : undefined;

      setPersonal((current) => ({
        ...current,
        firstName: stringValue(importedPersonal.firstName, current.firstName),
        lastName: stringValue(importedPersonal.lastName, current.lastName),
        gender: stringValue(importedPersonal.gender, current.gender),
        phoneNumber: stringValue(importedPersonal.phoneNumber, current.phoneNumber),
        dateOfBirth: dateInput(stringValue(importedPersonal.dateOfBirth)) || current.dateOfBirth,
        currentLocation: stringValue(importedPersonal.currentLocation, current.currentLocation),
      }));

      if (Array.isArray(source.education)) {
        const importedEducation = source.education.map((value) => {
          const item = objectRecord(value) || {};
          return {
            schoolOrUniversity: stringValue(item.schoolOrUniversity ?? item.institution),
            degree: stringValue(item.degree),
            startDate: dateInput(stringValue(item.startDate)),
            endDate: dateInput(stringValue(item.endDate ?? item.startDate)),
            percentageOrCGPA: stringValue(item.percentageOrCGPA ?? item.grade),
          } satisfies ApplicationEducation;
        }).filter((item) => item.schoolOrUniversity || item.degree);
        if (importedEducation.length) setEducation(importedEducation);
      }

      if (Array.isArray(source.experience)) {
        const importedExperience = source.experience.map((value) => {
          const item = objectRecord(value) || {};
          return {
            companyName: stringValue(item.companyName),
            role: stringValue(item.role ?? item.position),
            responsibilities: stringValue(item.responsibilities ?? item.description),
            startDate: dateInput(stringValue(item.startDate)),
            endDate: dateInput(stringValue(item.endDate)) || undefined,
            currentSalary: numberValue(item.currentSalary),
            expectedSalary: numberValue(item.expectedSalary),
          } satisfies ApplicationExperience;
        }).filter((item) => item.companyName || item.role);
        setExperience(importedExperience);
      }

      setSocialLinks((current) => ({
        ...current,
        portfolio: stringValue(importedSocial.portfolio, current.portfolio),
        github: stringValue(importedSocial.github, current.github),
        linkedin: stringValue(importedSocial.linkedin, current.linkedin),
        instagram: stringValue(importedSocial.instagram, current.instagram),
      }));

      const rawAnswers = source.screeningAnswers;
      if (Array.isArray(rawAnswers)) {
        const answers: Record<string, string | string[] | number> = {};
        rawAnswers.forEach((value) => {
          const item = objectRecord(value);
          if (item && typeof item.question === "string" && (typeof item.answer === "string" || typeof item.answer === "number" || Array.isArray(item.answer))) {
            answers[item.question] = item.answer as string | string[] | number;
          }
        });
        setScreeningAnswers((current) => ({ ...current, ...answers }));
      } else {
        const answerObject = objectRecord(rawAnswers);
        if (answerObject) setScreeningAnswers((current) => ({ ...current, ...answerObject as Record<string, string | string[] | number> }));
      }

      if (source.declarationAccepted === true) setDeclarationAccepted(true);
      setJsonOpen(false);
      setJsonMessage("Application JSON imported. Attach your resume and review every field before submitting.");
    } catch (caught) {
      setJsonMessage(caught instanceof Error ? caught.message : "Invalid JSON document.");
    }
  }

  async function importApplicationFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setJsonText(text);
    importApplicationJson(text);
    event.target.value = "";
  }

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setLocalError("");

    if (
      !job ||
      !resume ||
      !canSubmit
    ) {
      setLocalError(
        "Complete all required fields and attach your resume.",
      );

      return;
    }

    if (
      !validDocument(resume) ||
      (photo && !validImage(photo)) ||
      (coverLetter &&
        !validDocument(coverLetter))
    ) {
      setLocalError(
        "Resume and cover letter must be PDF/DOC/DOCX; an optional photo must be JPG, PNG, WEBP, GIF, or AVIF. Maximum size is 10 MB.",
      );

      return;
    }

    try {
      const response = await createApplication({
        jobId: job.id,
        personalInfo: personal,
        education: education.map(
          cleanEducation,
        ),
        experience: experience
          .filter((item) =>
            item.companyName.trim(),
          )
          .map(cleanExperience),
        socialLinks:
          cleanObject(socialLinks),
        screeningAnswers:
          job.screeningQuestions
            .filter((question) =>
              hasScreeningAnswer(
                screeningAnswers[
                  question.question
                ],
              ),
            )
            .map((question) => ({
              question:
                question.question,
              answer:
                screeningAnswers[
                  question.question
                ]!,
            })),
        declarationAccepted: true,
        resume,
        ...(photo ? { photo } : {}),
        ...(coverLetter
          ? { coverLetter }
          : {}),
      }).unwrap();

      const confirmationQueued = response.meta?.confirmationEmailQueued !== false;
      router.replace(
        `/profile/applications?submitted=1&emailQueued=${confirmationQueued ? "1" : "0"}`,
      );
    } catch {
      // Mutation error is displayed above the form.
    }
  }

  if (
    jobQuery.isLoading ||
    duplicateQuery.isLoading
  ) {
    return (
      <ApplicationShell>
        <div className="h-[520px] animate-pulse rounded-3xl bg-white/[0.04]" />
      </ApplicationShell>
    );
  }

  if (!job) {
    return (
      <ApplicationShell>
        <Message
          title="Role unavailable"
          description="This job is no longer available for applications."
          href="/job"
          action="Browse careers"
        />
      </ApplicationShell>
    );
  }

  if (alreadyApplied) {
    return (
      <ApplicationShell>
        <Message
          title="Application already submitted"
          description="Your account already has a job application. Open your profile to review its current status."
          href="/profile/applications"
          action="View my application"
        />
      </ApplicationShell>
    );
  }

  return (
    <ApplicationShell>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
          Apply to {job.company.name}
        </p>

        <h1 className="mt-3 text-3xl font-black sm:text-5xl">
          {job.title}
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Complete the form below.
          Your authenticated account
          email is used by the backend
          and cannot be replaced by
          form data.
        </p>
      </div>

      <div className="mb-6 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
        <input ref={jsonFileInput} type="file" accept="application/json,.json" className="hidden" onChange={(event) => void importApplicationFile(event)} />
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Fast autofill</p>
            <p className="mt-2 text-sm text-slate-400">Import or paste JSON to fill personal, education, experience, social-link, and screening-answer fields.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => jsonFileInput.current?.click()} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold transition hover:border-cyan-300/30">Import JSON</button>
            <button type="button" onClick={() => setJsonOpen((value) => !value)} className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950">Paste JSON</button>
          </div>
        </div>
        {jsonOpen ? <div className="mt-4 space-y-3"><textarea rows={10} value={jsonText} onChange={(event) => setJsonText(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#07101f] px-4 py-3 font-mono text-xs text-slate-100 outline-none focus:border-cyan-300/40" placeholder='{"personalInfo":{"firstName":"..."},"education":[...],"experience":[...]}' /><button type="button" onClick={() => importApplicationJson()} className="rounded-xl bg-cyan-300 px-5 py-2.5 text-sm font-black text-slate-950">Autofill application</button></div> : null}
        {jsonMessage ? <p className={`mt-3 text-sm ${jsonMessage.toLowerCase().includes("imported") ? "text-emerald-300" : "text-rose-300"}`}>{jsonMessage}</p> : null}
      </div>

      <form
        onSubmit={submit}
        className="space-y-6"
      >
        {errorMessage ? (
          <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.07] px-5 py-4 text-sm text-rose-100">
            {errorMessage}
          </div>
        ) : null}

        <FormSection
          title="Personal information"
          description="Required identity and contact details."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="First name"
              required
              value={
                personal.firstName
              }
              onChange={(value) =>
                setPersonal({
                  ...personal,
                  firstName: value,
                })
              }
            />

            <Field
              label="Last name"
              required
              value={
                personal.lastName
              }
              onChange={(value) =>
                setPersonal({
                  ...personal,
                  lastName: value,
                })
              }
            />

            <Field
              label="Email"
              value={
                meQuery.data?.data
                  .email ??
                personal.email ??
                ""
              }
              disabled
              onChange={() =>
                undefined
              }
            />

            <Field
              label="Phone number"
              required
              value={
                personal.phoneNumber
              }
              onChange={(value) =>
                setPersonal({
                  ...personal,
                  phoneNumber: value,
                })
              }
            />

            <SelectField
              label="Gender"
              required
              value={personal.gender}
              options={[
                "Male",
                "Female",
                "Other",
                "Prefer not to say",
              ]}
              onChange={(value) =>
                setPersonal({
                  ...personal,
                  gender: value,
                })
              }
            />

            <Field
              label="Date of birth"
              required
              type="date"
              value={
                personal.dateOfBirth
              }
              onChange={(value) =>
                setPersonal({
                  ...personal,
                  dateOfBirth: value,
                })
              }
            />

            <div className="md:col-span-2">
              <Field
                label="Current location"
                required
                value={
                  personal.currentLocation
                }
                onChange={(value) =>
                  setPersonal({
                    ...personal,
                    currentLocation:
                      value,
                  })
                }
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Education"
          description="At least one education record is required."
        >
          <div className="space-y-5">
            {education.map(
              (item, index) => (
                <CollectionCard
                  key={index}
                  title={`Education ${index + 1}`}
                  onRemove={
                    education.length > 1
                      ? () =>
                          setEducation(
                            education.filter(
                              (
                                _,
                                itemIndex,
                              ) =>
                                itemIndex !==
                                index,
                            ),
                          )
                      : undefined
                  }
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="School or university"
                      required
                      value={
                        item.schoolOrUniversity
                      }
                      onChange={(
                        value,
                      ) =>
                        updateEducation(
                          index,
                          {
                            schoolOrUniversity:
                              value,
                          },
                        )
                      }
                    />

                    <Field
                      label="Degree"
                      required
                      value={item.degree}
                      onChange={(
                        value,
                      ) =>
                        updateEducation(
                          index,
                          {
                            degree: value,
                          },
                        )
                      }
                    />

                    <Field
                      label="Start date"
                      required
                      type="date"
                      value={
                        item.startDate
                      }
                      onChange={(
                        value,
                      ) =>
                        updateEducation(
                          index,
                          {
                            startDate:
                              value,
                          },
                        )
                      }
                    />

                    <Field
                      label="End date"
                      required
                      type="date"
                      value={
                        item.endDate
                      }
                      onChange={(
                        value,
                      ) =>
                        updateEducation(
                          index,
                          {
                            endDate: value,
                          },
                        )
                      }
                    />

                    <div className="md:col-span-2">
                      <Field
                        label="Percentage or CGPA"
                        value={
                          item.percentageOrCGPA ??
                          ""
                        }
                        onChange={(
                          value,
                        ) =>
                          updateEducation(
                            index,
                            {
                              percentageOrCGPA:
                                value,
                            },
                          )
                        }
                      />
                    </div>
                  </div>
                </CollectionCard>
              ),
            )}
          </div>

          <AddButton
            onClick={() =>
              setEducation([
                ...education,
                emptyEducation(),
              ])
            }
          >
            Add education
          </AddButton>
        </FormSection>

        <FormSection
          title="Experience"
          description="Optional. Add each relevant professional role."
        >
          <div className="space-y-5">
            {experience.map(
              (item, index) => (
                <CollectionCard
                  key={index}
                  title={`Experience ${index + 1}`}
                  onRemove={() =>
                    setExperience(
                      experience.filter(
                        (
                          _,
                          itemIndex,
                        ) =>
                          itemIndex !==
                          index,
                      ),
                    )
                  }
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Company"
                      required
                      value={
                        item.companyName
                      }
                      onChange={(
                        value,
                      ) =>
                        updateExperience(
                          index,
                          {
                            companyName:
                              value,
                          },
                        )
                      }
                    />

                    <Field
                      label="Role"
                      required
                      value={item.role}
                      onChange={(
                        value,
                      ) =>
                        updateExperience(
                          index,
                          {
                            role: value,
                          },
                        )
                      }
                    />

                    <Field
                      label="Start date"
                      required
                      type="date"
                      value={
                        item.startDate
                      }
                      onChange={(
                        value,
                      ) =>
                        updateExperience(
                          index,
                          {
                            startDate:
                              value,
                          },
                        )
                      }
                    />

                    <Field
                      label="End date"
                      type="date"
                      value={
                        item.endDate ?? ""
                      }
                      onChange={(
                        value,
                      ) =>
                        updateExperience(
                          index,
                          {
                            endDate:
                              value ||
                              undefined,
                          },
                        )
                      }
                    />

                    <Field
                      label="Current salary"
                      type="number"
                      value={
                        item.currentSalary?.toString() ??
                        ""
                      }
                      onChange={(
                        value,
                      ) =>
                        updateExperience(
                          index,
                          {
                            currentSalary:
                              value
                                ? Number(
                                    value,
                                  )
                                : undefined,
                          },
                        )
                      }
                    />

                    <Field
                      label="Expected salary"
                      type="number"
                      value={
                        item.expectedSalary?.toString() ??
                        ""
                      }
                      onChange={(
                        value,
                      ) =>
                        updateExperience(
                          index,
                          {
                            expectedSalary:
                              value
                                ? Number(
                                    value,
                                  )
                                : undefined,
                          },
                        )
                      }
                    />

                    <div className="md:col-span-2">
                      <TextArea
                        label="Responsibilities"
                        required
                        value={
                          item.responsibilities
                        }
                        onChange={(
                          value,
                        ) =>
                          updateExperience(
                            index,
                            {
                              responsibilities:
                                value,
                            },
                          )
                        }
                      />
                    </div>
                  </div>
                </CollectionCard>
              ),
            )}
          </div>

          <AddButton
            onClick={() =>
              setExperience([
                ...experience,
                emptyExperience(),
              ])
            }
          >
            Add experience
          </AddButton>
        </FormSection>

        <FormSection
          title="Professional links"
          description="Optional portfolio and social profiles."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                "portfolio",
                "github",
                "linkedin",
                "instagram",
              ] as const
            ).map((key) => (
              <Field
                key={key}
                label={labelize(key)}
                type="url"
                value={
                  socialLinks[key] ??
                  ""
                }
                onChange={(value) =>
                  setSocialLinks({
                    ...socialLinks,
                    [key]: value,
                  })
                }
              />
            ))}
          </div>
        </FormSection>

        {job.screeningQuestions
          .length ? (
          <FormSection
            title="Screening questions"
            description="Answer the questions configured for this role."
          >
            <div className="space-y-5">
              {job.screeningQuestions.map(
                (question) => (
                  <ScreeningField
                    key={
                      question.question
                    }
                    question={question}
                    value={
                      screeningAnswers[
                        question
                          .question
                      ]
                    }
                    onChange={(
                      answer,
                    ) =>
                      setScreeningAnswers(
                        (current) => ({
                          ...current,
                          [question.question]:
                            answer,
                        }),
                      )
                    }
                  />
                ),
              )}
            </div>
          </FormSection>
        ) : null}

        <FormSection
          title="Documents"
          description="Private files are uploaded securely and served through signed URLs."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <FileField
              label="Resume"
              required
              accept=".pdf,.doc,.docx"
              file={resume}
              onChange={setResume}
            />

            <FileField
              label="Photo (optional)"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              file={photo}
              onChange={setPhoto}
            />

            <FileField
              label="Cover letter"
              accept=".pdf,.doc,.docx"
              file={coverLetter}
              onChange={
                setCoverLetter
              }
            />
          </div>
        </FormSection>

        <label className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-slate-300">
          <input
            type="checkbox"
            checked={
              declarationAccepted
            }
            onChange={(event) =>
              setDeclarationAccepted(
                event.target.checked,
              )
            }
            className="mt-1 h-4 w-4 accent-cyan-300"
          />

          <span>
            I confirm that the
            information provided is
            accurate and I authorize
            QuantumFinix to process it
            for recruitment purposes.
          </span>
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={
              !canSubmit || busy
            }
            className="rounded-xl bg-cyan-300 px-7 py-3.5 font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy
              ? "Submitting application…"
              : "Submit application"}
          </button>

          <Link
            href={`/job/${job.slug}`}
            className="rounded-xl border border-white/10 px-7 py-3.5 font-bold"
          >
            Review job
          </Link>
        </div>
      </form>
    </ApplicationShell>
  );

  function updateEducation(
    index: number,
    patch: Partial<ApplicationEducation>,
  ) {
    setEducation((items) =>
      items.map(
        (item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                ...patch,
              }
            : item,
      ),
    );
  }

  function updateExperience(
    index: number,
    patch: Partial<ApplicationExperience>,
  ) {
    setExperience((items) =>
      items.map(
        (item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                ...patch,
              }
            : item,
      ),
    );
  }
}

function ScreeningField({
  question,
  value,
  onChange,
}: {
  question: {
    question: string;
    type:
      | "text"
      | "textarea"
      | "radio"
      | "checkbox"
      | "number";
    required: boolean;
    options?: string[];
  };
  value?:
    | string
    | string[]
    | number;
  onChange: (
    value:
      | string
      | string[]
      | number,
  ) => void;
}) {
  const label = `${question.question}${
    question.required ? " *" : ""
  }`;

  if (question.type === "textarea") {
    return (
      <TextArea
        label={label}
        required={question.required}
        value={
          typeof value === "string"
            ? value
            : ""
        }
        onChange={onChange}
      />
    );
  }

  if (question.type === "radio") {
    return (
      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </legend>

        <div className="grid gap-2 sm:grid-cols-2">
          {(question.options ?? []).map(
            (option) => (
              <label
                key={option}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm"
              >
                <input
                  type="radio"
                  name={
                    question.question
                  }
                  required={
                    question.required
                  }
                  checked={
                    value === option
                  }
                  onChange={() =>
                    onChange(option)
                  }
                  className="accent-cyan-300"
                />

                {option}
              </label>
            ),
          )}
        </div>
      </fieldset>
    );
  }

  if (question.type === "checkbox") {
    const selected = Array.isArray(
      value,
    )
      ? value
      : [];

    return (
      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </legend>

        <div className="grid gap-2 sm:grid-cols-2">
          {(question.options ?? []).map(
            (option) => (
              <label
                key={option}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(
                    option,
                  )}
                  onChange={(event) =>
                    onChange(
                      event.target.checked
                        ? [
                            ...selected,
                            option,
                          ]
                        : selected.filter(
                            (item) =>
                              item !==
                              option,
                          ),
                    )
                  }
                  className="accent-cyan-300"
                />

                {option}
              </label>
            ),
          )}
        </div>

        {question.required &&
        selected.length === 0 ? (
          <p className="mt-2 text-xs text-slate-500">
            Select at least one
            option.
          </p>
        ) : null}
      </fieldset>
    );
  }

  return (
    <Field
      label={label}
      required={question.required}
      type={
        question.type === "number"
          ? "number"
          : "text"
      }
      value={
        value === undefined
          ? ""
          : String(value)
      }
      onChange={(next) =>
        onChange(
          question.type === "number" &&
            next !== ""
            ? Number(next)
            : next,
        )
      }
    />
  );
}

function hasScreeningAnswer(
  value:
    | string
    | string[]
    | number
    | undefined,
): boolean {
  if (value === undefined) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return (
    typeof value === "number" ||
    value.trim().length > 0
  );
}

function ApplicationShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#030712] pb-20 pt-28 text-white">
      <main className="mx-auto max-w-5xl px-5 sm:px-8">
        {children}
      </main>
    </div>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
      <h2 className="text-xl font-black">
        {title}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
        {required ? " *" : ""}
      </span>

      <input
        required={required}
        disabled={disabled}
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="h-12 w-full rounded-xl border border-white/10 bg-[#07101f] px-4 text-sm outline-none transition focus:border-cyan-300/50 disabled:opacity-60"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  required,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
        {required ? " *" : ""}
      </span>

      <select
        required={required}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="h-12 w-full rounded-xl border border-white/10 bg-[#07101f] px-4 text-sm outline-none focus:border-cyan-300/50"
      >
        <option value="">
          Select
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
        {required ? " *" : ""}
      </span>

      <textarea
        required={required}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        rows={4}
        className="w-full rounded-xl border border-white/10 bg-[#07101f] px-4 py-3 text-sm outline-none focus:border-cyan-300/50"
      />
    </label>
  );
}

function FileField({
  label,
  file,
  onChange,
  accept,
  required,
}: {
  label: string;
  file?: File;
  onChange: (
    file: File | undefined,
  ) => void;
  accept: string;
  required?: boolean;
}) {
  return (
    <label className="block rounded-2xl border border-dashed border-white/15 bg-black/20 p-4">
      <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
        {required ? " *" : ""}
      </span>

      <input
        required={required}
        type="file"
        accept={accept}
        onChange={(event) =>
          onChange(
            event.target.files?.[0],
          )
        }
        className="mt-4 block w-full text-xs text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-300 file:px-3 file:py-2 file:font-bold file:text-slate-950"
      />

      {file ? (
        <p className="mt-3 truncate text-xs text-cyan-200">
          {file.name} ·{" "}
          {(
            file.size /
            1024 /
            1024
          ).toFixed(2)}{" "}
          MB
        </p>
      ) : null}
    </label>
  );
}

function CollectionCard({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove?: () => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">
          {title}
        </h3>

        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-bold text-rose-300"
          >
            Remove
          </button>
        ) : null}
      </div>

      {children}
    </div>
  );
}

function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2.5 text-sm font-bold text-cyan-200"
    >
      + {children}
    </button>
  );
}

function Message({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
      <h1 className="text-3xl font-black">
        {title}
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-slate-400">
        {description}
      </p>

      <Link
        href={href}
        className="mt-6 inline-flex rounded-xl bg-cyan-300 px-6 py-3 font-bold text-slate-950"
      >
        {action}
      </Link>
    </div>
  );
}


function objectRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
}

function dateInput(
  value?: string,
) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  return Number.isNaN(
    date.getTime(),
  )
    ? ""
    : date
        .toISOString()
        .slice(0, 10);
}

function validDocument(
  file: File,
) {
  return (
    file.size <=
      10 * 1024 * 1024 &&
    [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.type)
  );
}

function validImage(file: File) {
  return (
    file.size <=
      10 * 1024 * 1024 &&
    [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/avif",
    ].includes(file.type)
  );
}

function cleanObject<T extends object>(
  value: T,
): T {
  return Object.fromEntries(
    Object.entries(value).filter(
      ([, item]) =>
        typeof item === "string" &&
        item.trim().length > 0,
    ),
  ) as T;
}

function cleanEducation(
  value: ApplicationEducation,
): ApplicationEducation {
  return {
    ...value,
    ...(value.percentageOrCGPA?.trim()
      ? {}
      : {
          percentageOrCGPA:
            undefined,
        }),
  };
}

function cleanExperience(
  value: ApplicationExperience,
): ApplicationExperience {
  return {
    ...value,
    ...(value.endDate
      ? {}
      : {
          endDate: undefined,
        }),
    ...(value.currentSalary != null
      ? {}
      : {
          currentSalary:
            undefined,
        }),
    ...(value.expectedSalary != null
      ? {}
      : {
          expectedSalary:
            undefined,
        }),
  };
}

function labelize(
  value: string,
) {
  return (
    value
      .charAt(0)
      .toUpperCase() +
    value.slice(1)
  );
}