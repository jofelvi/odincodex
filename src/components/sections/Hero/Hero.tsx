"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { SECTION_IDS, SITE_CONFIG } from "@/lib/constants";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import Button from "@/components/ui/Button";
import { useI18n } from "@/i18n";

const HeroCanvas = dynamic(
  () => import("@/components/sections/Hero/HeroCanvas"),
  { ssr: false }
);

export default function Hero() {
  const { tier } = useDevicePerformance();
  const { t } = useI18n();

  const scrollToContact = () => {
    const el = document.getElementById(SECTION_IDS.contact);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D Canvas or CSS Fallback */}
      {tier > 0 ? (
        <div className="absolute inset-0">
          <HeroCanvas />
        </div>
      ) : (
        <div className="absolute inset-0 bg-bg-primary">
          {/* CSS Gradient fallback for low-end devices */}
          <div className="absolute inset-0 animate-pulse opacity-30">
            <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent-turquoise/20 blur-[128px]" />
            <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent-bronze/20 blur-[128px]" />
            <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/10 blur-[96px]" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="section-container relative z-10 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Image
              src="/images/logo.png"
              alt="OdinCodex"
              width={200}
              height={200}
              className="h-32 w-32 object-contain drop-shadow-[0_0_30px_rgba(0,191,165,0.3)] md:h-48 md:w-48"
              priority
            />
            <div className="absolute inset-0 animate-pulse rounded-full bg-accent-cyan/5 blur-3xl" />
          </div>
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
          <span className="font-mono text-xs tracking-wider text-accent-cyan uppercase">
            {t("site.tagline")}
          </span>
        </div>

        <h1 className="mb-6 font-display text-[clamp(3rem,8vw,10rem)] font-bold leading-[0.95] tracking-tight">
          <span className="gradient-text">{SITE_CONFIG.name}</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl font-body text-lg leading-relaxed text-text-secondary md:text-xl">
          {t("site.description")}
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button variant="primary" size="large" onClick={scrollToContact}>
            {t("hero.startProject")}
          </Button>
          <Button
            variant="outline"
            size="large"
            onClick={() => {
              const el = document.getElementById(SECTION_IDS.work);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("hero.viewWork")}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs tracking-widest text-text-muted uppercase">
            {t("hero.scroll")}
          </span>
          <div className="h-12 w-[1px] animate-pulse bg-gradient-to-b from-accent-cyan/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
