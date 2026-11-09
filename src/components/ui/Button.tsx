"use client";

import type { MouseEvent, ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";
type Size = "default" | "large";

interface ButtonProps {
  children: ReactNode;
  /** primary: forged bronze · secondary: outlined · quiet: text-weight action */
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  /**
   * Unavailable but still focusable: renders aria-disabled and swallows clicks (including the
   * implicit form submit) without the native disabled attribute, so focus is never dropped to
   * the body while an action is in flight.
   */
  ariaDisabled?: boolean;
  /** Marks an in-flight action for assistive tech. */
  busy?: boolean;
  className?: string;
}

const VARIANTS: Record<Variant, string> = {
  primary: "bg-bronze text-night-deep hover:bg-bronze-bright aria-disabled:hover:bg-bronze",
  secondary:
    "border border-line-strong text-parchment hover:border-mist hover:bg-surface aria-disabled:hover:border-line-strong aria-disabled:hover:bg-transparent",
  quiet: "text-parchment hover:text-bronze-bright aria-disabled:hover:text-parchment",
};

const SIZES: Record<Size, string> = {
  default: "min-h-11 px-5 text-[0.9375rem]",
  large: "min-h-12 px-6 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "default",
  onClick,
  type = "button",
  disabled = false,
  ariaDisabled = false,
  busy = false,
  className = "",
}: ButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (ariaDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={ariaDisabled || undefined}
      aria-busy={busy || undefined}
      className={`press inline-flex items-center justify-center gap-2 rounded-lg font-semibold disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-progress aria-disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </button>
  );
}
