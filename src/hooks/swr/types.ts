import { CoinGeckoCoinData } from "@/modules/blockchain"
import { Dispatch, SetStateAction } from "react"
import { BareFetcher, SWRConfiguration, SWRResponse } from "swr"

export interface UseSWR<TData, TChangeState> {
    swr:  SWRResponse<TData, Error, SWRConfiguration<TData, Error, BareFetcher<CoinGeckoCoinData>> | undefined> 
    setLoaded: Dispatch<SetStateAction<boolean>>
    setParams: Dispatch<SetStateAction<TChangeState>>
}