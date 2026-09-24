"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileCode2, Lock, X } from "lucide-react";
import { useShell } from "../layout/AppShell";
import ScriptLogo from "../ui/ScriptLogo";
import TelegramCta from "./TelegramCta";
import { CONTACT, ENV_EXAMPLE_FILE, REQUIRED_CREDENTIALS, downloadEnvExample } from "@/lib/apiKeys";

/**
 * Shown right after a visitor submits the sign-in / registration form: the
 * details are "accepted" but the platform cannot grant access without API keys,
 * so the visitor is pointed at the developer's Telegram.
 */
export default function AccessRequiredModal() {
  const { accessRequest, closeAccessRequest, openEnvModal } = useShell();
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

  const detail = accessRequest?.identifier ?? accessRequest?.provider ?? (isRegister ? "new account" : "sign-in");

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
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-line bg-[#0c1119] p-6 sm:max-w-[520px] sm:rounded-2xl sm:p-8"
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
                API keys not connected
              </span>
            </div>

            <h2 className="mt-4 text-center text-xl font-extrabold text-cream md:text-2xl">
              {isRegister ? "Account created — full access required" : "Signed in — full access required"}
            </h2>
            <p className="mx-auto mt-3 max-w-[420px] text-center text-sm leading-relaxed text-muted">
              Your details were accepted, but this deployment has no provider credentials connected yet, so the account
              cannot be activated. Games, deposits, withdrawals and bonuses stay locked until the API keys are live.
            </p>

            <div className="mt-5 rounded-xl border border-line bg-navy/60 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-blue">
                Contact the developer on Telegram for full access
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-lg font-extrabold text-neon">{CONTACT.handle}</span>
                <span className="text-[11px] font-semibold text-muted">@Vicckr · direct message</span>
              </p>
              <TelegramCta
                className="mt-3"
                compact
                label={`Message ${CONTACT.handle} for access`}
                message={`Hi ${CONTACT.username}, I just ${
                  isRegister ? "registered on" : "signed in to"
                } the MineBit deployment. The API keys are not connected — please give me full access. (${detail})`}
              />
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {REQUIRED_CREDENTIALS.slice(0, 6).map((c) => (
                <li
                  key={c.key}
                  className="flex items-center gap-2 rounded-lg border border-line bg-[#080d12] px-2.5 py-1.5 text-[10.5px] text-muted-blue"
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-tangerine" />
                  <span className="break-all font-mono leading-snug">{c.key}</span>
                  <span className="ml-auto flex-none font-semibold uppercase text-tangerine/80">missing</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => downloadEnvExample({ reason: "signin", detail })}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-main bg-navy px-4 py-3 text-[13px] font-semibold text-muted-blue transition-colors hover:bg-navy-hover hover:text-cream sm:text-sm"
              >
                <Download className="h-4 w-4" />
                Download {ENV_EXAMPLE_FILE}
              </button>
              <button
                type="button"
                onClick={() => openEnvModal({ reason: "signin", detail })}
                className="flex flex-1 items-center justify-center gap-2 rounded-main border border-line px-4 py-3 text-sm font-semibold text-muted-blue transition-colors hover:border-line-soft hover:text-cream"
              >
                <FileCode2 className="h-4 w-4" />
                View generated file
              </button>
            </div>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-blue">
              Simulated front-end: nothing was sent to a server. Reference:{" "}
              <span className="font-semibold text-cream/80">
                {accessRequest.mode} · {detail}
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
