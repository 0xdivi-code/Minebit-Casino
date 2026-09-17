"use client";

import { Dices, LayoutGrid, Menu, Search, Trophy } from "lucide-react";
import Link from "next/link";
import { useShell } from "./AppShell";

export default function BottomNav() {
  const { setMobileOpen, openSearch } = useShell();

  const btnCls =
    "flex w-full flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-muted-blue transition-colors hover:text-neon";

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-[999] border-t border-line bg-navy/95 backdrop-blur lg:hidden"
    >
      <ul className="grid grid-cols-5">
        <li>
          <button type="button" onClick={() => setMobileOpen(true)} className={btnCls}>
            <Menu className="h-5 w-5" />
            Menu
          </button>
        </li>
        <li>
          <Link href="/games/slots" className={btnCls}>
            <LayoutGrid className="h-5 w-5" />
            Slots
          </Link>
        </li>
        <li>
          <Link href="/games/minebit-originals" className={btnCls}>
            <Dices className="h-5 w-5" />
            Originals
          </Link>
        </li>
        <li>
          <Link href="/sportsbook" className={btnCls}>
            <Trophy className="h-5 w-5" />
            Sport
          </Link>
        </li>
        <li>
          <button type="button" onClick={openSearch} className={btnCls}>
            <Search className="h-5 w-5" />
            Search
          </button>
        </li>
      </ul>
    </nav>
  );
}
