import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Promotions | MineBit" };

export default function PromotionsPage() {
  return (
    <AppShell>
      <ApiKeyRequired
        title="All Promotions"
        eyebrow="Promotions"
        blurb="Wheels of Fortune, daily, weekly and monthly drops, weekend reloads and tournaments with real prize pools."
      />
    </AppShell>
  );
}
