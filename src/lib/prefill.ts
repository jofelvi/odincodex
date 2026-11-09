import type { ProjectType } from "@/lib/contact";

/** The hero's one-line field and the systems' demo buttons hand their text to the contact form through this event. */
export const PREFILL_EVENT = "odincodex:prefill-message";

export type PrefillDetail = { message: string; system?: ProjectType };

/**
 * Asks the contact form to fill in the message (only if the visitor hasn't typed one) and,
 * when given, the system of interest. Scrolling to the form is the caller's job.
 */
export function prefillContact(message: string, system?: ProjectType): void {
  const detail: PrefillDetail = system ? { message, system } : { message };
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }));
}
