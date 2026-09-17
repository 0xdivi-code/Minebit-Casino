import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ComingSoon from "@/components/pages/ComingSoon";

export const metadata: Metadata = { title: "AML Policy | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ComingSoon title="AML Policy" eyebrow="Legal" blurb="MineBit's anti-money-laundering controls, verification procedures and monitoring." />
    </AppShell>
  );
}
