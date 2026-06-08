"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SITE_CONFIG, SECTION_IDS } from "@/lib/constants";
import { useI18n } from "@/i18n";

const NAV_KEYS = [
  { key: "nav.services", href: `#${SECTION_IDS.services}` },
  { key: "nav.work", href: `#${SECTION_IDS.work}` },
  { key: "nav.about", href: `#${SECTION_IDS.about}` },
  { key: "nav.ai", href: `#${SECTION_IDS.aiAutomations}` },
  { key: "nav.tech", href: `#${SECTION_IDS.techStack}` },
  { key: "nav.contact", href: `#${SECTION_IDS.contact}` },
] as const;

const socialLinks = [
  { label: "GitHub", href: "https://github.com/odincodex" },
  { label: "LinkedIn", href: "https://linkedin.com/company/odincodex" },
  { label: "Twitter", href: "https://twitter.com/odincodex" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = footerRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} style={{ width: "100%" }} className="border-t border-[var(--border-subtle)] bg-bg-primary py-16">
      <div className="section-container">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div
            data-animate
            className="anim-fade-up"
            style={{ transitionDelay: "0ms" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="OdinCodex"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <h3 className="gradient-text font-display text-3xl font-bold">
                {SITE_CONFIG.name}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {t("footer.description")}
            </p>
          </div>

          {/* Navigation */}
          <div
            data-animate
            className="anim-fade-up"
            style={{ transitionDelay: "150ms" }}
          >
            <h4 className="mb-4 font-mono text-xs tracking-widest text-accent-cyan uppercase">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-3">
              {NAV_KEYS.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-cyan"
                    data-cursor="hover"
                  >
                    {t(link.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div
            data-animate
            className="anim-fade-up"
            style={{ transitionDelay: "300ms" }}
          >
            <h4 className="mb-4 font-mono text-xs tracking-widest text-accent-cyan uppercase">
              {t("footer.connect")}
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary transition-colors hover:text-accent-cyan"
                    data-cursor="hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          data-animate
          className="anim-fade-up mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 md:flex-row"
          style={{ transitionDelay: "450ms" }}
        >
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. {t("footer.allRights")}
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-accent-cyan"
            data-cursor="hover"
          >
            {t("footer.backToTop")}
            <span className="inline-block transition-transform group-hover:-translate-y-1">
              &uarr;
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
