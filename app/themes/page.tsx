import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Themes | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Themes" eyebrow="Casino" blurb="Browse slots by theme — adventure, fruit, horror, mythology and more. Find your flavour in a couple of taps." />
    </AppShell>
  );
}
