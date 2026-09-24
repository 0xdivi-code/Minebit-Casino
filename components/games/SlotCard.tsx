"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import type { Game } from "@/data/games";
import { useShell } from "../layout/AppShell";
import GameArt from "./GameArt";

/** Portrait slot tile with provider strip + big title, as on the Slots page. */
export default function SlotCard({ game }: { game: Game }) {
  const [liked, setLiked] = useState(false);
  const { notifyMissingApiKey } = useShell();

  return (
    <motion.a
      href="#"
      onClick={(e) => {
        // Games need the aggregator key — surface the "no API key" popup instead.
        e.preventDefault();
        notifyMissingApiKey({ title: game.title, provider: game.provider });
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group relative block overflow-hidden rounded-second border border-transparent transition-colors hover:border-line-soft"
      aria-label={`Play ${game.title}`}
    >
      <div className="relative aspect-[3/4]">
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.05]">
          <GameArt game={game} />
        </div>

        {/* provider strip */}
        <div className="absolute inset-x-0 top-0 bg-black/40 px-2 py-1 text-center backdrop-blur-[2px]">
          <p className="truncate text-[9px] font-bold uppercase tracking-[0.14em] text-white/85">
            {game.provider}
          </p>
        </div>

        {/* big title */}
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent px-2 pb-6 pt-7">
          <p className="text-center text-[13px] font-extrabold uppercase leading-[1.15] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            {game.title}
          </p>
        </div>

        {/* hover play */}
        <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-200 group-hover:bg-navy/60 group-hover:opacity-100">
          <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-neon text-slate-deep transition-transform duration-200 group-hover:scale-100">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </div>

        <button
          type="button"
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          className={`absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-xs backdrop-blur transition-all ${
            liked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <span className={liked ? "text-neon" : "text-white"}>♥</span>
        </button>
      </div>
    </motion.a>
  );
}
