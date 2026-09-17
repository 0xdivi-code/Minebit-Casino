"use client";

import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type NativeBtnProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationComplete"
>;

interface BtnProps extends NativeBtnProps {
  children: ReactNode;
}

/** Primary green button — matches original data-style-btn type5 */
export function BtnPrimary({ children, className, ...rest }: BtnProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        "flex items-center justify-center gap-2 rounded-main border border-emerald-brand bg-neon px-4 py-2.5",
        "text-sm font-semibold leading-[150%] text-slate-deep transition-colors duration-200",
        "hover:bg-emerald-brand active:bg-mint",
        className
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/** Dark button — matches original data-style-btn type6 */
export function BtnDark({ children, className, ...rest }: BtnProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        "flex items-center justify-center gap-2 rounded-main bg-navy px-4 py-3",
        "text-sm font-semibold leading-[150%] text-muted-blue transition-colors duration-200",
        "hover:bg-navy-hover active:text-cream",
        className
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/** Small square nav arrow — matches slider navigation buttons */
export function NavArrow({
  dir,
  disabled,
  onClick,
  label,
}: {
  dir: "prev" | "next";
  disabled?: boolean;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-[10px] bg-navy transition-colors",
        disabled
          ? "pointer-events-none opacity-100 [&>svg]:fill-slate-deep"
          : "hover:bg-slate-deep [&>svg]:fill-muted-blue"
      )}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" className={dir === "prev" ? "rotate-180" : ""}>
        <path d="M4.5 1.5L9 6l-4.5 4.5-1.2-1.2L6.6 6 3.3 2.7z" />
      </svg>
    </button>
  );
}
