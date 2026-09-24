import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "VIP Club | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="VIP Club" eyebrow="Players" blurb="An enhanced wheel, birthday bonuses, a dedicated VIP manager, instant bonuses and priority withdrawals for MineBit's most valued players." />
    </AppShell>
  );
}
