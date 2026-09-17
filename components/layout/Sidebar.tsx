"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgePercent,
  Crown,
  Dices,
  Gem,
  Gift,
  Headset,
  Search,
  Spade,
  Trophy,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useShell } from "./AppShell";
import { BtnDark, BtnPrimary } from "../ui/Buttons";
import { ApplePayIcon, ChevronDown, EnFlag, GooglePayIcon, MastercardIcon, VisaIcon } from "../ui/Icons";

const mainNav = [
  { label: "Casino", href: "/lobby", icon: Spade, active: true },
  { label: "Originals", href: "/games/minebit-originals", icon: Dices },
  { label: "Loyalty", href: "/loyalty-guest", icon: Gem },
  { label: "VIP Club", href: "/vip-club", icon: Crown },
  { label: "Referral program", href: "/referral-overview", icon: Users },
];

const tournaments = [
  { amount: "$5000", label: "Monthly race", countdown: "12d:08h", icon: Trophy },
  { amount: "$2000", label: "Weekly race", countdown: "02d:14h", icon: Gift },
];

function ProfitShareBanner() {
  return (
    <a
      href="/profit-share"
      className="group relative block overflow-hidden rounded-main border border-[#2a3a2a] bg-gradient-to-br from-[#0f2417] via-[#12331d] to-[#0b1a12] p-4 transition-colors hover:border-neon/50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-neon/20 blur-2xl transition-opacity group-hover:opacity-100"
      />
      <div aria-hidden className="absolute right-2 top-1/2 -translate-y-1/2 opacity-90">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="30" r="20" fill="#FCBC05" />
          <circle cx="36" cy="30" r="20" fill="url(#coin)" fillOpacity="0.35" />
          <circle cx="36" cy="30" r="15" stroke="#B97A06" strokeWidth="2" strokeDasharray="4 3" />
          <text x="36" y="37" textAnchor="middle" fontSize="20" fontWeight="800" fill="#7A5205">%</text>
          <circle cx="16" cy="52" r="9" fill="#FD9535" />
          <circle cx="56" cy="54" r="7" fill="#49EE85" />
          <defs>
            <radialGradient id="coin" cx="0.35" cy="0.3" r="1">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <p className="text-[22px] font-extrabold leading-none text-neon">20%</p>
      <p className="mt-1 text-[13px] font-bold leading-tight text-cream">
        Profit Share
        <span className="mt-0.5 block text-[11px] font-medium text-muted-blue">
          House wins you share
        </span>
      </p>
    </a>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const { openAuth } = useShell();
  const [mode, setMode] = useState<"casino" | "sport">("casino");
  const [promoOpen, setPromoOpen] = useState(true);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto px-4 pb-6 pt-24 lg:pt-[104px]">
      {/* Casino / Sport toggle */}
      <div className="flex gap-2" role="tablist" aria-label="Product">
        {(["casino", "sport"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "flex flex-1 items-center justify-center rounded-second py-3 text-sm font-bold uppercase leading-[110%] transition-colors",
              mode === m
                ? "border border-steel-light bg-steel py-[10px]! text-cream"
                : "border border-transparent text-muted-blue hover:bg-navy"
            )}
          >
            {m === "casino" ? "Casino" : "Sport"}
          </button>
        ))}
      </div>

      <ProfitShareBanner />

      {/* Search */}
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-main border border-line-soft px-4 py-2.5 text-sm font-medium text-muted-blue transition-colors hover:bg-navy-hover"
      >
        <Search className="h-4 w-4" />
        Search
      </button>

      {/* Promotions accordion */}
      <div className="mt-2 rounded-main">
        <button
          type="button"
          onClick={() => setPromoOpen((o) => !o)}
          aria-expanded={promoOpen}
          className="flex w-full items-center gap-3 rounded-main px-2 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-navy"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-second bg-navy">
            <BadgePercent className="h-5 w-5 text-tangerine" />
          </span>
          Promotions
          <ChevronDown className={cn("ml-auto h-3 w-3 text-muted-blue transition-transform", promoOpen && "rotate-180")} />
        </button>
        <AnimatePresence initial={false}>
          {promoOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 px-1 pb-1 pt-1">
                {tournaments.map((t) => (
                  <a
                    key={t.label}
                    href="?modal=iqs-sign-up"
                    onClick={onNavigate}
                    className="flex items-center gap-2 rounded-main border border-transparent bg-panel p-1.5 transition-colors hover:border-line-soft hover:bg-slate-deep"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-main bg-slate-deep">
                      <t.icon className="h-[30px] w-[30px] text-indigo-soft" strokeWidth={1.6} />
                    </span>
                    <span className="flex flex-col">
                      <strong className="text-sm font-semibold text-fog">{t.amount}</strong>
                      <span className="text-[10px] text-muted-blue">{t.label}</span>
                    </span>
                    <span className="ml-auto rounded-md bg-indigo-soft px-2 py-2 text-[10px] font-semibold text-black">
                      {t.countdown}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Primary nav */}
      <nav aria-label="Primary" className="mt-1">
        <ul className="flex flex-col gap-1">
          {mainNav.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "mt-2 flex items-center gap-3 rounded-main px-3 py-2.5 text-sm font-semibold transition-colors",
                  item.active ? "bg-navy text-cream" : "text-muted-blue hover:bg-navy hover:text-cream"
                )}
              >
                <item.icon className="h-5 w-5" strokeWidth={1.9} />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Payments + buy crypto */}
      <div className="mt-4">
        <div className="flex items-center justify-between gap-1 px-2 py-1.5">
          <ApplePayIcon />
          <MastercardIcon />
          <VisaIcon />
          <GooglePayIcon />
        </div>
        <BtnPrimary className="mt-1 w-full justify-start!">
          <Wallet className="h-5 w-5" />
          Buy crypto
        </BtnPrimary>
      </div>

      <BtnDark className="mt-2 w-full justify-start!">
        <Headset className="h-5 w-5" />
        Live Support
      </BtnDark>

      {/* Language */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setLangOpen((o) => !o)}
          aria-expanded={langOpen}
          className="flex w-full items-center gap-3 rounded-main bg-navy px-4 py-3 text-sm font-semibold text-muted-blue transition-colors hover:bg-navy-hover hover:text-cream"
        >
          <EnFlag className="h-3.5 w-5 rounded-[2px]" />
          English
          <ChevronDown className={cn("ml-auto h-3 w-3 transition-transform", langOpen && "rotate-180")} />
        </button>
        <AnimatePresence>
          {langOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-x-0 bottom-full z-20 mb-2 flex flex-col gap-1 rounded-main border border-line bg-navy p-2 shadow-2xl"
            >
              {["English", "Русский", "Deutsch", "Español", "Français", "Português"].map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    onClick={() => setLangOpen(false)}
                    className="w-full rounded-second px-3 py-2 text-left text-sm text-muted-blue transition-colors hover:bg-slate-deep hover:text-cream"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-1 flex gap-2">
        <BtnDark className="h-full flex-1 px-1!">Affiliate</BtnDark>
        <BtnDark className="h-full flex-1 px-1!">Help Center</BtnDark>
      </div>
    </div>
  );
}

function MiniRail() {
  const icons = [Spade, Trophy, Search, Gift, Dices, Gem, Crown, Users, Wallet, Headset];
  return (
    <div className="hidden h-full flex-col items-center gap-1 overflow-y-auto px-2 pb-6 pt-24 lg:flex">
      {icons.map((Icon, i) => (
        <button
          key={i}
          type="button"
          aria-label="Sidebar shortcut"
          className="flex h-11 w-11 items-center justify-center rounded-main text-muted-blue transition-colors hover:bg-navy hover:text-neon"
        >
          <Icon className="h-5 w-5" strokeWidth={1.9} />
        </button>
      ))}
    </div>
  );
}

export default function Sidebar() {
  const { collapsed, mobileOpen, setMobileOpen } = useShell();

  return (
    <>
      {/* desktop / tablet fixed sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-[1000] hidden h-screen border-r border-line bg-abyss transition-[width] duration-[225ms] ease-out lg:block",
          collapsed ? "w-[68px]" : "w-64"
        )}
        aria-label="Sidebar"
      >
        {collapsed ? <MiniRail /> : <SidebarBody />}
      </aside>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[1001] bg-black/60 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed left-0 top-0 z-[1002] h-full w-[78%] max-w-[320px] border-r border-line bg-abyss lg:hidden"
              aria-label="Mobile sidebar"
            >
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-main bg-navy text-muted-blue"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarBody onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
