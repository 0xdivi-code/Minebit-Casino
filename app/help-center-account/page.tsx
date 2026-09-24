import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Help Center | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Help Center" eyebrow="Support" blurb="Guides for accounts, deposits, withdrawals, bonuses and verification. Live Support is available around the clock." />
    </AppShell>
  );
}
