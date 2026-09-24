"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { topWins, type TopWin } from "@/data/games";
import Carousel, { CarouselApi, CarouselNavButtons, CarouselNavState } from "../ui/Carousel";
import SectionHeader from "../ui/SectionHeader";
import GameArt from "../games/GameArt";
import { useShell } from "../layout/AppShell";

function WinnerCard({ win }: { win: TopWin }) {
  const { notifyMissingApiKey } = useShell();

  return (
    <motion.a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        notifyMissingApiKey({ title: win.game.title, provider: win.game.provider });
      }}
      whileHover={{ y: -2 }}
      className="flex h-[88px] w-[221px] max-w-[221px] flex-none snap-start items-center gap-3 overflow-hidden rounded-second border border-line bg-navy p-2 transition-colors hover:border-line-soft"
    >
      <div className="h-[72px] w-[55px] flex-none overflow-hidden rounded-[6px]">
        <GameArt game={win.game} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-xs font-bold leading-[140%] text-white">{win.game.title}</p>
        <div className="mt-0.5 flex items-center gap-1 text-xs font-medium leading-[140%] text-cream">
          <span className="h-[18px] w-[18px] flex-none rounded-full bg-gradient-to-r from-[#bfb5b7] to-[#a0abd0]" />
          <span className="truncate">{win.player}</span>
        </div>
        <div className="mt-1 border-t border-line pt-1">
          <p className="text-xs font-medium leading-[140%] text-[#58667d]">{win.multiplier}x</p>
          <p className="mt-0.5 text-base font-semibold leading-[140%] text-neon">${win.amount}</p>
        </div>
      </div>
    </motion.a>
  );
}

export default function TopWins() {
  const apiRef = useRef<CarouselApi | null>(null);
  const [nav, setNav] = useState<CarouselNavState>({ canPrev: false, canNext: true });

  return (
    <motion.section
      aria-label="Top wins"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="mt-5 md:mt-5"
      data-is-recent-winners
    >
      <SectionHeader
        icon={<Trophy />}
        title="Top wins"
        nav={
          <CarouselNavButtons
            label="Top wins"
            canPrev={nav.canPrev}
            canNext={nav.canNext}
            onPrev={() => apiRef.current?.prev()}
            onNext={() => apiRef.current?.next()}
          />
        }
      />
      <div className="mt-4">
        <Carousel label="Top wins" apiRef={apiRef} onNavChange={setNav}>
          {topWins.map((w) => (
            <WinnerCard key={w.id} win={w} />
          ))}
        </Carousel>
      </div>
    </motion.section>
  );
}
