"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "default" | "large";
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  size = "default",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "relative overflow-hidden rounded-full font-body font-medium transition-all duration-300 group";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-accent-bronze to-accent-cyan text-bg-primary hover:shadow-[var(--glow-cyan)]",
    outline:
      "border border-accent-cyan/30 text-accent-cyan hover:border-accent-cyan/60 hover:bg-accent-cyan/10",
  };

  const sizeClasses = {
    default: "px-6 py-3 text-sm",
    large: "px-8 py-4 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      data-cursor="hover"
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
