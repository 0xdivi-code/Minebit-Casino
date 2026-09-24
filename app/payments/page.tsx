import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Deposits & Withdrawals | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Deposits & Withdrawals" eyebrow="Cashier" blurb="Deposits from around $10 process instantly with no added fees. Withdrawals are fast — priority speed on higher tiers." />
    </AppShell>
  );
}
