"use client";

import { useEffect, useRef } from "react";

export default function ParallaxBlobs() {
  const cyanRef = useRef<HTMLDivElement>(null);
  const bronzeRef = useRef<HTMLDivElement>(null);
  const turquoiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (cyanRef.current) {
          cyanRef.current.style.transform = `translateY(${scrollY * 0.08}px)`;
        }
        if (bronzeRef.current) {
          bronzeRef.current.style.transform = `translateY(${scrollY * -0.05}px)`;
        }
        if (turquoiseRef.current) {
          turquoiseRef.current.style.transform = `translateY(${scrollY * 0.12}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div ref={cyanRef} className="parallax-blob parallax-blob--cyan" />
      <div ref={bronzeRef} className="parallax-blob parallax-blob--bronze" />
      <div ref={turquoiseRef} className="parallax-blob parallax-blob--turquoise" />
    </div>
  );
}
