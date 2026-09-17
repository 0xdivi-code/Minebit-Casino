import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ComingSoon from "@/components/pages/ComingSoon";

export const metadata: Metadata = { title: "Sportsbook | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ComingSoon title="Sportsbook" eyebrow="Betting" blurb="Football, basketball, tennis, MMA and esports — including CS2, Dota 2 and Valorant — with pre-match and live in-play markets." />
    </AppShell>
  );
}
