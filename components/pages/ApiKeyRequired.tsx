"use client";

import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import type { Game } from "@/data/games";
import GameArt from "../games/GameArt";
import { BtnDark, BtnPrimary } from "../ui/Buttons";
import GetApiLink from "../system/GetApiLink";
import { GATE_BADGE, GATE_MESSAGE } from "@/lib/apiKeys";

interface ApiKeyRequiredProps {
  title: string;
  eyebrow?: string;
  blurb?: string;
  art?: Game;
}

/**
 * Placeholder for every unfinished surface: no "coming soon" promises, just the
 * reason the area is locked and a link to where the API credentials come from.
 */
export default function ApiKeyRequired({
  title,
  eyebrow = "MineBit",
  blurb = "This area needs live provider credentials before it can open.",
  art,
}: ApiKeyRequiredProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      aria-label={title}
      className="relative flex min-h-[62vh] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-grid-bg absolute inset-0" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-tangerine/[0.07] blur-[110px]" />
      </div>

      {art ? (
        <div className="relative h-52 w-40 overflow-hidden rounded-main border border-line-soft shadow-2xl">
          <GameArt game={art} />
        </div>
      ) : (
        <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-tangerine/40 bg-navy shadow-[0_0_60px_-12px_rgba(253,149,53,0.5)]">
          <KeyRound className="h-9 w-9 text-tangerine" strokeWidth={1.6} />
        </span>
      )}

      <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-blue">{eyebrow}</p>
      <h1 className="relative mt-2 text-3xl font-extrabold text-cream md:text-4xl">{title}</h1>

      <span className="relative mt-4 inline-flex items-center gap-1.5 rounded-md border border-tangerine/60 bg-tangerine/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-tangerine">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tangerine" />
        {GATE_BADGE}
      </span>

      <p className="relative mt-4 max-w-[520px] text-sm leading-relaxed text-muted">{blurb}</p>
      <p className="relative mt-2 max-w-[520px] text-sm font-semibold leading-relaxed text-tangerine">{GATE_MESSAGE}</p>

      <GetApiLink className="relative mt-6" />

      <div className="relative mt-8 flex w-full max-w-[420px] flex-col gap-2 sm:flex-row">
        <Link href="/" className="flex-1">
          <BtnPrimary className="w-full">Back to Lobby</BtnPrimary>
        </Link>
        <Link href="/games/slots" className="flex-1">
          <BtnDark className="w-full">Browse Slots</BtnDark>
        </Link>
      </div>
    </motion.section>
  );
}
