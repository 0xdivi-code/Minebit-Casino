"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Download, FileCode2, X } from "lucide-react";
import { useShell } from "../layout/AppShell";
import { CONTACT, CREDENTIAL_KEYS, ENV_EXAMPLE_FILE, downloadEnvExample } from "@/lib/apiKeys";
import { TelegramPlaneIcon } from "../ui/Icons";
import { DEFAULT_TELEGRAM_MESSAGE, telegramLink } from "./TelegramCta";

/**
 * Bottom-of-the-site popup shown whenever a game tile is clicked while the
 * platform has no API keys connected.
 */
export default function ApiKeyNotice() {
  const { gameNotice, dismissGameNotice, openEnvModal } = useShell();

  useEffect(() => {
    if (!gameNotice) return;
    const timer = window.setTimeout(dismissGameNotice, 14000);
    return () => window.clearTimeout(timer);
  }, [gameNotice, dismissGameNotice]);

  const isCashier = gameNotice?.area === "cashier";
  const label = gameNotice?.title
    ? `“${gameNotice.title}”`
    : isCashier
      ? "The cashier"
      : "This game";
  const credential = isCashier ? CREDENTIAL_KEYS.custody : CREDENTIAL_KEYS.gameAggregator;
  const explanation = isCashier
    ? "can't process payments — the custody key is empty, so no deposit address, withdrawal or order can be created."
    : "can't launch — the game aggregator key is empty, so no provider session can be created.";

  return (
    <AnimatePresence>
      {gameNotice && (
        <motion.div
          key={gameNotice.id}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
          className="pointer-events-none fixed inset-x-0 bottom-[78px] z-[1080] flex justify-center px-3 lg:bottom-6"
        >
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-auto w-full max-w-[760px] rounded-2xl border border-tangerine/50 bg-[#0c1119]/97 p-4 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.95)] backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-tangerine/50 bg-tangerine/10">
                <AlertTriangle className="h-5 w-5 text-tangerine" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-cream">No API Key Connected</p>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-tangerine/60 bg-tangerine/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tangerine">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tangerine" />
                    Locked
                  </span>
                </div>

                <p className="mt-1.5 text-[13px] leading-snug text-muted">
                  {label} {explanation} <code className="text-cream/90">{credential}</code> is empty (see{" "}
                  <code className="text-cream/90">.env.example</code>). Contact{" "}
                  <a
                    href={telegramLink(DEFAULT_TELEGRAM_MESSAGE)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold text-neon hover:underline"
                  >
                    {CONTACT.handle} on Telegram
                  </a>{" "}
                  for full access.
                </p>

                {gameNotice.generatedFile && (
                  <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-navy px-2 py-1 text-[11px] font-semibold text-muted-blue">
                    <FileCode2 className="h-3.5 w-3.5 text-neon" />
                    Simulated {ENV_EXAMPLE_FILE} generated — check your downloads.
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={telegramLink(DEFAULT_TELEGRAM_MESSAGE)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-center gap-2 rounded-main border border-emerald-brand bg-neon px-3.5 py-2 text-[13px] font-semibold leading-[150%] text-slate-deep transition-colors hover:bg-emerald-brand active:bg-mint"
                  >
                    <TelegramPlaneIcon className="h-4 w-4 flex-none" />
                    Message {CONTACT.handle}
                  </a>
                  <button
                    type="button"
                    onClick={() => downloadEnvExample({ reason: "game", detail: gameNotice.title ?? "game launch" })}
                    className="flex items-center justify-center gap-2 rounded-main bg-navy px-3.5 py-2 text-[13px] font-semibold leading-[150%] text-muted-blue transition-colors hover:bg-navy-hover hover:text-cream"
                  >
                    <Download className="h-4 w-4" />
                    Download {ENV_EXAMPLE_FILE}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEnvModal({ reason: "game", detail: gameNotice.title ?? "game launch" })}
                    className="flex items-center justify-center gap-2 rounded-main border border-line px-3.5 py-2 text-[13px] font-semibold leading-[150%] text-muted-blue transition-colors hover:border-line-soft hover:text-cream"
                  >
                    <FileCode2 className="h-4 w-4" />
                    View file
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={dismissGameNotice}
                aria-label="Dismiss API key notice"
                className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-line text-muted-blue transition-colors hover:border-line-soft hover:text-cream"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
