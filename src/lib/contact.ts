/** What the visitor wants a demo of: one of the systems, custom software, or something else. */
export const PROJECT_TYPES = [
  "valhalla",
  "bifrost",
  "heimdall",
  "thor",
  "asgard",
  "forseti",
  "custom",
  "other",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  company: 120,
  message: 4000,
  messageMin: 10,
} as const;

export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType | "";
  message: string;
  /** Honeypot: real visitors never fill it. */
  website: string;
}

export type ContactField = "name" | "email" | "company" | "projectType" | "message";

/** Error codes; their messages live in the Contact section copy. */
export type ContactFieldError = "required" | "email" | "tooLong" | "tooShort" | "invalid";

export type ContactErrors = Partial<Record<ContactField, ContactFieldError>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isProjectType(value: string): value is ProjectType {
  return (PROJECT_TYPES as readonly string[]).includes(value);
}

export function validateContact(input: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const company = input.company.trim();
  const message = input.message.trim();

  if (!name) errors.name = "required";
  else if (name.length > CONTACT_LIMITS.name) errors.name = "tooLong";

  if (!email) errors.email = "required";
  else if (email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(email)) errors.email = "email";

  if (company.length > CONTACT_LIMITS.company) errors.company = "tooLong";

  if (input.projectType !== "" && !isProjectType(input.projectType)) errors.projectType = "invalid";

  if (!message) errors.message = "required";
  else if (message.length < CONTACT_LIMITS.messageMin) errors.message = "tooShort";
  else if (message.length > CONTACT_LIMITS.message) errors.message = "tooLong";

  return errors;
}

/** Narrows an unknown request body into a ContactPayload, or null when the shape is wrong. */
export function parseContactPayload(body: unknown): ContactPayload | null {
  if (typeof body !== "object" || body === null) return null;
  const record = body as Record<string, unknown>;
  const read = (key: string): string | null => {
    const value = record[key];
    if (value === undefined) return "";
    return typeof value === "string" ? value : null;
  };

  const name = read("name");
  const email = read("email");
  const company = read("company");
  const projectType = read("projectType");
  const message = read("message");
  const website = read("website");
  if (
    name === null ||
    email === null ||
    company === null ||
    projectType === null ||
    message === null ||
    website === null
  ) {
    return null;
  }

  return {
    name,
    email,
    company,
    projectType: projectType === "" || isProjectType(projectType) ? projectType : "",
    message,
    website,
  };
}

/** Response contract of POST /api/contact. */
export type ContactResponse =
  | { ok: true }
  | { ok: false; error: "validation"; fields: ContactErrors }
  | { ok: false; error: "rate_limited" | "not_configured" | "send_failed" | "bad_request" };
