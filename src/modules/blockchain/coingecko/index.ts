import axios from "axios"
import { ChainKey } from "../common"
const axiosInstance = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
})

interface CoinGeckoRawCoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: number | null;
  last_updated: string;
}

export interface CoinGeckoCoinData {
  //price in USD
  price: number;
  //rate of change in price in the last 24 hours, 1 for 100%, -1 for -100%
  priceChange: number;
}

export const getNativeCoinData = async (
    chainKey: ChainKey = ChainKey.Solana
): Promise<CoinGeckoCoinData> => {
    const { data } = await axiosInstance.get<Array<CoinGeckoRawCoinData>>(
        `/coins/markets?ids=${chainKey}&vs_currency=usd`
    )
    return {
        price: data[0].current_price,
        priceChange: data[0].price_change_percentage_24h,
    }
}
