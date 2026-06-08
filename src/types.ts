export interface AssetSpec {
  label: string;
  value: string;
}

export type AssetCategory = 'yachts' | 'automobiles';

export interface Asset {
  id: string;
  category: AssetCategory;
  name: string;
  tagline: string;
  description: string;
  serial: string; // e.g. "01 / 03"
  indexNum: string; // "01"
  bgImage: string;
  dimensions: string; // e.g., "115M | LURSSEN | 2024" or "ONE-OFF | BESPOKE | 2025"
  specs: AssetSpec[];
  longDescription: string;
  features: string[];
  priceEstimate: string;
  verifiedHash: string; // On-chain proof mock signature
}

export interface JournalStory {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  image: string;
}

export interface WalletPortfolioItem {
  id: string;
  assetName: string;
  category: AssetCategory;
  certificateHash: string;
  mintedAt: string;
  tier: string;
}

export interface UserWallet {
  connected: boolean;
  address: string | null;
  balanceETH: number;
  balanceUSDC: number;
  tier: 'None' | 'Vanguard' | 'Sovereign' | 'Legacy';
  inventory: WalletPortfolioItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
}
