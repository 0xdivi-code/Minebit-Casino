"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, copyText } from "@/lib/apiKeys";
import { TelegramPlaneIcon } from "../ui/Icons";

/** Telegram deep link, optionally with a pre-filled message. */
export function telegramLink(message?: string): string {
  return message ? `${CONTACT.telegramUrl}?text=${encodeURIComponent(message)}` : CONTACT.telegramUrl;
}

export const DEFAULT_TELEGRAM_MESSAGE = `Hi ${CONTACT.username}, I'm running the MineBit deployment but the API keys are not connected. I need full access.`;

/**
 * "Reach out to the developer" call-to-action, reused by every locked surface
 * (pages, game popup, post sign-in modal).
 */
export default function TelegramCta({
  className,
  compact = false,
  message = DEFAULT_TELEGRAM_MESSAGE,
  label,
}: {
  className?: string;
  compact?: boolean;
  message?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await copyText(CONTACT.handle);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("flex flex-col gap-2 sm:flex-row", className)}>
      <a
        href={telegramLink(message)}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          "flex items-center justify-center gap-2 rounded-main border border-emerald-brand bg-neon font-semibold text-slate-deep transition-colors duration-200 hover:bg-emerald-brand active:bg-mint",
          compact ? "px-4 py-2.5 text-[13px] leading-[150%]" : "px-4 py-3 text-sm leading-[150%]"
        )}
      >
        <TelegramPlaneIcon className="h-5 w-5 flex-none" />
        {label ?? `Message ${CONTACT.handle} on Telegram`}
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-live="polite"
        className={cn(
          "flex items-center justify-center gap-2 rounded-main bg-navy font-semibold text-muted-blue transition-colors duration-200 hover:bg-navy-hover hover:text-cream",
          compact ? "px-4 py-2.5 text-[13px] leading-[150%]" : "px-4 py-3 text-sm leading-[150%]"
        )}
      >
        {copied ? <Check className="h-4 w-4 text-neon" strokeWidth={3} /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : `Copy ${CONTACT.handle}`}
      </button>
    </div>
  );
}
