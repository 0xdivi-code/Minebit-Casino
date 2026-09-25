import AppShell from "@/components/layout/AppShell";
import Hero from "@/components/hero/Hero";
import CategoryNav from "@/components/sections/CategoryNav";
import TopWins from "@/components/sections/TopWins";
import GameSection from "@/components/games/GameSection";
import Rewards from "@/components/sections/Rewards";
import LiveBets from "@/components/sections/LiveBets";
import SeoContent from "@/components/sections/SeoContent";
import Faq from "@/components/sections/Faq";
import { hotGames, liveCasino, newReleases, originals, recommended, slots } from "@/data/games";

export default function Home() {
  return (
    <AppShell>
      <Hero />
      <CategoryNav />
      <TopWins />
      <GameSection
        iconSrc="/assets/icons/originals.svg"
        title="Originals"
        count={15}
        games={originals}
        viewAllHref="/games/minebit-originals"
      />
      <GameSection
        iconSrc="/assets/icons/slots.svg"
        title="Slots"
        count={5376}
        games={slots}
        viewAllHref="/games/slots"
      />
      <GameSection
        iconSrc="/assets/icons/hot.svg"
        title="Hot Games"
        count={210}
        games={hotGames}
        viewAllHref="/games/popular"
      />
      <GameSection
        iconSrc="/assets/icons/recommended.svg"
        title="Recommended"
        count={176}
        games={recommended}
        viewAllHref="/games/recommended"
      />
      <GameSection
        iconSrc="/assets/icons/new-releases.svg"
        title="New Releases"
        count={1068}
        games={newReleases}
        viewAllHref="/games/new"
      />
      <GameSection
        iconSrc="/assets/icons/live.svg"
        title="Live"
        count={342}
        games={liveCasino}
        viewAllHref="/games/live-casino"
      />
      <Rewards />
      <LiveBets />
      <SeoContent />
      <Faq />
    </AppShell>
  );
}
