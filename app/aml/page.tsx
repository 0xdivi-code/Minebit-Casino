import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "AML Policy | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="AML Policy" eyebrow="Legal" blurb="MineBit's anti-money-laundering controls, verification procedures and monitoring." />
    </AppShell>
  );
}
