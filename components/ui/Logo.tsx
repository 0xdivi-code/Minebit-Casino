import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect width="40" height="40" rx="10" fill="#49EE85" />
      <path
        d="M11 27.5V12.5l9 7.5 9-7.5v15"
        stroke="#080D12"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="29" cy="29" r="5.5" fill="#080D12" />
      <path
        d="M27.2 29l1.3 1.3 2.3-2.6"
        stroke="#49EE85"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)} aria-label="MineBit home">
      <LogoMark className="h-9 w-9 shrink-0" />
      {!compact && (
        <span className="text-[22px] font-extrabold tracking-tight text-cream">
          Mine<span className="text-neon">Bit</span>
        </span>
      )}
    </Link>
  );
}
