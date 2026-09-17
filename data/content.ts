export interface FooterGroup {
  title: string;
  links: { label: string; href: string }[];
}

export const footerGroups: FooterGroup[] = [
  {
    title: "Casino",
    links: [
      { label: "Slots", href: "/games/slots" },
      { label: "Originals", href: "/games/minebit-originals" },
      { label: "Live Casino", href: "/games/live-casino" },
      { label: "New Releases", href: "/games/new" },
      { label: "Hot Games", href: "/games/popular" },
      { label: "Sports", href: "/sportsbook" },
      { label: "Themes", href: "/themes" },
      { label: "Providers", href: "/providers" },
    ],
  },
  {
    title: "Info",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Help Center", href: "/help-center-account" },
      { label: "Responsible Gaming", href: "/responsible-gaming" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "AML Policy", href: "/aml" },
      { label: "Deposits & Withdrawals", href: "/payments" },
      { label: "Supported Crypto", href: "/crypto" },
      { label: "Contact Us", href: "mailto:support@minebit.com" },
    ],
  },
  {
    title: "Promo",
    links: [
      { label: "Promotions", href: "/promotions" },
      { label: "Tournaments", href: "/tournaments" },
      { label: "VIP Club", href: "/vip-club" },
      { label: "Referral Program", href: "/referral-overview" },
      { label: "Loyalty", href: "/loyalty-guest" },
      { label: "Profit Share", href: "/profit-share" },
    ],
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "What is MineBit's Profit Share?",
    a: "Profit Share is MineBit's signature reward system. 20% of the platform's gaming revenue is pooled and distributed back to players every week, so you share in the house's success the more you play.",
  },
  {
    q: "Is MineBit a crypto casino and sportsbook?",
    a: "Yes. MineBit is both a crypto casino with 10,000+ games and a full Bitcoin sportsbook, sharing one wallet across casino and sports betting.",
  },
  {
    q: "What cryptocurrencies does MineBit accept?",
    a: "MineBit supports Bitcoin (BTC), Ethereum (ETH), Tether (USDT), USD Coin (USDC), BNB, Solana (SOL), XRP, Dogecoin (DOGE), Tron (TRX), Cardano (ADA) and Bitcoin Cash (BCH).",
  },
  {
    q: "Are MineBit Originals provably fair?",
    a: "Yes. All MineBit Originals — including Mines, Crash and Plinko — are provably fair. Every outcome is generated from cryptographic seeds and can be verified round by round.",
  },
  {
    q: "Can I play MineBit games for free?",
    a: "Most MineBit slots offer a demo mode, so you can try a game's features and paytable for free before wagering real crypto. No crypto is spent and no real winnings are earned in demo play.",
  },
  {
    q: "Does MineBit have a welcome bonus?",
    a: "MineBit focuses on ongoing rewards rather than a single welcome match. Through Profit Share, instant rakeback, Wheels of Fortune, and daily, weekly and monthly bonuses, value is spread across your whole time on the platform.",
  },
  {
    q: "How fast are withdrawals at MineBit?",
    a: "MineBit is crypto-first, so withdrawals are processed quickly — with priority speed on higher loyalty and VIP levels.",
  },
  {
    q: "Can I play MineBit on mobile?",
    a: "Yes. MineBit works in any mobile browser with no download required, and can be added to your home screen as a progressive web app.",
  },
  {
    q: "Is MineBit licensed?",
    a: "Minebit.com is operated by Crea Tech Dynamics Limited and licensed by Anjouan (Comoros), fully authorised for gaming operations.",
  },
];

export interface RewardTab {
  id: string;
  title: string;
  icon: string;
  heading: string;
  sub: string;
  cards: { title: string; text: string }[];
  visualTitle: string;
  visualSub: string;
  visualArt: string;
}

export const rewardTabs: RewardTab[] = [
  {
    id: "rewards",
    title: "Every Bet Rewards",
    icon: "clock-star",
    heading: "Every Bet Rewards",
    sub: "Reliable payouts and regular drops built to reward you for playing.",
    cards: [
      { title: "House Profit Share", text: "20% of MineBit's gaming revenue distributed weekly to players." },
      { title: "Instant Rakeback", text: "Claim your cashback right away to keep your momentum going." },
      { title: "Constant Bonuses", text: "Daily, weekly, and monthly drops. Plus tournaments with real rewards." },
    ],
    visualTitle: "20%",
    visualSub: "of House Profits, back to the players",
    visualArt: "share",
  },
  {
    id: "payouts",
    title: "Instant Payouts",
    icon: "bolt",
    heading: "Instant Payouts",
    sub: "Crypto-first cashier with near-instant deposits and fast withdrawals.",
    cards: [
      { title: "Lightning Withdrawals", text: "Winnings paid out in minutes, not days — straight to your wallet." },
      { title: "No Hidden Fees", text: "Deposits from around $10 with no added fees on your crypto." },
      { title: "Priority VIP Speed", text: "Higher loyalty and VIP levels unlock priority processing." },
    ],
    visualTitle: "~5 min",
    visualSub: "median crypto withdrawal time",
    visualArt: "payout",
  },
  {
    id: "vip",
    title: "VIP-First Platform",
    icon: "crown",
    heading: "VIP-First Platform",
    sub: "A premium experience for MineBit's most valued players.",
    cards: [
      { title: "Dedicated VIP Manager", text: "One-to-one support from a manager who knows your play." },
      { title: "Enhanced Wheel", text: "Bigger prizes on the Wheel of Fortune with every spin." },
      { title: "VIP Status Match", text: "Carry your VIP status over from another casino within 48 hours." },
    ],
    visualTitle: "25",
    visualSub: "loyalty levels with growing perks",
    visualArt: "vip",
  },
  {
    id: "games",
    title: "10k+ Games & Sports",
    icon: "layers",
    heading: "10k+ Games & Sports",
    sub: "One wallet across 10,000+ games and a full crypto sportsbook.",
    cards: [
      { title: "10,000+ Games", text: "Slots, live casino, instant games and provably fair Originals." },
      { title: "Full Sportsbook", text: "Football, basketball, MMA and esports with live in-play markets." },
      { title: "46+ Providers", text: "Pragmatic Play, Hacksaw, Evolution, Nolimit City and more." },
    ],
    visualTitle: "10k+",
    visualSub: "games from 46+ leading providers",
    visualArt: "games",
  },
  {
    id: "privacy",
    title: "Privacy Guaranteed",
    icon: "shield",
    heading: "Privacy Guaranteed",
    sub: "Play with crypto — fast, private and secure by design.",
    cards: [
      { title: "No Bank Needed", text: "Deposit and withdraw with crypto, free from banking delays." },
      { title: "SSL Encryption", text: "Your data is protected with bank-grade encryption." },
      { title: "Provably Fair", text: "Every Originals round verifiable with cryptographic seeds." },
    ],
    visualTitle: "100%",
    visualSub: "provably fair Originals rounds",
    visualArt: "privacy",
  },
];

export const cryptoMethods = [
  { symbol: "₮", label: "Tether", bg: "#26a17b" },
  { symbol: "$", label: "USD Coin", bg: "#2775ca" },
  { symbol: "₿", label: "Bitcoin", bg: "#f7931a" },
  { symbol: "Ξ", label: "Ethereum", bg: "#627eea" },
  { symbol: "◆", label: "BNB", bg: "#f0b90b" },
  { symbol: "◎", label: "Solana", bg: "#9945ff" },
  { symbol: "✕", label: "XRP", bg: "#25a4e8" },
  { symbol: "Ð", label: "Dogecoin", bg: "#c2a633" },
  { symbol: "▲", label: "Tron", bg: "#eb0029" },
  { symbol: "●", label: "Cardano", bg: "#3468d1" },
  { symbol: "₿", label: "Bitcoin Cash", bg: "#8dc351" },
];
