"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpDown,
  Bomb,
  Boxes,
  Car,
  Castle,
  Cherry,
  CircleDot,
  Club,
  Crosshair,
  Crown,
  Dices,
  FerrisWheel,
  Flag,
  Flame,
  Gem,
  Gift,
  Hash,
  Headset,
  Heart,
  History,
  LifeBuoy,
  MousePointerClick,
  PanelLeftClose,
  PanelLeftOpen,
  Rocket,
  Search,
  Shapes,
  Spade,
  Sparkles,
  Tag,
  Target,
  Trophy,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useShell } from "./AppShell";
import { BtnDark, BtnPrimary } from "../ui/Buttons";
import { ApplePayIcon, ChevronDown, EnFlag, GooglePayIcon, MastercardIcon, VisaIcon } from "../ui/Icons";
import { sidebarPlainLinks, sidebarSections, type NavItem } from "@/data/navigation";

const iconMap: Record<string, typeof Gift> = {
  gift: Gift,
  target: Target,
  flag: Flag,
  spade: Spade,
  heart: Heart,
  history: History,
  cherry: Cherry,
  flame: Flame,
  sparkles: Sparkles,
  rocket: Rocket,
  users: Users,
  dices: Dices,
  lifebuoy: LifeBuoy,
  tag: Tag,
  crown: Crown,
  shapes: Shapes,
  boxes: Boxes,
  gem: Gem,
  tap: MousePointerClick,
  castle: Castle,
  car: Car,
  updown: ArrowUpDown,
  circledot: CircleDot,
  x: X,
  hash: Hash,
  bomb: Bomb,
  ferris: FerrisWheel,
  crosshair: Crosshair,
  club: Club,
};

function MbMark({ className }: { className?: string }) {
  return (
    <span className={cn("text-[17px] font-extrabold italic leading-none tracking-tight", className)}>
      MB
    </span>
  );
}

function SectionIcon({ name, className }: { name: string; className?: string }) {
  if (name === "mb") return <MbMark className={className} />;
  const Icon = iconMap[name] ?? Dices;
  return <Icon className={className} strokeWidth={1.9} />;
}

const tournaments = [{ amount: "$5000", label: "Monthly race", countdown: "12d:14h" }];

function ProfitShareBanner() {
  return (
    <Link
      href="/profit-share"
      className="group relative block overflow-hidden rounded-xl border border-line/60 bg-gradient-to-r from-[#08170f] via-[#0c2617] to-[#0a1a10] transition-colors hover:border-neon/50"
    >
      <div className="relative z-[1] flex flex-col justify-center gap-0.5 p-3.5">
        <p className="text-xl font-extrabold leading-none text-gold">20%</p>
        <p className="text-[15px] font-bold leading-tight text-cream">Profit Share</p>
      </div>
      {/* vault + coins art */}
      <svg viewBox="0 0 130 76" aria-hidden className="absolute bottom-0 right-0 top-0 h-full w-[62%]">
        <circle cx="96" cy="40" r="34" fill="#1b2b1f" />
        <circle cx="96" cy="40" r="34" fill="none" stroke="#2c4232" strokeWidth="3" />
        <circle cx="96" cy="40" r="24" fill="#243627" stroke="#3a5441" strokeWidth="2" />
        {[0, 60, 120].map((a) => (
          <rect key={a} x="93" y="12" width="6" height="56" rx="3" fill="#4a6350" transform={`rotate(${a} 96 40)`} />
        ))}
        <circle cx="96" cy="40" r="9" fill="#31463a" stroke="#4a6350" strokeWidth="2" />
        <circle cx="34" cy="52" r="12" fill="#FCBC05" />
        <circle cx="34" cy="52" r="12" fill="none" stroke="#B97A06" strokeWidth="2" />
        <text x="34" y="57" textAnchor="middle" fontSize="13" fontWeight="800" fill="#7A5205">$</text>
        <circle cx="52" cy="62" r="9" fill="#FD9535" />
        <text x="52" y="66" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7A3A05">$</text>
        <circle cx="20" cy="64" r="7" fill="#FCBC05" opacity="0.9" />
        <circle cx="122" cy="14" r="8" fill="#FCBC05" />
        <circle cx="112" cy="64" r="6" fill="#FD9535" />
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-neon/10 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}

function AccordionSection({
  sectionId,
  title,
  href,
  icon,
  items,
  expanded,
  onToggle,
  onNavigate,
  pathname,
}: {
  sectionId: string;
  title: string;
  href: string;
  icon: string;
  items: NavItem[];
  expanded: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
  pathname: string;
}) {
  const titleCls = expanded ? "text-neon" : "text-muted-blue";
  return (
    <div className="flex-none overflow-hidden rounded-xl bg-navy">
      {/* header row — always fully visible */}
      <div className={cn("flex items-center gap-3 px-3 py-3", expanded && "border-b border-line/60")}>
        <Link
          href={href}
          onClick={onNavigate}
          className={cn(
            "flex min-w-0 flex-1 items-center gap-3 text-[15px] font-semibold transition-colors hover:text-cream",
            titleCls
          )}
        >
          <SectionIcon name={icon} className={cn("h-5 w-5 flex-none", titleCls)} />
          <span className="truncate">{title}</span>
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${title}`}
          className={cn(
            "flex-none rounded-md p-1 transition-colors",
            expanded ? "text-neon hover:text-cream" : "text-muted-blue hover:text-cream"
          )}
        >
          <ChevronDown className={cn("block h-3.5 w-3.5 transition-transform duration-300", expanded && "rotate-180")} />
        </button>
      </div>

      {/* collapsible body — pure CSS animation, can never freeze mid-height */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 overflow-hidden" inert={!expanded}>
          {sectionId === "promotions" && (
            <div className="px-1.5 pt-1.5">
              {tournaments.map((t) => (
                <Link
                  key={t.label}
                  href="/promotions"
                  onClick={onNavigate}
                  tabIndex={expanded ? undefined : -1}
                  className="flex items-center gap-2.5 rounded-xl border border-transparent bg-panel p-2 transition-colors hover:border-line-soft hover:bg-slate-deep"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-deep">
                    <Trophy className="h-6 w-6 text-indigo-soft" strokeWidth={1.6} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <strong className="text-sm font-bold text-fog">{t.amount}</strong>
                    <span className="text-[11px] text-muted-blue">{t.label}</span>
                  </span>
                  <span className="ml-auto flex-none rounded-md bg-indigo-soft px-2 py-2 text-[11px] font-bold text-black">
                    {t.countdown}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* sub-list scrolls internally when long; never pushes the page */}
          <ul className="max-h-72 flex flex-col gap-0.5 overflow-y-auto overscroll-contain px-1.5 pb-2 pt-1.5">
            {items.map((item) => {
              const active = item.href === pathname;
              return (
                <li key={item.label} className="flex-none">
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    tabIndex={expanded ? undefined : -1}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active ? "text-neon" : "text-muted-blue hover:bg-white/5 hover:text-cream"
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-neon" />
                    )}
                    <SectionIcon name={item.icon} className="h-5 w-5 flex-none" />
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto flex-none rounded-md bg-neon/15 px-2 py-1 text-[11px] font-bold text-neon">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const { openSearch, openWallet, toggleCollapsed } = useShell();
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({ promotions: true, casino: true, originals: true });
  const [langOpen, setLangOpen] = useState(false);

  const isSport = pathname.startsWith("/sportsbook");

  // auto-expand the section containing the active route
  useEffect(() => {
    sidebarSections.forEach((s) => {
      if (s.items.some((i) => i.href === pathname) || s.href === pathname) {
        setOpen((o) => (o[s.id] ? o : { ...o, [s.id]: true }));
      }
    });
  }, [pathname]);

  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    // sidebar scrolls independently — the page behind never moves
    <div className="flex h-full flex-col gap-2 overflow-y-auto overscroll-y-contain px-3 pb-6 pt-14 lg:pt-3">
      {/* Casino / Sport toggle + collapse */}
      <div className="flex flex-none gap-2">
        <div className="flex flex-1 gap-1 rounded-xl border border-line p-1" role="tablist" aria-label="Product">
          <Link
            href="/lobby"
            role="tab"
            aria-selected={!isSport}
            className={cn(
              "flex flex-1 items-center justify-center rounded-lg py-2.5 text-[13px] font-bold uppercase tracking-wide transition-colors",
              !isSport ? "bg-steel text-cream" : "text-muted-blue hover:text-cream"
            )}
          >
            Casino
          </Link>
          <Link
            href="/sportsbook"
            role="tab"
            aria-selected={isSport}
            className={cn(
              "flex flex-1 items-center justify-center rounded-lg py-2.5 text-[13px] font-bold uppercase tracking-wide transition-colors",
              isSport ? "bg-steel text-cream" : "text-muted-blue hover:text-cream"
            )}
          >
            Sport
          </Link>
        </div>
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label="Collapse sidebar"
          className="hidden w-12 flex-none items-center justify-center rounded-xl bg-navy text-muted-blue transition-colors hover:bg-navy-hover hover:text-cream lg:flex"
        >
          <PanelLeftClose className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-none">
        <ProfitShareBanner />
      </div>

      {/* Search */}
      <button
        type="button"
        onClick={openSearch}
        className="flex w-full flex-none items-center gap-3 rounded-xl border border-line-soft px-4 py-2.5 text-sm font-medium text-muted-blue transition-colors hover:bg-navy-hover"
      >
        <Search className="h-4 w-4" />
        Search
      </button>

      {/* Accordion sections */}
      {sidebarSections.map((section) => (
        <AccordionSection
          key={section.id}
          sectionId={section.id}
          title={section.title}
          href={section.href}
          icon={section.icon}
          items={section.items}
          expanded={!!open[section.id]}
          onToggle={() => toggle(section.id)}
          onNavigate={onNavigate}
          pathname={pathname}
        />
      ))}

      {/* Plain links */}
      <nav aria-label="Primary" className="mt-1 flex-none px-1">
        <ul className="flex flex-col gap-0.5">
          {sidebarPlainLinks.map((item) => {
            const active = item.href === pathname;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-neon" : "text-muted-blue hover:bg-white/5 hover:text-cream"
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-neon" />
                  )}
                  <SectionIcon name={item.icon} className="h-5 w-5 flex-none" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Payments + buy crypto */}
      <div className="mt-3 flex-none px-1">
        <div className="flex items-center justify-between gap-1 px-1 py-1.5">
          <ApplePayIcon />
          <MastercardIcon />
          <VisaIcon />
          <GooglePayIcon />
        </div>
        <BtnPrimary onClick={() => openWallet("buy")} className="mt-1 w-full justify-start!">
          <Wallet className="h-5 w-5" />
          Buy crypto
        </BtnPrimary>
      </div>

      <BtnDark className="mt-1 w-full flex-none justify-start!">
        <Headset className="h-5 w-5" />
        Live Support
      </BtnDark>

      {/* Language */}
      <div className="relative flex-none">
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

      <div className="mt-1 flex flex-none gap-2">
        <a
          href="https://mine.partners/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full flex-1 items-center justify-center gap-2 rounded-main bg-navy px-1 py-3 text-sm font-semibold leading-[150%] text-muted-blue transition-colors hover:bg-navy-hover"
        >
          Affiliate
        </a>
        <Link
          href="/help-center-account"
          onClick={onNavigate}
          className="flex h-full flex-1 items-center justify-center gap-2 rounded-main bg-navy px-1 py-3 text-sm font-semibold leading-[150%] text-muted-blue transition-colors hover:bg-navy-hover"
        >
          Help Center
        </Link>
      </div>
    </div>
  );
}

function MiniRail() {
  const { toggleCollapsed, openSearch } = useShell();
  const icons = [
    { label: "Promotions", icon: Gift, href: "/promotions" },
    { label: "Casino", icon: Spade, href: "/lobby" },
    { label: "Originals", icon: Dices, href: "/games/minebit-originals" },
    { label: "Slots", icon: Cherry, href: "/games/slots" },
    { label: "Live Casino", icon: Users, href: "/games/live-casino" },
    { label: "VIP Club", icon: Crown, href: "/vip-club" },
  ];
  return (
    <div className="hidden h-full flex-col items-center gap-1 overflow-y-auto overscroll-y-contain px-2 pb-6 pt-3 lg:flex">
      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label="Expand sidebar"
        className="mb-2 flex h-11 w-11 flex-none items-center justify-center rounded-main bg-navy text-muted-blue transition-colors hover:bg-navy-hover hover:text-neon"
      >
        <PanelLeftOpen className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search"
        className="flex h-11 w-11 flex-none items-center justify-center rounded-main text-muted-blue transition-colors hover:bg-navy hover:text-neon"
      >
        <Search className="h-5 w-5" strokeWidth={1.9} />
      </button>
      {icons.map(({ label, icon: Icon, href }) => (
        <Link
          key={label}
          href={href}
          title={label}
          aria-label={label}
          className="flex h-11 w-11 flex-none items-center justify-center rounded-main text-muted-blue transition-colors hover:bg-navy hover:text-neon"
        >
          <Icon className="h-5 w-5" strokeWidth={1.9} />
        </Link>
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
