"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { SECTION_IDS, SITE_CONFIG } from "@/lib/constants";
import {
  CONTACT_LIMITS,
  PROJECT_TYPES,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactPayload,
  type ContactResponse,
  type ProjectType,
} from "@/lib/contact";
import Button from "@/components/ui/Button";
import { useCopy } from "@/i18n/useCopy";
import { PREFILL_EVENT, type PrefillDetail } from "@/lib/prefill";
import { CONTACT_COPY, type RequiredField } from "./copy";

type FailureReason = "send_failed" | "not_configured" | "rate_limited" | "network";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; reason: FailureReason };

type SystemType = Exclude<ProjectType, "custom" | "other">;

const EMPTY: ContactPayload = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
  website: "",
};

const SYSTEM_TYPES = PROJECT_TYPES.filter(
  (type): type is SystemType => type !== "custom" && type !== "other",
);

const FIELD_ORDER: ContactField[] = ["name", "email", "company", "projectType", "message"];

const REQUIRED_FIELDS: readonly RequiredField[] = ["name", "email", "message"];

const isRequiredField = (field: ContactField): field is RequiredField =>
  (REQUIRED_FIELDS as readonly ContactField[]).includes(field);

const HEADING_ID = "contact-title";

export default function Contact() {
  const c = useCopy(CONTACT_COPY);
  const [form, setForm] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const restartRef = useRef(false);
  /** Set by a prefill: after the next render, focus the first empty required field. */
  const prefillFocusRef = useRef(false);
  const uid = useId();

  const id = (field: string) => `${uid}-${field}`;

  // Another section (a system's "request a demo", the hero field) hands over the
  // system and a starting message. The caller does the scrolling.
  // System pages link to "/?demo=<id>#contacto": preselect that system once on load.
  useEffect(() => {
    const demo = new URLSearchParams(window.location.search).get("demo");
    const system = PROJECT_TYPES.find((type) => type === demo);
    if (!system) return;
    setForm((prev) => ({ ...prev, projectType: prev.projectType || system }));
  }, []);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<PrefillDetail>).detail;
      setForm((prev) => ({
        ...prev,
        projectType: detail.system ?? prev.projectType,
        message: prev.message.trim() ? prev.message : detail.message,
      }));
      setErrors((prev) => {
        const next = { ...prev };
        if (detail.system) delete next.projectType;
        delete next.message;
        return next;
      });
      setStatus((prev) => (prev.kind === "sent" ? { kind: "idle" } : prev));
      restartRef.current = false;
      prefillFocusRef.current = true;
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    if (!prefillFocusRef.current) return;
    prefillFocusRef.current = false;
    const empty = REQUIRED_FIELDS.find((field) => form[field].trim() === "");
    if (!empty) return;
    formRef.current
      ?.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-${empty}`)}`)
      ?.focus({ preventScroll: true });
  }, [form, status.kind, uid]);

  // The form unmounts on success: move focus to the confirmation, and back to
  // the first field when the visitor starts another request.
  useEffect(() => {
    if (status.kind === "sent") {
      successRef.current?.focus();
    } else if (status.kind === "idle" && restartRef.current) {
      restartRef.current = false;
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-name`)}`)?.focus();
    }
  }, [status.kind, uid]);

  const update = (field: keyof ContactPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field !== "website" && errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Check a field the visitor has filled in as soon as they leave it; empty fields
  // wait for submit so tabbing through the form doesn't light up errors.
  const validateOnBlur = (field: "email" | "message") => {
    if (form[field].trim() === "") return;
    const code = validateContact(form)[field];
    setErrors((prev) => {
      const next = { ...prev };
      if (code) next[field] = code;
      else delete next[field];
      return next;
    });
  };

  const focusSubmit = () => {
    const submit = formRef.current?.querySelector<HTMLElement>('button[type="submit"]');
    if (submit && document.activeElement !== submit) submit.focus();
  };

  const focusFirstError = (found: ContactErrors) => {
    const first = FIELD_ORDER.find((f) => found[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "sending") return;

    const found = validateContact(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as ContactResponse;
      if (data.ok) {
        setStatus({ kind: "sent" });
        setForm(EMPTY);
        return;
      }
      if (data.error === "validation") {
        setErrors(data.fields);
        setStatus({ kind: "idle" });
        focusFirstError(data.fields);
        return;
      }
      setStatus({ kind: "failed", reason: data.error === "bad_request" ? "send_failed" : data.error });
      focusSubmit();
    } catch {
      setStatus({ kind: "failed", reason: "network" });
      focusSubmit();
    }
  };

  const startAnother = () => {
    restartRef.current = true;
    setErrors({});
    setStatus({ kind: "idle" });
  };

  const fieldClasses = (field: ContactField, muted = false) =>
    `block w-full rounded-lg border bg-surface px-4 text-[1.0625rem] leading-[1.5] ${muted ? "text-mist-dim" : "text-parchment"} transition-colors duration-150 ease-[ease] placeholder:text-mist-dim hover:border-mist focus:border-bronze-bright ${
      errors[field] ? "border-state-error hover:border-state-error" : "border-field"
    }`;

  const describedBy = (field: ContactField, extra?: string) =>
    [errors[field] ? id(`${field}-error`) : null, extra ?? null].filter(Boolean).join(" ") || undefined;

  const label = (field: ContactField, text: string, optional = false): ReactNode => (
    <label htmlFor={id(field)} className="mb-2 block text-[0.9375rem] font-medium text-parchment">
      {text}
      {optional && <span className="font-normal text-mist"> ({c.optional})</span>}
    </label>
  );

  const errorText = (field: ContactField): string | null => {
    const code = errors[field];
    if (!code) return null;
    if (code !== "required") return c.errors[code];
    return isRequiredField(field) ? c.errors.required[field] : null;
  };

  const errorLine = (field: ContactField) => {
    const text = errorText(field);
    return text ? (
      <p id={id(`${field}-error`)} className="mt-2 text-[0.9375rem] leading-snug text-state-error">
        {text}
      </p>
    ) : null;
  };

  const mailto = `mailto:${SITE_CONFIG.email}`;
  const messageCount = form.message.length;
  const showCount = messageCount > CONTACT_LIMITS.message * 0.85;
  const sending = status.kind === "sending";

  return (
    <section
      id={SECTION_IDS.contact}
      aria-labelledby={HEADING_ID}
      className="border-t border-line py-24 md:py-32"
    >
      <div className="page">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="max-w-[32rem]">
            <h2
              id={HEADING_ID}
              className="text-[clamp(2rem,4.2vw,2.875rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-parchment"
            >
              {c.title}
            </h2>
            <p className="mt-5 text-[1.1875rem] leading-[1.55] text-parchment">{c.lede}</p>
            <p className="mt-4 text-[1.0625rem] leading-[1.6] text-mist">{c.next}</p>

            <div className="mt-10 border-t border-line pt-6">
              <p className="text-[0.9375rem] text-mist">{c.emailLabel}</p>
              <a
                href={mailto}
                className="mt-1 inline-flex min-h-11 items-center text-xl font-semibold tracking-[-0.01em] text-parchment underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors duration-150 hover:decoration-bronze-bright"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>

          {status.kind === "sent" ? (
            <div className="swap-in self-start rounded-xl border border-line-strong bg-surface p-8 md:p-10">
              <h3
                ref={successRef}
                tabIndex={-1}
                className="text-2xl font-semibold tracking-[-0.02em] text-parchment focus:outline-none"
              >
                {c.successTitle}
              </h3>
              <p className="mt-3 text-[1.0625rem] leading-[1.6] text-mist">{c.successMessage}</p>
              <Button variant="secondary" className="mt-8" onClick={startAnother}>
                {c.sendAnother}
              </Button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              aria-labelledby={HEADING_ID}
              className="grid gap-x-5 gap-y-6 sm:grid-cols-2"
            >
              <div>
                {label("name", c.labels.name)}
                <input
                  id={id("name")}
                  type="text"
                  autoComplete="name"
                  maxLength={CONTACT_LIMITS.name}
                  aria-required="true"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy("name")}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={`${fieldClasses("name")} min-h-12 py-2.5`}
                />
                {errorLine("name")}
              </div>

              <div>
                {label("email", c.labels.email)}
                <input
                  id={id("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={CONTACT_LIMITS.email}
                  aria-required="true"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={describedBy("email")}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => validateOnBlur("email")}
                  className={`${fieldClasses("email")} min-h-12 py-2.5`}
                />
                {errorLine("email")}
              </div>

              <div>
                {label("company", c.labels.company, true)}
                <input
                  id={id("company")}
                  type="text"
                  autoComplete="organization"
                  maxLength={CONTACT_LIMITS.company}
                  aria-invalid={errors.company ? true : undefined}
                  aria-describedby={describedBy("company")}
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className={`${fieldClasses("company")} min-h-12 py-2.5`}
                />
                {errorLine("company")}
              </div>

              <div>
                {label("projectType", c.labels.projectType, true)}
                <select
                  id={id("projectType")}
                  aria-invalid={errors.projectType ? true : undefined}
                  aria-describedby={describedBy("projectType")}
                  value={form.projectType}
                  onChange={(e) => update("projectType", e.target.value)}
                  className={`${fieldClasses("projectType", form.projectType === "")} select-chevron min-h-12 appearance-none py-2.5 pr-10 [&_optgroup]:bg-surface [&_optgroup]:text-mist [&_option]:bg-surface [&_option]:text-parchment`}
                >
                  <option value="">{c.placeholderProjectType}</option>
                  <optgroup label={c.systemsGroup}>
                    {SYSTEM_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {c.systems[type]}
                      </option>
                    ))}
                  </optgroup>
                  <option value="custom">{c.custom}</option>
                  <option value="other">{c.other}</option>
                </select>
                {errorLine("projectType")}
              </div>

              <div className="sm:col-span-2">
                {label("message", c.labels.message)}
                <textarea
                  id={id("message")}
                  rows={5}
                  maxLength={CONTACT_LIMITS.message}
                  aria-required="true"
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={describedBy("message", showCount ? id("count") : undefined)}
                  placeholder={c.placeholderMessage}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  onBlur={() => validateOnBlur("message")}
                  className={`${fieldClasses("message")} min-h-36 resize-y py-3`}
                />
                {showCount && (
                  <p id={id("count")} className="figures mt-2 text-right text-[0.9375rem] text-mist">
                    {c.counter(messageCount, CONTACT_LIMITS.message)}
                  </p>
                )}
                {errorLine("message")}
              </div>

              {/* Honeypot: hidden from people and assistive tech */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={id("website")}>Website</label>
                <input
                  id={id("website")}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </div>

              <div className="space-y-4 pt-2 sm:col-span-2">
                <Button type="submit" variant="primary" size="large" ariaDisabled={sending} busy={sending}>
                  {sending ? c.sending : c.submit}
                </Button>

                <div aria-live="polite" role="status">
                  {sending && <p className="sr-only">{c.sending}</p>}
                  {status.kind === "failed" && (
                    <p className="swap-in rounded-lg border border-state-error/60 bg-surface px-4 py-3 text-[1.0625rem] leading-[1.55] text-parchment">
                      {c.failure[status.reason]}{" "}
                      <a
                        href={mailto}
                        className="font-semibold text-parchment underline decoration-state-error/70 underline-offset-4 hover:decoration-parchment"
                      >
                        {SITE_CONFIG.email}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
