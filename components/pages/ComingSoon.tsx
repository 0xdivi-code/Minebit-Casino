"use client";

import { motion } from "framer-motion";
import { Dices } from "lucide-react";
import Link from "next/link";
import type { Game } from "@/data/games";
import GameArt from "../games/GameArt";
import { BtnDark, BtnPrimary } from "../ui/Buttons";

interface ComingSoonProps {
  title: string;
  eyebrow?: string;
  blurb?: string;
  art?: Game;
}

export default function ComingSoon({
  title,
  eyebrow = "MineBit",
  blurb = "This section is being prepared. Browse the lobby meanwhile — new games and rewards land every week.",
  art,
}: ComingSoonProps) {
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
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-neon/[0.08] blur-[110px]" />
      </div>

      {art ? (
        <div className="relative h-52 w-40 overflow-hidden rounded-main border border-line-soft shadow-2xl">
          <GameArt game={art} />
        </div>
      ) : (
        <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-neon/40 bg-navy shadow-[0_0_60px_-12px_rgba(73,238,133,0.5)]">
          <Dices className="h-9 w-9 text-neon" strokeWidth={1.6} />
        </span>
      )}

      <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-blue">{eyebrow}</p>
      <h1 className="relative mt-2 text-3xl font-extrabold text-cream md:text-4xl">{title}</h1>
      <span className="relative mt-4 inline-flex items-center gap-1.5 rounded-md border border-tangerine/60 bg-tangerine/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-tangerine">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tangerine" />
        Coming soon
      </span>
      <p className="relative mt-4 max-w-[440px] text-sm leading-relaxed text-muted">{blurb}</p>

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
