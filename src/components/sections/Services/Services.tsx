"use client";

import { useEffect, useRef } from "react";
import { SECTION_IDS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n";

const serviceIds = ["development", "design", "consulting", "branding"] as const;

const iconMap: Record<string, string> = {
  development: "{ }",
  design: "\u25C6",
  consulting: "\u25CE",
  branding: "\u25C7",
};

export default function Services() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
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

  return (
    <section id={SECTION_IDS.services} style={{ width: "100%" }} className="relative py-32">
      <div className="section-container">
        <SectionHeading
          title={t("services.heading")}
          subtitle={t("services.subtitle")}
          gradient
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {serviceIds.map((id, i) => {
            const prefix = `services.${id}`;
            const features = [
              t(`${prefix}.feature1`),
              t(`${prefix}.feature2`),
              t(`${prefix}.feature3`),
              t(`${prefix}.feature4`),
            ];

            return (
              <div
                key={id}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="anim-slide-up-rotate"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-elevated p-8 transition-all duration-500 hover:border-[var(--border-hover)] hover:shadow-[var(--glow-cyan)]">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-[var(--gradient-card)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 font-mono text-xl text-accent-cyan">
                      {iconMap[id] ?? "\u25CF"}
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-display text-2xl font-semibold text-text-primary">
                      {t(`${prefix}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                      {t(`${prefix}.description`)}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-text-muted"
                        >
                          <span className="h-1 w-1 rounded-full bg-accent-cyan" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
