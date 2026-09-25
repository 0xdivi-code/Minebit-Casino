"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  icon?: ReactNode;
  /** Path to an image icon (public/assets/icons/*.svg) — takes over from `icon`. */
  iconSrc?: string;
  title: string;
  count?: number | string;
  viewAllHref?: string;
  nav?: ReactNode;
}

export default function SectionHeader({
  icon,
  iconSrc,
  title,
  count,
  viewAllHref = "#",
  nav,
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center text-muted-blue">
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt=""
            width={20}
            height={20}
            unoptimized
            aria-hidden
            className="h-5 w-5"
          />
        ) : (
          icon
        )}
      </span>
      <h2 className="text-sm font-bold uppercase leading-[110%] tracking-wide text-muted-blue">
        {title}
      </h2>
      {count !== undefined && (
        <span className="rounded-md bg-navy px-1.5 py-0.5 text-xs font-semibold leading-none text-muted">
          {count}
        </span>
      )}
      <a
        href={viewAllHref}
        className="ml-2 hidden items-center gap-0.5 text-xs font-semibold text-muted transition-colors hover:text-neon sm:flex"
      >
        View all
        <ChevronRight className="h-3.5 w-3.5" />
      </a>
      {nav && <div className="ml-auto">{nav}</div>}
    </div>
  );
}
