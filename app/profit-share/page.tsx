import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Profit Share | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Profit Share" eyebrow="Rewards" blurb="20% of MineBit's gaming revenue is pooled and distributed back to players every week. When the house wins, you win too." />
    </AppShell>
  );
}
