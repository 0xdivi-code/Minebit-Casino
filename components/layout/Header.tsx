"use client";

import { Menu } from "lucide-react";
import { Logo } from "../ui/Logo";
import { BtnDark, BtnPrimary } from "../ui/Buttons";
import { useShell } from "./AppShell";

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
