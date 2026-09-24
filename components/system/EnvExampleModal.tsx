"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download, FileCode2, X } from "lucide-react";
import { useShell, type EnvRequest } from "../layout/AppShell";
import { CONTACT, ENV_EXAMPLE_FILE, buildEnvExample, copyText, downloadEnvExample, envExampleContext } from "@/lib/apiKeys";
import TelegramCta from "./TelegramCta";

/** Card body — remounted per request, so the "copied" state always starts clean. */
function EnvExampleCard({ request, onClose }: { request: EnvRequest; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const content = useMemo(
    () => buildEnvExample({ reason: request.reason, detail: request.detail }),
    [request]
  );

  const onCopy = async () => {
    const ok = await copyText(content);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 32, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
      onClick={(e) => e.stopPropagation()}
      className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-line bg-[#0c1119] p-5 sm:max-w-[720px] sm:rounded-2xl sm:p-7"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-line text-muted-blue transition-colors hover:border-line-soft hover:text-cream"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex items-start gap-3 pr-12">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-line bg-navy">
          <FileCode2 className="h-5 w-5 text-neon" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-cream">
            Simulated <span className="font-mono text-neon">{ENV_EXAMPLE_FILE}</span> generated
          </h2>
          <p className="mt-1 text-[13px] leading-snug text-muted">
            Generated for: {envExampleContext(request.reason, request.detail)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-tangerine/60 bg-tangerine/10 px-2 py-1 text-tangerine">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tangerine" />
          API keys not connected
        </span>
        <span className="inline-flex items-center rounded-md border border-line bg-navy px-2 py-1 text-muted-blue">
          No real secrets included
        </span>
      </div>

      <pre className="mt-4 max-h-[42vh] overflow-auto rounded-xl border border-line bg-[#080d12] p-4 text-[11px] leading-relaxed text-muted-blue">
        <code>{content}</code>
      </pre>

      <div className="mt-5">
        <p className="text-sm font-semibold text-cream">Contact {CONTACT.name} on Telegram for full access</p>
        <p className="mt-1 text-[13px] leading-snug text-muted">
          Mention your deployment so the live provider keys can be issued to your environment.
        </p>
        <TelegramCta className="mt-3" compact />
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => downloadEnvExample({ reason: request.reason, detail: request.detail })}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-main bg-navy px-4 py-3 text-[13px] font-semibold text-muted-blue transition-colors hover:bg-navy-hover hover:text-cream sm:text-sm"
        >
          <Download className="h-4 w-4" />
          Download {ENV_EXAMPLE_FILE}
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-main bg-navy px-4 py-3 text-[13px] font-semibold text-muted-blue transition-colors hover:bg-navy-hover hover:text-cream sm:text-sm"
        >
          {copied ? <Check className="h-4 w-4 text-neon" strokeWidth={3} /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied contents" : "Copy contents"}
        </button>
      </div>
    </motion.div>
  );
}

/** Read-only viewer for the simulated `.env.example` that gets generated. */
export default function EnvExampleModal() {
  const { envRequest, closeEnvModal } = useShell();
  const open = envRequest !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeEnvModal();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeEnvModal]);

  return (
    <AnimatePresence>
      {open && envRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeEnvModal}
          className="fixed inset-0 z-[1300] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Generated ${ENV_EXAMPLE_FILE}`}
        >
          <EnvExampleCard
            key={`${envRequest.reason}:${envRequest.detail ?? ""}`}
            request={envRequest}
            onClose={closeEnvModal}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
