export interface WalletNetwork {
  id: string;
  /** e.g. "Ethereum (ERC20)" */
  display: string;
  address: string;
}

export interface WalletCurrency {
  code: string;
  name: string;
  symbol: string;
  bg: string;
  /** mock USD rate for the Buy Crypto estimator */
  rate: number;
  /** min deposit expressed in crypto */
  minDeposit: string;
  minWithdraw: string;
  networks: WalletNetwork[];
}

/** Mock cashier data — UI only, addresses are illustrative. */
export const walletCurrencies: WalletCurrency[] = [
  {
    code: "USDT",
    name: "Tether",
    symbol: "₮",
    bg: "#26a17b",
    rate: 1,
    minDeposit: "USDT 10",
    minWithdraw: "USDT 20",
    networks: [
      { id: "ERC-20", display: "Ethereum (ERC20)", address: "0x767fA49205A50A0955CB0af054c812d50aeA3d20" },
      { id: "TRC-20", display: "Tron (TRC20)", address: "TY67fA49205A50A0955CB0af054c812d50aeA3d" },
      { id: "BEP-20", display: "BNB Chain (BEP20)", address: "0x3d20A50A0955CB0af054c812d50aeA3767fA49" },
      { id: "SOL", display: "Solana", address: "7Y67fA49205A50A0955CB0af054c812d50aeA3d20m" },
    ],
  },
  {
    code: "BTC",
    name: "Bitcoin",
    symbol: "₿",
    bg: "#f7931a",
    rate: 67500,
    minDeposit: "BTC 0.0002",
    minWithdraw: "BTC 0.0004",
    networks: [{ id: "BTC", display: "Bitcoin", address: "bc1q767fa49205a50a0955cb0af054c812d50ae3d20" }],
  },
  {
    code: "ETH",
    name: "Ethereum",
    symbol: "Ξ",
    bg: "#627eea",
    rate: 3520,
    minDeposit: "ETH 0.005",
    minWithdraw: "ETH 0.01",
    networks: [{ id: "ERC-20", display: "Ethereum (ERC20)", address: "0x767fA49205A50A0955CB0af054c812d50aeA3d20" }],
  },
  {
    code: "USDC",
    name: "USD Coin",
    symbol: "$",
    bg: "#2775ca",
    rate: 1,
    minDeposit: "USDC 10",
    minWithdraw: "USDC 20",
    networks: [
      { id: "ERC-20", display: "Ethereum (ERC20)", address: "0xA3d20767fA49205A50A0955CB0af054c812d50ae" },
      { id: "BEP-20", display: "BNB Chain (BEP20)", address: "0x50A0955CB0af054c812d50aeA3d20767fA492" },
      { id: "SOL", display: "Solana", address: "7Y50A0955CB0af054c812d50aeA3767fA49205A" },
    ],
  },
  {
    code: "BNB",
    name: "BNB",
    symbol: "◆",
    bg: "#f0b90b",
    rate: 598,
    minDeposit: "BNB 0.02",
    minWithdraw: "BNB 0.04",
    networks: [{ id: "BEP-20", display: "BNB Chain (BEP20)", address: "0x50A0955CB0af054c812d50aeA3d20767fA492" }],
  },
  {
    code: "SOL",
    name: "Solana",
    symbol: "◎",
    bg: "#9945ff",
    rate: 172,
    minDeposit: "SOL 0.1",
    minWithdraw: "SOL 0.2",
    networks: [{ id: "SOL", display: "Solana", address: "7Y67fA49205A50A0955CB0af054c812d50aeA3d20m" }],
  },
  {
    code: "XRP",
    name: "XRP",
    symbol: "✕",
    bg: "#25a4e8",
    rate: 0.62,
    minDeposit: "XRP 20",
    minWithdraw: "XRP 40",
    networks: [{ id: "XRP", display: "XRP", address: "r767fA49205A50A0955CB0af054c812d50aeA3d20" }],
  },
  {
    code: "DOGE",
    name: "Dogecoin",
    symbol: "Ð",
    bg: "#c2a633",
    rate: 0.16,
    minDeposit: "DOGE 60",
    minWithdraw: "DOGE 120",
    networks: [{ id: "DOGE", display: "Dogecoin", address: "D767fA49205A50A0955CB0af054c812d50aeA3" }],
  },
  {
    code: "TRX",
    name: "Tron",
    symbol: "▲",
    bg: "#eb0029",
    rate: 0.12,
    minDeposit: "TRX 100",
    minWithdraw: "TRX 200",
    networks: [{ id: "TRC-20", display: "Tron (TRC20)", address: "TY67fA49205A50A0955CB0af054c812d50aeA3d" }],
  },
  {
    code: "ADA",
    name: "Cardano",
    symbol: "●",
    bg: "#3468d1",
    rate: 0.45,
    minDeposit: "ADA 25",
    minWithdraw: "ADA 50",
    networks: [{ id: "ADA", display: "Cardano", address: "addr1767fa49205a50a0955cb0af054c812d50aeA3d20" }],
  },
  {
    code: "BCH",
    name: "Bitcoin Cash",
    symbol: "₿",
    bg: "#8dc351",
    rate: 450,
    minDeposit: "BCH 0.03",
    minWithdraw: "BCH 0.06",
    networks: [{ id: "BCH", display: "Bitcoin Cash", address: "bitcoincash:q767fa49205a50a0955cb0af054c812d5" }],
  },
];
