"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useShell } from "../layout/AppShell";
import { GATE_BADGE, GATE_MESSAGE } from "@/lib/apiKeys";
import GetApiLink from "./GetApiLink";

/**
 * Bottom-of-the-site popup shown when a game (or cashier action) is clicked
 * while the deployment has no API keys connected.
 */
export default function ApiKeyNotice() {
  const { gameNotice, dismissGameNotice } = useShell();

  useEffect(() => {
    if (!gameNotice) return;
    const timer = window.setTimeout(dismissGameNotice, 14000);
    return () => window.clearTimeout(timer);
  }, [gameNotice, dismissGameNotice]);

  const label = gameNotice?.title ? `“${gameNotice.title}”` : "This game";

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
            className="pointer-events-auto w-full max-w-[620px] rounded-2xl border border-tangerine/50 bg-[#0c1119]/97 p-4 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.95)] backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-tangerine/50 bg-tangerine/10">
                <AlertTriangle className="h-5 w-5 text-tangerine" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-cream">{label} can&apos;t launch</p>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-tangerine/60 bg-tangerine/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tangerine">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tangerine" />
                    {GATE_BADGE}
                  </span>
                </div>

                <p className="mt-1.5 text-[13px] leading-snug text-muted">{GATE_MESSAGE}</p>

                <GetApiLink className="mt-3" compact />
              </div>

              <button
                type="button"
                onClick={dismissGameNotice}
                aria-label="Dismiss notice"
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
