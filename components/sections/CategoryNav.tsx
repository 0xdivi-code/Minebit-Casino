"use client";

import { motion } from "framer-motion";
import { Cherry, Dices, LayoutGrid, Radio, Sparkles } from "lucide-react";

const categories = [
  { label: "Slots", href: "/games/slots", icon: Cherry },
  { label: "Originals", href: "/games/minebit-originals", icon: Dices },
  { label: "Live Casino", href: "/games/live-casino", icon: Radio },
  { label: "New Releases", href: "/games/new", icon: Sparkles },
  { label: "Themes", href: "/themes", icon: LayoutGrid },
];

export default function CategoryNav() {
  return (
    <motion.nav
      aria-label="Game categories"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="mt-[48px] md:mt-[70px]"
    >
      <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
        {categories.map(({ label, href, icon: Icon }) => (
          <li key={label} className="flex-none">
            <a
              href={href}
              className="flex items-center gap-2.5 rounded-main border border-transparent bg-navy px-5 py-3.5 text-sm font-semibold text-muted-blue transition-all hover:border-line-soft hover:bg-navy-hover hover:text-cream"
            >
              <Icon className="h-5 w-5" strokeWidth={1.9} />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
