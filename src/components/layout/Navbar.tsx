"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SECTION_IDS } from "@/lib/constants";
import { useI18n } from "@/i18n";

const NAV_KEYS = [
  { key: "nav.services", href: `#${SECTION_IDS.services}` },
  { key: "nav.work", href: `#${SECTION_IDS.work}` },
  { key: "nav.about", href: `#${SECTION_IDS.about}` },
  { key: "nav.ai", href: `#${SECTION_IDS.aiAutomations}` },
  { key: "nav.tech", href: `#${SECTION_IDS.techStack}` },
  { key: "nav.contact", href: `#${SECTION_IDS.contact}` },
] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleLocale = () => {
    setLocale(locale === "es" ? "en" : "es");
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "border-b border-[var(--border-subtle)] bg-bg-primary/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between py-4">
        {/* Logo */}
        <button
          onClick={() => scrollToSection(`#${SECTION_IDS.hero}`)}
          className="flex items-center gap-3"
        >
          <Image
            src="/images/logo.png"
            alt="OdinCodex"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="font-display text-xl font-semibold text-text-primary">
            OdinCodex
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_KEYS.map((link) => (
            <button
              key={link.key}
              onClick={() => scrollToSection(link.href)}
              className="font-body text-sm tracking-wide text-text-secondary transition-colors duration-300 hover:text-accent-cyan"
              data-cursor="hover"
            >
              {t(link.key)}
            </button>
          ))}
        </div>

        {/* Right side: language switcher + CTA */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Language switcher */}
          <div className="flex items-center gap-1 rounded-full border border-[var(--border-subtle)] p-0.5" data-cursor="hover">
            <button
              onClick={() => setLocale("en")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs font-semibold tracking-wider transition-all duration-300 ${
                locale === "en"
                  ? "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30"
                  : "text-text-muted hover:text-text-secondary border border-transparent"
              }`}
            >
              <svg className="w-4 h-3 shrink-0" viewBox="0 0 640 480"><path fill="#bd3d44" d="M0 0h640v37H0z"/><path fill="#fff" d="M0 37h640v37H0z"/><path fill="#bd3d44" d="M0 74h640v37H0z"/><path fill="#fff" d="M0 111h640v37H0z"/><path fill="#bd3d44" d="M0 148h640v37H0z"/><path fill="#fff" d="M0 185h640v37H0z"/><path fill="#bd3d44" d="M0 222h640v37H0z"/><path fill="#fff" d="M0 259h640v37H0z"/><path fill="#bd3d44" d="M0 296h640v37H0z"/><path fill="#fff" d="M0 333h640v37H0z"/><path fill="#bd3d44" d="M0 370h640v37H0z"/><path fill="#fff" d="M0 407h640v37H0z"/><path fill="#bd3d44" d="M0 444h640v37H0z"/><path fill="#192f5d" d="M0 0h260v259H0z"/></svg>
              EN
            </button>
            <button
              onClick={() => setLocale("es")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs font-semibold tracking-wider transition-all duration-300 ${
                locale === "es"
                  ? "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30"
                  : "text-text-muted hover:text-text-secondary border border-transparent"
              }`}
            >
              <svg className="w-4 h-3 shrink-0" viewBox="0 0 640 480"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/></svg>
              ES
            </button>
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollToSection(`#${SECTION_IDS.contact}`)}
            className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-6 py-2.5 font-body text-sm text-accent-cyan transition-all duration-300 hover:border-accent-cyan/60 hover:bg-accent-cyan/20"
            data-cursor="hover"
          >
            {t("nav.getInTouch")}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-text-primary transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-text-primary transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-text-primary transition-transform duration-300 ${
              isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 border-t border-[var(--border-subtle)] bg-bg-primary/95 px-6 py-6 backdrop-blur-xl">
          {NAV_KEYS.map((link) => (
            <button
              key={link.key}
              onClick={() => scrollToSection(link.href)}
              className="text-left font-body text-lg text-text-secondary transition-colors hover:text-accent-cyan"
            >
              {t(link.key)}
            </button>
          ))}

          {/* Mobile language switcher */}
          <div className="mt-2 flex items-center gap-1 self-start rounded-full border border-[var(--border-subtle)] p-0.5">
            <button
              onClick={() => { setLocale("en"); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs font-semibold tracking-wider transition-all duration-300 ${
                locale === "en"
                  ? "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30"
                  : "text-text-muted border border-transparent"
              }`}
            >
              <svg className="w-4 h-3 shrink-0" viewBox="0 0 640 480"><path fill="#bd3d44" d="M0 0h640v37H0z"/><path fill="#fff" d="M0 37h640v37H0z"/><path fill="#bd3d44" d="M0 74h640v37H0z"/><path fill="#fff" d="M0 111h640v37H0z"/><path fill="#bd3d44" d="M0 148h640v37H0z"/><path fill="#fff" d="M0 185h640v37H0z"/><path fill="#bd3d44" d="M0 222h640v37H0z"/><path fill="#fff" d="M0 259h640v37H0z"/><path fill="#bd3d44" d="M0 296h640v37H0z"/><path fill="#fff" d="M0 333h640v37H0z"/><path fill="#bd3d44" d="M0 370h640v37H0z"/><path fill="#fff" d="M0 407h640v37H0z"/><path fill="#bd3d44" d="M0 444h640v37H0z"/><path fill="#192f5d" d="M0 0h260v259H0z"/></svg>
              EN
            </button>
            <button
              onClick={() => { setLocale("es"); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs font-semibold tracking-wider transition-all duration-300 ${
                locale === "es"
                  ? "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30"
                  : "text-text-muted border border-transparent"
              }`}
            >
              <svg className="w-4 h-3 shrink-0" viewBox="0 0 640 480"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/></svg>
              ES
            </button>
          </div>

          <button
            onClick={() => scrollToSection(`#${SECTION_IDS.contact}`)}
            className="mt-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-6 py-3 text-center font-body text-accent-cyan"
          >
            {t("nav.getInTouch")}
          </button>
        </div>
      </div>
    </nav>
  );
}
