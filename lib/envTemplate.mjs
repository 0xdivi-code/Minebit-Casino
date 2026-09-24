/**
 * Single source of truth for the *simulated* `.env.example` that MineBit hands
 * out whenever a locked feature is touched (game launch, sign-in, gated pages).
 *
 * Plain ESM so the exact same file can be:
 *   - imported by the app (`lib/apiKeys.ts` -> browser / Next.js bundler)
 *   - imported by Node (`scripts/generate-env-example.mjs`) to write the real
 *     `.env.example` file into the repository root.
 *
 * NOTE: no real secrets live here — every value is intentionally empty so that
 * whoever runs this frontend has to reach out for working credentials.
 */

/** Owner / developer contact used by every "API keys not connected" gate. */
export const CONTACT = {
  name: "Vicckr",
  username: "Vicckr",
  handle: "@Vicckr",
  telegramUrl: "https://t.me/Vicckr",
  email: "support@minebit.com",
};

export const ENV_EXAMPLE_FILENAME = ".env.example";

/** Tokens replaced by `renderEnvExample()`. */
export const ENV_TOKENS = {
  generatedAt: "{{GENERATED_AT}}",
  requestContext: "{{REQUEST_CONTEXT}}",
  appUrl: "{{APP_URL}}",
  contactHandle: "{{CONTACT_HANDLE}}",
  contactUsername: "{{CONTACT_USERNAME}}",
  contactUrl: "{{CONTACT_URL}}",
};

export const ENV_EXAMPLE_TEMPLATE = `# =============================================================================
#  MineBit Casino — environment configuration
#  File: ${ENV_EXAMPLE_FILENAME}
# =============================================================================
#  Generated: {{GENERATED_AT}}
#  Generated for: {{REQUEST_CONTEXT}}
#
#  STATUS: API NOT CONNECTED
#  ------------------------
#  Every credential below is intentionally empty, so launches fail with
#  "API not connected or URI mismatched" until the real keys are supplied.
#
#  Get API here  ->  {{CONTACT_URL}}
#
#  Usage:
#      1. cp ${ENV_EXAMPLE_FILENAME} .env
#      2. Fill in the values you were issued.
#      3. Restart the dev server (npm run dev) so Next.js picks them up.
#
#  NEVER commit a real ".env" file — only this example belongs in git.
#  Regenerate this file with: npm run env:example
# =============================================================================

# -----------------------------------------------------------------------------
#  App / branding
# -----------------------------------------------------------------------------
NEXT_PUBLIC_APP_NAME="MineBit"
NEXT_PUBLIC_APP_URL="{{APP_URL}}"
NEXT_PUBLIC_APP_ENV="development"
NEXT_PUBLIC_APP_DOMAIN="localhost"

# -----------------------------------------------------------------------------
#  Platform owner contact  (used by the "API keys not connected" prompts)
# -----------------------------------------------------------------------------
NEXT_PUBLIC_DEVELOPER_NAME="Vicckr"
NEXT_PUBLIC_DEVELOPER_TELEGRAM="{{CONTACT_USERNAME}}"
NEXT_PUBLIC_DEVELOPER_TELEGRAM_URL="{{CONTACT_URL}}"
NEXT_PUBLIC_SUPPORT_EMAIL="support@minebit.com"

# -----------------------------------------------------------------------------
#  Master switch — must be "true" before any gated surface unlocks
# -----------------------------------------------------------------------------
NEXT_PUBLIC_API_KEYS_CONNECTED="false"

# -----------------------------------------------------------------------------
#  Auth / accounts — sign-in and registration return "full access required"
# -----------------------------------------------------------------------------
NEXTAUTH_URL="{{APP_URL}}"
NEXTAUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
TELEGRAM_BOT_TOKEN=""
TELEGRAM_BOT_USERNAME=""
TELEGRAM_LOGIN_CLIENT_SECRET=""

# -----------------------------------------------------------------------------
#  Game aggregator / casino provider — REQUIRED to launch any game
# -----------------------------------------------------------------------------
GAME_AGGREGATOR_API_URL=""
GAME_AGGREGATOR_API_KEY=""
GAME_AGGREGATOR_SECRET_KEY=""
GAME_AGGREGATOR_LAUNCH_SECRET=""
GAME_AGGREGATOR_WALLET_ID=""
GAME_AGGREGATOR_CURRENCIES="BTC,ETH,USDT,USDC,BNB,SOL,XRP,DOGE,TRX,ADA,BCH"

# -----------------------------------------------------------------------------
#  Sportsbook / odds feed — REQUIRED for /sportsbook and live betting
# -----------------------------------------------------------------------------
SPORTSBOOK_API_URL=""
SPORTSBOOK_API_KEY=""
SPORTSBOOK_SECRET_KEY=""
SPORTSBOOK_OPERATOR_ID=""

# -----------------------------------------------------------------------------
#  Crypto custody / payments — REQUIRED for deposits, withdrawals & balances
# -----------------------------------------------------------------------------
CUSTODY_API_URL=""
CUSTODY_API_KEY=""
CUSTODY_API_SECRET=""
CUSTODY_WEBHOOK_SECRET=""
CUSTODY_TREASURY_WALLET=""
TRONGRID_API_KEY=""
ETHERSCAN_API_KEY=""

# -----------------------------------------------------------------------------
#  Provably fair / RNG originals
# -----------------------------------------------------------------------------
PROVABLY_FAIR_SERVER_SEED=""
PROVABLY_FAIR_CLIENT_SEED_SALT=""

# -----------------------------------------------------------------------------
#  CRM, loyalty, tournaments, KYC & AML
# -----------------------------------------------------------------------------
CRM_API_KEY=""
LOYALTY_API_KEY=""
TOURNAMENTS_API_KEY=""
KYC_PROVIDER_API_KEY=""
AML_SCREENING_API_KEY=""
PROFIT_SHARE_POOL_SECRET=""

# -----------------------------------------------------------------------------
#  Infrastructure
# -----------------------------------------------------------------------------
DATABASE_URL="postgresql://minebit:password@localhost:5432/minebit"
REDIS_URL="redis://localhost:6379"
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
SENTRY_DSN=""

# -----------------------------------------------------------------------------
#  Feature flags — stay "false" until the credentials above are connected
# -----------------------------------------------------------------------------
FEATURE_GAMES_ENABLED="false"
FEATURE_SPORTSBOOK_ENABLED="false"
FEATURE_DEPOSITS_ENABLED="false"
FEATURE_WITHDRAWALS_ENABLED="false"
FEATURE_REGISTRATION_ENABLED="false"

# =============================================================================
#  End of ${ENV_EXAMPLE_FILENAME} — questions? Telegram {{CONTACT_HANDLE}}
# =============================================================================
`;

/**
 * Fill the `.env.example` template.
 *
 * @param {object} [options]
 * @param {string} [options.appUrl]          Public URL of the running deployment.
 * @param {string} [options.requestContext]  Why the file was generated.
 * @param {string} [options.generatedAt]     ISO timestamp (defaults to now).
 * @param {string} [options.contactUsername] Telegram username without "@".
 * @param {string} [options.contactUrl]      Telegram deep link.
 * @returns {string} Ready-to-write `.env.example` content.
 */
export function renderEnvExample(options = {}) {
  const {
    appUrl = "http://localhost:3000",
    requestContext = "repository setup (no API keys connected)",
    generatedAt = new Date().toISOString(),
    contactUsername = CONTACT.username,
    contactUrl = CONTACT.telegramUrl,
  } = options;

  // Tokens appear more than once in the template, so swap every occurrence.
  const fill = (text, token, value) => text.split(token).join(value);

  return [
    [ENV_TOKENS.generatedAt, generatedAt],
    [ENV_TOKENS.requestContext, requestContext],
    [ENV_TOKENS.appUrl, appUrl],
    [ENV_TOKENS.contactUsername, contactUsername],
    [ENV_TOKENS.contactHandle, `@${contactUsername}`],
    [ENV_TOKENS.contactUrl, contactUrl],
  ].reduce((text, [token, value]) => fill(text, token, value), ENV_EXAMPLE_TEMPLATE);
}

