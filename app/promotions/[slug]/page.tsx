import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";
import { promoTitles } from "@/data/navigation";

const blurbs: Record<string, string> = {
  rewards: "Instant rakeback, constant bonuses and the weekly House Profit Share — rewards that grow the longer you play.",
  challenges: "Complete daily tasks to earn EXP, cash and bonuses, with new challenges unlocking as your loyalty level rises.",
};

export function generateStaticParams() {
  return Object.keys(promoTitles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = promoTitles[slug];
  return { title: entry ? `${entry.title} | MineBit` : "MineBit" };
}

export default async function PromoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = promoTitles[slug];
  if (!entry) notFound();

  return (
    <AppShell>
      <ApiKeyRequired title={entry.title} eyebrow={entry.eyebrow} blurb={blurbs[slug]} />
    </AppShell>
  );
}
