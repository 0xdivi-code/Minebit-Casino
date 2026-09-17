import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { BtnDark, BtnPrimary } from "@/components/ui/Buttons";

export default function NotFound() {
  return (
    <AppShell>
      <section className="relative flex min-h-[62vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="hero-grid-bg absolute inset-0" />
        </div>
        <p className="relative text-7xl font-extrabold text-slate-deep">404</p>
        <h1 className="relative mt-4 text-2xl font-bold text-cream">Page not found</h1>
        <p className="relative mt-2 max-w-[400px] text-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </p>
        <div className="relative mt-8 flex w-full max-w-[420px] flex-col gap-2 sm:flex-row">
          <Link href="/" className="flex-1">
            <BtnPrimary className="w-full">Back to Lobby</BtnPrimary>
          </Link>
          <Link href="/games/slots" className="flex-1">
            <BtnDark className="w-full">Browse Slots</BtnDark>
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
