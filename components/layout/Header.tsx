"use client";

import { ArrowRight, Menu } from "lucide-react";
import { Logo } from "../ui/Logo";
import { BtnDark, BtnPrimary } from "../ui/Buttons";
import { useShell } from "./AppShell";
import { CONTACT, GATE_BADGE } from "@/lib/apiKeys";

export default function Header() {
  const { collapsed, setMobileOpen, openAuth } = useShell();

  return (
    <header
      className={`fixed right-0 top-0 z-[999] flex h-20 items-center border-b border-line bg-abyss transition-[left] duration-[225ms] ease-out ${
        collapsed ? "left-0 lg:left-[68px]" : "left-0 lg:left-64"
      }`}
    >
      <div className="flex w-full items-center gap-2 px-4 md:px-6 lg:px-8">
        {/* mobile menu */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-main bg-navy text-cream transition-colors hover:bg-navy-hover lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Logo />

        <div className="ml-auto flex items-center">
          <a
            href={CONTACT.telegramUrl}
            target="_blank"
            rel="noreferrer noopener"
            title="API credentials are issued on Telegram"
            className="mr-2 hidden items-center gap-2 rounded-main border border-tangerine/40 bg-tangerine/10 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-tangerine transition-colors hover:border-tangerine lg:flex"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tangerine" />
            {GATE_BADGE}
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.8} />
          </a>
          <BtnDark onClick={() => openAuth("login")} className="ml-4 hidden px-8! sm:flex">
            Log In
          </BtnDark>
          <BtnPrimary onClick={() => openAuth("register")} className="ml-2 px-6! sm:px-8!">
            Register
          </BtnPrimary>
        </div>
      </div>
    </header>
  );
}
