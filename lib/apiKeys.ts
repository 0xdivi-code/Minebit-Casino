/**
 * API-key gate helpers.
 *
 * The whole platform is shipped without provider credentials, so everything
 * that needs a live backend (games, cashier, sportsbook, accounts) funnels the
 * visitor to the owner's Telegram instead: {@link CONTACT}.
 *
 * The simulated `.env.example` handed out by those prompts is built from
 * `lib/envTemplate.mjs` — the same file that `npm run env:example` writes into
 * the repository root.
 */
import {
  CONTACT as CONTACT_SOURCE,
  CREDENTIAL_KEYS as CREDENTIAL_KEYS_SOURCE,
  ENV_EXAMPLE_FILENAME,
  REQUIRED_CREDENTIALS as REQUIRED_CREDENTIALS_SOURCE,
  renderEnvExample,
} from "./envTemplate.mjs";

export interface Contact {
  name: string;
  username: string;
  handle: string;
  telegramUrl: string;
  email: string;
}

export interface RequiredCredential {
  key: string;
  label: string;
  area: string;
}

/** Owner / developer contact shown on every locked surface. */
export const CONTACT = CONTACT_SOURCE as Contact;

/** Credentials the deployment is missing (shown as a checklist). */
export const REQUIRED_CREDENTIALS = REQUIRED_CREDENTIALS_SOURCE as RequiredCredential[];

/** Env var names of the credentials above, addressable by purpose. */
export const CREDENTIAL_KEYS = CREDENTIAL_KEYS_SOURCE as {
  gameAggregator: string;
  sportsbook: string;
  custody: string;
  auth: string;
  telegram: string;
  kyc: string;
  loyalty: string;
  provablyFair: string;
  database: string;
};

/** Name of the simulated file that gets generated for requesters. */
export const ENV_EXAMPLE_FILE = ENV_EXAMPLE_FILENAME;

/**
 * Flip to `true` (or set `NEXT_PUBLIC_API_KEYS_CONNECTED="true"`) once real
 * credentials exist and the gates should stop firing.
 */
export const API_KEYS_CONNECTED =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_KEYS_CONNECTED?.trim().toLowerCase() === "true";

/** Where a gate was triggered from — feeds the header of the generated file. */
export type GateReason = "game" | "signin" | "page" | "browse" | "setup";

export interface EnvExampleOptions {
  reason?: GateReason;
  /** Free-form detail, e.g. the game title or the account that tried to sign in. */
  detail?: string;
  appUrl?: string;
  generatedAt?: string;
}

const SESSION_FLAG = "minebit:env-example-generated";

/** Human readable "generated for …" line used inside `.env.example`. */
export function envExampleContext(reason: GateReason = "setup", detail?: string): string {
  const detailPart = detail ? ` "${detail}"` : "";
  switch (reason) {
    case "game":
      return `game launch blocked${detailPart} — no API keys connected`;
    case "signin":
      return `sign-in / registration blocked${detailPart} — no API keys connected`;
    case "page":
      return `locked area${detailPart} — no API keys connected`;
    case "browse":
      return `game browsing${detailPart} — no API keys connected`;
    default:
      return "repository setup — no API keys connected";
  }
}

/** Public URL of the running deployment (safe on the server). */
export function currentAppUrl(): string {
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return "http://localhost:3000";
}

/** Build the simulated `.env.example` contents. */
export function buildEnvExample(options: EnvExampleOptions = {}): string {
  const { reason = "setup", detail, appUrl, generatedAt } = options;
  return renderEnvExample({
    appUrl: appUrl ?? currentAppUrl(),
    requestContext: envExampleContext(reason, detail),
    generatedAt,
    contactUsername: CONTACT.username,
    contactUrl: CONTACT.telegramUrl,
  });
}

/**
 * Generate the simulated `.env.example` and hand it to the browser as a
 * download. Returns the file name that was used.
 */
export function downloadEnvExample(options: EnvExampleOptions = {}): string {
  const content = buildEnvExample(options);
  if (typeof window === "undefined" || typeof document === "undefined") return ENV_EXAMPLE_FILENAME;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = ENV_EXAMPLE_FILENAME;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
  return ENV_EXAMPLE_FILENAME;
}

/**
 * Downloads the simulated file once per browser session, so the first locked
 * interaction produces a file without spamming the visitor on every click.
 */
export function downloadEnvExampleOnce(options: EnvExampleOptions = {}): boolean {
  if (typeof window === "undefined") return false;
  let already = false;
  try {
    already = window.sessionStorage.getItem(SESSION_FLAG) === "1";
  } catch {
    already = false;
  }
  if (already) return false;
  try {
    window.sessionStorage.setItem(SESSION_FLAG, "1");
  } catch {
    /* storage disabled — still generate the file */
  }
  downloadEnvExample(options);
  return true;
}

/** Copy helper with a graceful fallback for non-secure contexts. */
export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through to the legacy path */
    }
  }
  if (typeof document === "undefined") return false;
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}
