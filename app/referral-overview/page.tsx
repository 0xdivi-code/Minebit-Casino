import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Referral Program | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Referral Program" eyebrow="Players" blurb="Invite friends to MineBit and earn a share of their play. Track invites and rewards from one dashboard." />
    </AppShell>
  );
}
