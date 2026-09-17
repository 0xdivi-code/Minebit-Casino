"use client";

import { Dices, LayoutGrid, Menu, Search, Trophy } from "lucide-react";
import { useShell } from "./AppShell";

const items = [
  { label: "Menu", icon: Menu, action: "menu" },
  { label: "Slots", icon: LayoutGrid, action: "link" },
  { label: "Originals", icon: Dices, action: "link" },
  { label: "Sport", icon: Trophy, action: "link" },
  { label: "Search", icon: Search, action: "link" },
] as const;

export default function BottomNav() {
  const { setMobileOpen } = useShell();
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-[999] border-t border-line bg-navy/95 backdrop-blur lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              onClick={() => item.action === "menu" && setMobileOpen(true)}
              className="flex w-full flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-muted-blue transition-colors hover:text-neon"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
