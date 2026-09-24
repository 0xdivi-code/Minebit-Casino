"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, GET_API_LABEL } from "@/lib/apiKeys";

/**
 * The one action offered on locked surfaces: a link to the developer's
 * Telegram where working API credentials are issued.
 */
export default function GetApiLink({
  className,
  compact = false,
  label = GET_API_LABEL,
}: {
  className?: string;
  compact?: boolean;
  label?: string;
}) {
  return (
    <a
      href={CONTACT.telegramUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-main border border-emerald-brand bg-neon font-semibold text-slate-deep transition-colors duration-200 hover:bg-emerald-brand active:bg-mint",
        compact ? "px-4 py-2.5 text-[13px] leading-[150%]" : "px-4 py-3 text-sm leading-[150%]",
        className
      )}
    >
      {label}
      <ArrowRight className={compact ? "h-4 w-4" : "h-[18px] w-[18px]"} strokeWidth={2.6} />
    </a>
  );
}
