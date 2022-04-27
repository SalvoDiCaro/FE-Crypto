export interface d2 {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
}

export interface d3 {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
}

export interface RespCrypto {
  id: string;
  currency: string;
  symbol: string;
  name: string;
  logo_url: string;
  status: string;
  price: string;
  price_date: Date;
  price_timestamp: Date;
  market_cap: string;
  market_cap_dominance: string;
  rank: string;
  high: string;
  high_timestamp: Date;
  price_change_pct: string;
}
