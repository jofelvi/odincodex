"use client";

import { useEffect, useRef } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  gradient?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  gradient = false,
}: SectionHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("animate-in");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={headingRef}
      className={`mb-16 translate-y-8 opacity-0 transition-all duration-1000 ease-out [&.animate-in]:translate-y-0 [&.animate-in]:opacity-100 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {subtitle && (
        <span className="mb-4 block font-mono text-sm tracking-widest text-accent-cyan uppercase">
          {subtitle}
        </span>
      )}
      <h2
        className={`font-display text-[clamp(2rem,5vw,5rem)] font-bold leading-[1.1] ${
          gradient ? "gradient-text" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
