"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BtnPrimary } from "../ui/Buttons";
import { GoogleIcon, MetamaskIcon, TelegramIcon } from "../ui/Icons";
import { useShell } from "../layout/AppShell";

const socials = [
  { label: "Continue with Google", Icon: GoogleIcon },
  { label: "Continue with Telegram", Icon: TelegramIcon },
  { label: "Continue with MetaMask", Icon: MetamaskIcon },
];

function FeatureCard({ title, href, src, alt }: { title: string; href: string; src: string; alt: string }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="group relative block overflow-hidden rounded-main border border-line bg-navy"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
      </div>
      <div className="flex items-center justify-between border-t border-line bg-navy px-4 py-1.5">
        <span className="text-xs font-semibold leading-[200%] text-cream">{title}</span>
        <span className="rounded-md border border-slate-deep p-1 text-muted-blue transition-colors group-hover:border-neon group-hover:text-neon">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.a>
  );
}

export default function Hero() {
  const { openAuth } = useShell();
  return (
    <section aria-label="Welcome to MineBit" className="relative">
      {/* backdrop treatment */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px]">
        <div className="hero-grid-bg absolute inset-0" />
        <div className="absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-neon/[0.07] blur-[100px]" />
        <div className="absolute -top-16 right-[12%] h-72 w-72 rounded-full bg-indigo-brand/[0.08] blur-[100px]" />
      </div>

      <div className="relative grid items-center gap-8 pt-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:pt-8">
        {/* copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-[580px] text-center lg:text-left"
        >
          <h1 className="visually-hidden">MineBit Crypto Casino</h1>
          <h2 className="text-balance text-base font-semibold leading-[110%] text-cream md:text-[32px]">
            <span className="text-neon">We rug the house</span>, not the players
          </h2>
          <p className="mt-3 text-sm font-semibold leading-[110%] text-cream md:text-[21px]">
            20% of House Profits, back to the players
          </p>

          <BtnPrimary
            onClick={() => openAuth("register")}
            className="mx-auto mt-5 w-full max-w-[390px] text-sm! md:mx-0 md:mt-6 md:max-w-[240px]"
          >
            Register
          </BtnPrimary>

          <p className="mb-2 mt-3 text-xs font-semibold leading-[110%] text-muted-blue md:mb-2 md:mt-3">
            Or continue with
          </p>
          <div className="flex justify-center gap-2 lg:justify-start">
            {socials.map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                title={label}
                onClick={() => openAuth("register")}
                className="flex min-h-[50px] items-center justify-center rounded-main bg-navy p-3.5 transition-colors duration-300 hover:bg-navy-hover"
              >
                <Icon className="block h-[22px] w-[22px]" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* feature cards */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <FeatureCard title="Casino" href="/lobby" src="/assets/casino_banner.jpg" alt="Casino lobby with neon lights" />
          <FeatureCard title="Sport" href="/sportsbook" src="/assets/sport_banner.jpg" alt="Football stadium at night" />
        </div>
      </div>
    </section>
  );
}
