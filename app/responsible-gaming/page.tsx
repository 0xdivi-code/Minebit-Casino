import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Responsible Gaming | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Responsible Gaming" eyebrow="Safety" blurb="Deposit limits, loss and wager limits, cooling-off periods and self-exclusion. Players must be 18 or older." />
    </AppShell>
  );
}
