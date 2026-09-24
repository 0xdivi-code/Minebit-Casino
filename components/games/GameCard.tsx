"use client";

import { motion } from "framer-motion";
import { Heart, Play } from "lucide-react";
import { useState } from "react";
import type { Game } from "@/data/games";
import { cn } from "@/lib/utils";
import { useShell } from "../layout/AppShell";
import GameArt from "./GameArt";

const tagStyles: Record<string, string> = {
  Hot: "bg-tangerine text-black",
  New: "bg-neon text-slate-deep",
  Live: "bg-[#EF4141] text-white",
};

export default function GameCard({ game, widthClass = "w-[150px] sm:w-[164px] xl:w-[176px]" }: { game: Game; widthClass?: string }) {
  const [liked, setLiked] = useState(false);
  const { notifyMissingApiKey } = useShell();

  return (
    <motion.a
      href="#"
      onClick={(e) => {
        // No provider credentials connected — no game session can be created.
        e.preventDefault();
        notifyMissingApiKey({ title: game.title, provider: game.provider });
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn("group block flex-none snap-start", widthClass)}
      aria-label={`Play ${game.title}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-second border border-transparent transition-colors group-hover:border-line-soft">
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.06]">
          <GameArt game={game} />
        </div>

        {game.tag && (
          <span
            className={cn(
              "absolute left-2 top-2 flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none",
              tagStyles[game.tag]
            )}
          >
            {game.tag === "Live" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />}
            {game.tag}
          </span>
        )}

        <button
          type="button"
          aria-label={liked ? `Remove ${game.title} from favorites` : `Add ${game.title} to favorites`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          className={cn(
            "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 backdrop-blur transition-all",
            liked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          <Heart className={cn("h-3.5 w-3.5", liked ? "fill-neon text-neon" : "text-white")} />
        </button>

        {/* hover play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-200 group-hover:bg-navy/60 group-hover:opacity-100">
          <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-neon text-slate-deep transition-transform duration-200 group-hover:scale-100">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </div>

        {/* label */}
        <div className="absolute inset-x-0 bottom-0 p-2.5">
          <p className="truncate text-xs font-bold leading-[140%] text-white">{game.title}</p>
          <p className="mt-0.5 truncate text-[10px] font-medium uppercase leading-none tracking-wide text-white/70">
            {game.provider}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
