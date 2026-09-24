"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, X } from "lucide-react";
import { useShell } from "../layout/AppShell";
import ScriptLogo from "../ui/ScriptLogo";
import GetApiLink from "./GetApiLink";
import { GATE_BADGE, GATE_MESSAGE } from "@/lib/apiKeys";

/**
 * Shown right after a visitor submits the sign-in / registration form: the
 * details are accepted, but access needs API keys that this deployment does not
 * have, so the visitor is pointed at the developer's Telegram.
 */
export default function AccessRequiredModal() {
  const { accessRequest, closeAccessRequest } = useShell();
  const open = accessRequest !== null;
  const isRegister = accessRequest?.mode === "register";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAccessRequest();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeAccessRequest]);

  return (
    <AnimatePresence>
      {open && accessRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeAccessRequest}
          className="fixed inset-0 z-[1200] flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Full access required"
        >
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-line bg-[#0c1119] p-6 sm:max-w-[460px] sm:rounded-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeAccessRequest}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line text-muted-blue transition-colors hover:border-line-soft hover:text-cream"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex justify-center pt-2">
              <ScriptLogo />
            </div>

            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-tangerine/60 bg-tangerine/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-tangerine">
                <Lock className="h-3.5 w-3.5" />
                {GATE_BADGE}
              </span>
            </div>

            <h2 className="mt-4 text-center text-xl font-extrabold text-cream md:text-2xl">
              {isRegister ? "Account created — full access required" : "Signed in — full access required"}
            </h2>

            <p className="mx-auto mt-3 max-w-[380px] text-center text-sm leading-relaxed text-muted">{GATE_MESSAGE}</p>

            <GetApiLink className="mt-6 w-full" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
