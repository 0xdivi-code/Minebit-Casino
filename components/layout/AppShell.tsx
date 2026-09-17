"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

interface ShellState {
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const ShellContext = createContext<ShellState>({
  collapsed: false,
  toggleCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
});

export const useShell = () => useContext(ShellContext);

export default function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), []);

  return (
    <ShellContext.Provider value={{ collapsed, toggleCollapsed, mobileOpen, setMobileOpen }}>
      <Sidebar />
      <Header />
      <div
        className={`transition-[margin] duration-[225ms] ease-out ${
          collapsed ? "lg:ml-[68px]" : "lg:ml-64"
        }`}
      >
        <main className="min-h-screen px-4 pb-16 pt-20 md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1440px]">{children}</div>
        </main>
        <Footer />
      </div>
      <BottomNav />
      {/* mobile bottom padding so content isn't hidden behind bottom nav */}
      <div className="h-[68px] lg:hidden" />
    </ShellContext.Provider>
  );
}
