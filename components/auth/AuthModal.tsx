"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useShell } from "../layout/AppShell";
import { GoogleIcon, MetamaskIcon, TelegramPlaneIcon } from "../ui/Icons";
import { connectErrorCopy, connectMetaMask, formatAddress } from "@/lib/wallet";

type Status = "idle" | "loading" | "success";

function ScriptLogo() {
  return (
    <span className="relative inline-block text-[34px] font-extrabold italic leading-none tracking-tight text-white">
      <svg viewBox="0 0 18 22" aria-hidden className="absolute -left-4 top-1 h-5 w-4">
        <path d="M14 1L4 21l3-1 9-18z" fill="#F5A623" />
        <path d="M17 5L9 21l2.5-.8L18 6z" fill="#F5A623" opacity="0.55" />
      </svg>
      MineBit
    </span>
  );
}

const inputCls =
  "w-full rounded-xl border border-line/70 bg-[#141b29] px-4 py-3.5 text-sm font-medium text-cream placeholder:text-[#5b6b85] placeholder:font-normal outline-none transition-colors focus:border-neon/60";

export default function AuthModal() {
  const { authMode, closeAuth, switchAuth } = useShell();
  const open = authMode !== null;
  const isRegister = authMode === "register";

  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [promo, setPromo] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [mm, setMm] = useState<{ state: "idle" | "connecting" | "done" | "fail"; account?: string; reason?: string }>({ state: "idle" });

  // escape to close + scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAuth();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeAuth]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setShowPassword(false);
      setMm({ state: "idle" });
    }
  }, [open ]);

  const connectWallet = async () => {
    if (mm.state === "connecting") return;
    setMm({ state: "connecting" });
    const res = await connectMetaMask();
    if (res.ok) setMm({ state: "done", account: res.account });
    else setMm({ state: "fail", reason: res.reason });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 900);
    window.setTimeout(() => closeAuth(), 2100);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeAuth}
          className="fixed inset-0 z-[1100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={isRegister ? "Register" : "Log in"}
        >
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-line bg-[#0c1119] p-6 sm:max-w-[480px] sm:rounded-2xl sm:p-8"
          >
            {/* close */}
            <button
              type="button"
              onClick={closeAuth}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line text-muted-blue transition-colors hover:border-line-soft hover:text-cream"
            >
              <X className="h-5 w-5" />
            </button>

            {/* logo */}
            <div className="flex justify-center pt-2">
              <ScriptLogo />
            </div>

            {/* tabs */}
            <div className="mt-7 flex gap-1 rounded-xl border border-line p-1" role="tablist" aria-label="Auth mode">
              {(["register", "login"] as const).map((mode) => {
                const selected = authMode === mode;
                return (
                  <button
                    key={mode}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => switchAuth(mode)}
                    className={cn(
                      "relative flex-1 rounded-lg py-3 text-sm font-bold uppercase tracking-wide transition-colors",
                      selected ? "text-white" : "text-muted-blue hover:text-cream"
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="auth-tab-pill"
                        transition={{ type: "spring", stiffness: 500, damping: 38 }}
                        className="absolute inset-0 rounded-lg border border-white/10 bg-[#5b6b85]"
                      />
                    )}
                    <span className="relative">{mode === "register" ? "Register" : "Log In"}</span>
                  </button>
                );
              })}
            </div>

            {/* form */}
            <form onSubmit={submit} className="mt-6">
              <label htmlFor="auth-email" className="mb-2 block text-[15px] font-semibold text-cream">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                className={inputCls}
              />

              <label htmlFor="auth-password" className="mb-2 mt-5 block text-[15px] font-semibold text-cream">
                Password
              </label>
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  className={cn(inputCls, "pr-12")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white transition-colors hover:text-neon"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {isRegister ? (
                <>
                  <div className="mt-5 flex items-start gap-3">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={accepted}
                      aria-label="Accept Terms and Conditions"
                      onClick={() => setAccepted((v) => !v)}
                      className={cn(
                        "mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md transition-colors",
                        accepted ? "bg-emerald-500" : "border border-line-soft bg-transparent"
                      )}
                    >
                      {accepted && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                    </button>
                    <p className="text-[13px] leading-snug text-muted">
                      I have read and accepted the{" "}
                      <a href="/terms" onClick={(e) => e.stopPropagation()} className="text-cream underline hover:text-neon">
                        Terms and Conditions
                      </a>
                      . I am 18 years or older and not a resident of the restricted territories.
                    </p>
                  </div>
                  <input
                    type="text"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Referral/Promo Code"
                    aria-label="Referral or promo code"
                    className={cn(inputCls, "mt-4")}
                  />
                </>
              ) : (
                <div className="mt-5">
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[15px] font-medium text-cream hover:text-neon hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

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
                {status === "loading"
                  ? "Please wait…"
                  : status === "success"
                    ? isRegister
                      ? "Account created!"
                      : "Welcome back!"
                    : isRegister
                      ? "Register"
                      : "Log in"}
              </motion.button>
            </form>

            {/* socials */}
            <p className="mt-7 text-center text-[15px] font-semibold text-cream">or continue with</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <button
                type="button"
                aria-label="Continue with Google"
                className="flex items-center justify-center rounded-xl bg-navy py-3.5 transition-colors hover:bg-navy-hover"
              >
                <GoogleIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Continue with Telegram"
                className="flex items-center justify-center rounded-xl bg-navy py-3.5 transition-colors hover:bg-navy-hover"
              >
                <TelegramPlaneIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Continue with MetaMask"
                onClick={connectWallet}
                disabled={mm.state === "connecting"}
                className="flex items-center justify-center rounded-xl bg-navy py-3.5 transition-colors hover:bg-navy-hover disabled:opacity-70"
              >
                {mm.state === "connecting" ? (
                  <Loader2 className="h-6 w-6 animate-spin text-muted-blue" />
                ) : mm.state === "done" ? (
                  <Check className="h-6 w-6 text-neon" strokeWidth={3} />
                ) : (
                  <MetamaskIcon className="h-6 w-6" />
                )}
              </button>
            </div>
            {mm.state === "done" && mm.account && (
              <p className="mt-3 text-center text-xs font-semibold text-neon">
                Wallet connected: {formatAddress(mm.account)}
              </p>
            )}
            {mm.state === "fail" && (
              <p className="mt-3 text-center text-xs font-medium text-[#f59e0b]">
                {connectErrorCopy[mm.reason ?? "error"]}
              </p>
            )}

            {/* switch */}
            <p className="mt-6 text-center text-sm text-muted-blue">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <button type="button" onClick={() => switchAuth("login")} className="font-semibold text-cream underline hover:text-neon">
                    Sign in instead
                  </button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => switchAuth("register")} className="font-semibold text-cream underline hover:text-neon">
                    Register on MineBit
                  </button>
                </>
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
