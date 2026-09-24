"use client";

import { motion } from "framer-motion";
import { Download, FileCode2, KeyRound } from "lucide-react";
import Link from "next/link";
import type { Game } from "@/data/games";
import GameArt from "../games/GameArt";
import { BtnDark, BtnPrimary } from "../ui/Buttons";
import TelegramCta from "../system/TelegramCta";
import { useShell } from "../layout/AppShell";
import { CONTACT, ENV_EXAMPLE_FILE, REQUIRED_CREDENTIALS, downloadEnvExample } from "@/lib/apiKeys";

interface ApiKeyRequiredProps {
  title: string;
  eyebrow?: string;
  blurb?: string;
  art?: Game;
}

/**
 * Standard placeholder for every unfinished surface: it states the real reason
 * the area is locked — the platform has no API keys connected — and points the
 * visitor at the developer's Telegram (@Vicckr) for full access.
 */
export default function ApiKeyRequired({
  title,
  eyebrow = "MineBit",
  blurb = "This area needs live provider credentials. The API keys are not connected on this deployment, so the section stays locked until they are issued.",
  art,
}: ApiKeyRequiredProps) {
  const { openEnvModal } = useShell();

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
        API keys not connected
      </span>

      <p className="relative mt-4 max-w-[520px] text-sm leading-relaxed text-muted">{blurb}</p>

      <div className="relative mt-6 w-full max-w-[640px] rounded-main border border-line bg-navy/60 p-4 text-left">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-blue">
          Missing credentials on this deployment
        </p>
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {REQUIRED_CREDENTIALS.map((c) => (
            <li
              key={c.key}
              title={`${c.label} — ${c.area}`}
              className="flex items-center gap-2 rounded-lg border border-line bg-[#080d12] px-2.5 py-1.5"
            >
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-tangerine" />
              <span className="break-all font-mono text-[10.5px] leading-snug text-muted-blue">{c.key}</span>
              <span className="ml-auto flex-none text-[10px] font-bold uppercase text-tangerine/80">missing</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12px] leading-relaxed text-muted">
          Anyone running this build should reach out to{" "}
          <a
            href={CONTACT.telegramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-neon hover:underline"
          >
            {CONTACT.handle}
          </a>{" "}
          on Telegram for full access — the live keys, provider accounts and deployment support are issued there.
        </p>
      </div>

      <div className="relative mt-6 w-full max-w-[640px]">
        <TelegramCta />
      </div>

      <div className="relative mt-3 flex w-full max-w-[640px] flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => downloadEnvExample({ reason: "page", detail: title })}
          className="flex flex-1 items-center justify-center gap-2 rounded-main bg-navy px-4 py-3 text-sm font-semibold text-muted-blue transition-colors hover:bg-navy-hover hover:text-cream"
        >
          <Download className="h-4 w-4" />
          Download {ENV_EXAMPLE_FILE}
        </button>
        <button
          type="button"
          onClick={() => openEnvModal({ reason: "page", detail: title })}
          className="flex flex-1 items-center justify-center gap-2 rounded-main border border-line px-4 py-3 text-sm font-semibold text-muted-blue transition-colors hover:border-line-soft hover:text-cream"
        >
          <FileCode2 className="h-4 w-4" />
          View generated file
        </button>
      </div>

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
