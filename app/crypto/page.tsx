import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ComingSoon from "@/components/pages/ComingSoon";

export const metadata: Metadata = { title: "Supported Crypto | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ComingSoon title="Supported Crypto" eyebrow="Cashier" blurb="Bitcoin, Ethereum, USDT, USDC, BNB, Solana, XRP, Dogecoin, Tron, Cardano and Bitcoin Cash." />
    </AppShell>
  );
}
