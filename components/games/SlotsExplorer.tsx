"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Check, Cherry } from "lucide-react";
import type { Game } from "@/data/games";
import { cn } from "@/lib/utils";
import SlotCard from "./SlotCard";

const sorts = [
  { id: "default", label: "Default" },
  { id: "az", label: "Name A–Z" },
  { id: "provider", label: "Provider" },
] as const;

type SortId = (typeof sorts)[number]["id"];

export default function SlotsExplorer({ games }: { games: Game[] }) {
  const [sort, setSort] = useState<SortId>("default");
  const [open, setOpen] = useState(false);

  const sorted = useMemo(() => {
    const list = [...games];
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "provider") list.sort((a, b) => a.provider.localeCompare(b.provider));
    return list;
  }, [games, sort]);

  const active = sorts.find((s) => s.id === sort) ?? sorts[0];

  return (
    <section aria-label="Slots" className="pt-6">
      <div className="flex items-center gap-2">
        <Cherry className="h-6 w-6 text-neon" strokeWidth={1.9} />
        <h1 className="text-2xl font-bold text-cream">Slots</h1>
        <div className="relative ml-auto">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-haspopup="listbox"
            className="flex items-center gap-2 rounded-main bg-navy px-4 py-2.5 text-sm font-semibold text-muted-blue transition-colors hover:bg-navy-hover hover:text-cream"
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort by: <span className="text-cream">{active.label}</span>
          </button>
          <AnimatePresence>
            {open && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                <motion.ul
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  role="listbox"
                  className="absolute right-0 z-20 mt-2 w-44 rounded-main border border-line bg-navy p-1.5 shadow-2xl"
                >
                  {sorts.map((s) => (
                    <li key={s.id} role="option" aria-selected={s.id === sort}>
                      <button
                        type="button"
                        onClick={() => {
                          setSort(s.id);
                          setOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-second px-3 py-2 text-left text-sm transition-colors",
                          s.id === sort ? "text-neon" : "text-muted-blue hover:bg-slate-deep hover:text-cream"
                        )}
                      >
                        {s.label}
                        {s.id === sort && <Check className="h-4 w-4" />}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-5 grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8"
      >
        {sorted.map((g) => (
          <SlotCard key={g.id} game={g} />
        ))}
      </motion.div>
    </section>
  );
}
