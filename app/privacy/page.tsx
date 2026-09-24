import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";

export const metadata: Metadata = { title: "Privacy Policy | MineBit" };

export default function Page() {
  return (
    <AppShell>
      <ApiKeyRequired title="Privacy Policy" eyebrow="Legal" blurb="How MineBit collects, uses and protects your data, secured with SSL encryption." />
    </AppShell>
  );
}
