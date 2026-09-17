"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-label="Frequently asked questions" className="mt-14 max-w-[900px]">
      <h2 className="text-xl font-bold text-cream">Frequently asked questions</h2>
      <div className="mt-4 flex flex-col gap-2.5">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={cn(
                "overflow-hidden rounded-main border bg-navy transition-colors",
                isOpen ? "border-line-soft" : "border-line"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-cream"
              >
                {f.q}
                <span
                  className={cn(
                    "flex h-8 w-8 flex-none items-center justify-center rounded-second transition-all duration-200",
                    isOpen ? "rotate-45 bg-neon text-slate-deep" : "bg-slate-deep text-muted"
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
