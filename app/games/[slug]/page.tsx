import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import SlotsExplorer from "@/components/games/SlotsExplorer";
import ComingSoon from "@/components/pages/ComingSoon";
import { slotsCatalog } from "@/data/games";
import { gameCategoryTitles } from "@/data/navigation";

export function generateStaticParams() {
  return Object.keys(gameCategoryTitles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = gameCategoryTitles[slug];
  return { title: entry ? `${entry.title} | MineBit` : "MineBit" };
}

export default async function GameCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "slots") {
    return (
      <AppShell>
        <SlotsExplorer games={slotsCatalog} />
      </AppShell>
    );
  }

  const entry = gameCategoryTitles[slug];
  if (!entry) notFound();

  return (
    <AppShell>
      <ComingSoon title={entry.title} eyebrow={entry.eyebrow} />
    </AppShell>
  );
}
