import { CONTACT as CONTACT_SOURCE } from "./envTemplate.mjs";

export interface Contact {
  name: string;
  username: string;
  handle: string;
  telegramUrl: string;
  email: string;
}

/** Owner / developer contact used by every "API not connected" prompt. */
export const CONTACT = CONTACT_SOURCE as Contact;

/** Flip to `true` (or set `NEXT_PUBLIC_API_KEYS_CONNECTED`) once keys exist. */
export const API_KEYS_CONNECTED =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_KEYS_CONNECTED?.trim().toLowerCase() === "true";

/* ---------------------------------------------------------------------------
 * Shared gate copy — keep every locked surface short and identical.
 * ------------------------------------------------------------------------ */

/** Badge / heading used on locked surfaces. */
export const GATE_BADGE = "API not connected";

/** Single explanation shown to visitors. */
export const GATE_MESSAGE = "API not connected or URI mismatched. Please check .env or contact the developer.";

/** Label of the action that sends the visitor to the developer's Telegram. */
export const GET_API_LABEL = "Get API here";
