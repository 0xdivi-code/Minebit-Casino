"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { hotGames, liveCasino, newReleases, originals, slots, tapTrader, type Game } from "@/data/games";
import { useShell } from "../layout/AppShell";
import GameArt from "../games/GameArt";

const catalog: Game[] = [...originals, tapTrader, ...slots, ...hotGames, ...newReleases, ...liveCasino].filter(
  (g, i, arr) => arr.findIndex((x) => x.title === g.title) === i
);

export default function SearchModal() {
  const { searchOpen, closeSearch } = useShell();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeSearch();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setQuery("");
    window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [searchOpen, closeSearch]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalog.slice(0, 8);
    return catalog.filter(
      (g) => g.title.toLowerCase().includes(q) || g.provider.toLowerCase().includes(q)
    ).slice(0, 12);
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={closeSearch}
          className="fixed inset-0 z-[1120] flex items-start justify-center bg-black/70 p-4 pt-[10vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Search games"
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-[#0c1119] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <Search className="h-5 w-5 flex-none text-muted-blue" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search games or providers…"
                aria-label="Search games or providers"
                className="w-full bg-transparent text-sm font-medium text-cream outline-none placeholder:text-[#5b6b85]"
              />
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="text-muted-blue transition-colors hover:text-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-muted">
                  No games found for “{query}”. Try another search.
                </li>
              )}
              {results.map((g) => (
                <li key={g.id}>
                  <Link
                    href="/games/slots"
                    onClick={closeSearch}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-navy"
                  >
                    <span className="h-11 w-9 flex-none overflow-hidden rounded-md">
                      <GameArt game={g} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-cream">{g.title}</span>
                      <span className="block text-[11px] font-medium uppercase tracking-wide text-muted-blue">
                        {g.provider}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="border-t border-line px-5 py-3 text-[11px] text-muted-blue">
              {query.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Popular right now"}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
