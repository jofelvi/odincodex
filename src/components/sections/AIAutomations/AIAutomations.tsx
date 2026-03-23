"use client";

import { useEffect, useRef } from "react";
import { SECTION_IDS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n";

interface AIServiceDef {
  id: string;
  icon: string;
  i18nPrefix: string;
  featureCount: number;
}

const aiServiceDefs: AIServiceDef[] = [
  {
    id: "intelligent-workflows",
    icon: "\u26A1",
    i18nPrefix: "ai.intelligentWorkflows",
    featureCount: 3,
  },
  {
    id: "ai-integration",
    icon: "\u2B21",
    i18nPrefix: "ai.aiIntegration",
    featureCount: 3,
  },
  {
    id: "data-intelligence",
    icon: "\u25C8",
    i18nPrefix: "ai.dataIntelligence",
    featureCount: 3,
  },
  {
    id: "custom-ai-agents",
    icon: "\u2B22",
    i18nPrefix: "ai.customAiAgents",
    featureCount: 3,
  },
];

export default function AIAutomations() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const decorRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  /** Parse "<gradient>text</gradient>" tokens into JSX */
  function renderGradientText(raw: string) {
    const parts = raw.split(/(<gradient>.*?<\/gradient>)/);
    return parts.map((part, i) => {
      const match = part.match(/^<gradient>(.*)<\/gradient>$/);
      if (match) {
        return (
          <span key={i} className="gradient-text">
            {match[1]}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <section
      id={SECTION_IDS.aiAutomations}
      style={{ width: "100%" }}
      className="relative overflow-hidden bg-bg-secondary py-32"
    >
      {/* Decorative background elements */}
      <div
        ref={decorRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,191,165,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,165,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient blob top-right */}
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-accent-cyan/5 blur-[150px]" />
        {/* Gradient blob bottom-left */}
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-accent-bronze/5 blur-[150px]" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          title={t("ai.heading")}
          subtitle={t("ai.subtitle")}
          gradient
        />

        {/* Intro text */}
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-text-secondary">
          {t("ai.intro")}
        </p>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {aiServiceDefs.map((service, i) => {
            const features = Array.from({ length: service.featureCount }, (_, fi) =>
              t(`${service.i18nPrefix}.feature${fi + 1}`)
            );

            return (
              <div
                key={service.id}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="anim-slide-up-rotate"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="ai-card-glow group relative h-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-elevated p-8 transition-all duration-500 hover:border-[var(--border-hover)]">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-[var(--gradient-card)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Animated top-right corner accent */}
                  <div className="absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-accent-cyan/10 transition-transform duration-700 group-hover:translate-x-5 group-hover:-translate-y-5" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="ai-icon-float mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-cyan/20 bg-gradient-to-br from-accent-cyan/10 to-accent-turquoise/5 text-2xl">
                      <span className="text-accent-cyan">{service.icon}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-display text-2xl font-semibold text-text-primary transition-colors group-hover:text-accent-cyan">
                      {t(`${service.i18nPrefix}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                      {t(`${service.i18nPrefix}.description`)}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-text-muted"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan/60" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Learn more link */}
                    <div className="mt-6 flex items-center gap-2 font-mono text-xs text-accent-cyan/50 transition-colors group-hover:text-accent-cyan">
                      <span>{t("ai.learnMore")}</span>
                      <span className="inline-block transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA callout */}
        <div className="mt-16 rounded-2xl border border-[var(--border-subtle)] bg-bg-elevated/50 p-8 text-center backdrop-blur-sm">
          <p className="mb-2 font-display text-xl font-semibold text-text-primary">
            {renderGradientText(t("ai.ctaTitle"))}
          </p>
          <p className="text-sm text-text-secondary">
            {t("ai.ctaDescription")}
          </p>
        </div>
      </div>
    </section>
  );
}
