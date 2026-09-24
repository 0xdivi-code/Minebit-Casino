import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import ApiKeyRequired from "@/components/pages/ApiKeyRequired";
import { originals, tapTrader, type Game } from "@/data/games";

const bySlug: Record<string, Game> = {
  "tap-trader": tapTrader,
  dice: originals[0],
  "dragons-tower": originals.find((g) => g.id === "dragons-tower") ?? originals[0],
  "traffic-jam": originals.find((g) => g.id === "traffic-jam") ?? originals[0],
  hilo: originals.find((g) => g.id === "hilo") ?? originals[0],
  crash: originals.find((g) => g.id === "crash") ?? originals[0],
  plinko: originals.find((g) => g.id === "plinko") ?? originals[0],
  "cross-road": originals.find((g) => g.id === "cross-road") ?? originals[0],
  keno: originals.find((g) => g.id === "keno") ?? originals[0],
  mines: originals.find((g) => g.id === "mines") ?? originals[0],
  blackjack: originals.find((g) => g.id === "blackjack") ?? originals[0],
  wheel: originals.find((g) => g.id === "wheel") ?? originals[0],
  limbo: originals.find((g) => g.id === "limbo") ?? originals[0],
  baccarat: originals.find((g) => g.id === "baccarat") ?? originals[0],
  roulette: originals.find((g) => g.id === "roulette") ?? originals[0],
};

export function generateStaticParams() {
  return Object.keys(bySlug).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = bySlug[slug];
  return { title: game ? `${game.title} | MineBit Originals` : "MineBit" };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = bySlug[slug];
  if (!game) notFound();

  return (
    <AppShell>
      <ApiKeyRequired
        title={game.title}
        eyebrow="MineBit Originals"
        blurb={`${game.title} is a provably fair MineBit Original. Launching it needs the game aggregator credentials, and this deployment has no API keys connected.`}
        art={game}
      />
    </AppShell>
  );
}
