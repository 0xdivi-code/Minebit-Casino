import { cn } from "@/lib/utils";

/* ---------- payment brand marks (recreated vector marks) ---------- */

export function ApplePayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 22" className={cn("h-[22px] w-auto", className)} aria-label="Apple Pay">
      <rect width="40" height="22" rx="4" fill="#101620" stroke="#1E2736" />
      <path
        d="M13.6 8.1c-.5-1-1.3-1.5-2.2-1.6l-.1.2c.4.9.3 2.4-.6 3.5-.6.8-1.2 1-1.2 1.7 0 .8.8 1 1.4.5.4-.3.8-.8 1.4-.7.6 0 .9.7 1.6.7.8 0 1.2-.8 1.2-1.5 0-.6-.4-1-1-1.1.2-1 .9-1.4 1.3-1.5-.5-.7-1.1-1-1.8-1.1zm.3-2.9c-.5 0-1.2.4-1.6 1-.4.5-.7 1.3-.6 2 .6 0 1.2-.3 1.6-.9.4-.5.8-1.3.7-2.1h-.1z"
        fill="#FDFDFD"
      />
      <text x="19" y="15" fontSize="9" fontWeight="700" fill="#FDFDFD" fontFamily="Inter,sans-serif">
        Pay
      </text>
    </svg>
  );
}

export function MastercardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 33 22" className={cn("h-[22px] w-auto", className)} aria-label="Mastercard">
      <rect width="33" height="22" rx="4" fill="#101620" stroke="#1E2736" />
      <circle cx="13.5" cy="11" r="6" fill="#EB001B" />
      <circle cx="19.5" cy="11" r="6" fill="#F79E1B" fillOpacity="0.9" />
    </svg>
  );
}

export function VisaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 22" className={cn("h-[22px] w-auto", className)} aria-label="Visa">
      <rect width="40" height="22" rx="4" fill="#101620" stroke="#1E2736" />
      <text x="20" y="15.5" textAnchor="middle" fontSize="10.5" fontWeight="800" fontStyle="italic" fill="#1A1F71" fontFamily="Inter,sans-serif">
        VISA
      </text>
    </svg>
  );
}

export function GooglePayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 47 22" className={cn("h-[22px] w-auto", className)} aria-label="Google Pay">
      <rect width="47" height="22" rx="4" fill="#101620" stroke="#1E2736" />
      <text x="7" y="15" fontSize="10" fontWeight="700" fontFamily="Inter,sans-serif">
        <tspan fill="#4285F4">G</tspan>
        <tspan fill="#EA4335"> </tspan>
        <tspan fill="#9AA0A6" fontWeight="500">Pay</tspan>
      </text>
    </svg>
  );
}

/* ---------- social / login marks ---------- */

export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.1 3.5 2.7.2.1c2.2-2 3.6-5 3.6-8.9z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.2 0-5.9-2.1-6.8-5l-.1.1-3.6 2.8v.1C3.4 21.5 7.4 24 12 24z" />
      <path fill="#FBBC05" d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4l-.1-.1-3.5-2.7-.1.1C.5 8.9 0 10.4 0 12s.5 3.1 1.5 4.5l3.7-2.1z" />
      <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.4 0 3.4 2.5 1.5 6.9l3.7 2.9c.9-2.9 3.6-5.1 6.8-5.1z" />
    </svg>
  );
}

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#229ED9" />
      <path
        fill="#fff"
        d="M17.8 7.4L6.7 11.7c-.8.3-.8 1.4.1 1.5l2.6.8 1 3.1c.3.8 1.4.7 1.7-.1l1.5-2.7 2.9 2.1c.6.5 1.6.1 1.7-.7l1.2-6.9c.2-1-.9-1.7-1.6-1.4zM9.4 12.9l5.4-3.3c.2-.1.4.1.2.3l-4.4 4-.2 1.9c0 .2-.3.3-.4.1l-.6-3z"
      />
    </svg>
  );
}

export function MetamaskIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#E2761B" d="M13.9 2.2L17 8.2l2.5-.7-5.6-5.3zM4.5 7.5L7 8.2l3.1-6L4.5 7.5z" />
      <path fill="#E2761B" d="M18.9 16.2l-1.5 2.3-2.6.7-2.5 2v-2.4l-2.6-1.2 1-2.1 8.2.7zM11.3 15.5l1-2.1-2.6 1.2v2.4l-2.5-2-2.6-.7-1.5-2.3 8.2-.7v4.2z" />
      <path fill="#D7C1B3" d="M14.8 17.6l2.6-.7 2.1 2.9-4 .7-.7-2.9zM4.5 19.8l2.1-2.9 2.6.7-.7 2.9-4-.7z" />
      <path fill="#233447" d="M9.7 11.1L7 8.7l-2.3.5 3.1 4.3 1.9-2.4zM16.7 8.7l-2.7 2.4 1.9 2.4 3.1-4.3-2.3-.5z" />
      <path fill="#CD6116" d="M7.8 16.9l1.9 2.9.7 2.9 1.9-.9v-4.2l-4.5-1.7v1zM14.2 16.9v-1l-4.5 1.7v4.2l1.9.9.7-2.9 1.9-2.9z" />
      <path fill="#E2761B" d="M14.2 16.9l-1.9 2.9-.7 2.9 3.2-1.1.7-2.9 1.3-1.1-2.6-.7zM7.8 16.9l-2.6.7 1.3 1.1.7 2.9 3.2 1.1-.7-2.9-1.9-2.9z" />
      <path fill="#F6851B" d="M19.5 8.2L22 13l-2.5 3.2 1-4.5-1-3.5zM1.5 13l2.5-4.8-1 3.5 1 4.5L1.5 13z" />
      <path fill="#C0AD9E" d="M9.7 19.8l-1.9-2.9-4.3-.7 2.1 2.9 4.1.7zM14.8 17.6l-.7 2.9 4.1-.7 2.1-2.9-4.3.7h-1.2z" />
      <path fill="#161616" d="M9.7 11.1l2.6 1.5v-2.4L9.7 8.7v2.4zM14.3 8.7l-2.6 1.5v2.4l2.6-1.5V8.7z" />
      <path fill="#763D16" d="M14.8 17.6h-5.1l-.7 2.9 2.6.4v-1.6h1.3v1.6l2.6-.4-.7-2.9z" />
      <path fill="#F6851B" d="M14.3 8.7l2.4-.5 2.8-.7-2.5 5.5-1 1.5-1.6-1.9-.1-3.9zM4.5 7.5l2.8.7 2.4.5-.1 3.9-1.6 1.9-1-1.5L4.5 7.5z" />
    </svg>
  );
}

/* ---------- footer socials ---------- */

export function XSocialIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M19.6 5.1A16.4 16.4 0 0 0 15.5 4l-.5 1a15 15 0 0 0-6 0L8.5 4a16.4 16.4 0 0 0-4.1 1.2C1.8 9.2 1.1 13.1 1.4 17c2 1.5 4 2.4 5.9 3l1.4-2.3h-2.4l-.6-.7c2.5-1.1 3.5-2.2 3.5-2.2a5.6 5.6 0 0 0 5.6 0s1 1.1 3.5 2.2l-.6.7h-2.4L16.1 20c1.9-.6 3.9-1.5 5.9-3 .4-4.6-.7-8.6-2.4-11.9zM8.7 14.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"
      />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.6H7.7V14h2.7v8h3.1z" />
    </svg>
  );
}

/* ---------- misc ---------- */

export function GiftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="8" width="17" height="4" rx="1" fill="#FD9535" />
      <path d="M5 12v8.5A1.5 1.5 0 0 0 6.5 22h11a1.5 1.5 0 0 0 1.5-1.5V12h-14z" fill="#49EE85" />
      <path d="M12 8v14" stroke="#080D12" strokeWidth="2" />
      <path d="M12 8C12 5 10 3.5 8.3 3.5S5 5.4 5.5 7c.4 1.2 2.4 1 6.5 1zm0 0c0-3 2-4.5 3.7-4.5S19 5.4 18.5 7c-.4 1.2-2.4 1-6.5 1z" fill="#FD9535" />
    </svg>
  );
}

export function EnFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden>
      <rect width="20" height="14" rx="2" fill="#012169" />
      <path d="M0 0l20 14M20 0L0 14" stroke="#fff" strokeWidth="2.6" />
      <path d="M0 0l20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4" />
      <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.2" />
    </svg>
  );
}

export function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
