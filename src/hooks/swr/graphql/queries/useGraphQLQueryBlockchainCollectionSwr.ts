import { UseSWR } from "../../types"
import {
    queryBlockchainCollections,
    QueryBlockchainCollectionsParams,
} from "@/modules/apollo"
import useSWR from "swr"
import { ChainKey } from "@/modules/blockchain"
import { useGlobalAccountAddress } from "@/hooks"
import { NFTCollectionKey } from "@/modules/entities"
import { WrapperBlockchainCollectionData, useAppSelector } from "@/redux"
import { useState } from "react"

export const useGraphQLQueryBlockchainCollectionSwr = (
    defaultNftType: NFTCollectionKey = NFTCollectionKey.DragonFruit,
): UseSWR<
    WrapperBlockchainCollectionData,
    NFTCollectionKey
> => {
    const { accountAddress } = useGlobalAccountAddress()
    const [params, setParams] = useState<NFTCollectionKey>(defaultNftType)
    // we make sure all the collection swrs exist
    // start fetching if all the collection swrs exist
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)

    const swr = useSWR(
        (authenticated && accountAddress) 
            ? [
                "QUERY_BLOCKCHAIN_COLLECTIONS", 
                params, 
                accountAddress
            ] 
            : null,
        async () => {
            if (!accountAddress) throw new Error("Account address is required")
            console.log("fetching collection swr", params)
            const _params: QueryBlockchainCollectionsParams = {
                request: {
                    accountAddress,
                    chainKey: ChainKey.Solana,
                    nftCollectionKeys: [params],
                    refresh: true,
                }
            }
            const { data } = await queryBlockchainCollections(_params)
            const collection = data.blockchainCollections.collections.find(collection => collection.nftCollectionKey === params)
            if (!collection) throw new Error("No collection found")
            return {
                collection,
                cached: data.blockchainCollections.cached,
                refreshInterval: data.blockchainCollections.refreshInterval,
            }
        }
    )

    //return the state and the data
    return {
        params,
        setParams,
        swr,
    }
} 