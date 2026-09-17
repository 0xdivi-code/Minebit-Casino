"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Game } from "@/data/games";
import Carousel, { CarouselApi, CarouselNavButtons, CarouselNavState } from "../ui/Carousel";
import SectionHeader from "../ui/SectionHeader";
import GameCard from "./GameCard";

interface GameSectionProps {
  icon: ReactNode;
  title: string;
  count?: number | string;
  games: Game[];
  viewAllHref: string;
}

export default function GameSection({ icon, title, count, games, viewAllHref }: GameSectionProps) {
  const apiRef = useRef<CarouselApi | null>(null);
  const [nav, setNav] = useState<CarouselNavState>({ canPrev: false, canNext: true });

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      aria-label={title}
      className="mt-8"
    >
      <SectionHeader
        icon={icon}
        title={title}
        count={count}
        viewAllHref={viewAllHref}
        nav={
          <CarouselNavButtons
            label={title}
            canPrev={nav.canPrev}
            canNext={nav.canNext}
            onPrev={() => apiRef.current?.prev()}
            onNext={() => apiRef.current?.next()}
          />
        }
      />
      <Carousel label={`${title} games`} apiRef={apiRef} onNavChange={setNav}>
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </Carousel>
    </motion.section>
  );
}
