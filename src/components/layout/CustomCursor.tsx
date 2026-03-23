"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type CursorVariant = "default" | "hover" | "text" | "hidden";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const isTouchDevice = useMediaQuery("(pointer: coarse)");

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setVariant("hover");
      }
      if (target.dataset.cursor === "text") {
        setVariant("text");
      }
    };

    const handleMouseLeave = () => {
      setVariant("default");
    };

    function animate() {
      if (!cursor) return;
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;

      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  const sizeClasses: Record<CursorVariant, string> = {
    default: "w-10 h-10 border border-accent-cyan/50",
    hover: "w-16 h-16 border border-accent-bronze/80 bg-accent-cyan/10",
    text: "w-24 h-24 border border-accent-cyan/30 bg-accent-cyan/5",
    hidden: "w-0 h-0 opacity-0",
  };

  return (
    <>
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-[width,height,border-color,background-color] duration-300 ease-out ${sizeClasses[variant]}`}
      />
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-accent-cyan"
      />
    </>
  );
}
