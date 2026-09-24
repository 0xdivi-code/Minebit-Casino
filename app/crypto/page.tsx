import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Supported Crypto | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Supported Crypto" eyebrow="Cashier" blurb="Bitcoin, Ethereum, USDT, USDC, BNB, Solana, XRP, Dogecoin, Tron, Cardano and Bitcoin Cash." />
    </AppShell>
  );
}
