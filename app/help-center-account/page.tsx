import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ComingSoon from "@/components/pages/ComingSoon";

export const metadata: Metadata = { title: "Help Center | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ComingSoon title="Help Center" eyebrow="Support" blurb="Guides for accounts, deposits, withdrawals, bonuses and verification. Live Support is available around the clock." />
    </AppShell>
  );
}
