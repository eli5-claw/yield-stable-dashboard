// Real DeFiLlama API integration for yield data
export interface YieldData {
  protocol: string;
  chain: string;
  symbol: string;
  tvlUsd: number;
  apy: number;
  apyBase: number;
  apyReward: number;
  pool: string;
  stablecoin: boolean;
}

export async function fetchYieldData(): Promise<YieldData[]> {
  try {
    const response = await fetch('https://yields.llama.fi/pools');
    const data = await response.json();
    
    // Filter for stablecoin yields only
    const stableYields = data.data.filter((pool: YieldData) => 
      pool.stablecoin === true && 
      pool.tvlUsd > 1000000 // Min $1M TVL
    );
    
    return stableYields.sort((a: YieldData, b: YieldData) => b.apy - a.apy);
  } catch (error) {
    console.error('Failed to fetch yield data:', error);
    return [];
  }
}

export async function fetchStablecoins(): Promise<any[]> {
  try {
    const response = await fetch('https://stablecoins.llama.fi/stablecoins');
    const data = await response.json();
    return data.peggedAssets || [];
  } catch (error) {
    console.error('Failed to fetch stablecoin data:', error);
    return [];
  }
}

// Top yield-bearing stablecoins by category
export const TOP_YIELD_POOLS = [
  { protocol: 'Aave', chain: 'Ethereum', symbol: 'USDC', apy: 4.52, tvl: 4200000000 },
  { protocol: 'Compound', chain: 'Ethereum', symbol: 'USDC', apy: 4.38, tvl: 2800000000 },
  { protocol: 'Ethena', chain: 'Ethereum', symbol: 'USDe', apy: 12.8, tvl: 2400000000 },
  { protocol: 'MakerDAO', chain: 'Ethereum', symbol: 'sDAI', apy: 5.15, tvl: 1800000000 },
  { protocol: 'Pendle', chain: 'Ethereum', symbol: 'PT-sUSDe', apy: 8.45, tvl: 890000000 },
  { protocol: 'Morpho', chain: 'Base', symbol: 'USDC', apy: 7.15, tvl: 580000000 },
  { protocol: 'Aerodrome', chain: 'Base', symbol: 'USD+', apy: 6.85, tvl: 320000000 },
  { protocol: 'Mountain', chain: 'Base', symbol: 'USDM', apy: 5.25, tvl: 450000000 },
  { protocol: 'Kamino', chain: 'Solana', symbol: 'USDC', apy: 8.25, tvl: 340000000 },
  { protocol: 'Solend', chain: 'Solana', symbol: 'USDC', apy: 5.95, tvl: 290000000 },
];
