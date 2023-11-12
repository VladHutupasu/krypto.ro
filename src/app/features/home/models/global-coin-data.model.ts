export interface GlobalCoinData {
  active_cryptocurrencies: number;
  ended_icos: number;
  market_cap_change_percentage_24h_usd: number;
  market_cap_percentage: CryptoCurrencies;
  markets: number;
  ongoing_icos: number;
  total_market_cap: Currencies;
  total_volume: Currencies;
  upcoming_icos: number;
  updated_at: number;
}

interface Currencies {
  btc: number;
  eur: number;
  usd: number;
}

interface CryptoCurrencies {
  btc: number;
  eth: number;
  usdt: number;
}
