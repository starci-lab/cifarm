import { ChainKey, CoinGeckoCoinData, defaultChainKey, getNativeCoinData } from "@/modules/blockchain"
import { useState } from "react"
import useSWR from "swr"
import { UseSWR } from "./types"

export const useNativeCoinGeckoSWR = (): UseSWR<CoinGeckoCoinData, ChainKey> => {
    //state to indicate the chain key
    const [params, setParams] = useState(defaultChainKey)

    //fetch the data from coingecko api
    const swr = useSWR<CoinGeckoCoinData>(
        params,
        async () => {
            try {
                return await getNativeCoinData(params)
            } catch (error) {
                //case error, use default values
                console.error(error)
                return {
                    price: 0,
                    priceChange: 0,
                }
            }
        },
        {   
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateOnMount: false,
        }
    )

    //return the state and the data
    return {
        swr,
        setParams,
    }
}
