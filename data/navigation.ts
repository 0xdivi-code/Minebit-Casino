export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface NavSection {
  id: string;
  title: string;
  href: string;
  icon: string;
  items: NavItem[];
}

export const sidebarSections: NavSection[] = [
  {
    id: "promotions",
    title: "Promotions",
    href: "/promotions",
    icon: "gift",
    items: [
      { label: "Rewards", href: "/promotions/rewards", icon: "gift" },
      { label: "Challenges", href: "/promotions/challenges", icon: "target", badge: "New" },
      { label: "All Promotions", href: "/promotions", icon: "flag" },
    ],
  },
  {
    id: "casino",
    title: "Casino",
    href: "/lobby",
    icon: "spade",
    items: [
      { label: "Favorites", href: "/games/favorites", icon: "heart" },
      { label: "Recent Games", href: "/games/recent-games", icon: "history" },
      { label: "Bonus Wagering", href: "/games/bonus-wagering", icon: "gift" },
      { label: "Slots", href: "/games/slots", icon: "cherry" },
      { label: "Hot Games", href: "/games/popular", icon: "flame" },
      { label: "New Releases", href: "/games/new", icon: "sparkles" },
      { label: "Instant Games", href: "/games/instant-games", icon: "rocket" },
      { label: "Live Casino", href: "/games/live-casino", icon: "users" },
      { label: "Game Shows", href: "/games/game-shows", icon: "dices" },
      { label: "Blackjack", href: "/games/blackjack", icon: "spade" },
      { label: "Roulette", href: "/games/roulette", icon: "lifebuoy" },
      { label: "Bonus Buy", href: "/games/bonus-buy", icon: "tag" },
      { label: "Vip Games", href: "/games/vip-games", icon: "crown" },
      { label: "Themes", href: "/themes", icon: "shapes" },
      { label: "Providers", href: "/providers", icon: "boxes" },
    ],
  },
  {
    id: "originals",
    title: "Originals",
    href: "/games/minebit-originals",
    icon: "mb",
    items: [
      { label: "Tap Trader", href: "/game/tap-trader", icon: "tap" },
      { label: "Dice", href: "/game/dice", icon: "dices" },
      { label: "Dragon's Tower", href: "/game/dragons-tower", icon: "castle" },
      { label: "Traffic Jam", href: "/game/traffic-jam", icon: "car" },
      { label: "Hilo", href: "/game/hilo", icon: "updown" },
      { label: "Crash", href: "/game/crash", icon: "rocket" },
      { label: "Plinko", href: "/game/plinko", icon: "circledot" },
      { label: "Cross Road", href: "/game/cross-road", icon: "x" },
      { label: "Keno", href: "/game/keno", icon: "hash" },
      { label: "Mines", href: "/game/mines", icon: "bomb" },
      { label: "Blackjack", href: "/game/blackjack", icon: "spade" },
      { label: "Wheel", href: "/game/wheel", icon: "ferris" },
      { label: "Limbo", href: "/game/limbo", icon: "crosshair" },
      { label: "Baccarat", href: "/game/baccarat", icon: "club" },
      { label: "Roulette", href: "/game/roulette", icon: "lifebuoy" },
    ],
  },
];

export const sidebarPlainLinks: NavItem[] = [
  { label: "Loyalty", href: "/loyalty-guest", icon: "gem" },
  { label: "VIP Club", href: "/vip-club", icon: "crown" },
  { label: "Referral program", href: "/referral-overview", icon: "users" },
];

/** Category slugs served by /games/[slug] (slots renders the real grid). */
export const gameCategoryTitles: Record<string, { title: string; eyebrow: string }> = {
  slots: { title: "Slots", eyebrow: "Casino" },
  favorites: { title: "Favorites", eyebrow: "Casino" },
  "recent-games": { title: "Recent Games", eyebrow: "Casino" },
  "bonus-wagering": { title: "Bonus Wagering", eyebrow: "Casino" },
  popular: { title: "Hot Games", eyebrow: "Casino" },
  new: { title: "New Releases", eyebrow: "Casino" },
  "instant-games": { title: "Instant Games", eyebrow: "Casino" },
  "live-casino": { title: "Live Casino", eyebrow: "Casino" },
  "game-shows": { title: "Game Shows", eyebrow: "Casino" },
  blackjack: { title: "Blackjack", eyebrow: "Casino" },
  roulette: { title: "Roulette", eyebrow: "Casino" },
  "bonus-buy": { title: "Bonus Buy", eyebrow: "Casino" },
  recommended: { title: "Recommended", eyebrow: "Casino" },
  "vip-games": { title: "Vip Games", eyebrow: "Casino" },
  "minebit-originals": { title: "Originals", eyebrow: "MineBit Originals" },
};

export const promoTitles: Record<string, { title: string; eyebrow: string }> = {
  rewards: { title: "Rewards", eyebrow: "Promotions" },
  challenges: { title: "Challenges", eyebrow: "Promotions" },
};
