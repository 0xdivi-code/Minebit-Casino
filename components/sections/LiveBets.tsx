"use client";

import { motion } from "framer-motion";
import { liveBets } from "@/data/games";
import { cn } from "@/lib/utils";
import GameArt from "../games/GameArt";

export default function LiveBets() {
  return (
    <motion.section
      aria-label="Live bets"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="mt-14"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neon" />
        </span>
        <h3 className="m-0 whitespace-nowrap p-0 text-2xl font-semibold leading-[110%] text-fog">
          Live Bets
        </h3>
      </div>

      <div className="no-scrollbar mt-4 overflow-x-auto rounded-main border border-line">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 overflow-hidden">
          <thead>
            <tr className="bg-navy text-left text-xs font-semibold uppercase tracking-wide text-muted-blue">
              <th className="px-6 py-3.5">Game</th>
              <th className="hidden px-6 py-3.5 md:table-cell">Player</th>
              <th className="hidden px-6 py-3.5 md:table-cell">Time</th>
              <th className="hidden px-6 py-3.5 text-right md:table-cell">Bet</th>
              <th className="px-6 py-3.5 text-right">Multiplier</th>
              <th className="px-6 py-3.5 text-right">Payout</th>
            </tr>
          </thead>
          <tbody>
            {liveBets.map((b, i) => (
              <tr
                key={b.id}
                className={cn(
                  "text-sm transition-colors hover:bg-navy-hover/60",
                  i % 2 === 0 ? "bg-abyss" : "bg-navy/40"
                )}
              >
                <td className="px-6 py-3">
                  <span className="flex items-center gap-2.5">
                    <span className="h-10 w-8 flex-none overflow-hidden rounded-[4px]">
                      <GameArt game={b.game} />
                    </span>
                    <span className="whitespace-nowrap text-sm font-medium leading-4 text-white">
                      {b.game.title}
                    </span>
                  </span>
                </td>
                <td className="hidden px-6 py-3 md:table-cell">
                  <span className="flex items-center gap-2">
                    <span className="h-[26px] w-[26px] rounded-full bg-gradient-to-r from-[#bfb5b7] to-[#a0abd0]" />
                    <span className="whitespace-nowrap text-xs font-medium leading-[140%] text-cream">
                      {b.player}
                    </span>
                  </span>
                </td>
                <td className="hidden whitespace-nowrap px-6 py-3 text-sm text-muted md:table-cell">{b.time}</td>
                <td className="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-cream md:table-cell">
                  ${b.bet}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right text-sm text-cream">
                  {b.multiplier === 0 ? "—" : `${b.multiplier}x`}
                </td>
                <td
                  className={cn(
                    "whitespace-nowrap px-6 py-3 text-right text-sm font-medium",
                    b.win ? "text-win" : "text-muted"
                  )}
                >
                  {b.win ? `$${b.payout}` : b.payout.startsWith("-") ? `-$${b.payout.slice(1)}` : b.payout}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
