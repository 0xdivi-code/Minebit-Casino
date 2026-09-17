import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ComingSoon from "@/components/pages/ComingSoon";

export const metadata: Metadata = { title: "Providers | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ComingSoon title="Providers" eyebrow="Casino" blurb="46+ leading studios including Pragmatic Play, Hacksaw Gaming, Nolimit City, BGaming, Endorphina, NetEnt and Evolution." />
    </AppShell>
  );
}
