"use client";

import { ArrowRight, ArrowUp, Search, ShieldCheck } from "lucide-react";
import { Logo } from "../ui/Logo";
import { useShell } from "./AppShell";
import { cryptoMethods, footerGroups } from "@/data/content";
import { CONTACT, GATE_BADGE, GATE_MESSAGE, GET_API_LABEL } from "@/lib/apiKeys";
import { DiscordIcon, FacebookIcon, InstagramIcon, TelegramIcon, XSocialIcon } from "../ui/Icons";

const socials = [
  { label: "X", href: "https://x.com/minebitofficial", Icon: XSocialIcon },
  { label: "Telegram", href: "https://t.me/minebitnews", Icon: TelegramIcon },
  { label: "Instagram", href: "https://instagram.com/MineBitOfficial", Icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com/MineBitOfficial", Icon: FacebookIcon },
  { label: "Discord", href: "https://discord.gg/DJD6cdmhZ5", Icon: DiscordIcon },
];

export default function Footer() {
  const { openSearch } = useShell();
  return (
    <footer className="border-t border-line bg-abyss">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 md:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          {/* brand + methods + socials */}
          <div>
            <div className="flex items-center gap-4">
              <Logo />
              <span className="flex h-10 w-10 items-center justify-center rounded-main border border-line bg-navy">
                <ShieldCheck className="h-5 w-5 text-neon" />
              </span>
            </div>
            <p className="mt-4 max-w-[420px] text-xs leading-relaxed text-muted">
              Minebit.com is operated by Crea Tech Dynamics Limited and licensed by Anjouan (Comoros).
              Fully authorized for gaming operations. Contact:{" "}
              <a href="mailto:support@minebit.com" className="text-neon hover:underline">
                support@minebit.com
              </a>
              .
            </p>

            <p className="mt-4 max-w-[420px] rounded-main border border-tangerine/40 bg-tangerine/[0.07] px-3 py-2.5 text-xs leading-relaxed text-muted">
              <span className="font-bold uppercase tracking-wide text-tangerine">{GATE_BADGE}</span> — {GATE_MESSAGE}{" "}
              <a
                href={CONTACT.telegramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 font-semibold text-neon hover:underline"
              >
                {GET_API_LABEL}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.6} />
              </a>
            </p>

            <p className="mt-6 text-sm font-bold uppercase text-fog">Payment Methods</p>
            <ul className="mt-3 flex max-w-[420px] flex-wrap gap-2">
              {cryptoMethods.map((c) => (
                <li
                  key={c.label}
                  title={c.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{ background: c.bg }}
                >
                  {c.symbol}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm font-bold uppercase text-fog">Follow us</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group rounded-main border border-line p-4 text-muted transition-colors hover:border-neon"
                >
                  <span className="block h-[22px] w-[22px] transition-colors group-hover:text-neon [&>svg]:h-full [&>svg]:w-full">
                    <Icon />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3" aria-label="Footer">
            {footerGroups.map((g) => (
              <div key={g.title}>
                <p className="mb-1 mt-4 text-sm font-bold uppercase leading-[110%] text-fog">{g.title}</p>
                <ul className="flex flex-col gap-2">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="w-fit text-xs font-medium leading-[150%] text-muted-blue transition-colors hover:bg-transparent hover:text-neon"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* giant watermark */}
        <div aria-hidden className="pointer-events-none mt-8 select-none overflow-hidden">
          <p className="bg-gradient-to-b from-slate-deep/80 to-transparent bg-clip-text text-center text-[18vw] font-extrabold leading-[0.9] tracking-tight text-transparent lg:text-[150px]">
            MINEBIT
          </p>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted md:flex-row">
          <p>© 2026 MineBit. All rights reserved. Play responsibly.</p>
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-tangerine text-[11px] font-bold text-tangerine">
              18+
            </span>
            <span>Players must be 18 or older, or the legal age in their jurisdiction.</span>
          </div>
        </div>
      </div>

      {/* floating actions */}
      <div className="fixed bottom-6 right-6 z-[900] hidden flex-col gap-2 lg:flex">
        <button
          type="button"
          aria-label="Search games"
          onClick={openSearch}
          className="flex h-12 w-12 items-center justify-center rounded-main border border-emerald-brand bg-neon text-slate-deep transition-colors hover:bg-emerald-brand"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-12 w-12 items-center justify-center rounded-main border border-emerald-brand bg-neon text-slate-deep transition-colors hover:bg-emerald-brand"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </footer>
  );
}
