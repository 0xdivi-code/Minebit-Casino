# MineBit Casino — Homepage (Frontend UI Recreation)

A faithful frontend-only recreation of the MineBit crypto casino homepage, built from the
original page markup as the structural and style reference.

## Tech stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (CSS-variable theme matching the original design tokens)
- **Framer Motion** for entrance / hover / drawer / accordion animations
- **Lucide React** icons + hand-crafted SVG artwork for game cards, payments and socials
- Self-hosted **Montserrat** + **Inter** (via Fontsource)

## Sections

Sidebar (Casino/Sport toggle, Profit Share banner, search, promotions, nav, payments,
Buy crypto, Live Support, language, Affiliate/Help Center) · Header (logo, Log In,
Register) · Hero ("We rug the house, not the players" + Casino/Sport feature cards) ·
Category nav · Top wins carousel · Originals (15) · Slots · Hot Games · Recommended ·
New Releases · Live casino · Rewards tabs · Live Bets table · SEO content · FAQ · Footer.

> UI only — no betting logic, payments, auth backend, wallets, or game engines.
> Buttons use mock interactions. Game artwork is recreated locally as SVG since the
> original remote assets are not publicly fetchable.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Project structure

```
app/            layout, homepage, global styles, favicon
components/
  layout/       AppShell, Sidebar, Header, Footer, BottomNav
  hero/         Hero + feature cards
  games/        GameArt (SVG artwork), GameCard, GameSection
  sections/     CategoryNav, TopWins, Rewards, LiveBets, SeoContent, Faq
  ui/           Logo, Icons, Buttons, Carousel, SectionHeader
data/           games.ts (all card data), content.ts (footer, FAQ, tabs)
public/assets/  hero banner artwork
```
