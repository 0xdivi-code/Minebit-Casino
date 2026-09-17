import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ComingSoon from "@/components/pages/ComingSoon";

export const metadata: Metadata = { title: "Themes | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ComingSoon title="Themes" eyebrow="Casino" blurb="Browse slots by theme — adventure, fruit, horror, mythology and more. Find your flavour in a couple of taps." />
    </AppShell>
  );
}
