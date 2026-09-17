interface EthereumProvider {
  request: (args: { method: string; params?: unknown }) => Promise<unknown>;
  isMetaMask?: boolean;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export type ConnectResult =
  | { ok: true; account: string }
  | { ok: false; reason: "not-installed" | "rejected" | "error" };

/**
 * Attempt a MetaMask connection. Never throws — every failure mode is
 * captured and returned so the UI can show friendly feedback instead of
 * surfacing uncaught (extension) errors.
 */
export async function connectMetaMask(): Promise<ConnectResult> {
  try {
    if (typeof window === "undefined") return { ok: false, reason: "error" };
    const eth = window.ethereum;
    if (!eth) return { ok: false, reason: "not-installed" };
    const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[] | null;
    if (!accounts || accounts.length === 0) return { ok: false, reason: "rejected" };
    return { ok: true, account: accounts[0] };
  } catch (err: unknown) {
    const code =
      typeof err === "object" && err !== null && "code" in err
        ? (err as { code?: unknown }).code
        : undefined;
    // 4001 = user rejected the request in MetaMask
    return { ok: false, reason: code === 4001 ? "rejected" : "error" };
  }
}

export function formatAddress(address: string): string {
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export const connectErrorCopy: Record<string, string> = {
  "not-installed": "MetaMask extension not detected. Install it to continue.",
  rejected: "Connection request was rejected in MetaMask.",
  error: "Could not connect to MetaMask. Please try again.",
};
