"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeDollarSign,
  Check,
  ChevronRight,
  Copy,
  Gift,
  Info,
  Loader2,
  X,
} from "lucide-react";
import QRCode from "qrcode";
import { cn } from "@/lib/utils";
import { useShell, type WalletTab } from "../layout/AppShell";
import { ChevronDown } from "../ui/Icons";
import ScriptLogo from "../ui/ScriptLogo";
import { walletCurrencies, type WalletCurrency, type WalletNetwork } from "@/data/wallet";
import { GATE_MESSAGE } from "@/lib/apiKeys";

function CoinBadge({ currency, size = "md" }: { currency: WalletCurrency; size?: "md" | "sm" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex flex-none items-center justify-center rounded-full font-bold text-white",
        size === "md" ? "h-7 w-7 text-sm" : "h-6 w-6 text-xs"
      )}
      style={{ background: currency.bg }}
    >
      {currency.symbol}
    </span>
  );
}

const fieldCls =
  "w-full rounded-xl border border-line/70 bg-[#141b29] px-4 py-3.5 text-sm font-medium text-cream placeholder:text-[#5b6b85] placeholder:font-normal outline-none transition-colors focus:border-neon/60";

function CurrencySelect({
  value,
  onChange,
  label,
}: {
  value: WalletCurrency;
  onChange: (c: WalletCurrency) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p className="mb-2 text-[15px] font-semibold text-cream">{label}</p>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(fieldCls, "flex items-center gap-3 text-left")}
        >
          <CoinBadge currency={value} />
          <span className="font-semibold">{value.code}</span>
          <span className="truncate text-muted-blue">{value.name}</span>
          <ChevronDown className={cn("ml-auto h-3.5 w-3.5 flex-none text-muted-blue transition-transform", open && "rotate-180")} />
        </button>
        <AnimatePresence>
          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <motion.ul
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                role="listbox"
                className="absolute inset-x-0 z-20 mt-2 max-h-64 overflow-y-auto rounded-xl border border-line bg-navy p-1.5 shadow-2xl"
              >
                {walletCurrencies.map((c) => (
                  <li key={c.code} role="option" aria-selected={c.code === value.code}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(c);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        c.code === value.code ? "bg-slate-deep text-cream" : "text-muted-blue hover:bg-slate-deep hover:text-cream"
                      )}
                    >
                      <CoinBadge currency={c} size="sm" />
                      <span className="font-semibold">{c.code}</span>
                      <span className="truncate">{c.name}</span>
                      {c.code === value.code && <Check className="ml-auto h-4 w-4 text-neon" />}
                    </button>
                  </li>
                ))}
              </motion.ul>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NetworkSelect({
  currency,
  value,
  onChange,
}: {
  currency: WalletCurrency;
  value: WalletNetwork;
  onChange: (n: WalletNetwork) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p className="mb-2 text-[15px] font-semibold text-cream">Network</p>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(fieldCls, "flex items-center gap-3 text-left")}
        >
          <CoinBadge currency={currency} />
          <span className="font-semibold">{value.id}</span>
          <ChevronDown className={cn("ml-auto h-3.5 w-3.5 flex-none text-muted-blue transition-transform", open && "rotate-180")} />
        </button>
        <AnimatePresence>
          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <motion.ul
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                role="listbox"
                className="absolute inset-x-0 z-20 mt-2 overflow-hidden rounded-xl border border-line bg-navy p-1.5 shadow-2xl"
              >
                {currency.networks.map((n) => (
                  <li key={n.id} role="option" aria-selected={n.id === value.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(n);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        n.id === value.id ? "bg-slate-deep text-cream" : "text-muted-blue hover:bg-slate-deep hover:text-cream"
                      )}
                    >
                      <span className="font-semibold">{n.id}</span>
                      <span className="truncate">{n.display}</span>
                      {n.id === value.id && <Check className="ml-auto h-4 w-4 text-neon" />}
                    </button>
                  </li>
                ))}
              </motion.ul>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

type Status = "idle" | "loading" | "success";

function DepositPane({ currency, network }: { currency: WalletCurrency; network: WalletNetwork }) {
  const { notifyMissingApiKey, closeWallet } = useShell();
  const [qr, setQr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let live = true;
    setQr(null);
    QRCode.toDataURL(network.address, { width: 200, margin: 1, color: { dark: "#000000", light: "#ffffff" } })
      .then((url) => live && setQr(url))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [network.address]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(network.address);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = network.address;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div>
      <p className="mb-2 text-[15px] font-semibold text-cream">{network.display} Deposit Address</p>
      <div className={cn(fieldCls, "flex items-center gap-3")}>
        <span className="min-w-0 flex-1 truncate text-muted">{network.address}</span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy deposit address"
          className={cn("flex-none transition-colors", copied ? "text-neon" : "text-muted-blue hover:text-cream")}
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </button>
      </div>
      {copied && <p className="mt-2 text-xs font-semibold text-neon">Address copied to clipboard</p>}

      <p className="mt-4 text-sm text-muted-blue">
        The min deposit amount is <span className="font-semibold text-neon">$10.00 = {currency.minDeposit}</span>
      </p>

      <div className="mt-4 flex items-start gap-2.5">
        <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#f59e0b]">
          <Info className="h-4 w-4 text-black" strokeWidth={2.5} />
        </span>
        <p className="text-sm font-medium leading-snug text-[#f59e0b]">
          Your deposit must be sent on the {network.display} network to be processed.
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="rounded-2xl bg-white p-3 shadow-[0_0_50px_-12px_rgba(255,255,255,0.35)]">
          {qr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr} alt={`QR code for ${network.display} deposit address`} width={168} height={168} className="h-[168px] w-[168px]" />
          ) : (
            <div className="flex h-[168px] w-[168px] items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          closeWallet();
          notifyMissingApiKey({ area: "cashier", title: `${currency.code} deposit` });
        }}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-main bg-navy px-4 py-3.5 text-sm font-semibold text-muted-blue transition-colors hover:bg-navy-hover hover:text-cream"
      >
        I&apos;ve sent it — check my balance
      </button>
      <p className="mt-2 text-center text-[11px] leading-snug text-muted-blue">{GATE_MESSAGE}</p>

      <p className="mb-2 mt-6 text-[15px] font-semibold text-cream">Bonuses</p>
      <button
        type="button"
        className="flex w-full items-center gap-4 rounded-xl bg-navy px-4 py-4 text-left transition-colors hover:bg-navy-hover"
      >
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-slate-deep">
          <Gift className="h-6 w-6 text-indigo-soft" strokeWidth={1.6} />
        </span>
        <span className="text-sm font-medium text-cream">You have no available bonuses</span>
        <ChevronRight className="ml-auto h-5 w-5 flex-none text-cream" />
      </button>
    </div>
  );
}

function WithdrawPane({ currency, network }: { currency: WalletCurrency; network: WalletNetwork }) {
  const { notifyMissingApiKey, closeWallet } = useShell();
  const [status, setStatus] = useState<Status>("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    // No custody key connected — withdrawals cannot be broadcast.
    window.setTimeout(() => {
      setStatus("idle");
      closeWallet();
      notifyMissingApiKey({ area: "cashier", title: `${currency.code} withdrawal` });
    }, 900);
  };
  return (
    <form onSubmit={submit}>
      <p className="mb-2 text-[15px] font-semibold text-cream">Destination Address</p>
      <input required placeholder={`Your ${network.display} address`} className={fieldCls} />
      <div className="mb-2 mt-5 flex items-center justify-between">
        <p className="text-[15px] font-semibold text-cream">Amount</p>
        <p className="text-xs text-muted-blue">
          Available: <span className="font-semibold text-cream">$0.00</span>
        </p>
      </div>
      <div className="relative">
        <input required inputMode="decimal" placeholder="0.00" className={cn(fieldCls, "pr-20")} />
        <span className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
          <button type="button" className="rounded-md bg-neon/15 px-2 py-1 text-[11px] font-bold text-neon">
            MAX
          </button>
          <span className="text-sm font-bold text-muted-blue">{currency.code}</span>
        </span>
      </div>
      <p className="mt-4 text-sm text-muted-blue">
        The min withdrawal amount is <span className="font-semibold text-neon">{currency.minWithdraw}</span>
      </p>
      <div className="mt-4 flex items-start gap-2.5">
        <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#f59e0b]">
          <Info className="h-4 w-4 text-black" strokeWidth={2.5} />
        </span>
        <p className="text-sm font-medium leading-snug text-[#f59e0b]">
          Withdrawals are sent on the {network.display} network. Double-check your address before confirming.
        </p>
      </div>
      <motion.button
        type="submit"
        whileTap={{ scale: 0.98 }}
        disabled={status !== "idle"}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-semibold transition-colors",
          status === "success" ? "bg-neon text-slate-deep" : "bg-[#5b6b85] text-[#0c1119] hover:bg-[#6b7d99]"
        )}
      >
        {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
        {status === "success" && <Check className="h-5 w-5" strokeWidth={3} />}
        {status === "loading" ? "Checking API keys…" : "Withdraw"}
      </motion.button>
    </form>
  );
}

function BuyPane({ currency, onCurrency }: { currency: WalletCurrency; onCurrency: (c: WalletCurrency) => void }) {
  const [pay, setPay] = useState("100");
  const [status, setStatus] = useState<Status>("idle");
  const receive = useMemo(() => {
    const v = parseFloat(pay);
    if (!v || v <= 0) return "0.00";
    const out = v / currency.rate;
    return out >= 1000 ? out.toLocaleString(undefined, { maximumFractionDigits: 2 }) : out.toFixed(out >= 1 ? 2 : 6);
  }, [pay, currency]);

  const { notifyMissingApiKey, closeWallet } = useShell();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    // No custody / on-ramp key connected — the order cannot be created.
    window.setTimeout(() => {
      setStatus("idle");
      closeWallet();
      notifyMissingApiKey({ area: "cashier", title: `Buy ${currency.code}` });
    }, 900);
  };

  return (
    <form onSubmit={submit}>
      <p className="mb-2 text-[15px] font-semibold text-cream">You Pay</p>
      <div className="relative">
        <input
          value={pay}
          onChange={(e) => setPay(e.target.value)}
          inputMode="decimal"
          aria-label="Amount in USD"
          className={cn(fieldCls, "pr-16 text-base font-bold")}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-blue">USD</span>
      </div>

      <div className="mt-4">
        <CurrencySelect value={currency} onChange={onCurrency} label="You Receive" />
      </div>
      <div className={cn(fieldCls, "mt-3 flex items-center gap-3")}>
        <CoinBadge currency={currency} />
        <span className="text-base font-bold text-neon">{receive}</span>
        <span className="text-sm font-bold text-muted-blue">{currency.code}</span>
      </div>
      <p className="mt-3 text-xs text-muted-blue">
        Estimated rate: 1 {currency.code} ≈ ${currency.rate.toLocaleString()}
      </p>

      <p className="mb-2 mt-5 text-[15px] font-semibold text-cream">Provider</p>
      <div className="grid grid-cols-2 gap-2">
        {["MoonPay", "Banxa"].map((p, i) => (
          <div
            key={p}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border px-4 py-3.5",
              i === 0 ? "border-neon/50 bg-neon/5" : "border-line/70 bg-[#141b29]"
            )}
          >
            <BadgeDollarSign className={cn("h-5 w-5", i === 0 ? "text-neon" : "text-muted-blue")} />
            <span className="text-sm font-semibold text-cream">{p}</span>
            {i === 0 && <Check className="ml-auto h-4 w-4 text-neon" />}
          </div>
        ))}
      </div>

      <motion.button
        type="submit"
        whileTap={{ scale: 0.98 }}
        disabled={status !== "idle"}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-semibold transition-colors",
          status === "success" ? "bg-neon text-slate-deep" : "bg-[#5b6b85] text-[#0c1119] hover:bg-[#6b7d99]"
        )}
      >
        {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
        {status === "success" && <Check className="h-5 w-5" strokeWidth={3} />}
        {status === "loading" ? "Checking API keys…" : "Continue"}
      </motion.button>
      <p className="mt-3 text-center text-xs text-muted-blue">Card, Apple Pay and Google Pay accepted via provider.</p>
    </form>
  );
}

const tabs: { id: WalletTab; label: string }[] = [
  { id: "deposit", label: "Deposit" },
  { id: "withdraw", label: "Withdraw" },
  { id: "buy", label: "Buy Crypto" },
];

export default function WalletModal() {
  const { walletTab, closeWallet, switchWalletTab } = useShell();
  const open = walletTab !== null;

  const [currency, setCurrency] = useState<WalletCurrency>(walletCurrencies[0]);
  const [network, setNetwork] = useState<WalletNetwork>(walletCurrencies[0].networks[0]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeWallet();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeWallet]);

  const pickCurrency = (c: WalletCurrency) => {
    setCurrency(c);
    setNetwork((n) => c.networks.find((x) => x.id === n.id) ?? c.networks[0]);
  };

  return (
    <AnimatePresence>
      {open && walletTab && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeWallet}
          className="fixed inset-0 z-[1130] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Wallet"
        >
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-line bg-[#0c1119] p-6 sm:max-w-[520px] sm:rounded-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeWallet}
              aria-label="Close wallet"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line text-muted-blue transition-colors hover:border-line-soft hover:text-cream"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex justify-center pt-2">
              <ScriptLogo />
            </div>

            <div className="mt-7 flex gap-1 rounded-xl border border-line p-1" role="tablist" aria-label="Wallet">
              {tabs.map((t) => {
                const selected = walletTab === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => switchWalletTab(t.id)}
                    className={cn(
                      "relative flex-1 rounded-lg px-1 py-3 text-[13px] font-bold uppercase tracking-wide transition-colors sm:text-sm",
                      selected ? "text-white" : "text-muted-blue hover:text-cream"
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="wallet-tab-pill"
                        transition={{ type: "spring", stiffness: 500, damping: 38 }}
                        className="absolute inset-0 rounded-lg border border-white/10 bg-[#5b6b85]"
                      />
                    )}
                    <span className="relative">{t.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              {walletTab !== "buy" && (
                <div className="mb-5">
                  <CurrencySelect value={currency} onChange={pickCurrency} label="Currency" />
                  <div className="mt-5">
                    <NetworkSelect currency={currency} value={network} onChange={setNetwork} />
                  </div>
                </div>
              )}
              {walletTab === "deposit" && <DepositPane currency={currency} network={network} />}
              {walletTab === "withdraw" && <WithdrawPane currency={currency} network={network} />}
              {walletTab === "buy" && <BuyPane currency={currency} onCurrency={pickCurrency} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
