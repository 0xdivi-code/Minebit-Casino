"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import AuthModal from "../auth/AuthModal";

export type AuthMode = "login" | "register";

interface ShellState {
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  authMode: AuthMode | null;
  openAuth: (mode: AuthMode) => void;
  closeAuth: () => void;
  switchAuth: (mode: AuthMode) => void;
}

const ShellContext = createContext<ShellState>({
  collapsed: false,
  toggleCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
  authMode: null,
  openAuth: () => {},
  closeAuth: () => {},
  switchAuth: () => {},
});

export const useShell = () => useContext(ShellContext);

export default function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), []);
  const openAuth = useCallback((mode: AuthMode) => setAuthMode(mode), []);
  const closeAuth = useCallback(() => setAuthMode(null), []);
  const switchAuth = useCallback((mode: AuthMode) => setAuthMode(mode), []);

  return (
    <ShellContext.Provider
      value={{ collapsed, toggleCollapsed, mobileOpen, setMobileOpen, authMode, openAuth, closeAuth, switchAuth }}
    >
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
      <AuthModal />
    </ShellContext.Provider>
  );
}
