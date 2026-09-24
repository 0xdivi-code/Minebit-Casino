
# MineBit Casino — Homepage (Frontend UI)

> **API keys not connected.** Games, the cashier, the sportsbook, loyalty and
> accounts cannot run without provider credentials. Anyone deploying or running
> this build should message **[@Vicckr on Telegram](https://t.me/Vicckr)** for
> full access. A simulated `.env.example` is generated automatically — run
> `npm run env:example` to write it to the repo root, or it is downloaded the
> first time a visitor hits a locked surface.

A frontend-only MineBit crypto casino homepage, 
<img width="1680" height="943" alt="Screenshot 2026-09-17 at 23 43 22" src="https://github.com/user-attachments/assets/a563c1fe-eb11-4a68-a5b0-d4d086c2ce99" />
## Tech stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (CSS-variable theme matching the original design tokens)
- **Framer Motion** for entrance / hover / drawer / accordion animations
- **Lucide React** icons + hand-crafted SVG artwork for game cards, payments and socials
- Self-hosted **Montserrat** + **Inter** (via Fontsource)

## Access gates (no API keys connected)

Nothing on this build launches, because the deployment ships without credentials:

| Surface | Behaviour |
| --- | --- |
| Game tiles (Originals, Slots, Hot, Top wins, …) | Clicking any game pops up the **“No API Key Connected”** notice at the bottom of the site and generates the simulated `.env.example` |
| Log in / Register | The modal accepts details, then replaces itself with the **“full access required”** modal asking the visitor to contact **@Vicckr** on Telegram |
| Google / Telegram / MetaMask buttons | Same “full access required” modal |
| Deposit / Withdraw / Buy crypto | Cashier actions raise the same bottom notice (`CUSTODY_API_KEY`) |
| Every unfinished route (About, Promotions, Sportsbook, Legal, …) | `ApiKeyRequired` panel — replaces every old placeholder promise with the real lock reason, listing the missing env vars plus the Telegram contact |
| Header / Footer | Permanent “API keys not connected → @Vicckr” badge |

The generated file is built from `lib/envTemplate.mjs`, so the app and the CLI
always emit identical content. Set `NEXT_PUBLIC_API_KEYS_CONNECTED="true"` only
once real credentials exist.

## Sections

Sidebar (Casino/Sport toggle, Profit Share banner, search, promotions, nav, payments,
Buy crypto, Live Support, language, Affiliate/Help Center) · Header (logo, Log In,
Register) · Hero ("We rug the house, not the players" + Casino/Sport feature cards) ·
Category nav · Top wins carousel · Originals (15) · Slots · Hot Games · Recommended ·
New Releases · Live casino · Rewards tabs · Live Bets table · SEO content · FAQ · Footer.

> UI only — no betting logic, payments, auth backend, wallets, or game engines.
> Buttons use mock interactions and every locked surface routes visitors to the
> developer's Telegram. Game artwork is recreated locally as SVG since the
> original remote assets are not publicly fetchable.

## Getting started

```bash
npm install
npm run env:example   # writes the simulated .env.example
npm run dev           # http://localhost:3000
npm run build
npm start
```

Generated `.env.example` (values are intentionally blank):

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
  system/       ApiKeyNotice (bottom popup), AccessRequiredModal, EnvExampleModal, TelegramCta
  ui/           Logo, ScriptLogo, Icons, Buttons, Carousel, SectionHeader
lib/            apiKeys.ts (gate helpers), envTemplate.mjs (single source for the generated file), wallet.ts
scripts/        generate-env-example.mjs
data/           games.ts (all card data), content.ts (footer, FAQ, tabs)
public/assets/  hero banner artwork
```
