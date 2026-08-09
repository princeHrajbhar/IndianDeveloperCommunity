"use client";

import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { getApiErrorMessage } from "@/src/lib/api/error";
import { useCreateLeadMutation } from "@/src/lib/features/leads/lead-api";
import type { ContactPreference } from "@/src/lib/features/leads/lead-types";

type ContactLeadFormProps = {
  defaultPurpose?: string;
  submitLabel?: string;
};

type FormValues = {
  name: string;
  phone: string;
  email: string;
  location: string;
  contactPreference: ContactPreference;
  purpose: string;
};

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  location: "",
  contactPreference: "Email",
  purpose: "",
};

/**
 * Public component used by both:
 * - /contact
 * - /book-consultation
 *
 * The component that calls useSearchParams() must be rendered
 * inside this Suspense boundary during production prerendering.
 */
export function ContactLeadForm(
  props: ContactLeadFormProps,
) {
  return (
    <Suspense fallback={<ContactLeadFormLoading />}>
      <ContactLeadFormContent {...props} />
    </Suspense>
  );
}

function ContactLeadFormContent({
  defaultPurpose = "",
  submitLabel = "Send enquiry",
}: ContactLeadFormProps) {
  const searchParams = useSearchParams();

  const subjectFromUrl =
    searchParams.get("subject")?.trim() ?? "";

  const initialPurpose =
    subjectFromUrl || defaultPurpose;

  const [values, setValues] = useState<FormValues>({
    ...initialValues,
    purpose: initialPurpose,
  });

  const [createLead, { isLoading }] =
    useCreateLeadMutation();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const tracking = useMemo(() => {
    const value = (key: string) =>
      searchParams.get(key)?.trim() || undefined;

    return {
      utmSource: value("utm_source"),
      utmMedium: value("utm_medium"),
      utmCampaign: value("utm_campaign"),
      utmTerm: value("utm_term"),
      utmContent: value("utm_content"),
    };
  }, [searchParams]);

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      const pageUrl = window.location.href;
      const pagePath = window.location.pathname;
      const referrerUrl =
        document.referrer || undefined;

      await createLead({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim().toLowerCase(),
        location: values.location.trim(),
        purpose: values.purpose.trim(),
        contactPreference:
          values.contactPreference,
        pageUrl,
        pagePath,
        tracking: {
          ...tracking,
          ...(referrerUrl
            ? { referrerUrl }
            : {}),
        },
      }).unwrap();

      setSuccess(
        "Your enquiry has been submitted. The QuantumFinix team will contact you soon.",
      );

      setValues({
        ...initialValues,
        purpose: initialPurpose,
      });
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError),
      );
    }
  }

  function update<K extends keyof FormValues>(
    key: K,
    value: FormValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          htmlFor="contact-name"
        >
          <input
            id="contact-name"
            type="text"
            required
            maxLength={120}
            value={values.name}
            onChange={(event) =>
              update(
                "name",
                event.target.value,
              )
            }
            className={inputClass}
            placeholder="Your name"
          />
        </Field>

        <Field
          label="Email"
          htmlFor="contact-email"
        >
          <input
            id="contact-email"
            type="email"
            required
            maxLength={254}
            value={values.email}
            onChange={(event) =>
              update(
                "email",
                event.target.value,
              )
            }
            className={inputClass}
            placeholder="you@example.com"
          />
        </Field>

        <Field
          label="Phone"
          htmlFor="contact-phone"
        >
          <input
            id="contact-phone"
            type="tel"
            required
            minLength={7}
            maxLength={30}
            value={values.phone}
            onChange={(event) =>
              update(
                "phone",
                event.target.value,
              )
            }
            className={inputClass}
            placeholder="+91 00000 00000"
          />
        </Field>

        <Field
          label="Location"
          htmlFor="contact-location"
        >
          <input
            id="contact-location"
            type="text"
            required
            maxLength={300}
            value={values.location}
            onChange={(event) =>
              update(
                "location",
                event.target.value,
              )
            }
            className={inputClass}
            placeholder="City, country"
          />
        </Field>

        <Field
          label="Preferred contact"
          htmlFor="contact-preference"
        >
          <select
            id="contact-preference"
            value={values.contactPreference}
            onChange={(event) =>
              update(
                "contactPreference",
                event.target
                  .value as ContactPreference,
              )
            }
            className={inputClass}
          >
            <option value="Any">
              Any
            </option>

            <option value="Email">
              Email
            </option>

            <option value="Phone">
              Phone
            </option>

            <option value="WhatsApp">
              WhatsApp
            </option>
          </select>
        </Field>

        <div
          className="hidden sm:block"
          aria-hidden="true"
        />

        <div className="sm:col-span-2">
          <Field
            label="How can we help?"
            htmlFor="contact-purpose"
          >
            <textarea
              id="contact-purpose"
              required
              maxLength={3000}
              rows={7}
              value={values.purpose}
              onChange={(event) =>
                update(
                  "purpose",
                  event.target.value,
                )
              }
              className={`${inputClass} min-h-40 resize-y py-3`}
              placeholder="Tell us about your project, challenge, timeline, or consultation request."
            />
          </Field>
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-100"
        >
          {error}
        </p>
      ) : null}

      {success ? (
        <p
          role="status"
          className="mt-5 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] px-4 py-3 text-sm text-emerald-100"
        >
          {success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-6 text-sm font-bold text-[#020711] shadow-[0_0_35px_rgba(34,211,238,0.2)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isLoading
          ? "Submitting…"
          : submitLabel}
      </button>
    </form>
  );
}

function ContactLeadFormLoading() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="h-20 animate-pulse rounded-xl bg-white/[0.05]"
          />
        ))}

        <div
          className="hidden sm:block"
          aria-hidden="true"
        />

        <div className="h-48 animate-pulse rounded-xl bg-white/[0.05] sm:col-span-2" />
      </div>

      <div className="mt-6 h-12 w-full animate-pulse rounded-full bg-white/[0.06] sm:w-44" />
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block"
    >
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </span>

      {children}
    </label>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-white/10 bg-[#030712]/75 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-300/10";