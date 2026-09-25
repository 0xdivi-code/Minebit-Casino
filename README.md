
# MineBit Casino — Homepage (Frontend UI)

> **API not connected.** Games, the cashier, the sportsbook, loyalty and accounts
> cannot run without provider credentials.

A frontend-only MineBit crypto casino homepage, 
<img width="1680" height="943" alt="Screenshot 2026-09-17 at 23 43 22" src="https://github.com/user-attachments/assets/a563c1fe-eb11-4a68-a5b0-d4d086c2ce99" />
## Tech stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (CSS-variable theme matching the original design tokens)
- **Framer Motion** for entrance / hover / drawer / accordion animations
- **Lucide React** icons + hand-crafted SVG artwork for game cards, payments and socials
- Self-hosted **Montserrat** + **Inter** (via Fontsource)

## Getting started

```bash
npm install
npm run env:example   # writes the simulated .env.example
npm run dev           # http://localhost:3000
npm run build
npm start
```

`.env.example` (values are intentionally blank; regenerate with `npm run env:example`):

```bash
GAME_AGGREGATOR_API_KEY=""   # casino / originals launches
SPORTSBOOK_API_KEY=""        # odds & live betting
CUSTODY_API_KEY=""           # deposits, withdrawals, buy crypto
NEXTAUTH_SECRET=""           # sessions & accounts
# …full list in .env.example — request the real keys from @Vicckr on Telegram
```

## Project structure

```
app/            layout, homepage, global styles, favicon
components/
  layout/       AppShell (auth + API-key gate state), Sidebar, Header, Footer, BottomNav
  hero/         Hero + feature cards
  games/        GameArt (SVG artwork), GameCard, GameSection
  pages/        ApiKeyRequired (locked-area panel)
  sections/     CategoryNav, TopWins, Rewards, LiveBets, SeoContent, Faq
  system/       ApiKeyNotice (bottom popup), AccessRequiredModal, GetApiLink
  ui/           Logo, ScriptLogo, Icons, Buttons, Carousel, SectionHeader
lib/            apiKeys.ts (gate helpers), envTemplate.mjs (single source for the generated file), wallet.ts
scripts/        generate-env-example.mjs
data/           games.ts (all card data), content.ts (footer, FAQ, tabs)
public/assets/  hero banner artwork + icons/ (category, section & rewards SVG icon set)
```

## Images & icons

All homepage imagery is local — nothing is pulled from minebit.com at runtime.

| Area | Files |
| --- | --- |
| Hero feature cards (Casino / Sport) | `public/assets/casino_banner.jpg`, `public/assets/sport_banner.jpg` |
| Category nav + game-section headers | `public/assets/icons/{slots,originals,live-casino,new-releases,themes,hot,recommended,live,top-wins}.svg` |
| Rewards tabs | `public/assets/icons/{clock-star,recurring-rewards,vip-transfers,level-up-bonuses,cashback-deals}.svg` |
| Game tiles | crafted SVG artwork in `components/games/GameArt.tsx` (deterministic per game) |

The icon SVGs stroke `currentColor`, so they inherit the surrounding text colour
(`text-muted-blue` at rest, `text-neon` when a tab is active). To swap in different
artwork, replace the files under the same names — no component changes needed.
