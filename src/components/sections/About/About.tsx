"use client";

import { useEffect, useRef } from "react";
import { SECTION_IDS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n";

const valueNumbers = ["01", "02", "03", "04"] as const;

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

    const elements = sectionRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el) => observer.observe(el));

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
    <section id={SECTION_IDS.about} style={{ width: "100%" }} className="relative py-32" ref={sectionRef}>
      {/* Background decorative blob */}
      <div className="absolute top-1/2 left-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent-turquoise/5 blur-[200px]" />

      <div className="section-container">
        <SectionHeading
          title={t("about.heading")}
          subtitle={t("about.subtitle")}
          gradient
        />

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Story - text lines reveal one by one */}
          <div>
            <div
              data-animate
              className="anim-line-reveal mb-6"
              style={{ transitionDelay: "0ms" }}
            >
              <p className="font-display text-2xl leading-relaxed text-text-primary md:text-3xl">
                {renderGradientText(t("about.intro1"))}
              </p>
            </div>
            <div
              data-animate
              className="anim-line-reveal"
              style={{ transitionDelay: "200ms" }}
            >
              <p className="text-lg leading-relaxed text-text-secondary">
                {t("about.intro2")}
              </p>
            </div>
            <div
              data-animate
              className="anim-line-reveal mt-4"
              style={{ transitionDelay: "400ms" }}
            >
              <p className="text-lg leading-relaxed text-text-secondary">
                {t("about.intro3")}
              </p>
            </div>
          </div>

          {/* Values - slide from right */}
          <div className="space-y-6">
            {valueNumbers.map((num, i) => (
              <div
                key={num}
                data-animate
                className="anim-value-slide"
                style={{ transitionDelay: `${i * 150 + 200}ms` }}
              >
                <div className="group flex gap-6 rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-[var(--border-subtle)] hover:bg-bg-elevated">
                  <span className="font-mono text-sm text-accent-cyan/50">
                    {num}
                  </span>
                  <div>
                    <h3 className="mb-1 font-display text-xl font-semibold text-text-primary transition-colors group-hover:text-accent-cyan">
                      {t(`about.value${i + 1}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {t(`about.value${i + 1}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
