"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import AuthModal from "../auth/AuthModal";
import SearchModal from "../search/SearchModal";
import WalletModal from "../wallet/WalletModal";

export type AuthMode = "login" | "register";
export type WalletTab = "deposit" | "withdraw" | "buy";

interface ShellState {
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  authMode: AuthMode | null;
  openAuth: (mode: AuthMode) => void;
  closeAuth: () => void;
  switchAuth: (mode: AuthMode) => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  walletTab: WalletTab | null;
  openWallet: (tab?: WalletTab) => void;
  closeWallet: () => void;
  switchWalletTab: (tab: WalletTab) => void;
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
  searchOpen: false,
  openSearch: () => {},
  closeSearch: () => {},
  walletTab: null,
  openWallet: () => {},
  closeWallet: () => {},
  switchWalletTab: () => {},
});

export const useShell = () => useContext(ShellContext);

export default function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), []);
  const openAuth = useCallback((mode: AuthMode) => setAuthMode(mode), []);
  const closeAuth = useCallback(() => setAuthMode(null), []);
  const switchAuth = useCallback((mode: AuthMode) => setAuthMode(mode), []);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const [walletTab, setWalletTab] = useState<WalletTab | null>(null);
  const openWallet = useCallback((tab: WalletTab = "deposit") => setWalletTab(tab), []);
  const closeWallet = useCallback(() => setWalletTab(null), []);
  const switchWalletTab = useCallback((tab: WalletTab) => setWalletTab(tab), []);

  return (
    <ShellContext.Provider
      value={{
        collapsed,
        toggleCollapsed,
        mobileOpen,
        setMobileOpen,
        authMode,
        openAuth,
        closeAuth,
        switchAuth,
        searchOpen,
        openSearch,
        closeSearch,
        walletTab,
        openWallet,
        closeWallet,
        switchWalletTab,
      }}
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
      <SearchModal />
      <WalletModal />
    </ShellContext.Provider>
  );
}
