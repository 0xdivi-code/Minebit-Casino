#!/usr/bin/env node
/**
 * Writes the simulated `.env.example` into the repository root.
 *
 * Content comes from `lib/envTemplate.mjs`, the same module the app imports to
 * generate a fresh copy for visitors who hit an "API key not connected" gate.
 *
 *   npm run env:example
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ENV_EXAMPLE_FILENAME, renderEnvExample } from "../lib/envTemplate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, ENV_EXAMPLE_FILENAME);

const content = renderEnvExample({
  requestContext: "repository setup (npm run env:example)",
  appUrl: "http://localhost:3000",
});

writeFileSync(target, content, "utf8");
console.log(`✓ ${ENV_EXAMPLE_FILENAME} generated (${content.split("\n").length} lines) → ${target}`);
console.log("  API keys are NOT connected — contact @Vicckr on Telegram for full access.");
