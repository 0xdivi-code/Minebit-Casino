import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Dev-only: the app is proxied behind sandbox/preview hosts, and Next blocks
   * cross-origin requests to dev resources (HMR, RSC payloads) by default.
   */
  allowedDevOrigins: ["*.e2b.app", "*.e2b.dev", "localhost", "127.0.0.1"],
};

export default nextConfig;
