import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ComingSoon from "@/components/pages/ComingSoon";

export const metadata: Metadata = { title: "About Us | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ComingSoon title="About Us" eyebrow="MineBit" blurb="MineBit is a crypto casino and Bitcoin sportsbook with 10,000+ games, provably fair Originals and a weekly Profit Share." />
    </AppShell>
  );
}
