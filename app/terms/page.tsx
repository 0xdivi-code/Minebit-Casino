import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Terms & Conditions | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Terms & Conditions" eyebrow="Legal" blurb="The rules of play at MineBit — accounts, bonuses, wagering, withdrawals and restricted territories." />
    </AppShell>
  );
}
