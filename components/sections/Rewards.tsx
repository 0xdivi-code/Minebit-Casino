"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { rewardTabs } from "@/data/content";
import { cn } from "@/lib/utils";

const tabIconSrc: Record<string, string> = {
  "clock-star": "/assets/icons/clock-star.svg",
  bolt: "/assets/icons/recurring-rewards.svg",
  crown: "/assets/icons/vip-transfers.svg",
  layers: "/assets/icons/level-up-bonuses.svg",
  shield: "/assets/icons/cashback-deals.svg",
};

const FALLBACK_ICON_SRC = tabIconSrc.bolt;

export default function Rewards() {
  const [active, setActive] = useState(rewardTabs[0].id);
  const tab = rewardTabs.find((t) => t.id === active) ?? rewardTabs[0];
  const headingIconSrc = tabIconSrc[tab.icon] ?? FALLBACK_ICON_SRC;

  return (
    <section aria-label="Rewards" className="mt-14">
      {/* rewards hero */}
      <div className="mx-auto flex max-w-[615px] justify-center text-center">
        <div className="flex flex-col items-center justify-center">
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-md border border-[#ED780C] bg-[#ED780C33] px-3.5 py-1.5">
            <span className="h-[7px] w-[7px] rounded-full bg-[#ED780C]" />
            <span className="text-sm font-semibold text-[#FFFBE7]">Rewards</span>
          </span>
          <h3 className="m-0 text-2xl font-semibold leading-[1.05] text-cream md:text-[42px]">
            House Wins You Share with <span className="text-gold">MineBit</span>
          </h3>
        </div>
      </div>

      {/* tabs */}
      <div role="tablist" aria-label="Rewards" className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
        {rewardTabs.map((t) => {
          const iconSrc = tabIconSrc[t.icon] ?? FALLBACK_ICON_SRC;
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(t.id)}
              className={cn(
                "flex flex-none items-center gap-2 rounded-main border px-4 py-3 text-sm font-semibold transition-colors",
                selected
                  ? "border-neon/60 bg-navy text-cream"
                  : "border-transparent bg-navy text-muted-blue hover:bg-navy-hover hover:text-cream"
              )}
            >
              <Image
                src={iconSrc}
                alt=""
                width={20}
                height={20}
                unoptimized
                aria-hidden
                className={cn("h-5 w-5", selected ? "text-neon" : "text-muted-blue")}
              />
              {t.title}
            </button>
          );
        })}
      </div>

      {/* panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-6 flex flex-col justify-center gap-6 overflow-hidden lg:flex-row lg:gap-20"
        >
          <div className="max-w-[640px] flex-1">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-main border border-line bg-navy text-gold">
                <Image
                  src={headingIconSrc}
                  alt=""
                  width={24}
                  height={24}
                  unoptimized
                  aria-hidden
                  className="h-6 w-6"
                />
              </span>
              <div>
                <h4 className="text-2xl font-semibold text-cream md:text-[34px]">{tab.heading}</h4>
                <p className="mt-1 text-sm text-muted md:text-base">{tab.sub}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3.5">
              {tab.cards.map((c, i) => (
                <div key={c.title} className="flex items-start gap-2.5 rounded-main border border-line bg-navy p-5">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-second bg-indigo-soft/20 text-base font-semibold text-fog">
                    0{i + 1}
                  </span>
                  <div>
                    <h5 className="text-lg font-semibold text-cream md:text-xl">{c.title}</h5>
                    <p className="mt-1 text-sm text-muted md:text-base">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* visual */}
          <div className="relative flex min-h-[280px] flex-1 items-center justify-center overflow-hidden rounded-main border border-line bg-gradient-to-br from-[#0e1a12] via-navy to-[#141b0e] p-8 lg:max-w-[480px]">
            <div aria-hidden className="hero-grid-bg absolute inset-0 opacity-70" />
            <div aria-hidden className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[80px]" />
            <svg viewBox="0 0 200 200" className="absolute h-[130%] w-auto opacity-[0.12]" aria-hidden>
              <circle cx="100" cy="100" r="86" fill="none" stroke="#49EE85" strokeWidth="1.5" strokeDasharray="8 10" />
              <circle cx="100" cy="100" r="64" fill="none" stroke="#49EE85" strokeWidth="1.5" strokeDasharray="4 8" />
              <circle cx="100" cy="100" r="42" fill="none" stroke="#49EE85" strokeWidth="1.5" />
            </svg>
            <div className="relative text-center">
              <p className="bg-gradient-to-b from-neon to-emerald-brand bg-clip-text text-6xl font-extrabold leading-none text-transparent md:text-7xl">
                {tab.visualTitle}
              </p>
              <p className="mx-auto mt-3 max-w-[260px] text-sm font-medium text-muted">{tab.visualSub}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
