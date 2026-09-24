import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Providers | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Providers" eyebrow="Casino" blurb="46+ leading studios including Pragmatic Play, Hacksaw Gaming, Nolimit City, BGaming, Endorphina, NetEnt and Evolution." />
    </AppShell>
  );
}
