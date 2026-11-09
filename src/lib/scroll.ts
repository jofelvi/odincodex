import type { SystemId } from "@/types";
import { SECTION_IDS } from "@/lib/constants";

export interface ScrollOptions {
  /** Push the section hash to history (default true). */
  record?: boolean;
}

/**
 * Scrolls to a section by id and records it in the URL so Back and shared
 * links work. Honors prefers-reduced-motion by jumping instead of gliding.
 *
 * Handlers call preventDefault on the anchor, which cancels the browser's own
 * fragment focus move, so keyboard focus is moved to the section heading here
 * (tabIndex -1, without a second scroll).
 */
export function scrollToSection(id: string, opts: ScrollOptions = {}): void {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (opts.record !== false && window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${id}`);
  }
  const heading = el.querySelector<HTMLElement>("h2");
  if (heading) {
    if (!heading.hasAttribute("tabindex")) heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

/**
 * Deep link to one system's panel (#sistemas-<id>). Pushes the hash once and
 * dispatches a hashchange; the Systems section selects or opens the system and
 * scrolls to it, so no second history entry is created.
 */
export function goToSystem(id: SystemId): void {
  const hash = `#${SECTION_IDS.systems}-${id}`;
  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}
