import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Loyalty | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Loyalty" eyebrow="Players" blurb="Climb 25 levels from Traveller to the top — rakeback, progressive cashback, deposit wheels and personal quests unlock as you wager." />
    </AppShell>
  );
}
