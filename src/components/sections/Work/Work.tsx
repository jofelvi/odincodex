"use client";

import { useEffect, useRef, useState } from "react";
import { SECTION_IDS } from "@/lib/constants";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n";

const projectI18nKeys: Record<string, string> = {
  "arena-restobar": "projects.arenaRestobar",
  "mister-winner": "projects.misterWinner",
  "odin-systems": "projects.odinSystems",
  "ecommerce-platform": "projects.ecommercePlatform",
};

function ProjectCard({
  projectId,
  tags,
  index,
}: {
  projectId: string;
  tags: string[];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          cardRef.current?.classList.add("animate-in");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;
  const prefix = projectI18nKeys[projectId] ?? projectId;

  return (
    <div
      ref={cardRef}
      className={isEven ? "anim-slide-from-left" : "anim-slide-from-right"}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div
        className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-elevated transition-all duration-500 hover:border-[var(--border-hover)] hover:shadow-[var(--glow-cyan)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="hover"
      >
        {/* Image/Video area */}
        <div className="relative aspect-[16/10] overflow-hidden bg-bg-surface">
          {/* Placeholder gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-accent-turquoise/20 via-bg-surface to-accent-bronze/20 transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Project number overlay */}
          <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-accent-cyan/20 bg-bg-primary/60 backdrop-blur-sm">
            <span className="font-mono text-xs text-accent-cyan">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Hover overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-bg-primary/40 backdrop-blur-[2px] transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="rounded-full border border-accent-cyan/50 bg-accent-cyan/10 px-6 py-2 font-mono text-sm text-accent-cyan">
              {t("work.viewProject")}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="mb-2 font-display text-xl font-semibold text-text-primary">
            {t(`${prefix}.title`)}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-text-secondary">
            {t(`${prefix}.description`)}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent-cyan/10 bg-accent-cyan/5 px-3 py-1 font-mono text-xs text-accent-cyan/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const { t } = useI18n();

  return (
    <section id={SECTION_IDS.work} style={{ width: "100%" }} className="relative bg-bg-secondary py-32">
      <div className="section-container">
        <SectionHeading
          title={t("work.heading")}
          subtitle={t("work.subtitle")}
          gradient
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              tags={project.tags}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
