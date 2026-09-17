export interface Game {
  id: string;
  title: string;
  provider: string;
  /** key into the GameArt renderer */
  art: string;
  /** gradient stops for the card backdrop */
  bg: [string, string];
  accent: string;
  tag?: string;
}

export const originals: Game[] = [
  { id: "dice", title: "Dice", provider: "Originals", art: "dice", bg: ["#0e2b1f", "#123826"], accent: "#49ee85" },
  { id: "traffic-jam", title: "Traffic Jam", provider: "Originals", art: "traffic", bg: ["#2b1a08", "#4a2c0c"], accent: "#fd9535" },
  { id: "mines", title: "Mines", provider: "Originals", art: "mines", bg: ["#1a2233", "#27334d"], accent: "#49ee85" },
  { id: "cross-road", title: "Cross Road", provider: "Originals", art: "crossroad", bg: ["#10233a", "#1b3f66"], accent: "#5ec8f2" },
  { id: "plinko", title: "Plinko", provider: "Originals", art: "plinko", bg: ["#2b1030", "#4d1a52"], accent: "#f266c1" },
  { id: "crash", title: "Crash", provider: "Originals", art: "crash", bg: ["#33101a", "#571b2c"], accent: "#ff5d5d" },
  { id: "keno", title: "Keno", provider: "Originals", art: "keno", bg: ["#101b33", "#1d3468"], accent: "#6aa8ff" },
  { id: "hilo", title: "HiLo", provider: "Originals", art: "hilo", bg: ["#0f2b33", "#155e6b"], accent: "#4fe3c1" },
  { id: "limbo", title: "Limbo", provider: "Originals", art: "limbo", bg: ["#2a1a3d", "#472a6b"], accent: "#b48cff" },
  { id: "wheel", title: "Wheel", provider: "Originals", art: "wheel", bg: ["#33230f", "#6b4a15"], accent: "#fcbc05" },
  { id: "blackjack", title: "Blackjack", provider: "Originals", art: "blackjack", bg: ["#0d241c", "#14532d"], accent: "#49ee85" },
  { id: "baccarat", title: "Baccarat", provider: "Originals", art: "baccarat", bg: ["#241016", "#521c2c"], accent: "#ff7d9c" },
  { id: "roulette", title: "Roulette", provider: "Originals", art: "roulette", bg: ["#1c1033", "#3d1f6e"], accent: "#c084fc" },
  { id: "dragons-tower", title: "Dragon's Tower", provider: "Originals", art: "tower", bg: ["#1f2a10", "#3f5218"], accent: "#b8e62e" },
  { id: "slide", title: "Slide", provider: "Originals", art: "slide", bg: ["#0f2733", "#164e63"], accent: "#38bdf8" },
];

export const slots: Game[] = [
  { id: "sweet-1000", title: "Sweet Bonanza 1000", provider: "Pragmatic Play", art: "sweet", bg: ["#3d1030", "#7a1e5c"], accent: "#ff7ad9", tag: "Hot" },
  { id: "gates-1000", title: "Gates of Olympus 1000", provider: "Pragmatic Play", art: "zeus", bg: ["#2a1f08", "#6b4e12"], accent: "#ffd34d", tag: "Hot" },
  { id: "sugar-1000", title: "Sugar Rush 1000", provider: "Pragmatic Play", art: "candy", bg: ["#3a1040", "#7a1e78"], accent: "#e879f9" },
  { id: "le-bandit", title: "Le Bandit", provider: "Hacksaw", art: "bandit", bg: ["#12240f", "#2c5a1e"], accent: "#a3e635" },
  { id: "wanted", title: "Wanted Dead or a Wild", provider: "Hacksaw", art: "wanted", bg: ["#2b1608", "#59300f"], accent: "#fb923c" },
  { id: "big-bass", title: "Big Bass Blast", provider: "Pragmatic Play", art: "bass", bg: ["#082a3d", "#0e4a6b"], accent: "#38bdf8" },
  { id: "dog-house", title: "The Dog House", provider: "Pragmatic Play", art: "doghouse", bg: ["#331708", "#6e3410"], accent: "#fd9535" },
  { id: "chili", title: "3 Chili Bundles: Hold And Win", provider: "NeverEnding", art: "chili", bg: ["#330d0d", "#6e1a1a"], accent: "#ff6b6b" },
  { id: "duck", title: "Duck Hunters", provider: "Nolimit City", art: "duck", bg: ["#0f2f1a", "#1e5a30"], accent: "#4ade80" },
  { id: "hellcoin", title: "Hellcoin Forge: Hold And Win", provider: "NeverEnding", art: "forge", bg: ["#260d1a", "#521b38"], accent: "#f472b6" },
  { id: "sweet-2500", title: "Sweet Bonanza 2500", provider: "Pragmatic Play", art: "sweet", bg: ["#40104a", "#7a1e8f"], accent: "#f0abfc" },
  { id: "jade", title: "Jade Legends", provider: "Pragmatic Play", art: "jade", bg: ["#0d2b22", "#155e4b"], accent: "#34d399" },
];

export const hotGames: Game[] = [
  { id: "h-sugar", title: "Sugar Rush 1000", provider: "Pragmatic Play", art: "candy", bg: ["#3a1040", "#7a1e78"], accent: "#e879f9", tag: "Hot" },
  { id: "h-aviatrix", title: "Aviatrix", provider: "Aviatrix", art: "aviator", bg: ["#101c33", "#274b8f"], accent: "#7dd3fc", tag: "Hot" },
  { id: "h-bass", title: "Big Bass Blast", provider: "Pragmatic Play", art: "bass", bg: ["#082a3d", "#0e4a6b"], accent: "#38bdf8" },
  { id: "h-bandit", title: "Le Bandit", provider: "Hacksaw", art: "bandit", bg: ["#12240f", "#2c5a1e"], accent: "#a3e635", tag: "Hot" },
  { id: "h-jade", title: "Jade Legends", provider: "Pragmatic Play", art: "jade", bg: ["#0d2b22", "#155e4b"], accent: "#34d399" },
  { id: "h-gates", title: "Gates of Olympus 1000", provider: "Pragmatic Play", art: "zeus", bg: ["#2a1f08", "#6b4e12"], accent: "#ffd34d", tag: "Hot" },
  { id: "h-dog", title: "The Dog House", provider: "Pragmatic Play", art: "doghouse", bg: ["#331708", "#6e3410"], accent: "#fd9535" },
  { id: "h-wanted", title: "Wanted Dead or a Wild", provider: "Hacksaw", art: "wanted", bg: ["#2b1608", "#59300f"], accent: "#fb923c" },
  { id: "h-duck", title: "Duck Hunters", provider: "Nolimit City", art: "duck", bg: ["#0f2f1a", "#1e5a30"], accent: "#4ade80" },
  { id: "h-sweet", title: "Sweet Bonanza 1000", provider: "Pragmatic Play", art: "sweet", bg: ["#3d1030", "#7a1e5c"], accent: "#ff7ad9", tag: "Hot" },
];

export const recommended: Game[] = [
  { id: "r-caishen", title: "Caishen's Cash Pots", provider: "Pragmatic Play", art: "caishen", bg: ["#331010", "#702020"], accent: "#ffd34d" },
  { id: "r-chests", title: "3 Cursed Chests: Hold and Win", provider: "Hacksaw", art: "chest", bg: ["#1a1033", "#3b2273"], accent: "#a78bfa" },
  { id: "r-football", title: "Football 2026", provider: "Endorphina", art: "football", bg: ["#0f2a12", "#1d5a24"], accent: "#4ade80" },
  { id: "r-demon", title: "Demon Queen", provider: "Hacksaw", art: "demon", bg: ["#260d20", "#571b45"], accent: "#f0abfc" },
  { id: "r-chicken", title: "Chicken Shot", provider: "BGaming", art: "chicken", bg: ["#2e230c", "#66541a"], accent: "#fde047" },
  { id: "r-retriever", title: "Golden Retriever", provider: "Pragmatic Play", art: "dog", bg: ["#2b1d08", "#5e4210"], accent: "#fbbf24" },
  { id: "r-zeus", title: "Epic Ze Zeus", provider: "Hacksaw", art: "zeus", bg: ["#241a08", "#57450f"], accent: "#ffd34d" },
  { id: "r-outsourced", title: "Outsourced 2", provider: "Nolimit City", art: "office", bg: ["#101a2e", "#24395e"], accent: "#93c5fd" },
];

export const newReleases: Game[] = [
  { id: "n-retriever", title: "Golden Retriever", provider: "Pragmatic Play", art: "dog", bg: ["#2b1d08", "#5e4210"], accent: "#fbbf24", tag: "New" },
  { id: "n-zeus", title: "Epic Ze Zeus", provider: "Hacksaw", art: "zeus", bg: ["#241a08", "#57450f"], accent: "#ffd34d", tag: "New" },
  { id: "n-outsourced", title: "Outsourced 2", provider: "Nolimit City", art: "office", bg: ["#101a2e", "#24395e"], accent: "#93c5fd", tag: "New" },
  { id: "n-chili", title: "3 Chili Bundles: Hold And Win", provider: "NeverEnding", art: "chili", bg: ["#330d0d", "#6e1a1a"], accent: "#ff6b6b", tag: "New" },
  { id: "n-supernova", title: "Supernova Galaxy Orbs Hold and Win", provider: "Hacksaw", art: "galaxy", bg: ["#120f33", "#2c2373"], accent: "#a5b4fc", tag: "New" },
  { id: "n-caishen", title: "Caishen's Cash Pots", provider: "Pragmatic Play", art: "caishen", bg: ["#331010", "#702020"], accent: "#ffd34d", tag: "New" },
  { id: "n-chests", title: "3 Cursed Chests: Hold and Win", provider: "Hacksaw", art: "chest", bg: ["#1a1033", "#3b2273"], accent: "#a78bfa", tag: "New" },
  { id: "n-football", title: "Football 2026", provider: "Endorphina", art: "football", bg: ["#0f2a12", "#1d5a24"], accent: "#4ade80", tag: "New" },
  { id: "n-demon", title: "Demon Queen", provider: "Hacksaw", art: "demon", bg: ["#260d20", "#571b45"], accent: "#f0abfc", tag: "New" },
  { id: "n-chicken", title: "Chicken Shot", provider: "BGaming", art: "chicken", bg: ["#2e230c", "#66541a"], accent: "#fde047", tag: "New" },
];

export const liveCasino: Game[] = [
  { id: "l-bacbo", title: "Bac Bo", provider: "Evolution", art: "bacbo", bg: ["#101c2e", "#1e3a5c"], accent: "#7dd3fc", tag: "Live" },
  { id: "l-seotda", title: "Seotda Baccarat", provider: "Pragmatic Play", art: "baccarat", bg: ["#241016", "#521c2c"], accent: "#ff7d9c", tag: "Live" },
  { id: "l-holdem", title: "Casino Hold'em", provider: "Evolution", art: "holdem", bg: ["#0d241c", "#14532d"], accent: "#49ee85", tag: "Live" },
  { id: "l-roulette", title: "Lightning Roulette", provider: "Evolution", art: "roulette", bg: ["#1c1033", "#3d1f6e"], accent: "#c084fc", tag: "Live" },
  { id: "l-blackjack", title: "Free Bet Blackjack 7", provider: "Pragmatic Play", art: "blackjack", bg: ["#0d241c", "#14532d"], accent: "#49ee85", tag: "Live" },
  { id: "l-crazy", title: "Crazy Time", provider: "Evolution", art: "wheel", bg: ["#33230f", "#6b4a15"], accent: "#fcbc05", tag: "Live" },
  { id: "l-monopoly", title: "Monopoly Live", provider: "Evolution", art: "monopoly", bg: ["#0f2a24", "#1d5a4e"], accent: "#5eead4", tag: "Live" },
  { id: "l-vip-roulette", title: "VIP Roulette", provider: "Pragmatic Play", art: "roulette", bg: ["#2b1030", "#5c1a45"], accent: "#f266c1", tag: "Live" },
  { id: "l-speed-bac", title: "Speed Baccarat", provider: "Evolution", art: "baccarat", bg: ["#241016", "#521c2c"], accent: "#ff7d9c", tag: "Live" },
  { id: "l-saloon", title: "Blackjack VIP", provider: "Evolution", art: "blackjack", bg: ["#221206", "#4d2a0d"], accent: "#fd9535", tag: "Live" },
];

export interface TopWin {
  id: string;
  player: string;
  multiplier: number;
  amount: string;
  game: Game;
}

const winGames: Game[] = [
  { id: "w1", title: "Gates of Olympus 1000", provider: "Pragmatic Play", art: "zeus", bg: ["#2a1f08", "#6b4e12"], accent: "#ffd34d" },
  { id: "w2", title: "Sweet Bonanza 1000", provider: "Pragmatic Play", art: "sweet", bg: ["#3d1030", "#7a1e5c"], accent: "#ff7ad9" },
  { id: "w3", title: "Le Bandit", provider: "Hacksaw", art: "bandit", bg: ["#12240f", "#2c5a1e"], accent: "#a3e635" },
  { id: "w4", title: "Crash", provider: "Originals", art: "crash", bg: ["#33101a", "#571b2c"], accent: "#ff5d5d" },
  { id: "w5", title: "Wanted Dead or a Wild", provider: "Hacksaw", art: "wanted", bg: ["#2b1608", "#59300f"], accent: "#fb923c" },
  { id: "w6", title: "Mines", provider: "Originals", art: "mines", bg: ["#1a2233", "#27334d"], accent: "#49ee85" },
  { id: "w7", title: "Sugar Rush 1000", provider: "Pragmatic Play", art: "candy", bg: ["#3a1040", "#7a1e78"], accent: "#e879f9" },
  { id: "w8", title: "Lightning Roulette", provider: "Evolution", art: "roulette", bg: ["#1c1033", "#3d1f6e"], accent: "#c084fc" },
  { id: "w9", title: "Plinko", provider: "Originals", art: "plinko", bg: ["#2b1030", "#4d1a52"], accent: "#f266c1" },
  { id: "w10", title: "Big Bass Blast", provider: "Pragmatic Play", art: "bass", bg: ["#082a3d", "#0e4a6b"], accent: "#38bdf8" },
  { id: "w11", title: "Dice", provider: "Originals", art: "dice", bg: ["#0e2b1f", "#123826"], accent: "#49ee85" },
  { id: "w12", title: "The Dog House", provider: "Pragmatic Play", art: "doghouse", bg: ["#331708", "#6e3410"], accent: "#fd9535" },
];

export const topWins: TopWin[] = [
  { id: "tw1", player: "Foil Freshman", multiplier: 128.4, amount: "12,840.00", game: winGames[0] },
  { id: "tw2", player: "hi***en", multiplier: 64.2, amount: "6,420.50", game: winGames[1] },
  { id: "tw3", player: "Cr***88", multiplier: 512.0, amount: "25,600.00", game: winGames[3] },
  { id: "tw4", player: "Lu***er", multiplier: 12.5, amount: "1,875.25", game: winGames[2] },
  { id: "tw5", player: "Mi***21", multiplier: 240.0, amount: "9,600.00", game: winGames[5] },
  { id: "tw6", player: "Sa***ah", multiplier: 48.9, amount: "4,401.00", game: winGames[4] },
  { id: "tw7", player: "De***on", multiplier: 96.3, amount: "7,704.80", game: winGames[8] },
  { id: "tw8", player: "Ro***it", multiplier: 35.0, amount: "3,500.00", game: winGames[7] },
  { id: "tw9", player: "Ka***en", multiplier: 150.75, amount: "15,075.00", game: winGames[6] },
  { id: "tw10", player: "Jo***hn", multiplier: 22.1, amount: "2,210.40", game: winGames[9] },
  { id: "tw11", player: "Al***ce", multiplier: 410.2, amount: "20,510.00", game: winGames[10] },
  { id: "tw12", player: "To***as", multiplier: 18.6, amount: "1,860.75", game: winGames[11] },
];

export interface LiveBet {
  id: string;
  game: Game;
  player: string;
  time: string;
  bet: string;
  multiplier: number;
  payout: string;
  win: boolean;
}

export const liveBets: LiveBet[] = [
  { id: "b1", game: winGames[3], player: "Cr***88", time: "09:41:22 PM", bet: "50.00", multiplier: 2.4, payout: "120.00", win: true },
  { id: "b2", game: winGames[5], player: "Mi***21", time: "09:41:18 PM", bet: "12.50", multiplier: 0, payout: "-12.50", win: false },
  { id: "b3", game: winGames[0], player: "Foil Freshman", time: "09:41:09 PM", bet: "100.00", multiplier: 128.4, payout: "12,840.00", win: true },
  { id: "b4", game: winGames[10], player: "Al***ce", time: "09:40:57 PM", bet: "25.00", multiplier: 1.98, payout: "49.50", win: true },
  { id: "b5", game: winGames[8], player: "De***on", time: "09:40:44 PM", bet: "80.00", multiplier: 0, payout: "-80.00", win: false },
  { id: "b6", game: winGames[1], player: "hi***en", time: "09:40:31 PM", bet: "40.00", multiplier: 64.2, payout: "2,568.00", win: true },
  { id: "b7", game: winGames[7], player: "Ro***it", time: "09:40:12 PM", bet: "200.00", multiplier: 35.0, payout: "7,000.00", win: true },
  { id: "b8", game: winGames[4], player: "Sa***ah", time: "09:39:58 PM", bet: "10.00", multiplier: 0, payout: "-10.00", win: false },
  { id: "b9", game: winGames[6], player: "Ka***en", time: "09:39:41 PM", bet: "75.00", multiplier: 150.75, payout: "11,306.25", win: true },
  { id: "b10", game: winGames[2], player: "Lu***er", time: "09:39:22 PM", bet: "150.00", multiplier: 12.5, payout: "1,875.00", win: true },
];
