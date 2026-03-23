"use client";

import { useEffect, useRef } from "react";
import { SECTION_IDS } from "@/lib/constants";
import { techStack } from "@/data/tech-stack";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n";

function TechMarquee({
  items,
  direction,
}: {
  items: typeof techStack;
  direction: "left" | "right";
}) {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="flex overflow-hidden py-4">
      <div className={`flex shrink-0 gap-8 ${animationClass}`}>
        {[...items, ...items].map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex shrink-0 items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-bg-elevated px-6 py-3 transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-bg-surface"
            data-cursor="hover"
          >
            <span className="font-mono text-sm text-text-muted transition-colors group-hover:text-accent-cyan">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (marqueeRef.current) observer.observe(marqueeRef.current);
    return () => observer.disconnect();
  }, []);

  const firstRow = techStack.slice(0, 7);
  const secondRow = techStack.slice(7);

  return (
    <section
      id={SECTION_IDS.techStack}
      style={{ width: "100%" }}
      className="relative overflow-hidden bg-bg-secondary py-32"
    >
      <div className="section-container">
        <SectionHeading
          title={t("tech.heading")}
          subtitle={t("tech.subtitle")}
          gradient
        />
      </div>

      <div ref={marqueeRef} className="anim-scale-in">
        <div className="space-y-4">
          <TechMarquee items={firstRow} direction="left" />
          <TechMarquee items={secondRow} direction="right" />
        </div>
      </div>
    </section>
  );
}
