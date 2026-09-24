import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Sportsbook | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Sportsbook" eyebrow="Betting" blurb="Football, basketball, tennis, MMA and esports — including CS2, Dota 2 and Valorant — with pre-match and live in-play markets." />
    </AppShell>
  );
}
