import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ComingSoon from "@/components/pages/ComingSoon";

export const metadata: Metadata = { title: "Tournaments | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ComingSoon title="Tournaments" eyebrow="Promotions" blurb="Weekly Masters Arena ($2,000), Monthly Spins Arena ($5,000), Clan Masters ($10,000) and Drops & Wins (€25,000,000)." />
    </AppShell>
  );
}
